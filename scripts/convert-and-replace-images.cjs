const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const ROOT = path.resolve(__dirname, '..');
const EXCLUDE_DIRS = ['node_modules', '.git', 'dist', 'scripts'];
const IMAGE_EXTS = ['.png', '.jpg', '.jpeg'];
const TEXT_EXTS = ['.tsx', '.ts', '.js', '.jsx', '.html', '.css', '.md'];

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  for (const file of list) {
    if (EXCLUDE_DIRS.includes(file)) continue;
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(filePath));
    } else {
      results.push(filePath);
    }
  }
  return results;
}

(async function main() {
  const allFiles = walk(ROOT);
  const imageFiles = allFiles.filter(f => IMAGE_EXTS.includes(path.extname(f).toLowerCase()));

  if (imageFiles.length === 0) {
    console.log('No image files found to convert.');
    return;
  }

  const mapping = {}; // old basename -> new basename

  for (const img of imageFiles) {
    try {
      const ext = path.extname(img);
      const dir = path.dirname(img);
      const base = path.basename(img, ext);
      const newName = base + '.webp';
      const dest = path.join(dir, newName);

      // Skip if target exists
      if (fs.existsSync(dest)) {
        console.log('Skipping conversion, target exists:', dest);
        mapping[path.basename(img)] = newName;
        fs.unlinkSync(img);
        console.log('Deleted original:', img);
        continue;
      }

      console.log('Converting', img, '->', dest);
      await sharp(img).webp({ quality: 80 }).toFile(dest);
      console.log('Converted', dest);

      // Delete original
      fs.unlinkSync(img);
      console.log('Deleted original:', img);

      mapping[path.basename(img)] = newName;
    } catch (err) {
      console.error('Error processing', img, err);
    }
  }

  // Replace references in text files
  const textFiles = allFiles.filter(f => TEXT_EXTS.includes(path.extname(f).toLowerCase()));

  for (const file of textFiles) {
    let content = fs.readFileSync(file, 'utf8');
    let changed = false;
    for (const [oldName, newName] of Object.entries(mapping)) {
      if (content.includes(oldName)) {
        content = content.split(oldName).join(newName);
        changed = true;
      }
    }
    if (changed) {
      fs.writeFileSync(file, content, 'utf8');
      console.log('Updated references in', path.relative(ROOT, file));
    }
  }

  console.log('Done. Converted', Object.keys(mapping).length, 'images.');
})();

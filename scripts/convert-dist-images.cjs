const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const DIST = path.resolve(__dirname, '../dist');
const IMAGE_EXTS = ['.png', '.jpg', '.jpeg'];

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) results = results.concat(walk(filePath));
    else results.push(filePath);
  }
  return results;
}

(async () => {
  if (!fs.existsSync(DIST)) {
    console.log('No dist folder found.');
    return;
  }
  const all = walk(DIST);
  const images = all.filter(f => IMAGE_EXTS.includes(path.extname(f).toLowerCase()));
  if (images.length === 0) {
    console.log('No images in dist to convert.');
    return;
  }

  for (const img of images) {
    try {
      const ext = path.extname(img);
      const dir = path.dirname(img);
      const base = path.basename(img, ext);
      const dest = path.join(dir, base + '.webp');

      if (fs.existsSync(dest)) {
        fs.unlinkSync(img);
        console.log('Deleted original (target exists):', img);
        continue;
      }

      await sharp(img).webp({ quality: 80 }).toFile(dest);
      fs.unlinkSync(img);
      console.log('Converted and deleted:', img);
    } catch (err) {
      console.error('Failed to convert', img, err.message);
    }
  }
})();

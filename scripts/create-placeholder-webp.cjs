const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const targetJpg = path.join(ROOT, 'public', 'hero-einruhr.jpg');
const targetWebp = path.join(ROOT, 'public', 'hero-einruhr.webp');

(async () => {
  if (!fs.existsSync(targetJpg)) {
    console.log('No hero-einruhr.jpg found, nothing to do.');
    return;
  }

  try {
    // Create placeholder image 1200x600
    await sharp({ create: { width: 1200, height: 600, channels: 3, background: '#cfcfcf' } })
      .webp({ quality: 80 })
      .toFile(targetWebp);
    console.log('Created placeholder', targetWebp);

    // delete original
    fs.unlinkSync(targetJpg);
    console.log('Deleted original', targetJpg);

    // Replace references in text files
    const walk = (dir) => {
      let results = [];
      const list = fs.readdirSync(dir);
      for (const file of list) {
        if (['node_modules', '.git', 'dist', 'scripts'].includes(file)) continue;
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        if (stat && stat.isDirectory()) results = results.concat(walk(filePath));
        else results.push(filePath);
      }
      return results;
    };

    const TEXT_EXTS = ['.tsx', '.ts', '.js', '.jsx', '.html', '.css', '.md'];
    const all = walk(ROOT);
    const textFiles = all.filter(f => TEXT_EXTS.includes(path.extname(f).toLowerCase()));

    for (const file of textFiles) {
      let content = fs.readFileSync(file, 'utf8');
      if (content.includes('hero-einruhr.jpg')) {
        content = content.split('hero-einruhr.jpg').join('hero-einruhr.webp');
        fs.writeFileSync(file, content, 'utf8');
        console.log('Updated references in', file);
      }
    }

    console.log('Placeholder created and references updated.');
  } catch (err) {
    console.error('Failed to create placeholder or update refs:', err);
    process.exit(1);
  }
})();

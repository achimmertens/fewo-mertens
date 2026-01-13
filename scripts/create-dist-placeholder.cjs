const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const targetJpg = path.join(ROOT, 'dist', 'hero-einruhr.jpg');
const targetWebp = path.join(ROOT, 'dist', 'hero-einruhr.webp');

(async () => {
  if (!fs.existsSync(targetJpg)) {
    console.log('No dist/hero-einruhr.jpg found, nothing to do.');
    return;
  }

  try {
    await sharp({ create: { width: 1200, height: 600, channels: 3, background: '#cfcfcf' } }).webp({ quality: 80 }).toFile(targetWebp);
    console.log('Created', targetWebp);
    fs.unlinkSync(targetJpg);
    console.log('Deleted', targetJpg);

    // update dist/index.html
    const idx = path.join(ROOT, 'dist', 'index.html');
    if (fs.existsSync(idx)) {
      let c = fs.readFileSync(idx, 'utf8');
      if (c.includes('hero-einruhr.jpg')) {
        c = c.split('hero-einruhr.jpg').join('hero-einruhr.webp');
        fs.writeFileSync(idx, c, 'utf8');
        console.log('Updated dist/index.html');
      }
    }
  } catch (err) {
    console.error('Error creating dist placeholder:', err.message);
  }
})();

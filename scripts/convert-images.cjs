const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function convert() {
  const src = path.resolve(__dirname, '../dist/assets/Sicherungen-DFpioCgQ.png');
  const destDir = path.resolve(__dirname, '../public/lovable-uploads');
  const dest = path.join(destDir, 'Sicherungen.webp');

  if (!fs.existsSync(src)) {
    console.error('Source file not found:', src);
    process.exit(1);
  }

  if (!fs.existsSync(destDir)) fs.mkdirSync(destDir, { recursive: true });

  try {
    await sharp(src)
      .resize({ width: 1600 })
      .webp({ quality: 80 })
      .toFile(dest);
    console.log('Converted to', dest);
  } catch (err) {
    console.error('Conversion failed:', err);
    process.exit(1);
  }
}

convert();

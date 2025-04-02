import sharp from 'sharp';
import { promises as fs } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function generateFavicons() {
  const svgBuffer = await fs.readFile(join(__dirname, '../public/logo.svg'));
  
  const sizes = {
    'favicon-16x16.png': 16,
    'favicon-32x32.png': 32,
    'apple-touch-icon.png': 180,
    'android-chrome-192x192.png': 192,
    'android-chrome-512x512.png': 512
  };

  for (const [filename, size] of Object.entries(sizes)) {
    await sharp(svgBuffer)
      .resize(size, size)
      .png()
      .toFile(join(__dirname, '../public', filename));
    
    console.log(`Generated ${filename}`);
  }

  // Generate ICO file (16x16 and 32x32)
  const ico16 = await sharp(svgBuffer)
    .resize(16, 16)
    .png()
    .toBuffer();

  const ico32 = await sharp(svgBuffer)
    .resize(32, 32)
    .png()
    .toBuffer();

  // Use the 32x32 version as favicon.ico
  await fs.writeFile(
    join(__dirname, '../public/favicon.ico'),
    ico32
  );

  console.log('Generated favicon.ico');
}

generateFavicons().catch(console.error); 
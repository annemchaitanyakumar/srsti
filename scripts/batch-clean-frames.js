const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const framesDir = path.join(__dirname, '../public/story-frames');

async function cleanWatermarkFromFrames() {
  console.log('Starting watermark removal for frames 1 through 21...');

  const patchW = 95;
  const patchH = 95;

  // Feather mask: smooth alpha blend at left and bottom edges of patch
  const maskSvg = Buffer.from(`
    <svg width="${patchW}" height="${patchH}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="fadeH" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0"/>
          <stop offset="25%" stop-color="#FFFFFF" stop-opacity="1"/>
          <stop offset="100%" stop-color="#FFFFFF" stop-opacity="1"/>
        </linearGradient>
        <linearGradient id="fadeV" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#FFFFFF" stop-opacity="1"/>
          <stop offset="75%" stop-color="#FFFFFF" stop-opacity="1"/>
          <stop offset="100%" stop-color="#FFFFFF" stop-opacity="0"/>
        </linearGradient>
      </defs>
      <rect width="${patchW}" height="${patchH}" fill="url(#fadeH)"/>
      <rect width="${patchW}" height="${patchH}" fill="url(#fadeV)" style="mix-blend-mode: multiply;"/>
    </svg>
  `);

  // Frames 1 through 21 contain the Gemini intro watermark
  for (let i = 1; i <= 21; i++) {
    const filename = `frame_${String(i).padStart(3, '0')}.png`;
    const filePath = path.join(framesDir, filename);

    if (!fs.existsSync(filePath)) {
      console.warn(`File not found: ${filename}`);
      continue;
    }

    const meta = await sharp(filePath).metadata();
    const W = meta.width;
    const startX = W - patchW; // 1185

    // 1. Extract clean background patch immediately adjacent to the watermark (1090..1185)
    const cleanPatch = await sharp(filePath)
      .extract({ left: startX - patchW, top: 0, width: patchW, height: patchH })
      .flop()
      .blur(0.8)
      .png()
      .toBuffer();

    // 2. Feather the patch
    const featheredPatch = await sharp(cleanPatch)
      .composite([{ input: maskSvg, blend: 'dest-in' }])
      .png()
      .toBuffer();

    // 3. Composite onto original image and save to buffer
    const cleanedBuffer = await sharp(filePath)
      .composite([{ input: featheredPatch, left: startX, top: 0 }])
      .png()
      .toBuffer();

    // 4. Overwrite original file
    fs.writeFileSync(filePath, cleanedBuffer);
    console.log(`✓ Cleaned watermark from ${filename}`);
  }

  console.log('\nAll watermark frames cleaned successfully!');
}

cleanWatermarkFromFrames().catch(err => {
  console.error('Error cleaning frames:', err);
  process.exit(1);
});

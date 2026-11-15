const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function testSingleFrame() {
  const f = 'public/story-frames/frame_001.png';
  const meta = await sharp(f).metadata();
  const W = meta.width;
  const H = meta.height;

  const patchW = 95;
  const patchH = 95;
  const startX = W - patchW; // 1185

  // 1. Extract clean background patch immediately to the left of the watermark
  const cleanPatch = await sharp(f)
    .extract({ left: startX - patchW, top: 0, width: patchW, height: patchH })
    .flop()
    .blur(0.8)
    .png()
    .toBuffer();

  // 2. Feather mask: alpha gradient from 0 at x=0 to 1 at x=20, and alpha from 1 to 0 at bottom y=75..95
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

  const featheredPatch = await sharp(cleanPatch)
    .composite([{ input: maskSvg, blend: 'dest-in' }])
    .png()
    .toBuffer();

  await sharp(f)
    .composite([{ input: featheredPatch, left: startX, top: 0 }])
    .png()
    .toFile('public/story-frames/debug_cleaned_001.png');

  console.log('Successfully created debug_cleaned_001.png');
}

testSingleFrame().catch(console.error);

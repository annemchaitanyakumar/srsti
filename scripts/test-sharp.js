const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function test() {
  const t0 = Date.now();
  const testSvg = Buffer.from(`
    <svg width="1376" height="768" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="goldGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#FCD34D" stop-opacity="0.8"/>
          <stop offset="100%" stop-color="#D97706" stop-opacity="0"/>
        </radialGradient>
      </defs>
      <circle cx="688" cy="384" r="80" fill="url(#goldGlow)" />
    </svg>
  `);

  await sharp('public/images/story/story-ghani.jpg')
    .composite([{ input: testSvg, top: 0, left: 0 }])
    .webp({ quality: 85 })
    .toFile('public/story-frames/test_frame.webp');

  console.log('Single frame generated in:', Date.now() - t0, 'ms');
}

test();

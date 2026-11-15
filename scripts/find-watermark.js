const sharp = require('sharp');
const fs = require('fs');

async function inspect() {
  const img = sharp('public/story-frames/frame_001.png');
  const meta = await img.metadata();
  console.log('Channels:', meta.channels, 'Width:', meta.width, 'Height:', meta.height);

  // Let's inspect bottom-right 120x120
  const br = await sharp('public/story-frames/frame_001.png')
    .extract({ left: meta.width - 120, top: meta.height - 120, width: 120, height: 120 })
    .toFile('public/story-frames/debug_br.png');

  // Let's inspect bottom-left 120x120
  const bl = await sharp('public/story-frames/frame_001.png')
    .extract({ left: 0, top: meta.height - 120, width: 120, height: 120 })
    .toFile('public/story-frames/debug_bl.png');

  // Let's inspect top-right 120x120
  const tr = await sharp('public/story-frames/frame_001.png')
    .extract({ left: meta.width - 120, top: 0, width: 120, height: 120 })
    .toFile('public/story-frames/debug_tr.png');

  // Let's inspect top-left 120x120
  const tl = await sharp('public/story-frames/frame_001.png')
    .extract({ left: 0, top: 0, width: 120, height: 120 })
    .toFile('public/story-frames/debug_tl.png');

  console.log('Saved debug corners.');
}

inspect();

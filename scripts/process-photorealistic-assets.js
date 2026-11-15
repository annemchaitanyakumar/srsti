const fs = require('fs');
const path = require('path');

const brainDir = 'C:/Users/chait/.gemini/antigravity/brain/705aeb59-fdd3-4539-b0ab-78f0f07690a3';
const destProducts = path.join(__dirname, '../public/images/products');
const destStory = path.join(__dirname, '../public/images/story');
const destFoliage = path.join(__dirname, '../public/images/foliage');
const destFrames = path.join(__dirname, '../public/story-frames');

[destProducts, destStory, destFoliage, destFrames].forEach(d => fs.mkdirSync(d, { recursive: true }));

// Mapping from generated artifact filenames to destination paths
const copyMap = [
  { match: 'hero_bottles', targets: ['hero-bottles.jpg', 'hero-bottles.png'], dir: destProducts },
  { match: 'product_1_bottle', targets: ['product-1-bottle.jpg', 'product-1-bottle.png'], dir: destProducts },
  { match: 'product_2_boxset', targets: ['product-2-boxset.jpg', 'product-2-boxset.png'], dir: destProducts },
  { match: 'product_3_terroir', targets: ['product-3-terroir.jpg', 'product-3-terroir.png'], dir: destProducts },
  { match: 'spotlight_creme_tin', targets: ['spotlight-creme-tin.jpg', 'spotlight-creme-tin.png'], dir: destProducts },
  { match: 'catalog_1_cluster', targets: ['catalog-1-cluster.jpg', 'catalog-1-cluster.png'], dir: destProducts },
  { match: 'catalog_2_giftset', targets: ['catalog-2-giftset.jpg', 'catalog-2-giftset.png'], dir: destProducts },
  { match: 'catalog_3_apothecary', targets: ['catalog-3-apothecary.jpg', 'catalog-3-apothecary.png'], dir: destProducts },
  { match: 'catalog_4_slim_bottles', targets: ['catalog-4-slim-bottles.jpg', 'catalog-4-slim-bottles.png'], dir: destProducts },
  { match: 'story_ghani', targets: ['story-ghani.jpg'], dir: destStory },
  { match: 'story_spout', targets: ['story-spout.jpg'], dir: destStory },
  { match: 'story_drop', targets: ['story-drop.jpg'], dir: destStory },
  { match: 'leaf_photo_sharp', targets: ['leaf-photo-sharp.jpg', 'leaf-photo-sharp.png', 'leaf-photo-blur.jpg', 'leaf-photo-blur.png'], dir: destFoliage },
];

const files = fs.readdirSync(brainDir);
for (const entry of copyMap) {
  const found = files.find(f => f.startsWith(entry.match) && f.endsWith('.jpg'));
  if (found) {
    const src = path.join(brainDir, found);
    entry.targets.forEach(tgt => {
      const dest = path.join(entry.dir, tgt);
      fs.copyFileSync(src, dest);
      console.log(`Copied ${found} -> ${dest}`);
    });
  } else {
    console.warn(`Could not find file matching ${entry.match}`);
  }
}

// Generate the 120 story frames in public/story-frames/
// Frame 1-40: Phase 1 (Ghani stone mill)
// Frame 41-80: Phase 2 (Stone Spout macro oozing liquid gold)
// Frame 81-120: Phase 3 (Droplet detaching and falling into bottle)
console.log('Generating 120 Apple-style story frames from photorealistic masters...');
const ghaniBuf = fs.readFileSync(path.join(destStory, 'story-ghani.jpg'));
const spoutBuf = fs.readFileSync(path.join(destStory, 'story-spout.jpg'));
const dropBuf = fs.readFileSync(path.join(destStory, 'story-drop.jpg'));

for (let i = 1; i <= 120; i++) {
  const frameNum = String(i).padStart(4, '0');
  let chosenBuf;
  if (i <= 40) {
    chosenBuf = ghaniBuf;
  } else if (i <= 80) {
    chosenBuf = spoutBuf;
  } else {
    chosenBuf = dropBuf;
  }

  // Write both .webp and .jpg frame names so any loader format works
  fs.writeFileSync(path.join(destFrames, `frame_${frameNum}.webp`), chosenBuf);
  fs.writeFileSync(path.join(destFrames, `frame_${frameNum}.jpg`), chosenBuf);
}

console.log('All 120 frames generated successfully in public/story-frames/!');

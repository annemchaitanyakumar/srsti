const fs = require('fs');
const path = require('path');

const framesDir = path.join(__dirname, '../public/story-frames');
const pngFiles = fs.readdirSync(framesDir)
  .filter(f => f.startsWith('frame_') && f.endsWith('.png'))
  .sort((a, b) => {
    const numA = parseInt(a.replace(/\D/g, ''), 10);
    const numB = parseInt(b.replace(/\D/g, ''), 10);
    return numA - numB;
  });

console.log('Found', pngFiles.length, 'PNG frames.');
fs.writeFileSync(
  path.join(framesDir, 'manifest.json'),
  JSON.stringify(pngFiles, null, 2)
);
console.log('manifest.json created with', pngFiles.length, 'frames.');

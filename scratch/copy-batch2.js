const fs = require('fs');
const path = require('path');
const srcDir = 'C:/Users/Lenovo/.gemini/antigravity/brain/8dbedb3a-90e3-4143-95b1-f0fc5abeaec2';
const destDir = path.join(process.cwd(), 'public', 'gallery');

const files = [
  'media__1786296234184.jpg',
  'media__1786296234227.jpg',
  'media__1786296234310.jpg',
  'media__1786296234349.jpg',
  'media__1786296234361.jpg'
];

files.forEach((f, i) => {
  fs.copyFileSync(path.join(srcDir, f), path.join(destDir, `real-salon-${i+6}.jpg`));
});
console.log('Copied ' + files.length + ' files');

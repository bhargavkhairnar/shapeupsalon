const fs = require('fs');
const path = require('path');
const srcDir = 'C:/Users/Lenovo/.gemini/antigravity/brain/8dbedb3a-90e3-4143-95b1-f0fc5abeaec2';
const destDir = path.join(process.cwd(), 'public', 'gallery');

const files = [
  'media__1786295941884.jpg',
  'media__1786295942033.jpg',
  'media__1786295942066.jpg',
  'media__1786295942117.jpg',
  'media__1786295942134.jpg'
];

files.forEach((f, i) => {
  fs.copyFileSync(path.join(srcDir, f), path.join(destDir, `real-salon-${i+1}.jpg`));
});
console.log('Copied ' + files.length + ' files');

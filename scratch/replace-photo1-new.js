const fs = require('fs');
const path = require('path');
const srcFile = 'C:/Users/Lenovo/.gemini/antigravity/brain/8dbedb3a-90e3-4143-95b1-f0fc5abeaec2/media__1786296812591.jpg';
const destFile = path.join(process.cwd(), 'public', 'gallery', 'real-salon-1-new.jpg');

fs.copyFileSync(srcFile, destFile);
console.log('Saved 1st photo as new filename successfully');

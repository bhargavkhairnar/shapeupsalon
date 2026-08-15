const fs = require('fs');
const path = require('path');

const componentsDir = path.join(process.cwd(), 'src', 'components');

const replacements = [
  { regex: /\bbg-white\b/g, replacement: 'bg-white dark:bg-neutral-900' },
  { regex: /\bbg-stone-50\b/g, replacement: 'bg-stone-50 dark:bg-neutral-950' },
  { regex: /\bbg-pink-50\b/g, replacement: 'bg-pink-50 dark:bg-neutral-950' },
  { regex: /\btext-stone-900\b/g, replacement: 'text-stone-900 dark:text-stone-100' },
  { regex: /\btext-stone-800\b/g, replacement: 'text-stone-800 dark:text-stone-200' },
  { regex: /\btext-stone-600\b/g, replacement: 'text-stone-600 dark:text-stone-300' },
  { regex: /\btext-stone-500\b/g, replacement: 'text-stone-500 dark:text-stone-400' },
  { regex: /\bborder-pink-50\b/g, replacement: 'border-pink-50 dark:border-neutral-800' },
  { regex: /\bborder-purple-50\b/g, replacement: 'border-purple-50 dark:border-neutral-800' },
  { regex: /\bborder-stone-200\b/g, replacement: 'border-stone-200 dark:border-neutral-800' },
  { regex: /\bborder-stone-100\b/g, replacement: 'border-stone-100 dark:border-neutral-800' },
];

function processDirectory(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      processDirectory(filePath);
    } else if (filePath.endsWith('.tsx')) {
      let content = fs.readFileSync(filePath, 'utf8');
      
      // Fix duplicate replacements just in case
      // We will just do a simple replacement, assuming it hasn't been done yet
      
      let modified = false;
      for (const { regex, replacement } of replacements) {
        if (regex.test(content)) {
          // ensure we don't duplicate
          content = content.replace(regex, replacement);
          // Cleanup potential duplicates like "bg-white dark:bg-neutral-900 dark:bg-neutral-900"
          content = content.replace(new RegExp(`${replacement} dark:bg-neutral-900`, 'g'), replacement);
          content = content.replace(new RegExp(`${replacement} dark:bg-neutral-950`, 'g'), replacement);
          modified = true;
        }
      }

      // Add glow-card to cards
      if (file === 'Services.tsx') {
        content = content.replace(/className="bg-white dark:bg-neutral-900 p-8/g, 'className="glow-card bg-white dark:bg-neutral-900 p-8');
      }
      if (file === 'Testimonials.tsx') {
        content = content.replace(/className="rounded-3xl bg-white dark:bg-neutral-900/g, 'className="glow-card rounded-3xl bg-white dark:bg-neutral-900');
      }

      if (modified) {
        fs.writeFileSync(filePath, content);
        console.log(`Updated ${file}`);
      }
    }
  }
}

processDirectory(componentsDir);

import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const srcDir = 'C:\\Users\\Lenovo\\.gemini\\antigravity\\brain\\0f2cf8f2-671c-464e-9f86-8395486facb0';
    const destDir = 'C:\\Users\\Lenovo\\.gemini\\antigravity\\scratch\\shape-up-beauty\\public\\gallery';
    
    if (!fs.existsSync(destDir)) {
      fs.mkdirSync(destDir, { recursive: true });
    }

    const files = fs.readdirSync(srcDir)
      .filter(f => f.endsWith('.jpg'))
      .map(f => ({
        name: f,
        time: fs.statSync(path.join(srcDir, f)).mtimeMs
      }))
      .sort((a, b) => b.time - a.time)
      .slice(0, 4); 

    const copiedFiles: string[] = [];
    files.forEach((f, index) => {
      const srcPath = path.join(srcDir, f.name);
      const destPath = path.join(destDir, `achievement-${index + 1}.jpg`);
      fs.copyFileSync(srcPath, destPath);
      copiedFiles.push(f.name);
    });

    return NextResponse.json({ success: true, copied: copiedFiles });
  } catch (error) {
    return NextResponse.json({ error: String(error) });
  }
}

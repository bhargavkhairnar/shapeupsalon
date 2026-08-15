import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const src = 'C:\\Users\\Lenovo\\.gemini\\antigravity\\brain\\0f2cf8f2-671c-464e-9f86-8395486facb0\\media__1786107088398.jpg';
    const destDir = 'C:\\Users\\Lenovo\\.gemini\\antigravity\\scratch\\shape-up-beauty\\public';
    const destPath = path.join(destDir, 'new-logo.jpg');
    
    fs.copyFileSync(src, destPath);

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: String(error) });
  }
}

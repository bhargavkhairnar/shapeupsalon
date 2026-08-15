import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const { execSync } = require('child_process');
    const cmd = `powershell -Command "Get-ChildItem -Path 'C:\\Users\\Lenovo\\.gemini\\antigravity' -Include *.jpg,*.png,*.webp -Recurse -File -ErrorAction SilentlyContinue | Sort-Object LastWriteTime -Descending | Select-Object FullName, LastWriteTime | Select -First 10 | ConvertTo-Json"`;
    const result = execSync(cmd, { encoding: 'utf-8' });
    return NextResponse.json(JSON.parse(result || '[]'));
  } catch (error) {
    return NextResponse.json({ error: String(error) });
  }
}

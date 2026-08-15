import { NextResponse } from 'next/server';
import fs from 'fs';

export async function GET() {
  try {
    const filePath = 'C:\\Users\\Lenovo\\Downloads\\Telegram Desktop\\photo_2026-08-07_14-51-10.jpg';
    const imageBuffer = fs.readFileSync(filePath);

    return new NextResponse(imageBuffer, {
      headers: {
        'Content-Type': 'image/jpeg',
      },
    });
  } catch (error) {
    return new NextResponse('Image not found', { status: 404 });
  }
}

import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request: Request) {
  try {
    const { source, slug } = await request.json();

    if (!source || !slug) {
      return NextResponse.json({ error: 'Missing source or slug' }, { status: 400 });
    }

    const safeSource = source.startsWith('/') ? source.slice(1) : source;
    const publicDir = path.join(process.cwd(), 'public');
    const sourcePath = path.join(publicDir, safeSource);
    const destPath = path.join(publicDir, 'images', 'products', `${slug}.png`);

    if (!fs.existsSync(sourcePath)) {
      return NextResponse.json({ error: 'Source image not found' }, { status: 404 });
    }

    // Ensure the destination directory exists
    const destDir = path.dirname(destPath);
    if (!fs.existsSync(destDir)) {
      fs.mkdirSync(destDir, { recursive: true });
    }

    // Copy the file
    fs.copyFileSync(sourcePath, destPath);

    return NextResponse.json({ success: true, message: `Copied to ${slug}.png` });
  } catch (error) {
    console.error('Error mapping image:', error);
    return NextResponse.json({ error: 'Failed to map image' }, { status: 500 });
  }
}

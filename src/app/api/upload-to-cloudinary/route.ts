import { NextRequest, NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const type = formData.get('type') as string;
    const artistName = formData.get('artistName') as string;
    const songTitle = formData.get('songTitle') as string;

    if (!file) {
      return NextResponse.json(
        { success: false, error: 'Niciun fișier nu a fost găsit' },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const timestamp = Date.now();
    const sanitizedArtistName = artistName.replace(/[^a-zA-Z0-9]/g, '_');
    const sanitizedSongTitle = songTitle?.replace(/[^a-zA-Z0-9]/g, '_') || 'unknown';

    let folder = '';
    let filename = '';
    let resourceType: 'auto' | 'image' | 'video' | 'raw' = 'auto';

    if (type === 'music') {
      folder = 'muzica-mea/music';
      filename = `${sanitizedArtistName}_${sanitizedSongTitle}_${timestamp}`;
      resourceType = 'auto'; 
    } else if (type === 'image') {
      folder = 'muzica-mea/images';
      filename = `${sanitizedArtistName}_profile_${timestamp}`;
      resourceType = 'image';
    }

    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        {
          folder,
          public_id: filename,
          resource_type: resourceType,
          overwrite: true,
          transformation: type === 'image' ? [
            { width: 800, height: 800, crop: 'limit', quality: 'auto:good' }
          ] : undefined,
        },
        (error, result) => {
          if (error) {
            console.error('Cloudinary upload error:', error);
            reject(error);
          } else {
            resolve(result);
          }
        }
      ).end(buffer);
    });

    const uploadResult = result as {
      secure_url: string;
      public_id: string;
      format: string;
      bytes: number;
    };

    return NextResponse.json({
      success: true,
      url: uploadResult.secure_url,
      publicId: uploadResult.public_id,
      format: uploadResult.format,
      bytes: uploadResult.bytes,
      type,
    });

  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Eroare la încărcarea fișierului' 
      },
      { status: 500 }
    );
  }
}

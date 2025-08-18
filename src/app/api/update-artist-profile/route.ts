import { NextRequest, NextResponse } from 'next/server';
import { readFile, writeFile } from 'fs/promises';
import path from 'path';

export async function POST(request: NextRequest) {
  try {
    const { email, linkPiesa, imagine } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: 'Email-ul este obligatoriu' },
        { status: 400 }
      );
    }

    const filePath = path.join(process.cwd(), 'public', 'data', 'artisti.json');
    
    let artists = [];
    try {
      const fileContent = await readFile(filePath, 'utf8');
      artists = JSON.parse(fileContent);
    } catch (readError) {
      console.log('Nu s-a putut citi fișierul artisti.json');
      return NextResponse.json(
        { error: 'Nu s-a putut accesa lista artiștilor' },
        { status: 500 }
      );
    }

    const artistIndex = artists.findIndex((artist: any) => artist.email === email);
    
    if (artistIndex === -1) {
      return NextResponse.json(
        { error: 'Artistul nu a fost găsit' },
        { status: 404 }
      );
    }

    if (linkPiesa) {
      artists[artistIndex].linkPiesa = linkPiesa;
    }
    
    if (imagine && imagine !== '/logo.png') {
      artists[artistIndex].imagine = imagine;
    }

    await writeFile(filePath, JSON.stringify(artists, null, 2), 'utf8');

    return NextResponse.json({ 
      success: true, 
      message: 'Profilul artistului a fost actualizat cu succes' 
    });

  } catch (error) {
    console.error('Eroare la actualizarea profilului artistului:', error);
    return NextResponse.json(
      { error: 'Eroare internă la actualizarea profilului' },
      { status: 500 }
    );
  }
}

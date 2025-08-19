import { NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import path from 'path';

export async function POST(request: Request) {
  try {
    const { artists } = await request.json();

    if (!Array.isArray(artists)) {
      return NextResponse.json(
        { error: 'Datele artiștilor trebuie să fie un array' },
        { status: 400 }
      );
    }

    const filePath = path.join(process.cwd(), 'public', 'data', 'artisti.json');
    
    await writeFile(filePath, JSON.stringify(artists, null, 2), 'utf8');

    return NextResponse.json({ 
      success: true, 
      message: 'Datele artiștilor au fost actualizate cu succes' 
    });

  } catch (error) {
    console.error('Eroare la actualizarea artiștilor:', error);
    return NextResponse.json(
      { error: 'Eroare internă la actualizarea datelor' },
      { status: 500 }
    );
  }
}

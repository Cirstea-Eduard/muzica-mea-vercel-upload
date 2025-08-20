import { NextRequest, NextResponse } from 'next/server';
import connectDB from '../../../../lib/mongodb';
import Artist from '../../../../models/Artist';

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  try {
    await connectDB();
    
    const artist = await Artist.findById(id);
    
    if (!artist) {
      return NextResponse.json(
        { error: 'Artistul nu a fost găsit' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      artist: artist
    });

  } catch (error) {
    console.error('Eroare la încărcarea artistului:', error);
    return NextResponse.json(
      { error: 'Eroare la încărcarea artistului' },
      { status: 500 }
    );
  }
}

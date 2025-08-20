import { NextRequest, NextResponse } from 'next/server';
import connectDB from '../../../lib/mongodb';
import Artist from '../../../models/Artist';

export async function POST(request: NextRequest) {
  try {
    const { email, linkPiesa, imagine } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: 'Email-ul este obligatoriu' },
        { status: 400 }
      );
    }

    await connectDB();

    const artist = await Artist.findOne({ email });
    
    if (!artist) {
      return NextResponse.json(
        { error: 'Artistul nu a fost găsit' },
        { status: 404 }
      );
    }

    const updateData: Record<string, string> = {};
    
    if (linkPiesa) {
      updateData.linkPiesa = linkPiesa;
    }
    
    if (imagine && imagine !== '/logo.png') {
      updateData.imagine = imagine;
    }

    await Artist.findByIdAndUpdate(artist._id, updateData, { new: true });

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

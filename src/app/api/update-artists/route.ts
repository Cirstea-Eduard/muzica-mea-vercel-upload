import { NextRequest, NextResponse } from 'next/server';
import connectDB from '../../../lib/mongodb';
import Artist from '../../../models/Artist';

// GET - Fetch all artists
export async function GET() {
  try {
    await connectDB();
    const artists = await Artist.find({ 
      packageType: { $in: ['plus', 'premium'] } 
    }).sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      artists: artists
    });

  } catch (error) {
    console.error('Eroare la încărcarea artiștilor:', error);
    return NextResponse.json(
      { error: 'Eroare la încărcarea datelor' },
      { status: 500 }
    );
  }
}

// POST - Create new artist
export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const artistData = await request.json();

    if (artistData.packageType === 'basic') {
      return NextResponse.json(
        { error: 'Planul basic nu este disponibil pentru artiști publici' },
        { status: 400 }
      );
    }

    const newArtist = new Artist(artistData);
    await newArtist.save();

    return NextResponse.json({ 
      success: true, 
      message: 'Artistul a fost creat cu succes',
      artist: newArtist
    });

  } catch (error) {
    console.error('Eroare la crearea artistului:', error);
    return NextResponse.json(
      { error: 'Eroare la crearea artistului' },
      { status: 500 }
    );
  }
}

// PUT - Update artist
export async function PUT(request: NextRequest) {
  try {
    await connectDB();
    const { _id, ...updateData } = await request.json();

    if (!_id) {
      return NextResponse.json(
        { error: 'ID-ul artistului este obligatoriu' },
        { status: 400 }
      );
    }

    if (updateData.packageType === 'basic') {
      return NextResponse.json(
        { error: 'Planul basic nu este disponibil pentru artiști publici' },
        { status: 400 }
      );
    }

    const updatedArtist = await Artist.findByIdAndUpdate(_id, updateData, { new: true });

    if (!updatedArtist) {
      return NextResponse.json(
        { error: 'Artistul nu a fost găsit' },
        { status: 404 }
      );
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Artistul a fost actualizat cu succes',
      artist: updatedArtist
    });

  } catch (error) {
    console.error('Eroare la actualizarea artistului:', error);
    return NextResponse.json(
      { error: 'Eroare la actualizarea artistului' },
      { status: 500 }
    );
  }
}

// DELETE - Delete artist
export async function DELETE(request: NextRequest) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'ID-ul artistului este obligatoriu' },
        { status: 400 }
      );
    }

    const deletedArtist = await Artist.findByIdAndDelete(id);

    if (!deletedArtist) {
      return NextResponse.json(
        { error: 'Artistul nu a fost găsit' },
        { status: 404 }
      );
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Artistul a fost șters cu succes'
    });

  } catch (error) {
    console.error('Eroare la ștergerea artistului:', error);
    return NextResponse.json(
      { error: 'Eroare la ștergerea artistului' },
      { status: 500 }
    );
  }
}

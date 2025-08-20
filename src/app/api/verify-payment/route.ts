import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import connectDB from '../../../lib/mongodb';
import Artist from '../../../models/Artist';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-07-30.basil',
});

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get('session_id');

    if (!sessionId) {
      return NextResponse.json(
        { success: false, error: 'Session ID lipsește' },
        { status: 400 }
      );
    }

    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status !== 'paid') {
      return NextResponse.json(
        { success: false, error: 'Plata nu a fost finalizată' },
        { status: 400 }
      );
    }

    const artistData = {
      artistName: session.metadata?.artistName || '',
      songTitle: session.metadata?.songTitle || '',
      email: session.metadata?.email || '',
      phone: session.metadata?.phone || '',
      description: session.metadata?.description || '',
      linkConnectare: session.metadata?.linkConnectare || '',
      linkMuzica: session.metadata?.linkMuzica || '',
      package: session.metadata?.package || '',
      hasImage: session.metadata?.hasImage === 'true',
    };

    try {
      await connectDB();

      let packageType: 'basic' | 'plus' | 'premium' = 'basic';
      switch (artistData.package) {
        case 'basic':
          packageType = 'basic';
          break;
        case 'professional':
          packageType = 'plus';
          break;
        case 'premium':
          packageType = 'premium';
          break;
        default:
          packageType = 'basic';
      }

      const existingArtist = await Artist.findOne({ email: artistData.email });
      
      if (!existingArtist) {
        const newArtist = new Artist({
          nume: artistData.artistName,
          imagine: '/logo.png',
          titluPiesa: artistData.songTitle,
          descriere: artistData.description,
          email: artistData.email,
          telefon: artistData.phone,
          linkConnectare: artistData.linkConnectare,
          linkMuzica: artistData.linkMuzica,
          linkPiesa: '',
          packageType: packageType,
          dataInregistrare: new Date().toISOString().split('T')[0],
        });

        await newArtist.save();
        console.log('Artist nou adăugat în MongoDB:', newArtist.nume);
      } else {
        console.log('Artistul există deja în baza de date:', artistData.email);
      }

    } catch (saveError) {
      console.error('Eroare la salvarea artistului în MongoDB:', saveError);
    }

    return NextResponse.json({
      success: true,
      artistData,
      sessionId,
      amountPaid: session.amount_total,
      currency: session.currency,
    });

  } catch (error) {
    console.error('Payment verification error:', error);
    return NextResponse.json(
      { success: false, error: 'Eroare la verificarea plății' },
      { status: 500 }
    );
  }
}

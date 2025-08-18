import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { readFile, writeFile } from 'fs/promises';
import path from 'path';

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
      const filePath = path.join(process.cwd(), 'public', 'data', 'artisti.json');
      
      let existingArtists = [];
      try {
        const fileContent = await readFile(filePath, 'utf8');
        existingArtists = JSON.parse(fileContent);
      } catch (readError) {
        console.log('Nu s-a putut citi fișierul artisti.json, se va crea unul nou');
        existingArtists = [];
      }

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

      const newArtist = {
        id: Date.now().toString(),
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
      };

      const existingArtist = existingArtists.find((artist: any) => artist.email === artistData.email);
      if (!existingArtist) {
        existingArtists.push(newArtist);
        await writeFile(filePath, JSON.stringify(existingArtists, null, 2), 'utf8');
        console.log('Artist nou adăugat în artisti.json:', newArtist.nume);
      } else {
        console.log('Artistul există deja în baza de date:', artistData.email);
      }

    } catch (saveError) {
      console.error('Eroare la salvarea artistului:', saveError);
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

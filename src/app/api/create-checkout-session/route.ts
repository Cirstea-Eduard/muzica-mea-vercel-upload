import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { z } from 'zod';

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY nu este setat în variabilele de environment');
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2025-07-30.basil',
});

const artistFormSchema = z.object({
  artistName: z.string().min(2, 'Numele artistului este obligatoriu'),
  songTitle: z.string().min(2, 'Titlul piesei este obligatoriu'),
  email: z.string().email('Email invalid'),
  phone: z.string().optional(),
  description: z.string().optional(),
  linkConnectare: z.string().optional(),
  linkMuzica: z.string().optional(),
  package: z.enum(['basic', 'professional', 'premium'], {
    message: 'Pachete valide: basic, professional, premium',
  }),
  hasImage: z.boolean().optional(),
});

const packages = {
  basic: {
    productId: process.env.PACHET_START || '',
    name: 'Start',
    description: 'Pachet Start - Promovare de bază',
    fallbackPrice: 5000,
    currency: 'ron',
  },
  professional: {
    productId: process.env.PACHET_PLUS || '',
    name: 'Plus', 
    description: 'Pachet Plus - Promovare avansată',
    fallbackPrice: 10000,
    currency: 'ron',
  },
  premium: {
    productId: process.env.PACHET_PREMIUM || '',
    name: 'Premium',
    description: 'Pachet Premium - Promovare completă',
    fallbackPrice: 20000,
    currency: 'ron',
  },
};

async function getActivePriceForProduct(productId: string): Promise<string | null> {
  try {
    const prices = await stripe.prices.list({
      product: productId,
      active: true,
      limit: 1,
    });
    
    return prices.data.length > 0 ? prices.data[0].id : null;
  } catch (error) {
    console.error('Error fetching prices for product:', productId, error);
    return null;
  }
}

export async function POST(request: NextRequest) {
  try {
    if (!process.env.STRIPE_SECRET_KEY) {
      return NextResponse.json(
        { error: 'Configurația Stripe nu este completă. STRIPE_SECRET_KEY lipsește.' },
        { status: 500 }
      );
    }

    const body = await request.json();
    
    const validatedData = artistFormSchema.parse(body);
    
    const selectedPackage = packages[validatedData.package];
    
    if (!selectedPackage) {
      return NextResponse.json(
        { error: 'Pachet invalid' },
        { status: 400 }
      );
    }

    let priceId: string | null = null;
    let useFallback = false;

    if (selectedPackage.productId) {
      priceId = await getActivePriceForProduct(selectedPackage.productId);
    }
    
    if (!priceId) {
      console.log(`Nu s-a găsit price pentru ${selectedPackage.productId}, folosesc fallback`);
      useFallback = true;
    }

    let lineItems;
    
    if (useFallback) {
      lineItems = [
        {
          price_data: {
            currency: selectedPackage.currency,
            product_data: {
              name: `MuzicaMea Radio - ${selectedPackage.name}`,
              description: selectedPackage.description,
              images: [`${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/logo.png`],
            },
            unit_amount: selectedPackage.fallbackPrice,
          },
          quantity: 1,
        },
      ];
    } else {
      lineItems = [
        {
          price: priceId!,
          quantity: 1,
        },
      ];
    }

    const sessionConfig: Stripe.Checkout.SessionCreateParams = {
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/artist-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/artist-cancel`,
      metadata: {
        artistName: validatedData.artistName,
        songTitle: validatedData.songTitle,
        email: validatedData.email,
        phone: validatedData.phone || '',
        description: validatedData.description || '',
        linkConnectare: validatedData.linkConnectare || '',
        linkMuzica: validatedData.linkMuzica || '',
        package: validatedData.package,
        hasImage: validatedData.hasImage ? 'true' : 'false',
      },
      allow_promotion_codes: true,
      custom_text: {
        submit: {
          message: 'Poți folosi caractere alfanumerice și underscore (_) în codul promoțional'
        }
      },
    };

    const session = await stripe.checkout.sessions.create(sessionConfig);

    return NextResponse.json({ 
      sessionId: session.id,
      url: session.url 
    });

  } catch (error) {
    console.error('Stripe error:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { 
          error: 'Date invalide', 
          details: error.issues 
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Eroare la crearea sesiunii de plată' },
      { status: 500 }
    );
  }
}



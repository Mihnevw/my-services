import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { STRIPE_PRICE_IDS } from '@/lib/stripe';

// Initialize Stripe with secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2025-04-30.basil',
});

export async function POST(request: Request) {
  try {
    // Get the plan from the request body
    const { plan } = await request.json();

    // Get the price ID based on the selected plan
    const priceId =
      plan === 'basic' ? STRIPE_PRICE_IDS.basic :
        plan === 'standard' ? STRIPE_PRICE_IDS.standard :
          plan === 'premium' ? STRIPE_PRICE_IDS.premium :
            null;

    if (!priceId) {
      return NextResponse.json({ error: 'Invalid plan selected' }, { status: 400 });
    }

    // Create a Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_WEBSITE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_WEBSITE_URL}/pricing`,
    });

    // Return the checkout session ID
    return NextResponse.json({ sessionId: session.id });
  } catch (error) {
    console.error('Stripe checkout error:', error);
    return NextResponse.json(
      { error: 'An error occurred creating the checkout session' },
      { status: 500 }
    );
  }
} 
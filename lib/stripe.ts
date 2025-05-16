import { loadStripe } from '@stripe/stripe-js';

// Load the Stripe.js library
export const getStripe = () => {
  const stripePublishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string;
  
  if (!stripePublishableKey) {
    throw new Error('Stripe publishable key is not set in the environment variables');
  }
  
  return loadStripe(stripePublishableKey);
};

// Add prices for each plan
export const STRIPE_PRICE_IDS = {
  basic: process.env.STRIPE_PRICE_ID_BASIC,
  standard: process.env.STRIPE_PRICE_ID_STANDARD,
  premium: process.env.STRIPE_PRICE_ID_PREMIUM,
}; 
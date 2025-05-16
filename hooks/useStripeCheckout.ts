import { useState } from 'react';
import { getStripe } from '@/lib/stripe';

export function useStripeCheckout() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const redirectToCheckout = async (plan: 'basic' | 'standard' | 'premium') => {
    setIsLoading(true);
    setError(null);

    try {
      // Call our API endpoint to create a checkout session
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ plan }),
      });

      const { sessionId, error } = await response.json();

      if (error) {
        setError(error);
        setIsLoading(false);
        return;
      }

      // Initialize Stripe
      const stripe = await getStripe();
      
      if (!stripe) {
        throw new Error('Failed to load Stripe.js');
      }

      // Redirect to Stripe checkout
      const { error: redirectError } = await stripe.redirectToCheckout({
        sessionId,
      });

      if (redirectError) {
        setError(redirectError.message || 'An error occurred during checkout');
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again later.');
      console.error('Checkout error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    redirectToCheckout,
    isLoading,
    error,
  };
} 
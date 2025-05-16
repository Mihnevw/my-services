# Stripe Integration Setup

This document outlines how to set up Stripe for the pricing plans in your website.

## Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```
# Stripe API keys
STRIPE_SECRET_KEY=sk_test_your_test_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_test_key

# Stripe product IDs for each plan
STRIPE_PRICE_ID_BASIC=price_your_basic_plan_price_id
STRIPE_PRICE_ID_STANDARD=price_your_standard_plan_price_id
STRIPE_PRICE_ID_PREMIUM=price_your_premium_plan_price_id

# Website URL for success/cancel redirects
NEXT_PUBLIC_WEBSITE_URL=http://localhost:3000
```

## Stripe Dashboard Setup

1. Sign up for a Stripe account at [stripe.com](https://stripe.com)
2. Create three products in the Stripe dashboard corresponding to your three pricing plans:
   - Basic
   - Standard
   - Premium
3. For each product, create a price with the appropriate amount and currency
4. Get the price IDs from Stripe and add them to your environment variables
5. Get your API keys from the Stripe dashboard and add them to your environment variables

## Testing

1. Run your application with `npm run dev`
2. Navigate to the pricing page
3. Click on a plan and you should be redirected to the Stripe checkout page
4. For testing, use Stripe's test card numbers:
   - Card number: 4242 4242 4242 4242
   - Expiration: Any future date
   - CVC: Any 3 digits
   - ZIP: Any 5 digits

For more information, visit the [Stripe documentation](https://stripe.com/docs/checkout/quickstart). 
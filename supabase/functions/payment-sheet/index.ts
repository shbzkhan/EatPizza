import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { stripe } from '../_utils/stripe.ts';

console.log('Hello from Functions!');

serve(async (req) => {
  try {
    const { amount } = await req.json();

    // Create a PaymentIntent so that the SDK can charge the logged in customer.
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 1099,
      currency: 'usd',
      // customer: customer,
    });
    const res = {
      publishableKey: Deno.env.get('EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY'),
      paymentIntent: paymentIntent.client_secret,
      // ephemeralKey: ephemeralKey.secret,
      // customer: customer,
    };
    return new Response(JSON.stringify(res), {
      headers: { 'Content-Type': 'application/json' },
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify(error), {
      headers: { 'Content-Type': 'application/json' },
      status: 400,
    });
  }
});

/* To invoke locally:

  1. Run `supabase start` (see: https://supabase.com/docs/reference/cli/supabase-start)
  2. Make an HTTP request:
*/
  curl -i --location --request POST 'https://cgcloafuzcfzjcsgjuvw.supabase.co/functions/v1/hello-world' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNnY2xvYWZ1emNmempjc2dqdXZ3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjM1Njg0MjEsImV4cCI6MjAzOTE0NDQyMX0.rI1u0qBhhQB5Shayh789hosYWpm6k2a6I_ilYBpQXNo' \
    --header 'Content-Type: application/json' \
    --data '{"name":"Functions"}'



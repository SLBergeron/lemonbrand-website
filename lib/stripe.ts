import Stripe from "stripe";

// Lazy initialization to avoid build-time errors
let stripeInstance: Stripe | null = null;

export const stripe = new Proxy({} as Stripe, {
  get(_, prop) {
    if (!stripeInstance) {
      if (!process.env.STRIPE_SECRET_KEY) {
        throw new Error("STRIPE_SECRET_KEY is not set");
      }
      stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY);
    }
    return (stripeInstance as Record<string, unknown>)[prop as string];
  },
});

export const getStripeCustomer = async (
  email: string,
  name?: string
): Promise<Stripe.Customer> => {
  // Try to find existing customer
  const existing = await stripe.customers.list({
    email,
    limit: 1,
  });

  if (existing.data.length > 0) {
    return existing.data[0];
  }

  // Create new customer
  return await stripe.customers.create({
    email,
    name: name || undefined,
  });
};

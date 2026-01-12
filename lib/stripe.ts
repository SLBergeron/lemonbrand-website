import Stripe from "stripe";

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("STRIPE_SECRET_KEY is not set");
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

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

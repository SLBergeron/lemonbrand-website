import { NextRequest, NextResponse } from "next/server";
import { stripe, getStripeCustomer } from "@/lib/stripe";
import { ConvexHttpClient } from "convex/browser";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export async function POST(req: NextRequest) {
  try {
    const { userId, email, name, cohortId, projectIdea } = await req.json();

    if (!userId || !email || !cohortId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Get cohort to get price ID and check spots
    const cohort = await convex.query(api.sprintCohorts.getByCohortId, {
      cohortId,
    });

    if (!cohort) {
      return NextResponse.json({ error: "Cohort not found" }, { status: 404 });
    }

    if (cohort.spotsRemaining <= 0) {
      return NextResponse.json({ error: "Cohort is full" }, { status: 400 });
    }

    // Get or create Stripe customer
    const customer = await getStripeCustomer(email, name);

    // Update user with Stripe customer ID if not already set
    await convex.mutation(api.users.updateStripeCustomerId, {
      userId: userId as Id<"users">,
      stripeCustomerId: customer.id,
    });

    // Create Stripe Checkout session
    const session = await stripe.checkout.sessions.create({
      customer: customer.id,
      payment_method_types: ["card"],
      line_items: [
        {
          price: cohort.stripePriceId,
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/welcome/sprint?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/checkout/sprint?canceled=true`,
      metadata: {
        convexUserId: userId,
        cohortId: cohortId,
        productType: "sprint",
        projectIdea: projectIdea || "",
      },
      allow_promotion_codes: true,
    });

    // Create pending enrollment in Convex
    await convex.mutation(api.sprintEnrollments.createPending, {
      userId: userId as Id<"users">,
      cohortId,
      stripeCheckoutSessionId: session.id,
      stripeCustomerId: customer.id,
      projectIdea,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Checkout session error:", error);
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    );
  }
}

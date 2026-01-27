import { NextRequest, NextResponse } from "next/server";
import { stripe, getStripeCustomer } from "@/lib/stripe";
import { getConvexClient } from "@/lib/convex-server";
import { api } from "@lemonbrand/convex";

const SPRINT_PRICE = process.env.STRIPE_SPRINT_PRICE_ID;
const SPRINT_AMOUNT = 29700; // $297 in cents

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, localProgress, userId, returnUrl } = body;

    // Validate email
    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json(
        { error: "Valid email is required" },
        { status: 400 }
      );
    }

    if (!SPRINT_PRICE) {
      console.error("STRIPE_SPRINT_PRICE_ID is not configured");
      return NextResponse.json(
        { error: "Payment configuration error" },
        { status: 500 }
      );
    }

    const convex = getConvexClient();

    // Check if email already has a completed purchase
    const hasCompleted = await convex.query(
      api.sprintCheckout.hasCompletedPurchase,
      { email: email.toLowerCase() }
    );

    if (hasCompleted) {
      return NextResponse.json(
        { error: "This email already has a Sprint purchase. Please sign in." },
        { status: 400 }
      );
    }

    // Get or create Stripe customer
    const customer = await getStripeCustomer(email.toLowerCase());

    // Determine success and cancel URLs
    const origin = request.headers.get("origin") || "http://localhost:3001";
    const successUrl = `${origin}/sprint/welcome?session_id={CHECKOUT_SESSION_ID}`;
    const cancelUrl = returnUrl || `${origin}/sprint/checkout?canceled=true`;

    // Create Stripe Checkout session
    const session = await stripe.checkout.sessions.create({
      customer: customer.id,
      line_items: [
        {
          price: SPRINT_PRICE,
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: successUrl,
      cancel_url: cancelUrl,
      metadata: {
        type: "sprint-self-paced",
        email: email.toLowerCase(),
        userId: userId || "",
      },
      allow_promotion_codes: true,
      customer_update: {
        address: "auto",
        name: "auto",
      },
    });

    // Store pending purchase in Convex
    await convex.mutation(api.sprintCheckout.createPendingPurchase, {
      email: email.toLowerCase(),
      stripeSessionId: session.id,
      localProgress: localProgress || null,
    });

    return NextResponse.json({
      url: session.url,
      sessionId: session.id,
    });
  } catch (error) {
    console.error("Create checkout error:", error);
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    );
  }
}

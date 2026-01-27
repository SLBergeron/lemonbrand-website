import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { getConvexClient } from "@/lib/convex-server";
import { api } from "@lemonbrand/convex";
import Stripe from "stripe";
import { resend, EMAIL_FROM, SITE_URL } from "@/lib/resend";
import { render } from "@react-email/components";
import SprintSignupConfirmation from "@/emails/sprint-signup-confirmation";

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const signature = request.headers.get("stripe-signature");

    if (!signature || !webhookSecret) {
      console.error("Missing Stripe signature or webhook secret");
      return NextResponse.json(
        { error: "Missing signature" },
        { status: 400 }
      );
    }

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err) {
      console.error("Webhook signature verification failed:", err);
      return NextResponse.json(
        { error: "Invalid signature" },
        { status: 400 }
      );
    }

    const convex = getConvexClient();

    // Handle the checkout.session.completed event
    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;

      // Check if this is a sprint-self-paced purchase
      if (session.metadata?.type === "sprint-self-paced") {
        // Complete the pending purchase
        await convex.mutation(api.sprintCheckout.completePendingPurchase, {
          stripeSessionId: session.id,
          stripeCustomerId: session.customer as string,
        });

        // Get the pending purchase to retrieve email
        const pendingPurchase = await convex.query(
          api.sprintCheckout.getPendingPurchaseBySession,
          { stripeSessionId: session.id }
        );

        if (pendingPurchase?.email) {
          // Send confirmation email
          try {
            const html = await render(
              SprintSignupConfirmation({
                email: pendingPurchase.email,
                dashboardUrl: `${SITE_URL}/sprint/day/2`,
              })
            );

            await resend.emails.send({
              from: EMAIL_FROM,
              to: pendingPurchase.email,
              subject: "You're in! Here's what happens next",
              html,
            });

            console.log(
              `Confirmation email sent to ${pendingPurchase.email}`
            );
          } catch (emailError) {
            // Log but don't fail the webhook for email errors
            console.error("Failed to send confirmation email:", emailError);
          }
        }

        console.log(
          `Sprint self-paced purchase completed for session: ${session.id}`
        );
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json(
      { error: "Webhook handler failed" },
      { status: 500 }
    );
  }
}

// Disable body parsing - Stripe needs the raw body for signature verification
export const config = {
  api: {
    bodyParser: false,
  },
};

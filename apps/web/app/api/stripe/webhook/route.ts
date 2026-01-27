import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { stripe } from "@/lib/stripe";
import { ConvexHttpClient } from "convex/browser";
import { api } from "@lemonbrand/convex";
import { Id } from "@/convex/_generated/dataModel";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature");

  if (!sig) {
    return NextResponse.json(
      { error: "Missing stripe-signature header" },
      { status: 400 }
    );
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        const metadata = session.metadata;

        if (!metadata?.convexUserId || metadata?.productType !== "sprint") {
          console.log("Skipping non-sprint checkout session");
          break;
        }

        console.log(
          "Processing sprint checkout completion:",
          session.id
        );

        // Activate the enrollment
        const enrollmentId = await convex.mutation(
          api.sprintEnrollments.activate,
          {
            stripeCheckoutSessionId: session.id,
            stripePaymentIntentId: session.payment_intent as string,
            amountPaid: session.amount_total || 29700,
            currency: session.currency || "usd",
          }
        );

        // Decrement cohort spots
        if (metadata.cohortId) {
          await convex.mutation(api.sprintCohorts.decrementSpots, {
            cohortId: metadata.cohortId,
          });
        }

        // Initialize day progress records
        await convex.mutation(api.sprintDayProgress.initializeForEnrollment, {
          userId: metadata.convexUserId as Id<"users">,
          enrollmentId: enrollmentId as Id<"sprintEnrollments">,
        });

        console.log(
          "Sprint enrollment activated:",
          enrollmentId
        );
        break;
      }

      case "payment_intent.payment_failed": {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        console.error("Payment failed:", paymentIntent.id);
        // Could send an email notification here
        break;
      }

      case "charge.refunded": {
        const charge = event.data.object as Stripe.Charge;
        console.log("Charge refunded:", charge.id);
        // Could update enrollment status to reflect refund
        break;
      }

      default:
        console.log("Unhandled event type:", event.type);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Webhook processing error:", error);
    return NextResponse.json(
      { error: "Webhook processing failed" },
      { status: 500 }
    );
  }
}

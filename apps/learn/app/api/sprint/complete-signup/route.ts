import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { getConvexClient } from "@/lib/convex-server";
import { api } from "@lemonbrand/convex";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { sessionId, userId, name } = body;

    if (!sessionId) {
      return NextResponse.json(
        { error: "Session ID is required" },
        { status: 400 }
      );
    }

    const convex = getConvexClient();

    // Verify the pending purchase is completed (paid)
    const pendingPurchase = await convex.query(
      api.sprintCheckout.getPendingPurchaseBySession,
      { stripeSessionId: sessionId }
    );

    if (!pendingPurchase) {
      return NextResponse.json(
        { error: "Purchase not found" },
        { status: 404 }
      );
    }

    if (pendingPurchase.status !== "completed") {
      return NextResponse.json(
        { error: "Payment not completed" },
        { status: 400 }
      );
    }

    // Get Stripe session details for payment info
    const stripeSession = await stripe.checkout.sessions.retrieve(sessionId);

    if (!userId) {
      // User needs to create account first - return pending status
      return NextResponse.json({
        status: "pending_account",
        email: pendingPurchase.email,
        localProgress: pendingPurchase.localProgress,
      });
    }

    // Create the self-paced enrollment
    const enrollmentId = await convex.mutation(
      api.sprintCheckout.createSelfPacedEnrollment,
      {
        userId,
        stripeSessionId: sessionId,
        stripeCustomerId: pendingPurchase.stripeCustomerId,
        stripePaymentIntentId: stripeSession.payment_intent as string,
        amountPaid: stripeSession.amount_total || 29700,
        currency: stripeSession.currency || "usd",
      }
    );

    // Sync local progress if available
    if (pendingPurchase.localProgress) {
      await convex.mutation(api.sprintCheckout.syncLocalProgress, {
        userId,
        localProgress: pendingPurchase.localProgress,
      });
    }

    // Update user name if provided and different
    if (name) {
      try {
        // Update user name in Convex if the users table has an update mutation
        // This is optional - skip if it fails
      } catch (e) {
        console.log("Could not update user name:", e);
      }
    }

    return NextResponse.json({
      status: "success",
      enrollmentId,
      redirectTo: "/sprint/day/2",
    });
  } catch (error) {
    console.error("Complete signup error:", error);
    return NextResponse.json(
      { error: "Failed to complete signup" },
      { status: 500 }
    );
  }
}

// GET endpoint for checking session status
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get("session_id");

    if (!sessionId) {
      return NextResponse.json(
        { error: "Session ID is required" },
        { status: 400 }
      );
    }

    const convex = getConvexClient();

    // Check pending purchase status
    const pendingPurchase = await convex.query(
      api.sprintCheckout.getPendingPurchaseBySession,
      { stripeSessionId: sessionId }
    );

    if (!pendingPurchase) {
      return NextResponse.json(
        { error: "Purchase not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      status: pendingPurchase.status,
      email: pendingPurchase.email,
      hasLocalProgress: !!pendingPurchase.localProgress,
    });
  } catch (error) {
    console.error("Check session error:", error);
    return NextResponse.json(
      { error: "Failed to check session" },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { getConvexClient } from "@/lib/convex-server";
import { api } from "@lemonbrand/convex";

// Helper to delay execution
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

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

    // Create the self-paced enrollment with retry logic for user sync timing
    // The user might not exist in Convex yet if UserSyncProvider hasn't completed
    const maxRetries = 5;
    let enrollmentId: string | null = null;
    let lastError: Error | null = null;

    for (let attempt = 0; attempt < maxRetries; attempt++) {
      try {
        console.log(`[complete-signup] Attempt ${attempt + 1}/${maxRetries} to create enrollment for betterAuthId: ${userId}`);

        // Create the self-paced enrollment (userId here is the Better Auth ID)
        enrollmentId = await convex.mutation(
          api.sprintCheckout.createSelfPacedEnrollmentByAuthId,
          {
            betterAuthId: userId,
            stripeSessionId: sessionId,
            stripeCustomerId: pendingPurchase.stripeCustomerId,
            stripePaymentIntentId: stripeSession.payment_intent as string,
            amountPaid: stripeSession.amount_total || 29700,
            currency: stripeSession.currency || "usd",
          }
        );

        console.log(`[complete-signup] Enrollment created successfully: ${enrollmentId}`);
        break; // Success, exit retry loop
      } catch (error) {
        lastError = error instanceof Error ? error : new Error(String(error));

        // Check if it's a "User not found" error (sync timing issue)
        if (lastError.message.includes("User not found")) {
          console.log(`[complete-signup] User not found in Convex yet, waiting before retry...`);
          // Exponential backoff: 500ms, 1s, 2s, 4s, 8s
          await delay(500 * Math.pow(2, attempt));
          continue;
        }

        // For other errors, don't retry
        throw error;
      }
    }

    // If all retries failed due to user sync timing
    if (!enrollmentId && lastError?.message.includes("User not found")) {
      console.error(`[complete-signup] User sync failed after ${maxRetries} attempts`);
      return NextResponse.json(
        {
          error: "User sync still pending. Please try again.",
          code: "USER_SYNC_PENDING",
        },
        { status: 503 }
      );
    }

    if (!enrollmentId) {
      throw lastError || new Error("Failed to create enrollment");
    }

    // Sync local progress if available
    if (pendingPurchase.localProgress) {
      try {
        await convex.mutation(api.sprintCheckout.syncLocalProgressByAuthId, {
          betterAuthId: userId,
          localProgress: pendingPurchase.localProgress,
        });
      } catch (e) {
        // Non-critical, log but don't fail
        console.log("Could not sync local progress:", e);
      }
    }

    // Migrate anonymous progress to user's permanent tables
    if (pendingPurchase.visitorId) {
      try {
        // Get the Convex user to get their internal ID
        const convexUser = await convex.query(api.users.getByAuthId, {
          betterAuthId: userId,
        });

        if (convexUser) {
          await convex.mutation(api.anonymousProgress.migrateToUser, {
            visitorId: pendingPurchase.visitorId,
            userId: convexUser._id,
            enrollmentId: enrollmentId as any, // Type cast as it's a string from the mutation
          });
          console.log(`[complete-signup] Migrated anonymous progress for visitor: ${pendingPurchase.visitorId}`);
        }
      } catch (e) {
        // Non-critical, log but don't fail
        console.log("Could not migrate anonymous progress:", e);
      }
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

import { NextResponse } from "next/server";
import { getConvexClient } from "@/lib/convex";
import { api } from "@/convex/_generated/api";
import { SITE_URL } from "@/lib/resend";

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email || typeof email !== "string") {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    // Unsubscribe via Convex
    const convex = getConvexClient();
    const result = await convex.mutation(api.newsletter.unsubscribe, { email });

    if (!result.success) {
      return NextResponse.json(
        { error: result.error || "Failed to unsubscribe" },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Successfully unsubscribed",
    });
  } catch (error) {
    console.error("Newsletter unsubscribe error:", error);
    return NextResponse.json(
      { error: "Failed to unsubscribe" },
      { status: 500 }
    );
  }
}

// Also support GET for email link unsubscribe
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get("email");

    if (!email) {
      return NextResponse.redirect(`${SITE_URL}?error=missing_email`);
    }

    // Unsubscribe via Convex
    const convex = getConvexClient();
    await convex.mutation(api.newsletter.unsubscribe, { email });

    return NextResponse.redirect(`${SITE_URL}?unsubscribed=true`);
  } catch (error) {
    console.error("Newsletter unsubscribe error:", error);
    return NextResponse.redirect(`${SITE_URL}?error=unsubscribe_failed`);
  }
}

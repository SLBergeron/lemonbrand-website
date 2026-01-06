import { NextResponse } from "next/server";
import { getConvexClient } from "@/lib/convex";
import { resend, EMAIL_FROM, SITE_URL } from "@/lib/resend";
import { api } from "@/convex/_generated/api";
import WelcomeEmail from "@/emails/welcome";
import { render } from "@react-email/components";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get("token");

    if (!token) {
      return NextResponse.redirect(`${SITE_URL}?error=missing_token`);
    }

    // Confirm via Convex
    const convex = getConvexClient();
    const result = await convex.mutation(api.newsletter.confirm, { token });

    if (!result.success) {
      return NextResponse.redirect(`${SITE_URL}?error=invalid_token`);
    }

    // If newly confirmed (not already confirmed), send welcome email
    if (!result.alreadyConfirmed) {
      // Get subscriber email to send welcome
      // For now, we'll skip sending welcome email here since we don't have the email
      // The welcome email can be sent as part of a separate flow or scheduled
    }

    // Redirect to success page
    return NextResponse.redirect(`${SITE_URL}?subscribed=true`);
  } catch (error) {
    console.error("Newsletter confirm error:", error);
    return NextResponse.redirect(`${SITE_URL}?error=confirmation_failed`);
  }
}

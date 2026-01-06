import { NextResponse } from "next/server";
import { getConvexClient } from "@/lib/convex";
import { resend, EMAIL_FROM, SITE_URL } from "@/lib/resend";
import { api } from "@/convex/_generated/api";
import ConfirmationEmail from "@/emails/confirmation";
import { render } from "@react-email/components";

export async function POST(request: Request) {
  try {
    const { email, source = "homepage" } = await request.json();

    if (!email || typeof email !== "string") {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    // Subscribe via Convex
    const convex = getConvexClient();
    const result = await convex.mutation(api.newsletter.subscribe, {
      email,
      source,
      tags: [],
    });

    if (!result.success) {
      return NextResponse.json(
        { error: "Failed to subscribe" },
        { status: 500 }
      );
    }

    // If already subscribed, no need to send confirmation
    if (result.alreadySubscribed) {
      return NextResponse.json({
        success: true,
        message: "Already subscribed",
      });
    }

    // Send confirmation email
    if (result.token) {
      const confirmUrl = `${SITE_URL}/api/newsletter/confirm?token=${result.token}`;

      const emailHtml = await render(
        ConfirmationEmail({ confirmUrl })
      );

      await resend.emails.send({
        from: EMAIL_FROM,
        to: email,
        subject: "Confirm your subscription",
        html: emailHtml,
      });
    }

    return NextResponse.json({
      success: true,
      message: "Check your email to confirm",
    });
  } catch (error) {
    console.error("Newsletter subscribe error:", error);
    return NextResponse.json(
      { error: "Failed to subscribe" },
      { status: 500 }
    );
  }
}

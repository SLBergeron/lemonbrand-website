import { NextResponse } from "next/server";
import { getConvexClient } from "@/lib/convex-server";
import { resend, EMAIL_FROM } from "@/lib/resend";
import { api } from "@lemonbrand/convex";
import WaitlistWelcome from "@/emails/waitlist-welcome";
import { render } from "@react-email/components";

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    // Validate email
    if (!email || typeof email !== "string") {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    // Subscribe to waitlist via Convex
    const convex = getConvexClient();
    const result = await convex.mutation(api.newsletter.subscribeWaitlist, {
      email,
      source: "sprint-waitlist",
    });

    if (!result.success) {
      return NextResponse.json(
        { error: "Failed to join waitlist" },
        { status: 500 }
      );
    }

    // Send welcome email (skip if already subscribed and active)
    if (!result.alreadySubscribed) {
      const emailHtml = await render(WaitlistWelcome({ email }));

      // Send welcome email to subscriber and notification to Simon
      await Promise.all([
        resend.emails.send({
          from: EMAIL_FROM,
          to: email,
          subject: "You're on the 7-Day Sprint waitlist",
          html: emailHtml,
        }),
        resend.emails.send({
          from: EMAIL_FROM,
          to: "hello@lemonbrand.io",
          subject: `New Sprint waitlist signup: ${email}`,
          text: `${email} just joined the 7-Day Sprint waitlist.`,
        }),
      ]);
    }

    return NextResponse.json({
      success: true,
      alreadySubscribed: result.alreadySubscribed || false,
    });
  } catch (error) {
    console.error("Waitlist subscribe error:", error);
    return NextResponse.json(
      { error: "Failed to join waitlist" },
      { status: 500 }
    );
  }
}

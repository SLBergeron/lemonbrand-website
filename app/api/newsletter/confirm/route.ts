import { NextResponse } from "next/server";
import { getConvexClient } from "@/lib/convex";
import { resend, EMAIL_FROM, SITE_URL } from "@/lib/resend";
import { api } from "@/convex/_generated/api";
import Day0WelcomeEmail from "@/emails/onboarding/day-0-welcome";
import { render } from "@react-email/components";

export const dynamic = "force-dynamic";

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

    // If newly confirmed (not already confirmed), send welcome email (Day 0) with CLAUDE.md attached
    if (!result.alreadyConfirmed && result.email) {
      try {
        const emailHtml = await render(Day0WelcomeEmail({ email: result.email }));

        // Fetch the CLAUDE.md template to attach
        const claudeMdResponse = await fetch(`${SITE_URL}/downloads/CLAUDE.md`);
        const claudeMdContent = await claudeMdResponse.text();

        await resend.emails.send({
          from: EMAIL_FROM,
          to: result.email,
          subject: "Your CLAUDE.md template",
          html: emailHtml,
          attachments: [
            {
              filename: "CLAUDE.md",
              content: Buffer.from(claudeMdContent).toString("base64"),
            },
          ],
        });
      } catch (emailError) {
        console.error("Failed to send welcome email:", emailError);
        // Don't fail the confirmation if email fails
      }
    }

    // Redirect to success page
    return NextResponse.redirect(`${SITE_URL}?subscribed=true`);
  } catch (error) {
    console.error("Newsletter confirm error:", error);
    return NextResponse.redirect(`${SITE_URL}?error=confirmation_failed`);
  }
}

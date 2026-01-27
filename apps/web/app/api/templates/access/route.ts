import { NextResponse } from "next/server";
import { getConvexClient } from "@/lib/convex";
import { resend, EMAIL_FROM, SITE_URL } from "@/lib/resend";
import { api } from "@/convex/_generated/api";
import ConfirmationEmail from "@/emails/confirmation";
import { render } from "@react-email/components";
import { Id } from "@/convex/_generated/dataModel";

export async function POST(request: Request) {
  try {
    const { email, templateId } = await request.json();

    if (!email || typeof email !== "string") {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    if (!templateId) {
      return NextResponse.json(
        { error: "Template ID is required" },
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

    const convex = getConvexClient();

    // First, subscribe to newsletter (if not already)
    const subscribeResult = await convex.mutation(api.newsletter.subscribe, {
      email,
      source: "templates",
      tags: ["template-download"],
    });

    // Send confirmation email if new subscriber
    if (subscribeResult.success && subscribeResult.token) {
      const confirmUrl = `${SITE_URL}/api/newsletter/confirm?token=${subscribeResult.token}`;

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

    // Record template access and get template details
    const template = await convex.mutation(api.templates.recordAccess, {
      templateId: templateId as Id<"templates">,
      email,
    });

    if (!template) {
      return NextResponse.json(
        { error: "Template not found" },
        { status: 404 }
      );
    }

    // Return template access info
    return NextResponse.json({
      success: true,
      template: {
        title: template.title,
        description: template.description,
        githubUrl: template.githubUrl,
        guideUrl: template.guideUrl,
        prerequisites: template.prerequisites,
      },
      isNewSubscriber: !subscribeResult.alreadySubscribed,
    });
  } catch (error) {
    console.error("Template access error:", error);
    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 }
    );
  }
}

import { NextResponse } from "next/server";
import { getConvexClient } from "@/lib/convex";
import { resend, EMAIL_FROM } from "@/lib/resend";
import { api } from "@lemonbrand/convex";
import { render } from "@react-email/components";
import { Id } from "@/convex/_generated/dataModel";

// Email templates
import Day2BuildStackEmail from "@/emails/substack/day-2-buildstack";
import Day4CaseStudyEmail from "@/emails/substack/day-4-casestudy";
import Day7FailureEmail from "@/emails/substack/day-7-failure";
import Day14CTAEmail from "@/emails/substack/day-14-cta";

export const dynamic = "force-dynamic";

// Email config by step
// Step 1 = welcome (sent immediately on subscribe)
// Step 2 = day 2 (build stack in action)
// Step 3 = day 4 (case study - segmented)
// Step 4 = day 7 (failure mode / vibe coding trap)
// Step 5 = day 14 (direct CTA - segmented)
const EMAIL_CONFIG: Record<
  number,
  {
    subject: string;
    component: (email: string, segment?: string) => React.ReactElement;
    needsSegment?: boolean;
  }
> = {
  2: {
    subject: "Same request, completely different results",
    component: (email) => Day2BuildStackEmail({ email }),
  },
  3: {
    subject: "Real case study: what operators are shipping",
    component: (email, segment) => Day4CaseStudyEmail({ email, segment: segment || "internal-tool" }),
    needsSegment: true,
  },
  4: {
    subject: "The Vibe Coding Trap",
    component: (email) => Day7FailureEmail({ email }),
  },
  5: {
    subject: "Ready to ship?",
    component: (email, segment) => Day14CTAEmail({ email, segment: segment || "internal-tool" }),
    needsSegment: true,
  },
};

export async function GET(request: Request) {
  // Verify cron secret to prevent unauthorized access
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const convex = getConvexClient();

    // Get subscribers who need substack emails
    const subscribers = await convex.query(
      api.newsletter.getSubscribersForSubstackSequence
    );

    console.log(`Found ${subscribers.length} subscribers for substack sequence`);

    let sent = 0;
    let failed = 0;

    for (const subscriber of subscribers) {
      if (subscriber.nextStep === null || subscriber.nextStep === undefined) {
        // Mark as complete
        await convex.mutation(api.newsletter.updateSubstackStep, {
          subscriberId: subscriber._id as Id<"newsletterSubscribers">,
          newStep: null,
        });
        continue;
      }

      const emailConfig = EMAIL_CONFIG[subscriber.nextStep];
      if (!emailConfig) {
        console.error(`No email config for step ${subscriber.nextStep}`);
        continue;
      }

      try {
        const emailHtml = await render(
          emailConfig.needsSegment
            ? emailConfig.component(subscriber.email, subscriber.segment)
            : emailConfig.component(subscriber.email)
        );

        await resend.emails.send({
          from: EMAIL_FROM,
          to: subscriber.email,
          subject: emailConfig.subject,
          html: emailHtml,
        });

        // Update step
        await convex.mutation(api.newsletter.updateSubstackStep, {
          subscriberId: subscriber._id as Id<"newsletterSubscribers">,
          newStep: subscriber.nextStep,
        });

        sent++;
        console.log(
          `Sent substack step ${subscriber.nextStep} email to ${subscriber.email}`
        );
      } catch (error) {
        console.error(
          `Failed to send email to ${subscriber.email}:`,
          error
        );
        failed++;
      }
    }

    return NextResponse.json({
      success: true,
      processed: subscribers.length,
      sent,
      failed,
    });
  } catch (error) {
    console.error("Substack cron job error:", error);
    return NextResponse.json(
      { error: "Cron job failed" },
      { status: 500 }
    );
  }
}

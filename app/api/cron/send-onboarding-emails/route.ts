import { NextResponse } from "next/server";
import { getConvexClient } from "@/lib/convex";
import { resend, EMAIL_FROM } from "@/lib/resend";
import { api } from "@/convex/_generated/api";
import { render } from "@react-email/components";
import { Id } from "@/convex/_generated/dataModel";

// Email templates
import Day2ContextEmail from "@/emails/onboarding/day-2-context";
import Day3FailureEmail from "@/emails/onboarding/day-3-failure";
import Day4FrameworkEmail from "@/emails/onboarding/day-4-framework";
import Day5SprintEmail from "@/emails/onboarding/day-5-sprint";
import Day7LastCallEmail from "@/emails/onboarding/day-7-last-call";

export const dynamic = "force-dynamic";

// Email config by step
const EMAIL_CONFIG: Record<
  number,
  {
    subject: string;
    component: (email: string) => React.ReactElement;
  }
> = {
  2: {
    subject: "Same request, completely different results",
    component: (email) => Day2ContextEmail({ email }),
  },
  3: {
    subject: "Why your first Claude project probably failed",
    component: (email) => Day3FailureEmail({ email }),
  },
  4: {
    subject: "What to build first (not what you think)",
    component: (email) => Day4FrameworkEmail({ email }),
  },
  5: {
    subject: "If you want to go faster",
    component: (email) => Day5SprintEmail({ email }),
  },
  7: {
    subject: "Last thing (then back to regular emails)",
    component: (email) => Day7LastCallEmail({ email }),
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

    // Get subscribers who need onboarding emails
    const subscribers = await convex.query(
      api.newsletter.getSubscribersForOnboarding
    );

    console.log(`Found ${subscribers.length} subscribers for onboarding`);

    let sent = 0;
    let failed = 0;

    for (const subscriber of subscribers) {
      if (subscriber.nextStep === null || subscriber.nextStep === undefined) {
        // Mark as complete
        await convex.mutation(api.newsletter.updateOnboardingStep, {
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
        const emailHtml = await render(emailConfig.component(subscriber.email));

        await resend.emails.send({
          from: EMAIL_FROM,
          to: subscriber.email,
          subject: emailConfig.subject,
          html: emailHtml,
        });

        // Update step
        await convex.mutation(api.newsletter.updateOnboardingStep, {
          subscriberId: subscriber._id as Id<"newsletterSubscribers">,
          newStep: subscriber.nextStep,
        });

        sent++;
        console.log(
          `Sent day ${subscriber.nextStep} email to ${subscriber.email}`
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
    console.error("Cron job error:", error);
    return NextResponse.json(
      { error: "Cron job failed" },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from "next/server";
import { getConvexClient } from "@/lib/convex-server";
import { api } from "@lemonbrand/convex";
import { resend, EMAIL_FROM, SITE_URL } from "@/lib/resend";
import { render } from "@react-email/components";
import SprintCartAbandonment from "@/emails/sprint-cart-abandonment";

export async function GET(request: NextRequest) {
  // Verify cron secret for security
  const authHeader = request.headers.get("authorization");
  const cronSecret = process.env.CRON_SECRET;

  if (!cronSecret) {
    console.error("CRON_SECRET not configured");
    return NextResponse.json({ error: "Server misconfigured" }, { status: 500 });
  }

  if (authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const convex = getConvexClient();

    // Get pending purchases that need abandonment emails
    const pendingPurchases = await convex.query(
      api.sprintCheckout.getPendingForAbandonment,
      {}
    );

    console.log(`Found ${pendingPurchases.length} pending purchases for abandonment emails`);

    let sent = 0;
    let failed = 0;

    for (const purchase of pendingPurchases) {
      try {
        // Render and send email
        const html = await render(
          SprintCartAbandonment({
            email: purchase.email,
            checkoutUrl: `${SITE_URL}/sprint/checkout`,
          })
        );

        await resend.emails.send({
          from: EMAIL_FROM,
          to: purchase.email,
          subject: "Still thinking about the Sprint?",
          html,
        });

        // Mark as sent
        await convex.mutation(api.sprintCheckout.markAbandonmentEmailSent, {
          purchaseId: purchase._id,
        });

        console.log(`Abandonment email sent to ${purchase.email}`);
        sent++;
      } catch (error) {
        console.error(`Failed to send abandonment email to ${purchase.email}:`, error);
        failed++;
      }
    }

    return NextResponse.json({
      success: true,
      processed: pendingPurchases.length,
      sent,
      failed,
    });
  } catch (error) {
    console.error("Cart abandonment cron error:", error);
    return NextResponse.json(
      { error: "Cron job failed" },
      { status: 500 }
    );
  }
}

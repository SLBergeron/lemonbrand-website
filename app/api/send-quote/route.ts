import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

// Email configuration
const EMAIL_FROM = "Simon Bergeron <hello@lemonbrand.io>";
const ADMIN_EMAIL = "simon@lemonbrand.io";
const PARTNER_EMAIL = "christiane@drouincreations.com";

export async function POST(request: Request) {
  try {
    const { cart, quoteForm, totals } = await request.json();

    // Validate required fields
    if (!quoteForm.name || !quoteForm.email) {
      return NextResponse.json(
        { error: "Name and email are required" },
        { status: 400 }
      );
    }

    // Check if Resend API key is configured
    if (!process.env.RESEND_API_KEY) {
      console.warn("RESEND_API_KEY not configured. Email not sent.");
      console.log("Quote submission:", {
        from: quoteForm,
        cart,
        totals,
      });

      // Generate preview HTML for development
      const previewHtml = generateQuoteEmail(cart, quoteForm, totals, true);

      return NextResponse.json(
        {
          message: "Quote received (email sending not configured)",
          preview: previewHtml
        },
        { status: 200 }
      );
    }

    // Generate customer-specific email (with personalized greeting)
    const customerEmailContent = generateQuoteEmail(cart, quoteForm, totals, true);
    // Generate admin email (with lead info prominent)
    const adminEmailContent = generateQuoteEmail(cart, quoteForm, totals, false);

    // Send emails using Resend
    try {
      // Send to customer
      const customerEmail = await resend.emails.send({
        from: EMAIL_FROM,
        to: [quoteForm.email],
        replyTo: ADMIN_EMAIL,
        subject: `Your Quote from Lemon Brand - $${totals.drouinTotal.toLocaleString()} CAD`,
        html: customerEmailContent,
      });

      if (customerEmail.error) {
        console.error("Failed to send customer email:", customerEmail.error);
      }

      // Send to admin and partner
      const adminEmail = await resend.emails.send({
        from: EMAIL_FROM,
        to: [ADMIN_EMAIL, PARTNER_EMAIL],
        replyTo: quoteForm.email,
        subject: `New Quote Request from ${quoteForm.name}${quoteForm.company ? ` (${quoteForm.company})` : ""} - $${totals.drouinTotal.toLocaleString()} CAD`,
        html: adminEmailContent,
      });

      if (adminEmail.error) {
        console.error("Failed to send admin email:", adminEmail.error);
        // Still return success if customer email was sent
        if (!customerEmail.error) {
          return NextResponse.json(
            { message: "Quote sent to customer (admin notification failed)", emailId: customerEmail.data?.id },
            { status: 200 }
          );
        }
        return NextResponse.json(
          { error: "Failed to send emails", details: adminEmail.error },
          { status: 500 }
        );
      }

      console.log("Emails sent successfully:", { customer: customerEmail.data?.id, admin: adminEmail.data?.id });
      return NextResponse.json(
        { message: "Quote sent successfully", emailIds: { customer: customerEmail.data?.id, admin: adminEmail.data?.id } },
        { status: 200 }
      );
    } catch (emailError) {
      console.error("Error sending emails:", emailError);
      return NextResponse.json(
        { error: "Failed to send emails", details: emailError },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Error processing quote:", error);
    return NextResponse.json(
      { error: "Failed to process quote" },
      { status: 500 }
    );
  }
}

function generateQuoteEmail(cart: any[], quoteForm: any, totals: any, isCustomerEmail: boolean = false): string {
  const date = new Date().toLocaleDateString();
  const expiryDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString();

  const servicesRows = cart.map(item => `
    <tr style="border-bottom: 1px solid #e5e7eb;">
      <td style="padding: 12px 8px; font-weight: 500;">
        ${item.name}
        ${item.lineItems && item.lineItems.length > 0 ? `
          <div style="margin-top: 8px; padding-top: 8px; border-top: 1px solid #f3f4f6;">
            <div style="font-size: 10px; font-weight: 600; color: #6b7280; margin-bottom: 4px; text-transform: uppercase; letter-spacing: 0.5px;">Configuration Details:</div>
            ${item.lineItems.map((lineItem: any) => `
              <div style="font-size: 12px; color: #6b7280; display: flex; justify-content: space-between; padding: 2px 0;">
                <span>${lineItem.label}</span>
                <span style="font-weight: 500;">${lineItem.value}</span>
              </div>
            `).join('')}
          </div>
        ` : ''}
      </td>
      <td style="padding: 12px 8px; text-align: right; color: #9ca3af; text-decoration: line-through; vertical-align: top;">
        $${item.regularPrice.toLocaleString()}
        ${item.recurring ? `<div style="font-size: 11px;">+$${item.recurring.regularPrice}/mo</div>` : ''}
      </td>
      <td style="padding: 12px 8px; text-align: right; font-weight: 600; vertical-align: top;">
        $${item.drouinPrice.toLocaleString()}
        ${item.recurring ? `<div style="font-size: 11px; font-weight: 400;">+$${item.recurring.drouinPrice}/mo</div>` : ''}
      </td>
      <td style="padding: 12px 8px; text-align: right; font-size: 14px; vertical-align: top;">${item.delivery}</td>
    </tr>
  `).join('');

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Quote - Lemon Brand × Drouin Creations</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      background: white;
      color: #1f2937;
      padding: 40px;
      max-width: 900px;
      margin: 0 auto;
    }

    .header {
      display: flex;
      justify-content: space-between;
      align-items: start;
      margin-bottom: 32px;
      padding-bottom: 16px;
      border-bottom: 2px solid #1f2937;
    }

    .logo-section {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .logo-text {
      font-size: 18px;
      font-weight: 700;
      color: #1f2937;
    }

    .header-right {
      text-align: right;
    }

    .header-right p:first-child {
      font-weight: 700;
      font-size: 14px;
    }

    .header-right p:last-child {
      font-size: 12px;
      color: #6b7280;
      margin-top: 4px;
    }

    .card {
      background: white;
      border: 1px solid #d1d5db;
      border-radius: 8px;
      margin-bottom: 24px;
      overflow: hidden;
    }

    .card-header {
      padding: 16px 20px 12px;
      border-bottom: 1px solid #e5e7eb;
    }

    .card-title {
      font-size: 16px;
      font-weight: 700;
      color: #1f2937;
    }

    .card-content {
      padding: 16px 20px;
    }

    .info-row {
      margin-bottom: 8px;
      font-size: 14px;
    }

    .info-row span {
      font-weight: 600;
    }

    table {
      width: 100%;
      border-collapse: collapse;
    }

    th {
      text-align: left;
      padding: 8px;
      font-size: 14px;
      font-weight: 600;
      border-bottom: 2px solid #1f2937;
    }

    th:nth-child(2),
    th:nth-child(3),
    th:nth-child(4) {
      text-align: right;
    }

    .summary-card {
      background: #f9fafb;
    }

    .summary-row {
      display: flex;
      justify-content: space-between;
      margin-bottom: 8px;
      font-size: 14px;
    }

    .summary-row.discount {
      color: #16a34a;
      font-weight: 500;
    }

    .summary-row.total {
      font-size: 20px;
      font-weight: 700;
      padding-top: 12px;
      border-top: 2px solid #1f2937;
      margin-top: 8px;
    }

    .delivery-info {
      font-size: 12px;
      color: #6b7280;
      margin-top: 12px;
    }

    ol {
      padding-left: 20px;
      font-size: 14px;
      line-height: 1.8;
    }

    ol li {
      margin-bottom: 6px;
    }

    .footer {
      text-align: center;
      font-size: 12px;
      color: #6b7280;
      border-top: 1px solid #d1d5db;
      padding-top: 16px;
      margin-top: 32px;
    }

    .footer p {
      margin-bottom: 8px;
    }

    .footer p:first-child {
      font-weight: 600;
      font-size: 14px;
      color: #1f2937;
    }
  </style>
</head>
<body>
  <!-- Header -->
  <div class="header">
    <div class="logo-section">
      <div class="logo-text">LEMON BRAND × DROUIN CREATIONS</div>
    </div>
    <div class="header-right">
      <p>SERVICE QUOTE</p>
      <p>${date}</p>
    </div>
  </div>

  ${isCustomerEmail ? `
  <!-- Personalized Greeting for Customer -->
  <div style="margin-bottom: 24px; padding: 20px; background: linear-gradient(135deg, #fff7ed 0%, #fef3c7 100%); border-radius: 8px; border-left: 4px solid #f97316;">
    <p style="font-size: 18px; font-weight: 600; color: #1f2937; margin-bottom: 8px;">Hi ${quoteForm.name.split(' ')[0]}!</p>
    <p style="color: #4b5563; line-height: 1.6;">Thank you for building your quote with us. Below you'll find all the details of your selected services. As a Drouin Creations partner client, you're receiving an exclusive <strong style="color: #16a34a;">25% discount</strong> on all services.</p>
    <p style="color: #4b5563; margin-top: 12px;">This quote has been sent to our team and we'll be in touch within 24 hours to discuss next steps.</p>
  </div>
  ` : `
  <!-- Admin Alert Banner -->
  <div style="margin-bottom: 24px; padding: 16px 20px; background: #fef3c7; border-radius: 8px; border: 1px solid #fbbf24;">
    <p style="font-size: 14px; font-weight: 600; color: #92400e; margin: 0;">🔔 New Quote Request - Follow up within 24 hours</p>
  </div>

  <!-- Client Information -->
  <div class="card">
    <div class="card-header">
      <div class="card-title">Client Information</div>
    </div>
    <div class="card-content">
      <div class="info-row"><span>Name:</span> ${quoteForm.name}</div>
      ${quoteForm.company ? `<div class="info-row"><span>Company:</span> ${quoteForm.company}</div>` : ''}
      <div class="info-row"><span>Email:</span> <a href="mailto:${quoteForm.email}" style="color: #f97316;">${quoteForm.email}</a></div>
      ${quoteForm.phone ? `<div class="info-row"><span>Phone:</span> <a href="tel:${quoteForm.phone}" style="color: #f97316;">${quoteForm.phone}</a></div>` : ''}
      ${quoteForm.message ? `<div class="info-row" style="margin-top: 12px;"><span>Message:</span><br><div style="margin-top: 4px; color: #4b5563; background: #f9fafb; padding: 12px; border-radius: 4px;">${quoteForm.message}</div></div>` : ''}
    </div>
  </div>
  `}

  <!-- Selected Services -->
  <div class="card">
    <div class="card-header">
      <div class="card-title">Selected Services</div>
    </div>
    <div class="card-content">
      ${cart.length === 0 ? '<p style="color: #6b7280; font-size: 14px;">No services selected.</p>' : `
      <table>
        <thead>
          <tr>
            <th>Service</th>
            <th>Regular</th>
            <th>Drouin Price</th>
            <th>Delivery</th>
          </tr>
        </thead>
        <tbody>
          ${servicesRows}
        </tbody>
      </table>
      `}
    </div>
  </div>

  ${cart.length > 0 ? `
  <!-- Pricing Summary -->
  <div class="card summary-card">
    <div class="card-header">
      <div class="card-title">Pricing Summary</div>
    </div>
    <div class="card-content">
      <div class="summary-row">
        <span>Subtotal (Regular):</span>
        <span style="color: #9ca3af;">$${totals.regularTotal.toLocaleString()} CAD</span>
      </div>
      <div class="summary-row discount">
        <span>Drouin Client Discount (25%):</span>
        <span>-$${totals.discount.toLocaleString()} CAD</span>
      </div>
      <div class="summary-row total">
        <span>TOTAL:</span>
        <span>$${totals.drouinTotal.toLocaleString()} CAD</span>
      </div>
      <div class="delivery-info">
        <p>Estimated delivery: ~${totals.totalDelivery} weeks (some services run in parallel)</p>
      </div>
    </div>
  </div>
  ` : ''}

  <!-- Next Steps -->
  <div class="card">
    <div class="card-header">
      <div class="card-title">Next Steps</div>
    </div>
    <div class="card-content">
      <ol>
        <li>Review this quote with your Drouin Creations representative</li>
        <li>Contact us at <strong>simon@lemonbrand.io</strong> with any questions</li>
        <li>Book a call at <strong>lemonbrand.io/drouin-creations</strong></li>
        <li>Upon approval, we'll send a detailed project scope and timeline</li>
      </ol>
    </div>
  </div>

  <!-- Footer -->
  <div class="footer">
    <p>LEMON BRAND × DROUIN CREATIONS</p>
    <p>simon@lemonbrand.io • lemonbrand.io</p>
    <p>Quote valid until ${expiryDate}</p>
    ${isCustomerEmail ? `
    <p style="margin-top: 16px; font-size: 11px; color: #9ca3af;">
      You received this email because you requested a quote from Lemon Brand via the Drouin Creations partner portal.
      If you didn't request this quote, please ignore this email.
    </p>
    ` : ''}
  </div>
</body>
</html>
  `;
}

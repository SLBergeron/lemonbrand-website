import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

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

    // Generate HTML email content
    const htmlContent = generateQuoteEmail(cart, quoteForm, totals);

    // Check if Resend API key is configured
    if (!process.env.RESEND_API_KEY) {
      console.warn("RESEND_API_KEY not configured. Email not sent.");
      console.log("Quote submission:", {
        from: quoteForm,
        cart,
        totals,
      });

      return NextResponse.json(
        {
          message: "Quote received (email sending not configured)",
          preview: htmlContent
        },
        { status: 200 }
      );
    }

    // Send email using Resend
    try {
      const { data, error } = await resend.emails.send({
        from: "Lemon Brand Quotes <onboarding@resend.dev>",
        to: ["hello@lemonbrand.io", "christiane@drouincreations.com", quoteForm.email],
        replyTo: quoteForm.email,
        subject: `New Quote Request from ${quoteForm.name}${quoteForm.company ? ` (${quoteForm.company})` : ""}`,
        html: htmlContent,
      });

      if (error) {
        console.error("Resend error:", error);
        return NextResponse.json(
          { error: "Failed to send email", details: error },
          { status: 500 }
        );
      }

      console.log("Email sent successfully:", data);
      return NextResponse.json(
        { message: "Quote sent successfully", emailId: data?.id },
        { status: 200 }
      );
    } catch (emailError) {
      console.error("Error sending email:", emailError);
      return NextResponse.json(
        { error: "Failed to send email", details: emailError },
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

function generateQuoteEmail(cart: any[], quoteForm: any, totals: any): string {
  const date = new Date().toLocaleDateString();

  const servicesRows = cart.map(item => `
    <tr style="border-bottom: 1px solid #e5e7eb;">
      <td style="padding: 12px 8px; font-weight: 500;">${item.name}</td>
      <td style="padding: 12px 8px; text-align: right; color: #9ca3af; text-decoration: line-through;">
        $${item.regularPrice.toLocaleString()}
        ${item.recurring ? `<div style="font-size: 11px;">+$${item.recurring.regularPrice}/mo</div>` : ''}
      </td>
      <td style="padding: 12px 8px; text-align: right; font-weight: 600;">
        $${item.drouinPrice.toLocaleString()}
        ${item.recurring ? `<div style="font-size: 11px; font-weight: 400;">+$${item.recurring.drouinPrice}/mo</div>` : ''}
      </td>
      <td style="padding: 12px 8px; text-align: right; font-size: 14px;">${item.delivery}</td>
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

  ${quoteForm.name ? `
  <!-- Client Information -->
  <div class="card">
    <div class="card-header">
      <div class="card-title">Client Information</div>
    </div>
    <div class="card-content">
      <div class="info-row"><span>Name:</span> ${quoteForm.name}</div>
      ${quoteForm.company ? `<div class="info-row"><span>Company:</span> ${quoteForm.company}</div>` : ''}
      ${quoteForm.email ? `<div class="info-row"><span>Email:</span> ${quoteForm.email}</div>` : ''}
      ${quoteForm.phone ? `<div class="info-row"><span>Phone:</span> ${quoteForm.phone}</div>` : ''}
      ${quoteForm.message ? `<div class="info-row" style="margin-top: 12px;"><span>Message:</span><br><div style="margin-top: 4px; color: #4b5563;">${quoteForm.message}</div></div>` : ''}
    </div>
  </div>
  ` : ''}

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
    <p>Quote valid for 30 days from date of issue</p>
  </div>
</body>
</html>
  `;
}

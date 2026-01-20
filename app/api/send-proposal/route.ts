import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

// Email configuration - NO partner email for general proposals
const EMAIL_FROM = "Simon Bergeron <hello@lemonbrand.io>";
const ADMIN_EMAIL = "simon@lemonbrand.io";

interface ProposalData {
  projectType: string;
  projectDescription: string;
  complexity: string;
  userCount: number;
  integrations: number;
  features: Record<string, boolean>;
  timeline: string;
  companyName: string;
  email: string;
}

interface Calculations {
  priceRangeLow: number;
  priceRangeHigh: number;
  estimatedWeeks: number;
  monthlyMaintenance: number;
  estimatedTotal: number;
}

export async function POST(request: Request) {
  try {
    const { proposalData, calculations } = await request.json() as {
      proposalData: ProposalData;
      calculations: Calculations;
    };

    // Validate required fields
    if (!proposalData.email || !proposalData.companyName) {
      return NextResponse.json(
        { error: "Email and company name are required" },
        { status: 400 }
      );
    }

    // Check if Resend API key is configured
    if (!process.env.RESEND_API_KEY) {
      console.warn("RESEND_API_KEY not configured. Email not sent.");
      console.log("Proposal submission:", { proposalData, calculations });

      const previewHtml = generateProposalEmail(proposalData, calculations, true);

      return NextResponse.json(
        {
          message: "Proposal received (email sending not configured)",
          preview: previewHtml
        },
        { status: 200 }
      );
    }

    // Generate customer-specific email (with personalized greeting)
    const customerEmailContent = generateProposalEmail(proposalData, calculations, true);
    // Generate admin email (with lead info prominent)
    const adminEmailContent = generateProposalEmail(proposalData, calculations, false);

    // Send emails using Resend
    try {
      // Send to customer
      const customerEmail = await resend.emails.send({
        from: EMAIL_FROM,
        to: [proposalData.email],
        replyTo: ADMIN_EMAIL,
        subject: `Your Custom Tool Quote - $${calculations.priceRangeLow.toLocaleString()}-$${calculations.priceRangeHigh.toLocaleString()} CAD`,
        html: customerEmailContent,
      });

      if (customerEmail.error) {
        console.error("Failed to send customer email:", customerEmail.error);
      }

      // Send to admin only (no partner for general proposals)
      const adminEmail = await resend.emails.send({
        from: EMAIL_FROM,
        to: [ADMIN_EMAIL],
        replyTo: proposalData.email,
        subject: `New Proposal Request: ${proposalData.companyName} - $${calculations.priceRangeLow.toLocaleString()}-$${calculations.priceRangeHigh.toLocaleString()}`,
        html: adminEmailContent,
      });

      if (adminEmail.error) {
        console.error("Failed to send admin email:", adminEmail.error);
        if (!customerEmail.error) {
          return NextResponse.json(
            { message: "Proposal sent to customer (admin notification failed)", emailId: customerEmail.data?.id },
            { status: 200 }
          );
        }
        return NextResponse.json(
          { error: "Failed to send emails", details: adminEmail.error },
          { status: 500 }
        );
      }

      console.log("Proposal emails sent successfully:", { customer: customerEmail.data?.id, admin: adminEmail.data?.id });
      return NextResponse.json(
        { message: "Proposal sent successfully", emailIds: { customer: customerEmail.data?.id, admin: adminEmail.data?.id } },
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
    console.error("Error processing proposal:", error);
    return NextResponse.json(
      { error: "Failed to process proposal" },
      { status: 500 }
    );
  }
}

const PROJECT_TYPE_LABELS: Record<string, string> = {
  "internal-tool": "Internal Tool",
  "customer-portal": "Customer Portal",
  "automation": "Workflow Automation",
  "dashboard": "Analytics Dashboard",
  "other": "Custom Project",
};

const FEATURE_LABELS: Record<string, string> = {
  authentication: "User Authentication & Roles",
  payments: "Payment Processing",
  notifications: "Email/SMS Notifications",
  reporting: "Reports & Exports",
  fileStorage: "File Upload/Storage",
  externalAPIs: "External API Integrations",
  mobileResponsive: "Mobile-Responsive Design",
  multiTenant: "Multi-Tenant Architecture",
};

function generateProposalEmail(
  data: ProposalData,
  calculations: Calculations,
  isCustomerEmail: boolean
): string {
  const date = new Date().toLocaleDateString();
  const expiryDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString();

  const selectedFeatures = Object.entries(data.features)
    .filter(([_, enabled]) => enabled)
    .map(([key]) => FEATURE_LABELS[key] || key);

  const featuresHtml = selectedFeatures.length > 0
    ? selectedFeatures.map(f => `<li style="padding: 4px 0;">${f}</li>`).join('')
    : '<li style="padding: 4px 0; color: #6b7280;">No additional features selected</li>';

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Custom Tool Proposal - Lemon Brand</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      background: white;
      color: #1f2937;
      padding: 40px;
      max-width: 700px;
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
    .logo-text { font-size: 18px; font-weight: 700; color: #1f2937; }
    .header-right { text-align: right; }
    .header-right p:first-child { font-weight: 700; font-size: 14px; }
    .header-right p:last-child { font-size: 12px; color: #6b7280; margin-top: 4px; }
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
    .card-title { font-size: 16px; font-weight: 700; color: #1f2937; }
    .card-content { padding: 16px 20px; }
    .info-row { margin-bottom: 8px; font-size: 14px; }
    .info-row span { font-weight: 600; }
    .quote-highlight {
      background: linear-gradient(135deg, #fff7ed 0%, #fef3c7 100%);
      border: 2px solid #f97316;
      border-radius: 12px;
      padding: 24px;
      text-align: center;
      margin-bottom: 24px;
    }
    .quote-amount {
      font-size: 32px;
      font-weight: 800;
      color: #1f2937;
      margin-bottom: 8px;
    }
    .quote-label { font-size: 14px; color: #6b7280; }
    .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 24px; }
    .stat-box {
      background: #f9fafb;
      border: 1px solid #e5e7eb;
      border-radius: 8px;
      padding: 16px;
      text-align: center;
    }
    .stat-value { font-size: 24px; font-weight: 700; color: #1f2937; }
    .stat-label { font-size: 12px; color: #6b7280; margin-top: 4px; }
    ul { padding-left: 20px; font-size: 14px; line-height: 1.8; }
    .footer {
      text-align: center;
      font-size: 12px;
      color: #6b7280;
      border-top: 1px solid #d1d5db;
      padding-top: 16px;
      margin-top: 32px;
    }
    .footer p { margin-bottom: 8px; }
    .footer p:first-child { font-weight: 600; font-size: 14px; color: #1f2937; }
    .cta-button {
      display: inline-block;
      background: #f97316;
      color: white;
      padding: 12px 24px;
      border-radius: 8px;
      text-decoration: none;
      font-weight: 600;
      margin-top: 16px;
    }
  </style>
</head>
<body>
  <!-- Header -->
  <div class="header">
    <div class="logo-text">LEMON BRAND</div>
    <div class="header-right">
      <p>CUSTOM TOOL PROPOSAL</p>
      <p>${date}</p>
    </div>
  </div>

  ${isCustomerEmail ? `
  <!-- Personalized Greeting for Customer -->
  <div style="margin-bottom: 24px; padding: 20px; background: linear-gradient(135deg, #fff7ed 0%, #fef3c7 100%); border-radius: 8px; border-left: 4px solid #f97316;">
    <p style="font-size: 18px; font-weight: 600; color: #1f2937; margin-bottom: 8px;">Hi there!</p>
    <p style="color: #4b5563; line-height: 1.6;">Thanks for using our proposal generator. Below is your personalized quote for a custom ${PROJECT_TYPE_LABELS[data.projectType] || data.projectType}.</p>
    <p style="color: #4b5563; margin-top: 12px;">This is an estimate based on your inputs. For an exact quote, let's schedule a quick discovery call.</p>
  </div>
  ` : `
  <!-- Admin Alert Banner -->
  <div style="margin-bottom: 24px; padding: 16px 20px; background: #fef3c7; border-radius: 8px; border: 1px solid #fbbf24;">
    <p style="font-size: 14px; font-weight: 600; color: #92400e; margin: 0;">🔔 New Proposal Request - Follow up within 24 hours</p>
  </div>

  <!-- Contact Information -->
  <div class="card">
    <div class="card-header">
      <div class="card-title">Contact Information</div>
    </div>
    <div class="card-content">
      <div class="info-row"><span>Company:</span> ${data.companyName}</div>
      <div class="info-row"><span>Email:</span> <a href="mailto:${data.email}" style="color: #f97316;">${data.email}</a></div>
    </div>
  </div>
  `}

  <!-- Quote Summary -->
  <div class="quote-highlight">
    <div class="quote-label">Estimated Investment</div>
    <div class="quote-amount">$${calculations.priceRangeLow.toLocaleString()} - $${calculations.priceRangeHigh.toLocaleString()} CAD</div>
    <div class="quote-label">One-time purchase. You own it forever.</div>
  </div>

  <!-- Key Metrics -->
  <div class="grid-2">
    <div class="stat-box">
      <div class="stat-value">${calculations.estimatedWeeks}</div>
      <div class="stat-label">weeks to deliver</div>
    </div>
    <div class="stat-box">
      <div class="stat-value">$${calculations.monthlyMaintenance}</div>
      <div class="stat-label">optional hosting/mo</div>
    </div>
  </div>

  <!-- Project Details -->
  <div class="card">
    <div class="card-header">
      <div class="card-title">Project Details</div>
    </div>
    <div class="card-content">
      <div class="info-row"><span>Type:</span> ${PROJECT_TYPE_LABELS[data.projectType] || data.projectType}</div>
      <div class="info-row"><span>Complexity:</span> ${data.complexity.charAt(0).toUpperCase() + data.complexity.slice(1)}</div>
      <div class="info-row"><span>Expected Users:</span> ${data.userCount}</div>
      <div class="info-row"><span>Integrations:</span> ${data.integrations}</div>
      <div class="info-row"><span>Timeline:</span> ${data.timeline === 'accelerated' ? 'Accelerated (+25% cost, 30% faster)' : 'Standard'}</div>
      ${data.projectDescription ? `<div class="info-row" style="margin-top: 12px;"><span>Description:</span><br><div style="margin-top: 4px; color: #4b5563; background: #f9fafb; padding: 12px; border-radius: 4px;">${data.projectDescription}</div></div>` : ''}
    </div>
  </div>

  <!-- Selected Features -->
  <div class="card">
    <div class="card-header">
      <div class="card-title">Selected Features</div>
    </div>
    <div class="card-content">
      <ul>
        ${featuresHtml}
      </ul>
    </div>
  </div>

  <!-- What's Included -->
  <div class="card">
    <div class="card-header">
      <div class="card-title">What's Included</div>
    </div>
    <div class="card-content">
      <ul>
        <li style="padding: 4px 0;">Full source code ownership</li>
        <li style="padding: 4px 0;">Deployment to your infrastructure</li>
        <li style="padding: 4px 0;">30 days of post-launch support</li>
        <li style="padding: 4px 0;">Documentation & training</li>
        <li style="padding: 4px 0;">No vendor lock-in or subscription fees</li>
      </ul>
    </div>
  </div>

  <!-- Next Steps -->
  <div class="card">
    <div class="card-header">
      <div class="card-title">Next Steps</div>
    </div>
    <div class="card-content">
      <ol style="padding-left: 20px; font-size: 14px; line-height: 1.8;">
        <li>Book a 30-minute discovery call to discuss your project</li>
        <li>Receive a detailed scope document with exact pricing</li>
        <li>Review and approve - no pressure, no obligation</li>
        <li>We build, you review, you own it</li>
      </ol>
      <div style="text-align: center; margin-top: 20px;">
        <a href="https://lemonbrand.io/custom" class="cta-button">Book Discovery Call</a>
      </div>
    </div>
  </div>

  <!-- Footer -->
  <div class="footer">
    <p>LEMON BRAND</p>
    <p>simon@lemonbrand.io • lemonbrand.io</p>
    <p>Quote valid until ${expiryDate}</p>
    ${isCustomerEmail ? `
    <p style="margin-top: 16px; font-size: 11px; color: #9ca3af;">
      You received this email because you requested a proposal from the Lemon Brand quote generator.
      If you didn't request this, please ignore this email.
    </p>
    ` : ''}
  </div>
</body>
</html>
  `;
}

import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Text,
} from "@react-email/components";
import * as React from "react";

interface Day4CaseStudyEmailProps {
  email: string;
  segment: string;
}

const segmentPatterns: Record<string, { title: string; content: string; buildTime: string }> = {
  "internal-tool": {
    title: "The Client Tracker Pattern",
    content: `Here's the pattern for replacing a messy spreadsheet:

STEP 1: List what you actually track
Not what you should track. What you do track — even if it's scattered across apps.

STEP 2: Identify the one view you need
For a client tracker, it's usually: "Who needs attention right now?"
Status badges. Last contact date. Next deliverable.

STEP 3: Build the minimum
Dashboard + detail view + add/edit. That's it.
No reports. No integrations. No team features (unless you need them today).

STEP 4: Use it for a week before adding anything
You'll discover what's actually missing vs. what you thought you'd need.

The goal isn't to build a CRM. It's to build YOUR command center.`,
    buildTime: "Typical build: 4-7 days for v1",
  },
  "lead-gen": {
    title: "The ROI Calculator Pattern",
    content: `Here's the pattern for a lead-qualifying calculator:

STEP 1: Identify the "aha" moment
What makes prospects realize they need you?
For most services, it's seeing the cost of NOT hiring you.

STEP 2: Keep inputs simple
3-5 fields max. Hours spent, hourly rate, frequency.
Every extra field loses people.

STEP 3: Show the math
Don't hide the calculation. Transparency builds trust.
"You spend X hours × $Y = $Z/month. We typically reduce that by 40%."

STEP 4: Gate the results (lightly)
Show a preview, then ask for email to see full breakdown.
Or show everything and ask for email to get a PDF.

The goal isn't to trick people. It's to filter for serious prospects who've already seen the value.`,
    buildTime: "Typical build: 3-5 days for v1",
  },
  "offer-prototype": {
    title: "The Validation Page Pattern",
    content: `Here's the pattern for testing demand before building:

STEP 1: Write the landing page first
If you can't sell it in 500 words, you don't understand the offer yet.
Headline, 3 bullets, price, CTA.

STEP 2: Make it feel real
Real price. Real checkout (refundable deposits work well).
"Launching if we hit 10 signups" is honest and creates urgency.

STEP 3: Set a deadline
"Doors close Friday" or "Limited to 10 spots" — but only if true.
Fake scarcity destroys trust.

STEP 4: Drive traffic you already have
Email list, Twitter, LinkedIn. If your existing audience won't buy, strangers won't either.

The goal isn't to fake a product. It's to validate demand with real money before you invest time building.`,
    buildTime: "Typical build: 2-3 days for v1",
  },
};

export default function Day4CaseStudyEmail({
  email,
  segment,
}: Day4CaseStudyEmailProps) {
  const unsubscribeUrl = `https://lemonbrand.io/api/newsletter/unsubscribe?email=${encodeURIComponent(email)}`;
  const pattern = segmentPatterns[segment] || segmentPatterns["internal-tool"];

  return (
    <Html>
      <Head />
      <Preview>{pattern.title} - a step-by-step framework</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={heading}>{pattern.title}</Heading>

          <Text style={patternText}>{pattern.content}</Text>

          <Text style={buildTimeBox}>{pattern.buildTime}</Text>

          <Text style={divider}>---</Text>

          <Text style={text}>
            This is what operators ship. Not complex apps. Simple tools that solve real problems.
          </Text>

          <Text style={text}>
            The Build Stack works the same way whether you're building a client tracker
            or a multi-tenant SaaS. Context → Direction → Iteration → Verification.
          </Text>

          <Text style={text}>
            In 3 days, I'll share the most common failure mode —
            and why most AI builders plateau.
          </Text>

          <Text style={signature}>— Simon</Text>

          <Text style={footer}>
            <Link href={unsubscribeUrl} style={footerLink}>
              Unsubscribe
            </Link>
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

const main = {
  backgroundColor: "#ffffff",
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
};

const container = {
  margin: "0 auto",
  padding: "40px 20px",
  maxWidth: "480px",
};

const heading = {
  fontSize: "24px",
  fontWeight: "700" as const,
  color: "#000000",
  marginBottom: "24px",
};

const text = {
  fontSize: "16px",
  lineHeight: "1.6",
  color: "#333333",
  marginBottom: "16px",
};

const patternText = {
  fontSize: "15px",
  lineHeight: "1.7",
  color: "#333333",
  marginBottom: "24px",
  whiteSpace: "pre-line" as const,
};

const buildTimeBox = {
  fontSize: "14px",
  lineHeight: "1.5",
  color: "#666666",
  backgroundColor: "#f5f5f5",
  padding: "12px 16px",
  borderRadius: "4px",
  marginBottom: "16px",
  fontStyle: "italic" as const,
};

const divider = {
  fontSize: "16px",
  color: "#cccccc",
  textAlign: "center" as const,
  marginTop: "24px",
  marginBottom: "24px",
};

const signature = {
  fontSize: "14px",
  color: "#000000",
  fontWeight: "500" as const,
  marginTop: "24px",
};

const footer = {
  fontSize: "12px",
  color: "#999999",
  marginTop: "32px",
  textAlign: "center" as const,
};

const footerLink = {
  color: "#999999",
  textDecoration: "underline",
};

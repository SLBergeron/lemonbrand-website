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

const caseStudies: Record<string, { title: string; story: string; receipt: string }> = {
  "internal-tool": {
    title: "Marcus's Client Tracker",
    story: `Marcus had 12 consulting clients scattered across spreadsheets, Notion, and his inbox.

"Every Monday I'd spend an hour just figuring out who needed what. Then I'd forget to follow up with someone and they'd go cold."

He thought he needed a CRM. Salesforce quoted him $300/month.

Day 1: He scoped a simple client tracker using the Build Stack.
Day 4: Working dashboard with status badges and notes.
Day 6: Added "last contacted" alerts.

"Now I open one page and know exactly who needs attention. The red badges tell me who's going cold."`,
    receipt: "Time: 6 days | Cost: $0 (Convex free tier) | Output: Client command center | Metric: Monday prep from 1 hour → 5 minutes",
  },
  "lead-gen": {
    title: "Elena's ROI Calculator",
    story: `Elena runs an operations consulting practice. Her discovery calls were 50% tire-kickers.

"I'd spend 30 minutes on a call only to find out they had no budget or weren't serious."

Day 1: She scoped an ROI calculator — hours saved, error reduction, cost comparison.
Day 3: Working calculator that shows potential savings.
Day 5: Added email capture before showing results.

"Now I send the calculator first. If they complete it and book a call, they've already seen the value. Close rate went from 20% to 45%."`,
    receipt: "Time: 5 days | Cost: $4 in API credits | Output: ROI calculator with lead capture | Metric: Discovery call close rate 20% → 45%",
  },
  "offer-prototype": {
    title: "David's Cohort Validation",
    story: `David wanted to run a cohort teaching freelancers to productize their services. But he'd burned out building courses nobody bought before.

"I wasn't going to spend 40 hours on curriculum again just to hear crickets."

Day 1: He built a landing page with the cohort promise and curriculum outline.
Day 2: Added Stripe for $200 refundable deposits.
Day 3: Emailed his list of 400 people.

Result: 11 deposits in 72 hours.

"I validated the offer before writing a single lesson. Now I'm building the curriculum knowing 11 people are waiting for it."`,
    receipt: "Time: 3 days | Cost: $0 (no ads) | Output: Validated cohort | Metric: 11 deposits, $2,200 committed before building",
  },
};

export default function Day4CaseStudyEmail({
  email,
  segment,
}: Day4CaseStudyEmailProps) {
  const unsubscribeUrl = `https://lemonbrand.io/api/newsletter/unsubscribe?email=${encodeURIComponent(email)}`;
  const study = caseStudies[segment] || caseStudies["internal-tool"];

  return (
    <Html>
      <Head />
      <Preview>Real case study: {study.title}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={heading}>{study.title}</Heading>

          <Text style={storyText}>{study.story}</Text>

          <Text style={receiptBox}>{study.receipt}</Text>

          <Text style={divider}>---</Text>

          <Text style={text}>
            This is what operators are shipping.
          </Text>

          <Text style={text}>
            Not complex apps. Not startups. Simple tools that solve real problems.
          </Text>

          <Text style={text}>
            The Build Stack is the same whether you're building a proposal generator
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

const storyText = {
  fontSize: "16px",
  lineHeight: "1.7",
  color: "#333333",
  marginBottom: "24px",
  whiteSpace: "pre-line" as const,
};

const receiptBox = {
  fontSize: "14px",
  lineHeight: "1.5",
  color: "#333333",
  backgroundColor: "#f0f9f0",
  border: "1px solid #c3e6c3",
  padding: "12px 16px",
  borderRadius: "4px",
  marginBottom: "16px",
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

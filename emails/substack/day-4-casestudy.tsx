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
    title: "Sarah's Proposal Generator",
    story: `Sarah spent 3 hours on every client proposal.

"I'd open a Google Doc and stare at it. Then I'd copy-paste from the last proposal. But every client is different, so I'd rewrite half of it anyway."

She thought she needed to hire an assistant.

Day 1: She scoped a proposal generator using the Build Stack.
Day 5: Working prototype.
Day 7: Used it on a real client.

"I paste in their brief. The tool generates a draft. I edit for 20 minutes instead of 3 hours."`,
    receipt: "Time: 7 days | Cost: $12 in API credits | Output: Proposal generator | Metric: 3 hours → 20 minutes per proposal",
  },
  "lead-gen": {
    title: "Mike's Quote Calculator",
    story: `Mike runs a painting company. Every estimate meant driving to the job, measuring, calculating, driving back.

"I was spending half my week on quotes. Most of them didn't close."

Day 1: He scoped a quote calculator — square footage, paint type, number of rooms.
Day 3: Working form that outputs an estimate.
Day 6: Added email capture and PDF export.

"Now I send the calculator link. They get an instant estimate. I only visit the serious ones."`,
    receipt: "Time: 6 days | Cost: $8 in API credits | Output: Quote calculator with PDF | Metric: 50% fewer site visits, same close rate",
  },
  "offer-prototype": {
    title: "James's Fake-Door Test",
    story: `James had an idea for a course. But he didn't want to build it before knowing if anyone would buy.

"I'd wasted months building things nobody wanted."

Day 1: He built a landing page describing the course.
Day 2: Added Stripe checkout for pre-orders.
Day 3: Ran $50 in ads.

Result: 4 pre-orders in 48 hours.

"I made $400 before writing a single lesson. Now I know exactly what to build."`,
    receipt: "Time: 3 days | Cost: $50 in ads + $6 API | Output: Validated offer | Metric: 4 pre-orders, $400 revenue",
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

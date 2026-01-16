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

interface SubstackWelcomeEmailProps {
  email: string;
  segment: string;
}

const segmentContent: Record<string, { pattern: string; exampleFile: string }> = {
  "internal-tool": {
    pattern: "Client Tracker",
    exampleFile: "EXAMPLE-client-tracker.md",
  },
  "lead-gen": {
    pattern: "ROI Calculator",
    exampleFile: "EXAMPLE-roi-calculator.md",
  },
  "offer-prototype": {
    pattern: "Cohort Validation Page",
    exampleFile: "EXAMPLE-cohort-validation.md",
  },
};

export default function SubstackWelcomeEmail({
  email,
  segment,
}: SubstackWelcomeEmailProps) {
  const unsubscribeUrl = `https://lemonbrand.io/api/newsletter/unsubscribe?email=${encodeURIComponent(email)}`;
  const content = segmentContent[segment] || segmentContent["internal-tool"];

  return (
    <Html>
      <Head />
      <Preview>Welcome to Simon's Agents - here's your Build Stack Starter Kit</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={heading}>Welcome to Simon's Agents.</Heading>

          <Text style={text}>
            When I say "agents," I don't mean bots running in the cloud.
          </Text>

          <Text style={text}>
            I mean <strong>you</strong> empowered by AI — and the tools you build that work for you.
            You become the agent. The tools you ship are your agents.
          </Text>

          <Text style={text}>
            I run two ventures: VerifiedNode (verification infrastructure with 58K+ records)
            and LemonBrand (teaching non-developers to build with Claude Code).
            Same thesis, two responses.
          </Text>

          <Text style={subheading}>Your Build Stack Starter Kit</Text>

          <Text style={text}>
            Attached to this email are two files:
          </Text>

          <Text style={listItem}>1. <strong>CLAUDE.md</strong> — The blank template. Fill this out for your project.</Text>
          <Text style={listItem}>2. <strong>{content.exampleFile}</strong> — A filled example based on what you're building.</Text>

          <Text style={text}>
            The example shows exactly how I'd fill out the template for a {content.pattern}.
            Use it as a reference when filling out your own.
          </Text>

          <Text style={subheading}>The Build Stack (how to use this)</Text>

          <Text style={listItem}>1. <strong>Context</strong> — Fill out CLAUDE.md (15 min). This is what Claude needs to know.</Text>
          <Text style={listItem}>2. <strong>Direction</strong> — Tell Claude what you want, not how to code it.</Text>
          <Text style={listItem}>3. <strong>Iteration</strong> — Refine through conversation.</Text>
          <Text style={listItem}>4. <strong>Verification</strong> — Does it work? (not: is the code right?)</Text>

          <Text style={text}>
            Start with the example, then create your own CLAUDE.md.
            The more context you provide, the better Claude's output.
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

const subheading = {
  fontSize: "14px",
  fontWeight: "600" as const,
  color: "#666666",
  marginBottom: "12px",
  marginTop: "24px",
  textTransform: "uppercase" as const,
  letterSpacing: "0.5px",
};

const text = {
  fontSize: "16px",
  lineHeight: "1.6",
  color: "#333333",
  marginBottom: "16px",
};

const listItem = {
  fontSize: "16px",
  lineHeight: "1.6",
  color: "#333333",
  marginBottom: "4px",
  paddingLeft: "8px",
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

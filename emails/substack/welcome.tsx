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

const segmentContent: Record<string, { pattern: string; link: string }> = {
  "internal-tool": {
    pattern: "Proposal Generator",
    link: "https://lemonbrand.io/blog/proposal-generator", // Update when post exists
  },
  "lead-gen": {
    pattern: "Quote Calculator",
    link: "https://lemonbrand.io/blog/quote-calculator", // Update when post exists
  },
  "offer-prototype": {
    pattern: "Fake-Door Landing",
    link: "https://lemonbrand.io/blog/fake-door-landing", // Update when post exists
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
            Attached to this email is the CLAUDE.md template I use for every project.
            This is the foundation of the Build Stack:
          </Text>

          <Text style={listItem}>1. <strong>Context</strong> — What does the AI need to know?</Text>
          <Text style={listItem}>2. <strong>Direction</strong> — What do you want, not how to code it</Text>
          <Text style={listItem}>3. <strong>Iteration</strong> — Refine through conversation</Text>
          <Text style={listItem}>4. <strong>Verification</strong> — Does it work? (not: is the code right?)</Text>

          <Text style={text}>
            Fill out the template (15 minutes). Use it in every conversation with Claude.
          </Text>

          <Text style={subheading}>Based on what you're building...</Text>

          <Text style={text}>
            You said you want to build {segment === "internal-tool" ? "internal tools" : segment === "lead-gen" ? "lead-gen utilities" : "offer prototypes"}.
            Start with the <strong>{content.pattern}</strong> pattern.
          </Text>

          <Text style={text}>
            Tomorrow I'll show you the Build Stack in action — same request,
            completely different results when you add proper context.
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

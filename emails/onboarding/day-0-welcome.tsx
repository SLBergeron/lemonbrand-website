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

interface Day0WelcomeEmailProps {
  email: string;
}

export default function Day0WelcomeEmail({
  email,
}: Day0WelcomeEmailProps) {
  const unsubscribeUrl = `https://lemonbrand.io/api/newsletter/unsubscribe?email=${encodeURIComponent(email)}`;
  return (
    <Html>
      <Head />
      <Preview>Your CLAUDE.md template is attached</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={heading}>Here's your CLAUDE.md template.</Heading>

          <Text style={text}>
            It's attached to this email. Save it in your project root.
          </Text>

          <Text style={text}>
            This is the exact structure I use for every project. The whole point
            is context — Claude starts every conversation from zero unless you
            tell it what you're building.
          </Text>

          <Text style={text}>
            Fill it out once (15 minutes). Reference it in every conversation.
            Watch your results change.
          </Text>

          <Text style={subheading}>Quick start:</Text>

          <Text style={listItem}>1. Download the attached file</Text>
          <Text style={listItem}>2. Open it in Cursor, Antigravity, or paste it into Claude.ai</Text>
          <Text style={listItem}>3. Ask the AI to help you fill it out for your project</Text>
          <Text style={listItem}>4. Save it in your project folder</Text>

          <Text style={text}>
            Don't have a tool yet? No worries. I'll share options later this week.
          </Text>

          <Text style={text}>
            Tomorrow I'll show you the difference between a generic request and
            one with proper context. Same ask, completely different results.
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

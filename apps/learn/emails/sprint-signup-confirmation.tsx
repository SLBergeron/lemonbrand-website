import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";

interface SprintSignupConfirmationProps {
  email: string;
  dashboardUrl: string;
}

export default function SprintSignupConfirmation({
  email = "test@example.com",
  dashboardUrl = "https://learn.lemonbrand.io/sprint/day/2",
}: SprintSignupConfirmationProps) {
  return (
    <Html>
      <Head />
      <Preview>You're in! Here's what happens next</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={heading}>You're in the Sprint.</Heading>

          <Text style={text}>
            Your payment is confirmed. You now have full access to all 7 days of
            the AI Builder Sprint.
          </Text>

          <Section style={highlightBox}>
            <Text style={highlightText}>
              <strong>Next step:</strong> Continue to Day 2 where you'll set up
              your development environment and start building.
            </Text>
          </Section>

          <Section style={buttonContainer}>
            <Button style={button} href={dashboardUrl}>
              Continue to Day 2
            </Button>
          </Section>

          <Text style={text}>
            <strong>Quick start checklist:</strong>
          </Text>
          <Text style={listItem}>
            1. Join the{" "}
            <Link href="https://discord.gg/lemonbrand" style={link}>
              Discord community
            </Link>{" "}
            for live support
          </Text>
          <Text style={listItem}>
            2. Work through Day 2 training (15 min)
          </Text>
          <Text style={listItem}>
            3. Complete your first build milestone
          </Text>

          <Text style={text}>
            Have questions? Reply to this email — I read everything.
          </Text>

          <Text style={signature}>
            — Simon
            <br />
            <span style={signatureSubtext}>Lemonbrand</span>
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

const highlightBox = {
  backgroundColor: "#fef3c7",
  borderRadius: "8px",
  padding: "16px",
  marginBottom: "24px",
};

const highlightText = {
  fontSize: "16px",
  lineHeight: "1.6",
  color: "#92400e",
  margin: "0",
};

const buttonContainer = {
  textAlign: "center" as const,
  marginBottom: "24px",
};

const button = {
  backgroundColor: "#000000",
  borderRadius: "6px",
  color: "#ffffff",
  fontSize: "16px",
  fontWeight: "600" as const,
  textDecoration: "none",
  textAlign: "center" as const,
  display: "inline-block",
  padding: "12px 24px",
};

const listItem = {
  fontSize: "16px",
  lineHeight: "1.6",
  color: "#333333",
  marginBottom: "8px",
};

const link = {
  color: "#000000",
  textDecoration: "underline",
};

const signature = {
  fontSize: "14px",
  color: "#000000",
  fontWeight: "500" as const,
  marginTop: "32px",
};

const signatureSubtext = {
  fontSize: "12px",
  color: "#666666",
  fontWeight: "400" as const,
};

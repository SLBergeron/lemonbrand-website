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

interface WaitlistWelcomeProps {
  email: string;
}

export default function WaitlistWelcome({
  email = "test@example.com",
}: WaitlistWelcomeProps) {
  return (
    <Html>
      <Head />
      <Preview>You're on the 7-Day Sprint waitlist</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={heading}>You're on the list.</Heading>

          <Text style={text}>
            Thanks for signing up for the 7-Day Sprint waitlist. The course is
            almost complete — I'm finishing up the video lessons now.
          </Text>

          <Text style={text}>
            You'll be the first to know when it launches.
          </Text>

          <Section style={highlightBox}>
            <Text style={highlightText}>
              <strong>In the meantime:</strong> Days 0 and 1 are free to
              preview. Get a head start on the Build Stack framework.
            </Text>
          </Section>

          <Section style={buttonContainer}>
            <Button
              style={button}
              href="https://learn.lemonbrand.io/sprint"
            >
              Preview the Course
            </Button>
          </Section>

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

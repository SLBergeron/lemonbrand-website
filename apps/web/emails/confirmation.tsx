import {
  Body,
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

interface ConfirmationEmailProps {
  confirmUrl: string;
}

export default function ConfirmationEmail({
  confirmUrl,
}: ConfirmationEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Confirm your subscription to Simon Bergeron's newsletter</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={heading}>Confirm your email</Heading>
          <Text style={text}>
            Thanks for signing up. Click the link below to confirm your
            subscription.
          </Text>
          <Section style={buttonContainer}>
            <Link style={button} href={confirmUrl}>
              Confirm subscription
            </Link>
          </Section>
          <Text style={footer}>
            If you didn't sign up for this newsletter, you can ignore this
            email.
          </Text>
          <Text style={signature}>
            — Simon Bergeron
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
  fontWeight: "700",
  color: "#000000",
  marginBottom: "24px",
};

const text = {
  fontSize: "16px",
  lineHeight: "1.6",
  color: "#333333",
  marginBottom: "24px",
};

const buttonContainer = {
  marginBottom: "32px",
};

const button = {
  backgroundColor: "#000000",
  color: "#ffffff",
  padding: "12px 24px",
  fontSize: "14px",
  fontWeight: "600",
  textDecoration: "none",
  display: "inline-block",
};

const footer = {
  fontSize: "14px",
  color: "#666666",
  marginBottom: "16px",
};

const signature = {
  fontSize: "14px",
  color: "#000000",
  fontWeight: "500",
};

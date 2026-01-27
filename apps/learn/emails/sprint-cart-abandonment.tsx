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

interface SprintCartAbandonmentProps {
  email: string;
  checkoutUrl: string;
}

export default function SprintCartAbandonment({
  email = "test@example.com",
  checkoutUrl = "https://learn.lemonbrand.io/sprint/checkout",
}: SprintCartAbandonmentProps) {
  return (
    <Html>
      <Head />
      <Preview>Still thinking about the Sprint?</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={heading}>Still thinking about it?</Heading>

          <Text style={text}>
            I noticed you started the checkout for the AI Builder Sprint but
            didn't complete it. No pressure — just wanted to make sure nothing
            went wrong.
          </Text>

          <Text style={text}>
            <strong>Quick reminder of what you get:</strong>
          </Text>

          <Text style={listItem}>
            Days 0-1 are free — no payment required to start
          </Text>
          <Text style={listItem}>
            7-day structured curriculum to build your first AI tool
          </Text>
          <Text style={listItem}>
            Discord community access for live support
          </Text>
          <Text style={listItem}>
            $297 credit toward the 8-Week Program if you upgrade
          </Text>

          <Section style={buttonContainer}>
            <Button style={button} href={checkoutUrl}>
              Complete Your Signup
            </Button>
          </Section>

          <Section style={faqSection}>
            <Text style={faqHeading}>Common questions:</Text>

            <Text style={faqItem}>
              <strong>"I don't have time right now"</strong>
              <br />
              The Sprint is self-paced. Work through it whenever works for you.
            </Text>

            <Text style={faqItem}>
              <strong>"I'm not technical enough"</strong>
              <br />
              If you can explain what you want in plain English, you can do
              this. The curriculum starts from zero.
            </Text>

            <Text style={faqItem}>
              <strong>"Is this right for me?"</strong>
              <br />
              Days 0-1 are free. Try them first, then decide.
            </Text>
          </Section>

          <Text style={text}>
            Have questions? Just reply to this email.
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

const listItem = {
  fontSize: "16px",
  lineHeight: "1.6",
  color: "#333333",
  marginBottom: "8px",
  paddingLeft: "8px",
};

const buttonContainer = {
  textAlign: "center" as const,
  margin: "32px 0",
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

const faqSection = {
  backgroundColor: "#f9fafb",
  borderRadius: "8px",
  padding: "20px",
  marginBottom: "24px",
};

const faqHeading = {
  fontSize: "14px",
  fontWeight: "600" as const,
  color: "#666666",
  textTransform: "uppercase" as const,
  letterSpacing: "0.5px",
  marginBottom: "16px",
};

const faqItem = {
  fontSize: "14px",
  lineHeight: "1.6",
  color: "#333333",
  marginBottom: "16px",
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

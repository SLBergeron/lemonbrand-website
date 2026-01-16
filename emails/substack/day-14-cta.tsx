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

interface Day14CTAEmailProps {
  email: string;
  segment: string;
}

const segmentCTA: Record<string, string> = {
  "internal-tool": "replace that SaaS subscription with something you own",
  "lead-gen": "ship that calculator or qualifier you've been thinking about",
  "offer-prototype": "validate your next offer before building it",
};

export default function Day14CTAEmail({
  email,
  segment,
}: Day14CTAEmailProps) {
  const unsubscribeUrl = `https://lemonbrand.io/api/newsletter/unsubscribe?email=${encodeURIComponent(email)}`;
  const cta = segmentCTA[segment] || segmentCTA["internal-tool"];

  return (
    <Html>
      <Head />
      <Preview>Ready to ship? Here's how to join the Sprint.</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={heading}>Ready to ship?</Heading>

          <Text style={text}>
            You've had the Build Stack for two weeks now.
          </Text>

          <Text style={text}>
            Maybe you've tried it. Maybe you've been busy.
            Either way, here's the direct offer:
          </Text>

          <Text style={offerBox}>
            <strong>The 7-Day Sprint</strong><br /><br />
            7 days. Your project. Daily feedback.<br />
            You ship something real.<br /><br />
            <strong>$297</strong><br /><br />
            Complete all 7 days? That $297 becomes credit toward the 8-Week program.
          </Text>

          <Text style={subheading}>Who it's for:</Text>

          <Text style={listItem}>• Operators who want to {cta}</Text>
          <Text style={listItem}>• People who learn better with deadlines and accountability</Text>
          <Text style={listItem}>• Anyone with 1-2 hours a day for a week</Text>

          <Text style={subheading}>What you get:</Text>

          <Text style={listItem}>• 7 daily trainings (video + worksheet)</Text>
          <Text style={listItem}>• Private Discord cohort channel</Text>
          <Text style={listItem}>• Daily feedback on your project</Text>
          <Text style={listItem}>• Ship Day call with live demos</Text>

          <Text style={divider}>---</Text>

          <Text style={text}>
            If you're not ready, no pressure.
            You'll keep getting value from the newsletter.
          </Text>

          <Text style={text}>
            But if you're ready to stop thinking about building and actually ship something:
          </Text>

          <Text style={text}>
            <Link href="https://lemonbrand.io/sprint" style={ctaButton}>
              Join the Sprint →
            </Link>
          </Text>

          <Text style={text}>
            Either way, I'll keep sending mechanisms, demos, and build logs.
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

const offerBox = {
  fontSize: "16px",
  lineHeight: "1.6",
  color: "#333333",
  backgroundColor: "#f5f5f5",
  border: "1px solid #e0e0e0",
  padding: "20px",
  borderRadius: "8px",
  marginBottom: "24px",
  textAlign: "center" as const,
};

const ctaButton = {
  display: "inline-block",
  backgroundColor: "#000000",
  color: "#ffffff",
  padding: "12px 24px",
  borderRadius: "6px",
  textDecoration: "none",
  fontWeight: "600" as const,
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

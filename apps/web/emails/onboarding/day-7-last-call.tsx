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
  Hr,
} from "@react-email/components";
import * as React from "react";

interface Day7LastCallEmailProps {
  email: string;
}

export default function Day7LastCallEmail({
  email,
}: Day7LastCallEmailProps) {
  const unsubscribeUrl = `https://lemonbrand.io/api/newsletter/unsubscribe?email=${encodeURIComponent(email)}`;
  return (
    <Html>
      <Head />
      <Preview>Last thing (then back to regular emails)</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={heading}>Last thing</Heading>

          <Text style={text}>
            This is the end of the onboarding sequence. From here, you'll get my
            regular Monday emails — what I built, what I learned, what's next.
          </Text>

          <Text style={text}>
            Before I go back to that format, one more thought:
          </Text>

          <Hr style={divider} />

          <Text style={text}>
            You have ideas. Things you've wanted to build. Problems you've
            wanted to solve. You thought they needed a developer.
          </Text>

          <Text style={text}>They don't.</Text>

          <Text style={text}>
            The tools exist. The methods work. The only question is whether
            you'll learn it now or keep waiting.
          </Text>

          <Hr style={divider} />

          <Text style={text}>
            If you're ready to ship something real, the next Sprint cohort
            starts soon. 7 days, one project, live support.
          </Text>

          <Section style={buttonContainer}>
            <Link style={button} href="https://lemonbrand.io/sprint">
              Join the next Sprint
            </Link>
          </Section>

          <Text style={text}>
            If not, no worries. Keep watching the videos, trying things, and
            building on your own. I'll be here every Monday.
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

const divider = {
  borderColor: "#eeeeee",
  margin: "24px 0",
};

const buttonContainer = {
  marginTop: "24px",
  marginBottom: "24px",
};

const button = {
  backgroundColor: "#000000",
  color: "#ffffff",
  padding: "12px 24px",
  fontSize: "14px",
  fontWeight: "600" as const,
  textDecoration: "none",
  display: "inline-block",
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

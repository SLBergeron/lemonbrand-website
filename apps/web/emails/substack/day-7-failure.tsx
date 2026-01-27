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

interface Day7FailureEmailProps {
  email: string;
}

export default function Day7FailureEmail({
  email,
}: Day7FailureEmailProps) {
  const unsubscribeUrl = `https://lemonbrand.io/api/newsletter/unsubscribe?email=${encodeURIComponent(email)}`;

  return (
    <Html>
      <Head />
      <Preview>The Vibe Coding Trap - why most AI builders plateau</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={heading}>The Vibe Coding Trap</Heading>

          <Text style={text}>
            Most AI builders hit a wall around week 3.
          </Text>

          <Text style={text}>
            They've built a few things. They feel productive.
            But then something breaks and they can't fix it.
          </Text>

          <Text style={text}>
            The problem isn't the AI. It's the approach.
          </Text>

          <Text style={subheading}>What "vibe coding" looks like:</Text>

          <Text style={listItem}>• Copying prompts without understanding why they work</Text>
          <Text style={listItem}>• Starting over when something breaks</Text>
          <Text style={listItem}>• No context file (so Claude forgets everything)</Text>
          <Text style={listItem}>• Treating AI like magic instead of a tool</Text>

          <Text style={subheading}>What the Build Stack looks like:</Text>

          <Text style={listItem}>• Context that compounds (CLAUDE.md grows with your project)</Text>
          <Text style={listItem}>• Debugging through conversation, not starting over</Text>
          <Text style={listItem}>• Verification that doesn't require reading code</Text>
          <Text style={listItem}>• Patterns you can repeat across projects</Text>

          <Text style={divider}>---</Text>

          <Text style={text}>
            The difference is structure vs. vibes.
          </Text>

          <Text style={text}>
            If you've been building on vibes and want structure,
            the 7-Day Sprint is where I teach the Build Stack systematically.
          </Text>

          <Text style={text}>
            7 days. Your project. Daily feedback. You ship something real.
          </Text>

          <Text style={text}>
            <Link href="https://lemonbrand.io/sprint" style={linkStyle}>
              Learn more about the Sprint →
            </Link>
          </Text>

          <Text style={text}>
            In a week, I'll send one more email with a direct offer.
            Until then, keep building.
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

const linkStyle = {
  color: "#0066cc",
  textDecoration: "underline",
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

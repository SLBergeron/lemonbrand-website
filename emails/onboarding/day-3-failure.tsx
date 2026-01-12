import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Text,
  Hr,
} from "@react-email/components";
import * as React from "react";

interface Day3FailureEmailProps {
  email: string;
}

export default function Day3FailureEmail({
  email,
}: Day3FailureEmailProps) {
  const unsubscribeUrl = `https://lemonbrand.io/api/newsletter/unsubscribe?email=${encodeURIComponent(email)}`;
  return (
    <Html>
      <Head />
      <Preview>Why your first Claude project probably failed</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={heading}>
            Why your first project probably failed
          </Heading>

          <Text style={text}>
            You've tried using AI to build things. It didn't go the way tutorials
            made it look.
          </Text>

          <Text style={text}>
            That's what happened to everyone. Including me.
          </Text>

          <Text style={text}>Here's why:</Text>

          <Hr style={divider} />

          <Text style={subheading}>Problem #1: Scope creep</Text>
          <Text style={text}>
            You started with "I want to build an app" instead of "I want to build
            one specific feature." Claude can build anything, but it can't build
            everything at once.
          </Text>

          <Text style={subheading}>Problem #2: Wrong mental model</Text>
          <Text style={text}>
            You treated Claude like a junior developer who needs detailed code
            instructions. It's not. Think of yourself as the Product Manager
            defining requirements, the System Architect breaking down the
            project, and the QA Director testing behavior.
          </Text>

          <Text style={subheading}>Problem #3: Giving up too early</Text>
          <Text style={text}>
            First output wasn't perfect, so you assumed AI "doesn't work for
            this." But iteration is the whole game. The pattern that fixes bad
            outputs usually takes 2-3 exchanges.
          </Text>

          <Hr style={divider} />

          <Text style={subheading}>Tools that help</Text>
          <Text style={text}>
            The right environment makes iteration easier. IDEs like Cursor and
            Antigravity have Claude built in — you chat, it edits your code
            directly, you see the result. No copy-paste. Faster feedback loops.
          </Text>

          <Text style={text}>
            Tomorrow: what to build first, and how to pick your tool.
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
  marginBottom: "8px",
  textTransform: "uppercase" as const,
  letterSpacing: "0.5px",
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

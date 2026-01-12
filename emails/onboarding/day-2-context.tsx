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

interface Day2ContextEmailProps {
  email: string;
}

export default function Day2ContextEmail({
  email,
}: Day2ContextEmailProps) {
  const unsubscribeUrl = `https://lemonbrand.io/api/newsletter/unsubscribe?email=${encodeURIComponent(email)}`;
  return (
    <Html>
      <Head />
      <Preview>Same request, completely different results</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={heading}>Same request, different results</Heading>

          <Text style={text}>Here's something most people miss:</Text>

          <Text style={text}>
            Two people can give Claude the exact same request and get completely
            different outputs.
          </Text>

          <Text style={text}>The difference isn't the prompt. It's the context.</Text>

          <Hr style={divider} />

          <Text style={subheading}>Without context:</Text>
          <Text style={code}>
            "Build me a recipe tracker"
          </Text>
          <Text style={text}>
            → You get a generic app that doesn't fit your workflow
          </Text>

          <Text style={subheading}>With context:</Text>
          <Text style={code}>
            "Build me a recipe tracker. I meal prep on Sundays for the week. I
            need to scale recipes for 4 people and generate a shopping list
            grouped by grocery store section."
          </Text>
          <Text style={text}>→ You get exactly what you need</Text>

          <Hr style={divider} />

          <Text style={text}>
            That's why CLAUDE.md exists. It's your context file — the thing that
            makes Claude remember your preferences, your stack, your constraints.
          </Text>

          <Text style={text}>
            The skill isn't coding. It's communication.
          </Text>

          <Text style={text}>
            Try it: Open Cursor or paste into{" "}
            <Link href="https://claude.ai" style={link}>
              claude.ai
            </Link>
            . Give the same request with and without your CLAUDE.md. See the
            difference yourself.
          </Text>

          <Text style={text}>
            Tomorrow: why your first Claude project probably failed (and what
            to do differently).
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

const code = {
  fontSize: "14px",
  lineHeight: "1.6",
  color: "#333333",
  backgroundColor: "#f5f5f5",
  padding: "12px 16px",
  borderRadius: "4px",
  marginBottom: "8px",
  fontFamily: "monospace",
};

const divider = {
  borderColor: "#eeeeee",
  margin: "24px 0",
};

const link = {
  color: "#000000",
  textDecoration: "underline",
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

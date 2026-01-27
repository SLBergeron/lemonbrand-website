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

interface Day2BuildStackEmailProps {
  email: string;
}

export default function Day2BuildStackEmail({
  email,
}: Day2BuildStackEmailProps) {
  const unsubscribeUrl = `https://lemonbrand.io/api/newsletter/unsubscribe?email=${encodeURIComponent(email)}`;

  return (
    <Html>
      <Head />
      <Preview>The Build Stack in action - same request, different results</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={heading}>Same request. Different results.</Heading>

          <Text style={text}>
            Here's what most people type:
          </Text>

          <Text style={codeBlock}>
            "Build me a client tracker"
          </Text>

          <Text style={text}>
            Claude will build something. But it won't be what you wanted.
            It doesn't know your workflow, your clients, or what "tracker" means to you.
          </Text>

          <Text style={text}>
            Here's the Build Stack version:
          </Text>

          <Text style={subheading}>Context</Text>
          <Text style={codeBlock}>
            "I'm a consultant tracking 8 active clients in a messy spreadsheet.
            I need to see: project status, last contact date, upcoming deliverables.
            Just for me — no team access needed."
          </Text>

          <Text style={subheading}>Direction</Text>
          <Text style={codeBlock}>
            "Build a simple dashboard. List all clients with status badges.
            Click a client to see details and add notes. Mobile-friendly."
          </Text>

          <Text style={subheading}>Iteration</Text>
          <Text style={text}>
            After the first output: "Add a 'last contacted' field.
            Color-code clients I haven't talked to in 7+ days."
          </Text>

          <Text style={subheading}>Verification</Text>
          <Text style={text}>
            Add your real clients. Does it feel faster than the spreadsheet?
            Can you update it between meetings on your phone?
          </Text>

          <Text style={divider}>---</Text>

          <Text style={text}>
            The difference isn't magic. It's structure.
          </Text>

          <Text style={text}>
            Context → Direction → Iteration → Verification.
          </Text>

          <Text style={text}>
            Try it with your CLAUDE.md template. Pick one small thing you want to build.
            Run through the four steps.
          </Text>

          <Text style={text}>
            In 2 days, I'll show you a real case study —
            what someone just like you built in a week.
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
  marginTop: "20px",
  textTransform: "uppercase" as const,
  letterSpacing: "0.5px",
};

const text = {
  fontSize: "16px",
  lineHeight: "1.6",
  color: "#333333",
  marginBottom: "16px",
};

const codeBlock = {
  fontSize: "14px",
  lineHeight: "1.5",
  color: "#333333",
  backgroundColor: "#f5f5f5",
  padding: "12px 16px",
  borderRadius: "4px",
  marginBottom: "16px",
  fontFamily: "monospace",
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

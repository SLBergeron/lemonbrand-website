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

interface Day4FrameworkEmailProps {
  email: string;
}

export default function Day4FrameworkEmail({
  email,
}: Day4FrameworkEmailProps) {
  const unsubscribeUrl = `https://lemonbrand.io/api/newsletter/unsubscribe?email=${encodeURIComponent(email)}`;
  return (
    <Html>
      <Head />
      <Preview>What to build first (not what you think)</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={heading}>What to build first</Heading>

          <Text style={text}>
            Most people start with the wrong project.
          </Text>

          <Text style={text}>
            They pick something ambitious because they want to "see what Claude
            can really do." Then they get overwhelmed and quit.
          </Text>

          <Text style={text}>Here's what actually works:</Text>

          <Hr style={divider} />

          <Text style={subheading}>The "hair-on-fire" rule</Text>
          <Text style={text}>
            Build something you need so badly you'd use a broken version of it.
            Not a nice-to-have. A problem so painful the solution doesn't need
            to be perfect.
          </Text>

          <Text style={subheading}>The weekend scope</Text>
          <Text style={text}>
            If you can't explain the core feature in one sentence, it's too big.
            Recipe Tracker (one afternoon). Workout Logger (~3 hours).
            Goal-Setting System (one weekend). Renovation Planner (~6 hours).
          </Text>

          <Text style={subheading}>The MVP guillotine</Text>
          <Text style={text}>
            Write down every feature you want. Cut it in half. Cut it in half
            again. Build that. You can always add more later.
          </Text>

          <Hr style={divider} />

          <Text style={text}>
            The proof that this works? I built{" "}
            <Link href="https://verifiednode.com" style={link}>
              Verifiednode
            </Link>{" "}
            this way. Started with one feature, shipped it, then expanded. Now
            it's a production SaaS with real paying customers.
          </Text>

          <Hr style={divider} />

          <Text style={subheading}>Choose your tool</Text>

          <Text style={text}>
            Before you build, pick one:
          </Text>

          <Text style={listItem}>
            →{" "}
            <Link href="https://cursor.com" style={link}>
              Cursor
            </Link>{" "}
            (Recommended)
            {"\n"}Built-in Claude. Chat, it edits your code. Best for beginners.
          </Text>

          <Text style={listItem}>
            → Antigravity
            {"\n"}Google's IDE with Gemini + Claude. Good if you're in the Google ecosystem.
          </Text>

          <Text style={listItem}>
            →{" "}
            <Link href="https://claude.ai" style={link}>
              Claude.ai
            </Link>
            {"\n"}Just chat. Good for planning before you code.
          </Text>

          <Text style={listItem}>
            →{" "}
            <Link href="https://docs.anthropic.com/en/docs/claude-code" style={link}>
              Claude Code
            </Link>
            {"\n"}CLI tool. Terminal-based. Full agent mode. For power users.
          </Text>

          <Text style={text}>
            Pick one. You can always switch later.
          </Text>

          <Text style={text}>
            Tomorrow: how to go faster with a group.
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

const listItem = {
  fontSize: "16px",
  lineHeight: "1.6",
  color: "#333333",
  marginBottom: "12px",
  whiteSpace: "pre-line" as const,
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

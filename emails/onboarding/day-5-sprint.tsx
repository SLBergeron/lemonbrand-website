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

interface Day5SprintEmailProps {
  email: string;
}

export default function Day5SprintEmail({
  email,
}: Day5SprintEmailProps) {
  const unsubscribeUrl = `https://lemonbrand.io/api/newsletter/unsubscribe?email=${encodeURIComponent(email)}`;
  return (
    <Html>
      <Head />
      <Preview>If you want to go faster</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={heading}>If you want to go faster</Heading>

          <Text style={text}>
            Everything I've shared this week — context files, scoping, iteration
            — you can learn on your own. Watch videos, try things, figure it
            out.
          </Text>

          <Text style={text}>
            But if you want to compress that timeline, there's another option.
          </Text>

          <Hr style={divider} />

          <Text style={text}>
            I run a 7-day Sprint. Small group, one project each, ship on Day 7.
          </Text>

          <Text style={text}>Here's how it works:</Text>

          <Text style={listItem}>→ Day 1: Choose your project (I help you scope it right)</Text>
          <Text style={listItem}>→ Days 2-3: Set up Claude Code, create your context file</Text>
          <Text style={listItem}>→ Days 4-5: Build (expect problems, learn iteration)</Text>
          <Text style={listItem}>→ Day 6: Polish</Text>
          <Text style={listItem}>→ Day 7: Ship. Live showcase with the group.</Text>

          <Hr style={divider} />

          <Text style={text}>
            $297. If you complete all 7 days, it becomes credit toward the 8-week
            program. You're not spending money — you're putting down a deposit
            on a skill.
          </Text>

          <Text style={text}>
            No pressure. The free content works. But if you want accountability,
            feedback, and speed — that's what the Sprint is for.
          </Text>

          <Section style={buttonContainer}>
            <Link style={button} href="https://lemonbrand.io/sprint">
              Learn more about the Sprint
            </Link>
          </Section>

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

const listItem = {
  fontSize: "16px",
  lineHeight: "1.6",
  color: "#333333",
  marginBottom: "8px",
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

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

export default function WelcomeEmail() {
  return (
    <Html>
      <Head />
      <Preview>Welcome to the newsletter — you're in</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={heading}>You're in.</Heading>
          <Text style={text}>
            Every Monday, I send out what I built, what I learned, and what's
            next. No fluff.
          </Text>
          <Text style={text}>
            In the meantime, you can:
          </Text>
          <Text style={listItem}>
            → Watch me build on{" "}
            <Link href="https://youtube.com/@slbergeron" style={link}>
              YouTube
            </Link>
          </Text>
          <Text style={listItem}>
            → Get free templates at{" "}
            <Link href="https://lemonbrand.io/templates" style={link}>
              lemonbrand.io/templates
            </Link>
          </Text>
          <Text style={signature}>— Simon</Text>
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
  marginBottom: "16px",
};

const listItem = {
  fontSize: "16px",
  lineHeight: "1.6",
  color: "#333333",
  marginBottom: "8px",
};

const link = {
  color: "#000000",
  textDecoration: "underline",
};

const signature = {
  fontSize: "14px",
  color: "#000000",
  fontWeight: "500",
  marginTop: "24px",
};

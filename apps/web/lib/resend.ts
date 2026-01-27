import { Resend } from "resend";

if (!process.env.RESEND_API_KEY) {
  throw new Error("RESEND_API_KEY is not set");
}

export const resend = new Resend(process.env.RESEND_API_KEY);

// Email sender configuration
export const EMAIL_FROM = "Simon Bergeron <hello@lemonbrand.io>";
export const SITE_URL = process.env.SITE_URL || "https://lemonbrand.io";

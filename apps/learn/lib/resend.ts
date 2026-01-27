import { Resend } from "resend";

// Lazy initialization to avoid build-time errors
let resendInstance: Resend | null = null;

export const resend = new Proxy({} as Resend, {
  get(_, prop) {
    if (!resendInstance) {
      if (!process.env.RESEND_API_KEY) {
        throw new Error("RESEND_API_KEY is not set");
      }
      resendInstance = new Resend(process.env.RESEND_API_KEY);
    }
    return (resendInstance as unknown as Record<string, unknown>)[
      prop as string
    ];
  },
});

// Email sender configuration
export const EMAIL_FROM = "Simon Bergeron <hello@lemonbrand.io>";
export const SITE_URL = process.env.SITE_URL || "https://learn.lemonbrand.io";

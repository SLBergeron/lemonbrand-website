// Shared configuration exports
export const SITE_URL = process.env.SITE_URL || "https://lemonbrand.io";
export const LEARN_URL = process.env.LEARN_URL || "https://learn.lemonbrand.io";

// Common trusted origins for Better Auth
export const TRUSTED_ORIGINS = [
  SITE_URL,
  LEARN_URL,
  "http://localhost:3000",
  "http://localhost:3001",
  "http://127.0.0.1:3000",
  "http://127.0.0.1:3001",
  "https://lemonbrand.io",
  "https://www.lemonbrand.io",
  "https://learn.lemonbrand.io",
];

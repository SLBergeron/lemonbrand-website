import { Metadata } from "next";
import AboutContent from "./about-content";
import { generatePersonSchema, JsonLd, createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "About Simon Bergeron | Custom Tools You Own Forever",
  description:
    "Simon Bergeron builds custom software businesses own forever. No subscriptions, no vendor lock-in. One-time purchase, you own the code. Built VerifiedNode (58,000+ records) and the Lemonbrand ATS using AI-assisted development.",
  keywords: [
    "Simon Bergeron",
    "Lemonbrand founder",
    "custom software development",
    "no subscription software",
    "AI-built tools",
    "VerifiedNode founder",
    "Ontario ATS",
    "fixed price development",
    "own your software",
    "custom business tools",
  ],
  path: "/about",
  aiMetadata: {
    "ai:page-type": "about",
    "ai:person":
      "Simon Bergeron - 13 years in startup ecosystem. Builds custom tools businesses own forever. No subscriptions, fixed pricing, clients own all code.",
    "ai:philosophy":
      "You own everything. Fixed pricing, no surprises. Ship fast, iterate live. Plain language.",
    "ai:services":
      "Custom tool development ($5-30K), pre-built products (ATS), education for DIYers",
    "ai:proof":
      "VerifiedNode (58,000+ contractor records, paying customers), Lemonbrand ATS (Ontario ESA-compliant), custom client tools",
    "ai:value-prop":
      "Stop renting software. One-time purchase, you own the code, no vendor lock-in.",
  },
});

// Person schema for structured data
const personSchema = generatePersonSchema();

export default function AboutPage() {
  return (
    <>
      <JsonLd data={personSchema} />
      <AboutContent />
    </>
  );
}

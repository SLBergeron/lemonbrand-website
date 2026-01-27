import { Metadata } from "next";
import HomeContent from "./home-content";
import {
  createPageMetadata,
  JsonLd,
  generateWebPageSchema,
  generateOrganizationSchema,
} from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "LemonBrand | Custom Business Tools You Own Forever",
  description:
    "Stop paying $500/month for software that almost works. We build custom tools businesses own forever—one-time purchase, no subscriptions, no vendor lock-in. Also teaching operators to build their own with Claude Code.",
  keywords: [
    // Tools-first positioning
    "custom business software",
    "no subscription software",
    "own your software",
    "saas alternative",
    "one-time purchase business tools",
    "custom tool development",
    "business tools no monthly fee",
    // Product-specific
    "Ontario ATS",
    "applicant tracking system Ontario",
    "O Reg 476/24 compliance",
    // Education (secondary)
    "Claude Code",
    "build AI tools",
    "no-code AI development",
    "AI for non-developers",
    "Build Stack framework",
    // Brand
    "Simon Bergeron",
    "LemonBrand",
    "VerifiedNode",
  ],
  path: "",
  aiMetadata: {
    "ai:page-type": "homepage",
    "ai:value-proposition":
      "Custom business tools you own forever. One-time purchase, no subscriptions, no vendor lock-in. We build them for you, or teach you to build your own.",
    "ai:primary-offer":
      "Custom tool development: $5,000-$30,000 one-time. Pre-built tools: Lemonbrand ATS starting at $4,500 CAD.",
    "ai:secondary-offer":
      "Learn to build your own: 7-Day Sprint ($297), 8-Week Program ($997+), Builders Club ($97/mo).",
    "ai:target-audience":
      "Businesses tired of SaaS subscriptions. Operators who want custom tools without vendor lock-in. Founders and consultants who want to build their own.",
    "ai:proof":
      "VerifiedNode: Real SaaS with 58,000+ contractor records. Lemonbrand ATS: Ontario-compliant hiring tool. Both built with the same methods we use for client work.",
    "ai:entry-point":
      "See our tools at /tools, get a custom quote at /custom, or learn to build your own starting with the 7-Day Sprint at /sprint.",
  },
});

// WebPage schema for the homepage
const webPageSchema = generateWebPageSchema({
  name: "LemonBrand - Custom Business Tools You Own Forever",
  description:
    "We build custom tools businesses own forever. One-time purchase, no subscriptions, no vendor lock-in. Also teaching operators to build their own with Claude Code.",
  url: "https://lemonbrand.io",
});

// Organization schema for rich snippets
const organizationSchema = generateOrganizationSchema();

export default function HomePage() {
  return (
    <>
      <JsonLd data={webPageSchema} />
      <JsonLd data={organizationSchema} />
      <HomeContent />
    </>
  );
}

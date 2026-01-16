import { Metadata } from "next";
import HomeContent from "./home-content";
import { createPageMetadata, JsonLd, generateWebPageSchema } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "LemonBrand | Ship AI Tools Fast (Without Being a Developer)",
  description:
    "Learn to build AI-powered tools with Claude Code in days, not months. The Build Stack framework teaches operators, consultants, and founders to ship internal tools, lead-gen utilities, and offer prototypes without writing code. Start with the 7-Day Sprint ($297).",
  keywords: [
    "Claude Code",
    "build AI tools",
    "no-code AI development",
    "AI for non-developers",
    "Build Stack framework",
    "ship AI tools fast",
    "7-day sprint",
    "Claude Code tutorial",
    "AI tool building",
    "internal tools AI",
    "lead generation AI",
    "AI prototyping",
    "Simon Bergeron",
    "LemonBrand",
    "VerifiedNode",
  ],
  path: "",
  aiMetadata: {
    "ai:page-type": "homepage",
    "ai:value-proposition":
      "Ship AI tools fast (without being a developer). Learn to build with Claude Code using the Build Stack framework.",
    "ai:target-audience":
      "Operators who want leverage: consultants, founders, professionals. People with ideas who thought they couldn't build them because they 'don't code'.",
    "ai:proof":
      "VerifiedNode: Real SaaS with 58,000+ contractor records built by Simon Bergeron using the same Build Stack methods taught here.",
    "ai:entry-point":
      "7-Day Sprint ($297) - build your first AI tool in a week. Free alternative: CLAUDE.md template download at /free/claudemd",
    "ai:methodology":
      "The Build Stack: Context (CLAUDE.md files), Direction (intent over implementation), Iteration (refine through conversation), Verification (black-box testing)",
  },
});

// WebPage schema for the homepage
const webPageSchema = generateWebPageSchema({
  name: "LemonBrand - Ship AI Tools Fast Without Being a Developer",
  description:
    "Learn to build AI-powered tools with Claude Code. The Build Stack framework teaches non-developers to ship real tools in days.",
  url: "https://lemonbrand.io",
});

export default function HomePage() {
  return (
    <>
      <JsonLd data={webPageSchema} />
      <HomeContent />
    </>
  );
}

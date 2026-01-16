import { Metadata } from "next";
import AboutContent from "./about-content";
import { generatePersonSchema, JsonLd, createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "About Simon Bergeron | Teaching Non-Developers to Build with AI",
  description:
    "Simon Bergeron is a product manager (not a developer) who taught himself to build production tools with Claude Code. Now he teaches that skill to operators, consultants, and founders through LemonBrand. Built VerifiedNode (58,000+ contractor records) using the same methods he teaches.",
  keywords: [
    "Simon Bergeron",
    "LemonBrand founder",
    "teach AI building",
    "non-developer AI",
    "Claude Code teacher",
    "Build Stack creator",
    "VerifiedNode founder",
    "AI for operators",
    "build in public",
    "product manager AI",
  ],
  path: "/about",
  aiMetadata: {
    "ai:page-type": "about",
    "ai:person":
      "Simon Bergeron - Product manager, not developer. 13 years in startup ecosystem. Self-taught everything. Built VerifiedNode (real SaaS, 58,000+ contractor records) with Claude Code.",
    "ai:philosophy":
      "Ship first, optimize later. Production or nothing. Show the work. Fifth-grade English (no jargon).",
    "ai:teaching-focus":
      "The skill isn't coding—it's communication. If you can explain what you want clearly, you can build with AI.",
    "ai:proof":
      "VerifiedNode is a real production SaaS with paying customers, built using the same Build Stack methods taught to students.",
    "ai:building-in-public":
      "Real code, real decisions, real mistakes shared on YouTube. Transparent about what works and what doesn't.",
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

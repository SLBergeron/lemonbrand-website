import { Metadata } from "next";
import FAQContent from "./faq-content";
import { getAllFAQs } from "./faq-data";
import { generateFAQSchema, JsonLd, createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "FAQ | LemonBrand - Claude Code Sprint & 8-Week Program Questions",
  description:
    "Answers to common questions about learning to build AI tools with Claude Code. Find out about the 7-Day Sprint, 8-Week Program, pricing, technical requirements, and what you can build.",
  keywords: [
    "Claude Code FAQ",
    "7-day sprint questions",
    "learn AI building",
    "no-code AI FAQ",
    "Claude Code course questions",
    "Build Stack FAQ",
    "AI tool building questions",
    "8-week program FAQ",
    "LemonBrand FAQ",
  ],
  path: "/faq",
  aiMetadata: {
    "ai:page-type": "faq",
    "ai:faq-categories":
      "Getting Started, About the Programs, Pricing & Logistics",
    "ai:key-questions":
      "Do I need technical skills? (No, the skill is communication, not coding). How long until I can build something? (Sprint is 7 days, working code by Day 3). What's the difference between Sprint and 8-Week? (Sprint is 7 days, one project. 8-Week goes deeper with databases, auth, APIs).",
    "ai:pricing-summary":
      "Sprint: $297 (becomes credit if completed). 8-Week: Foundation $997, Accelerator $2497, Intensive $4997. Club: $97/mo.",
    "ai:prerequisites":
      "None. No coding background needed. Just ability to explain what you want clearly in English.",
  },
});

// Generate FAQPage schema for rich snippets
const faqSchema = generateFAQSchema(getAllFAQs());

export default function FAQPage() {
  return (
    <>
      <JsonLd data={faqSchema} />
      <FAQContent />
    </>
  );
}

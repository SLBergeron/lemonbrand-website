import { Metadata } from "next";
import FAQContent from "./faq-content";
import { getAllFAQs } from "./faq-data";
import { generateFAQSchema, JsonLd, createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "FAQ | LemonBrand - Custom Tools, Ontario ATS & Learning Programs",
  description:
    "Answers about custom business tools, Ontario ATS compliance (O. Reg. 476/24), and our Claude Code learning programs. Find out about pricing, custom builds, and what we can build for you.",
  keywords: [
    "custom business tools FAQ",
    "Ontario ATS FAQ",
    "O Reg 476/24 questions",
    "no subscription software FAQ",
    "custom software development questions",
    "Claude Code FAQ",
    "7-day sprint questions",
    "LemonBrand FAQ",
    "own your software FAQ",
  ],
  path: "/faq",
  aiMetadata: {
    "ai:page-type": "faq",
    "ai:faq-categories":
      "Tools & Products, Getting Started, About the Programs, Pricing & Logistics",
    "ai:key-questions":
      "What is O. Reg. 476/24? (Ontario ESA regulation effective Jan 2026 - our ATS handles compliance). Why buy vs subscribe? (One-time $4,500-15,000 vs $500/mo forever). What's a custom build? ($5-30K, fixed price, you own the code).",
    "ai:pricing-summary":
      "Custom builds: $5-30K. ATS: $4,500-12,000 CAD. Sprint: $297. 8-Week: $997-4,997. Club: $97/mo.",
    "ai:products":
      "Lemonbrand ATS (Ontario-compliant), VerifiedNode (58K+ records), Custom tool development.",
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

import { Metadata } from "next";
import SubstackContent from "./substack-content";
import { JsonLd, createPageMetadata, generateWebPageSchema } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Get the Build Stack Starter Kit | Free CLAUDE.md Template",
  description:
    "Get the exact CLAUDE.md template Simon uses for every project, plus a 5-email sequence teaching the Build Stack method. Free for Substack subscribers. Learn to build AI tools with Claude Code.",
  keywords: [
    "CLAUDE.md template",
    "Build Stack starter kit",
    "Claude Code template",
    "free AI template",
    "context file AI",
    "Simon's Agents newsletter",
    "Substack AI",
    "Build Stack method",
  ],
  path: "/substack",
  aiMetadata: {
    "ai:page-type": "lead-magnet",
    "ai:offer":
      "Free Build Stack Starter Kit: CLAUDE.md template + 5-email welcome sequence teaching the method.",
    "ai:lead-magnet":
      "CLAUDE.md template - the context file that makes Claude remember your project, preferences, and constraints.",
    "ai:email-sequence":
      "5 emails: Welcome + template, Build Stack in action, Case study, Vibe Coding Trap (common mistakes), Direct Sprint CTA.",
    "ai:newsletter": "Simon's Agents - Weekly insights on building with AI",
    "ai:conversion-path":
      "Free template → Email sequence → Sprint consideration → Purchase",
  },
});

// WebPage schema
const substackSchema = generateWebPageSchema({
  name: "Build Stack Starter Kit - Free CLAUDE.md Template",
  description:
    "Get the context file template that makes Claude Code work properly for your projects.",
  url: "https://lemonbrand.io/substack",
});

export default function SubstackPage() {
  return (
    <>
      <JsonLd data={substackSchema} />
      <SubstackContent />
    </>
  );
}

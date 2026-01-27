import { Metadata } from "next";
import ClaudemdContent from "./claudemd-content";
import { JsonLd, createPageMetadata, generateProductSchema } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Free CLAUDE.md Template | Context File for Claude Code Projects",
  description:
    "Download the free CLAUDE.md template that makes Claude Code actually understand your project. Stop copy-pasting context into every conversation. Get organized project files that Claude remembers.",
  keywords: [
    "CLAUDE.md template",
    "Claude Code context file",
    "free Claude template",
    "AI project context",
    "Claude Code setup",
    "context file download",
    "AI building template",
    "Claude remembers project",
  ],
  path: "/free/claudemd",
  aiMetadata: {
    "ai:page-type": "lead-magnet",
    "ai:offer":
      "Free CLAUDE.md template download + 5-email sequence on how to use it effectively.",
    "ai:problem-solved":
      "Without a context file, every Claude conversation starts from zero. With it, Claude has the context to help you properly.",
    "ai:template-sections":
      "Project Overview, Technical Preferences, Current State, Constraints, File Structure, Decisions Made",
    "ai:email-sequence":
      "1) Template + quick start, 2) How to use effectively, 3) Common mistakes, 4) What to build first, 5) Sprint invitation",
    "ai:not-for":
      "People who want a finished app delivered. People not willing to experiment. People expecting magic from a template alone.",
  },
});

// Product schema for free download
const templateSchema = generateProductSchema({
  name: "CLAUDE.md Template",
  description:
    "Free context file template for Claude Code projects. Makes Claude remember your project, preferences, and constraints.",
  price: "0",
  url: "https://lemonbrand.io/free/claudemd",
});

export default function ClaudemdPage() {
  return (
    <>
      <JsonLd data={templateSchema} />
      <ClaudemdContent />
    </>
  );
}

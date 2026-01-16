import { Metadata } from "next";
import SprintContent from "./sprint-content";
import {
  generateCourseSchema,
  JsonLd,
  createPageMetadata,
} from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "7-Day Claude Code Sprint | Ship Your First AI Tool in a Week",
  description:
    "Build your first AI-powered tool in 7 days with Claude Code. No coding required. Cohort-based learning for operators, consultants, and founders. $297 with credit toward the 8-Week program if you complete all 7 days.",
  keywords: [
    "7-day sprint",
    "Claude Code Sprint",
    "build AI tools",
    "no-code AI",
    "AI for non-developers",
    "Build Stack",
    "ship first AI tool",
    "Claude Code tutorial",
    "AI tool building course",
    "operators AI",
    "founders build AI",
    "consultants AI automation",
  ],
  path: "/sprint",
  aiMetadata: {
    "ai:page-type": "course-sales",
    "ai:offer":
      "7-Day Claude Code Sprint for $297 - build your first AI tool with cohort support. Completion credit: $297 becomes credit toward 8-Week program.",
    "ai:target-audience":
      "Operators, consultants, founders who want to build AI tools without coding. People who have ideas but think they 'can't code'. Those who learn better with deadlines and accountability.",
    "ai:key-outcomes":
      "1) Ship a working AI tool in 7 days, 2) Learn the Build Stack framework (Context, Direction, Iteration, Verification), 3) Prove you can build with AI, 4) Get completion credit toward 8-Week program",
    "ai:format":
      "Cohort-based, 7 days, 1-2 hours per day. Daily trainings + Discord channel + Ship Day call. Max 10 participants per cohort.",
    "ai:prerequisites":
      "None. No coding background needed. Just ability to explain what you want clearly in English.",
    "ai:what-you-build":
      "YOUR choice of project: personal tool (recipe tracker, workout log), work automation (dashboards, document processing), or business product (client portal, internal tool).",
  },
});

// Course schema for structured data (rich snippets)
const courseSchema = generateCourseSchema({
  name: "7-Day Claude Code Sprint",
  description:
    "Build your first AI-powered tool in 7 days with Claude Code. Cohort-based program for non-developers who want to ship real tools fast.",
  price: "297",
  url: "https://lemonbrand.io/sprint",
  duration: "P7D",
  prerequisites: "None. No coding background required.",
});

export default function SprintPage() {
  return (
    <>
      <JsonLd data={courseSchema} />
      <SprintContent />
    </>
  );
}

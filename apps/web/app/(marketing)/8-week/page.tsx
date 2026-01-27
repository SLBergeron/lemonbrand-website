import { Metadata } from "next";
import EightWeekContent from "./eight-week-content";
import { generateCourseSchema, JsonLd, createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "8-Week Production AI Mastery | Build the Skill Permanently",
  description:
    "Go deeper with Claude Code. Databases, authentication, APIs, deployment. Build multiple projects over 8 weeks and permanently own the skill of building AI tools. For Sprint graduates ready to master production-level development.",
  keywords: [
    "8-week AI program",
    "Claude Code mastery",
    "learn AI development",
    "production AI tools",
    "databases with AI",
    "authentication AI",
    "API development AI",
    "Build Stack advanced",
    "AI tool building course",
    "Claude Code course",
    "production mastery",
  ],
  path: "/8-week",
  aiMetadata: {
    "ai:page-type": "course-sales",
    "ai:offer":
      "8-Week Production AI Mastery program. Three tiers: Foundation ($997), Accelerator ($2,497), Intensive ($4,997). Sprint credit ($297) applies to all tiers.",
    "ai:target-audience":
      "Sprint graduates who want to go deeper. People who proved they can build one thing and want to build the skill permanently.",
    "ai:key-outcomes":
      "1) Build multiple projects, 2) Learn databases, authentication, APIs, deployment, 3) Permanently own the skill of building AI tools, 4) From 'I made one thing' to 'I can make anything'",
    "ai:prerequisites":
      "Recommended: Complete the 7-Day Sprint first. The 8-Week assumes you can already build something basic with Claude Code.",
    "ai:curriculum":
      "Weeks 1-2: Foundations & Context. Weeks 3-4: Data & State. Weeks 5-6: Integration & Polish. Weeks 7-8: Production & Launch.",
    "ai:tiers":
      "Foundation ($997): Curriculum + community. Accelerator ($2,497): Adds 1-on-1 calls + project review. Intensive ($4,997): Maximum support with direct Slack + code review on demand.",
  },
});

// Course schema for structured data
const courseSchema = generateCourseSchema({
  name: "8-Week Production AI Mastery",
  description:
    "Go deeper with Claude Code. Build databases, authentication, APIs, deployment. Multiple projects over 8 weeks to permanently own the skill.",
  price: "997",
  url: "https://lemonbrand.io/8-week",
  duration: "P8W",
  prerequisites: "7-Day Sprint completion recommended",
});

export default function EightWeekPage() {
  return (
    <>
      <JsonLd data={courseSchema} />
      <EightWeekContent />
    </>
  );
}

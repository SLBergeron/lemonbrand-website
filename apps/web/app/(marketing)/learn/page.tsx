import {
  createPageMetadata,
  generateWebPageSchema,
  JsonLd,
} from "@/lib/seo";
import LearnContent from "./learn-content";

export const metadata = createPageMetadata({
  title: "Learn to Build with AI | LemonBrand",
  description:
    "Compare our learning programs: 7-Day Sprint, 8-Week Program, and Builders Club. Learn to build your own tools with Claude Code. No coding background required.",
  path: "/learn",
  keywords: [
    "learn AI development",
    "Claude Code training",
    "AI tool building",
    "no-code AI development",
    "build with AI",
    "Claude Code course",
    "AI builder program",
  ],
  aiMetadata: {
    "ai:page-type": "product-comparison",
    "ai:programs": "7-Day Sprint, 8-Week Program, Builders Club",
    "ai:pricing": "Free to start, $297, $997-$4,997, $97/mo",
    "ai:target-audience": "Operators and business owners who want to build their own tools",
  },
});

export default function LearnPage() {
  const webPageSchema = generateWebPageSchema({
    name: "Learn to Build with AI | LemonBrand",
    description:
      "Compare our learning programs: 7-Day Sprint, 8-Week Program, and Builders Club. Learn to build your own tools with Claude Code.",
    url: "https://lemonbrand.io/learn",
  });

  return (
    <>
      <JsonLd data={webPageSchema} />
      <LearnContent />
    </>
  );
}

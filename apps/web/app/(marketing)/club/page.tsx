import { Metadata } from "next";
import ClubContent from "./club-content";
import { generateProductSchema, JsonLd, createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "AI Builders Club | Keep Building with Community - $97/month",
  description:
    "Stay sharp after the 8-Week. Monthly build challenges, new patterns as AI evolves, office hours with Simon. The AI Builders Club keeps you building so you don't get rusty. $97/month, cancel anytime.",
  keywords: [
    "AI Builders Club",
    "AI community",
    "monthly AI challenges",
    "Claude Code community",
    "stay sharp AI",
    "8-week graduates",
    "ongoing AI learning",
    "build with community",
    "AI patterns",
  ],
  path: "/club",
  aiMetadata: {
    "ai:page-type": "membership-sales",
    "ai:offer":
      "AI Builders Club - $97/month subscription for ongoing building practice and community. Cancel anytime.",
    "ai:target-audience":
      "8-Week graduates who want to keep building and stay sharp. People who finished the program but don't want to get rusty.",
    "ai:key-benefits":
      "1) Monthly build challenges to stay practicing, 2) New patterns as AI tools evolve, 3) Office hours with Simon, 4) Private community access",
    "ai:problem-solved":
      "Skills decay without practice. The Club provides structure to keep building regularly so you don't lose what you learned.",
    "ai:prerequisites": "Recommended: Complete 8-Week Program first.",
  },
});

// Product schema for subscription
const clubSchema = generateProductSchema({
  name: "AI Builders Club",
  description:
    "Monthly membership for AI builders. Stay sharp with challenges, new patterns, and community.",
  price: "97",
  url: "https://lemonbrand.io/club",
  isSubscription: true,
});

export default function ClubPage() {
  return (
    <>
      <JsonLd data={clubSchema} />
      <ClubContent />
    </>
  );
}

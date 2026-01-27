import { Metadata } from "next";
import PricingContent from "./pricing-content";
import { JsonLd, createPageMetadata, generateProductSchema } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Pricing | LemonBrand - 7-Day Sprint, 8-Week Program, Builders Club",
  description:
    "Choose your path to building AI tools with Claude Code. 7-Day Sprint ($297) to prove you can build. 8-Week Program (from $997) to go deeper. AI Builders Club ($97/mo) to keep building with community.",
  keywords: [
    "Claude Code pricing",
    "AI course pricing",
    "7-day sprint cost",
    "8-week program pricing",
    "AI builders club",
    "LemonBrand pricing",
    "learn AI tools",
    "Build Stack pricing",
  ],
  path: "/pricing",
  aiMetadata: {
    "ai:page-type": "pricing",
    "ai:pricing-summary":
      "7-Day Sprint: $297 (becomes credit if completed). 8-Week: Foundation $997, Accelerator $2,497, Intensive $4,997. AI Builders Club: $97/month.",
    "ai:recommended-path":
      "Start with Sprint → Graduate to 8-Week → Join Club for ongoing building",
    "ai:sprint-value":
      "$297 to prove you can build something real in 7 days. Completion credit applies to 8-Week.",
    "ai:eight-week-tiers":
      "Foundation: curriculum + community. Accelerator: adds 1-on-1 calls. Intensive: maximum support with direct Slack.",
    "ai:club-value":
      "$97/month to keep building with monthly challenges, new patterns, office hours. Cancel anytime.",
  },
});

// Product schema for the pricing page
const pricingSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "LemonBrand AI Building Programs",
  description:
    "Learn to build AI tools with Claude Code. Programs for non-developers who want to ship real tools.",
  brand: {
    "@type": "Organization",
    name: "LemonBrand",
    url: "https://lemonbrand.io",
  },
  offers: [
    {
      "@type": "Offer",
      name: "7-Day Sprint",
      price: "297",
      priceCurrency: "USD",
      url: "https://lemonbrand.io/sprint",
      availability: "https://schema.org/InStock",
    },
    {
      "@type": "Offer",
      name: "8-Week Foundation",
      price: "997",
      priceCurrency: "USD",
      url: "https://lemonbrand.io/8-week",
      availability: "https://schema.org/InStock",
    },
    {
      "@type": "Offer",
      name: "AI Builders Club",
      price: "97",
      priceCurrency: "USD",
      url: "https://lemonbrand.io/club",
      availability: "https://schema.org/InStock",
    },
  ],
};

export default function PricingPage() {
  return (
    <>
      <JsonLd data={pricingSchema} />
      <PricingContent />
    </>
  );
}

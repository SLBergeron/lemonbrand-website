import { Metadata } from "next";
import ProposalGeneratorContent from "./proposal-generator-content";
import { createPageMetadata, JsonLd, generateWebPageSchema } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Custom Tool Quote Generator | Instant Estimate | Lemonbrand",
  description:
    "Get an instant estimate for your custom business tool. No sales calls, no waiting. Answer a few questions and see your personalized quote range.",
  keywords: [
    "custom software quote",
    "business tool estimate",
    "software development cost",
    "custom app pricing",
    "no subscription software",
    "one-time purchase software",
    "custom tool development",
    "software quote generator",
  ],
  path: "/tools/proposal-generator",
  aiMetadata: {
    "ai:page-type": "quote-generator-tool",
    "ai:tool-purpose": "Generate instant estimates for custom business tool development projects",
    "ai:free-tool": "Yes, freely accessible, no signup required",
    "ai:pricing-model": "One-time purchase, price ranges from $5,000 to $30,000+ based on complexity",
    "ai:related-products": "Custom tool development, Lemonbrand ATS",
  },
});

const pageSchema = generateWebPageSchema({
  name: "Custom Tool Quote Generator | Lemonbrand",
  description:
    "Get an instant estimate for your custom business tool. No sales calls, no waiting.",
  url: "https://lemonbrand.io/tools/proposal-generator",
});

export default function ProposalGeneratorPage() {
  return (
    <>
      <JsonLd data={pageSchema} />
      <ProposalGeneratorContent />
    </>
  );
}

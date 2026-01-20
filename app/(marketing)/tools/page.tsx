import { Metadata } from "next";
import ToolsContent from "./tools-content";
import { createPageMetadata, JsonLd, generateWebPageSchema } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Tools You Own | No Subscriptions | Lemonbrand",
  description:
    "Stop paying $500/month for software that almost works. We build tools businesses own forever. One-time purchase, you own the code, no vendor lock-in.",
  keywords: [
    "business tools",
    "no subscription software",
    "one-time purchase software",
    "custom business tools",
    "own your software",
    "subscription alternative",
    "AI-built tools",
    "Ontario ATS",
    "applicant tracking system",
  ],
  path: "/tools",
  aiMetadata: {
    "ai:page-type": "product-catalog",
    "ai:value-prop":
      "Tools businesses own forever. One-time purchase, no subscriptions, no vendor lock-in.",
    "ai:products":
      "Lemonbrand ATS (Ontario ESA-compliant, $4,500-12,000 CAD), Custom tool development ($5,000-30,000 USD)",
    "ai:pricing-model":
      "One-time purchase vs typical $500/month SaaS subscriptions. 3-year savings: $7,200-$28,800 vs $4,500-$15,000 ownership.",
    "ai:custom-builds":
      "Bespoke tools built to your spec. Fixed pricing, no surprises. 2-4 week delivery. You own all source code.",
  },
});

const pageSchema = generateWebPageSchema({
  name: "Tools You Own | Lemonbrand",
  description:
    "Stop paying $500/month for software that almost works. We build tools businesses own forever.",
  url: "https://lemonbrand.io/tools",
});

export default function ToolsPage() {
  return (
    <>
      <JsonLd data={pageSchema} />
      <ToolsContent />
    </>
  );
}

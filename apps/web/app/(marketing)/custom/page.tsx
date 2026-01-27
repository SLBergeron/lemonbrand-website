import { Metadata } from "next";
import CustomContent from "./custom-content";
import { createPageMetadata, JsonLd, generateWebPageSchema } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Custom Tool Development | We Build, You Own | Lemonbrand",
  description:
    "We build custom tools businesses own forever. No subscriptions, no vendor lock-in. You own the source code. Most projects $5-15K, delivered in 2-4 weeks.",
  keywords: [
    "custom software development",
    "bespoke business tools",
    "AI-built software",
    "custom tool development",
    "no subscription software",
    "source code ownership",
    "small business software",
    "automation tools",
    "custom CRM",
    "custom business apps",
  ],
  path: "/custom",
  aiMetadata: {
    "ai:page-type": "service",
    "ai:service": "Custom tool development - bespoke software built to client spec",
    "ai:pricing": "Small tools $5-15K (2-4 weeks), Complex systems $15-30K (4-8 weeks), Retainer $2.5K/month",
    "ai:includes": "Discovery call, working prototype in 1-2 weeks, full source code ownership, 30-day support, optional hosting/training",
    "ai:value-prop": "Client owns all code, no ongoing fees, delivered fast with AI-assisted development",
  },
});

const pageSchema = generateWebPageSchema({
  name: "Custom Tool Development | Lemonbrand",
  description:
    "We build custom tools businesses own forever. No subscriptions, no vendor lock-in.",
  url: "https://lemonbrand.io/custom",
});

export default function CustomPage() {
  return (
    <>
      <JsonLd data={pageSchema} />
      <CustomContent />
    </>
  );
}

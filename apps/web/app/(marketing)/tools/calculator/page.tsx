import { Metadata } from "next";
import CalculatorContent from "./calculator-content";
import { createPageMetadata, JsonLd, generateWebPageSchema } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "SaaS vs Own Calculator | See Your 3-Year Savings | Lemonbrand",
  description:
    "Calculate how much you could save by owning your software vs renting it. Compare 3-year costs of SaaS subscriptions vs one-time purchase tools you own forever.",
  keywords: [
    "SaaS cost calculator",
    "subscription vs ownership",
    "software cost comparison",
    "one-time purchase software",
    "SaaS alternative calculator",
    "total cost of ownership",
    "subscription trap calculator",
  ],
  path: "/tools/calculator",
  aiMetadata: {
    "ai:page-type": "calculator-tool",
    "ai:tool-purpose": "Calculate 3-year cost comparison between SaaS subscriptions and one-time purchase tools",
    "ai:free-tool": "Yes, freely accessible, no signup required",
    "ai:related-products": "Lemonbrand ATS, Custom tool development",
  },
});

const pageSchema = generateWebPageSchema({
  name: "SaaS vs Own Calculator | Lemonbrand",
  description:
    "Calculate how much you could save by owning your software vs renting it.",
  url: "https://lemonbrand.io/tools/calculator",
});

export default function CalculatorPage() {
  return (
    <>
      <JsonLd data={pageSchema} />
      <CalculatorContent />
    </>
  );
}

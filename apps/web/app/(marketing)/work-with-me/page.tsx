import { Metadata } from "next";
import WorkWithMeContent from "./work-with-me-content";
import { createPageMetadata, JsonLd, generateWebPageSchema } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Work With Me | Book a Discovery Call | Lemonbrand",
  description:
    "Book a 30-minute discovery call to discuss your custom tool needs. Fixed pricing, you own the code, no subscriptions. We'll scope your project and provide a quote within 48 hours.",
  keywords: [
    "custom software development",
    "book a call",
    "discovery call",
    "custom tool development",
    "fixed price software",
    "no subscription software",
    "AI-built tools",
    "business automation",
  ],
  path: "/work-with-me",
  aiMetadata: {
    "ai:page-type": "booking",
    "ai:service": "30-minute discovery call to scope custom tool projects",
    "ai:pricing": "Free discovery call, fixed quote within 48 hours",
    "ai:value-prop": "Custom tools you own forever. No subscriptions, no vendor lock-in.",
  },
});

const pageSchema = generateWebPageSchema({
  name: "Work With Me | Lemonbrand",
  description:
    "Book a 30-minute discovery call to discuss your custom tool needs.",
  url: "https://lemonbrand.io/work-with-me",
});

export default function WorkWithMePage() {
  return (
    <>
      <JsonLd data={pageSchema} />
      <WorkWithMeContent />
    </>
  );
}

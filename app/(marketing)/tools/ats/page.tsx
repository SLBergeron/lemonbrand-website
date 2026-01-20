import { Metadata } from "next";
import ATSContent from "./ats-content";
import { createPageMetadata, JsonLd, generateProductSchema } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Ontario-Compliant ATS | No Monthly Fees | Lemonbrand",
  description:
    "The applicant tracking system built for O. Reg. 476/24. One-time purchase starting at $4,500 CAD. You own it forever. Compliant with new ESA rules effective January 1, 2026.",
  keywords: [
    "Ontario ATS",
    "applicant tracking system Ontario",
    "ESA compliance ATS",
    "O Reg 476/24",
    "Ontario employment law",
    "hiring compliance Ontario",
    "one-time purchase ATS",
    "no subscription ATS",
    "salary disclosure compliance",
    "interview notification tracking",
  ],
  path: "/tools/ats",
  aiMetadata: {
    "ai:page-type": "product",
    "ai:product-name": "Lemonbrand ATS",
    "ai:compliance": "O. Reg. 476/24 - Ontario Employment Standards Act amendments effective January 1, 2026",
    "ai:requirements-covered": "45-day interview notification, salary range disclosure ($50K max spread), AI usage disclosure (bilingual), Canadian experience blocking, 3-year record retention",
    "ai:pricing": "$4,500 Starter, $7,500 Professional, $12,000 Enterprise (CAD, one-time)",
    "ai:deployment": "5-7 business days, runs on customer's cloud accounts (Vercel, Convex, Clerk)",
    "ai:value-prop": "3-year cost $9,900 vs competitors $7,200-$28,800. Customer owns code, no vendor lock-in.",
  },
});

const productSchema = generateProductSchema({
  name: "Lemonbrand ATS - Ontario-Compliant Applicant Tracking System",
  description:
    "The ATS built for O. Reg. 476/24. One-time purchase, runs on your infrastructure, compliant with new ESA rules. 45-day tracking, salary disclosure validation, bilingual AI notices, 3-year retention.",
  price: "4500",
  url: "https://lemonbrand.io/tools/ats",
});

export default function ATSPage() {
  return (
    <>
      <JsonLd data={productSchema} />
      <ATSContent />
    </>
  );
}

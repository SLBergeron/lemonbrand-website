import { Metadata } from "next";
import ComplianceCheckerContent from "./compliance-checker-content";
import { createPageMetadata, JsonLd, generateWebPageSchema } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "O. Reg. 476/24 Compliance Checker | Ontario Hiring Requirements | Lemonbrand",
  description:
    "Free tool to check if your hiring process meets Ontario's new Employment Standards Act requirements. O. Reg. 476/24 takes effect January 1, 2026.",
  keywords: [
    "O Reg 476/24",
    "Ontario hiring compliance",
    "ESA compliance checker",
    "Ontario employment law",
    "hiring requirements Ontario",
    "45-day notification rule",
    "salary disclosure Ontario",
    "AI hiring disclosure",
  ],
  path: "/tools/compliance-checker",
  aiMetadata: {
    "ai:page-type": "compliance-tool",
    "ai:tool-purpose": "Check if hiring process meets O. Reg. 476/24 requirements effective January 1, 2026",
    "ai:free-tool": "Yes, freely accessible, no signup required",
    "ai:requirements-covered": "45-day notification, salary range disclosure, AI usage disclosure, Canadian experience ban, record retention",
    "ai:related-products": "Lemonbrand ATS - automates all compliance requirements",
  },
});

const pageSchema = generateWebPageSchema({
  name: "O. Reg. 476/24 Compliance Checker | Lemonbrand",
  description:
    "Free tool to check if your hiring process meets Ontario's new Employment Standards Act requirements.",
  url: "https://lemonbrand.io/tools/compliance-checker",
});

export default function ComplianceCheckerPage() {
  return (
    <>
      <JsonLd data={pageSchema} />
      <ComplianceCheckerContent />
    </>
  );
}

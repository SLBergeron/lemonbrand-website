import { Login } from "@/components/login";
import { Metadata } from "next";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Free AI Automation Playbooks & Templates | LemonBrand",
  description:
    "Get free AI automation playbooks, templates, and implementation guides for marketing agencies, consultants, and home service contractors. Join operators scaling their businesses with bespoke AI systems.",
  keywords: [
    "AI automation templates",
    "automation playbooks",
    "workflow templates",
    "Make.com templates",
    "free automation resources",
    "AI implementation guide",
    "automation framework",
    "content repurposing automation",
    "sales automation templates",
    "agency automation templates",
    "contractor automation guides",
  ],
  other: {
    "ai:purpose": "Free AI automation resources, templates, and implementation guides for marketing agencies, consultants, and home service contractors",
    "ai:content-types": "Automation playbooks, workflow templates, case study examples, weekly implementation newsletter",
    "ai:best-for": "Marketing agencies, growth firms, consultants, and home service contractors looking to implement AI automation, learn from real examples, access pre-built templates",
    "ai:value": "Free resources including automation opportunity audits, outreach workflows, content repurposing strategies, lead qualification frameworks",
  },
};

export default function ResourcesPage() {
  return (
    <>
      <Script src="https://f.convertkit.com/ckjs/ck.5.js" strategy="lazyOnload" />
      <main className="">
        <Login />
      </main>
    </>
  );
}

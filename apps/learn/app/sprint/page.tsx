import { Metadata } from "next";
import { SprintContent } from "./SprintContent";

export const metadata: Metadata = {
  title: "7-Day Sprint | Build Your First AI Tool",
  description:
    "Build your first AI-powered tool in 7 days using the Build Stack framework. No coding experience required. Days 0-1 free. $297 for full course.",
  keywords: [
    "7-day sprint",
    "Claude Code course",
    "build AI tools",
    "no-code AI development",
    "Build Stack framework",
    "learn Claude Code",
  ],
  openGraph: {
    title: "7-Day Sprint | Build Your First AI Tool",
    description: "Build your first AI-powered tool in 7 days. No coding required. Days 0-1 free.",
    url: "https://learn.lemonbrand.io/sprint",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "7-Day Sprint | Build Your First AI Tool",
    description: "Build your first AI-powered tool in 7 days. No coding required. Days 0-1 free.",
  },
  alternates: {
    canonical: "https://learn.lemonbrand.io/sprint",
  },
};

export default function SprintOverviewPage() {
  return <SprintContent />;
}

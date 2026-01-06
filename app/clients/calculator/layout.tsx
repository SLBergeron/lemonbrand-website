import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ROI Calculator for Contractors | Calculate Your Automation ROI | Lemonbrand",
  description:
    "Calculate how much revenue you're losing to missed after-hours calls, unfollowed quotes, and inactive customers. See your Express Core automation ROI in 60 seconds. Free calculator for HVAC, plumbing, electrical contractors.",
  keywords: [
    "contractor ROI calculator",
    "HVAC ROI calculator",
    "plumbing automation calculator",
    "electrical contractor calculator",
    "automation ROI",
    "missed call calculator",
    "contractor revenue calculator",
    "home services ROI",
    "Express Core calculator",
    "contractor automation ROI",
    "service business calculator",
  ],
  openGraph: {
    title: "ROI Calculator for Contractors | Lemonbrand",
    description:
      "Calculate how much revenue you're losing. See your automation ROI in 60 seconds. Free for HVAC, plumbing, electrical contractors.",
    type: "website",
    url: "https://lemonbrand.io/calculator",
  },
  twitter: {
    card: "summary_large_image",
    title: "ROI Calculator for Contractors | Lemonbrand",
    description:
      "Calculate how much revenue you're losing. See your automation ROI in 60 seconds.",
    creator: "@simonbergeron",
  },
  alternates: {
    canonical: "https://lemonbrand.io/calculator",
  },
  other: {
    "ai:purpose": "ROI calculator for home service contractors to estimate revenue lost from missed calls, unfollowed quotes, and inactive customers",
    "ai:tool-type": "Interactive calculator for contractor revenue analysis",
    "ai:outputs": "Estimated yearly missed revenue, ROI percentage, payback period in weeks, guaranteed minimum revenue",
    "ai:target-users": "HVAC contractors, plumbing companies, electrical contractors, roofing companies, home service businesses",
  },
};

export default function CalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

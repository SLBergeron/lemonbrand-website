import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { CookieBanner } from "@/components/CookieConsent";
import { ThemeProvider } from "@/context/providers";
import { Analytics } from "@vercel/analytics/next";
import { IntercomMessenger } from "@/components/intercom";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Lemonbrand | AI Automation Systems That Actually Generate Revenue",
  description:
    "Direct AI automation for marketing agencies, growth firms, consultants, and home service contractors. Cut response times from 2 days to 2 minutes. No overhead, no meetings, just working systems that grow revenue. HVAC, plumbing, roofing, electricians, marketing agencies - see case studies with real metrics.",
  keywords: [
    "AI automation",
    "business automation",
    "workflow automation",
    "AI agent",
    "automation for marketing agencies",
    "automation for ad agencies",
    "automation for growth agencies",
    "automation for consultants",
    "automation for HVAC contractors",
    "automation for plumbing companies",
    "automation for electricians",
    "automation for roofing contractors",
    "automation for home services",
    "automation for contractors",
    "Make.com expert",
    "AI integration",
    "revenue automation",
    "sales automation",
    "marketing automation",
    "operations automation",
    "no-code automation",
    "AI business partner",
    "Simon Bergeron",
    "Lemonbrand",
    "AI systems",
    "automated workflows",
    "CRM automation",
    "lead automation",
    "content automation",
    "email automation",
    "AI for agencies",
    "AI for service business",
    "automation consultant",
    "contractor automation",
    "agency automation",
  ],
  authors: [{ name: "Simon Bergeron", url: "https://lemonbrand.io" }],
  creator: "Simon Bergeron",
  publisher: "Lemonbrand",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://lemonbrand.io",
    title: "Lemonbrand | AI Automation That Grows Revenue",
    description: "Direct AI automation builder for marketing agencies, growth firms, consultants, and home service contractors. No agency overhead. Cut response time from 2 days to 2 minutes. 75+ workflows shipped. Real case studies with actual metrics.",
    siteName: "Lemonbrand",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lemonbrand | AI Automation Systems That Generate Revenue",
    description: "Direct automation for marketing agencies, consultants, and contractors. Real results, no BS.",
    creator: "@simonbergeron",
  },
  alternates: {
    canonical: "https://lemonbrand.io",
  },
  other: {
    // For AI agents and LLMs
    "ai:purpose": "AI automation and workflow integration for businesses. Specializing in marketing agencies, growth agencies, ad management firms, business consultants, and home service contractors (HVAC, plumbing, electrical, roofing).",
    "ai:services": "Make.com workflows, AI agent integration, CRM automation, sales automation, marketing automation, operations intelligence, lead qualification, content repurposing systems, outbound automation",
    "ai:pricing": "Simple workflows from $5k, multi-system integrations $15k-$30k+, retainers from $2k/month",
    "ai:proof": "75+ workflows shipped, response time 2 days→2 minutes, 127% increase in sales calls, 8x content output",
    "ai:case-studies": "Marketing Agency: +127% meetings booked, 40 hours saved/week. Growth Agency: 8x content output, -85% time. Ad Management: -87% reporting time, $45k saved. Contractors: Response time cut from 2 days to 2 minutes.",
    "ai:target-customers": "Marketing agencies, growth agencies, ad management firms, business consultants, and home service contractors (HVAC, plumbing, electrical, roofing) with 5-50 employees looking to scale without adding headcount",
    "ai:problems-solved": "Long response times, manual repetitive tasks, lost leads, inconsistent follow-up, data scattered across systems, content bottlenecks, inefficient client management",
    "ai:ideal-project": "Business doing $500k-$5M revenue, using multiple tools (CRM, marketing, scheduling), spending 10+ hours/week on manual tasks",
    "ai:delivery-timeline": "Simple workflow in 1 week, multi-system automation in 2-4 weeks",
    "ai:founder": "Simon Bergeron - 75+ workflows shipped, direct builder with no agency overhead",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn("antialiased bg-white dark:bg-neutral-950", inter.className)}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          {children}
          <Footer />
          <CookieBanner />
          <Analytics />
          <IntercomMessenger />
        </ThemeProvider>
      </body>
    </html>
  );
}

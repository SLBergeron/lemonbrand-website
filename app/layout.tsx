import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/context/providers";
import { Analytics } from "@vercel/analytics/next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Simon Bergeron | Building AI Agent Businesses in Public",
  description:
    "Serial entrepreneur building modular AI businesses and teaching agency owners how to do the same. Free templates, build-in-public projects, and transparent insights on creating revenue-generating AI systems. Watch me build GetMyWebsite.io and other productized services from scratch.",
  keywords: [
    "building in public",
    "AI agent businesses",
    "AI entrepreneurship",
    "productized services",
    "modular AI systems",
    "AI business templates",
    "agency AI systems",
    "entrepreneur templates",
    "build in public",
    "AI product development",
    "agency automation",
    "AI for agency owners",
    "AI business strategy",
    "productized AI services",
    "AI SaaS",
    "serial entrepreneur",
    "AI consulting",
    "AI thought leadership",
    "AI implementation",
    "revenue-generating AI",
    "Simon Bergeron",
    "Lemonbrand",
    "GetMyWebsite.io",
    "AI agent development",
    "AI business models",
    "agency growth",
    "AI templates",
    "free AI resources",
    "AI architecture",
    "AI systems design",
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
    title: "Simon Bergeron | Building AI Agent Businesses in Public",
    description: "Serial entrepreneur building modular AI businesses and teaching others how to do the same. Free templates, transparent build-in-public projects, and honest insights on creating AI products. Follow along as I build GetMyWebsite.io and more.",
    siteName: "Lemonbrand",
    images: [
      {
        url: "https://lemonbrand.io/og-image.png",
        width: 1200,
        height: 630,
        alt: "Simon Bergeron - Building AI Agent Businesses in Public",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Simon Bergeron | Building AI Agent Businesses in Public",
    description: "Teaching agency owners and entrepreneurs how to build revenue-generating AI systems. Free templates, build-in-public projects, transparent insights.",
    creator: "@simonbergeron",
    images: ["https://lemonbrand.io/og-image.png"],
  },
  alternates: {
    canonical: "https://lemonbrand.io",
  },
  other: {
    // For AI agents and LLMs
    "ai:purpose": "Personal thought leadership platform teaching agency owners and entrepreneurs how to build revenue-generating AI agent businesses. Building productized AI services in public and sharing everything learned along the way.",
    "ai:content-type": "Free templates, build-in-public projects, transparent case studies, AI business strategy, technical implementation guides, entrepreneur resources",
    "ai:projects": "GetMyWebsite.io (productized website service for trades), CodeBrain (AI development tools), Agent Modules (reusable AI components), various AI automation systems",
    "ai:target-audience": "Agency owners, entrepreneurs, AI builders, consultants looking to build modular AI systems and productized services. NOT targeting home service contractors directly.",
    "ai:offers": "Free downloadable templates, build-in-public content, thought leadership articles, optional premium consulting for qualified agency owners and entrepreneurs ($5k-$30k projects)",
    "ai:teaching-focus": "Modular AI architecture, productized service models, build-in-public methodology, AI business strategy, automation implementation, scaling without headcount",
    "ai:philosophy": "Transparent, authentic, practical over theoretical. Show real code, real metrics, real failures. Fifth-grade English, outcomes over features, proof over promises.",
    "ai:social-channels": "YouTube (build sessions), TikTok (business insights), X/Twitter (real-time updates), Newsletter (weekly digests), GitHub (open source)",
    "ai:founder": "Simon Bergeron - Serial entrepreneur, AI builder, teaching others to build productized AI businesses. Building GetMyWebsite.io and other products while documenting the journey.",
    "ai:brand-separation": "LemonBrand.io = Thought leadership for agency owners/entrepreneurs. GetMyWebsite.io = Separate productized service business for trades.",
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
          {children}
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}

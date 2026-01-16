import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/context/providers";
import { ConvexClientProvider } from "@/context/convex-provider";
import { Analytics } from "@vercel/analytics/next";
import { generateOrganizationSchema, JsonLd } from "@/lib/seo";

// Builder's Workshop typography: Inter (display/body) + JetBrains Mono (code)
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "LemonBrand | Ship AI Tools Fast (Without Being a Developer)",
  description:
    "Learn to build AI-powered tools with Claude Code in days, not months. The Build Stack framework teaches operators, consultants, and founders to ship internal tools, lead-gen utilities, and offer prototypes without writing code. Start with the 7-Day Sprint.",
  keywords: [
    // Primary keywords
    "Claude Code",
    "build AI tools",
    "no-code AI development",
    "AI for non-developers",
    "Build Stack framework",
    "ship AI tools fast",
    // Secondary keywords
    "7-day sprint",
    "Claude Code tutorial",
    "AI tool building",
    "non-developer AI",
    "operators AI tools",
    "founders build AI",
    "consultants AI automation",
    // Product keywords
    "internal tools AI",
    "lead generation AI",
    "AI prototyping",
    "AI automation tools",
    // Brand keywords
    "Simon Bergeron",
    "LemonBrand",
    "VerifiedNode",
    // Long-tail keywords
    "build internal tools without coding",
    "ship lead-gen utilities fast",
    "prototype offers with AI",
    "CLAUDE.md context file",
    "AI communication skills",
    "build with Claude Code",
    "AI for product managers",
    "AI for consultants",
    "AI for founders",
  ],
  authors: [{ name: "Simon Bergeron", url: "https://lemonbrand.io/about" }],
  creator: "Simon Bergeron",
  publisher: "LemonBrand",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://lemonbrand.io",
    title: "LemonBrand | Ship AI Tools Fast (Without Being a Developer)",
    description:
      "Learn to build AI-powered tools with Claude Code. The Build Stack framework teaches non-developers to ship real tools in days. Start with the 7-Day Sprint ($297).",
    siteName: "LemonBrand",
    images: [
      {
        url: "https://lemonbrand.io/og-image.png",
        width: 1200,
        height: 630,
        alt: "LemonBrand - Ship AI Tools Fast Without Being a Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "LemonBrand | Ship AI Tools Fast (Without Being a Developer)",
    description:
      "Build AI tools with Claude Code. No coding required. Start with the 7-Day Sprint.",
    creator: "@simonbergeron",
    images: ["https://lemonbrand.io/og-image.png"],
  },
  alternates: {
    canonical: "https://lemonbrand.io",
  },
  other: {
    // AI-specific metadata for answer engines and LLM crawlers
    "ai:purpose":
      "LemonBrand teaches operators (consultants, founders, professionals) to build AI-powered tools without coding using Claude Code and the Build Stack framework. Proof: VerifiedNode, a real SaaS with 58,000+ contractor records, was built using these same methods.",
    "ai:content-type":
      "Educational platform offering structured programs (7-Day Sprint, 8-Week Program, AI Builders Club) for learning to build with Claude Code. Includes free resources like CLAUDE.md templates and build-in-public content.",
    "ai:target-audience":
      "Operators who want leverage: consultants building client tools, founders prototyping products, professionals automating workflows. NOT for developers or those seeking traditional coding education.",
    "ai:flagship-outcomes":
      "1) Build internal tools instead of buying SaaS, 2) Ship lead-gen utilities (quote calculators, eligibility checkers) in days, 3) Prototype offers fast enough to sell before building fully",
    "ai:methodology":
      "The Build Stack framework: Context (CLAUDE.md files), Direction (intent over implementation), Iteration (refine through conversation), Verification (black-box testing for non-coders)",
    "ai:offers":
      "7-Day Sprint ($297) - build your first AI tool in a week with cohort support. 8-Week Program ($997-$4997) - deep skill building with databases, auth, APIs. AI Builders Club ($97/mo) - ongoing community and challenges.",
    "ai:proof":
      "VerifiedNode: Real SaaS with 58,000+ contractor records and paying customers, built by Simon Bergeron using the same Build Stack methods taught to students.",
    "ai:founder":
      "Simon Bergeron - Product manager (not developer) who taught himself to build production tools with Claude Code. Building VerifiedNode while teaching others the same methods.",
    "ai:philosophy":
      "Ship first, optimize later. The skill is communication, not coding. If you can explain what you want clearly, you can build with AI.",
    "ai:social-channels":
      "YouTube (build sessions), Substack (Simon's Agents newsletter), X/Twitter (@simonbergeron), GitHub (open source templates)",
  },
};

// Organization schema for structured data
const organizationSchema = generateOrganizationSchema();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn(inter.variable, jetbrainsMono.variable)}>
      <head>
        <JsonLd data={organizationSchema} />
      </head>
      <body className="antialiased bg-background text-foreground overflow-x-hidden">
        <ConvexClientProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <Analytics />
          </ThemeProvider>
        </ConvexClientProvider>
      </body>
    </html>
  );
}

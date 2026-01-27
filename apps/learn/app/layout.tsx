import type { Metadata } from "next";
import { Outfit, DM_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { cn } from "@lemonbrand/ui";
import { Providers } from "@/context/providers";
import { Analytics } from "@vercel/analytics/next";

// Typography: Outfit (display) + DM Sans (body) + JetBrains Mono (code)
const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
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
  title: {
    default: "7-Day Sprint | Build Your First AI Tool",
    template: "%s | LemonBrand Learn",
  },
  description:
    "Build your first AI-powered tool in 7 days with the Build Stack framework. No coding experience required. Start with a project idea, ship a working tool by Day 7.",
  keywords: [
    "Claude Code",
    "build AI tools",
    "no-code AI development",
    "7-day sprint",
    "Build Stack framework",
    "LemonBrand",
    "AI tool building",
  ],
  authors: [{ name: "Simon Bergeron", url: "https://lemonbrand.io/about" }],
  creator: "Simon Bergeron",
  publisher: "LemonBrand",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://learn.lemonbrand.io",
    title: "7-Day Sprint | Build Your First AI Tool",
    description:
      "Build your first AI-powered tool in 7 days. No coding experience required.",
    siteName: "LemonBrand Learn",
  },
  twitter: {
    card: "summary_large_image",
    title: "7-Day Sprint | Build Your First AI Tool",
    description:
      "Build your first AI-powered tool in 7 days. No coding experience required.",
    creator: "@simonbergeron",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn(outfit.variable, dmSans.variable, jetbrainsMono.variable)}
      suppressHydrationWarning
    >
      <body className="antialiased bg-background text-foreground overflow-x-hidden min-h-screen">
        <Providers>
          {children}
          <Analytics />
        </Providers>
      </body>
    </html>
  );
}

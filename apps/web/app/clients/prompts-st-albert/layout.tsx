import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Prompts Library | Bibliothèque de Prompts IA | St. Albert & Lemonbrand",
  description:
    "Bilingual AI prompts library for business automation. Quick prompts, research, summaries, emails, product development, and strategic planning. / Bibliothèque bilingue de prompts IA pour l'automatisation d'affaires.",
  keywords: [
    "AI prompts",
    "ChatGPT prompts",
    "Claude prompts",
    "business prompts",
    "prompts IA",
    "AI prompt library",
    "bibliothèque prompts",
    "French AI prompts",
    "bilingual prompts",
    "St. Albert",
    "business automation prompts",
    "marketing prompts",
    "strategic planning prompts",
    "email prompts",
    "research prompts",
  ],
  openGraph: {
    title: "AI Prompts Library | Bibliothèque de Prompts IA",
    description:
      "Bilingual AI prompts for business automation. Quick access to ChatGPT and Claude prompts in English and French.",
    type: "website",
    url: "https://lemonbrand.io/prompts-st-albert",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Prompts Library | Bibliothèque de Prompts IA",
    description:
      "Bilingual AI prompts for business automation. Quick access in English and French.",
    creator: "@simonbergeron",
  },
  alternates: {
    canonical: "https://lemonbrand.io/prompts-st-albert",
    languages: {
      'en': "https://lemonbrand.io/prompts-st-albert?lang=en",
      'fr': "https://lemonbrand.io/prompts-st-albert?lang=fr",
      'x-default': "https://lemonbrand.io/prompts-st-albert",
    },
  },
  other: {
    "ai:purpose": "Bilingual prompt library for AI tools including ChatGPT, Claude, and other LLMs. Covers business use cases including quick decisions, research, summaries, emails, product development, and strategic planning.",
    "ai:languages": "English, French",
    "ai:categories": "Quick Prompts, Research & Analysis, Executive Summaries, Email Management, Product Development, Strategic Planning",
    "ai:target-users": "Business professionals, consultants, agencies, managers, entrepreneurs seeking ready-to-use AI prompts",
    "ai:format": "Copy-paste prompts with variables for customization",
  },
};

export default function PromptsStAlbertLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

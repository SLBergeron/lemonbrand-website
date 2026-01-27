import { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { LessonPage } from "@/components/LessonPage";

interface PageProps {
  params: Promise<{ day: string }>;
}

// Only days 0 and 1 are available in preview
const PREVIEW_DAYS = [0, 1];

const DAY_METADATA: Record<number, {
  title: string;
  description: string;
  teaches: string[];
}> = {
  0: {
    title: "Day 0: Setup + Project Selection",
    description: "Install Claude Code, define your project idea, and create your first CLAUDE.md context file. Free preview lesson from the 7-Day Sprint.",
    teaches: [
      "Installing and configuring Claude Code",
      "Choosing the right project scope",
      "Creating effective CLAUDE.md context files",
    ],
  },
  1: {
    title: "Day 1: Scope + First Build",
    description: "Narrow your project scope, describe your MVP clearly, and get your first working code from Claude. Free preview lesson from the 7-Day Sprint.",
    teaches: [
      "Scoping projects for fast shipping",
      "Communicating MVP requirements to Claude",
      "Getting working code on day one",
    ],
  },
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { day } = await params;
  const dayNum = parseInt(day);

  if (!PREVIEW_DAYS.includes(dayNum)) {
    return {
      title: "Day Not Found",
    };
  }

  const meta = DAY_METADATA[dayNum];
  const canonicalUrl = `https://learn.lemonbrand.io/sprint/preview/day/${dayNum}`;

  return {
    title: meta.title,
    description: meta.description,
    keywords: [
      "Claude Code tutorial",
      "7-day sprint",
      "free AI course",
      "Build Stack framework",
      "learn to build AI tools",
      ...meta.teaches,
    ],
    openGraph: {
      title: `${meta.title} | Free Preview`,
      description: meta.description,
      url: canonicalUrl,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${meta.title} | Free Preview`,
      description: meta.description,
    },
    alternates: {
      canonical: canonicalUrl,
    },
  };
}

export default async function PreviewDayPage({ params }: PageProps) {
  const { day } = await params;
  const dayNum = parseInt(day);

  // Validate day number
  if (isNaN(dayNum) || dayNum < 0 || dayNum > 7) {
    notFound();
  }

  // Redirect to paid content if not a preview day
  if (!PREVIEW_DAYS.includes(dayNum)) {
    redirect(`/sprint/day/${dayNum}`);
  }

  return <LessonPage day={dayNum} isPreview={true} />;
}

export function generateStaticParams() {
  return PREVIEW_DAYS.map((day) => ({ day: day.toString() }));
}

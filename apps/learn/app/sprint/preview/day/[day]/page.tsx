import { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { LessonPage } from "@/components/LessonPage";

interface PageProps {
  params: Promise<{ day: string }>;
}

// Only days 0 and 1 are available in preview
const PREVIEW_DAYS = [0, 1];

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { day } = await params;
  const dayNum = parseInt(day);

  if (!PREVIEW_DAYS.includes(dayNum)) {
    return {
      title: "Day Not Found",
    };
  }

  const titles: Record<number, string> = {
    0: "Day 0: Setup + Project Selection",
    1: "Day 1: Scope + First Build",
  };

  return {
    title: titles[dayNum] || `Day ${dayNum}`,
    description: `7-Day Sprint - ${titles[dayNum]}. Free preview lesson.`,
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

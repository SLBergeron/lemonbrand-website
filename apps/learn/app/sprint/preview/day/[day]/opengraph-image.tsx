import { generateOgImage, ogImageSize, ogImageContentType } from "@/lib/og-image";

export const runtime = "edge";
export const alt = "7-Day Sprint Free Preview";
export const size = ogImageSize;
export const contentType = ogImageContentType;

const DAY_CONTENT: Record<number, { title: string; subtitle: string }> = {
  0: {
    title: "Day 0: Setup + Project",
    subtitle: "Install Claude Code, pick your project, create your CLAUDE.md",
  },
  1: {
    title: "Day 1: Scope + First Build",
    subtitle: "Narrow scope, describe your MVP, get working code",
  },
};

export default async function Image({ params }: { params: Promise<{ day: string }> }) {
  const { day } = await params;
  const dayNum = parseInt(day);
  const content = DAY_CONTENT[dayNum] || { title: `Day ${day}`, subtitle: "7-Day Sprint" };

  return generateOgImage({
    title: content.title,
    subtitle: content.subtitle,
    badge: "Free Preview",
  });
}

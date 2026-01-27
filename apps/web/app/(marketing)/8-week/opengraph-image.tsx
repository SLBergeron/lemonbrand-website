import { generateOgImage, ogImageSize, ogImageContentType } from "@/lib/og-image";

export const runtime = "edge";
export const alt = "8-Week Program - Production AI Mastery";
export const size = ogImageSize;
export const contentType = ogImageContentType;

export default async function Image() {
  return generateOgImage({
    title: "8-Week Mastery",
    subtitle: "Build the skill permanently",
  });
}

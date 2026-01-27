import { generateOgImage, ogImageSize, ogImageContentType } from "@/lib/og-image";

export const runtime = "edge";
export const alt = "Build Stack Starter Kit - Free Template";
export const size = ogImageSize;
export const contentType = ogImageContentType;

export default async function Image() {
  return generateOgImage({
    title: "Starter Kit",
    subtitle: "Free CLAUDE.md template",
  });
}

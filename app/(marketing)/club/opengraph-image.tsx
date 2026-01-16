import { generateOgImage, ogImageSize, ogImageContentType } from "@/lib/og-image";

export const runtime = "edge";
export const alt = "AI Builders Club - Keep Building";
export const size = ogImageSize;
export const contentType = ogImageContentType;

export default async function Image() {
  return generateOgImage({
    title: "Builders Club",
    subtitle: "Stay sharp with monthly challenges",
  });
}

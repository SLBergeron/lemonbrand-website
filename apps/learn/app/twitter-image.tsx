import { generateOgImage, ogImageSize, ogImageContentType } from "@/lib/og-image";

export const runtime = "edge";
export const alt = "LemonBrand Learn - Build AI Tools Without Coding";
export const size = ogImageSize;
export const contentType = ogImageContentType;

export default async function Image() {
  return generateOgImage({
    title: "Build AI Tools",
    subtitle: "Without being a developer",
    badge: "LemonBrand Learn",
  });
}

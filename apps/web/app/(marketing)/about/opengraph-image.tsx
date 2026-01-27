import { generateOgImage, ogImageSize, ogImageContentType } from "@/lib/og-image";

export const runtime = "edge";
export const alt = "About Simon Bergeron - LemonBrand";
export const size = ogImageSize;
export const contentType = ogImageContentType;

export default async function Image() {
  return generateOgImage({
    title: "About Simon",
    subtitle: "Teaching non-developers to build with AI",
  });
}

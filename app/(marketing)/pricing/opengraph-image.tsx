import { generateOgImage, ogImageSize, ogImageContentType } from "@/lib/og-image";

export const runtime = "edge";
export const alt = "Pricing - LemonBrand Programs";
export const size = ogImageSize;
export const contentType = ogImageContentType;

export default async function Image() {
  return generateOgImage({
    title: "Pricing",
    subtitle: "Choose your path to building",
  });
}

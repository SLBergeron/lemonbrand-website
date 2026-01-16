import { generateOgImage, ogImageSize, ogImageContentType } from "@/lib/og-image";

export const runtime = "edge";
export const alt = "7-Day Sprint - Build Your First AI Tool";
export const size = ogImageSize;
export const contentType = ogImageContentType;

export default async function Image() {
  return generateOgImage({
    title: "7-Day Sprint",
    subtitle: "Build your first AI tool in a week",
  });
}

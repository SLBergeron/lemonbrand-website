import { generateOgImage, ogImageSize, ogImageContentType } from "@/lib/og-image";

export const runtime = "edge";
export const alt = "LemonBrand - Ship AI Tools Fast";
export const size = ogImageSize;
export const contentType = ogImageContentType;

export default async function Image() {
  return generateOgImage({
    title: "Ship AI Tools Fast",
    subtitle: "Without being a developer",
  });
}

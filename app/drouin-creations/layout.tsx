import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services & Pricing - Drouin Creations Partnership | Lemon Brand",
  description:
    "Transparent pricing on websites, branding, and automation systems for Drouin Creations clients. Calculate website costs instantly. 25% special discount. All prices in CAD.",
  keywords: [
    "web design pricing",
    "website development cost",
    "branding services",
    "AI automation",
    "Drouin Creations",
    "Lemon Brand",
    "Quebec web design",
    "Canadian web development",
  ],
  openGraph: {
    title: "Services & Pricing - Drouin Creations Partnership | Lemon Brand",
    description:
      "Transparent pricing on websites, branding, and automation systems for Drouin Creations clients. Calculate website costs instantly.",
    type: "website",
  },
};

export default function DrouinCreationsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

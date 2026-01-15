import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lead Capture System Proposal | Edison Motors",
  description:
    "A dedicated lead capture system for Edison Motors - turn 1.2M followers into qualified buyers.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function EdisonLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

import { Metadata } from "next";
import LearnContent from "./learn-content";

export const metadata: Metadata = {
  title: "Learn to Build with AI | Lemonbrand",
  description:
    "Compare our learning programs: 7-Day Sprint, 8-Week Program, and Builders Club. Find the right path to build your own tools with AI.",
  openGraph: {
    title: "Learn to Build with AI | Lemonbrand",
    description:
      "Compare our learning programs: 7-Day Sprint, 8-Week Program, and Builders Club. Find the right path to build your own tools with AI.",
    type: "website",
  },
};

export default function LearnPage() {
  return <LearnContent />;
}

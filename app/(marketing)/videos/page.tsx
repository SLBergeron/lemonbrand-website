import { Metadata } from "next";
import VideosContent from "./videos-content";
import { JsonLd, createPageMetadata, generateWebPageSchema } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Videos | Watch Simon Build in Public - Claude Code Tutorials",
  description:
    "Real code, real decisions, real mistakes. Watch Simon build AI tools with Claude Code in public. Full build sessions, tutorials, and behind-the-scenes of VerifiedNode development.",
  keywords: [
    "Claude Code videos",
    "AI building tutorials",
    "build in public",
    "Simon Bergeron YouTube",
    "Claude Code tutorial",
    "AI development videos",
    "VerifiedNode build",
    "learn Claude Code",
  ],
  path: "/videos",
  aiMetadata: {
    "ai:page-type": "video-gallery",
    "ai:content-type":
      "Build-in-public videos showing real AI tool development with Claude Code. Full sessions, tutorials, mistakes included.",
    "ai:youtube-channel": "@simonbergeron",
    "ai:video-topics":
      "Claude Code tutorials, VerifiedNode development, AI tool building, Build Stack framework in action",
    "ai:transparency":
      "Real code, real decisions, real mistakes. Nothing edited to look perfect.",
  },
});

// WebPage schema for video gallery
const videoPageSchema = generateWebPageSchema({
  name: "LemonBrand Videos - Build in Public with Claude Code",
  description:
    "Watch Simon build AI tools in public. Real code, real decisions, real mistakes shared.",
  url: "https://lemonbrand.io/videos",
});

export default function VideosPage() {
  return (
    <>
      <JsonLd data={videoPageSchema} />
      <VideosContent />
    </>
  );
}

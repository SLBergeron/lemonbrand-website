"use client";

import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Code, ExternalLink, Youtube, Github } from "lucide-react";
import { SOCIAL_LINKS } from "@/constants/links";
import { Section } from "@/components/shared/Section";
import { FeatureCard } from "@/components/shared/FeatureCard";
import { CallToAction } from "@/components/shared/CallToAction";

// Since this is a client component we can't export metadata directly
// But for now we keep the structure simple. The metadata would usually go in a layout or page.tsx (server component).
// Since this is a simple refactor of an existing file which was already "use client", we keep it as is.
// Note: Next.js App Router ignores metadata exports in client components.
// To fix this properly, this content should be split, but I will stick to the visual refactor as requested.

const projects = [
  {
    name: "GetMyWebsite.io",
    description:
      "Productized website service for trades. AI-powered quote generation, automated client communication, built entirely with Claude Code.",
    status: "Building in Public",
    link: "https://getmywebsite.io",
  },
  {
    name: "CodeBrain",
    description:
      "AI development tools for building better prompts and workflows. Modular components that plug into any stack.",
    status: "Active Development",
    link: null,
  },
  {
    name: "Agent Modules",
    description:
      "Reusable AI components for common workflows: content generation, data processing, document analysis.",
    status: "Open Source",
    link: SOCIAL_LINKS.GITHUB,
  },
];

const values = [
  {
    title: "Ship First, Optimize Later",
    description:
      "A working system today beats a perfect system next quarter. We iterate on live, not in theory.",
  },
  {
    title: "Production or Nothing",
    description:
      "POCs and demos don't count. If it's not running in production, making real decisions, it's not done.",
  },
  {
    title: "Show the Work",
    description:
      "Real code, real metrics, real failures. Transparent about what works and what doesn't.",
  },
  {
    title: "Fifth-Grade English",
    description:
      "No jargon. No buzzwords. If you can't explain it simply, you don't understand it well enough.",
  },
];

export default function AboutContent() {
  return (
    <main className="pt-16">
      {/* Hero */}
      <Section className="py-24 sm:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
           {/* Left Column */}
           <div className="max-w-2xl">
              <p className="text-sm font-medium tracking-wider uppercase text-accent mb-6">
                About Me
              </p>
              <h1 className="font-display text-4xl sm:text-5xl font-semibold tracking-tight mb-6">
                I teach non-developers to build with AI
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                I&apos;m Simon Bergeron. I&apos;m not a developer—I&apos;m a project manager
                who taught himself to build production tools with Claude Code.
                Now I teach that skill to others.
              </p>
              <div className="flex gap-4">
                <Button variant="outline" size="sm" asChild>
                  <Link href={SOCIAL_LINKS.YOUTUBE} target="_blank" rel="noopener noreferrer">
                    <Youtube className="w-4 h-4 mr-2" />
                    YouTube
                  </Link>
                </Button>
                <Button variant="outline" size="sm" asChild>
                  <Link href={SOCIAL_LINKS.GITHUB} target="_blank" rel="noopener noreferrer">
                    <Github className="w-4 h-4 mr-2" />
                    GitHub
                  </Link>
                </Button>
              </div>
           </div>
           
           {/* Right Column - Video */}
           <div className="hidden lg:flex justify-center">
              <div className="relative w-full max-w-lg">
                 {/* Drop shadow */}
                 <div
                    className="absolute inset-0 rounded-sm bg-black/50 dark:bg-black/70"
                    style={{
                       transform: 'translate(8px, 8px)',
                       filter: 'blur(16px)',
                    }}
                 />
                 {/* Video */}
                 <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="relative w-full h-auto block rounded-sm"
                 >
                    <source src="/assets/Build-with-cursor.mp4" type="video/mp4" />
                 </video>
              </div>
           </div>
        </div>
      </Section>

      {/* Story */}
      <section className="py-20 px-4 bg-muted/30 border-y border-border/50">
        <Section className="py-0 px-0">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-display text-2xl sm:text-3xl font-semibold tracking-tight mb-8">
              The short version
            </h2>
            <div className="space-y-6 text-muted-foreground leading-relaxed">
              <p>
                I&apos;m not a developer. I&apos;ve been in the startup ecosystem for 13 years—
                project management, automation, sales, building websites. Self-taught everything.
              </p>
              <p>
                When Claude Code came out, I was frustrated like everyone else. Asked it to
                build something, got code I didn&apos;t understand, couldn&apos;t make it work.
                Closed the laptop thinking &quot;this isn&apos;t for people like me.&quot;
              </p>
              <p>
                Then I figured out the actual skill: it&apos;s not coding. It&apos;s communication.
                Knowing what you want. Expressing it clearly. Iterating when the first version isn&apos;t right.
              </p>
              <p>
                Now I teach that skill. Because if I can build production tools without a
                CS degree, so can you.
              </p>
            </div>
          </div>
        </Section>
      </section>

      {/* Projects */}
      <Section width="wide">
          <div className="max-w-3xl mb-12">
            <h2 className="font-display text-2xl sm:text-3xl font-semibold tracking-tight mb-4">
              What I&apos;m building
            </h2>
            <p className="text-muted-foreground">
              I build in public. Everything I ship, you can watch me build on YouTube.
              Real code, real decisions, real mistakes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {projects.map((project) => (
              <FeatureCard key={project.name} className="bg-card">
                <div className="p-4 flex flex-col h-full">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                      <Code className="w-5 h-5 text-accent" />
                    </div>
                    <span className="text-xs font-medium text-muted-foreground px-2 py-1 bg-muted rounded">
                      {project.status}
                    </span>
                  </div>
                  <h3 className="font-display font-semibold text-lg mb-2">
                    {project.name}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4 leading-relaxed flex-1">
                    {project.description}
                  </p>
                  {project.link && (
                    <Link
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-sm font-medium text-accent hover:underline mt-auto"
                    >
                      View project
                      <ExternalLink className="w-3 h-3 ml-1" />
                    </Link>
                  )}
                </div>
              </FeatureCard>
            ))}
          </div>
      </Section>

      {/* Values */}
      <section className="py-20 px-4 bg-muted/30 border-y border-border/50">
        <Section className="py-0 px-0">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-display text-2xl sm:text-3xl font-semibold tracking-tight mb-12 text-center">
              How I work
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {values.map((value) => (
                <div key={value.title}>
                  <h3 className="font-display font-semibold text-lg mb-2">
                    {value.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Section>
      </section>

      {/* CTA */}
      <Section>
        <CallToAction
          title="Ready to build something?"
          description="The 7-Day Sprint teaches you to build your first tool with Claude Code. No coding background needed—just the ability to explain what you want."
          primaryCtaText="Learn about the Sprint"
          primaryCtaLink="/sprint"
          secondaryCtaText="Watch me build"
          secondaryCtaLink="/videos"
          className="max-w-4xl mx-auto"
        />
      </Section>
    </main>
  );
}

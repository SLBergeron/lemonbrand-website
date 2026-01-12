"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import MinimalVideoGrid from "@/components/MinimalVideoGrid";
import { ArrowRight, Youtube } from "lucide-react";
import { SOCIAL_LINKS } from "@/constants/links";
import { Section } from "@/components/shared/Section";
import { FeatureCard } from "@/components/shared/FeatureCard";
import { CallToAction } from "@/components/shared/CallToAction";

export default function VideosPage() {
  return (
    <main className="pt-16">
      {/* Hero */}
      <Section className="py-24 sm:py-32">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-sm font-medium tracking-wider uppercase text-accent mb-6">
            Videos
          </p>
          <h1 className="font-display text-4xl sm:text-5xl font-semibold tracking-tight mb-6">
            Watch me build in public
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed mb-8">
            Real code, real decisions, real mistakes. I share everything I&apos;m
            building — from AI systems to full products.
          </p>
          <Button variant="accent" size="lg" asChild>
            <a
              href={SOCIAL_LINKS.YOUTUBE}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Youtube className="w-4 h-4 mr-2" />
              Subscribe on YouTube
            </a>
          </Button>
        </div>
      </Section>

      {/* Featured Video - Latest */}
      <section className="py-12 px-4 bg-muted/30 border-y border-border/50">
        <Section className="py-0 px-0" width="wide">
          <div className="max-w-5xl mx-auto">
            <h2 className="font-display text-xl font-semibold mb-6 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              Latest Video
            </h2>
            <div className="aspect-video rounded-xl overflow-hidden bg-card shadow-premium-md border border-border/50">
              <MinimalVideoGrid maxVideos={1} showTitle={false} />
            </div>
          </div>
        </Section>
      </section>

      {/* Video Grid */}
      <Section width="wide">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <h2 className="font-display text-xl font-semibold">
                Recent Videos
              </h2>
              <a
                href={SOCIAL_LINKS.YOUTUBE}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1 group"
              >
                See all on YouTube 
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
            <MinimalVideoGrid maxVideos={9} />
          </div>
      </Section>

      {/* Categories */}
      <section className="py-20 px-4 bg-muted/30 border-y border-border/50">
        <Section className="py-0 px-0">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-display text-2xl font-semibold mb-12 text-center">
              What I cover
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              <FeatureCard className="bg-card h-full">
                <div className="p-4 flex flex-col h-full">
                  <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4 text-2xl">
                    🛠️
                  </div>
                  <h3 className="font-display font-semibold text-lg mb-2">
                    Build Sessions
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Watch me build real products from scratch. Unedited, unscripted,
                    real development.
                  </p>
                </div>
              </FeatureCard>

              <FeatureCard className="bg-card h-full">
                <div className="p-4 flex flex-col h-full">
                  <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4 text-2xl">
                    🤖
                  </div>
                  <h3 className="font-display font-semibold text-lg mb-2">
                    AI Workflows
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    How I use AI tools in my daily work. Practical tips, not theory.
                  </p>
                </div>
              </FeatureCard>

              <FeatureCard className="bg-card h-full">
                <div className="p-4 flex flex-col h-full">
                  <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4 text-2xl">
                    📊
                  </div>
                  <h3 className="font-display font-semibold text-lg mb-2">
                    Business Updates
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Revenue, metrics, wins and failures. Full transparency on what&apos;s
                    working.
                  </p>
                </div>
              </FeatureCard>
            </div>
          </div>
        </Section>
      </section>

      {/* CTA */}
      <Section>
        <CallToAction
          title="Want the systems I build?"
          description="I don't just show you how to build — I can build it for your team. Production AI systems in days, not months."
          primaryCtaText="See Pricing"
          primaryCtaLink="/pricing"
          className="max-w-4xl mx-auto"
        />
      </Section>
    </main>
  );
}

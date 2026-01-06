"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { motion } from "framer-motion";
import NewsletterForm from "@/components/NewsletterForm";
import MinimalVideoGrid from "@/components/MinimalVideoGrid";
import MinimalTemplateList from "@/components/MinimalTemplateList";
import { ConvexProvider, ConvexReactClient } from "convex/react";
import { ArrowRight } from "lucide-react";
import { SOCIAL_LINKS } from "@/constants/links";

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

// Staggered animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 20, filter: "blur(4px)" },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

function SubscriptionStatus() {
  const searchParams = useSearchParams();
  const subscribed = searchParams.get("subscribed");
  const unsubscribed = searchParams.get("unsubscribed");
  const error = searchParams.get("error");

  if (subscribed) {
    return (
      <div className="fixed bottom-4 right-4 bg-foreground text-background px-4 py-2 text-sm rounded-sm shadow-lg">
        You&apos;re subscribed. Check your email.
      </div>
    );
  }

  if (unsubscribed) {
    return (
      <div className="fixed bottom-4 right-4 bg-foreground text-background px-4 py-2 text-sm rounded-sm shadow-lg">
        You&apos;ve been unsubscribed.
      </div>
    );
  }

  if (error) {
    return (
      <div className="fixed bottom-4 right-4 bg-destructive text-white px-4 py-2 text-sm rounded-sm shadow-lg">
        Something went wrong. Please try again.
      </div>
    );
  }

  return null;
}

export default function Home() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        name: "Simon Bergeron",
        url: "https://lemonbrand.io",
        jobTitle: "AI Entrepreneur & Developer",
        description:
          "Building AI automation systems in public. Creator of templates and tools for developers and entrepreneurs.",
        sameAs: [
          SOCIAL_LINKS.TWITTER,
          SOCIAL_LINKS.GITHUB,
          SOCIAL_LINKS.YOUTUBE,
          SOCIAL_LINKS.TIKTOK,
        ],
      },
      {
        "@type": "WebSite",
        name: "Simon Bergeron",
        url: "https://lemonbrand.io",
        description:
          "AI automation templates, tools, and consulting for developers and entrepreneurs.",
        author: {
          "@type": "Person",
          name: "Simon Bergeron",
        },
        inLanguage: "en",
      },
    ],
  };

  return (
    <ConvexProvider client={convex}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <main className="pt-16">
        {/* Hero Section - Conversion Focused */}
        <section className="py-24 sm:py-32 lg:py-40 px-4">
          <div className="max-w-4xl mx-auto">
            {/* Eyebrow */}
            <motion.p
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              custom={0}
              className="text-sm font-medium tracking-wider uppercase text-accent mb-6"
            >
              Building AI businesses in public since 2024
            </motion.p>

            {/* Headline */}
            <motion.h1
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              custom={1}
              className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-tight mb-6"
            >
              Steal My AI Business Templates
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              custom={2}
              className="text-lg sm:text-xl text-muted-foreground mb-10 max-w-2xl leading-relaxed"
            >
              I build and document every AI system I create. Get the templates,
              code, and frameworks for free.
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              custom={3}
              className="flex flex-col sm:flex-row gap-4 mb-12"
            >
              <Link
                href="/templates"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-accent text-accent-foreground text-sm font-medium rounded-sm shadow-[0_2px_0_0_rgba(0,0,0,0.1),inset_0_1px_0_0_rgba(255,255,255,0.1)] hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(200,140,30,0.3)] transition-all duration-200"
              >
                Get Free Templates
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/projects"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                See what I&apos;m building
              </Link>
            </motion.div>

            {/* Social Proof */}
            <motion.p
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              custom={4}
              className="text-sm text-muted-foreground"
            >
              <span className="inline-flex items-center gap-2">
                <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
                127+ YouTube subscribers
              </span>
              <span className="mx-3 text-border">|</span>
              <span>50+ newsletter readers</span>
            </motion.p>
          </div>
        </section>

        {/* Template Value Proposition */}
        <section className="py-20 px-4 border-t border-border/50 bg-muted/30">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-display text-2xl sm:text-3xl font-semibold tracking-tight mb-4">
                What You&apos;ll Get
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Real systems I use to build AI businesses. Not theory — working code and frameworks.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Process Templates */}
              <div className="bg-card border border-border/50 rounded-lg p-6 shadow-premium-sm hover:shadow-premium-md transition-all duration-300 hover:-translate-y-1">
                <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-accent text-lg">📋</span>
                </div>
                <h3 className="font-display font-semibold text-lg mb-2">Process Templates</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Launch frameworks I actually use. From 48-hour website systems to content pipelines.
                </p>
                <Link
                  href="/templates?category=process"
                  className="text-sm font-medium text-accent hover:underline"
                >
                  See process templates →
                </Link>
              </div>

              {/* Code Templates */}
              <div className="bg-card border border-border/50 rounded-lg p-6 shadow-premium-sm hover:shadow-premium-md transition-all duration-300 hover:-translate-y-1">
                <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-accent text-lg">💻</span>
                </div>
                <h3 className="font-display font-semibold text-lg mb-2">Code Templates</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Copy-paste components. Quote builders, calculators, and deployment guides.
                </p>
                <Link
                  href="/templates?category=code"
                  className="text-sm font-medium text-accent hover:underline"
                >
                  See code templates →
                </Link>
              </div>

              {/* AI Systems */}
              <div className="bg-card border border-border/50 rounded-lg p-6 shadow-premium-sm hover:shadow-premium-md transition-all duration-300 hover:-translate-y-1">
                <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-accent text-lg">🤖</span>
                </div>
                <h3 className="font-display font-semibold text-lg mb-2">AI Systems</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Working AI implementations. Claude Code guides, agent architectures, automation workflows.
                </p>
                <Link
                  href="/templates?category=ai"
                  className="text-sm font-medium text-accent hover:underline"
                >
                  See AI templates →
                </Link>
              </div>
            </div>

            <div className="text-center mt-10">
              <Link
                href="/templates"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground text-sm font-medium rounded-sm shadow-[0_2px_0_0_rgba(0,0,0,0.08)] hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(0,0,0,0.15)] transition-all duration-200"
              >
                Get All Templates Free
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* Latest Videos - Reframed */}
        <section className="py-20 px-4 border-t border-border/50">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-end justify-between mb-8">
              <div>
                <h2 className="font-display text-2xl font-semibold tracking-tight mb-2">
                  Recent Builds
                </h2>
                <p className="text-muted-foreground text-sm">
                  Raw, unedited sessions. Watch me build (and break) things.
                </p>
              </div>
              <Link
                href={SOCIAL_LINKS.YOUTUBE}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors hidden sm:block"
              >
                See all on YouTube →
              </Link>
            </div>
            <MinimalVideoGrid maxVideos={3} />
            <div className="mt-8 text-center">
              <p className="text-muted-foreground text-sm mb-4">
                Want the systems, not just the videos?
              </p>
              <Link
                href="/templates"
                className="text-sm font-medium text-accent hover:underline"
              >
                Get the templates →
              </Link>
            </div>
          </div>
        </section>

        {/* Templates Preview */}
        <section className="py-20 px-4 border-t border-border/50">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-end justify-between mb-8">
              <div>
                <h2 className="font-display text-2xl font-semibold tracking-tight mb-2">
                  Templates
                </h2>
                <p className="text-muted-foreground text-sm">
                  Enter your email once, access everything forever. New templates added monthly.
                </p>
              </div>
              <Link
                href="/templates"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors hidden sm:block"
              >
                See all →
              </Link>
            </div>
            <MinimalTemplateList />
          </div>
        </section>

        {/* Newsletter - Fascinations Based */}
        <section className="py-24 px-4 border-t border-border/50 bg-muted/30">
          <div className="max-w-xl mx-auto text-center">
            <h2 className="font-display text-2xl sm:text-3xl font-semibold tracking-tight mb-4">
              Every Monday: What Actually Worked
            </h2>
            <ul className="text-muted-foreground text-left max-w-sm mx-auto mb-8 space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-accent mt-0.5">→</span>
                What I shipped this week
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent mt-0.5">→</span>
                Revenue numbers (the real ones)
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent mt-0.5">→</span>
                New templates and code drops
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent mt-0.5">→</span>
                Mistakes I made so you don&apos;t have to
              </li>
            </ul>
            <NewsletterForm
              source="homepage"
              placeholder="your@email.com"
              buttonText="Join 50+ builders"
              className="justify-center"
            />
            <p className="text-xs text-muted-foreground mt-4">
              One email per week. Unsubscribe anytime. No spam.
            </p>
          </div>
        </section>

        {/* About with Conversion Bridge */}
        <section className="py-20 px-4 border-t border-border/50">
          <div className="max-w-2xl mx-auto">
            <p className="font-display text-xl sm:text-2xl leading-relaxed mb-8">
              I&apos;m an AI entrepreneur from Canada building automation tools in public.
              I share everything — the templates, the code, the wins and the failures.
            </p>

            {/* Conversion Bridge */}
            <div className="border-t border-border/50 pt-8 mt-8">
              <p className="font-display text-lg font-semibold mb-6">Ready to build?</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Link
                  href="/templates"
                  className="block p-4 border border-border rounded-lg hover:border-accent hover:bg-accent/5 transition-all group"
                >
                  <p className="font-medium mb-1 group-hover:text-accent transition-colors">
                    Start with templates
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Free access to everything I use
                  </p>
                </Link>
                <Link
                  href="/work-with-me"
                  className="block p-4 border border-border rounded-lg hover:border-foreground hover:bg-muted/50 transition-all"
                >
                  <p className="font-medium mb-1">Work together</p>
                  <p className="text-sm text-muted-foreground">
                    Train your team on AI
                  </p>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Subscription Status Toast */}
        <Suspense fallback={null}>
          <SubscriptionStatus />
        </Suspense>
      </main>
    </ConvexProvider>
  );
}

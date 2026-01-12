"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import NewsletterForm from "@/components/NewsletterForm";
import { Button } from "@/components/ui/button";
import { ClaudeMdPreview } from "@/components/code-mockup";
import { DotGridBackground } from "@/components/dot-grid-background";
import { ArrowRight, FileText, Settings, FolderTree, CheckCircle, AlertCircle } from "lucide-react";
import { Section } from "@/components/shared/Section";
import { FeatureCard } from "@/components/shared/FeatureCard";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

// Template sections
const templateSections = [
  {
    icon: FileText,
    title: "Project Overview",
    description: "What are you building? What's the goal?",
  },
  {
    icon: Settings,
    title: "Technical Preferences",
    description: "Languages, frameworks, coding style.",
  },
  {
    icon: CheckCircle,
    title: "Current State",
    description: "What exists already? What's working?",
  },
  {
    icon: AlertCircle,
    title: "Constraints",
    description: "Time limits, technical limitations, must-haves.",
  },
  {
    icon: FolderTree,
    title: "File Structure",
    description: "Where things live in your project.",
  },
  {
    icon: FileText,
    title: "Decisions Made",
    description: "Choices you've made and why.",
  },
];

// Testimonials
const testimonials = [
  {
    quote: "I was copy-pasting the same context into every conversation. This template organized it all in one place. Game changer.",
    name: "David M.",
    role: "Operations Manager",
  },
  {
    quote: "Finally stopped getting generic code suggestions. Claude actually knows what my project is now.",
    name: "Lisa T.",
    role: "Nurse practitioner building a patient tracker",
  },
  {
    quote: "15 minutes to fill out. Already saved me hours.",
    name: "Tom R.",
    role: "Real Estate Agent",
  },
];

// Not for you items
const notForYouItems = [
  {
    title: "You want a finished app delivered to you",
    description: "This teaches you to build, not builds for you",
  },
  {
    title: "You're not willing to experiment",
    description: "AI building requires iteration",
  },
  {
    title: "You expect magic from a template alone",
    description: "The template helps. The Sprint teaches the full skill.",
  },
];

// Email sequence
const emailSequence = [
  "The template + quick start instructions",
  "How to use the context file effectively",
  "Common mistakes people make (and how to avoid them)",
  "What to build first",
  "An invitation to the Sprint (if you want to go deeper)",
];

export default function FreeCLAUDEmdPage() {
  return (
    <main className="pt-16">
      {/* Hero */}
      <DotGridBackground fade="bottom" containerClassName="py-24 sm:py-32 px-4">
        <Section className="py-0 px-0" width="wide">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Text content */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              className="space-y-6 text-center lg:text-left"
            >
              <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight">
                Get my actual CLAUDE.md file.
              </h1>

              <p className="text-lg text-muted-foreground leading-relaxed">
                This is the exact file I created after realizing why my first 10 projects with Claude failed.
              </p>

              <p className="text-lg text-muted-foreground leading-relaxed">
                The context file that makes Claude remember your preferences, your project, your constraints.
              </p>

              <div className="pt-4">
                <NewsletterForm
                  source="claudemd-template"
                  placeholder="your@email.com"
                  buttonText="Get the Template"
                  className="justify-center lg:justify-start max-w-md mx-auto lg:mx-0"
                />
                <p className="text-xs text-muted-foreground mt-3">
                  No spam. Just the template + a few follow-up emails showing you how to use it.
                </p>
              </div>
            </motion.div>

            {/* Right: Code preview */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="hidden lg:block"
            >
              <ClaudeMdPreview className="shadow-2xl" />
            </motion.div>
          </div>

          {/* Mobile code preview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="lg:hidden mt-12"
          >
            <ClaudeMdPreview className="shadow-xl max-w-md mx-auto" />
          </motion.div>
        </Section>
      </DotGridBackground>

      {/* Section 1: Why This Matters */}
      <section className="py-20 px-4 bg-muted/30 border-y border-border/50">
        <Section className="py-0 px-0">
          <div className="space-y-6 max-w-3xl mx-auto">
            <h2 className="font-display text-2xl sm:text-3xl font-semibold text-center mb-8">
              Why This Matters
            </h2>

            <div className="space-y-4 text-muted-foreground">
              <p>Most people talk to AI like a search engine.</p>
              <p className="font-mono text-foreground bg-muted/50 px-4 py-2 rounded">
                &quot;Build me an app that tracks recipes.&quot;
              </p>
              <p>And they get generic results.</p>
              <p>
                That&apos;s because Claude starts every conversation from zero. It doesn&apos;t know your project. It doesn&apos;t know your preferences. It doesn&apos;t know what you&apos;ve already built.
              </p>
              <p className="text-foreground font-medium pt-2">
                The CLAUDE.md file changes that.
              </p>
              <p>It gives Claude context about:</p>
              <ul className="space-y-1 pl-4">
                <li>• What you&apos;re building</li>
                <li>• How you want things done</li>
                <li>• What you&apos;ve already established</li>
                <li>• Your constraints and preferences</li>
              </ul>
              <p className="pt-2">
                With a context file, every conversation picks up where the last one left off.
              </p>
            </div>
          </div>
        </Section>
      </section>

      {/* Section 2: What's In The Template */}
      <Section width="wide">
          <div className="space-y-8 max-w-4xl mx-auto">
            <div className="text-center space-y-4">
              <h2 className="font-display text-2xl sm:text-3xl font-semibold">
                What&apos;s In The Template
              </h2>
              <p className="text-muted-foreground">
                The template I&apos;ll send you is the same structure I use for every project.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {templateSections.map((section, i) => {
                const Icon = section.icon;
                return (
                  <FeatureCard key={i} className="bg-card">
                    <div className="p-4 relative z-10 h-full flex flex-col">
                      <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center mb-3 flex-shrink-0">
                        <Icon className="w-5 h-5 text-accent" />
                      </div>
                      <h3 className="font-semibold mb-1">{section.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{section.description}</p>
                    </div>
                  </FeatureCard>
                );
              })}
            </div>

            <p className="text-center text-muted-foreground pt-4">
              You can fill it out in 15 minutes. It&apos;ll save you hours of re-explaining.
            </p>
          </div>
      </Section>

      {/* Section 2.5: Testimonials */}
      <section className="py-20 px-4 bg-muted/30 border-y border-border/50">
        <Section className="py-0 px-0" width="wide">
          <div className="space-y-8 max-w-4xl mx-auto">
            <h2 className="font-display text-2xl sm:text-3xl font-semibold text-center">
              What People Say
            </h2>

            <motion.div
              className="grid md:grid-cols-3 gap-6"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              {testimonials.map((testimonial, i) => (
                <motion.div
                  key={i}
                  variants={fadeInUp}
                  className="bg-card border border-border/50 rounded-lg p-6 transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 hover:border-accent/30"
                >
                  <p className="text-muted-foreground mb-4 italic">
                    &quot;{testimonial.quote}&quot;
                  </p>
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </Section>
      </section>

      {/* Section 2.6: Not For You */}
      <Section>
          <div className="space-y-8 max-w-3xl mx-auto">
            <h2 className="font-display text-2xl sm:text-3xl font-semibold text-center">
              This Is NOT For You If
            </h2>

            <div className="space-y-4">
              {notForYouItems.map((item, i) => (
                <div key={i} className="flex items-start gap-4 p-4 bg-muted/30 rounded-lg">
                  <div className="w-6 h-6 bg-destructive/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-destructive text-sm">✕</span>
                  </div>
                  <div>
                    <p className="font-medium">{item.title}</p>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <p className="text-center text-muted-foreground pt-4">
              Still here? Get the template.
            </p>
          </div>
      </Section>

      {/* Section 3: What Happens After */}
      <section className="py-20 px-4 bg-muted/30 border-y border-border/50">
        <Section className="py-0 px-0">
          <div className="space-y-8 max-w-3xl mx-auto">
            <h2 className="font-display text-2xl sm:text-3xl font-semibold text-center">
              What Happens After
            </h2>

            <div className="space-y-3">
              {emailSequence.map((email, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-semibold text-accent">{i + 1}</span>
                  </div>
                  <p className="text-muted-foreground pt-1">{email}</p>
                </div>
              ))}
            </div>

            <p className="text-center text-muted-foreground pt-4">
              That&apos;s it. No endless sequences. No daily emails. Just useful stuff.
              <br />
              <span className="text-sm">Unsubscribe anytime.</span>
            </p>
          </div>
        </Section>
      </section>

      {/* Section 4: Form Repeated */}
      <Section>
        <div className="max-w-xl mx-auto text-center">
          <div className="space-y-6">
            <h2 className="font-display text-2xl sm:text-3xl font-semibold">
              Get the Template
            </h2>

            <NewsletterForm
              source="claudemd-template"
              placeholder="your@email.com"
              buttonText="Get the Template"
              className="justify-center"
            />

            <p className="text-sm text-muted-foreground">
              Instant delivery. Check your inbox.
            </p>
          </div>
        </div>
      </Section>

      {/* Section 5: Soft CTA */}
      <section className="py-20 px-4 bg-primary text-primary-foreground">
        <Section className="py-0 px-0">
          <div className="space-y-6 text-center max-w-3xl mx-auto">
            <h2 className="font-display text-2xl sm:text-3xl font-semibold">
              Ready to go deeper?
            </h2>

            <p className="text-primary-foreground/80 text-lg">
              The 7-Day Sprint teaches you the full system—not just the template, but the communication patterns that make AI actually build what you want.
            </p>

            <Button variant="accent" size="lg" asChild>
              <Link href="/sprint">
                Learn About the Sprint
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>

            <p className="text-sm text-primary-foreground/60">
              $297. Complete all 7 days and it becomes credit toward the 8-Week program.
            </p>
          </div>
        </Section>
      </section>
    </main>
  );
}
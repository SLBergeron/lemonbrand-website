"use client";

import { useState } from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { ConvexProvider, ConvexReactClient } from "convex/react";
import { motion } from "framer-motion";
import TemplateCard, { Template } from "@/components/TemplateCard";
import TemplateAccessModal from "@/components/TemplateAccessModal";
import NewsletterForm from "@/components/NewsletterForm";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

type Category = "all" | "process" | "code" | "ai";

const categoryConfig: Record<Category, { label: string; description: string }> = {
  all: {
    label: "All Templates",
    description: "Everything I've built and documented",
  },
  process: {
    label: "Process",
    description: "Workflows and systems for getting things done",
  },
  code: {
    label: "Code",
    description: "Working applications you can clone and customize",
  },
  ai: {
    label: "AI",
    description: "Prompts, guides, and AI-powered workflows",
  },
};

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

function TemplatesContent() {
  const templates = useQuery(api.templates.list) as Template[] | undefined;
  const [selectedCategory, setSelectedCategory] = useState<Category>("all");
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const categories: Category[] = ["all", "process", "code", "ai"];

  const filteredTemplates =
    selectedCategory === "all"
      ? templates
      : templates?.filter((t) => t.category === selectedCategory);

  const handleSelectTemplate = (template: Template) => {
    setSelectedTemplate(template);
    setIsModalOpen(true);
  };

  return (
    <main className="pt-14 min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-16 sm:py-20 px-4 border-b border-border/50">
        <div className="max-w-5xl mx-auto">
          <motion.p
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            custom={0}
            className="text-sm font-medium tracking-wider uppercase text-accent mb-4"
          >
            Free Resources
          </motion.p>
          <motion.h1
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            custom={1}
            className="font-display text-4xl sm:text-5xl font-light tracking-tight mb-4"
          >
            Templates & Tools
          </motion.h1>
          <motion.p
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            custom={2}
            className="text-lg text-muted-foreground max-w-2xl"
          >
            Real systems I use to build AI businesses. Not theory — working code,
            processes, and frameworks you can use today.
          </motion.p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="sticky top-14 z-40 bg-background/95 backdrop-blur-sm border-b border-border/50">
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex gap-1 py-3 overflow-x-auto">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 text-sm font-medium rounded-sm whitespace-nowrap transition-all ${
                  selectedCategory === category
                    ? "bg-accent text-accent-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                {categoryConfig[category].label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Category Description */}
      <section className="py-6 px-4">
        <div className="max-w-5xl mx-auto">
          <p className="text-muted-foreground">
            {categoryConfig[selectedCategory].description}
          </p>
        </div>
      </section>

      {/* Templates Grid */}
      <section className="py-8 px-4 pb-20">
        <div className="max-w-5xl mx-auto">
          {!templates ? (
            // Loading state
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="h-80 bg-muted animate-pulse rounded-xl"
                />
              ))}
            </div>
          ) : filteredTemplates && filteredTemplates.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredTemplates.map((template, index) => (
                <TemplateCard
                  key={template._id}
                  template={template}
                  index={index}
                  onSelect={handleSelectTemplate}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-muted-foreground mb-4">
                No templates in this category yet.
              </p>
              <button
                onClick={() => setSelectedCategory("all")}
                className="text-sm font-medium text-accent hover:underline"
              >
                View all templates
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Value Proposition */}
      <section className="py-16 px-4 border-t border-border/50 bg-muted/30">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-display text-2xl font-semibold tracking-tight mb-4">
            Why Give Your Email?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-left mb-8">
            <div>
              <p className="font-medium mb-1">Instant Access</p>
              <p className="text-sm text-muted-foreground">
                Get the GitHub link immediately. No waiting, no drip campaigns.
              </p>
            </div>
            <div>
              <p className="font-medium mb-1">Weekly Updates</p>
              <p className="text-sm text-muted-foreground">
                One email per week with new templates, code, and lessons learned.
              </p>
            </div>
            <div>
              <p className="font-medium mb-1">Unsubscribe Anytime</p>
              <p className="text-sm text-muted-foreground">
                One click to leave. No hard feelings, no dark patterns.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-20 px-4 border-t border-border/50">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="font-display text-2xl font-semibold tracking-tight mb-4">
            Get Notified When I Release New Templates
          </h2>
          <p className="text-muted-foreground mb-8">
            I add new templates monthly. Subscribe once, access everything forever.
          </p>
          <NewsletterForm
            source="templates"
            placeholder="your@email.com"
            buttonText="Subscribe"
            className="justify-center"
          />
          <p className="text-xs text-muted-foreground mt-4">
            One email per week. Unsubscribe anytime.
          </p>
        </div>
      </section>

      {/* Cross-sell */}
      <section className="py-16 px-4 border-t border-border/50 bg-muted/30">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-display text-xl font-semibold tracking-tight mb-3">
            Want to see these templates in action?
          </h2>
          <p className="text-muted-foreground mb-6">
            I build everything in public on YouTube. Watch me create, break, and fix things in real time.
          </p>
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-sm font-medium text-accent hover:underline"
          >
            See what I&apos;m building
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Access Modal */}
      <TemplateAccessModal
        template={selectedTemplate}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedTemplate(null);
        }}
      />
    </main>
  );
}

export default function TemplatesPage() {
  return (
    <ConvexProvider client={convex}>
      <TemplatesContent />
    </ConvexProvider>
  );
}

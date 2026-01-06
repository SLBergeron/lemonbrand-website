"use client";

import { motion } from "framer-motion";
import { Play, Users, Check, ArrowRight } from "lucide-react";
import { Id } from "@/convex/_generated/dataModel";

export interface Template {
  _id: Id<"templates">;
  slug: string;
  title: string;
  tagline?: string;
  description: string;
  category: "process" | "code" | "ai";
  isAvailable: boolean;
  githubUrl: string;
  guideUrl?: string;
  videoUrl?: string;
  prerequisites: string[];
  whatYoullGet?: string[];
  whoIsThisFor?: string;
  thumbnailUrl?: string;
  accessCount: number;
  createdAt: number;
}

interface TemplateCardProps {
  template: Template;
  index: number;
  onSelect: (template: Template) => void;
}

const categoryConfig = {
  process: {
    label: "Process",
    color: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
    icon: "📋",
  },
  code: {
    label: "Code",
    color: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300",
    icon: "💻",
  },
  ai: {
    label: "AI",
    color: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300",
    icon: "🤖",
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

export default function TemplateCard({ template, index, onSelect }: TemplateCardProps) {
  const category = categoryConfig[template.category];

  return (
    <motion.article
      variants={fadeInUp}
      initial="hidden"
      animate="visible"
      custom={index}
      className="group bg-card border border-border/50 rounded-xl overflow-hidden shadow-premium-sm hover:shadow-premium-md transition-all duration-300 hover:-translate-y-1"
    >
      {/* Header */}
      <div className="p-6 pb-4">
        {/* Category + Access Count */}
        <div className="flex items-center justify-between mb-4">
          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-full ${category.color}`}>
            <span>{category.icon}</span>
            {category.label}
          </span>
          {template.accessCount > 0 && (
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <Users className="w-3 h-3" />
              {template.accessCount} accessed
            </span>
          )}
        </div>

        {/* Title & Tagline */}
        <h3 className="font-display text-xl font-semibold tracking-tight mb-1 group-hover:text-accent transition-colors">
          {template.title}
        </h3>
        {template.tagline && (
          <p className="text-accent font-medium text-sm mb-3">
            {template.tagline}
          </p>
        )}

        {/* Description */}
        <p className="text-muted-foreground text-sm leading-relaxed mb-4">
          {template.description}
        </p>

        {/* Who Is This For */}
        {template.whoIsThisFor && (
          <div className="mb-4 p-3 bg-muted/50 rounded-lg">
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground mb-1">
              Who this is for
            </p>
            <p className="text-sm">{template.whoIsThisFor}</p>
          </div>
        )}
      </div>

      {/* What You'll Get Preview */}
      {template.whatYoullGet && template.whatYoullGet.length > 0 && (
        <div className="px-6 pb-4">
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground mb-2">
            What you&apos;ll get
          </p>
          <ul className="space-y-1.5">
            {template.whatYoullGet.slice(0, 3).map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-sm">
                <Check className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
            {template.whatYoullGet.length > 3 && (
              <li className="text-xs text-muted-foreground pl-6">
                +{template.whatYoullGet.length - 3} more...
              </li>
            )}
          </ul>
        </div>
      )}

      {/* Footer Actions */}
      <div className="px-6 pb-6 pt-2 flex items-center gap-3">
        <button
          onClick={() => onSelect(template)}
          className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-accent text-accent-foreground text-sm font-medium rounded-sm shadow-[0_2px_0_0_rgba(0,0,0,0.1),inset_0_1px_0_0_rgba(255,255,255,0.1)] hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(200,140,30,0.3)] transition-all duration-200"
        >
          Get Template
          <ArrowRight className="w-4 h-4" />
        </button>

        {template.videoUrl && (
          <a
            href={template.videoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center w-10 h-10 rounded-sm border border-border hover:bg-muted hover:border-accent transition-colors"
            aria-label="Watch related video"
          >
            <Play className="w-4 h-4" />
          </a>
        )}
      </div>
    </motion.article>
  );
}

"use client";

import { motion } from "framer-motion";
import { Play, Check, ArrowRight, Star } from "lucide-react";
import { Template } from "./TemplateCard";
import Image from "next/image";

interface FeaturedTemplateCardProps {
  template: Template;
  onSelect: (template: Template) => void;
}

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export default function FeaturedTemplateCard({ template, onSelect }: FeaturedTemplateCardProps) {
  return (
    <motion.article
      variants={fadeInUp}
      initial="hidden"
      animate="visible"
      className="relative bg-gradient-to-br from-accent/5 via-background to-accent/10 border-2 border-accent/30 rounded-2xl overflow-hidden shadow-premium-md"
    >
      {/* Featured Badge */}
      <div className="absolute top-4 right-4 z-10">
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-accent text-accent-foreground text-xs font-semibold rounded-full shadow-lg">
          <Star className="w-3 h-3 fill-current" />
          Featured Playbook
        </span>
      </div>

      <div className="grid md:grid-cols-2 gap-0">
        {/* Left: Thumbnail & Video */}
        <div className="relative aspect-video md:aspect-auto md:min-h-[400px] bg-muted/50">
          {template.thumbnailUrl ? (
            <Image
              src={template.thumbnailUrl}
              alt={template.title}
              fill
              className="object-cover"
              priority
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-accent/20 to-accent/5">
              <span className="text-6xl">📄</span>
            </div>
          )}
          {/* Video Play Overlay */}
          {template.videoUrl && (
            <a
              href={template.videoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/40 transition-colors group"
            >
              <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                <Play className="w-7 h-7 text-accent fill-accent ml-1" />
              </div>
            </a>
          )}
        </div>

        {/* Right: Content */}
        <div className="p-6 md:p-8 flex flex-col">
          {/* Title & Tagline */}
          <div className="mb-4">
            <h3 className="font-display text-2xl md:text-3xl font-semibold tracking-tight mb-2">
              {template.title}
            </h3>
            {template.tagline && (
              <p className="text-accent font-medium text-lg">
                {template.tagline}
              </p>
            )}
          </div>

          {/* Description */}
          <p className="text-muted-foreground leading-relaxed mb-6">
            {template.description}
          </p>

          {/* What You'll Get */}
          {template.whatYoullGet && template.whatYoullGet.length > 0 && (
            <div className="mb-6 flex-1">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                What you&apos;ll get
              </p>
              <ul className="space-y-2">
                {template.whatYoullGet.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <Check className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Who Is This For */}
          {template.whoIsThisFor && (
            <div className="mb-6 p-3 bg-muted/50 rounded-lg border border-border/50">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                Perfect for
              </p>
              <p className="text-sm font-medium">{template.whoIsThisFor}</p>
            </div>
          )}

          {/* CTA */}
          <div className="flex items-center gap-3 mt-auto">
            <button
              onClick={() => onSelect(template)}
              className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 bg-accent text-accent-foreground text-sm font-semibold rounded-sm shadow-[0_2px_0_0_rgba(0,0,0,0.1),inset_0_1px_0_0_rgba(255,255,255,0.1)] hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(200,140,30,0.3)] transition-all duration-200"
            >
              Get This Playbook Free
              <ArrowRight className="w-4 h-4" />
            </button>

            {template.videoUrl && (
              <a
                href={template.videoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-3 text-sm font-medium text-muted-foreground hover:text-foreground border border-border rounded-sm hover:border-accent transition-all"
              >
                <Play className="w-4 h-4" />
                Watch Demo
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.article>
  );
}

"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

interface CodeMockupProps {
  code: string;
  filename?: string;
  language?: string;
  showLineNumbers?: boolean;
  highlightLines?: number[];
  maxHeight?: string;
  animate?: boolean;
  className?: string;
}

export function CodeMockup({
  code,
  filename = "CLAUDE.md",
  showLineNumbers = true,
  highlightLines = [],
  maxHeight = "400px",
  animate = true,
  className,
}: CodeMockupProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const lines = code.split("\n");

  return (
    <motion.div
      ref={ref}
      initial={animate ? { opacity: 0, y: 20 } : {}}
      animate={animate && isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "rounded-lg border border-border bg-card shadow-lg overflow-hidden",
        className
      )}
    >
      {/* Title bar */}
      <div className="flex items-center gap-2 px-4 py-3 bg-muted/50 border-b border-border">
        {/* Traffic lights */}
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-destructive/60" />
          <div className="w-3 h-3 rounded-full bg-warning/60" />
          <div className="w-3 h-3 rounded-full bg-success/60" />
        </div>
        {/* Filename */}
        <span className="ml-3 text-xs font-mono text-muted-foreground">
          {filename}
        </span>
      </div>

      {/* Code content */}
      <div
        className="overflow-auto font-mono text-sm"
        style={{ maxHeight }}
      >
        <div className="p-4">
          {lines.map((line, i) => {
            const lineNumber = i + 1;
            const isHighlighted = highlightLines.includes(lineNumber);

            return (
              <motion.div
                key={i}
                initial={animate ? { opacity: 0, x: -10 } : {}}
                animate={animate && isInView ? { opacity: 1, x: 0 } : {}}
                transition={{
                  duration: 0.3,
                  delay: animate ? Math.min(i * 0.02, 0.5) : 0,
                }}
                className={cn(
                  "flex",
                  isHighlighted && "bg-accent/10 -mx-4 px-4 border-l-2 border-accent"
                )}
              >
                {showLineNumbers && (
                  <span className="w-8 flex-shrink-0 text-muted-foreground/50 select-none text-right pr-4">
                    {lineNumber}
                  </span>
                )}
                <span className="flex-1">
                  <CodeLine content={line} />
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}

// Simple syntax highlighting for markdown
function CodeLine({ content }: { content: string }) {
  // Headings
  if (content.startsWith("# ")) {
    return (
      <span className="text-accent font-semibold">
        <span className="text-muted-foreground"># </span>
        {content.slice(2)}
      </span>
    );
  }
  if (content.startsWith("## ")) {
    return (
      <span className="text-primary font-semibold">
        <span className="text-muted-foreground">## </span>
        {content.slice(3)}
      </span>
    );
  }
  if (content.startsWith("### ")) {
    return (
      <span className="text-foreground font-medium">
        <span className="text-muted-foreground">### </span>
        {content.slice(4)}
      </span>
    );
  }

  // List items
  if (content.startsWith("- ")) {
    return (
      <span>
        <span className="text-accent">- </span>
        <span className="text-muted-foreground">{content.slice(2)}</span>
      </span>
    );
  }

  // Bold text **text**
  if (content.includes("**")) {
    const parts = content.split(/(\*\*[^*]+\*\*)/);
    return (
      <span className="text-muted-foreground">
        {parts.map((part, i) => {
          if (part.startsWith("**") && part.endsWith("**")) {
            return (
              <span key={i} className="text-foreground font-medium">
                {part.slice(2, -2)}
              </span>
            );
          }
          return part;
        })}
      </span>
    );
  }

  // Comments/emphasis
  if (content.startsWith("//") || content.startsWith("<!--")) {
    return <span className="text-muted-foreground/60 italic">{content}</span>;
  }

  // Default
  return <span className="text-muted-foreground">{content || "\u00A0"}</span>;
}

// Pre-configured CLAUDE.md preview
export function ClaudeMdPreview({ className }: { className?: string }) {
  const sampleCode = `# Project Overview

## What I'm Building
A recipe tracking app that helps me save and organize
family recipes with ingredient scaling.

## Technical Stack
- Next.js 14 with App Router
- Tailwind CSS for styling
- Supabase for database
- Vercel for deployment

## Current State
- Basic layout complete
- Recipe list view working
- Need: ingredient parser, scaling logic

## Constraints
- Mobile-first (I use this in the kitchen)
- Must work offline
- No accounts needed (local first)

## Decisions Made
- Using localStorage for MVP
- Will add Supabase sync later
- Keeping UI minimal and fast`;

  return (
    <CodeMockup
      code={sampleCode}
      filename="CLAUDE.md"
      highlightLines={[1, 4, 8, 15]}
      className={className}
    />
  );
}

"use client";

import { BonusSection } from "@/lib/lessons/types";
import { motion, AnimatePresence } from "framer-motion";
import { Gift, ChevronDown, Copy, Check } from "lucide-react";
import { useState, useCallback, useEffect } from "react";
import { cn } from "@lemonbrand/ui";
import ReactMarkdown from "react-markdown";

interface Props {
  section: BonusSection;
}

// Copiable prompt block component
function CopyablePrompt({ children }: { children: React.ReactNode }) {
  const [copied, setCopied] = useState(false);

  // Extract text content from children
  const extractText = (node: React.ReactNode): string => {
    if (typeof node === "string") return node;
    if (Array.isArray(node)) return node.map(extractText).join("");
    if (node && typeof node === "object" && "props" in node) {
      return extractText((node as React.ReactElement).props.children);
    }
    return "";
  };

  const textContent = extractText(children).trim();

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(textContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [textContent]);

  return (
    <div className="group relative my-5">
      {/* Decorative corner accents */}
      <div className="absolute -top-px -left-px w-3 h-3 border-t-2 border-l-2 border-accent/50 rounded-tl-sm" />
      <div className="absolute -top-px -right-px w-3 h-3 border-t-2 border-r-2 border-accent/50 rounded-tr-sm" />
      <div className="absolute -bottom-px -left-px w-3 h-3 border-b-2 border-l-2 border-accent/50 rounded-bl-sm" />
      <div className="absolute -bottom-px -right-px w-3 h-3 border-b-2 border-r-2 border-accent/50 rounded-br-sm" />

      {/* Main prompt container */}
      <div className="relative bg-gradient-to-br from-card via-card to-accent/[0.03] border border-border/60 rounded-lg overflow-hidden">
        {/* Header bar */}
        <div className="flex items-center justify-between px-4 py-2 bg-muted/30 border-b border-border/40">
          <span className="text-xs font-mono text-muted-foreground tracking-wide uppercase">
            Paste into Claude
          </span>
          <button
            onClick={handleCopy}
            className={cn(
              "flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium transition-all duration-200",
              copied
                ? "bg-success/15 text-success"
                : "bg-accent/10 text-accent hover:bg-accent/20"
            )}
          >
            {copied ? (
              <>
                <Check className="size-3" />
                <span>Copied</span>
              </>
            ) : (
              <>
                <Copy className="size-3" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>

        {/* Prompt content */}
        <div className="p-4 font-mono text-sm leading-relaxed text-foreground/90 selection:bg-accent/20">
          {children}
        </div>
      </div>
    </div>
  );
}

export function BonusSectionComponent({ section }: Props) {
  const [isOpen, setIsOpen] = useState(!section.collapsed);
  const [projectIdea, setProjectIdea] = useState<string | null>(null);

  // Read project idea from localStorage (saved by ProjectDiscovery)
  useEffect(() => {
    const saved = localStorage.getItem("sprint-project-idea");
    if (saved) setProjectIdea(saved);
  }, []);

  // Also check when the section is expanded (user may have filled form after page load)
  useEffect(() => {
    if (isOpen) {
      const saved = localStorage.getItem("sprint-project-idea");
      if (saved) setProjectIdea(saved);
    }
  }, [isOpen]);

  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="relative rounded-2xl overflow-hidden"
    >
      {/* Outer glow effect */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-accent/20 via-accent/5 to-transparent blur-xl opacity-50" />

      {/* Main card */}
      <div className="relative bg-gradient-to-br from-card/95 via-card to-accent/[0.02] border border-accent/20 rounded-2xl overflow-hidden backdrop-blur-sm">
        {/* Subtle grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 1px)`,
            backgroundSize: "24px 24px",
          }}
        />

        {/* Accent gradient at top */}
        <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-accent/8 to-transparent pointer-events-none" />

        {/* Header button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="relative w-full px-6 py-5 flex items-center justify-between hover:bg-accent/[0.03] transition-colors duration-300"
        >
          <div className="flex items-center gap-4">
            {/* Icon with animated ring */}
            <div className="relative">
              <motion.div
                className="absolute inset-0 rounded-xl bg-accent/20"
                animate={
                  isOpen
                    ? { scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }
                    : {}
                }
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
              <span className="relative size-10 rounded-xl bg-gradient-to-br from-accent/25 to-accent/10 flex items-center justify-center shrink-0 border border-accent/20">
                <Gift className="size-5 text-accent" />
              </span>
            </div>

            <div className="text-left">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-accent/80 font-medium">
                  Bonus
                </span>
                <span className="inline-flex h-1.5 w-1.5 rounded-full bg-accent/60" />
              </div>
              <h3 className="font-display font-bold text-lg text-foreground mt-0.5">
                {section.title}
              </h3>
            </div>
          </div>

          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="size-8 rounded-lg bg-muted/50 flex items-center justify-center"
          >
            <ChevronDown className="size-4 text-muted-foreground" />
          </motion.div>
        </button>

        {/* Content */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="relative px-6 pb-6 pt-2">
                {/* Separator line with gradient */}
                <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />

                <div className="prose-lesson mt-4">
                  <ReactMarkdown
                    components={{
                      blockquote: ({ children }) => (
                        <CopyablePrompt>{children}</CopyablePrompt>
                      ),
                      p: ({ children }) => (
                        <p className="my-3 text-foreground/85">{children}</p>
                      ),
                      strong: ({ children }) => (
                        <strong className="font-semibold text-foreground">
                          {children}
                        </strong>
                      ),
                      ul: ({ children }) => (
                        <ul className="my-4 space-y-2">{children}</ul>
                      ),
                      li: ({ children }) => (
                        <li className="flex items-start gap-3 text-foreground/85">
                          <span className="mt-2 size-1.5 rounded-full bg-accent/60 shrink-0" />
                          <span>{children}</span>
                        </li>
                      ),
                      a: ({ href, children }) => (
                        <a
                          href={href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-accent hover:underline underline-offset-2"
                        >
                          {children}
                        </a>
                      ),
                    }}
                  >
                    {section.content.replace(
                      "{{projectIdea}}",
                      projectIdea || "[your project idea]"
                    )}
                  </ReactMarkdown>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.section>
  );
}

"use client";

import { useState, useEffect, useCallback } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "@lemonbrand/convex/client";
import { Id } from "@lemonbrand/convex/client";
import { Button, cn } from "@lemonbrand/ui";
import { Sparkles, RefreshCw, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface AIDialogueModuleProps {
  userId: Id<"users">;
  day: number;
}

export function AIDialogueModule({ userId, day }: AIDialogueModuleProps) {
  const [content, setContent] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState("");
  const [hasTriedGenerate, setHasTriedGenerate] = useState(false);

  const cached = useQuery(api.sprintAiDialogue.getByUserDay, {
    userId,
    day,
  });

  const formResponse = useQuery(
    api.sprintFormResponses.getFormResponseByUserDay,
    { userId, day }
  );

  const invalidateDialogue = useMutation(api.sprintAiDialogue.invalidate);

  // Load cached content
  useEffect(() => {
    if (cached?.content) {
      setContent(cached.content);
    }
  }, [cached]);

  const generate = useCallback(async () => {
    setIsGenerating(true);
    setError("");

    try {
      const res = await fetch("/api/sprint/generate-dialogue", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ day, userId }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Failed to generate tips");
        return;
      }

      const data = await res.json();
      setContent(data.content);
    } catch {
      setError("Something went wrong. Try again.");
    } finally {
      setIsGenerating(false);
      setHasTriedGenerate(true);
    }
  }, [day, userId]);

  // Auto-generate on mount if no cache
  useEffect(() => {
    if (cached === null && !hasTriedGenerate && !isGenerating) {
      generate();
    }
  }, [cached, hasTriedGenerate, isGenerating, generate]);

  const handleRefresh = async () => {
    await invalidateDialogue({ userId, day });
    setContent(null);
    setHasTriedGenerate(false);
    generate();
  };

  // Check if form data is thin
  const hasFormData = !!formResponse;
  const formDataThin =
    formResponse?.responses &&
    typeof formResponse.responses === "object" &&
    Object.values(formResponse.responses).some(
      (v) => typeof v === "string" && v.length > 0
    ) &&
    Object.values(formResponse.responses).every(
      (v) => typeof v !== "string" || v.length < 20
    );

  // Loading skeleton
  if (cached === undefined) {
    return (
      <div className="p-5 rounded-lg bg-accent/5 border border-accent/20 animate-pulse">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-5 h-5 rounded bg-accent/20" />
          <div className="h-4 w-40 rounded bg-accent/10" />
        </div>
        <div className="space-y-2">
          <div className="h-3 w-full rounded bg-accent/10" />
          <div className="h-3 w-4/5 rounded bg-accent/10" />
          <div className="h-3 w-3/5 rounded bg-accent/10" />
        </div>
      </div>
    );
  }

  return (
    <div className="p-5 rounded-lg bg-accent/5 border border-accent/20">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Sparkles className="size-5 text-accent" />
          <h2 className="font-display font-semibold text-foreground">
            Tips for Your Project
          </h2>
        </div>
        {content && !isGenerating && (
          <button
            onClick={handleRefresh}
            className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            <RefreshCw className="size-3.5" />
            Refresh
          </button>
        )}
      </div>

      <AnimatePresence mode="wait">
        {isGenerating && (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-center gap-2 py-4"
          >
            <Loader2 className="size-4 animate-spin text-accent" />
            <p className="text-sm text-muted-foreground">
              Generating personalized tips...
            </p>
          </motion.div>
        )}

        {!isGenerating && content && (
          <motion.div
            key="content"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div
              className="prose prose-sm max-w-none text-muted-foreground
                [&_strong]:text-foreground [&_li]:text-muted-foreground
                [&_p]:text-muted-foreground [&_h1]:text-foreground
                [&_h2]:text-foreground [&_h3]:text-foreground"
              dangerouslySetInnerHTML={{ __html: markdownToHtml(content) }}
            />

            {/* Quality nudge */}
            {formDataThin && (
              <p className="text-xs text-amber-500 mt-4 pt-3 border-t border-accent/10">
                Want better tips? Add more detail in the form below.
              </p>
            )}

            {!hasFormData && day > 0 && (
              <p className="text-xs text-muted-foreground/70 mt-4 pt-3 border-t border-accent/10">
                Complete today&apos;s form to get personalized tips for
                tomorrow.
              </p>
            )}

            <p className="text-[10px] text-muted-foreground/40 mt-3">
              Powered by Claude
            </p>
          </motion.div>
        )}

        {!isGenerating && !content && error && (
          <motion.div
            key="error"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <p className="text-sm text-destructive mb-3">{error}</p>
            <Button variant="outline" size="sm" onClick={generate}>
              Try again
            </Button>
          </motion.div>
        )}

        {!isGenerating && !content && !error && hasTriedGenerate && (
          <motion.div
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <p className="text-sm text-muted-foreground">
              Complete the Day 0 form to get personalized tips for your project.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/**
 * Simple markdown to HTML converter for the dialogue content.
 */
function markdownToHtml(md: string): string {
  return md
    .split("\n\n")
    .map((block) => {
      block = block.trim();
      if (!block) return "";

      if (block.startsWith("### "))
        return `<h3>${inline(block.slice(4))}</h3>`;
      if (block.startsWith("## "))
        return `<h2>${inline(block.slice(3))}</h2>`;
      if (block.startsWith("# "))
        return `<h1>${inline(block.slice(2))}</h1>`;

      const lines = block.split("\n");
      if (lines.every((l) => l.match(/^[-*]\s/))) {
        const items = lines
          .map((l) => `<li>${inline(l.replace(/^[-*]\s/, ""))}</li>`)
          .join("");
        return `<ul>${items}</ul>`;
      }
      if (lines.every((l) => l.match(/^\d+\.\s/))) {
        const items = lines
          .map((l) => `<li>${inline(l.replace(/^\d+\.\s/, ""))}</li>`)
          .join("");
        return `<ol>${items}</ol>`;
      }

      return `<p>${inline(block.replace(/\n/g, " "))}</p>`;
    })
    .join("");
}

function inline(text: string): string {
  return text
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    .replace(/`(.+?)`/g, "<code>$1</code>");
}

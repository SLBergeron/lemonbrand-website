"use client";

import { ExerciseSection } from "@/lib/lessons/types";
import { Copy, Check } from "lucide-react";
import { Button } from "@lemonbrand/ui";
import { useState } from "react";

interface Props {
  section: ExerciseSection;
}

export function ExerciseSectionComponent({ section }: Props) {
  const [copied, setCopied] = useState(false);

  const copyPrompt = () => {
    if (section.prompt) {
      navigator.clipboard.writeText(section.prompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <section className="space-y-6">
      <h2 className="font-display text-xl font-bold">{section.title}</h2>

      {/* Instructions */}
      <ol className="space-y-3">
        {section.instructions.map((instruction, i) => (
          <li key={i} className="flex gap-3">
            <span className="shrink-0 font-mono text-sm text-muted-foreground w-5">
              {i + 1}.
            </span>
            <span>{instruction}</span>
          </li>
        ))}
      </ol>

      {/* Prompt - plain text, ready to paste */}
      {section.prompt && (
        <div className="mt-8">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-muted-foreground">
              Paste this into Claude:
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={copyPrompt}
              className="text-xs"
            >
              {copied ? (
                <>
                  <Check className="size-3 mr-1" />
                  Copied
                </>
              ) : (
                <>
                  <Copy className="size-3 mr-1" />
                  Copy
                </>
              )}
            </Button>
          </div>
          <div className="bg-muted/30 border border-border/50 rounded-lg p-4 font-mono text-sm leading-relaxed">
            {section.prompt}
          </div>
        </div>
      )}

      {/* Expected outcome */}
      <p className="text-sm text-muted-foreground">
        <span className="font-medium text-foreground">What happens: </span>
        {section.expectedOutcome}
      </p>
    </section>
  );
}

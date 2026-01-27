"use client";

import { CalloutSection } from "@/lib/lessons/types";
import { cn } from "@lemonbrand/ui";
import { Mic } from "lucide-react";
import ReactMarkdown from "react-markdown";

interface Props {
  section: CalloutSection;
}

export function CalloutSectionComponent({ section }: Props) {
  const isWarning = section.calloutType === "warning";
  const isVoice = section.calloutType === "voice";

  // Special voice hint pill with glow effect
  if (isVoice) {
    return (
      <div className="py-2">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 animate-pulse-subtle">
          <span className="text-accent">
            <Mic className="size-4" />
          </span>
          <span className="text-sm font-medium text-foreground">
            {section.content}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "border-l-2 pl-6 py-1",
        isWarning ? "border-destructive/50" : "border-accent/50"
      )}
    >
      {section.title && (
        <p className="font-medium mb-2">{section.title}</p>
      )}
      <div className="prose-lesson text-sm text-muted-foreground">
        <ReactMarkdown
          components={{
            p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
            strong: ({ children }) => (
              <strong className="font-medium text-foreground">{children}</strong>
            ),
            ul: ({ children }) => (
              <ul className="list-disc list-inside space-y-1 mt-2">{children}</ul>
            ),
            a: ({ href, children }) => (
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:underline"
              >
                {children}
              </a>
            ),
          }}
        >
          {section.content}
        </ReactMarkdown>
      </div>
    </div>
  );
}

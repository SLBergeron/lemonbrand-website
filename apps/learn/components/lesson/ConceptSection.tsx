"use client";

import { ConceptSection } from "@/lib/lessons/types";
import ReactMarkdown from "react-markdown";

interface Props {
  section: ConceptSection;
}

export function ConceptSectionComponent({ section }: Props) {
  return (
    <section className="space-y-6">
      <h2 className="font-display text-xl font-bold">{section.title}</h2>

      <div className="prose-lesson">
        <ReactMarkdown
          components={{
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

      {section.keyTakeaway && (
        <p className="text-sm border-l-2 border-accent/50 pl-4 text-muted-foreground">
          <span className="font-medium text-foreground">Takeaway: </span>
          {section.keyTakeaway}
        </p>
      )}
    </section>
  );
}

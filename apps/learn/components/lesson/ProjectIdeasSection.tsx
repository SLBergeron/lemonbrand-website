"use client";

import { ProjectIdeasSection } from "@/lib/lessons/types";
import Image from "next/image";

interface Props {
  section: ProjectIdeasSection;
}

export function ProjectIdeasSectionComponent({ section }: Props) {
  return (
    <section className="space-y-6">
      <h2 className="font-display text-xl font-bold">{section.title}</h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {section.ideas.map((idea, i) => (
          <div
            key={i}
            className="flex flex-col items-center text-center p-4 rounded-lg border border-border/50 bg-muted/20 hover:bg-muted/30 transition-colors"
          >
            <Image
              src={`/assets/${idea.icon}`}
              alt=""
              width={48}
              height={48}
              className="mb-3"
            />
            <span className="text-sm font-medium">{idea.label}</span>
          </div>
        ))}
      </div>

      {section.footnote && (
        <p className="text-sm text-muted-foreground">{section.footnote}</p>
      )}
    </section>
  );
}

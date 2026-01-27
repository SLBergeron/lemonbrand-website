"use client";

import { IntroSection } from "@/lib/lessons/types";

interface Props {
  section: IntroSection;
}

export function IntroSectionComponent({ section }: Props) {
  return (
    <div className="space-y-6">
      <p className="text-muted-foreground">{section.subtitle}</p>

      <blockquote className="border-l-2 border-accent pl-6">
        <p className="text-xl font-display font-medium leading-snug">
          {section.hook}
        </p>
      </blockquote>
    </div>
  );
}

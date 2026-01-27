"use client";

import { ComparisonSection } from "@/lib/lessons/types";
import { motion } from "framer-motion";
import { ArrowLeftRight } from "lucide-react";

interface Props {
  section: ComparisonSection;
}

export function ComparisonSectionComponent({ section }: Props) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="space-y-4"
    >
      <h2 className="font-display text-xl font-bold flex items-center gap-3">
        <span className="size-8 rounded-lg bg-muted flex items-center justify-center shrink-0">
          <ArrowLeftRight className="size-4 text-muted-foreground" />
        </span>
        {section.title}
      </h2>

      <div className="grid md:grid-cols-2 gap-4">
        {section.columns.map((column, colIndex) => (
          <div
            key={colIndex}
            className="rounded-xl border border-border bg-card/50 overflow-hidden"
          >
            <div className="px-4 py-3 bg-muted/50 border-b border-border">
              <h3 className="font-semibold text-sm">{column.heading}</h3>
            </div>
            <div className="p-4 space-y-4">
              {column.items.map((item, itemIndex) => (
                <div key={itemIndex}>
                  <div className="text-sm font-medium text-foreground">
                    {item.label}
                  </div>
                  <div className="text-sm text-muted-foreground mt-0.5">
                    {item.description}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </motion.section>
  );
}

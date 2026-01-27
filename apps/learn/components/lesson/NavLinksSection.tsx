"use client";

import { NavLinksSection } from "@/lib/lessons/types";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";

interface Props {
  section: NavLinksSection;
}

export function NavLinksSectionComponent({ section }: Props) {
  const scrollToSection = (targetId: string) => {
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="space-y-2"
    >
      {section.title && (
        <p className="text-sm font-medium text-muted-foreground">{section.title}</p>
      )}
      <div className="flex flex-wrap gap-2">
        {section.links.map((link) => (
          <button
            key={link.targetId}
            onClick={() => scrollToSection(link.targetId)}
            className="group flex items-center gap-1 px-3 py-1.5 text-sm bg-card border border-border rounded-lg hover:border-accent/50 hover:bg-accent/5 transition-colors"
          >
            <span className="text-foreground/80 group-hover:text-foreground transition-colors">
              {link.label}
            </span>
            <ChevronRight className="size-3 text-muted-foreground group-hover:text-accent transition-colors" />
          </button>
        ))}
      </div>
    </motion.div>
  );
}

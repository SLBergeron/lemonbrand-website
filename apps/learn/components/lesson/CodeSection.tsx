"use client";

import { CodeSection } from "@/lib/lessons/types";
import { motion } from "framer-motion";
import { Copy, Check, Terminal, AlertTriangle } from "lucide-react";
import { Button } from "@lemonbrand/ui";
import { useState } from "react";
import { FlowDiagram } from "./FlowDiagram";
import { GitHubVersionDiagram } from "./GitHubVersionDiagram";
import { ResponsiveDevicesVisual } from "./ResponsiveDevicesVisual";
import { IterationCycleDiagram } from "./IterationCycleDiagram";
import { SprintSystemDiagram } from "./SprintSystemDiagram";

interface Props {
  section: CodeSection;
}

export function CodeSectionComponent({ section }: Props) {
  const [copied, setCopied] = useState(false);

  const copyCode = () => {
    navigator.clipboard.writeText(section.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Render visual diagram for mermaid
  if (section.language === "mermaid") {
    return (
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="space-y-3"
      >
        {section.title && (
          <h3 className="font-display text-lg font-semibold text-foreground">
            {section.title}
          </h3>
        )}

        <FlowDiagram />

        {section.description && (
          <p className="text-sm text-muted-foreground">{section.description}</p>
        )}
      </motion.section>
    );
  }

  // Render GitHub version flow diagram
  if (section.language === "github-flow") {
    return (
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="space-y-3"
      >
        {section.title && (
          <h3 className="font-display text-lg font-semibold text-foreground">
            {section.title}
          </h3>
        )}

        <GitHubVersionDiagram />

        {section.description && (
          <p className="text-sm text-muted-foreground">{section.description}</p>
        )}
      </motion.section>
    );
  }

  // Render responsive devices visual
  if (section.language === "responsive-devices") {
    return (
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="space-y-3"
      >
        {section.title && (
          <h3 className="font-display text-lg font-semibold text-foreground">
            {section.title}
          </h3>
        )}

        <ResponsiveDevicesVisual />

        {section.description && (
          <p className="text-sm text-muted-foreground">{section.description}</p>
        )}
      </motion.section>
    );
  }

  // Render iteration cycle diagram
  if (section.language === "iteration-cycle") {
    return (
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="space-y-3"
      >
        {section.title && (
          <h3 className="font-display text-lg font-semibold text-foreground">
            {section.title}
          </h3>
        )}

        <IterationCycleDiagram />

        {section.description && (
          <p className="text-sm text-muted-foreground">{section.description}</p>
        )}
      </motion.section>
    );
  }

  // Render sprint system diagram
  if (section.language === "sprint-system") {
    return (
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="space-y-3"
      >
        {section.title && (
          <h3 className="font-display text-lg font-semibold text-foreground">
            {section.title}
          </h3>
        )}

        <SprintSystemDiagram />

        {section.description && (
          <p className="text-sm text-muted-foreground">{section.description}</p>
        )}
      </motion.section>
    );
  }

  // Error variant styling
  const isError = section.variant === "error";

  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="space-y-3"
    >
      {section.title && (
        <h3 className={`text-sm font-medium flex items-center gap-2 ${
          isError ? "text-red-400" : "text-muted-foreground"
        }`}>
          {isError ? <AlertTriangle className="size-4" /> : <Terminal className="size-4" />}
          {section.title}
        </h3>
      )}

      <div className="relative group">
        <pre className={`rounded-xl p-5 overflow-x-auto ${
          isError
            ? "bg-red-500/10 border-2 border-red-500/30"
            : "bg-card border border-border"
        }`}>
          <code className={`text-sm font-mono whitespace-pre ${
            isError ? "text-red-300" : "text-foreground/90"
          }`}>
            {section.code}
          </code>
        </pre>

        {section.copyable !== false && !isError && (
          <Button
            variant="ghost"
            size="icon-sm"
            className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={copyCode}
          >
            {copied ? (
              <Check className="size-4 text-success" />
            ) : (
              <Copy className="size-4" />
            )}
          </Button>
        )}
      </div>

      {section.description && (
        <p className="text-sm text-muted-foreground">{section.description}</p>
      )}
    </motion.section>
  );
}

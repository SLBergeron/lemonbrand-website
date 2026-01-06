"use client";

import { useState } from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import TemplateAccessModal from "./TemplateAccessModal";
import { Id } from "@/convex/_generated/dataModel";

interface Template {
  _id: Id<"templates">;
  slug: string;
  title: string;
  description: string;
  category: "process" | "code" | "ai";
  isAvailable: boolean;
  githubUrl: string;
  guideUrl?: string;
  prerequisites: string[];
  accessCount: number;
  createdAt: number;
}

const categoryLabels: Record<string, string> = {
  process: "Process",
  code: "Code",
  ai: "AI",
};

export default function MinimalTemplateList() {
  const templates = useQuery(api.templates.list) as Template[] | undefined;
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!templates) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-12 bg-muted animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <>
      <div className="divide-y divide-border">
        {templates.map((template) => (
          <button
            key={template._id}
            onClick={() => {
              setSelectedTemplate(template);
              setIsModalOpen(true);
            }}
            className="w-full flex items-center justify-between py-4 text-left hover:bg-muted/50 transition-colors group"
          >
            <div className="flex items-center gap-4">
              <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground w-16">
                {categoryLabels[template.category]}
              </span>
              <span className="font-medium group-hover:underline">
                {template.title}
              </span>
            </div>
            <span className="text-muted-foreground group-hover:text-foreground transition-colors">
              →
            </span>
          </button>
        ))}
      </div>

      <TemplateAccessModal
        template={selectedTemplate}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedTemplate(null);
        }}
      />
    </>
  );
}

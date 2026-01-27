"use client";

import { useState } from "react";
import { useQuery } from "convex/react";
import { api } from "@lemonbrand/convex/client";
import TemplateAccessModal from "./TemplateAccessModal";
import { Template } from "./TemplateCard";
import { ArrowRight } from "lucide-react";

const categoryConfig = {
  process: { label: "Process", icon: "📋" },
  code: { label: "Code", icon: "💻" },
  ai: { label: "AI", icon: "🤖" },
};

export default function MinimalTemplateList() {
  const templates = useQuery(api.templates.list) as Template[] | undefined;
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!templates) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-16 bg-muted animate-pulse rounded-lg" />
        ))}
      </div>
    );
  }

  // Show only first 4 templates on homepage
  const displayTemplates = templates.slice(0, 4);

  return (
    <>
      <div className="space-y-3">
        {displayTemplates.map((template) => {
          const category = categoryConfig[template.category];
          return (
            <button
              key={template._id}
              onClick={() => {
                setSelectedTemplate(template);
                setIsModalOpen(true);
              }}
              className="w-full flex items-center gap-4 p-4 text-left bg-card border border-border/50 rounded-lg hover:border-accent hover:bg-accent/5 transition-all group"
            >
              {/* Category Icon */}
              <span className="text-lg">{category.icon}</span>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="font-medium group-hover:text-accent transition-colors">
                    {template.title}
                  </span>
                  <span className="text-xs text-muted-foreground px-1.5 py-0.5 bg-muted rounded">
                    {category.label}
                  </span>
                </div>
                {template.tagline && (
                  <p className="text-sm text-muted-foreground truncate">
                    {template.tagline}
                  </p>
                )}
              </div>

              {/* Arrow */}
              <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-accent group-hover:translate-x-1 transition-all shrink-0" />
            </button>
          );
        })}
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

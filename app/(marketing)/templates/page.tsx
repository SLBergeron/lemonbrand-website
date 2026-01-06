"use client";

import { useState } from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { ConvexProvider, ConvexReactClient } from "convex/react";
import TemplateAccessModal from "@/components/TemplateAccessModal";
import NewsletterForm from "@/components/NewsletterForm";
import { Id } from "@/convex/_generated/dataModel";

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

type Category = "all" | "process" | "code" | "ai";

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
  all: "All",
  process: "Process",
  code: "Code",
  ai: "AI",
};

function TemplatesContent() {
  const templates = useQuery(api.templates.list) as Template[] | undefined;
  const [selectedCategory, setSelectedCategory] = useState<Category>("all");
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const categories: Category[] = ["all", "process", "code", "ai"];

  const filteredTemplates =
    selectedCategory === "all"
      ? templates
      : templates?.filter((t) => t.category === selectedCategory);

  return (
    <main className="pt-14 min-h-screen">
      {/* Header */}
      <section className="py-16 px-4 border-b border-border">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            Templates
          </h1>
          <p className="text-lg text-muted-foreground">
            Free tools and guides. Enter your email to access.
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="border-b border-border">
        <div className="max-w-3xl mx-auto px-4">
          <div className="flex gap-6 py-4 overflow-x-auto">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`text-sm whitespace-nowrap transition-colors ${
                  selectedCategory === category
                    ? "text-foreground font-medium"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {categoryLabels[category]}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Templates List */}
      <section className="py-8 px-4">
        <div className="max-w-3xl mx-auto">
          {!templates ? (
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="h-20 bg-muted animate-pulse" />
              ))}
            </div>
          ) : filteredTemplates && filteredTemplates.length > 0 ? (
            <div className="divide-y divide-border">
              {filteredTemplates.map((template) => (
                <button
                  key={template._id}
                  onClick={() => {
                    setSelectedTemplate(template);
                    setIsModalOpen(true);
                  }}
                  className="w-full py-6 text-left hover:bg-muted/50 transition-colors group"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                          {categoryLabels[template.category]}
                        </span>
                      </div>
                      <h3 className="font-medium mb-1 group-hover:underline">
                        {template.title}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {template.description}
                      </p>
                    </div>
                    <span className="text-muted-foreground group-hover:text-foreground transition-colors mt-1">
                      →
                    </span>
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground text-center py-12">
              No templates in this category yet.
            </p>
          )}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-16 px-4 border-t border-border">
        <div className="max-w-md mx-auto text-center">
          <h2 className="text-xl font-semibold mb-4">
            Get notified when I release new templates
          </h2>
          <NewsletterForm
            source="templates"
            placeholder="your@email.com"
            buttonText="Subscribe"
            className="justify-center"
          />
        </div>
      </section>

      {/* Access Modal */}
      <TemplateAccessModal
        template={selectedTemplate}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedTemplate(null);
        }}
      />
    </main>
  );
}

export default function TemplatesPage() {
  return (
    <ConvexProvider client={convex}>
      <TemplatesContent />
    </ConvexProvider>
  );
}

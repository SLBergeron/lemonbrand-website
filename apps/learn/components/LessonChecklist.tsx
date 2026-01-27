"use client";

import { Checkbox, cn } from "@lemonbrand/ui";

interface ChecklistItem {
  id: string;
  label: string;
  description?: string;
}

interface LessonChecklistProps {
  items: ChecklistItem[];
  completedItems: string[];
  onToggle: (itemId: string) => void;
  disabled?: boolean;
}

export function LessonChecklist({
  items,
  completedItems,
  onToggle,
  disabled = false,
}: LessonChecklistProps) {
  return (
    <section>
      <h2 className="font-display text-sm font-semibold uppercase tracking-wide text-muted-foreground mb-6">
        Checklist
      </h2>

      <div className="space-y-3">
        {items.map((item) => {
          const isCompleted = completedItems.includes(item.id);

          return (
            <label
              key={item.id}
              className={cn(
                "flex items-start gap-3 cursor-pointer group",
                disabled && "opacity-50 cursor-not-allowed"
              )}
            >
              <Checkbox
                checked={isCompleted}
                onCheckedChange={() => !disabled && onToggle(item.id)}
                disabled={disabled}
                className="mt-0.5"
              />
              <div className="flex-1 min-w-0">
                <div
                  className={cn(
                    "text-sm",
                    isCompleted && "line-through text-muted-foreground"
                  )}
                >
                  {item.label}
                </div>
                {item.description && (
                  <div className="text-xs text-muted-foreground mt-0.5">
                    {item.description}
                  </div>
                )}
              </div>
            </label>
          );
        })}
      </div>
    </section>
  );
}

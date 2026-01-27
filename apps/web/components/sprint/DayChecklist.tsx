"use client";

import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { cn } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Sparkles } from "lucide-react";

interface ChecklistItem {
  id: string;
  label: string;
  description?: string;
  completed?: boolean;
}

interface DayChecklistProps {
  userId: Id<"users">;
  day: number;
  items: ChecklistItem[];
  trainingWatched?: boolean;
  worksheetCompleted?: boolean;
  progressPosted?: boolean;
  onComplete?: () => void;
}

export function DayChecklist({
  userId,
  day,
  items,
  trainingWatched = false,
  worksheetCompleted = false,
  progressPosted = false,
  onComplete,
}: DayChecklistProps) {
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set());
  const [showCelebration, setShowCelebration] = useState(false);

  const markTrainingWatched = useMutation(api.sprintDayProgress.markTrainingWatched);
  const markWorksheetCompleted = useMutation(api.sprintDayProgress.markWorksheetCompleted);
  const markProgressPosted = useMutation(api.sprintDayProgress.markProgressPosted);

  const handleCheck = async (itemId: string) => {
    const newChecked = new Set(checkedItems);

    if (newChecked.has(itemId)) {
      newChecked.delete(itemId);
    } else {
      newChecked.add(itemId);

      // Map item IDs to mutations
      if (itemId === "watch-training" && !trainingWatched) {
        await markTrainingWatched({ userId, day });
      } else if (itemId === "complete-worksheet" && !worksheetCompleted) {
        await markWorksheetCompleted({ userId, day });
      } else if (itemId === "post-progress" && !progressPosted) {
        const result = await markProgressPosted({ userId, day });
        if (result?.completed || result?.sprintCompleted) {
          setShowCelebration(true);
          setTimeout(() => {
            setShowCelebration(false);
            onComplete?.();
          }, 2000);
        }
      }
    }

    setCheckedItems(newChecked);
  };

  // Determine which items are already completed from progress
  const isItemCompleted = (itemId: string) => {
    if (itemId === "watch-training") return trainingWatched;
    if (itemId === "complete-worksheet") return worksheetCompleted;
    if (itemId === "post-progress") return progressPosted;
    return checkedItems.has(itemId);
  };

  const completedCount = items.filter((item) =>
    isItemCompleted(item.id)
  ).length;
  const progressPercent = (completedCount / items.length) * 100;

  return (
    <div className="space-y-6">
      {/* Progress Bar */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Progress</span>
          <span className="font-medium">
            {completedCount}/{items.length} complete
          </span>
        </div>
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-accent rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progressPercent}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        </div>
      </div>

      {/* Checklist Items */}
      <ul className="space-y-3">
        {items.map((item, i) => {
          const isCompleted = isItemCompleted(item.id);

          return (
            <motion.li
              key={item.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className={cn(
                "flex items-start gap-3 p-4 rounded-lg border transition-colors",
                isCompleted
                  ? "bg-success/5 border-success/20"
                  : "bg-card border-border hover:border-accent/30"
              )}
            >
              <Checkbox
                id={item.id}
                checked={isCompleted}
                onCheckedChange={() => handleCheck(item.id)}
                className="mt-0.5"
              />
              <label
                htmlFor={item.id}
                className="flex-1 cursor-pointer select-none"
              >
                <p
                  className={cn(
                    "font-medium",
                    isCompleted
                      ? "text-success line-through opacity-75"
                      : "text-foreground"
                  )}
                >
                  {item.label}
                </p>
                {item.description && (
                  <p className="text-sm text-muted-foreground mt-1">
                    {item.description}
                  </p>
                )}
              </label>
              {isCompleted && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="w-6 h-6 rounded-full bg-success flex items-center justify-center"
                >
                  <Check className="w-4 h-4 text-success-foreground" />
                </motion.div>
              )}
            </motion.li>
          );
        })}
      </ul>

      {/* Celebration Overlay */}
      <AnimatePresence>
        {showCelebration && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm"
          >
            <motion.div
              initial={{ y: 20 }}
              animate={{ y: 0 }}
              className="text-center"
            >
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 0.5 }}
              >
                <Sparkles className="w-16 h-16 text-accent mx-auto mb-4" />
              </motion.div>
              <h2 className="text-2xl font-display font-bold text-foreground mb-2">
                Day {day} Complete!
              </h2>
              <p className="text-muted-foreground">
                {day < 7
                  ? "You're ready for the next day."
                  : "You've completed the Sprint!"}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { IconCheck, IconX, IconArrowRight, IconHandFinger } from "@tabler/icons-react";
import type { DragDropStep as DragDropStepType } from "./types";

interface DragDropStepProps {
  step: DragDropStepType;
  onComplete: (result: Record<string, string[]>) => void;
}

interface DraggableItem {
  id: string;
  label: string;
  correctZone: string;
  currentZone: string | null;
  status: "pending" | "correct" | "incorrect";
}

export function DragDropStep({ step, onComplete }: DragDropStepProps) {
  const { content } = step;

  const [items, setItems] = useState<DraggableItem[]>(
    content.items.map((item) => ({
      ...item,
      currentZone: null,
      status: "pending" as const,
    }))
  );

  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const [allPlaced, setAllPlaced] = useState(false);

  const getZoneItems = (zoneId: string) =>
    items.filter((item) => item.currentZone === zoneId);

  const getUnplacedItems = () => items.filter((item) => item.currentZone === null);

  const selectedItem = items.find((i) => i.id === selectedItemId);

  // Handle selecting an item
  const handleSelectItem = (itemId: string) => {
    const item = items.find((i) => i.id === itemId);
    if (!item || item.status === "correct") return;

    if (selectedItemId === itemId) {
      // Deselect if already selected
      setSelectedItemId(null);
    } else {
      setSelectedItemId(itemId);
    }
  };

  // Handle placing item in a zone
  const handlePlaceInZone = (zoneId: string) => {
    if (!selectedItemId) return;

    const item = items.find((i) => i.id === selectedItemId);
    if (!item) return;

    const isCorrect = item.correctZone === zoneId;

    setItems((prev) => {
      const newItems = prev.map((i) => {
        if (i.id !== selectedItemId) return i;

        return {
          ...i,
          currentZone: zoneId,
          status: isCorrect ? ("correct" as const) : ("incorrect" as const),
        };
      });

      // Check if all items are correctly placed
      const allCorrect = newItems.every((i) => i.status === "correct");
      if (allCorrect) {
        setTimeout(() => setAllPlaced(true), 500);
      }

      return newItems;
    });

    setSelectedItemId(null);

    // Reset incorrect items after animation
    if (!isCorrect) {
      setTimeout(() => {
        setItems((prev) =>
          prev.map((i) => {
            if (i.id === selectedItemId && i.status === "incorrect") {
              return { ...i, currentZone: null, status: "pending" };
            }
            return i;
          })
        );
      }, 1000);
    }
  };

  const handleContinue = () => {
    const result: Record<string, string[]> = {};
    content.zones.forEach((zone) => {
      result[zone.id] = getZoneItems(zone.id).map((item) => item.id);
    });
    onComplete(result);
  };

  const unplacedItems = getUnplacedItems();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col items-center justify-center min-h-[60vh] px-4 py-6"
    >
      <div className="max-w-lg w-full">
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xl md:text-2xl font-bold text-neutral-900 dark:text-white mb-6 text-center"
        >
          {content.instruction}
        </motion.h2>

        {/* Instructions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-center mb-6"
        >
          {selectedItem ? (
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 rounded-full text-sm font-medium">
              <IconHandFinger className="w-4 h-4" />
              Now tap a category below
            </div>
          ) : unplacedItems.length > 0 ? (
            <p className="text-neutral-500 dark:text-neutral-400 text-sm">
              Tap an item to select it
            </p>
          ) : null}
        </motion.div>

        {/* Unplaced items */}
        <AnimatePresence>
          {unplacedItems.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mb-6"
            >
              <div className="flex flex-col gap-2">
                {unplacedItems.map((item, index) => (
                  <motion.button
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      scale: selectedItemId === item.id ? 1.02 : 1,
                    }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.2, delay: index * 0.03 }}
                    onClick={() => handleSelectItem(item.id)}
                    className={cn(
                      "w-full text-left px-4 py-3 rounded-xl font-medium transition-all",
                      selectedItemId === item.id
                        ? "bg-orange-500 text-white shadow-lg shadow-orange-500/25 ring-2 ring-orange-300"
                        : "bg-white dark:bg-neutral-800 border-2 border-neutral-200 dark:border-neutral-700 hover:border-orange-300 dark:hover:border-orange-600 text-neutral-700 dark:text-neutral-200"
                    )}
                  >
                    {item.label}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Drop zones */}
        <div className="grid grid-cols-1 gap-3">
          {content.zones.map((zone, index) => {
            const zoneItems = getZoneItems(zone.id);
            const isClickable = selectedItemId !== null;

            return (
              <motion.button
                key={zone.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                onClick={() => handlePlaceInZone(zone.id)}
                disabled={!isClickable}
                className={cn(
                  "rounded-xl border-2 p-4 text-left transition-all",
                  isClickable
                    ? "border-orange-400 bg-orange-50 dark:bg-orange-900/20 cursor-pointer hover:bg-orange-100 dark:hover:bg-orange-900/30"
                    : "border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900/50 cursor-default"
                )}
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-neutral-900 dark:text-white">
                    {zone.label}
                  </h3>
                  {isClickable && (
                    <span className="text-xs text-orange-600 dark:text-orange-400 font-medium">
                      Tap to place
                    </span>
                  )}
                </div>

                {/* Placed items in this zone */}
                <div className="space-y-2">
                  <AnimatePresence>
                    {zoneItems.map((item) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{
                          opacity: 1,
                          x: item.status === "incorrect" ? [0, -5, 5, -5, 5, 0] : 0,
                        }}
                        exit={{ opacity: 0, x: 10 }}
                        transition={{ duration: 0.3 }}
                        className={cn(
                          "flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium",
                          item.status === "correct" &&
                            "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300",
                          item.status === "incorrect" &&
                            "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300"
                        )}
                      >
                        {item.status === "correct" ? (
                          <IconCheck className="w-4 h-4 flex-shrink-0" />
                        ) : (
                          <IconX className="w-4 h-4 flex-shrink-0" />
                        )}
                        <span>{item.label}</span>
                      </motion.div>
                    ))}
                  </AnimatePresence>

                  {zoneItems.length === 0 && !isClickable && (
                    <p className="text-sm text-neutral-400 dark:text-neutral-500 italic">
                      No items yet
                    </p>
                  )}
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Success + Continue */}
        <AnimatePresence>
          {allPlaced && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 space-y-4"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 px-6 py-3 rounded-full font-medium text-center"
              >
                <IconCheck className="w-5 h-5 inline mr-2" />
                All sorted correctly!
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="flex justify-center"
              >
                <button
                  onClick={handleContinue}
                  className="group flex items-center gap-2 px-8 py-4 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 rounded-xl font-semibold text-lg transition-all hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
                >
                  Continue
                  <IconArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

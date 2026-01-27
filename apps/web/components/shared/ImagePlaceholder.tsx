"use client";

import { cn } from "@/lib/utils";

interface ImagePlaceholderProps {
  width?: number | string;
  height?: number | string;
  label?: string;
  aspectRatio?: "square" | "wide" | "tall" | "auto";
  className?: string;
}

/**
 * Image Placeholder Component
 * 
 * Displays a placeholder for missing images with consistent styling.
 */
export function ImagePlaceholder({
  width,
  height,
  label = "Image placeholder",
  aspectRatio = "auto",
  className,
}: ImagePlaceholderProps) {
  const aspectRatioClasses = {
    square: "aspect-square",
    wide: "aspect-video",
    tall: "aspect-[3/4]",
    auto: "",
  };

  const style: React.CSSProperties = {};
  if (width) style.width = typeof width === "number" ? `${width}px` : width;
  if (height) style.height = typeof height === "number" ? `${height}px` : height;

  return (
    <div
      className={cn(
        "flex items-center justify-center bg-muted border border-border rounded-lg",
        aspectRatioClasses[aspectRatio],
        className
      )}
      style={style}
      aria-label={label}
    >
      <div className="text-center p-4">
        <svg
          className="w-12 h-12 mx-auto mb-2 text-muted-foreground"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
        {label && (
          <p className="text-xs text-muted-foreground font-medium">{label}</p>
        )}
      </div>
    </div>
  );
}


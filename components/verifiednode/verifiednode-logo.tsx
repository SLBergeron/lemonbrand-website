"use client";

import { cn } from "@/lib/utils";

interface VerifiednodeLogoIconProps {
  className?: string;
  variant?: "dark" | "light";
}

export function VerifiednodeLogoIcon({ className, variant = "dark" }: VerifiednodeLogoIconProps) {
  const pathClass = variant === "light" ? "fill-white" : "fill-zinc-800 dark:fill-zinc-200";

  return (
    <svg className={className} viewBox="0 0 52 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g id="Icon">
        <path id="Rectangle 1" d="M14 0H26L38 48H26L14 0Z" className={pathClass} />
        <path id="Exclude" d="M52 0L40 48L34 24L40 0H52Z" className={pathClass} />
        <path id="Exclude_2" d="M0 48L12 0L18 24L12 48H0Z" fill="#9FC2B2" />
      </g>
    </svg>
  );
}

interface VerifiednodeLogoProps {
  className?: string;
  variant?: "dark" | "light";
  size?: "sm" | "md" | "lg";
}

export function VerifiednodeLogo({ className, variant = "dark", size = "md" }: VerifiednodeLogoProps) {
  const sizeClasses = {
    sm: "h-4 w-[17px]",
    md: "h-5 w-[21.67px]",
    lg: "h-6 w-[26px]",
  };

  const textSizeClasses = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base",
  };

  return (
    <div className={cn("relative flex items-center", className)}>
      <VerifiednodeLogoIcon variant={variant} className={sizeClasses[size]} />
      <div
        className={cn(
          "flex items-center gap-[1px] pl-[1px] font-light tracking-tight",
          textSizeClasses[size],
          variant === "dark" ? "text-zinc-800 dark:text-zinc-200" : "text-white"
        )}
      >
        <span className="shrink-0">Verif</span>
        <span className="shrink-0">ied Node</span>
      </div>
    </div>
  );
}

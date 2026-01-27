"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { HTMLAttributes, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

function OrbitalText({ coords }: { coords: { x: number; y: number } }) {
  const text = "TAP TO SHOW AUTOMATION";
  const radius = 45;
  const chars = text.split('');

  // 85% arc coverage, centered at top
  const startAngle = -Math.PI * 0.425; // Start position (top-left)
  const arcLength = Math.PI * 2 * 0.85; // 85% of full circle

  return (
    <motion.div
      className="pointer-events-none absolute z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, rotate: 360 }}
      exit={{ opacity: 0 }}
      transition={{
        opacity: { duration: 0.2 },
        rotate: {
          duration: 30,
          repeat: Infinity,
          ease: "linear",
        },
      }}
      style={{
        left: `${coords.x}px`,
        top: `${coords.y}px`,
      }}
    >
      {chars.map((char, i) => {
        const angle = startAngle + (i / chars.length) * arcLength;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;

        return (
          <span
            key={i}
            className="absolute text-[9px] font-medium uppercase tracking-wider text-neutral-400 dark:text-neutral-500"
            style={{
              left: `${x}px`,
              top: `${y}px`,
              transform: `translate(-50%, -50%) rotate(${(angle * 180) / Math.PI + 90}deg)`,
            }}
          >
            {char}
          </span>
        );
      })}
    </motion.div>
  );
}

type MaskContainerProps = {
  children?: ReactNode;
  revealText?: ReactNode;
  size?: number;
  revealSize?: number;
  className?: string;
  overlayClassName?: string;
  onRevealChange?: (isRevealed: boolean) => void;
} & HTMLAttributes<HTMLDivElement>;

export function MaskContainer({
  children,
  revealText,
  size = 24,
  revealSize = 640,
  className,
  overlayClassName,
  onRevealChange,
  ...rest
}: MaskContainerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);
  const [collapseCoords, setCollapseCoords] = useState<{ x: number; y: number } | null>(null);

  const updateCoords = useCallback((clientX: number, clientY: number) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = clientX - rect.left;
    const y = clientY - rect.top;
    setCoords({ x, y });
  }, []);

  useEffect(() => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    setCoords({ x: rect.width / 2, y: rect.height / 2 });
  }, []);

  const handlePointerEnter = (event: React.PointerEvent<HTMLDivElement>) => {
    // Touch devices will use tap to reveal directly, skip hover state
    if (event.pointerType === "touch") return;
    updateCoords(event.clientX, event.clientY);
    setIsHovering(true);
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    // Don't track touch movement, only mouse/pen
    if (event.pointerType === "touch") return;
    updateCoords(event.clientX, event.clientY);
    // Clear collapse coords when user moves cursor after collapsing
    if (collapseCoords) {
      setCollapseCoords(null);
    }
  };

  const handlePointerLeave = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "touch") return;
    setIsHovering(false);
  };

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const newRevealedState = !isRevealed;

    // If collapsing, store the click position for smooth collapse
    if (isRevealed) {
      const rect = containerRef.current?.getBoundingClientRect();
      if (rect) {
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        setCollapseCoords({ x, y });
        setCoords({ x, y });
      }
    } else {
      setCollapseCoords(null);
    }

    setIsRevealed(newRevealedState);
    onRevealChange?.(newRevealedState);
  };

  // Calculate clip-path based on reveal state
  // Use collapseCoords if we just collapsed, otherwise use current coords
  const activeCoords = collapseCoords || coords;
  const clipPath = isRevealed
    ? `circle(150% at ${coords.x}px ${coords.y}px)` // Fully revealed but still following cursor
    : isHovering
    ? `circle(${size / 2}px at ${activeCoords.x}px ${activeCoords.y}px)` // Peek hole following cursor
    : "circle(0px at 50% 50%)"; // Hidden when not hovering

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative cursor-pointer overflow-hidden",
        isHovering && !isRevealed && "shadow-2xl transition-shadow duration-300",
        className
      )}
      onPointerEnter={handlePointerEnter}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      onClick={handleClick}
      {...rest}
    >
      {/* Background layer - always visible */}
      <div className="relative z-0 h-full w-full">{revealText}</div>

      {/* Orbital rotating text - only show when hovering and not revealed */}
      <AnimatePresence>
        {isHovering && !isRevealed && (
          <OrbitalText coords={coords} />
        )}
      </AnimatePresence>

      {/* Video overlay with clip-path reveal */}
      <div
        className={cn("absolute inset-0 z-10", overlayClassName)}
        style={{
          clipPath,
          WebkitClipPath: clipPath,
          transition: isRevealed
            ? "clip-path 0.8s cubic-bezier(0.25, 0.1, 0.25, 1)"
            : "none",
        }}
      >
        {children}
      </div>
    </div>
  );
}

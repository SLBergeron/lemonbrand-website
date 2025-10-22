"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { HTMLAttributes, ReactNode } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

type MaskContainerProps = {
  children?: ReactNode;
  revealText?: ReactNode;
  size?: number;
  revealSize?: number;
  className?: string;
  overlayClassName?: string;
  maskImage?: string;
  onRevealChange?: (isRevealed: boolean) => void;
} & HTMLAttributes<HTMLDivElement>;

export function MaskContainer({
  children,
  revealText,
  size = 24,
  revealSize = 640,
  className,
  overlayClassName,
  maskImage = "/mask.svg",
  onRevealChange,
  ...rest
}: MaskContainerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);

  const updateCoords = useCallback((clientX: number, clientY: number) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = Math.min(Math.max(clientX - rect.left, 0), rect.width);
    const y = Math.min(Math.max(clientY - rect.top, 0), rect.height);
    setCoords({ x, y });
  }, []);

  useEffect(() => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    setCoords({ x: rect.width / 2, y: rect.height / 2 });
  }, []);

  const handlePointerEnter = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "touch") return;
    updateCoords(event.clientX, event.clientY);
    setIsHovering(true);
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    updateCoords(event.clientX, event.clientY);
  };

  const handlePointerLeave = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "touch") return;
    setIsHovering(false);
  };

  const handleClick = () => {
    const newRevealedState = !isRevealed;
    setIsRevealed(newRevealedState);
    onRevealChange?.(newRevealedState);
  };

  const maskSize = isRevealed ? revealSize : size;
  const maskPositionX = coords.x - maskSize / 2;
  const maskPositionY = coords.y - maskSize / 2;

  return (
    <div
      ref={containerRef}
      className={cn("relative overflow-hidden cursor-pointer", className)}
      onPointerEnter={handlePointerEnter}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      onClick={handleClick}
      {...rest}
    >
      <div className="relative z-0 h-full w-full">{revealText}</div>

      {/* Cursor tooltip - only show when hovering and not revealed */}
      {isHovering && !isRevealed && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.15, ease: "easeOut" }}
          className="pointer-events-none absolute z-50 rounded-md bg-white/90 px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-orange-500 shadow-lg backdrop-blur-sm dark:bg-neutral-900/90 dark:text-orange-400"
          style={{
            left: `${coords.x}px`,
            top: `${coords.y + 20}px`,
            transform: "translateX(-50%)",
          }}
        >
          Tap to show automation
        </motion.div>
      )}

      <motion.div
        className={cn(
          "pointer-events-none absolute inset-0 flex h-full w-full items-center justify-center [mask-repeat:no-repeat]",
          overlayClassName
        )}
        style={{
          WebkitMaskImage: `url(${maskImage})`,
          maskImage: `url(${maskImage})`,
          WebkitMaskPosition: `${maskPositionX}px ${maskPositionY}px`,
          maskPosition: `${maskPositionX}px ${maskPositionY}px`,
          WebkitMaskSize: `${maskSize}px`,
          maskSize: `${maskSize}px`,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          opacity: { duration: 0.2, ease: "easeOut" },
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}

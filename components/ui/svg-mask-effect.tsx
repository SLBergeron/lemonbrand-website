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
} & HTMLAttributes<HTMLDivElement>;

export function MaskContainer({
  children,
  revealText,
  size = 24,
  revealSize = 640,
  className,
  overlayClassName,
  maskImage = "/mask.svg",
  ...rest
}: MaskContainerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isActive, setIsActive] = useState(false);

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
    setIsActive(true);
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "touch") return;
    updateCoords(event.clientX, event.clientY);
  };

  const handlePointerLeave = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "touch") return;
    setIsActive(false);
  };

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "touch") return;
    updateCoords(event.clientX, event.clientY);
    setIsActive(true);
  };

  const handlePointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "touch") return;
    setIsActive(false);
  };

  const maskSize = isActive ? revealSize : size;
  const maskPositionX = coords.x - maskSize / 2;
  const maskPositionY = coords.y - maskSize / 2;

  return (
    <div
      ref={containerRef}
      className={cn("relative overflow-hidden", className)}
      onPointerEnter={handlePointerEnter}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      {...rest}
    >
      <div className="relative z-0 h-full w-full">{revealText}</div>
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
          opacity: isActive ? 1 : 0,
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

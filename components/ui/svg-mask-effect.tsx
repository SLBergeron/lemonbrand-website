"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { HTMLAttributes, ReactNode } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

function OrbitalText({ coords }: { coords: { x: number; y: number } }) {
  const text = "TAP TO SHOW AUTOMATION";
  const radius = 45;
  const chars = text.split('');

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
        const angle = (i / chars.length) * 2 * Math.PI;
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

      {/* Orbital rotating text - only show when hovering and not revealed */}
      {isHovering && !isRevealed && (
        <OrbitalText coords={coords} />
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
          transition: 'mask-size 0.4s ease-in-out, -webkit-mask-size 0.4s ease-in-out, mask-position 0.2s ease-out, -webkit-mask-position 0.2s ease-out',
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

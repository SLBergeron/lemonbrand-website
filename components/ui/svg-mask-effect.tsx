"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { HTMLAttributes, ReactNode } from "react";
import { motion } from "motion/react";
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
    console.log('Mask clicked, revealing:', newRevealedState);
    setIsRevealed(newRevealedState);
    onRevealChange?.(newRevealedState);
  };

  // Mask stays at fixed size, content scales inside
  const maskPositionX = coords.x - size / 2;
  const maskPositionY = coords.y - size / 2;

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative overflow-hidden cursor-pointer transition-shadow duration-300",
        isHovering && !isRevealed && "shadow-2xl",
        className
      )}
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

      <div
        className={cn(
          "pointer-events-none absolute inset-0 flex h-full w-full items-center justify-center [mask-repeat:no-repeat]",
          overlayClassName
        )}
        style={{
          WebkitMaskImage: `url(${maskImage})`,
          maskImage: `url(${maskImage})`,
          WebkitMaskPosition: `${maskPositionX}px ${maskPositionY}px`,
          maskPosition: `${maskPositionX}px ${maskPositionY}px`,
          WebkitMaskSize: `${size}px`,
          maskSize: `${size}px`,
        }}
      >
        <motion.div
          className="h-full w-full flex items-center justify-center"
          initial={{ scale: 1 }}
          animate={{ scale: isRevealed ? revealSize / size : 1 }}
          transition={{
            duration: 0.4,
            ease: "easeInOut",
          }}
        >
          {children}
        </motion.div>
      </div>
    </div>
  );
}

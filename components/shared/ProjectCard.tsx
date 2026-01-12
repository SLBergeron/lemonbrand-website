"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import Image from "next/image";

// Project images with subtle rotation variance only
const projectImages: Record<string, { image: string; rotation: number }> = {
  "Recipe Tracker": {
    image: "/assets/3dicons/3dicons-cup-dynamic-color.png",
    rotation: 3,
  },
  "Workout Logger": {
    image: "/assets/3dicons/3dicons-gym-dynamic-color.png",
    rotation: -2,
  },
  "Goal-Setting System": {
    image: "/assets/3dicons/3dicons-target-dynamic-color.png",
    rotation: 4,
  },
  "Renovation Planner": {
    image: "/assets/3dicons/3dicons-roll-brush-dynamic-color.png",
    rotation: -3,
  },
  "New Year's Letter System": {
    image: "/assets/3dicons/3dicons-copy-dynamic-color.png",
    rotation: 2,
  },
  "Document-to-Spreadsheet Scripts": {
    image: "/assets/3dicons/3dicons-calculator-dynamic-color.png",
    rotation: -4,
  },
  "Custom Dashboards": {
    image: "/assets/3dicons/3dicons-chart-dynamic-color.png",
    rotation: 3,
  },
};

interface ProjectCardProps {
  title: string;
  description: string;
  time?: string;
  highlight?: boolean;
  category?: string;
  image?: string;
  onClick?: () => void;
  className?: string;
}

/**
 * Standardized Project Card Component
 *
 * Displays project information with varied 3D image overlays for visual interest.
 */
export function ProjectCard({
  title,
  description,
  time,
  highlight = false,
  category,
  image: customImage,
  onClick,
  className,
}: ProjectCardProps) {
  const Component = onClick ? motion.div : "div";
  const motionProps = onClick
    ? {
        whileHover: { y: -2 },
        whileTap: { y: 0 },
        transition: { duration: 0.2 },
        onClick,
        className: "cursor-pointer",
      }
    : {};

  const projectData = projectImages[title];
  const image = customImage || projectData?.image;
  const rotation = projectData?.rotation || 3;

  if (highlight) {
    return (
      <Component
        {...motionProps}
        className={cn(
          "bg-primary text-primary-foreground rounded-lg p-6",
          className
        )}
      >
        {category && (
          <p className="text-xs uppercase tracking-wider text-primary-foreground/70 mb-2">
            {category}
          </p>
        )}
        <h3 className="font-semibold text-xl mb-2">{title}</h3>
        <p className="text-primary-foreground/80 mb-4">{description}</p>
        {time && (
          <div className="flex gap-6 text-sm">
            <span>{time}</span>
          </div>
        )}
      </Component>
    );
  }

  // Variants for coordinated hover animation
  const containerVariants = {
    initial: { y: 0 },
    hover: { y: -4 },
  };

  const imageVariants = {
    initial: { rotate: rotation, scale: 1 },
    hover: { rotate: rotation + 3, scale: 1.08 },
  };

  return (
    <motion.div
      className={cn("h-full relative", className)}
      initial="initial"
      whileHover="hover"
      transition={{ duration: 0.2 }}
      variants={containerVariants}
    >
      {/* 3D Image overlay - expands and rotates with card on hover */}
      {image && (
        <motion.div
          className="absolute -top-6 right-0 sm:-top-8 sm:-right-4 z-20 w-16 h-16 sm:w-24 sm:h-24 origin-center"
          initial={{ rotate: 0, scale: 0.9, opacity: 0 }}
          whileInView={{ rotate: rotation, scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          variants={imageVariants}
          transition={{ duration: 0.2 }}
        >
          <Image
            src={image}
            alt={title}
            fill
            className="object-contain drop-shadow-xl"
            unoptimized
          />
        </motion.div>
      )}

      <Card className={cn(
        "h-full p-5 transition-shadow duration-200 hover:shadow-lg hover:border-accent/30",
        image && "pt-10 sm:pt-12"
      )}>
        {category && (
          <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">
            {category}
          </p>
        )}
        <h3 className="font-semibold mb-2">{title}</h3>
        <p className="text-sm text-muted-foreground mb-3">{description}</p>
        {time && (
          <p className="text-xs text-muted-foreground">Time: {time}</p>
        )}
      </Card>
    </motion.div>
  );
}


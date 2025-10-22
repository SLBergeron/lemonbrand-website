"use client";
import React from "react";
import { cn } from "@/lib/utils";

type Phase = {
  id: string;
  number: string;
  name: string;
  description: string;
  staticImage?: string;
  hoverImage?: string;
};

const phases: Phase[] = [
  {
    id: "discover",
    number: "01",
    name: "Discover",
    description: "Deep-dive into operations. Identify automation opportunities. Define success metrics.",
    // staticImage: "/assets/discover-static.jpg", // TODO: Add images
    // hoverImage: "/assets/discover-hover.gif",
  },
  {
    id: "design",
    number: "02",
    name: "Design",
    description: "Custom system architecture. Integration planning. Technical specifications.",
    // staticImage: "/assets/design-static.jpg",
    // hoverImage: "/assets/design-hover.gif",
  },
  {
    id: "deploy",
    number: "03",
    name: "Deploy",
    description: "Done-with-you build. Seamless integration. Team training and launch support.",
    // staticImage: "/assets/deploy-static.jpg",
    // hoverImage: "/assets/deploy-hover.gif",
  },
  {
    id: "optimize",
    number: "04",
    name: "Optimize",
    description: "Performance monitoring. Regular optimization sprints. Scale successful workflows.",
    // staticImage: "/assets/optimize-static.jpg",
    // hoverImage: "/assets/optimize-hover.gif",
  },
];

export function Pricing() {
  return (
    <div
      id="pricing"
      className="relative isolate bg-white dark:bg-neutral-950 w-full px-4 py-20 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-bold text-3xl md:text-4xl text-neutral-800 dark:text-neutral-100">
            The 4D System
          </h2>
          <p className="max-w-2xl mx-auto text-base text-neutral-600 dark:text-neutral-400 mt-4">
            Discover. Design. Deploy. Optimize. From first call to measurable impact.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {phases.map((phase) => (
            <ProcessCard key={phase.id} phase={phase} />
          ))}
        </div>
      </div>
    </div>
  );
}

const ProcessCard = ({ phase }: { phase: Phase }) => {
  return (
    <div
      className={cn(
        "group w-full cursor-pointer overflow-hidden relative h-96 rounded-xl shadow-lg",
        "border border-neutral-200 dark:border-neutral-800",
        "bg-neutral-100 dark:bg-neutral-900",
        // Static background - will be replaced with actual image
        "bg-cover bg-center",
        // Hover effect - will show GIF
        "transition-all duration-500 ease-in-out",
        "hover:shadow-2xl hover:scale-[1.02]"
      )}
      style={{
        backgroundImage: phase.staticImage ? `url(${phase.staticImage})` : 'none',
      }}
    >
      {/* Hover overlay */}
      <div className="absolute inset-0 bg-neutral-600/0 group-hover:bg-neutral-600/40 transition-all duration-500 z-10" />

      {/* Content */}
      <div className="relative z-20 h-full flex flex-col justify-end p-6">
        <div className="transform transition-all duration-300 group-hover:translate-y-[-8px]">
          <span className="text-5xl font-bold text-neutral-300 dark:text-neutral-600 group-hover:text-white transition-colors">
            {phase.number}
          </span>
          <h3 className="font-bold text-2xl text-neutral-800 dark:text-white mt-2">
            {phase.name}
          </h3>
          <p className="text-sm text-neutral-600 dark:text-neutral-300 mt-3 opacity-90">
            {phase.description}
          </p>
        </div>
      </div>
    </div>
  );
};

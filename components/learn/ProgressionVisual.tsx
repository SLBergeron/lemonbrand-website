"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const programs = [
  {
    id: "sprint",
    name: "SPRINT",
    duration: "7 days",
    price: "$297",
    tagline: "Prove it",
    icon: "/assets/3dicons/3dicons-flash-dynamic-color.png",
    href: "/sprint",
    color: "accent",
  },
  {
    id: "8-week",
    name: "8-WEEK",
    duration: "8 weeks",
    price: "$997+",
    tagline: "Master it",
    icon: "/assets/3dicons/3dicons-calender-dynamic-color.png",
    href: "/8-week",
    color: "primary",
  },
  {
    id: "club",
    name: "CLUB",
    duration: "Ongoing",
    price: "$97/mo",
    tagline: "Maintain it",
    icon: "/assets/3dicons/3dicons-trophy-dynamic-color.png",
    href: "/club",
    color: "success",
  },
];

export function ProgressionVisual() {
  return (
    <div className="relative">
      {/* Desktop: Horizontal layout with arrows */}
      <div className="hidden md:flex items-center justify-center gap-4">
        {programs.map((program, index) => (
          <div key={program.id} className="flex items-center">
            <Link href={program.href} className="group">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.15, duration: 0.5 }}
                viewport={{ once: true }}
                className="bg-card border border-border rounded-xl p-6 w-48 text-center hover:border-accent/50 hover:shadow-lg transition-all duration-300"
              >
                <div className="w-16 h-16 mx-auto mb-3 relative">
                  <Image
                    src={program.icon}
                    alt={program.name}
                    fill
                    className="object-contain group-hover:scale-110 transition-transform duration-300"
                    unoptimized
                  />
                </div>
                <h3 className="font-display font-semibold text-lg tracking-wider mb-1">
                  {program.name}
                </h3>
                <p className="text-sm text-muted-foreground mb-2">
                  {program.duration}
                </p>
                <p className="font-semibold text-foreground">{program.price}</p>
                <p className="text-xs text-accent mt-2 italic">
                  &ldquo;{program.tagline}&rdquo;
                </p>
              </motion.div>
            </Link>
            {index < programs.length - 1 && (
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.15 + 0.3, duration: 0.3 }}
                viewport={{ once: true }}
                className="mx-4"
              >
                <ArrowRight className="w-8 h-8 text-muted-foreground/50" />
              </motion.div>
            )}
          </div>
        ))}
      </div>

      {/* Mobile: Vertical layout */}
      <div className="md:hidden space-y-4">
        {programs.map((program, index) => (
          <div key={program.id} className="flex flex-col items-center">
            <Link href={program.href} className="group w-full">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
                viewport={{ once: true }}
                className="bg-card border border-border rounded-xl p-5 flex items-center gap-4 hover:border-accent/50 hover:shadow-lg transition-all duration-300"
              >
                <div className="w-14 h-14 relative shrink-0">
                  <Image
                    src={program.icon}
                    alt={program.name}
                    fill
                    className="object-contain group-hover:scale-110 transition-transform duration-300"
                    unoptimized
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-display font-semibold tracking-wider">
                    {program.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {program.duration} &middot; {program.price}
                  </p>
                  <p className="text-xs text-accent italic mt-1">
                    &ldquo;{program.tagline}&rdquo;
                  </p>
                </div>
                <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-accent group-hover:translate-x-1 transition-all" />
              </motion.div>
            </Link>
            {index < programs.length - 1 && (
              <div className="h-8 w-px bg-border my-2" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

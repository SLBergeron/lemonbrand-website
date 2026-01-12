"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { FeatureCard } from "@/components/shared/FeatureCard";

interface CallToActionProps {
  title: string;
  description: string;
  primaryCtaText: string;
  primaryCtaLink: string;
  secondaryCtaText?: string;
  secondaryCtaLink?: string;
  benefits?: string[];
  className?: string;
  spotlightColor?: string;
  canvasColors?: number[][];
  radius?: number;
}

export function CallToAction({
  title,
  description,
  primaryCtaText,
  primaryCtaLink,
  secondaryCtaText,
  secondaryCtaLink,
  benefits,
  className,
  spotlightColor,
  canvasColors,
  radius,
}: CallToActionProps) {
  return (
    <FeatureCard 
      className={cn("bg-card relative overflow-hidden border-2 p-0", className)}
      spotlightColor={spotlightColor}
      canvasColors={canvasColors}
      radius={radius}
    >
      {/* Abstract Background Gradient */}
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-accent/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 lg:grid-rows-[auto_auto] gap-4 sm:gap-6 lg:gap-8 p-4 sm:p-6 md:p-8 lg:p-12 items-center">
        <div className="lg:col-span-2 lg:row-span-2 space-y-4 sm:space-y-6 text-center lg:text-left">
          <div className="space-y-2">
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-foreground">
              {title}
            </h2>
            <div className="h-1 w-16 sm:w-20 bg-accent rounded-full mx-auto lg:mx-0" />
          </div>

          <p className="text-muted-foreground text-base sm:text-lg md:text-xl max-w-2xl leading-relaxed">
            {description}
          </p>
          
          {benefits && (
            <div className="flex flex-wrap gap-x-8 gap-y-3 justify-center lg:justify-start pt-4">
              {benefits.map((benefit, i) => (
                <div key={i} className="flex items-center gap-2.5 text-sm md:text-base text-muted-foreground/80 font-medium">
                  <Check className="w-5 h-5 text-success" />
                  <span>{benefit}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <Button variant="accent" size="lg" className="w-full h-12 sm:h-14 px-6 sm:px-8 shadow-lg shadow-accent/20 lg:self-end whitespace-normal text-center" asChild>
          <Link href={primaryCtaLink}>
            {primaryCtaText}
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2 shrink-0" />
          </Link>
        </Button>

        {secondaryCtaText && secondaryCtaLink && (
          <Button variant="outline" size="lg" className="w-full h-12 sm:h-14 px-6 sm:px-8 border-2 hover:bg-accent/5 transition-colors lg:self-start whitespace-normal text-center" asChild>
            <Link href={secondaryCtaLink}>
              {secondaryCtaText}
            </Link>
          </Button>
        )}
      </div>
    </FeatureCard>
  );
}

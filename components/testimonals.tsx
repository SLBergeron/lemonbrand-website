"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { FaQuoteLeft } from "react-icons/fa";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

export function TestimonialsMasonryGrid() {
  return (
    <div className="py-20 bg-white dark:bg-neutral-950">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="mb-16 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
            Client Success
          </p>
          <h2
            id="reviews-title"
            className={cn(
              "mt-4 font-sans text-xl font-bold tracking-tight text-neutral-800 dark:text-neutral-100 md:text-4xl"
            )}
          >
            Systems that actually deliver
          </h2>
          <p
            className={cn(
              "mx-auto mt-4 max-w-2xl text-base text-neutral-600 dark:text-neutral-400"
            )}
          >
            Here&apos;s what happens when AI automation meets real business problems.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.name}>
              <Quote>{testimonial.quote}</Quote>
              <div className="flex gap-4 items-center justify-between mt-8">
                <div className="flex gap-3 items-center">
                  <Image
                    src={testimonial.src}
                    alt={testimonial.name}
                    width={48}
                    height={48}
                    className="rounded-full object-cover"
                  />
                  <div className="flex flex-col">
                    <QuoteDescription className="font-semibold text-neutral-900 dark:text-neutral-100">
                      {testimonial.name}
                    </QuoteDescription>
                    <QuoteDescription className="text-xs">
                      {testimonial.designation}
                    </QuoteDescription>
                  </div>
                </div>
                {testimonial.website && (
                  <Link
                    href={testimonial.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-xs font-medium text-accent hover:text-accent/80 transition-colors whitespace-nowrap"
                  >
                    View website
                    <ArrowUpRight className="h-3 w-3" />
                  </Link>
                )}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
export const Card = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "p-8 rounded-xl border border-transparent relative bg-white dark:border-[rgba(255,255,255,0.10)] dark:bg-[rgba(40,40,40,0.30)] shadow-[0_1px_1px_rgba(0,0,0,0.05),0_4px_6px_rgba(34,42,53,0.04),0_24px_68px_rgba(47,48,55,0.05),0_2px_3px_rgba(0,0,0,0.04)] dark:shadow-[2px_4px_16px_0px_rgba(248,248,248,0.06)_inset] group",
        className
      )}
    >
      <FaQuoteLeft className="absolute top-2 left-2 text-neutral-300" />
      {children}
    </div>
  );
};

export const Quote = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <h3
      className={cn(
        "text-base font-normal dark:text-white text-black py-2 relative",
        className
      )}
    >
      {children}
    </h3>
  );
};

export const QuoteDescription = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <p
      className={cn(
        "text-xs font-normal dark:text-neutral-400 text-neutral-600 max-w-sm",
        className
      )}
    >
      {children}
    </p>
  );
};

interface Testimonial {
  src: string;
  quote: string;
  name: string;
  designation?: string;
  website?: string;
}

export const testimonials: Testimonial[] = [
  {
    name: "Managing Director, HR & I.T. Services",
    quote:
      "Simon built HR automations that saved us 10 hours a week, integrated our ERP systems seamlessly, and grew our TikTok from zero to 2 million views. The workflow systems he created actually run themselves now.",
    src: "/assets/testimonials/Val.avif",
    designation: "St-Albert Cheese",
    website: "https://fromagestalbert.webflow.io",
  },
  {
    name: "Cécile de Cormis, Managing Director",
    quote:
      "Simon automated my entire business workflow when I launched. From client intake to invoicing, everything runs without me touching it. Got my first assignment closed in 3 days instead of the 3 weeks I expected.",
    src: "/assets/testimonials/cecile.avif",
    designation: "Cormis Consulting",
    website: "https://cormisconsulting.com",
  },
  {
    name: "Eric Little, CEO",
    quote:
      "Simon's results-first approach transformed our entire pitch strategy. He rebuilt our deck to focus on outcomes instead of features, and the difference was immediate. We raised over $20M in funding with investors who finally understood our value.",
    src: "/assets/testimonials/eric.png",
    designation: "Edison Motors",
    website: "https://edisonmotors.ca",
  },
  {
    name: "Ben Gelineau, Owner",
    quote:
      "Simon built a lead funnel that turned my $70k business into $230k in 2 years. The automations handle bookings, payments, and follow-ups while I focus on training. I save 20 hours a week on admin.",
    src: "/assets/testimonials/ben.avif",
    designation: "Gym Express",
    website: "https://gymexpress.net",
  },
];

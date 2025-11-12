"use client";

import { cn } from "@/lib/utils";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export function About() {
  return (
    <div
      id="about"
      className="w-full mx-auto bg-neutral-50 dark:bg-neutral-900 py-20 px-4 md:px-8"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Image Side */}
          <div className="flex flex-col items-center">
            <div className="relative w-full max-w-[300px] md:max-w-[350px] aspect-[2/3] rounded-2xl overflow-hidden bg-neutral-200 dark:bg-neutral-800">
              <Image
                src="/assets/Profile_updated_tall.webp"
                alt="Simon Bergeron"
                fill
                className="object-cover"
              />
            </div>
            <p className="text-center text-sm text-neutral-400 dark:text-neutral-500 mt-4">
              Based in Canada 🍁
            </p>
          </div>

          {/* Bio Side */}
          <div className="flex flex-col justify-center">
            <h2 className="font-bold text-3xl md:text-4xl text-neutral-800 dark:text-neutral-100 mb-4">
              Direct operators. Real systems.
            </h2>
            <div className="space-y-4 text-neutral-600 dark:text-neutral-300">
              <p>
                <strong className="text-neutral-800 dark:text-neutral-100">We&apos;re Simon and the team.</strong> We build systems that grow revenue for contractors. AI automation for revenue capture. Websites for contractors who don&apos;t have one yet. No agency overhead. No account managers. Just us designing, building, and deploying what works.
              </p>
              <p>
                Design background. Developer skills. AI implementation experience across sales, marketing, and ops. We&apos;ve generated $1.7M+ in revenue from missed calls in the last 6 months for our contractor clients.
              </p>
              <p>
                We work directly with contractors and operators who want bespoke systems installed fast. Done-with-you builds. Real integration work. Measurable results.
              </p>
              <p className="text-sm">
                We&apos;re currently working on CodeBrain,{" "}
                <a
                  href="https://yourcodebrain.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-800 dark:text-neutral-100 underline hover:text-neutral-600 dark:hover:text-neutral-300 transition-colors"
                >
                  learn more here
                </a>
                . We also launched{" "}
                <a
                  href="https://getmywebsite.io"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-800 dark:text-neutral-100 underline hover:text-neutral-600 dark:hover:text-neutral-300 transition-colors"
                >
                  GetMyWebsite.io
                </a>
                {" "}for contractors who need a website.
              </p>
            </div>

            {/* Logos */}
            <div className="mt-8">
              <div className="text-sm text-neutral-500 dark:text-neutral-500 uppercase tracking-wider mb-4">
                Alumni & Community
              </div>
              <div className="flex items-center gap-8">
                {/* Y Combinator */}
                <div className="relative h-12 w-32">
                  <Image
                    src="/logos/ycombinator.svg"
                    alt="Y Combinator"
                    width="128"
                    height="48"
                    className="h-12 w-auto object-contain opacity-60 grayscale transition-all hover:opacity-100 hover:grayscale-0"
                  />
                </div>

                {/* Maker School */}
                <div className="relative h-12 w-32">
                  {/* Light mode logo */}
                  <Image
                    src="/logos/MakerSchool.png"
                    alt="Maker School"
                    width="128"
                    height="48"
                    className="h-12 w-auto object-contain opacity-60 grayscale transition-all hover:opacity-100 hover:grayscale-0 dark:hidden"
                  />
                  {/* Dark mode logo */}
                  <Image
                    src="/logos/MakerSchool_Dark.png"
                    alt="Maker School"
                    width="128"
                    height="48"
                    className="hidden h-12 w-auto object-contain opacity-60 grayscale transition-all hover:opacity-100 hover:grayscale-0 dark:block"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

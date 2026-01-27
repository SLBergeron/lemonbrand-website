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
              Serial Entrepreneur. AI Builder. Teaching What I Learn.
            </h2>
            <div className="space-y-4 text-neutral-600 dark:text-neutral-300">
              <p>
                <strong className="text-neutral-800 dark:text-neutral-100">I&apos;m Simon.</strong> I build AI businesses and share everything I learn. Designer turned developer turned AI entrepreneur. I escaped the consulting trap by building productized systems that generate revenue without burning out.
              </p>
              <p>
                Currently building{" "}
                <a
                  href="https://getmywebsite.io"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-800 dark:text-neutral-100 underline hover:text-neutral-600 dark:hover:text-neutral-300 transition-colors"
                >
                  GetMyWebsite.io
                </a>
                {" "}(productized websites for trades, launched in one week),{" "}
                <a
                  href="https://yourcodebrain.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-800 dark:text-neutral-100 underline hover:text-neutral-600 dark:hover:text-neutral-300 transition-colors"
                >
                  CodeBrain
                </a>
                {" "}(AI coding assistant), and modular AI agent systems. All documented in real-time.
              </p>
              <p>
                I teach agency owners and entrepreneurs how to build AI businesses that actually make money. No fluff. No theory. Just practical systems, implementation guides, and honest breakdowns of what works and what doesn&apos;t.
              </p>
              <p className="text-sm">
                Looking for websites or AI automation? Check out{" "}
                <a
                  href="https://getmywebsite.io"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-800 dark:text-neutral-100 underline hover:text-neutral-600 dark:hover:text-neutral-300 transition-colors"
                >
                  GetMyWebsite.io
                </a>
                {" "}instead. This site is for people who want to learn how to build these systems themselves.
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

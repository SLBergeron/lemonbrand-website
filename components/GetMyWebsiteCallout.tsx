"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";

export function GetMyWebsiteCallout() {
  return (
    <div className="w-full bg-neutral-50 dark:bg-neutral-900 py-20 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Container with same styling as other sections */}
        <div className="relative isolate rounded-2xl bg-white dark:bg-neutral-900 shadow-[0_1px_1px_rgba(0,0,0,0.05),0_4px_6px_rgba(34,42,53,0.04),0_24px_68px_rgba(47,48,55,0.05),0_2px_3px_rgba(0,0,0,0.04)] overflow-hidden">
          {/* Two-column grid layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            {/* Image Side */}
            <div className="relative w-full h-[300px] md:h-[400px] flex items-center justify-center bg-neutral-100 dark:bg-neutral-800 rounded-lg overflow-hidden">
              <Image
                src="/assets/get-my-website.png"
                alt="GetMyWebsite.io - Professional websites for contractors"
                fill
                className="object-contain p-4"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>

            {/* Content Side */}
            <div className="p-8 md:p-12 md:pr-16">
              <div className="inline-block px-3 py-1 mb-4 text-xs font-semibold text-orange-600 dark:text-orange-400 bg-orange-100 dark:bg-orange-900/30 rounded-full">
                NEW LAUNCH
              </div>
              <h2 className="text-2xl md:text-4xl font-bold text-neutral-800 dark:text-neutral-100 mb-4">
                Need a website first?
              </h2>
              <p className="text-base text-neutral-600 dark:text-neutral-300 mb-6">
                Professional contractor website. Template-based, mobile-optimized, live in 48 hours. No monthly fees. Just $249 one-time.
              </p>
              <Link
                href="https://getmywebsite.io"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-black bg-white shadow-lg ring-1 ring-black/10 rounded-sm hover:bg-neutral-100 transition-colors dark:bg-white dark:text-black dark:ring-white/10 dark:hover:bg-neutral-200"
              >
                Get Your Website
              </Link>
              <p className="mt-4 text-sm text-neutral-500 dark:text-neutral-400">
                Perfect for contractors who don&apos;t have a website yet.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

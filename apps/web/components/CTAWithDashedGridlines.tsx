"use client";
import React from "react";
import Link from "next/link";

export function CTAWithDashedGridLines() {
  return (
    <div className="w-full bg-white dark:bg-neutral-950 py-20 px-4 md:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Container with same styling as Features cards */}
        <div className="relative isolate rounded-2xl bg-white dark:bg-neutral-900 shadow-[0_1px_1px_rgba(0,0,0,0.05),0_4px_6px_rgba(34,42,53,0.04),0_24px_68px_rgba(47,48,55,0.05),0_2px_3px_rgba(0,0,0,0.04)] overflow-hidden p-12 md:p-16">
          {/* Dashed Grid Background - only inside container */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808004_1px,transparent_1px),linear-gradient(to_bottom,#80808001_1px,transparent_1px)] bg-[size:4px_4px]"></div>

          {/* Content */}
          <div className="relative z-10 text-center">
            <h2 className="text-3xl md:text-5xl font-bold text-neutral-800 dark:text-neutral-100 mb-6">
              Want to Build AI Businesses That Actually Generate Revenue?
            </h2>
            <p className="text-base md:text-lg text-neutral-600 dark:text-neutral-300 mb-8 max-w-2xl mx-auto">
              Join agency owners and entrepreneurs getting weekly insights, free templates, and behind-the-scenes breakdowns of what I&apos;m building. No theory. Just practical systems that work.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/templates"
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-orange-500 to-yellow-500 rounded-lg hover:from-orange-600 hover:to-yellow-600 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Get Free Templates
              </Link>
              <Link
                href="/projects"
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-neutral-800 dark:text-neutral-100 bg-white dark:bg-neutral-800 rounded-lg hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-all duration-200 shadow-md hover:shadow-lg ring-1 ring-neutral-200 dark:ring-neutral-700"
              >
                See What I&apos;m Building
              </Link>
            </div>
            <p className="mt-6 text-sm text-neutral-500 dark:text-neutral-400">
              New templates every month. Real builds documented in public.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

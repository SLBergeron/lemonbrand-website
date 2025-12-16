"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { IconArrowRight } from "@tabler/icons-react";

export default function SarahLetterPage() {
  const { data: session, isPending } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session && !isPending) {
      router.push("/sarah/dashboard");
    }
  }, [session, isPending, router]);

  return (
    <main className="min-h-screen bg-[#faf8f5] dark:bg-neutral-950 selection:bg-orange-500/20">
      {/* Paper texture overlay */}
      <div className="fixed inset-0 opacity-[0.015] pointer-events-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbHRlcj0idXJsKCNhKSIvPjwvc3ZnPg==')]" />

      <div className="relative max-w-2xl mx-auto px-6 py-16 md:py-24">
        {/* The Letter */}
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="bg-white dark:bg-neutral-900 rounded-sm shadow-xl shadow-neutral-200/50 dark:shadow-none border border-neutral-200/50 dark:border-neutral-800"
        >
          {/* Letter content */}
          <div className="p-8 md:p-12 lg:p-16">
            {/* Date */}
            <p className="text-sm text-neutral-400 dark:text-neutral-500 mb-8 font-mono">
              December 16, 2025
            </p>

            {/* Greeting */}
            <p className="text-2xl md:text-3xl text-neutral-800 dark:text-neutral-200 mb-8 font-serif italic">
              Dear Sarah,
            </p>

            {/* Letter body */}
            <div className="space-y-6 text-neutral-600 dark:text-neutral-400 leading-relaxed text-lg font-serif">
              <p>
                It was so good reconnecting last month. I couldn&apos;t stop thinking about our conversation—new role, new year, new chapter heading into 2026.
              </p>

              <p>
                A transition like this is huge. New team, new responsibilities, new expectations. And on top of all that, there&apos;s this constant drumbeat of <em>&ldquo;you need to figure out AI.&rdquo;</em>
              </p>

              <p>
                Here&apos;s what I want you to know: <strong className="text-neutral-800 dark:text-neutral-200">you&apos;re not behind.</strong>
              </p>

              <p>
                95% of AI pilots at companies fail. Not because the technology doesn&apos;t work—but because people lack clarity on what they&apos;re actually trying to achieve. They open ChatGPT, type something vague, get a mediocre response, and close the tab.
              </p>

              <p>
                The hard part of using AI isn&apos;t using AI. It&apos;s sitting down and thinking: <em>What am I actually trying to do here?</em>
              </p>

              <p>
                You already know how to get clear on processes—what works, what doesn&apos;t, how to coach a team. That skill transfers directly. New role, same superpower.
              </p>

              <p>
                I put something together for you. Six short lessons—about 25 minutes total. No jargon. No tool comparisons. Just the mental models you need to actually get value from AI as you step into this new chapter.
              </p>

              <p>
                Think of AI like a smart intern on your new team. Eager, fast, capable—but needs clear direction. If you can explain something well enough to train a junior employee, you can use AI effectively. That&apos;s the whole skill.
              </p>

              <p>
                By the end, you&apos;ll have:
              </p>

              <ul className="list-none space-y-2 pl-4 border-l-2 border-orange-200 dark:border-orange-800">
                <li>A mental model that makes AI click</li>
                <li>Your first documented process (ready to automate)</li>
                <li>A simple framework for picking the right tool</li>
                <li>A 3-day action plan for your new role</li>
              </ul>

              <p>
                No pressure. No deadlines. Just whenever you have 25 minutes and want one less thing to figure out during this transition.
              </p>

              <p>
                I think you&apos;ll find it&apos;s simpler than you thought. And I&apos;m really glad we&apos;re back in touch.
              </p>
            </div>

            {/* Signature */}
            <div className="mt-12 pt-8 border-t border-neutral-100 dark:border-neutral-800">
              <p className="text-neutral-600 dark:text-neutral-400 font-serif text-lg mb-2">
                Warmly,
              </p>
              <p className="text-2xl font-serif italic text-neutral-800 dark:text-neutral-200">
                Simon Bergeron
              </p>
              <p className="text-sm text-neutral-400 dark:text-neutral-500 mt-1">
                LemonBrand
              </p>
            </div>
          </div>

          {/* CTA at bottom of letter */}
          <div className="px-8 md:px-12 lg:px-16 pb-8 md:pb-12 lg:pb-16">
            <Link
              href="/sarah/login"
              className="group flex items-center justify-center gap-3 w-full bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 py-4 rounded-lg font-medium text-lg transition-all hover:bg-neutral-800 dark:hover:bg-neutral-100"
            >
              Start the first lesson
              <IconArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <p className="text-center text-sm text-neutral-400 dark:text-neutral-500 mt-4">
              ~25 minutes total &middot; 6 lessons &middot; completely free
            </p>
          </div>
        </motion.article>

        {/* Footer */}
        <footer className="mt-12 text-center text-sm text-neutral-400 dark:text-neutral-600">
          © {new Date().getFullYear()} LemonBrand
        </footer>
      </div>
    </main>
  );
}

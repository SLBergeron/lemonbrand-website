"use client";
import Link from "next/link";
import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import { AnimatePresence, motion } from "framer-motion";
import { IconMenu } from "@tabler/icons-react";
import rehypeSlug from "rehype-slug";

interface TocLink {
  title: string;
  href: string;
}

interface LegalContentProps {
  title: string;
  lastUpdated: string;
  tldr: string[];
  content: string;
  tocLinks: TocLink[];
}

export function LegalContentWithToc({
  title,
  lastUpdated,
  tldr,
  content,
  tocLinks,
}: LegalContentProps) {
  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-4 py-20 md:flex-row md:px-8">
      <Toc links={tocLinks} />
      <div className="flex max-w-3xl flex-1 flex-col">
        <h1 className="mb-2 text-4xl font-bold tracking-tight text-black dark:text-white">
          {title}
        </h1>
        <p className="mb-8 text-sm text-neutral-600 dark:text-neutral-400">
          Last Updated: {lastUpdated}
        </p>

        {/* TL;DR Callout */}
        <div className="mb-12 rounded-2xl border-2 border-orange-500/20 bg-orange-50 dark:bg-orange-950/20 p-6">
          <h2 className="mb-4 text-xl font-bold text-orange-600 dark:text-orange-400">
            TL;DR - The Short Version
          </h2>
          <ul className="space-y-2">
            {tldr.map((item, index) => (
              <li
                key={index}
                className="flex items-start text-neutral-700 dark:text-neutral-300"
              >
                <span className="mr-2 mt-1 text-orange-500">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="legal-content">
          <ReactMarkdown rehypePlugins={[rehypeSlug]}>{content}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
}

const Toc = ({ links }: { links: TocLink[] }) => {
  const [hovered, setHovered] = useState<number | null>(null);
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Desktop TOC */}
      <div className="sticky left-0 top-20 hidden max-w-xs flex-col self-start pr-10 md:flex">
        {links.map((link, index) => (
          <Link
            className="group/toc-link relative rounded-lg px-2 py-1 text-sm text-neutral-700 dark:text-neutral-200"
            key={link.href}
            href={link.href}
            onMouseEnter={() => setHovered(index)}
            onMouseLeave={() => setHovered(null)}
          >
            {hovered === index && (
              <motion.span
                layoutId="toc-indicator"
                className="absolute left-0 top-0 h-full w-1 rounded-br-full rounded-tr-full bg-neutral-200 dark:bg-neutral-700"
              />
            )}
            <span className="inline-block transition duration-200 group-hover/toc-link:translate-x-1">
              {link.title}
            </span>
          </Link>
        ))}
      </div>

      {/* Mobile TOC */}
      <div className="sticky right-2 top-20 flex w-full flex-col items-end justify-end self-start md:hidden">
        <button
          onClick={() => setOpen(!open)}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm dark:bg-neutral-900"
        >
          <IconMenu className="h-6 w-6 text-black dark:text-white" />
        </button>
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="mt-2 flex flex-col items-end rounded-3xl border border-neutral-100 bg-white p-4 dark:border-neutral-700 dark:bg-neutral-900"
            >
              {links.map((link, index) => (
                <Link
                  className="group/toc-link relative rounded-lg px-2 py-1 text-right text-sm text-neutral-700 dark:text-neutral-200"
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  onMouseEnter={() => setHovered(index)}
                  onMouseLeave={() => setHovered(null)}
                >
                  {hovered === index && (
                    <motion.span
                      layoutId="toc-indicator-mobile"
                      className="absolute left-0 top-0 h-full w-1 rounded-br-full rounded-tr-full bg-neutral-200 dark:bg-neutral-700"
                    />
                  )}
                  <span className="inline-block transition duration-200 group-hover/toc-link:translate-x-1">
                    {link.title}
                  </span>
                </Link>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

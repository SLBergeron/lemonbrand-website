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
        <h1 className="mb-2 text-4xl font-display font-bold tracking-tight text-foreground">
          {title}
        </h1>
        <p className="mb-8 text-sm text-muted-foreground">
          Last Updated: {lastUpdated}
        </p>

        {/* TL;DR Callout */}
        <div className="mb-12 rounded-2xl border border-accent/20 bg-accent/5 p-6">
          <h2 className="mb-4 text-xl font-bold text-accent">
            TL;DR - The Short Version
          </h2>
          <ul className="space-y-2">
            {tldr.map((item, index) => (
              <li
                key={index}
                className="flex items-start text-foreground/80"
              >
                <span className="mr-2 mt-1 text-accent">•</span>
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
      <div className="sticky left-0 top-24 hidden max-w-xs flex-col self-start pr-10 md:flex">
        {links.map((link, index) => (
          <Link
            className="group/toc-link relative rounded-lg px-2 py-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
            key={link.href}
            href={link.href}
            onMouseEnter={() => setHovered(index)}
            onMouseLeave={() => setHovered(null)}
          >
            {hovered === index && (
              <motion.span
                layoutId="toc-indicator"
                className="absolute left-0 top-0 h-full w-1 rounded-br-full rounded-tr-full bg-accent"
              />
            )}
            <span className="inline-block transition duration-200 group-hover/toc-link:translate-x-1">
              {link.title}
            </span>
          </Link>
        ))}
      </div>

      {/* Mobile TOC */}
      <div className="sticky right-2 top-20 flex w-full flex-col items-end justify-end self-start md:hidden z-40">
        <button
          onClick={() => setOpen(!open)}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-background shadow-md border border-border"
        >
          <IconMenu className="h-6 w-6 text-foreground" />
        </button>
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="mt-2 flex flex-col items-end rounded-xl border border-border bg-card p-4 shadow-xl"
            >
              {links.map((link, index) => (
                <Link
                  className="group/toc-link relative rounded-lg px-2 py-1 text-right text-sm text-muted-foreground hover:text-foreground"
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  onMouseEnter={() => setHovered(index)}
                  onMouseLeave={() => setHovered(null)}
                >
                  {hovered === index && (
                    <motion.span
                      layoutId="toc-indicator-mobile"
                      className="absolute left-0 top-0 h-full w-1 rounded-br-full rounded-tr-full bg-accent"
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
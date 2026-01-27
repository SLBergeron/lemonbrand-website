"use client";

import { DetailsSection, DetailsBlock } from "@/lib/lessons/types";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, Play, Image as ImageIcon, RotateCcw } from "lucide-react";
import { useState, useRef } from "react";
import { cn } from "@lemonbrand/ui";
import ReactMarkdown from "react-markdown";

interface Props {
  section: DetailsSection;
}

function VideoPlayer({ src, label }: { src: string; label: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [ended, setEnded] = useState(false);

  const handleReplay = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
      setEnded(false);
    }
  };

  const handleClick = () => {
    if (ended) {
      handleReplay();
    }
  };

  return (
    <div className="my-4">
      <div
        className={cn(
          "relative rounded-lg overflow-hidden",
          ended && "cursor-pointer"
        )}
        onClick={handleClick}
      >
        <video
          ref={videoRef}
          src={src}
          className="aspect-video w-full object-cover"
          autoPlay
          muted
          playsInline
          onEnded={() => setEnded(true)}
          onPlay={() => setEnded(false)}
        />
        <AnimatePresence>
          {ended && (
            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.15 }}
              onClick={handleReplay}
              className="absolute bottom-3 left-3 size-8 rounded-full bg-background/80 backdrop-blur-sm border border-border/50 flex items-center justify-center hover:bg-background transition-colors"
            >
              <RotateCcw className="size-3.5 text-foreground" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
      <p className="text-xs text-muted-foreground text-center mt-2">
        {label}
      </p>
    </div>
  );
}

export function DetailsSectionComponent({ section }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const renderBlock = (block: DetailsBlock, index: number) => {
    if (block.type === "text") {
      return (
        <div key={index} className="prose-lesson text-[15px] text-muted-foreground">
          <ReactMarkdown
            components={{
              p: ({ children }) => <p className="my-3">{children}</p>,
              strong: ({ children }) => (
                <strong className="font-semibold text-foreground">
                  {children}
                </strong>
              ),
              a: ({ href, children }) => (
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent hover:underline"
                >
                  {children}
                </a>
              ),
            }}
          >
            {block.content}
          </ReactMarkdown>
        </div>
      );
    }

    if (block.type === "aside") {
      return (
        <div
          key={index}
          className="my-6 py-4 px-4 border-l-2 border-accent/40 bg-accent/5 rounded-r-lg"
        >
          <p className="text-xs font-medium uppercase tracking-wider text-accent mb-2">
            {block.title}
          </p>
          <div className="prose-lesson text-[14px] text-muted-foreground">
            <ReactMarkdown
              components={{
                p: ({ children }) => <p className="my-2">{children}</p>,
                strong: ({ children }) => (
                  <strong className="font-semibold text-foreground">
                    {children}
                  </strong>
                ),
                a: ({ href, children }) => (
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent hover:underline"
                  >
                    {children}
                  </a>
                ),
              }}
            >
              {block.content}
            </ReactMarkdown>
          </div>
        </div>
      );
    }

    // Now block is narrowed to DetailsMediaBlock (video | image)
    const isPlaceholder = block.placeholder || !block.src;

    if (isPlaceholder) {
      return (
        <div
          key={index}
          className="aspect-video rounded-lg bg-muted/30 border border-border/50 flex flex-col items-center justify-center my-4"
        >
          <div className="size-10 rounded-full bg-muted/50 flex items-center justify-center mb-2">
            {block.type === "video" ? (
              <Play className="size-4 text-muted-foreground ml-0.5" />
            ) : (
              <ImageIcon className="size-4 text-muted-foreground" />
            )}
          </div>
          <p className="text-xs text-muted-foreground">{block.label}</p>
        </div>
      );
    }

    if (block.type === "video") {
      return <VideoPlayer key={index} src={block.src!} label={block.label} />;
    }

    return (
      <div key={index} className="my-4">
        <img
          src={block.src}
          alt={block.label}
          className="aspect-video rounded-lg w-full object-cover"
        />
        <p className="text-xs text-muted-foreground text-center mt-2">
          {block.label}
        </p>
      </div>
    );
  };

  return (
    <div className="mt-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ChevronRight
          className={cn(
            "size-3.5 transition-transform",
            isOpen && "rotate-90"
          )}
        />
        <span className="underline underline-offset-2 decoration-border group-hover:decoration-foreground/50">
          {section.trigger}
        </span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="pt-4 pl-5 border-l border-border/50 ml-1.5 mt-3 space-y-2">
              {section.blocks.map((block, i) => renderBlock(block, i))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

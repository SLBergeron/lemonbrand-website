"use client";

import { useState } from "react";
import { cn } from "@lemonbrand/ui";
import { Check, Copy, Apple, Monitor } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@lemonbrand/ui";
import { useOS, type OS } from "@/hooks/useOS";

interface CodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
  macCode?: string;
  windowsCode?: string;
  showLineNumbers?: boolean;
  className?: string;
}

export function CodeBlock({
  code,
  language = "bash",
  filename,
  macCode,
  windowsCode,
  showLineNumbers = false,
  className,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const { os, setOS } = useOS();

  const hasOSVariants = macCode && windowsCode;
  const activeOS = os === "unknown" || os === "linux" ? "mac" : os;

  const copyToClipboard = async (text: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const renderCode = (codeText: string) => {
    const lines = codeText.split("\n");

    return (
      <pre
        className={cn(
          "overflow-x-auto p-4 text-sm font-mono bg-card rounded-lg border border-border",
          className
        )}
      >
        <code>
          {lines.map((line, i) => (
            <div key={i} className="flex">
              {showLineNumbers && (
                <span className="select-none text-muted-foreground w-8 shrink-0 text-right pr-4">
                  {i + 1}
                </span>
              )}
              <span className="flex-1">{line}</span>
            </div>
          ))}
        </code>
      </pre>
    );
  };

  if (hasOSVariants) {
    return (
      <div className="relative my-6">
        <Tabs value={activeOS} onValueChange={(v) => setOS(v as OS)}>
          {/* Header with tabs and copy button */}
          <div className="flex items-center justify-between bg-muted/50 border border-border border-b-0 rounded-t-lg px-4 py-2">
            <div className="flex items-center gap-2">
              {filename && (
                <span className="text-sm text-muted-foreground font-mono">
                  {filename}
                </span>
              )}
              <TabsList className="h-7 bg-transparent p-0">
                <TabsTrigger value="mac" className="h-6 text-xs gap-1 px-2">
                  <Apple className="size-3" />
                  Mac
                </TabsTrigger>
                <TabsTrigger value="windows" className="h-6 text-xs gap-1 px-2">
                  <Monitor className="size-3" />
                  Windows
                </TabsTrigger>
              </TabsList>
            </div>
            <button
              onClick={() =>
                copyToClipboard(activeOS === "mac" ? macCode : windowsCode)
              }
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Copy code"
            >
              {copied ? (
                <Check className="size-4 text-success" />
              ) : (
                <Copy className="size-4" />
              )}
            </button>
          </div>

          <TabsContent value="mac" className="mt-0">
            <pre
              className={cn(
                "overflow-x-auto p-4 text-sm font-mono bg-card rounded-b-lg border border-border border-t-0",
                className
              )}
            >
              <code>{macCode}</code>
            </pre>
          </TabsContent>

          <TabsContent value="windows" className="mt-0">
            <pre
              className={cn(
                "overflow-x-auto p-4 text-sm font-mono bg-card rounded-b-lg border border-border border-t-0",
                className
              )}
            >
              <code>{windowsCode}</code>
            </pre>
          </TabsContent>
        </Tabs>
      </div>
    );
  }

  // Single code block (no OS variants)
  return (
    <div className="relative my-6">
      {/* Header */}
      <div className="flex items-center justify-between bg-muted/50 border border-border border-b-0 rounded-t-lg px-4 py-2">
        <span className="text-sm text-muted-foreground font-mono">
          {filename || language}
        </span>
        <button
          onClick={() => copyToClipboard(code)}
          className="text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Copy code"
        >
          {copied ? (
            <Check className="size-4 text-success" />
          ) : (
            <Copy className="size-4" />
          )}
        </button>
      </div>

      {/* Code */}
      <pre
        className={cn(
          "overflow-x-auto p-4 text-sm font-mono bg-card rounded-b-lg border border-border border-t-0",
          className
        )}
      >
        <code>{code}</code>
      </pre>
    </div>
  );
}

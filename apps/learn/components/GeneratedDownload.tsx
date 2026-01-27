"use client";

import { useState } from "react";
import { Button, cn } from "@lemonbrand/ui";
import { Download, Check, FileText, Copy } from "lucide-react";

interface GeneratedDownloadProps {
  filename: string;
  content: string;
  title?: string;
  description?: string;
  className?: string;
}

export function GeneratedDownload({
  filename,
  content,
  title,
  description,
  className,
}: GeneratedDownloadProps) {
  const [copied, setCopied] = useState(false);

  const handleDownload = () => {
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Get file extension for icon styling
  const ext = filename.split(".").pop()?.toLowerCase();
  const isMd = ext === "md";

  return (
    <div
      className={cn(
        "border border-border rounded-lg overflow-hidden",
        className
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-muted/50">
        <div className="flex items-center gap-3">
          <div
            className={cn(
              "size-10 rounded-lg flex items-center justify-center shrink-0",
              isMd ? "bg-primary/10 text-primary" : "bg-accent/10 text-accent"
            )}
          >
            <FileText className="size-5" />
          </div>
          <div>
            <div className="font-display font-semibold text-sm">
              {title || filename}
            </div>
            {description && (
              <div className="text-xs text-muted-foreground">{description}</div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={handleCopy}
            title="Copy to clipboard"
          >
            {copied ? (
              <Check className="size-4 text-success" />
            ) : (
              <Copy className="size-4" />
            )}
          </Button>
          <Button variant="outline" size="sm" onClick={handleDownload}>
            <Download className="size-4 mr-2" />
            Download
          </Button>
        </div>
      </div>

      {/* Preview */}
      <div className="max-h-64 overflow-y-auto p-4 bg-card">
        <pre className="text-sm font-mono whitespace-pre-wrap text-muted-foreground">
          {content.length > 1000
            ? content.slice(0, 1000) + "\n\n... (content truncated in preview)"
            : content}
        </pre>
      </div>
    </div>
  );
}

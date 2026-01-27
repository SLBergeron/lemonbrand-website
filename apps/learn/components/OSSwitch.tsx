"use client";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@lemonbrand/ui";
import { useOS, type OS } from "@/hooks/useOS";
import { Apple, Monitor } from "lucide-react";

interface OSSwitchProps {
  macContent: React.ReactNode;
  windowsContent: React.ReactNode;
  className?: string;
}

export function OSSwitch({ macContent, windowsContent, className }: OSSwitchProps) {
  const { os, setOS } = useOS();

  // Default to mac if unknown
  const activeOS = os === "unknown" || os === "linux" ? "mac" : os;

  return (
    <Tabs
      value={activeOS}
      onValueChange={(value) => setOS(value as OS)}
      className={className}
    >
      <TabsList className="mb-4">
        <TabsTrigger value="mac" className="gap-2">
          <Apple className="size-4" />
          Mac
        </TabsTrigger>
        <TabsTrigger value="windows" className="gap-2">
          <Monitor className="size-4" />
          Windows
        </TabsTrigger>
      </TabsList>

      <TabsContent value="mac">{macContent}</TabsContent>
      <TabsContent value="windows">{windowsContent}</TabsContent>
    </Tabs>
  );
}

"use client";

import { ReactNode, useState } from "react";
import { SprintSidebar, SidebarExpandButton } from "@/components/SprintSidebar";
import { MobileNav } from "@/components/MobileNav";
import { AchievementProvider } from "@/context/AchievementContext";
import { cn } from "@lemonbrand/ui";

export default function SprintLayout({ children }: { children: ReactNode }) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <AchievementProvider>
    <div className="min-h-screen bg-background">
      {/* Desktop sidebar - hidden on mobile */}
      <SprintSidebar
        className="hidden lg:flex"
        isCollapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
      />

      {/* Expand button when collapsed */}
      {sidebarCollapsed && (
        <SidebarExpandButton
          onClick={() => setSidebarCollapsed(false)}
          className="hidden lg:flex"
        />
      )}

      {/* Main content area - centered full-width when sidebar collapsed */}
      <main
        className={cn(
          "transition-all duration-300 ease-out",
          sidebarCollapsed ? "lg:pl-0" : "lg:pl-56"
        )}
      >
        <div
          className={cn(
            "mx-auto px-6 py-10 lg:py-16",
            sidebarCollapsed ? "max-w-2xl" : "max-w-2xl"
          )}
        >
          {children}
        </div>
      </main>

      {/* Mobile bottom navigation */}
      <MobileNav className="lg:hidden" />
    </div>
    </AchievementProvider>
  );
}

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  IconHome,
  IconBook,
  IconTrophy,
  IconUser,
} from "@tabler/icons-react";

const navItems = [
  {
    label: "Home",
    href: "/sarah/dashboard",
    icon: IconHome,
  },
  {
    label: "Modules",
    href: "/sarah/dashboard/modules",
    icon: IconBook,
  },
  {
    label: "Badges",
    href: "/sarah/dashboard/achievements",
    icon: IconTrophy,
  },
  {
    label: "Profile",
    href: "/sarah/dashboard/settings",
    icon: IconUser,
  },
];

export function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-neutral-900 border-t border-neutral-200 dark:border-neutral-800 md:hidden z-50">
      <div
        className="flex items-center justify-around"
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      >
        {navItems.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== "/sarah/dashboard" &&
              pathname.startsWith(item.href));

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center gap-1 py-3 px-4 min-w-[72px] transition-colors",
                isActive
                  ? "text-orange-500"
                  : "text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300"
              )}
            >
              <item.icon
                className={cn("w-6 h-6", isActive && "drop-shadow-glow")}
              />
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useAuth } from "../providers/auth-provider";
import { useProgress } from "../providers/progress-provider";
import { signOut } from "@/lib/auth-client";
import {
  IconHome,
  IconBook,
  IconTrophy,
  IconSettings,
  IconLogout,
  IconSparkles,
  IconFlame,
} from "@tabler/icons-react";

const navItems = [
  {
    label: "Dashboard",
    href: "/sarah/dashboard",
    icon: IconHome,
  },
  {
    label: "Modules",
    href: "/sarah/dashboard/modules",
    icon: IconBook,
  },
  {
    label: "Achievements",
    href: "/sarah/dashboard/achievements",
    icon: IconTrophy,
  },
  {
    label: "Settings",
    href: "/sarah/dashboard/settings",
    icon: IconSettings,
  },
];

export function Sidebar({ className }: { className?: string }) {
  const pathname = usePathname();
  const { user } = useAuth();
  const { totalXP, currentStreak } = useProgress();

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <aside
      className={cn(
        "w-64 bg-white dark:bg-neutral-900 border-r border-neutral-200 dark:border-neutral-800 flex flex-col",
        className
      )}
    >
      {/* Logo/Brand */}
      <div className="p-6 border-b border-neutral-200 dark:border-neutral-800">
        <Link href="/sarah/dashboard" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-yellow-500 flex items-center justify-center">
            <IconSparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="font-semibold text-neutral-900 dark:text-white">
              AI Journey
            </h1>
            <p className="text-xs text-neutral-500">For Sarah</p>
          </div>
        </Link>
      </div>

      {/* Stats */}
      <div className="p-4 border-b border-neutral-200 dark:border-neutral-800">
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-neutral-50 dark:bg-neutral-800 rounded-xl p-3">
            <div className="flex items-center gap-2 text-orange-500 mb-1">
              <IconSparkles className="w-4 h-4" />
              <span className="text-xs font-medium">XP</span>
            </div>
            <p className="text-lg font-bold text-neutral-900 dark:text-white">
              {totalXP.toLocaleString()}
            </p>
          </div>
          <div className="bg-neutral-50 dark:bg-neutral-800 rounded-xl p-3">
            <div className="flex items-center gap-2 text-orange-500 mb-1">
              <IconFlame className="w-4 h-4" />
              <span className="text-xs font-medium">Streak</span>
            </div>
            <p className="text-lg font-bold text-neutral-900 dark:text-white">
              {currentStreak} days
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {navItems.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== "/sarah/dashboard" &&
                pathname.startsWith(item.href));

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-xl transition-all",
                    isActive
                      ? "bg-gradient-to-r from-orange-500 to-yellow-500 text-white shadow-lg shadow-orange-500/25"
                      : "text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                  )}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* User section */}
      <div className="p-4 border-t border-neutral-200 dark:border-neutral-800">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-yellow-500 flex items-center justify-center text-white font-semibold">
            {user?.name?.[0] || "S"}
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-medium text-neutral-900 dark:text-white truncate">
              {user?.name || "Sarah"}
            </p>
            <p className="text-xs text-neutral-500 truncate">{user?.email}</p>
          </div>
        </div>
        <button
          onClick={handleSignOut}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
        >
          <IconLogout className="w-4 h-4" />
          <span className="text-sm">Sign Out</span>
        </button>
      </div>
    </aside>
  );
}

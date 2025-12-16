"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import { ProgressProvider } from "@/components/sarah/providers/progress-provider";
import { Sidebar } from "@/components/sarah/navigation/sidebar";
import { MobileNav } from "@/components/sarah/navigation/mobile-nav";
import { TopBar } from "@/components/sarah/navigation/top-bar";
import { IconLoader2 } from "@tabler/icons-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, isPending } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!isPending && !session) {
      router.push("/sarah/login");
    }
  }, [session, isPending, router]);

  // Show loading while checking auth
  if (isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-50 dark:bg-neutral-950">
        <div className="flex flex-col items-center gap-4">
          <IconLoader2 className="w-8 h-8 text-orange-500 animate-spin" />
          <p className="text-neutral-600 dark:text-neutral-400">Loading...</p>
        </div>
      </div>
    );
  }

  // Don't render dashboard if not authenticated
  if (!session) {
    return null;
  }

  return (
    <ProgressProvider>
      <div className="flex h-screen bg-neutral-50 dark:bg-neutral-950 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-orange-100 to-yellow-100 dark:from-orange-900/10 dark:to-yellow-900/10 rounded-full blur-3xl opacity-50 translate-x-1/3 -translate-y-1/4" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-blue-100 to-purple-100 dark:from-blue-900/10 dark:to-purple-900/10 rounded-full blur-3xl opacity-50 -translate-x-1/3 translate-y-1/4" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
        </div>

        {/* Desktop Sidebar */}
        <Sidebar className="hidden md:flex relative z-20" />

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden relative z-10">
          <TopBar />
          <main className="flex-1 overflow-y-auto p-4 md:p-8 pb-24 md:pb-8">
            <div className="max-w-7xl mx-auto w-full">
              {children}
            </div>
          </main>
        </div>

        {/* Mobile Bottom Nav */}
        <MobileNav />
      </div>
    </ProgressProvider>
  );
}

"use client";

import { ThemeProvider } from "next-themes";
import { ConvexProvider, ConvexReactClient, useMutation } from "convex/react";
import { ReactNode, useEffect, useRef } from "react";
import { Toaster } from "sonner";
import { useSession } from "@/lib/auth-client";
import { api } from "@lemonbrand/convex/client";

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

// Syncs Better Auth user to application users table
function UserSyncProvider({ children }: { children: ReactNode }) {
  const { data: session } = useSession();
  const syncFromAuth = useMutation(api.users.syncFromAuth);
  const hasSynced = useRef<string | null>(null);

  useEffect(() => {
    // Sync user when session is established
    if (session?.user?.id && session?.user?.email) {
      // Only sync once per user ID to avoid redundant calls
      if (hasSynced.current === session.user.id) return;

      hasSynced.current = session.user.id;

      syncFromAuth({
        betterAuthId: session.user.id,
        email: session.user.email,
        name: session.user.name || undefined,
        avatarUrl: session.user.image || undefined,
      }).catch((err) => {
        console.error("Failed to sync user:", err);
        // Reset so it can retry
        hasSynced.current = null;
      });
    }
  }, [session?.user?.id, session?.user?.email, session?.user?.name, session?.user?.image, syncFromAuth]);

  return <>{children}</>;
}

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ConvexProvider client={convex}>
      <UserSyncProvider>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster position="top-center" richColors />
        </ThemeProvider>
      </UserSyncProvider>
    </ConvexProvider>
  );
}

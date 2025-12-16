import { ConvexClientProvider } from "@/components/sarah/providers/convex-provider";
import { AuthProvider } from "@/components/sarah/providers/auth-provider";
import { Toaster } from "sonner";
import "@/app/globals.css";

// Force dynamic rendering - these pages need Convex/Auth at runtime
export const dynamic = "force-dynamic";

export const metadata = {
  title: "Sarah's AI Learning Journey | LemonBrand",
  description:
    "A personalized, gamified learning experience to master AI tools for marketing directors.",
  robots: "noindex, nofollow", // Keep private for Sarah
};

export default function SarahLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ConvexClientProvider>
      <AuthProvider>
        <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950">
          {children}
        </div>
        <Toaster
          position="top-center"
          toastOptions={{
            style: {
              background: "hsl(var(--background))",
              color: "hsl(var(--foreground))",
              border: "1px solid hsl(var(--border))",
            },
          }}
        />
      </AuthProvider>
    </ConvexClientProvider>
  );
}

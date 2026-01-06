import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

export default function ClientsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950">
      {/* Minimal header */}
      <header className="p-4 border-b border-neutral-200 dark:border-neutral-800">
        <Link
          href="/"
          className="text-sm text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200"
        >
          &larr; lemonbrand.io
        </Link>
      </header>

      {children}

      {/* Minimal footer */}
      <footer className="p-4 text-center text-sm text-neutral-500 dark:text-neutral-400 border-t border-neutral-200 dark:border-neutral-800">
        <p>Private client document</p>
      </footer>
    </div>
  );
}

import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/shared/Section";
import { CheckCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Unsubscribed | LemonBrand",
  description: "You have been unsubscribed from the LemonBrand newsletter.",
};

export default function UnsubscribePage() {
  return (
    <main className="pt-16">
      <Section className="py-24 sm:py-32">
        <div className="max-w-xl mx-auto text-center">
          <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-8">
            <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
          </div>

          <h1 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight mb-4">
            You&apos;ve been unsubscribed
          </h1>

          <p className="text-lg text-muted-foreground mb-8">
            You won&apos;t receive any more emails from me. If you change your mind,
            you can always subscribe again from the homepage.
          </p>

          <Button asChild>
            <Link href="/">
              Back to homepage
            </Link>
          </Button>
        </div>
      </Section>
    </main>
  );
}

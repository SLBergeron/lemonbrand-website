"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  ArrowRight,
  Shield,
  AlertTriangle,
  Check,
  X,
  Clock,
  DollarSign,
  Globe,
  FileText,
  Ban,
  Calendar,
  ExternalLink
} from "lucide-react";
import { Section } from "@/components/shared/Section";

interface ComplianceItem {
  id: string;
  requirement: string;
  description: string;
  penalty: string;
  icon: React.ElementType;
}

const complianceItems: ComplianceItem[] = [
  {
    id: "notification",
    requirement: "45-Day Interview Notification",
    description: "You notify applicants of hiring decisions within 45 days of their interview",
    penalty: "ESA violation - fines up to $50,000 for corporations",
    icon: Clock,
  },
  {
    id: "salary",
    requirement: "Salary Range Disclosure",
    description: "Your job postings include salary ranges with a maximum spread of $50,000",
    penalty: "ESA violation - required to be disclosed in all public postings",
    icon: DollarSign,
  },
  {
    id: "ai-disclosure",
    requirement: "AI Usage Disclosure",
    description: "You disclose when AI is used in the hiring process (in English and French)",
    penalty: "Applicants must be informed if AI screens or ranks their application",
    icon: Globe,
  },
  {
    id: "canadian-experience",
    requirement: "No Canadian Experience Requirement",
    description: "Your job postings do not require \"Canadian experience\"",
    penalty: "Explicit ban under new regulations - removes discriminatory barriers",
    icon: Ban,
  },
  {
    id: "record-retention",
    requirement: "3-Year Record Retention",
    description: "You maintain compliant records of all applications for 3 years",
    penalty: "Required for audit purposes - must include decision timelines",
    icon: FileText,
  },
];

export default function ComplianceCheckerContent() {
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

  const toggleItem = (id: string) => {
    setCheckedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const results = useMemo(() => {
    const total = complianceItems.length;
    const compliant = Object.values(checkedItems).filter(Boolean).length;
    const missing = total - compliant;
    const percentCompliant = Math.round((compliant / total) * 100);

    let status: "not-started" | "partial" | "compliant" | "at-risk";
    if (compliant === 0) status = "not-started";
    else if (compliant === total) status = "compliant";
    else if (compliant >= total - 1) status = "partial";
    else status = "at-risk";

    return { total, compliant, missing, percentCompliant, status };
  }, [checkedItems]);

  return (
    <main className="pt-16">
      {/* Hero */}
      <Section className="py-16 sm:py-24">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Shield className="w-4 h-4" />
            Free Compliance Tool
          </div>
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight mb-6">
            O. Reg. 476/24 Compliance Checker
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-4">
            Check if your hiring process meets Ontario&apos;s new Employment Standards Act requirements.
          </p>
          <div className="inline-flex items-center gap-2 bg-destructive/10 text-destructive px-4 py-2 rounded-lg text-sm font-medium">
            <Calendar className="w-4 h-4" />
            Effective January 1, 2026
          </div>
        </div>
      </Section>

      {/* Checker */}
      <section className="py-12 px-3 sm:px-4 bg-muted/30 border-y border-border/50">
        <div className="max-w-4xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Checklist */}
            <div className="lg:col-span-2 space-y-4">
              <h2 className="font-display text-xl font-semibold mb-6">
                Check each requirement you currently meet:
              </h2>

              {complianceItems.map((item) => {
                const Icon = item.icon;
                const isChecked = checkedItems[item.id] || false;

                return (
                  <div
                    key={item.id}
                    className={`bg-card rounded-lg border p-4 transition-colors ${
                      isChecked ? "border-success/50 bg-success/5" : "border-border"
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <Checkbox
                        id={item.id}
                        checked={isChecked}
                        onCheckedChange={() => toggleItem(item.id)}
                        className="mt-1"
                      />
                      <div className="flex-1">
                        <label
                          htmlFor={item.id}
                          className="flex items-center gap-2 font-display font-semibold cursor-pointer"
                        >
                          <Icon className={`w-4 h-4 ${isChecked ? "text-success" : "text-muted-foreground"}`} />
                          {item.requirement}
                        </label>
                        <p className="text-sm text-muted-foreground mt-1">
                          {item.description}
                        </p>
                        {!isChecked && (
                          <p className="text-xs text-destructive/80 mt-2 flex items-center gap-1">
                            <AlertTriangle className="w-3 h-3" />
                            {item.penalty}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Results */}
            <div className="lg:sticky lg:top-24 h-fit space-y-4">
              <div className={`rounded-lg border p-6 ${
                results.status === "compliant"
                  ? "bg-success/10 border-success/30"
                  : results.status === "at-risk"
                  ? "bg-destructive/10 border-destructive/30"
                  : "bg-card border-border"
              }`}>
                <div className="text-center mb-4">
                  {results.status === "compliant" ? (
                    <div className="w-16 h-16 bg-success/20 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Check className="w-8 h-8 text-success" />
                    </div>
                  ) : results.status === "at-risk" ? (
                    <div className="w-16 h-16 bg-destructive/20 rounded-full flex items-center justify-center mx-auto mb-3">
                      <X className="w-8 h-8 text-destructive" />
                    </div>
                  ) : (
                    <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-3">
                      <Shield className="w-8 h-8 text-muted-foreground" />
                    </div>
                  )}

                  <p className="font-display text-4xl font-bold mb-1">
                    {results.compliant}/{results.total}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Requirements met
                  </p>
                </div>

                <div className="space-y-2 text-sm">
                  {results.status === "compliant" && (
                    <p className="text-success text-center font-medium">
                      Your process appears compliant!
                    </p>
                  )}
                  {results.status === "partial" && (
                    <p className="text-accent text-center">
                      Almost there! {results.missing} item{results.missing !== 1 ? "s" : ""} to address.
                    </p>
                  )}
                  {results.status === "at-risk" && (
                    <p className="text-destructive text-center">
                      {results.missing} compliance gap{results.missing !== 1 ? "s" : ""} detected.
                    </p>
                  )}
                  {results.status === "not-started" && (
                    <p className="text-muted-foreground text-center">
                      Check off items to see your compliance status.
                    </p>
                  )}
                </div>
              </div>

              {results.missing > 0 && results.status !== "not-started" && (
                <div className="bg-card rounded-lg border border-border p-6">
                  <h3 className="font-display font-semibold mb-3">Automate Compliance</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    The Lemonbrand ATS handles all {results.total} requirements automatically.
                    No manual tracking, no missed deadlines.
                  </p>
                  <Button variant="accent" className="w-full" asChild>
                    <Link href="https://ats.lemonbrand.io" target="_blank" rel="noopener noreferrer">
                      See the ATS
                      <ExternalLink className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* What's Required */}
      <Section>
        <div className="max-w-3xl mx-auto">
          <h2 className="font-display text-2xl sm:text-3xl font-semibold tracking-tight mb-8 text-center">
            What O. Reg. 476/24 Requires
          </h2>

          <div className="prose prose-neutral dark:prose-invert max-w-none">
            <p>
              Ontario Regulation 476/24 amends the Employment Standards Act to introduce new requirements
              for employers hiring in Ontario. These rules take effect <strong>January 1, 2026</strong>.
            </p>

            <h3>Key Requirements</h3>
            <ul>
              <li>
                <strong>45-Day Notification:</strong> Employers must notify applicants of hiring decisions
                within 45 days of their interview. This applies to all interviewed candidates.
              </li>
              <li>
                <strong>Salary Transparency:</strong> Job postings must include expected salary or salary range.
                If a range is provided, the spread cannot exceed $50,000.
              </li>
              <li>
                <strong>AI Disclosure:</strong> If AI is used to screen, assess, or rank candidates,
                this must be disclosed in both English and French.
              </li>
              <li>
                <strong>Canadian Experience Ban:</strong> Employers cannot require &quot;Canadian experience&quot;
                as a job qualification.
              </li>
              <li>
                <strong>Record Keeping:</strong> Employers must maintain records of applications and
                hiring decisions for 3 years.
              </li>
            </ul>

            <h3>Penalties</h3>
            <p>
              Non-compliance can result in orders under the Employment Standards Act, including
              fines up to $50,000 for corporations. Individual officers and directors may also face penalties.
            </p>
          </div>
        </div>
      </Section>

      {/* CTA */}
      <Section className="py-16">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-display text-2xl sm:text-3xl font-semibold tracking-tight mb-4">
            Don&apos;t manage compliance manually
          </h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            The Lemonbrand ATS was built from the ground up for O. Reg. 476/24.
            Every feature exists to keep you compliant automatically.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="accent" size="lg" asChild>
              <Link href="https://ats.lemonbrand.io" target="_blank" rel="noopener noreferrer">
                See the ATS
                <ExternalLink className="w-4 h-4 ml-2" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/tools">
                All Tools
              </Link>
            </Button>
          </div>
        </div>
      </Section>

      {/* Back to Tools */}
      <Section className="py-12">
        <div className="text-center">
          <Link
            href="/tools"
            className="text-sm text-muted-foreground hover:text-accent transition-colors inline-flex items-center gap-2"
          >
            <ArrowRight className="w-4 h-4 rotate-180" />
            Back to all tools
          </Link>
        </div>
      </Section>
    </main>
  );
}

"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Check, X, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  { name: "Build something real", sprint: true, eightWeek: true, club: true },
  { name: "Daily/weekly training", sprint: true, eightWeek: true, club: false },
  { name: "Cohort community", sprint: true, eightWeek: true, club: true },
  { name: "Discord access", sprint: true, eightWeek: true, club: true },
  { name: "Ship Day demo", sprint: true, eightWeek: true, club: false },
  { name: "Database skills", sprint: false, eightWeek: true, club: false },
  { name: "Authentication", sprint: false, eightWeek: true, club: false },
  { name: "API integrations", sprint: false, eightWeek: true, club: false },
  { name: "Deployment", sprint: false, eightWeek: true, club: false },
  { name: "1-on-1 calls", sprint: false, eightWeek: "Tier dependent", club: false },
  { name: "Monthly challenges", sprint: false, eightWeek: false, club: true },
  { name: "Office hours", sprint: false, eightWeek: true, club: true },
  { name: "New patterns as AI evolves", sprint: false, eightWeek: false, club: true },
];

const programs = [
  {
    name: "7-Day Sprint",
    price: "$297",
    period: "one-time",
    description: "Build your first tool",
    href: "/sprint",
    highlight: false,
  },
  {
    name: "8-Week Program",
    price: "$997+",
    period: "starting at",
    description: "Master the full stack",
    href: "/8-week",
    highlight: true,
  },
  {
    name: "Builders Club",
    price: "$97",
    period: "/month",
    description: "Keep building",
    href: "/club",
    highlight: false,
  },
];

function FeatureValue({ value }: { value: boolean | string }) {
  if (typeof value === "string") {
    return <span className="text-xs text-muted-foreground">{value}</span>;
  }
  return value ? (
    <Check className="w-5 h-5 text-success mx-auto" />
  ) : (
    <X className="w-5 h-5 text-muted-foreground/30 mx-auto" />
  );
}

export function ComparisonTable() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="overflow-x-auto"
    >
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="text-left p-4 border-b border-border font-medium text-muted-foreground">
              Features
            </th>
            {programs.map((program) => (
              <th
                key={program.name}
                className={`p-4 border-b text-center ${
                  program.highlight
                    ? "border-accent/30 bg-accent/5"
                    : "border-border"
                }`}
              >
                <div className="space-y-1">
                  <p className="font-display font-semibold">{program.name}</p>
                  <p className="text-lg font-bold">{program.price}</p>
                  <p className="text-xs text-muted-foreground">{program.period}</p>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {features.map((feature, index) => (
            <tr key={feature.name} className="group">
              <td className="p-4 border-b border-border/50 text-sm text-muted-foreground group-hover:bg-muted/30 transition-colors">
                {feature.name}
              </td>
              <td className={`p-4 border-b border-border/50 text-center group-hover:bg-muted/30 transition-colors`}>
                <FeatureValue value={feature.sprint} />
              </td>
              <td className={`p-4 border-b border-accent/20 text-center bg-accent/5 group-hover:bg-accent/10 transition-colors`}>
                <FeatureValue value={feature.eightWeek} />
              </td>
              <td className={`p-4 border-b border-border/50 text-center group-hover:bg-muted/30 transition-colors`}>
                <FeatureValue value={feature.club} />
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td className="p-4"></td>
            {programs.map((program) => (
              <td
                key={program.name}
                className={`p-4 text-center ${
                  program.highlight ? "bg-accent/5" : ""
                }`}
              >
                <Button
                  variant={program.highlight ? "accent" : "outline"}
                  size="sm"
                  asChild
                  className="w-full"
                >
                  <Link href={program.href}>
                    Learn More
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Link>
                </Button>
              </td>
            ))}
          </tr>
        </tfoot>
      </table>
    </motion.div>
  );
}

"use client";

import { ReferralSection } from "@/lib/lessons/types";
import { motion } from "framer-motion";
import { Gift, Users, ArrowRight } from "lucide-react";
import { Button } from "@lemonbrand/ui";

interface Props {
  section: ReferralSection;
}

export function ReferralSectionComponent({ section }: Props) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="relative"
    >
      {/* Background glow */}
      <div className="absolute -inset-2 bg-gradient-to-r from-accent/5 via-accent/10 to-accent/5 rounded-2xl blur-lg" />

      <div className="relative bg-gradient-to-br from-card to-accent/5 border border-accent/20 rounded-2xl p-6 md:p-8">
        {/* Header */}
        <div className="text-center mb-6">
          <motion.div
            initial={{ scale: 0.8 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.3 }}
            className="inline-flex items-center justify-center size-12 rounded-full bg-accent/10 mb-4"
          >
            <Gift className="size-6 text-accent" />
          </motion.div>
          <h3 className="font-display text-xl md:text-2xl font-bold text-foreground mb-2">
            {section.title}
          </h3>
          <p className="text-muted-foreground max-w-md mx-auto">
            {section.description}
          </p>
        </div>

        {/* Benefits */}
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.3 }}
            className="flex items-center gap-4 p-4 bg-background/50 border border-border/50 rounded-xl"
          >
            <div className="flex-shrink-0 size-10 rounded-lg bg-emerald-500/10 flex items-center justify-center">
              <Users className="size-5 text-emerald-400" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Your friend gets</p>
              <p className="font-semibold text-foreground">{section.friendBenefit}</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.3 }}
            className="flex items-center gap-4 p-4 bg-background/50 border border-border/50 rounded-xl"
          >
            <div className="flex-shrink-0 size-10 rounded-lg bg-accent/10 flex items-center justify-center">
              <Gift className="size-5 text-accent" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">You get</p>
              <p className="font-semibold text-foreground">{section.referrerBenefit}</p>
            </div>
          </motion.div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.3 }}
          className="text-center"
        >
          <Button size="lg" className="gap-2">
            {section.ctaLabel}
            <ArrowRight className="size-4" />
          </Button>
        </motion.div>
      </div>
    </motion.section>
  );
}

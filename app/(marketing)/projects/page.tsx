"use client";

import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ExternalLink, Check, Zap, Shield, Bot, Globe } from "lucide-react";

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

export default function ProjectsPage() {
  const projects = [
    {
      title: "Verified Node",
      tagline: "Make Contractors Visible to AI Search",
      description:
        "Credential verification platform that makes contractor licenses, insurance, and response times visible to AI search engines. While 60% of Google searches end without a click, contractors invisible to AI lose discoverability. Verified Node solves this.",
      status: "Live & Growing",
      featured: true,
      launched: "2025",
      icon: <Shield className="w-6 h-6" />,
      techStack: ["Next.js", "Convex", "Schema Markup", "AI Integration"],
      highlights: [
        "Monthly license verification against state databases",
        "Insurance COI tracking with expiration alerts",
        "3-Ring Test: Response velocity monitoring",
        "Shareable credential pages & trust badges",
        "Machine-readable schema for AI discoverability",
      ],
      pricing: "$349 first year, then $99/year",
      link: "https://www.verifiednode.com",
      targetAudience: "HVAC, plumbing, electrical, roofing contractors",
    },
    {
      title: "CodeBrain",
      tagline: "Employee Zero for Solopreneurs",
      description:
        "AI-powered workspace built on Obsidian that pairs Claude Code with guided workflows. Handle business operations, client work, and automation without hiring. Go from 3 clients to 7 without adding headcount.",
      status: "Live & Growing",
      launched: "August 2025",
      icon: <Bot className="w-6 h-6" />,
      techStack: ["Claude Code", "Obsidian", "RUBE MCP", "500+ Integrations"],
      highlights: [
        "Voice note capture & processing",
        "Client conversation memory",
        "Email & workflow automation",
        "Local-first data storage",
        "24/7 AI teammate availability",
      ],
      pricing: "Free starter, $197 kit, $29/mo community",
      link: "https://www.yourcodebrain.com",
      targetAudience: "Solo founders, freelancers, agencies",
    },
    {
      title: "GetMyWebsite.io",
      tagline: "$249 Websites for Contractors",
      description:
        "Professional websites for HVAC and plumbing contractors delivered in 48 hours. One-time payment, no monthly fees. Mobile-first design with lead capture, Google Maps integration, and 24/7 contact forms.",
      status: "Live & Growing",
      launched: "November 2025",
      icon: <Globe className="w-6 h-6" />,
      techStack: ["Next.js", "React", "Supabase", "Twilio"],
      highlights: [
        "48-hour delivery guarantee",
        "Mobile-first responsive design",
        "Lead management dashboard",
        "Phone call tracking",
        "Google Maps & AI search ready",
      ],
      pricing: "$249 one-time payment",
      link: "https://www.getmywebsite.io",
      targetAudience: "HVAC & plumbing contractors",
    },
  ];

  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-24 sm:py-32 lg:py-40 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.p
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            custom={0}
            className="text-sm font-medium tracking-wider uppercase text-accent mb-6"
          >
            Building in Public
          </motion.p>

          <motion.h1
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            custom={1}
            className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-tight mb-6"
          >
            What I&apos;m Building
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            custom={2}
            className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
          >
            AI businesses designed to be automated, scalable, and sellable.
            Each project solves a real problem for a specific audience.
          </motion.p>
        </div>
      </section>

      {/* Featured Project - Verified Node */}
      <section className="px-4 pb-20">
        <div className="max-w-5xl mx-auto">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
            className="relative bg-accent/5 border-2 border-accent/20 rounded-2xl p-8 md:p-12 overflow-hidden"
          >
            {/* Featured Badge */}
            <div className="absolute top-6 right-6">
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-accent text-accent-foreground text-xs font-medium rounded-full">
                <Zap className="w-3 h-3" />
                Main Focus
              </span>
            </div>

            <div className="grid md:grid-cols-2 gap-8 md:gap-12">
              {/* Left Column - Info */}
              <div>
                <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center mb-6 text-accent">
                  <Shield className="w-6 h-6" />
                </div>

                <h2 className="font-display text-3xl md:text-4xl font-semibold tracking-tight mb-2">
                  {projects[0].title}
                </h2>
                <p className="text-accent font-medium text-lg mb-4">
                  {projects[0].tagline}
                </p>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  {projects[0].description}
                </p>

                <div className="mb-6">
                  <p className="text-sm text-muted-foreground mb-2">Target Audience</p>
                  <p className="font-medium">{projects[0].targetAudience}</p>
                </div>

                <div className="mb-8">
                  <p className="text-sm text-muted-foreground mb-2">Pricing</p>
                  <p className="text-accent font-semibold text-lg">{projects[0].pricing}</p>
                </div>

                <a
                  href={projects[0].link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-accent-foreground text-sm font-medium rounded-sm shadow-[0_2px_0_0_rgba(0,0,0,0.1),inset_0_1px_0_0_rgba(255,255,255,0.1)] hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(200,140,30,0.3)] transition-all duration-200"
                >
                  Visit Verified Node
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>

              {/* Right Column - Features */}
              <div>
                <p className="text-sm font-medium tracking-wider uppercase text-muted-foreground mb-4">
                  Key Features
                </p>
                <ul className="space-y-3 mb-8">
                  {projects[0].highlights.map((highlight, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-accent mt-0.5 shrink-0" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>

                <p className="text-sm font-medium tracking-wider uppercase text-muted-foreground mb-3">
                  Tech Stack
                </p>
                <div className="flex flex-wrap gap-2">
                  {projects[0].techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 text-sm bg-muted text-muted-foreground rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Other Projects */}
      <section className="px-4 pb-20">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-display text-2xl font-semibold tracking-tight mb-8">
            Other Projects
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            {projects.slice(1).map((project, index) => (
              <motion.div
                key={project.title}
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={index}
                className="bg-card border border-border/50 rounded-xl p-6 md:p-8 shadow-premium-sm hover:shadow-premium-md transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center text-accent">
                    {project.icon}
                  </div>
                  <span className="inline-flex items-center px-2 py-1 text-xs font-medium text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/30 rounded-full">
                    {project.status}
                  </span>
                </div>

                <h3 className="font-display text-xl font-semibold tracking-tight mb-1">
                  {project.title}
                </h3>
                <p className="text-accent font-medium text-sm mb-3">
                  {project.tagline}
                </p>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  {project.description}
                </p>

                <div className="mb-4">
                  <p className="text-xs text-muted-foreground mb-1">Target</p>
                  <p className="text-sm">{project.targetAudience}</p>
                </div>

                <div className="mb-6">
                  <p className="text-xs text-muted-foreground mb-1">Pricing</p>
                  <p className="text-sm font-medium text-accent">{project.pricing}</p>
                </div>

                <div className="flex flex-wrap gap-2 mb-6">
                  {project.techStack.slice(0, 3).map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 text-xs bg-muted text-muted-foreground rounded"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-medium text-accent hover:underline"
                >
                  Visit {project.title}
                  <ExternalLink className="w-3 h-3" />
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-20 px-4 border-t border-border/50 bg-muted/30">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-display text-2xl sm:text-3xl font-semibold tracking-tight mb-6">
            The Build Philosophy
          </h2>
          <div className="grid sm:grid-cols-3 gap-6 text-left">
            <div>
              <h3 className="font-display font-semibold mb-2">Automated</h3>
              <p className="text-sm text-muted-foreground">
                Every project minimizes manual work. Systems run without constant intervention.
              </p>
            </div>
            <div>
              <h3 className="font-display font-semibold mb-2">Scalable</h3>
              <p className="text-sm text-muted-foreground">
                Built to handle 10x growth without 10x the effort. Productized, not custom.
              </p>
            </div>
            <div>
              <h3 className="font-display font-semibold mb-2">Sellable</h3>
              <p className="text-sm text-muted-foreground">
                Each business could be sold. Clean systems, documented processes, real revenue.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 border-t border-border/50">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-display text-2xl sm:text-3xl font-semibold tracking-tight mb-4">
            Want the Templates Behind These?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            I share the frameworks, code, and processes I use to build these businesses.
            Get them free.
          </p>
          <Link
            href="/templates"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground text-sm font-medium rounded-sm shadow-[0_2px_0_0_rgba(0,0,0,0.08)] hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(0,0,0,0.15)] transition-all duration-200"
          >
            Get Free Templates
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}

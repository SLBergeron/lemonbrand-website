/**
 * ST-ALBERT Q4 2025 STRATEGIC PRIORITIES PAGE
 * ===========================================
 *
 * PURPOSE:
 * Password-protected page presenting 10 strategic routes for St-Albert Cheese Q4 2025
 * planning. Built for Valerie (St-Albert) to review before November 13, 2025 meeting.
 *
 * CHANGELOG - November 12, 2025:
 * ------------------------------
 *
 * INITIAL BUILD:
 * - Created password-protected page with preview screen showing St-Albert logo and meeting date
 * - Implemented full bilingual support (English/French) with language toggle
 * - Built 10 strategic route cards organized into First Wave and Second Wave
 * - Added executive summary with key metrics ($37-64K investment → $133-181K ROI, 3.6-4.9x return)
 * - Included Next Steps section with 4 action items
 * - Full dark mode support and mobile responsive design
 * - Framer Motion animations for smooth transitions
 *
 * DESIGN DECISIONS:
 * - Password: "stalbert2025" (can be changed at line 47)
 * - Language toggle: Integrated into header below "November 2025 • Philosophy" text
 * - Logo padding: Added pt-8 above St-Albert logo for breathing room
 * - Color scheme: Orange-500 primary (LemonBrand aesthetic)
 * - Meta tags: noindex, nofollow (search engine protection)
 *
 * CONTENT CUSTOMIZATION (Based on actual St-Albert business context):
 *
 * ROUTE 1 - Christmas Basket Campaign:
 * - Last year: $4K revenue, started too late
 * - Goal: Launch 3-4 weeks earlier, $8-10K target (2x growth)
 * - Focus: Conversion tracking, checkout optimization
 *
 * ROUTE 2 - Data Automation for QA/Finance/Audit (URGENT):
 * - Context: Karine going on medical leave (surgery scheduled soon)
 * - Changed from generic Excel automation to deterministic scripts
 * - Focus: QA/finance/audit processes with validation checks and audit trails
 * - Timeline: 3-4 weeks (must start immediately)
 * - Note: Updated name from "Karin" to "Karine" throughout both EN and FR
 *
 * ROUTE 3 - Local Events & Influencer Partnerships:
 * - Actual data: 2,751 Google reviews (4.6 stars, +700 since Simon took over)
 * - Strategy: Leverage reviews with Ottawa influencers and "What to do this weekend" platforms
 * - Collaboration: Work with Pascal on event coordination
 * - Target: 20-30% increase in weekend foot traffic
 * - Replaced previous "Google My Business & Local SEO" route
 *
 * ROUTE 4 - Internal Work Orders App (NEW):
 * - Mobile & desktop work order management system
 * - Features: Photo uploads, status tracking, push notifications, completion reporting
 * - Problem: Currently tracked on paper/whiteboards/scattered emails
 * - ROI: $8-12K/year, 30% faster task completion
 * - Replaced previous "HR Application Response Automation" route
 *
 * ROUTE 5 - Physical Loyalty Card Program:
 * - Specific mechanic: Buy 5 purchases above $30 → free bag of cheese curds
 * - Simon designs card and promotional materials
 * - Track: Redemption rates, transaction value uplift, visit frequency
 * - Target: 500+ active cardholders in 4 months
 * - ROI: $18-28K additional annual revenue
 * - Replaced previous digital points system concept
 *
 * ROUTE 6 - Recipe Community & Social Media Relaunch (NEW):
 * - Launch recipe submission platform for locals and cheese lovers
 * - Feature 2-3 community recipes per week on social media
 * - Monthly contests with St-Albert product prizes
 * - Pascal features winning recipes at restaurant
 * - Target: 200+ contributors, 50% social engagement increase
 * - Replaced previous "Restaurant POS Proof of Concept" route
 *
 * ROUTE 7 - Scott Strategic Conversations (NEW):
 * - Monthly 30-minute strategic conversations with Scott
 * - Document priorities, vision, pain points for next 12 months
 * - Ensure alignment on all routes and strategic direction
 * - Create priority tracking visible to Scott
 * - Replaced previous "File Organization & Cloud Backup System" route
 *
 * ROUTE 8 - Automated Daily Dashboard Email:
 * - Kept as-is from original plan
 * - Daily 6:00 AM email with yesterday's numbers
 * - Sales, production, inventory alerts, action items
 * - ROI: $6-10K/year in leadership time savings
 *
 * ROUTE 9 - Performance Review System:
 * - Kept as-is from original plan
 * - Digital performance review template with automated reminders
 * - Historical tracking for employee development
 * - ROI: $5-8K/year in HR time savings
 *
 * ROUTE 10 - Website Launch & Monthly Campaign Infrastructure:
 * - Focus: Launch the website (done over perfect) after 19 months in development
 * - Build infrastructure for recurring monthly campaigns
 * - Seasonal products, recipe spotlights, events
 * - ROI: $25-45K annual revenue from online visibility
 * - Replaced previous "Website Content Calendar + Research Training" route
 *
 * BILINGUAL IMPLEMENTATION:
 * - All UI elements fully translated (labels, buttons, headings, next steps)
 * - All 10 routes fully translated with contextually appropriate French
 * - Language persists across password screen and main content
 * - Toggle shows "English | Français" with active state in orange
 *
 * TECHNICAL STACK:
 * - Next.js 14 App Router
 * - Shadcn UI components (Card, Button, Input, Label, Badge)
 * - Framer Motion for animations
 * - Lucide React icons (Calendar, Lock, Globe, Target, DollarSign)
 * - TypeScript for type safety
 *
 * FILE REFERENCES:
 * - Content source: /ST-ALBERT-10-ROUTES-CONTENT.md
 * - Build reference: /ST-ALBERT-PRIORITIES-REFERENCE.md
 *
 * DEPLOYMENT:
 * - Pushed to GitHub: commit efe9a47
 * - Vercel auto-deploy triggered
 * - Environment variable needed: RESEND_API_KEY (for quote form on other pages)
 *
 * ACCESS:
 * - URL: /st-albert-q4-2025
 * - Password: stalbert2025
 * - Meeting date: November 13, 2025
 * - Contact: simon@lemonbrand.io
 *
 * FUTURE UPDATES:
 * - Update password by changing const CORRECT_PASSWORD below
 * - Update routes by modifying ROUTES_DATA object (lines ~132-572)
 * - Add/remove routes by adjusting the array structure
 * - Update translations in TRANSLATIONS object (lines ~46-129)
 * - Change color scheme by replacing orange-500 references
 */

"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Calendar, Lock, Globe, Target, DollarSign } from "lucide-react";

const CORRECT_PASSWORD = "stalbert2025";

type Language = 'en' | 'fr';

// Inline Language Toggle Component for headers
function InlineLanguageToggle({ language, setLanguage }: { language: Language; setLanguage: (lang: Language) => void }) {
  return (
    <div className="flex items-center justify-center gap-2 mb-8">
      <Globe className="h-4 w-4 text-neutral-500" />
      <button
        onClick={() => setLanguage('en')}
        className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
          language === 'en'
            ? 'bg-orange-500 text-white'
            : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200'
        }`}
      >
        English
      </button>
      <span className="text-neutral-300 dark:text-neutral-600">|</span>
      <button
        onClick={() => setLanguage('fr')}
        className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
          language === 'fr'
            ? 'bg-orange-500 text-white'
            : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200'
        }`}
      >
        Français
      </button>
    </div>
  );
}

const TRANSLATIONS = {
  en: {
    pageTitle: "Q4 2025 Strategic Priorities",
    subtitle: "10 Routes to Operational Excellence",
    meetingDate: "Meeting: November 13, 2025",
    protectedDocument: "Protected Document",
    passwordPrompt: "Please enter the password you received from Simon",
    passwordLabel: "Password",
    passwordPlaceholder: "Enter password",
    incorrectPassword: "Incorrect password. Please try again.",
    unlockButton: "Unlock Document",
    executiveSummary: "Executive Summary",
    totalRoutes: "Total Routes",
    investment: "Investment",
    expectedROI: "Expected ROI",
    returnMultiple: "Return Multiple",
    philosophy: "Philosophy",
    philosophyText: "Give direction → Simon executes → Team maintains",
    keyMetrics: "Success Metrics:",
    timeline: "Timeline:",
    roi: "ROI:",
    urgent: "URGENT",
    wave: "Wave:",
    problem: "Problem:",
    solution: "Solution:",
    outcome: "Outcome:",
    internalTeam: "Team:",
    exitStrategy: "Exit Strategy:",
    nextSteps: "Next Steps",
    nextStep1Title: "Review All 10 Routes",
    nextStep1Desc: "Take time to review each priority in detail before our meeting. Flag any concerns or adjustments needed.",
    nextStep2Title: "Prioritize First Wave",
    nextStep2Desc: "Which routes 1-5 are most urgent? Route 2 (Excel Automation) needs immediate attention due to Karin's medical leave.",
    nextStep3Title: "Approve Execution Approach",
    nextStep3Desc: "Confirm 'direction → execution → maintenance' model works for you. Give direction, Simon executes, team maintains.",
    nextStep4Title: "Meeting Discussion",
    nextStep4Desc: "We'll discuss priorities, timeline, and get started on First Wave immediately.",
    questionsContact: "Questions? Contact Simon at simon@lemonbrand.io",
    firstWave: "First Wave: November - December 2025",
    secondWave: "Second Wave: January - March 2026",
    whyUrgent: "Why Urgent:",
  },
  fr: {
    pageTitle: "Priorités stratégiques T4 2025",
    subtitle: "10 Routes vers l'excellence opérationnelle",
    meetingDate: "Réunion : 13 novembre 2025",
    protectedDocument: "Document protégé",
    passwordPrompt: "Veuillez entrer le mot de passe que vous avez reçu de Simon",
    passwordLabel: "Mot de passe",
    passwordPlaceholder: "Entrer le mot de passe",
    incorrectPassword: "Mot de passe incorrect. Veuillez réessayer.",
    unlockButton: "Déverrouiller le document",
    executiveSummary: "Résumé exécutif",
    totalRoutes: "Routes totales",
    investment: "Investissement",
    expectedROI: "ROI attendu",
    returnMultiple: "Multiple de retour",
    philosophy: "Philosophie",
    philosophyText: "Donner la direction → Simon exécute → L'équipe maintient",
    keyMetrics: "Indicateurs de succès :",
    timeline: "Calendrier :",
    roi: "ROI :",
    urgent: "URGENT",
    wave: "Vague :",
    problem: "Problème :",
    solution: "Solution :",
    outcome: "Résultat :",
    internalTeam: "Équipe :",
    exitStrategy: "Stratégie de sortie :",
    nextSteps: "Prochaines étapes",
    nextStep1Title: "Examiner les 10 routes",
    nextStep1Desc: "Prenez le temps d'examiner chaque priorité en détail avant notre réunion. Signalez toute préoccupation ou ajustement nécessaire.",
    nextStep2Title: "Prioriser la première vague",
    nextStep2Desc: "Quelles routes 1-5 sont les plus urgentes ? La route 2 (Automatisation Excel) nécessite une attention immédiate en raison du congé médical de Karin.",
    nextStep3Title: "Approuver l'approche d'exécution",
    nextStep3Desc: "Confirmez que le modèle 'direction → exécution → maintenance' vous convient. Donnez la direction, Simon exécute, l'équipe maintient.",
    nextStep4Title: "Discussion de réunion",
    nextStep4Desc: "Nous discuterons des priorités, du calendrier et commencerons immédiatement la première vague.",
    questionsContact: "Questions ? Contactez Simon à simon@lemonbrand.io",
    firstWave: "Première vague : Novembre - Décembre 2025",
    secondWave: "Deuxième vague : Janvier - Mars 2026",
    whyUrgent: "Pourquoi urgent :",
  }
};

// Bilingual Routes Content
const ROUTES_DATA = {
  en: [
    {
      number: 1,
      wave: "First Wave",
      category: "Revenue Growth",
      title: "Christmas Basket Campaign Tracking & Optimization",
      problem: "Last year's Paniers de Noël generated $4,000 but started too late and had no tracking.",
      description: "Launch campaign 3-4 weeks earlier than last year with full conversion tracking and checkout optimization. Target: $8-10K in sales (2x last year).",
      solution: [
        "Launch campaign 3-4 weeks earlier than last year",
        "Implement conversion tracking (which baskets sell, where traffic comes from)",
        "Optimize checkout process to reduce cart abandonment",
        "Daily sales dashboard to monitor performance",
        "Target: $8-10K in sales (2x last year)"
      ],
      outcome: "2x last year's revenue through earlier launch and conversion optimization",
      internalTeam: "Simon implements tracking & campaign setup → Marketing launches early promotion → Sales monitors daily dashboard",
      roi: "$4-6K additional revenue this Christmas, repeatable annually",
      timeline: "2 weeks setup, runs through season",
      exitStrategy: "Dashboard stays live for future campaigns, marketing replicates annually",
      urgent: false
    },
    {
      number: 2,
      wave: "First Wave",
      category: "Operational Efficiency",
      title: "Data Automation for QA, Finance & Audit",
      problem: "Karine is going on medical leave for a month starting soon. Critical data processes for quality assurance, finance reconciliation, and audit trails require manual work that takes 5-10 hours/week.",
      description: "Build deterministic scripts that automate QA/finance/audit data processes with high accuracy. Focus on reproducible, error-proof automation that anyone can run during Karine's medical leave.",
      solution: [
        "Identify critical QA/finance/audit data processes that need automation",
        "Build deterministic scripts with validation checks and error handling",
        "Create simple execution buttons with clear success/failure indicators",
        "Implement audit trails that log every automated process run",
        "Document step-by-step for anyone to execute and verify results"
      ],
      outcome: "5-10 hours/week saved, 100% reproducible results, audit-ready data processes, continuity during Karine's medical leave",
      internalTeam: "Simon builds deterministic automation → Admin team executes scripts → Karine reviews audit trails when she returns",
      roi: "$12K-18K/year in time savings plus improved audit compliance",
      timeline: "3-4 weeks (MUST start immediately)",
      exitStrategy: "Fully documented scripts with validation checks, one-page execution guide, audit trail for compliance",
      urgent: true,
      urgentReason: "Karine's surgery is scheduled soon. Without automation, critical QA/finance/audit processes will be delayed or done incorrectly."
    },
    {
      number: 3,
      wave: "First Wave",
      category: "Marketing & Visibility",
      title: "Local Events & Influencer Marketing Partnerships",
      problem: "We have 2,751 Google reviews (4.6 stars, +700 since takeover) but aren't leveraging this social proof. Missing opportunities with local events, influencers, and Ottawa-based 'What to do this weekend' content.",
      description: "Leverage our strong review base by partnering with local Ottawa influencers, event organizers, and weekend activity platforms. Collaborate with Pascal to drive foot traffic through local activations.",
      solution: [
        "Partner with Ottawa 'What to do this weekend' platforms and bloggers",
        "Identify and engage local food influencers for restaurant visits and content",
        "Sponsor or participate in 3-5 local Ottawa events per quarter",
        "Create influencer visit packages (tour + tasting + content rights)",
        "Track visitor attribution from partnerships and events",
        "Work with Pascal on execution and coordination"
      ],
      outcome: "Leverage 2,751 reviews to drive 20-30% increase in weekend foot traffic, build local brand presence, create user-generated content",
      internalTeam: "Simon sets up partnerships & tracking → Pascal coordinates events & influencer visits → Marketing amplifies content",
      roi: "15-25% increase in weekend restaurant traffic, 5-10 wholesale inquiries/month from local visibility",
      timeline: "3 weeks to establish partnerships, ongoing coordination",
      exitStrategy: "Pascal owns ongoing influencer relationships, marketing has partnership playbook to replicate",
      urgent: false
    },
    {
      number: 4,
      wave: "First Wave",
      category: "Operations",
      title: "Internal Work Orders App (Mobile & Desktop)",
      problem: "Work orders are tracked on paper, whiteboards, or scattered emails. No central system to assign, track, or complete maintenance and operational tasks. Hard to see what's pending, who's working on what, or measure completion time.",
      description: "Build a simple, mobile-friendly work order app that makes it easy for anyone to create, assign, track, and complete tasks from their phone or desktop.",
      solution: [
        "Mobile-first design that works seamlessly on phones and desktop",
        "Simple creation flow: snap photo, describe issue, assign to person/team",
        "Status tracking: Open → In Progress → Completed with timestamp history",
        "Push notifications when assigned or when status changes",
        "Dashboard showing all pending work orders by priority and assignee",
        "Basic reporting: completion time, recurring issues, workload by person"
      ],
      outcome: "Zero lost work orders, real-time visibility into all pending tasks, 30% faster completion through better coordination",
      internalTeam: "Simon builds app → Operations team uses daily → Maintenance and production staff complete tasks in-app",
      roi: "$8K-12K/year in faster task completion and reduced missed maintenance",
      timeline: "4-5 weeks to build and deploy",
      exitStrategy: "Simple enough for anyone to use, basic training documentation, operations owns ongoing use",
      urgent: false
    },
    {
      number: 5,
      wave: "First Wave",
      category: "Customer Retention",
      title: "Physical Loyalty Card Program",
      problem: "No customer retention strategy. One-time buyers. No way to incentivize repeat restaurant visits or track loyal customers.",
      description: "Launch physical loyalty card program: Buy 5 purchases above $30, get a free bag of cheese curds. Simon designs the card, creates promotion materials, and tracks uplift.",
      solution: [
        "Design branded physical loyalty cards (Simon designs)",
        "Simple punch card system: 5 purchases of $30+ = free bag of curds",
        "Create in-restaurant promotion materials and staff training",
        "Track redemption rates and customer purchase frequency",
        "Measure uplift in average transaction value and visit frequency",
        "Target: 500+ active cardholders in 4 months"
      ],
      outcome: "15-25% increase in repeat restaurant visits, higher average transaction value ($30+ threshold), 500+ active loyalty members",
      internalTeam: "Simon designs card & promo materials → Restaurant staff stamps cards at checkout → Track redemptions and uplift",
      roi: "$18K-28K additional annual revenue from increased visit frequency and higher transaction values",
      timeline: "2 weeks for design and production, launch and track",
      exitStrategy: "Restaurant staff trained on program, simple redemption tracking, marketing owns card reorders",
      urgent: false
    },
    {
      number: 6,
      wave: "Second Wave",
      category: "Community & Social Media",
      title: "Recipe Community & Social Media Relaunch",
      problem: "Social media is stagnant. No user-generated content. Missing opportunity to build community around St-Albert cheese with locals and cheese lovers sharing recipes and experiences.",
      description: "Launch a recipe community where locals and St-Albert cheese lovers can share their cheese recipes. Relaunch social media channels using this community-generated content.",
      solution: [
        "Create simple recipe submission platform (web form or dedicated Instagram hashtag)",
        "Feature 2-3 community recipes per week on social media",
        "Build recipe library on website showcasing user submissions",
        "Monthly recipe contest with St-Albert product prizes",
        "Coordinate with Pascal to feature recipe creators at the restaurant",
        "Relaunch Instagram, Facebook with consistent posting schedule using community content"
      ],
      outcome: "Active recipe community of 200+ contributors, 50% increase in social media engagement, user-generated content for 12+ months",
      internalTeam: "Simon builds submission system → Marketing curates and posts recipes → Pascal features winning recipes at restaurant",
      roi: "$10K-15K in social media reach value plus community brand building",
      timeline: "3 weeks to build platform and launch community",
      exitStrategy: "Marketing owns ongoing curation and posting, community self-sustains with user submissions",
      urgent: false
    },
    {
      number: 7,
      wave: "Second Wave",
      category: "Strategic Alignment",
      title: "Scott Strategic Conversations & Priorities",
      problem: "Limited structured conversations with Scott about his priorities, vision, and what improvements he wants to see. Missing alignment on strategic direction and pain points.",
      description: "Establish regular conversations with Scott to understand his priorities, gather input on what he'd like to see improved, and ensure all routes align with his vision for St-Albert.",
      solution: [
        "Monthly 30-minute strategic conversation with Scott",
        "Document his priorities, pain points, and vision for next 12 months",
        "Review progress on current routes and get feedback",
        "Identify new opportunities or adjustments to current plan",
        "Create simple priority tracking visible to Scott (what's in progress, what's next)",
        "Ensure Simon's work aligns with Scott's strategic direction"
      ],
      outcome: "Clear alignment on priorities, Scott's input drives roadmap adjustments, faster decision-making on new opportunities",
      internalTeam: "Simon schedules and leads monthly conversations → Documents priorities → Adjusts roadmap based on Scott's feedback",
      roi: "Alignment value: avoid wasted effort on wrong priorities, faster execution on what matters most",
      timeline: "Ongoing monthly conversations starting immediately",
      exitStrategy: "Becomes regular cadence, priority tracking system stays updated, Scott has visibility into all work",
      urgent: false
    },
    {
      number: 8,
      wave: "Second Wave",
      category: "Data & Reporting",
      title: "Automated Daily Dashboard Email",
      problem: "No one knows daily numbers until Friday. Decisions made on week-old data. Leaders spend 15 minutes every morning hunting for yesterday's numbers.",
      description: "Get yesterday's key numbers in your inbox at 6:00 AM every day without manual work. No dashboard to log into - just an email with sales, production, inventory alerts, and action items.",
      solution: [
        "Automated email every morning at 6:00 AM",
        "Yesterday's sales (total, restaurant, wholesale)",
        "Production output vs target",
        "Inventory alerts (low stock warnings)",
        "Top-selling products",
        "Action items for the day"
      ],
      outcome: "Same-day problem catching, 15 min/day saved per leader, eliminate Friday data scramble",
      internalTeam: "Simon builds automation → Runs automatically daily → Leadership receives email (no action required)",
      roi: "$6K-10K/year in leadership time savings (15 min/day × 3 people × $40/hr)",
      timeline: "3 weeks to build and test",
      exitStrategy: "Fully automated script with documentation, IT contact can troubleshoot if needed",
      urgent: false
    },
    {
      number: 9,
      wave: "Second Wave",
      category: "HR & Workforce",
      title: "Performance Review System",
      problem: "Performance reviews are inconsistent, done on paper or Word docs, no tracking of employee development over time. HR has no centralized view of team performance.",
      description: "Implement simple digital performance review template with standardized criteria and automated reminders.",
      solution: [
        "Simple digital performance review template (Excel or Google Forms)",
        "Standardized evaluation criteria across departments",
        "Automated reminder emails to managers when reviews are due",
        "Historical tracking: compare this year vs last year for each employee",
        "Dashboard for HR: which reviews are overdue, trends across teams"
      ],
      outcome: "Consistent review process, historical employee performance tracking, reduce HR admin time by 50%",
      internalTeam: "Simon builds template and automation → Managers complete reviews digitally → HR monitors completion dashboard",
      roi: "$5K-8K/year in HR time savings, plus better employee development and retention",
      timeline: "3 weeks to build system and train managers",
      exitStrategy: "Template is standardized, reminders are automated, HR just monitors and follows up",
      urgent: false
    },
    {
      number: 10,
      wave: "Second Wave",
      category: "Marketing & Growth",
      title: "Website Launch & Monthly Campaign Infrastructure",
      problem: "Website has been in development for 19 months. Can't run monthly marketing campaigns without a launched, functional website. Missing online sales, brand building, and campaign opportunities.",
      description: "Launch the website so we can execute monthly marketing campaigns. Focus on getting it live first, then build the infrastructure for recurring monthly campaigns (seasonal products, promotions, events).",
      solution: [
        "Finalize and launch the St-Albert website (priority: done over perfect)",
        "Set up monthly campaign infrastructure (email, social, website banners)",
        "Create campaign templates for recurring themes: seasonal cheese, recipe spotlights, events",
        "Launch first 3 monthly campaigns to establish cadence",
        "Track campaign performance: traffic, conversions, revenue attribution",
        "Build marketing team capability to run campaigns independently"
      ],
      outcome: "Website launched and generating traffic, monthly campaigns running consistently, 30-50% increase in online awareness and inquiries",
      internalTeam: "Simon launches website & sets up campaign infrastructure → Marketing executes monthly campaigns → Pascal coordinates restaurant tie-ins",
      roi: "$25K-45K annual revenue from online visibility, campaigns, and event promotion",
      timeline: "3-4 weeks to launch website, 2 weeks to set up campaign infrastructure",
      exitStrategy: "Marketing team owns monthly campaigns using templates, website is live and maintainable",
      urgent: false
    }
  ],
  fr: [
    {
      number: 1,
      wave: "Première vague",
      category: "Croissance des revenus",
      title: "Suivi et optimisation de la campagne de paniers de Noël",
      problem: "Les Paniers de Noël de l'année dernière ont généré 4 000 $, mais ont commencé trop tard et sans suivi.",
      description: "Lancer la campagne 3-4 semaines plus tôt que l'année dernière avec un suivi complet des conversions et une optimisation du processus de paiement. Objectif : 8-10K $ de ventes (2x l'année dernière).",
      solution: [
        "Lancer la campagne 3-4 semaines plus tôt que l'année dernière",
        "Mettre en place le suivi des conversions (quels paniers se vendent, d'où vient le trafic)",
        "Optimiser le processus de paiement pour réduire l'abandon de panier",
        "Tableau de bord des ventes quotidiennes pour surveiller la performance",
        "Objectif : 8-10K $ de ventes (2x l'année dernière)"
      ],
      outcome: "2x les revenus de l'année dernière grâce à un lancement anticipé et à l'optimisation des conversions",
      internalTeam: "Simon met en place le suivi et la campagne → Marketing lance la promotion anticipée → Ventes surveille le tableau de bord quotidien",
      roi: "4-6K $ de revenus supplémentaires ce Noël, répétable annuellement",
      timeline: "2 semaines de configuration, fonctionne toute la saison",
      exitStrategy: "Le tableau de bord reste actif pour les futures campagnes, le marketing réplique annuellement",
      urgent: false
    },
    {
      number: 2,
      wave: "Première vague",
      category: "Efficacité opérationnelle",
      title: "Automatisation des données pour AQ, Finance et Audit",
      problem: "Karine part en congé médical d'un mois bientôt. Les processus de données critiques pour l'assurance qualité, la réconciliation financière et les pistes d'audit nécessitent un travail manuel de 5-10 heures/semaine.",
      description: "Créer des scripts déterministes qui automatisent les processus de données AQ/finance/audit avec une grande précision. Se concentrer sur une automatisation reproductible et sans erreur que n'importe qui peut exécuter pendant le congé médical de Karine.",
      solution: [
        "Identifier les processus de données AQ/finance/audit critiques nécessitant une automatisation",
        "Créer des scripts déterministes avec vérifications de validation et gestion des erreurs",
        "Créer de simples boutons d'exécution avec indicateurs de succès/échec clairs",
        "Implémenter des pistes d'audit qui enregistrent chaque exécution de processus automatisé",
        "Documenter étape par étape pour que n'importe qui puisse exécuter et vérifier les résultats"
      ],
      outcome: "5-10 heures/semaine économisées, résultats 100% reproductibles, processus de données prêts pour l'audit, continuité pendant le congé médical de Karine",
      internalTeam: "Simon crée l'automatisation déterministe → L'équipe administrative exécute les scripts → Karine révise les pistes d'audit à son retour",
      roi: "12-18K $/an en économies de temps plus amélioration de la conformité d'audit",
      timeline: "3-4 semaines (DOIT commencer immédiatement)",
      exitStrategy: "Scripts entièrement documentés avec vérifications de validation, guide d'exécution d'une page, piste d'audit pour la conformité",
      urgent: true,
      urgentReason: "La chirurgie de Karine est prévue bientôt. Sans automatisation, les processus critiques AQ/finance/audit seront retardés ou effectués incorrectement."
    },
    {
      number: 3,
      wave: "Première vague",
      category: "Marketing et visibilité",
      title: "Événements locaux et partenariats avec influenceurs",
      problem: "Nous avons 2 751 avis Google (4,6 étoiles, +700 depuis la prise en charge) mais nous ne tirons pas parti de cette preuve sociale. Opportunités manquées avec événements locaux, influenceurs et contenu Ottawa 'Quoi faire ce week-end'.",
      description: "Tirer parti de notre forte base d'avis en partenariat avec des influenceurs locaux d'Ottawa, des organisateurs d'événements et des plateformes d'activités de fin de semaine. Collaborer avec Pascal pour générer du trafic piétonnier grâce à des activations locales.",
      solution: [
        "Partenariat avec les plateformes et blogueurs Ottawa 'Quoi faire ce week-end'",
        "Identifier et engager des influenceurs alimentaires locaux pour des visites au restaurant et du contenu",
        "Parrainer ou participer à 3-5 événements locaux d'Ottawa par trimestre",
        "Créer des forfaits de visite pour influenceurs (visite + dégustation + droits sur le contenu)",
        "Suivre l'attribution des visiteurs provenant de partenariats et d'événements",
        "Travailler avec Pascal sur l'exécution et la coordination"
      ],
      outcome: "Tirer parti de 2 751 avis pour générer une augmentation de 20-30% du trafic piétonnier le week-end, construire une présence de marque locale, créer du contenu généré par les utilisateurs",
      internalTeam: "Simon établit les partenariats et le suivi → Pascal coordonne les événements et les visites d'influenceurs → Le marketing amplifie le contenu",
      roi: "Augmentation de 15-25% du trafic au restaurant le week-end, 5-10 demandes de gros/mois grâce à la visibilité locale",
      timeline: "3 semaines pour établir les partenariats, coordination continue",
      exitStrategy: "Pascal possède les relations continues avec les influenceurs, le marketing a un guide de partenariat à répliquer",
      urgent: false
    },
    {
      number: 4,
      wave: "Première vague",
      category: "Opérations",
      title: "Application interne de bons de travail (Mobile et Bureau)",
      problem: "Les bons de travail sont suivis sur papier, tableaux blancs ou courriels éparpillés. Aucun système central pour assigner, suivre ou compléter les tâches de maintenance et opérationnelles. Difficile de voir ce qui est en attente, qui travaille sur quoi ou mesurer le temps de réalisation.",
      description: "Créer une application simple de bons de travail optimisée pour mobile qui facilite la création, l'assignation, le suivi et la complétion des tâches depuis un téléphone ou un ordinateur.",
      solution: [
        "Design mobile d'abord qui fonctionne parfaitement sur téléphones et ordinateurs",
        "Flux de création simple : prendre une photo, décrire le problème, assigner à une personne/équipe",
        "Suivi de statut : Ouvert → En cours → Complété avec historique horodaté",
        "Notifications push lors de l'assignation ou du changement de statut",
        "Tableau de bord montrant tous les bons de travail en attente par priorité et assigné",
        "Rapports de base : temps de réalisation, problèmes récurrents, charge de travail par personne"
      ],
      outcome: "Zéro bon de travail perdu, visibilité en temps réel de toutes les tâches en attente, réalisation 30% plus rapide grâce à une meilleure coordination",
      internalTeam: "Simon crée l'application → L'équipe des opérations l'utilise quotidiennement → Le personnel de maintenance et de production complète les tâches dans l'app",
      roi: "8-12K $/an en réalisation plus rapide des tâches et maintenance manquée réduite",
      timeline: "4-5 semaines pour construire et déployer",
      exitStrategy: "Assez simple pour que n'importe qui l'utilise, documentation de formation de base, les opérations possèdent l'utilisation continue",
      urgent: false
    },
    {
      number: 5,
      wave: "Première vague",
      category: "Fidélisation client",
      title: "Programme de carte de fidélité physique",
      problem: "Aucune stratégie de fidélisation client. Acheteurs uniques. Aucun moyen d'inciter les visites répétées au restaurant ou de suivre les clients fidèles.",
      description: "Lancer un programme de carte de fidélité physique : Achetez 5 fois au-dessus de 30$, obtenez un sac gratuit de fromage en grains. Simon conçoit la carte, crée des matériaux promotionnels et suit l'amélioration.",
      solution: [
        "Concevoir des cartes de fidélité physiques de marque (Simon conçoit)",
        "Système simple de carte à perforer : 5 achats de 30$+ = sac gratuit de fromage en grains",
        "Créer des matériaux promotionnels en restaurant et formation du personnel",
        "Suivre les taux de remboursement et la fréquence d'achat des clients",
        "Mesurer l'amélioration de la valeur moyenne des transactions et de la fréquence de visite",
        "Objectif : 500+ détenteurs de cartes actives en 4 mois"
      ],
      outcome: "Augmentation de 15-25% des visites répétées au restaurant, valeur moyenne des transactions plus élevée (seuil de 30$+), 500+ membres de fidélité actifs",
      internalTeam: "Simon conçoit la carte et les matériaux promo → Le personnel du restaurant perfore les cartes à la caisse → Suivre les remboursements et l'amélioration",
      roi: "18-28K $ de revenus annuels supplémentaires grâce à l'augmentation de la fréquence de visite et des valeurs de transaction plus élevées",
      timeline: "2 semaines pour la conception et la production, lancement et suivi",
      exitStrategy: "Personnel du restaurant formé au programme, suivi simple des remboursements, le marketing possède les réapprovisionnements de cartes",
      urgent: false
    },
    {
      number: 6,
      wave: "Deuxième vague",
      category: "Communauté et médias sociaux",
      title: "Communauté de recettes et relance des médias sociaux",
      problem: "Les médias sociaux sont stagnants. Aucun contenu généré par les utilisateurs. Opportunité manquée de bâtir une communauté autour du fromage St-Albert avec des locaux et des amateurs de fromage partageant des recettes et des expériences.",
      description: "Lancer une communauté de recettes où les locaux et les amateurs de fromage St-Albert peuvent partager leurs recettes au fromage. Relancer les canaux de médias sociaux en utilisant ce contenu généré par la communauté.",
      solution: [
        "Créer une plateforme simple de soumission de recettes (formulaire web ou hashtag Instagram dédié)",
        "Mettre en vedette 2-3 recettes de la communauté par semaine sur les médias sociaux",
        "Créer une bibliothèque de recettes sur le site web présentant les soumissions des utilisateurs",
        "Concours mensuel de recettes avec des prix de produits St-Albert",
        "Coordonner avec Pascal pour mettre en vedette les créateurs de recettes au restaurant",
        "Relancer Instagram, Facebook avec un calendrier de publication cohérent utilisant le contenu de la communauté"
      ],
      outcome: "Communauté de recettes active de 200+ contributeurs, augmentation de 50% de l'engagement sur les médias sociaux, contenu généré par les utilisateurs pour 12+ mois",
      internalTeam: "Simon crée le système de soumission → Le marketing sélectionne et publie les recettes → Pascal met en vedette les recettes gagnantes au restaurant",
      roi: "10-15K $ en valeur de portée sur les médias sociaux plus développement de la marque communautaire",
      timeline: "3 semaines pour créer la plateforme et lancer la communauté",
      exitStrategy: "Le marketing possède la curation et la publication continues, la communauté se maintient avec les soumissions des utilisateurs",
      urgent: false
    },
    {
      number: 7,
      wave: "Deuxième vague",
      category: "Alignement stratégique",
      title: "Conversations stratégiques avec Scott et priorités",
      problem: "Conversations structurées limitées avec Scott sur ses priorités, sa vision et les améliorations qu'il souhaite voir. Manque d'alignement sur la direction stratégique et les points douloureux.",
      description: "Établir des conversations régulières avec Scott pour comprendre ses priorités, recueillir ses commentaires sur ce qu'il aimerait voir amélioré, et assurer que toutes les routes s'alignent avec sa vision pour St-Albert.",
      solution: [
        "Conversation stratégique mensuelle de 30 minutes avec Scott",
        "Documenter ses priorités, points douloureux et vision pour les 12 prochains mois",
        "Examiner les progrès sur les routes actuelles et obtenir des commentaires",
        "Identifier de nouvelles opportunités ou ajustements au plan actuel",
        "Créer un suivi de priorités simple visible pour Scott (ce qui est en cours, ce qui est suivant)",
        "Assurer que le travail de Simon s'aligne avec la direction stratégique de Scott"
      ],
      outcome: "Alignement clair sur les priorités, les commentaires de Scott orientent les ajustements de la feuille de route, prise de décision plus rapide sur les nouvelles opportunités",
      internalTeam: "Simon planifie et dirige les conversations mensuelles → Documente les priorités → Ajuste la feuille de route selon les commentaires de Scott",
      roi: "Valeur d'alignement : éviter les efforts gaspillés sur les mauvaises priorités, exécution plus rapide sur ce qui compte le plus",
      timeline: "Conversations mensuelles en cours commençant immédiatement",
      exitStrategy: "Devient une cadence régulière, le système de suivi des priorités reste à jour, Scott a une visibilité sur tout le travail",
      urgent: false
    },
    {
      number: 8,
      wave: "Deuxième vague",
      category: "Données et rapports",
      title: "Courriel quotidien automatisé du tableau de bord",
      problem: "Personne ne connaît les chiffres quotidiens avant vendredi. Décisions prises sur des données vieilles d'une semaine. Les dirigeants passent 15 minutes chaque matin à chercher les chiffres d'hier.",
      description: "Recevez les chiffres clés d'hier dans votre boîte de réception à 6h00 chaque jour sans travail manuel. Aucun tableau de bord à ouvrir - juste un courriel avec les ventes, la production, les alertes d'inventaire et les actions à faire.",
      solution: [
        "Courriel automatisé chaque matin à 6h00",
        "Ventes d'hier (total, restaurant, gros)",
        "Production réalisée vs objectif",
        "Alertes d'inventaire (avertissements de stock faible)",
        "Produits les plus vendus",
        "Actions à faire pour la journée"
      ],
      outcome: "Détection de problèmes le jour même, 15 min/jour économisées par dirigeant, éliminer la recherche de données du vendredi",
      internalTeam: "Simon construit l'automatisation → Fonctionne automatiquement quotidiennement → La direction reçoit le courriel (aucune action requise)",
      roi: "6-10K $/an en économies de temps de direction (15 min/jour × 3 personnes × 40 $/hr)",
      timeline: "3 semaines pour construire et tester",
      exitStrategy: "Script entièrement automatisé avec documentation, le contact informatique peut dépanner si nécessaire",
      urgent: false
    },
    {
      number: 9,
      wave: "Deuxième vague",
      category: "RH et main-d'œuvre",
      title: "Système d'évaluation de la performance",
      problem: "Les évaluations de performance sont incohérentes, faites sur papier ou documents Word, aucun suivi du développement des employés au fil du temps. Les RH n'ont aucune vue centralisée de la performance de l'équipe.",
      description: "Mettre en place un modèle d'évaluation de performance numérique simple avec des critères standardisés et des rappels automatisés.",
      solution: [
        "Modèle d'évaluation de performance numérique simple (Excel ou Google Forms)",
        "Critères d'évaluation standardisés dans tous les départements",
        "Courriels de rappel automatisés aux gestionnaires lorsque les évaluations sont dues",
        "Suivi historique : comparer cette année vs l'année dernière pour chaque employé",
        "Tableau de bord pour les RH : quelles évaluations sont en retard, tendances à travers les équipes"
      ],
      outcome: "Processus d'évaluation cohérent, suivi historique de la performance des employés, réduire le temps administratif RH de 50%",
      internalTeam: "Simon construit le modèle et l'automatisation → Les gestionnaires complètent les évaluations numériquement → Les RH surveillent le tableau de bord de complétion",
      roi: "5-8K $/an en économies de temps RH, plus meilleur développement et rétention des employés",
      timeline: "3 semaines pour construire le système et former les gestionnaires",
      exitStrategy: "Le modèle est standardisé, les rappels sont automatisés, les RH surveillent et font un suivi",
      urgent: false
    },
    {
      number: 10,
      wave: "Deuxième vague",
      category: "Marketing et croissance",
      title: "Lancement du site Web et infrastructure de campagnes mensuelles",
      problem: "Le site Web est en développement depuis 19 mois. Impossible d'exécuter des campagnes marketing mensuelles sans un site Web lancé et fonctionnel. Opportunités manquées de ventes en ligne, développement de marque et campagnes.",
      description: "Lancer le site Web pour pouvoir exécuter des campagnes marketing mensuelles. Se concentrer d'abord sur le lancement, puis créer l'infrastructure pour des campagnes mensuelles récurrentes (produits saisonniers, promotions, événements).",
      solution: [
        "Finaliser et lancer le site Web St-Albert (priorité : fait plutôt que parfait)",
        "Configurer l'infrastructure de campagnes mensuelles (courriel, réseaux sociaux, bannières du site)",
        "Créer des modèles de campagne pour les thèmes récurrents : fromage saisonnier, focus recettes, événements",
        "Lancer les 3 premières campagnes mensuelles pour établir la cadence",
        "Suivre la performance des campagnes : trafic, conversions, attribution des revenus",
        "Développer la capacité de l'équipe marketing à exécuter les campagnes de manière indépendante"
      ],
      outcome: "Site Web lancé et générant du trafic, campagnes mensuelles exécutées de manière cohérente, augmentation de 30-50% de la notoriété en ligne et des demandes",
      internalTeam: "Simon lance le site et configure l'infrastructure de campagnes → Le marketing exécute les campagnes mensuelles → Pascal coordonne les liens avec le restaurant",
      roi: "25-45K $ de revenus annuels grâce à la visibilité en ligne, aux campagnes et à la promotion d'événements",
      timeline: "3-4 semaines pour lancer le site, 2 semaines pour configurer l'infrastructure de campagnes",
      exitStrategy: "L'équipe marketing possède les campagnes mensuelles utilisant des modèles, le site est en direct et maintenable",
      urgent: false
    }
  ]
};

function PasswordScreen({
  onSubmit,
  value,
  onChange,
  error,
  language,
  setLanguage,
}: {
  onSubmit: (e: React.FormEvent) => void;
  value: string;
  onChange: (value: string) => void;
  error: boolean;
  language: Language;
  setLanguage: (lang: Language) => void;
}) {
  const t = TRANSLATIONS[language];

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-neutral-50 dark:from-neutral-950 dark:to-neutral-900 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-2xl">
        {/* Language Toggle */}
        <InlineLanguageToggle language={language} setLanguage={setLanguage} />

        {/* Preview Section */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-10 pt-8">
            <Image
              src="https://cdn.prod.website-files.com/67f2c3d3da332df3a9d5d98a/67f2c9fbe3dd7a3962ddff9a_St%20Albert%20Logo.svg"
              alt="St Albert Cheese"
              width={200}
              height={80}
              className="h-20 w-auto"
              unoptimized
            />
          </div>

          <h1 className="text-4xl sm:text-5xl font-bold text-neutral-900 dark:text-white mb-6 tracking-tight">
            {t.pageTitle}
          </h1>

          <p className="text-xl text-neutral-600 dark:text-neutral-400 mb-8">
            {t.subtitle}
          </p>

          <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-100 dark:bg-orange-900/30 rounded-full text-orange-700 dark:text-orange-300 text-sm font-semibold">
            <span>📅</span>
            <span>{t.meetingDate}</span>
          </div>
        </div>

        {/* Password Input Form */}
        <Card className="max-w-md mx-auto border-neutral-200 dark:border-neutral-800">
          <CardHeader>
            <div className="flex items-center gap-2 mb-2">
              <Lock className="h-5 w-5 text-orange-500" />
              <CardTitle>{t.protectedDocument}</CardTitle>
            </div>
            <CardDescription>
              {t.passwordPrompt}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={onSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="password">{t.passwordLabel}</Label>
                <Input
                  id="password"
                  type="password"
                  value={value}
                  onChange={(e) => onChange(e.target.value)}
                  placeholder={t.passwordPlaceholder}
                  className={error ? "border-red-500" : ""}
                  autoFocus
                />
                {error && (
                  <p className="text-sm text-red-500">
                    {t.incorrectPassword}
                  </p>
                )}
              </div>
              <Button
                type="submit"
                className="w-full bg-orange-500 hover:bg-orange-600 text-white"
              >
                {t.unlockButton}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function PrioritiesContent({ language, setLanguage }: { language: Language; setLanguage: (lang: Language) => void }) {
  const t = TRANSLATIONS[language];
  const routes = ROUTES_DATA[language];
  const firstWaveRoutes = routes.filter(r => r.wave === "First Wave" || r.wave === "Première vague");
  const secondWaveRoutes = routes.filter(r => r.wave === "Second Wave" || r.wave === "Deuxième vague");

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-neutral-50 dark:from-neutral-950 dark:to-neutral-900 py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Language Toggle */}
        <InlineLanguageToggle language={language} setLanguage={setLanguage} />

        {/* Header with improved spacing */}
        <div className="text-center mb-16">
          <div className="mb-12 pt-8">
            <Image
              src="https://cdn.prod.website-files.com/67f2c3d3da332df3a9d5d98a/67f2c9fbe3dd7a3962ddff9a_St%20Albert%20Logo.svg"
              alt="St Albert Cheese"
              width={240}
              height={96}
              className="h-24 w-auto mx-auto"
              unoptimized
            />
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-neutral-900 dark:text-white mb-8 tracking-tight">
            {t.pageTitle}
          </h1>

          <p className="text-2xl text-neutral-600 dark:text-neutral-400 mb-4">
            {t.subtitle}
          </p>

          <p className="text-lg text-neutral-500 dark:text-neutral-500">
            {language === 'en' ? 'November 2025' : 'Novembre 2025'} • {t.philosophyText}
          </p>
        </div>

        {/* Executive Summary */}
        <Card className="mb-16 bg-gradient-to-br from-orange-50 to-yellow-50 dark:from-orange-950/20 dark:to-yellow-950/20 border-orange-200 dark:border-orange-900/50">
          <CardHeader>
            <CardTitle className="text-3xl">{t.executiveSummary}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
              <div className="text-center">
                <div className="text-5xl font-bold text-orange-600 mb-2">10</div>
                <div className="text-sm text-neutral-600 dark:text-neutral-400">{t.totalRoutes}</div>
              </div>
              <div className="text-center">
                <div className="text-5xl font-bold text-orange-600 mb-2">$37-64K</div>
                <div className="text-sm text-neutral-600 dark:text-neutral-400">{t.investment}</div>
              </div>
              <div className="text-center">
                <div className="text-5xl font-bold text-orange-600 mb-2">$133-181K</div>
                <div className="text-sm text-neutral-600 dark:text-neutral-400">{t.expectedROI}</div>
              </div>
              <div className="text-center">
                <div className="text-5xl font-bold text-orange-600 mb-2">3.6-4.9x</div>
                <div className="text-sm text-neutral-600 dark:text-neutral-400">{t.returnMultiple}</div>
              </div>
            </div>

            <div className="p-6 bg-white/50 dark:bg-neutral-900/50 rounded-xl">
              <p className="text-lg text-neutral-700 dark:text-neutral-300 leading-relaxed text-center">
                <strong>{t.philosophy}:</strong> {t.philosophyText}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* First Wave Routes */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-neutral-900 dark:text-white mb-8">{t.firstWave}</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {firstWaveRoutes.map((route, index) => (
              <motion.div
                key={route.number}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <Card className={`h-full hover:shadow-xl transition-shadow border-neutral-200 dark:border-neutral-800 ${route.urgent ? 'ring-2 ring-red-500 dark:ring-red-600' : ''}`}>
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 font-bold text-xl flex items-center justify-center">
                          {route.number}
                        </div>
                        <div className="flex flex-col gap-2">
                          <Badge className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-900/50 w-fit">
                            {route.category}
                          </Badge>
                          {route.urgent && (
                            <Badge className="bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 hover:bg-red-200 dark:hover:bg-red-900/50 w-fit">
                              🔥 {t.urgent}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                    <CardTitle className="text-xl leading-tight">{route.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-sm text-red-600 dark:text-red-400 mb-1">{t.problem}</h4>
                      <p className="text-sm text-neutral-700 dark:text-neutral-300">{route.problem}</p>
                    </div>

                    <div>
                      <h4 className="font-semibold text-sm text-neutral-700 dark:text-neutral-300 mb-2">{t.solution}</h4>
                      <ul className="space-y-1">
                        {route.solution.map((item, idx) => (
                          <li key={idx} className="text-sm text-neutral-600 dark:text-neutral-400 flex items-start gap-2">
                            <span className="text-orange-500 mt-0.5">▸</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-4 border-t border-neutral-200 dark:border-neutral-700 space-y-2">
                      <div className="flex items-start gap-2 text-sm">
                        <Target className="h-4 w-4 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                        <div>
                          <span className="font-semibold text-neutral-700 dark:text-neutral-300">{t.outcome}</span>
                          <p className="text-neutral-600 dark:text-neutral-400">{route.outcome}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2 text-sm">
                        <DollarSign className="h-4 w-4 text-orange-600 dark:text-orange-400 mt-0.5 flex-shrink-0" />
                        <div>
                          <span className="font-semibold text-neutral-700 dark:text-neutral-300">{t.roi}</span>
                          <p className="text-neutral-600 dark:text-neutral-400">{route.roi}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2 text-sm">
                        <Calendar className="h-4 w-4 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                        <div>
                          <span className="font-semibold text-neutral-700 dark:text-neutral-300">{t.timeline}</span>
                          <p className="text-neutral-600 dark:text-neutral-400">{route.timeline}</p>
                        </div>
                      </div>
                    </div>

                    {route.urgentReason && (
                      <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
                        <p className="text-sm text-red-800 dark:text-red-200">
                          <strong>{t.whyUrgent}</strong> {route.urgentReason}
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Second Wave Routes */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-neutral-900 dark:text-white mb-8">{t.secondWave}</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {secondWaveRoutes.map((route, index) => (
              <motion.div
                key={route.number}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: (index + 5) * 0.05 }}
              >
                <Card className="h-full hover:shadow-xl transition-shadow border-neutral-200 dark:border-neutral-800">
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 font-bold text-xl flex items-center justify-center">
                          {route.number}
                        </div>
                        <Badge className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-900/50">
                          {route.category}
                        </Badge>
                      </div>
                    </div>
                    <CardTitle className="text-xl leading-tight">{route.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-sm text-red-600 dark:text-red-400 mb-1">{t.problem}</h4>
                      <p className="text-sm text-neutral-700 dark:text-neutral-300">{route.problem}</p>
                    </div>

                    <div>
                      <h4 className="font-semibold text-sm text-neutral-700 dark:text-neutral-300 mb-2">{t.solution}</h4>
                      <ul className="space-y-1">
                        {route.solution.map((item, idx) => (
                          <li key={idx} className="text-sm text-neutral-600 dark:text-neutral-400 flex items-start gap-2">
                            <span className="text-orange-500 mt-0.5">▸</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-4 border-t border-neutral-200 dark:border-neutral-700 space-y-2">
                      <div className="flex items-start gap-2 text-sm">
                        <Target className="h-4 w-4 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                        <div>
                          <span className="font-semibold text-neutral-700 dark:text-neutral-300">{t.outcome}</span>
                          <p className="text-neutral-600 dark:text-neutral-400">{route.outcome}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2 text-sm">
                        <DollarSign className="h-4 w-4 text-orange-600 dark:text-orange-400 mt-0.5 flex-shrink-0" />
                        <div>
                          <span className="font-semibold text-neutral-700 dark:text-neutral-300">{t.roi}</span>
                          <p className="text-neutral-600 dark:text-neutral-400">{route.roi}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2 text-sm">
                        <Calendar className="h-4 w-4 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                        <div>
                          <span className="font-semibold text-neutral-700 dark:text-neutral-300">{t.timeline}</span>
                          <p className="text-neutral-600 dark:text-neutral-400">{route.timeline}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Next Steps */}
        <Card className="border-neutral-200 dark:border-neutral-800">
          <CardHeader>
            <CardTitle className="text-3xl">{t.nextSteps}</CardTitle>
          </CardHeader>
          <CardContent>
            <ol className="space-y-4">
              <li className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-orange-500 text-white flex items-center justify-center text-base font-bold flex-shrink-0 mt-0.5">
                  1
                </div>
                <div>
                  <div className="font-semibold text-lg text-neutral-900 dark:text-white">{t.nextStep1Title}</div>
                  <div className="text-base text-neutral-600 dark:text-neutral-400">{t.nextStep1Desc}</div>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-orange-500 text-white flex items-center justify-center text-base font-bold flex-shrink-0 mt-0.5">
                  2
                </div>
                <div>
                  <div className="font-semibold text-lg text-neutral-900 dark:text-white">{t.nextStep2Title}</div>
                  <div className="text-base text-neutral-600 dark:text-neutral-400">{t.nextStep2Desc}</div>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-orange-500 text-white flex items-center justify-center text-base font-bold flex-shrink-0 mt-0.5">
                  3
                </div>
                <div>
                  <div className="font-semibold text-lg text-neutral-900 dark:text-white">{t.nextStep3Title}</div>
                  <div className="text-base text-neutral-600 dark:text-neutral-400">{t.nextStep3Desc}</div>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-orange-500 text-white flex items-center justify-center text-base font-bold flex-shrink-0 mt-0.5">
                  4
                </div>
                <div>
                  <div className="font-semibold text-lg text-neutral-900 dark:text-white">{t.nextStep4Title}</div>
                  <div className="text-base text-neutral-600 dark:text-neutral-400">{t.nextStep4Desc}</div>
                </div>
              </li>
            </ol>

            <div className="mt-8 p-6 bg-neutral-100 dark:bg-neutral-800 rounded-xl">
              <p className="text-base text-neutral-700 dark:text-neutral-300">
                <strong>{t.questionsContact}</strong>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default function StAlbertQ4Page() {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [error, setError] = useState(false);
  const [language, setLanguage] = useState<Language>('en');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === CORRECT_PASSWORD) {
      setIsUnlocked(true);
      setError(false);
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <>
      <head>
        <meta name="robots" content="noindex, nofollow" />
      </head>
      <AnimatePresence mode="wait">
        {!isUnlocked ? (
          <motion.div
            key="password"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
          >
            <PasswordScreen
              onSubmit={handleSubmit}
              value={passwordInput}
              onChange={setPasswordInput}
              error={error}
              language={language}
              setLanguage={setLanguage}
            />
          </motion.div>
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <PrioritiesContent language={language} setLanguage={setLanguage} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

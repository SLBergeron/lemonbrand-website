/**
 * ST-ALBERT WEBSITE LAUNCH CONTENT CALENDAR
 * ==========================================
 *
 * PURPOSE:
 * Password-protected content calendar for the St-Albert website launch campaign.
 * Shows the team exactly what content is posted on which day, including who's
 * responsible, what assets are needed, and where it's being posted.
 *
 * LAUNCH DATE: February 9, 2026
 *
 * DESIGN:
 * - Typography: Bricolage Grotesque (display) + IBM Plex Mono (data)
 * - Color: Deep blue (#001d4a) with warm cream (#faf8f5) and accent red
 * - Background: Subtle dot grid with radial gradient depth
 * - Motion: Staggered reveals, smooth hover transitions
 *
 * ACCESS:
 * - URL: /clients/st-albert-calendar
 * - Password: stalbert2026
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
import {
  Lock,
  Globe,
  Calendar,
  Facebook,
  Instagram,
  Linkedin,
  Youtube,
  Camera,
  ImageIcon,
  FileText,
  CheckCircle2,
  Rocket,
  Trophy,
  Vote,
  Heart,
  Mail,
  Printer,
  ChevronRight,
  X,
  Copy,
  Check,
  Expand,
  ExternalLink,
} from "lucide-react";

// Import calendar data from JSON
import calendarDataJson from "./calendar-data.json";

const CORRECT_PASSWORD = "stalbert2026";

type Language = "en" | "fr";

// Platform badge styles - more saturated, distinctive
const PLATFORM_COLORS = {
  facebook_fr: "bg-[#1877f2] text-white ring-1 ring-[#1877f2]/20",
  facebook_en: "bg-[#1877f2]/80 text-white ring-1 ring-[#1877f2]/20",
  instagram_story: "bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] text-white",
  instagram_reel: "bg-gradient-to-r from-[#405de6] to-[#833ab4] text-white",
  linkedin: "bg-[#0a66c2] text-white ring-1 ring-[#0a66c2]/20",
  youtube: "bg-[#ff0000] text-white ring-1 ring-[#ff0000]/20",
  newsletter: "bg-[#00a67e] text-white ring-1 ring-[#00a67e]/20",
  press: "bg-[#374151] text-white ring-1 ring-[#374151]/20",
};

// Status colors - refined with better contrast
const STATUS_COLORS = {
  ready: "bg-emerald-500/10 text-emerald-700 ring-1 ring-emerald-500/30",
  video_needed: "bg-rose-500/10 text-rose-700 ring-1 ring-rose-500/30",
  graphic_needed: "bg-amber-500/10 text-amber-700 ring-1 ring-amber-500/30",
  draft: "bg-slate-500/10 text-slate-600 ring-1 ring-slate-500/30",
  to_record: "bg-rose-500/10 text-rose-700 ring-1 ring-rose-500/30",
  to_write: "bg-violet-500/10 text-violet-700 ring-1 ring-violet-500/30",
  to_create: "bg-amber-500/10 text-amber-700 ring-1 ring-amber-500/30",
  to_prepare: "bg-sky-500/10 text-sky-700 ring-1 ring-sky-500/30",
};

// Types
type Platform = keyof typeof PLATFORM_COLORS;
type Status = keyof typeof STATUS_COLORS;

interface Post {
  id: string;
  date: string;
  platform: Platform;
  status: Status;
  title: { fr: string; en: string };
  fullPost: { fr: string; en: string };
  asset?: {
    type: "video" | "graphic" | "photo" | "document";
    description: { fr: string; en: string };
    url?: string;
    thumbnail?: string;
  };
  hashtags?: string[];
  cta?: { fr: string; en: string };
}

interface DayData {
  date: string;
  dayName: { fr: string; en: string };
  milestone?: { fr: string; en: string; type: string };
  posts: Post[];
}

interface WeekData {
  weekNumber: number;
  title: { fr: string; en: string };
  subtitle?: { fr: string; en: string };
  days: DayData[];
}

// Transform JSON data to match component expectations
const CALENDAR_DATA: WeekData[] = calendarDataJson.weeks.map((week) => ({
  weekNumber: week.weekNumber,
  title: week.title,
  subtitle: week.subtitle,
  days: week.days.map((day) => ({
    date: day.date,
    dayName: day.dayName,
    milestone: day.milestone,
    posts: day.posts as Post[],
  })),
}));

// Videos to record data
const VIDEOS_TO_RECORD = [
  { num: 1, topic: { fr: "Notre histoire", en: "Notre histoire" }, format: "Desktop (16:9)", export: "1080p YouTube" },
  { num: 2, topic: { fr: "Notre histoire", en: "Notre histoire" }, format: "Mobile (9:16)", export: "Reel/Story" },
  { num: 3, topic: { fr: "Produits et experience", en: "Produits et experience" }, format: "Desktop (16:9)", export: "1080p YouTube" },
  { num: 4, topic: { fr: "Produits et experience", en: "Produits et experience" }, format: "Mobile (9:16)", export: "Reel/Story" },
  { num: 5, topic: { fr: "Affaires et carrieres", en: "Affaires et carrieres" }, format: "Desktop (16:9)", export: "1080p YouTube" },
  { num: 6, topic: { fr: "Affaires et carrieres", en: "Affaires et carrieres" }, format: "Mobile (9:16)", export: "Reel/Story" },
];

// Graphics needed data
const GRAPHICS_NEEDED = [
  { name: { fr: "Annonce concours", en: "Contest announcement" }, platforms: "FB, IG, LinkedIn", priority: { fr: "Haute", en: "High" } },
  { name: { fr: 'Banniere "130 ans" jour de lancement', en: '"130 years" launch day banner' }, platforms: { fr: "Tous", en: "All" }, priority: { fr: "Haute", en: "High" } },
  { name: { fr: "Gabarits themes quotidiens", en: "Daily theme templates" }, platforms: "IG Stories", priority: { fr: "Moyenne", en: "Medium" } },
  { name: { fr: "Annonce vote ouvert", en: "Voting open announcement" }, platforms: { fr: "Tous", en: "All" }, priority: { fr: "Pour 23 fev", en: "For Feb 23" } },
  { name: { fr: "Annonce gagnants", en: "Winner announcement" }, platforms: { fr: "Tous", en: "All" }, priority: { fr: "Pour 5 mars", en: "For Mar 5" } },
];

// Translations
const TRANSLATIONS = {
  en: {
    pageTitle: "Content Calendar",
    subtitle: "Website Launch Campaign",
    launchDate: "Launch: February 9, 2026",
    protectedDocument: "Protected Document",
    passwordPrompt: "Enter the password to access the calendar",
    passwordLabel: "Password",
    passwordPlaceholder: "Enter password",
    incorrectPassword: "Incorrect password. Please try again.",
    unlockButton: "View Calendar",
    legend: "Legend",
    platforms: "Platforms",
    status: "Asset Status",
    ready: "Ready",
    videoNeeded: "Video needed",
    graphicNeeded: "Graphic needed",
    draft: "Draft",
    toRecord: "To record",
    toWrite: "To write",
    toCreate: "To create",
    toPrepare: "To prepare",
    printCalendar: "Print / PDF",
    asset: "Asset",
    todayTomorrow: "Today + Tomorrow",
    prepWeek: "Final Prep",
    week1: "Week 1: Launch",
    week2: "Week 2: Loyalty + Submissions",
    week3: "Week 3: Voting",
    week4: "Week 4: Winners",
    questionsContact: "Questions? Contact Simon at simon@lemonbrand.io",
    videosToRecord: "Videos to Record Today",
    graphicsNeeded: "Graphics Needed by Friday",
    timelineSummary: "Timeline",
    copyToClipboard: "Copy to clipboard",
    copied: "Copied!",
    close: "Close",
    fullPost: "Full Post",
    hashtags: "Hashtags",
  },
  fr: {
    pageTitle: "Calendrier de contenu",
    subtitle: "Campagne de lancement du site Web",
    launchDate: "Lancement : 9 fevrier 2026",
    protectedDocument: "Document protege",
    passwordPrompt: "Entrez le mot de passe pour acceder au calendrier",
    passwordLabel: "Mot de passe",
    passwordPlaceholder: "Entrer le mot de passe",
    incorrectPassword: "Mot de passe incorrect. Veuillez reessayer.",
    unlockButton: "Voir le calendrier",
    legend: "Legende",
    platforms: "Plateformes",
    status: "Statut des ressources",
    ready: "Pret",
    videoNeeded: "Video requise",
    graphicNeeded: "Graphique requis",
    draft: "Brouillon",
    toRecord: "A enregistrer",
    toWrite: "A rediger",
    toCreate: "A creer",
    toPrepare: "A preparer",
    printCalendar: "Imprimer / PDF",
    asset: "Ressource",
    todayTomorrow: "Aujourd'hui + Demain",
    prepWeek: "Preparation finale",
    week1: "Semaine 1 : Lancement",
    week2: "Semaine 2 : Fidelite + Soumissions",
    week3: "Semaine 3 : Vote",
    week4: "Semaine 4 : Gagnants",
    questionsContact: "Questions ? Contactez Simon a simon@lemonbrand.io",
    videosToRecord: "Videos a enregistrer aujourd'hui",
    graphicsNeeded: "Graphiques requis d'ici vendredi",
    timelineSummary: "Calendrier",
    copyToClipboard: "Copier dans le presse-papier",
    copied: "Copie!",
    close: "Fermer",
    fullPost: "Publication complete",
    hashtags: "Hashtags",
  },
};

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const modalVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: 20,
    transition: { duration: 0.15 },
  },
};

// Components
function InlineLanguageToggle({ language, setLanguage }: { language: Language; setLanguage: (lang: Language) => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center justify-center gap-1 mb-10 print:hidden"
    >
      <div className="flex items-center gap-1 p-1 rounded-full bg-[#001d4a]/5 backdrop-blur-sm">
        <Globe className="h-4 w-4 text-[#001d4a]/50 ml-2" />
        <button
          onClick={() => setLanguage("en")}
          className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300 ${
            language === "en"
              ? "bg-[#001d4a] text-white shadow-lg shadow-[#001d4a]/25"
              : "text-[#001d4a]/70 hover:text-[#001d4a]"
          }`}
        >
          EN
        </button>
        <button
          onClick={() => setLanguage("fr")}
          className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300 ${
            language === "fr"
              ? "bg-[#001d4a] text-white shadow-lg shadow-[#001d4a]/25"
              : "text-[#001d4a]/70 hover:text-[#001d4a]"
          }`}
        >
          FR
        </button>
      </div>
    </motion.div>
  );
}

function PlatformIcon({ platform }: { platform: Platform }) {
  const iconClass = "h-3 w-3";
  switch (platform) {
    case "facebook_fr":
    case "facebook_en":
      return <Facebook className={iconClass} />;
    case "instagram_story":
    case "instagram_reel":
      return <Instagram className={iconClass} />;
    case "linkedin":
      return <Linkedin className={iconClass} />;
    case "youtube":
      return <Youtube className={iconClass} />;
    case "newsletter":
      return <Mail className={iconClass} />;
    case "press":
      return <FileText className={iconClass} />;
    default:
      return null;
  }
}

function PlatformLabel({ platform, language }: { platform: Platform; language: Language }) {
  const labels: Record<Platform, { fr: string; en: string }> = {
    facebook_fr: { fr: "FB FR", en: "FB FR" },
    facebook_en: { fr: "FB EN", en: "FB EN" },
    instagram_story: { fr: "Story", en: "Story" },
    instagram_reel: { fr: "Reel", en: "Reel" },
    linkedin: { fr: "LinkedIn", en: "LinkedIn" },
    youtube: { fr: "YouTube", en: "YouTube" },
    newsletter: { fr: "Email", en: "Email" },
    press: { fr: "Presse", en: "Press" },
  };
  return <span className="font-mono text-[10px] tracking-wide">{labels[platform][language]}</span>;
}

function StatusIcon({ status }: { status: Status }) {
  const iconClass = "h-3 w-3";
  switch (status) {
    case "ready":
      return <CheckCircle2 className={iconClass} />;
    case "video_needed":
    case "to_record":
      return <Camera className={iconClass} />;
    case "graphic_needed":
    case "to_create":
      return <ImageIcon className={iconClass} />;
    case "draft":
    case "to_write":
    case "to_prepare":
      return <FileText className={iconClass} />;
    default:
      return null;
  }
}

function StatusLabel({ status, language }: { status: Status; language: Language }) {
  const t = TRANSLATIONS[language];
  const labels: Record<Status, string> = {
    ready: t.ready,
    video_needed: t.videoNeeded,
    graphic_needed: t.graphicNeeded,
    draft: t.draft,
    to_record: t.toRecord,
    to_write: t.toWrite,
    to_create: t.toCreate,
    to_prepare: t.toPrepare,
  };
  return <span className="font-mono text-[10px] tracking-wide">{labels[status]}</span>;
}

function MilestoneIcon({ type }: { type: string }) {
  const iconClass = "h-3.5 w-3.5";
  switch (type) {
    case "today":
      return <Calendar className={iconClass} />;
    case "launch":
      return <Rocket className={iconClass} />;
    case "contest":
      return <Trophy className={iconClass} />;
    case "loyalty":
    case "holiday":
      return <Heart className={iconClass} />;
    case "winners":
      return <Trophy className={iconClass} />;
    default:
      return <Vote className={iconClass} />;
  }
}

function AssetTypeIcon({ type }: { type: string }) {
  const iconClass = "h-3.5 w-3.5";
  switch (type) {
    case "video":
      return <Camera className={iconClass} />;
    case "graphic":
    case "photo":
      return <ImageIcon className={iconClass} />;
    case "document":
      return <FileText className={iconClass} />;
    default:
      return <FileText className={iconClass} />;
  }
}

// Expanded Post Modal
function ExpandedPostModal({
  post,
  language,
  onClose,
}: {
  post: Post;
  language: Language;
  onClose: () => void;
}) {
  const t = TRANSLATIONS[language];
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const textToCopy = post.fullPost[language] + (post.hashtags ? "\n\n" + post.hashtags.join(" ") : "");
    await navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Handle escape key
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      onClose();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={handleBackdropClick}
      onKeyDown={handleKeyDown}
      tabIndex={-1}
    >
      <motion.div
        variants={modalVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between p-5 border-b border-[#001d4a]/10 bg-gradient-to-r from-[#001d4a]/[0.02] to-transparent">
          <div className="flex items-center gap-3">
            <Badge className={`${PLATFORM_COLORS[post.platform]} text-[11px] px-3 py-1.5 flex items-center gap-1.5 font-medium rounded-lg`}>
              <PlatformIcon platform={post.platform} />
              <PlatformLabel platform={post.platform} language={language} />
            </Badge>
            <Badge className={`${STATUS_COLORS[post.status]} text-[11px] px-2.5 py-1.5 flex items-center gap-1 rounded-lg`}>
              <StatusIcon status={post.status} />
              <StatusLabel status={post.status} language={language} />
            </Badge>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-[#001d4a]/5 transition-colors"
            aria-label={t.close}
          >
            <X className="h-5 w-5 text-[#001d4a]/50" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Title */}
          <h3 className="text-lg font-semibold text-[#001d4a] mb-4 leading-relaxed" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>
            {post.title[language]}
          </h3>

          {/* Full Post Content */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-xs font-semibold text-[#001d4a]/40 uppercase tracking-wider">{t.fullPost}</h4>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleCopy}
                className="h-8 px-3 text-xs gap-1.5 text-[#001d4a]/60 hover:text-[#001d4a] hover:bg-[#001d4a]/5"
              >
                {copied ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-emerald-600" />
                    <span className="text-emerald-600">{t.copied}</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5" />
                    {t.copyToClipboard}
                  </>
                )}
              </Button>
            </div>
            <div className="bg-[#001d4a]/[0.02] rounded-xl p-4 border border-[#001d4a]/5">
              <p className="text-sm text-[#001d4a] leading-relaxed whitespace-pre-wrap font-mono">
                {post.fullPost[language]}
              </p>
            </div>
          </div>

          {/* Hashtags */}
          {post.hashtags && post.hashtags.length > 0 && (
            <div className="mb-6">
              <h4 className="text-xs font-semibold text-[#001d4a]/40 uppercase tracking-wider mb-2">{t.hashtags}</h4>
              <div className="flex flex-wrap gap-2">
                {post.hashtags.map((tag, idx) => (
                  <Badge
                    key={idx}
                    className="bg-sky-500/10 text-sky-700 ring-1 ring-sky-500/20 text-xs px-2.5 py-1 rounded-md font-mono"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Asset Info */}
          {post.asset && (
            <div className="mb-6">
              <h4 className="text-xs font-semibold text-[#001d4a]/40 uppercase tracking-wider mb-2">{t.asset}</h4>
              <div className="flex items-center gap-3 p-3 bg-[#001d4a]/[0.02] rounded-xl border border-[#001d4a]/5">
                <div className="h-10 w-10 rounded-lg bg-[#001d4a]/5 flex items-center justify-center">
                  <AssetTypeIcon type={post.asset.type} />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-[#001d4a]">{post.asset.description[language]}</p>
                  <p className="text-xs text-[#001d4a]/50 capitalize">{post.asset.type}</p>
                </div>
                {post.asset.url && (
                  <a
                    href={post.asset.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg hover:bg-[#001d4a]/5 transition-colors"
                  >
                    <ExternalLink className="h-4 w-4 text-[#001d4a]/50" />
                  </a>
                )}
              </div>
              {(post.asset.thumbnail || post.asset.url) && (
                <div className="mt-3 rounded-xl overflow-hidden border border-[#001d4a]/10 bg-[#001d4a]/5">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={post.asset.thumbnail || post.asset.url}
                    alt={post.asset.description[language]}
                    className="w-full h-auto"
                  />
                </div>
              )}
            </div>
          )}

          {/* CTA */}
          {post.cta && (
            <div className="p-3 bg-gradient-to-r from-[#001d4a]/5 to-transparent rounded-xl border border-[#001d4a]/5">
              <p className="text-xs text-[#001d4a]/50 mb-1">Call to Action</p>
              <p className="text-sm font-medium text-[#001d4a]">{post.cta[language]}</p>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

function ContentCard({
  post,
  language,
  index,
  onExpand,
}: {
  post: Post;
  language: Language;
  index: number;
  onExpand: (post: Post) => void;
}) {
  const t = TRANSLATIONS[language];

  // Truncate full post for preview
  const previewText = post.fullPost[language].split("\n")[0].slice(0, 80);
  const hasMore = post.fullPost[language].length > 80 || post.fullPost[language].includes("\n");

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.03, duration: 0.25 }}
      onClick={() => onExpand(post)}
      className="group relative rounded-lg p-3.5 bg-white border border-[#001d4a]/8 hover:border-[#001d4a]/15 hover:shadow-md hover:shadow-[#001d4a]/5 transition-all duration-200 cursor-pointer"
    >
      {/* Platform & Status badges */}
      <div className="flex items-center justify-between gap-2 mb-2.5">
        <Badge className={`${PLATFORM_COLORS[post.platform]} text-[10px] px-2.5 py-1 flex items-center gap-1.5 font-medium rounded-md`}>
          <PlatformIcon platform={post.platform} />
          <PlatformLabel platform={post.platform} language={language} />
        </Badge>
        <Badge className={`${STATUS_COLORS[post.status]} text-[10px] px-2 py-1 flex items-center gap-1 rounded-md`}>
          <StatusIcon status={post.status} />
          <StatusLabel status={post.status} language={language} />
        </Badge>
      </div>

      {/* Title */}
      <p className="text-[13px] text-[#001d4a] font-medium leading-relaxed">{post.title[language]}</p>

      {/* Preview text */}
      <p className="text-xs text-[#001d4a]/50 mt-1.5 line-clamp-2">
        {previewText}{hasMore ? "..." : ""}
      </p>

      {/* Asset indicator */}
      {post.asset && (
        <div className="flex items-center gap-1.5 mt-2 pt-2 border-t border-[#001d4a]/5">
          <AssetTypeIcon type={post.asset.type} />
          <p className="text-[10px] text-[#001d4a]/40 font-mono">
            {post.asset.description[language]}
          </p>
        </div>
      )}

      {/* Expand indicator */}
      <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
        <Expand className="h-3.5 w-3.5 text-[#001d4a]/30" />
      </div>
    </motion.div>
  );
}

function DayColumn({
  day,
  language,
  onExpandPost,
}: {
  day: DayData;
  language: Language;
  onExpandPost: (post: Post) => void;
}) {
  const isToday = day.date === "2026-02-06";
  return (
    <div
      className={`min-w-[240px] flex-shrink-0 border-r border-[#001d4a]/8 last:border-r-0 ${
        isToday ? "bg-gradient-to-b from-amber-50/80 to-transparent" : ""
      }`}
    >
      {/* Fixed height header - always same size regardless of milestone */}
      <div className={`h-[72px] p-4 border-b border-[#001d4a]/8 flex flex-col justify-center ${isToday ? "bg-amber-100/50" : "bg-[#001d4a]/[0.02]"}`}>
        <p className={`text-sm font-semibold font-mono tracking-tight ${isToday ? "text-amber-900" : "text-[#001d4a]/70"}`}>
          {day.dayName[language]}
        </p>
        {day.milestone ? (
          <Badge className="mt-1.5 bg-gradient-to-r from-[#e63946] to-[#ff6b6b] text-white text-[10px] px-2 py-0.5 flex items-center gap-1 w-fit shadow-md shadow-[#e63946]/20 font-semibold tracking-wide">
            <MilestoneIcon type={day.milestone.type} />
            {day.milestone[language]}
          </Badge>
        ) : (
          <div className="h-[22px]" /> // Spacer to maintain consistent height
        )}
      </div>
      {/* Content area with proper padding for rounded corners */}
      <div className="p-3 space-y-3 max-h-[520px] overflow-y-auto scrollbar-thin">
        {day.posts.map((post, idx) => (
          <ContentCard key={post.id} post={post} language={language} index={idx} onExpand={onExpandPost} />
        ))}
        {day.posts.length === 0 && <p className="text-xs text-[#001d4a]/30 text-center py-8 font-mono">—</p>}
      </div>
    </div>
  );
}

function WeekRow({
  week,
  language,
  onExpandPost,
}: {
  week: WeekData;
  language: Language;
  index: number;
  onExpandPost: (post: Post) => void;
}) {
  return (
    <motion.div
      variants={itemVariants}
      className="mb-10 print:break-inside-avoid"
    >
      <div className="rounded-2xl overflow-hidden shadow-xl shadow-[#001d4a]/8 bg-white">
        {/* Week header - directly styled div instead of CardHeader */}
        <div className="bg-gradient-to-r from-[#001d4a] via-[#002d6a] to-[#001d4a] text-white py-5 px-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold tracking-tight text-white" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>
                {week.title[language]}
              </h3>
              {week.subtitle && (
                <p className="text-white/60 font-mono text-sm mt-1">
                  {week.subtitle[language]}
                </p>
              )}
            </div>
            <div className="h-11 w-11 rounded-xl bg-white/10 flex items-center justify-center backdrop-blur-sm">
              <span className="text-xl font-bold text-white/90 font-mono">{week.weekNumber || "P"}</span>
            </div>
          </div>
        </div>
        {/* Days grid */}
        <div className="bg-[#faf8f5]/50">
          <div className="flex overflow-x-auto scrollbar-thin scrollbar-thumb-[#001d4a]/15 scrollbar-track-transparent">
            {week.days.map((day) => (
              <DayColumn key={day.date} day={day} language={language} onExpandPost={onExpandPost} />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function Legend({ language }: { language: Language }) {
  const t = TRANSLATIONS[language];
  return (
    <motion.div variants={itemVariants}>
      <Card className="mb-10 border-0 shadow-lg shadow-[#001d4a]/5 bg-white rounded-2xl print:break-inside-avoid">
        <CardHeader className="pb-2 pt-5 px-6">
          <CardTitle className="text-base font-semibold text-[#001d4a]" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>
            {t.legend}
          </CardTitle>
        </CardHeader>
        <CardContent className="px-6 pb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-mono text-[10px] font-semibold mb-3 text-[#001d4a]/40 uppercase tracking-wider">{t.platforms}</h4>
              <div className="flex flex-wrap gap-2">
                {(Object.keys(PLATFORM_COLORS) as Platform[]).map((platform) => (
                  <Badge key={platform} className={`${PLATFORM_COLORS[platform]} text-[10px] px-2.5 py-1 flex items-center gap-1.5 rounded-md`}>
                    <PlatformIcon platform={platform} />
                    <PlatformLabel platform={platform} language={language} />
                  </Badge>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-mono text-[10px] font-semibold mb-3 text-[#001d4a]/40 uppercase tracking-wider">{t.status}</h4>
              <div className="flex flex-wrap gap-2">
                {(["ready", "video_needed", "graphic_needed", "draft", "to_record", "to_write", "to_create", "to_prepare"] as Status[]).map((status) => (
                  <Badge key={status} className={`${STATUS_COLORS[status]} text-[10px] px-2.5 py-1 flex items-center gap-1.5 rounded-md`}>
                    <StatusIcon status={status} />
                    <StatusLabel status={status} language={language} />
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

// Day 1 video previews - Desktop recordings for YouTube upload
const DAY1_VIDEOS = [
  {
    src: "/clients/st-albert/videos/FR_Desktop_Jour1.mp4",
    label: { fr: "Jour 1 - Desktop (Francais)", en: "Day 1 - Desktop (French)" },
    lang: "FR",
    filename: "FR_Desktop_Jour1.mp4",
  },
  {
    src: "/clients/st-albert/videos/EN_Desktop_Jour1.mp4",
    label: { fr: "Jour 1 - Desktop (Anglais)", en: "Day 1 - Desktop (English)" },
    lang: "EN",
    filename: "EN_Desktop_Jour1.mp4",
  },
];

function VideoPreviewSection({ language }: { language: Language }) {
  return (
    <motion.div variants={itemVariants}>
      <Card className="mb-10 border-0 shadow-xl shadow-[#001d4a]/8 bg-white rounded-2xl overflow-hidden print:break-inside-avoid">
        <CardHeader className="border-b border-[#001d4a]/10 bg-gradient-to-r from-[#001d4a]/[0.03] to-transparent py-5 px-6">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base flex items-center gap-3 text-[#001d4a]" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>
              <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-[#ff0000] to-[#cc0000] flex items-center justify-center shadow-lg shadow-[#ff0000]/20">
                <Youtube className="h-4 w-4 text-white" />
              </div>
              {language === "fr" ? "Apercu videos - Jour 1" : "Video Preview - Day 1"}
            </CardTitle>
            <Badge className="bg-emerald-500/10 text-emerald-700 ring-1 ring-emerald-500/30 text-[11px] px-3 py-1 rounded-lg font-medium">
              <CheckCircle2 className="h-3 w-3 mr-1.5" />
              {language === "fr" ? "Pret pour YouTube" : "Ready for YouTube"}
            </Badge>
          </div>
          <CardDescription className="text-[#001d4a]/50 mt-2">
            {language === "fr"
              ? "Videos desktop 16:9 pour la chaine YouTube. Previsualisez avant de publier."
              : "Desktop 16:9 videos for YouTube channel. Preview before publishing."}
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {DAY1_VIDEOS.map((video) => (
              <div key={video.lang} className="space-y-3">
                <div className="flex items-center gap-2">
                  <Badge className={`${video.lang === "FR" ? "bg-[#001d4a] text-white" : "bg-[#001d4a]/10 text-[#001d4a]"} text-[11px] px-2.5 py-1 rounded-md font-mono font-semibold`}>
                    {video.lang}
                  </Badge>
                  <span className="text-sm font-medium text-[#001d4a]">{video.label[language]}</span>
                </div>
                <div className="rounded-xl overflow-hidden border border-[#001d4a]/10 bg-black">
                  <video
                    controls
                    preload="metadata"
                    className="w-full aspect-video"
                    playsInline
                  >
                    <source src={video.src} type="video/mp4" />
                    {language === "fr" ? "Votre navigateur ne supporte pas la video." : "Your browser does not support the video tag."}
                  </video>
                </div>
                <p className="text-[11px] text-[#001d4a]/40 font-mono">{video.filename}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

function VideosTable({ language }: { language: Language }) {
  const t = TRANSLATIONS[language];
  return (
    <motion.div variants={itemVariants}>
      <Card className="border-0 shadow-lg shadow-rose-500/10 bg-white rounded-2xl overflow-hidden print:break-inside-avoid">
        <CardHeader className="border-b border-rose-100/80 bg-gradient-to-r from-rose-50 to-rose-50/50 py-4 px-5">
          <CardTitle className="text-base flex items-center gap-3 text-rose-900" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>
            <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-rose-500 to-rose-600 flex items-center justify-center shadow-lg shadow-rose-500/25">
              <Camera className="h-4 w-4 text-white" />
            </div>
            {t.videosToRecord}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <table className="w-full text-sm">
            <thead className="bg-rose-50/50">
              <tr>
                <th className="px-5 py-3 text-left font-mono text-[10px] text-rose-900/40 uppercase tracking-wider">#</th>
                <th className="px-5 py-3 text-left font-mono text-[10px] text-rose-900/40 uppercase tracking-wider">Topic</th>
                <th className="px-5 py-3 text-left font-mono text-[10px] text-rose-900/40 uppercase tracking-wider">Format</th>
                <th className="px-5 py-3 text-left font-mono text-[10px] text-rose-900/40 uppercase tracking-wider">Export</th>
              </tr>
            </thead>
            <tbody>
              {VIDEOS_TO_RECORD.map((video) => (
                <tr key={video.num} className="border-t border-rose-100/60 hover:bg-rose-50/30 transition-colors">
                  <td className="px-5 py-3 font-mono text-rose-400">{video.num}</td>
                  <td className="px-5 py-3 font-medium text-[#001d4a]">{video.topic[language]}</td>
                  <td className="px-5 py-3 font-mono text-xs text-[#001d4a]/50">{video.format}</td>
                  <td className="px-5 py-3 font-mono text-xs text-[#001d4a]/50">{video.export}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </motion.div>
  );
}

function GraphicsTable({ language }: { language: Language }) {
  const t = TRANSLATIONS[language];
  return (
    <motion.div variants={itemVariants}>
      <Card className="border-0 shadow-lg shadow-amber-500/10 bg-white rounded-2xl overflow-hidden print:break-inside-avoid">
        <CardHeader className="border-b border-amber-100/80 bg-gradient-to-r from-amber-50 to-amber-50/50 py-4 px-5">
          <CardTitle className="text-base flex items-center gap-3 text-amber-900" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>
            <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center shadow-lg shadow-amber-500/25">
              <ImageIcon className="h-4 w-4 text-white" />
            </div>
            {t.graphicsNeeded}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <table className="w-full text-sm">
            <thead className="bg-amber-50/50">
              <tr>
                <th className="px-5 py-3 text-left font-mono text-[10px] text-amber-900/40 uppercase tracking-wider">Graphic</th>
                <th className="px-5 py-3 text-left font-mono text-[10px] text-amber-900/40 uppercase tracking-wider">{t.platforms}</th>
                <th className="px-5 py-3 text-left font-mono text-[10px] text-amber-900/40 uppercase tracking-wider">Priority</th>
              </tr>
            </thead>
            <tbody>
              {GRAPHICS_NEEDED.map((graphic, idx) => (
                <tr key={idx} className="border-t border-amber-100/60 hover:bg-amber-50/30 transition-colors">
                  <td className="px-5 py-3 font-medium text-[#001d4a]">{graphic.name[language]}</td>
                  <td className="px-5 py-3 font-mono text-xs text-[#001d4a]/50">{typeof graphic.platforms === "string" ? graphic.platforms : graphic.platforms[language]}</td>
                  <td className="px-5 py-3">
                    <Badge
                      className={
                        graphic.priority[language] === "High" || graphic.priority[language] === "Haute"
                          ? "bg-rose-500/10 text-rose-700 ring-1 ring-rose-500/20 text-[10px] rounded-md px-2 py-0.5"
                          : graphic.priority[language] === "Medium" || graphic.priority[language] === "Moyenne"
                          ? "bg-amber-500/10 text-amber-700 ring-1 ring-amber-500/20 text-[10px] rounded-md px-2 py-0.5"
                          : "bg-sky-500/10 text-sky-700 ring-1 ring-sky-500/20 text-[10px] rounded-md px-2 py-0.5"
                      }
                    >
                      {graphic.priority[language]}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </motion.div>
  );
}

function TimelineSummary({ language }: { language: Language }) {
  const t = TRANSLATIONS[language];
  const milestones = [
    { date: language === "fr" ? "Ven 6" : "Fri 6", label: language === "fr" ? "Finaliser posts + graphiques" : "Finalize posts + graphics", icon: <FileText className="h-4 w-4" /> },
    { date: language === "fr" ? "Sam-Dim" : "Sat-Sun", label: language === "fr" ? "Revision finale" : "Final review", icon: <CheckCircle2 className="h-4 w-4" /> },
    { date: language === "fr" ? "Lun 9" : "Mon 9", label: language === "fr" ? "LANCEMENT" : "GO-LIVE", icon: <Rocket className="h-4 w-4" />, highlight: true },
    { date: language === "fr" ? "Mar 10" : "Tue 10", label: language === "fr" ? "Concours ouvert" : "Contest opens", icon: <Trophy className="h-4 w-4" /> },
    { date: language === "fr" ? "Lun 23" : "Mon 23", label: language === "fr" ? "Vote commence" : "Voting starts", icon: <Vote className="h-4 w-4" /> },
    { date: language === "fr" ? "Jeu 5 mars" : "Thu Mar 5", label: language === "fr" ? "Annonce live" : "Live announcement", icon: <Trophy className="h-4 w-4" />, highlight: true },
    { date: language === "fr" ? "Dim 8 mars" : "Sun Mar 8", label: language === "fr" ? "Concours recommence" : "Contest repeats", icon: <Rocket className="h-4 w-4" /> },
  ];

  return (
    <motion.div variants={itemVariants}>
      <Card className="mb-10 border-0 shadow-xl shadow-[#001d4a]/8 bg-white rounded-2xl overflow-hidden print:break-inside-avoid">
        <CardHeader className="pb-3 pt-5 px-6">
          <CardTitle className="text-base flex items-center gap-3 text-[#001d4a]" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>
            <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-[#001d4a] to-[#003594] flex items-center justify-center shadow-lg shadow-[#001d4a]/20">
              <Calendar className="h-4 w-4 text-white" />
            </div>
            {t.timelineSummary}
          </CardTitle>
        </CardHeader>
        <CardContent className="px-6 pb-6">
          <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-thin -mx-1 px-1">
            {milestones.map((m, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.04 }}
                className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl flex-shrink-0 transition-all duration-200 ${
                  m.highlight
                    ? "bg-gradient-to-r from-[#001d4a] to-[#003594] text-white shadow-lg shadow-[#001d4a]/25"
                    : "bg-[#001d4a]/[0.04] hover:bg-[#001d4a]/[0.08]"
                }`}
              >
                <div className={`${m.highlight ? "text-white/80" : "text-[#001d4a]/40"}`}>{m.icon}</div>
                <div>
                  <p className={`text-[10px] font-mono font-semibold ${m.highlight ? "text-white/60" : "text-[#001d4a]/35"}`}>{m.date}</p>
                  <p className={`text-xs font-medium whitespace-nowrap ${m.highlight ? "text-white" : "text-[#001d4a]/80"}`}>{m.label}</p>
                </div>
                {idx < milestones.length - 1 && (
                  <ChevronRight className={`h-4 w-4 ml-1 flex-shrink-0 ${m.highlight ? "text-white/30" : "text-[#001d4a]/15"}`} />
                )}
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

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
    <div className="min-h-screen bg-[#faf8f5] flex items-center justify-center px-4 py-12 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, #001d4a 1px, transparent 0)`,
        backgroundSize: '32px 32px'
      }} />
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-[#001d4a]/5" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md relative z-10"
      >
        <InlineLanguageToggle language={language} setLanguage={setLanguage} />

        <div className="text-center mb-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="flex items-center justify-center mb-8"
          >
            <Image
              src="https://cdn.prod.website-files.com/67f2c3d3da332df3a9d5d98a/67f2c9fbe3dd7a3962ddff9a_St%20Albert%20Logo.svg"
              alt="St Albert Cheese"
              width={180}
              height={72}
              className="h-16 w-auto"
              unoptimized
            />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-4xl font-bold text-[#001d4a] mb-3 tracking-tight"
            style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
          >
            {t.pageTitle}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-[#001d4a]/60 mb-6"
          >
            {t.subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#001d4a] to-[#003594] text-white rounded-full text-sm font-medium shadow-lg shadow-[#001d4a]/25"
          >
            <Rocket className="h-4 w-4" />
            <span>{t.launchDate}</span>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card className="border-0 shadow-2xl shadow-[#001d4a]/10 bg-white rounded-2xl">
            <CardHeader className="pb-3 pt-6 px-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="h-11 w-11 rounded-xl bg-[#001d4a]/[0.06] flex items-center justify-center">
                  <Lock className="h-5 w-5 text-[#001d4a]/70" />
                </div>
                <CardTitle className="text-[#001d4a]" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>
                  {t.protectedDocument}
                </CardTitle>
              </div>
              <CardDescription className="text-[#001d4a]/50">{t.passwordPrompt}</CardDescription>
            </CardHeader>
            <CardContent className="px-6 pb-6">
              <form onSubmit={onSubmit} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-[#001d4a]/60 font-medium text-sm">{t.passwordLabel}</Label>
                  <Input
                    id="password"
                    type="password"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder={t.passwordPlaceholder}
                    className={`h-12 bg-[#001d4a]/[0.03] border-[#001d4a]/10 rounded-xl focus:border-[#001d4a]/25 focus:ring-[#001d4a]/5 ${error ? "border-rose-500 bg-rose-50" : ""}`}
                    autoFocus
                  />
                  {error && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-sm text-rose-600"
                    >
                      {t.incorrectPassword}
                    </motion.p>
                  )}
                </div>
                <Button
                  type="submit"
                  className="w-full h-12 bg-gradient-to-r from-[#001d4a] to-[#003594] hover:from-[#002d6a] hover:to-[#004594] text-white font-semibold shadow-lg shadow-[#001d4a]/20 transition-all duration-300 rounded-xl"
                >
                  {t.unlockButton}
                  <ChevronRight className="h-4 w-4 ml-2" />
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
}

function CalendarContent({ language, setLanguage }: { language: Language; setLanguage: (lang: Language) => void }) {
  const t = TRANSLATIONS[language];
  const [expandedPost, setExpandedPost] = useState<Post | null>(null);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-[#faf8f5] py-8 px-4 relative print:bg-white print:py-0">
      {/* Background pattern */}
      <div className="fixed inset-0 opacity-[0.02] pointer-events-none print:hidden" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, #001d4a 1px, transparent 0)`,
        backgroundSize: '40px 40px'
      }} />
      <div className="fixed inset-0 bg-gradient-to-br from-transparent via-transparent to-[#001d4a]/5 pointer-events-none print:hidden" />

      <div className="max-w-7xl mx-auto relative z-10">
        <InlineLanguageToggle language={language} setLanguage={setLanguage} />

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12 print:mb-6"
        >
          <div className="mb-6 print:hidden">
            <Image
              src="https://cdn.prod.website-files.com/67f2c3d3da332df3a9d5d98a/67f2c9fbe3dd7a3962ddff9a_St%20Albert%20Logo.svg"
              alt="St Albert Cheese"
              width={160}
              height={64}
              className="h-14 w-auto mx-auto"
              unoptimized
            />
          </div>

          <h1
            className="text-5xl sm:text-6xl font-bold text-[#001d4a] mb-3 tracking-tight print:text-4xl"
            style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
          >
            {t.pageTitle}
          </h1>

          <p className="text-xl text-[#001d4a]/50 mb-6 print:text-base">{t.subtitle}</p>

          <div className="flex items-center justify-center gap-4 flex-wrap">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#001d4a] to-[#003594] text-white rounded-full text-sm font-semibold shadow-lg shadow-[#001d4a]/25">
              <Rocket className="h-4 w-4" />
              <span>{t.launchDate}</span>
            </div>

            <Button
              onClick={handlePrint}
              variant="outline"
              className="gap-2 rounded-full border-[#001d4a]/20 text-[#001d4a]/70 hover:bg-[#001d4a]/5 print:hidden"
            >
              <Printer className="h-4 w-4" />
              {t.printCalendar}
            </Button>
          </div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Timeline Summary */}
          <TimelineSummary language={language} />

          {/* Legend */}
          <Legend language={language} />

          {/* Calendar Weeks */}
          {CALENDAR_DATA.map((week, idx) => (
            <WeekRow
              key={week.weekNumber}
              week={week}
              language={language}
              index={idx}
              onExpandPost={setExpandedPost}
            />
          ))}
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-12 p-6 bg-[#001d4a]/5 rounded-2xl text-center print:hidden"
        >
          <p className="text-sm text-[#001d4a]/60">
            {t.questionsContact}
          </p>
        </motion.div>
      </div>

      {/* Expanded Post Modal */}
      <AnimatePresence>
        {expandedPost && (
          <ExpandedPostModal
            post={expandedPost}
            language={language}
            onClose={() => setExpandedPost(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default function StAlbertCalendarPage() {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [error, setError] = useState(false);
  const [language, setLanguage] = useState<Language>("fr");

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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,600;12..96,700;12..96,800&family=IBM+Plex+Mono:wght@400;500;600&display=swap" rel="stylesheet" />
        <style>{`
          @media print {
            body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
            .print\\:hidden { display: none !important; }
            .print\\:break-inside-avoid { break-inside: avoid; }
          }
          .scrollbar-thin::-webkit-scrollbar { width: 6px; height: 6px; }
          .scrollbar-thin::-webkit-scrollbar-track { background: transparent; }
          .scrollbar-thin::-webkit-scrollbar-thumb { background: rgba(0,29,74,0.2); border-radius: 3px; }
          .scrollbar-thin::-webkit-scrollbar-thumb:hover { background: rgba(0,29,74,0.3); }
        `}</style>
      </head>
      <AnimatePresence mode="wait">
        {!isUnlocked ? (
          <motion.div key="password" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, scale: 0.98 }}>
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
          <motion.div key="content" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
            <CalendarContent language={language} setLanguage={setLanguage} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

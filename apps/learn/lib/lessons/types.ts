// Lesson content types for the 7-Day Sprint

export type SectionType =
  | "intro"
  | "concept"
  | "exercise"
  | "form"
  | "code"
  | "callout"
  | "comparison"
  | "checklist-preview"
  | "bonus"
  | "project-ideas"
  | "details"
  | "mode-toggle"
  | "nav-links"
  | "paradigm"
  | "affirmation"
  | "social-follow"
  | "referral";

export type CalloutType = "tip" | "warning" | "info" | "voice";

export interface LessonSection {
  id: string;
  type: SectionType;
  title?: string;
}

export interface IntroSection extends LessonSection {
  type: "intro";
  subtitle: string;
  hook: string; // The opening line that grabs attention
}

export interface ConceptSection extends LessonSection {
  type: "concept";
  title: string;
  content: string; // Markdown content
  keyTakeaway?: string; // Single sentence summary
}

export interface ExerciseSection extends LessonSection {
  type: "exercise";
  title: string;
  instructions: string[];
  prompt?: string; // Example prompt to use with Claude
  expectedOutcome: string;
}

export interface FormField {
  id: string;
  label: string;
  type: "text" | "textarea" | "select" | "radio";
  placeholder?: string;
  options?: { value: string; label: string }[];
  required?: boolean;
  voiceEnabled?: boolean; // Show voice input hint
  helpText?: string;
}

export interface FormSection extends LessonSection {
  type: "form";
  title: string;
  description: string;
  fields: FormField[];
  generateFile?: {
    filename: string;
    template: string; // Markdown template with {{fieldId}} placeholders
    aiGeneration?: {
      enabled: boolean;
      endpoint: string; // API endpoint to call
      loadingText?: string; // Text to show during generation
    };
  };
  submitLabel?: string;
}

export interface CodeSection extends LessonSection {
  type: "code";
  title?: string;
  language: "bash" | "text" | "markdown" | "javascript" | "mermaid" | "github-flow" | "responsive-devices" | "iteration-cycle" | "sprint-system";
  code: string;
  description?: string;
  copyable?: boolean;
  variant?: "default" | "error"; // For error-styled code blocks
}

export interface CalloutSection extends LessonSection {
  type: "callout";
  calloutType: CalloutType;
  title?: string;
  content: string;
}

export interface ComparisonSection extends LessonSection {
  type: "comparison";
  title: string;
  columns: {
    heading: string;
    items: { label: string; description: string }[];
  }[];
}

export interface BonusSection extends LessonSection {
  type: "bonus";
  title: string;
  content: string; // Markdown
  collapsed?: boolean;
}

export interface ModeToggleSection extends LessonSection {
  type: "mode-toggle";
  title: string;
  planMode: {
    label: string;
    items: string[];
  };
  buildMode: {
    label: string;
    items: string[];
  };
  hint: string; // e.g. "Press Shift+Tab to cycle"
}

export interface ProjectIdea {
  icon: string; // filename in /assets/ e.g. "3dicons-file-dynamic-color.png"
  label: string;
}

export interface ProjectIdeasSection extends LessonSection {
  type: "project-ideas";
  title: string;
  ideas: ProjectIdea[];
  footnote?: string;
}

export interface DetailsTextBlock {
  type: "text";
  content: string; // Markdown content
}

export interface DetailsMediaBlock {
  type: "video" | "image";
  src?: string; // Path to media file, optional for placeholders
  label: string; // Caption/label for the media
  placeholder?: boolean; // Show as placeholder if true or src is missing
}

export interface DetailsAsideBlock {
  type: "aside";
  title: string;
  content: string; // Markdown content
}

export type DetailsBlock = DetailsTextBlock | DetailsMediaBlock | DetailsAsideBlock;

export interface DetailsSection extends LessonSection {
  type: "details";
  trigger: string; // The clickable text, e.g. "Undecided? Click for more"
  blocks: DetailsBlock[]; // Ordered content blocks
}

export interface NavLink {
  label: string;
  targetId: string; // The section id to scroll to
}

export interface NavLinksSection extends LessonSection {
  type: "nav-links";
  title?: string;
  links: NavLink[];
}

export interface ParadigmExample {
  label: string;
  description: string;
}

export interface ParadigmSection extends LessonSection {
  type: "paradigm";
  title: string;
  hook: string; // Opening statement that grabs attention
  content: string; // Main markdown content
  examples: ParadigmExample[]; // Concrete examples of the paradigm
  conclusion: string; // Closing statement
  icon?: string; // Path to 3D icon image (optional)
}

export interface AffirmationSection extends LessonSection {
  type: "affirmation";
  title: string;
  hook: string; // Bold opening statement
  content: string; // Main markdown content
  points: string[]; // Key points to emphasize
  conclusion: string; // Closing affirmation
  icon?: string; // Path to 3D icon image (optional)
}

export interface SocialLink {
  platform: "youtube" | "twitter" | "linkedin" | "tiktok" | "discord" | "substack";
  url: string;
  handle: string;
}

export interface SocialFollowSection extends LessonSection {
  type: "social-follow";
  title: string;
  description?: string;
  links: SocialLink[];
}

export interface ReferralSection extends LessonSection {
  type: "referral";
  title: string;
  description: string;
  friendBenefit: string; // e.g. "20% off"
  referrerBenefit: string; // e.g. "20% credit"
  ctaLabel: string;
}

export type AnySection =
  | IntroSection
  | ConceptSection
  | ExerciseSection
  | FormSection
  | CodeSection
  | CalloutSection
  | ComparisonSection
  | BonusSection
  | ModeToggleSection
  | ProjectIdeasSection
  | DetailsSection
  | NavLinksSection
  | ParadigmSection
  | AffirmationSection
  | SocialFollowSection
  | ReferralSection;

export interface ChecklistItem {
  id: string;
  label: string;
  description?: string;
}

export interface LessonData {
  day: number;
  title: string;
  subtitle: string;
  duration: number; // minutes
  videoUrl?: string; // YouTube/Vimeo embed URL
  objectives: string[];
  sections: AnySection[];
  checklist: ChecklistItem[];
  nextDayTeaser?: string;
}

"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/shared/Section";
import { FeatureCard } from "@/components/shared/FeatureCard";
import {
  ArrowRight,
  Check,
  Database,
  Lock,
  Globe,
  Rocket,
  Code,
  Sparkles,
  Trophy,
  ChevronDown,
  Users,
  Video,
  MessageSquare,
  Calendar,
  Zap,
  Star,
} from "lucide-react";
import { useState } from "react";
import { getNextCohortDate } from "@/lib/utils";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
};

// Curriculum weeks
const curriculum = [
  {
    week: 1,
    title: "Foundation Refresh",
    icon: Sparkles,
    description:
      "Review the core patterns from the Sprint. Scope your 8-Week projects. Set up your development environment for more complex work.",
    output: "Project plan for Weeks 2-8.",
  },
  {
    week: 2,
    title: "Data Persistence",
    icon: Database,
    description:
      "Your Sprint project probably didn't save data. This week, you add a database.\n\n• Choosing the right database\n• Schema design\n• CRUD operations\n• Data relationships",
    output: "Your project now saves and retrieves data.",
  },
  {
    week: 3,
    title: "User Authentication",
    icon: Lock,
    description:
      "If your app has users, they need to log in.\n\n• Authentication patterns\n• Session management\n• User roles and permissions\n• Secure password handling",
    output: "Your project has real user accounts.",
  },
  {
    week: 4,
    title: "APIs and Integrations",
    icon: Globe,
    description:
      "Connect your app to other services.\n\n• Working with external APIs\n• Building your own API\n• Webhooks\n• Common integrations",
    output: "Your project talks to external services.",
  },
  {
    week: 5,
    title: "Deployment and Hosting",
    icon: Rocket,
    description:
      "Your app works on your computer. Now put it online.\n\n• Deployment options\n• Environment variables\n• Domain setup\n• Monitoring and logging",
    output: "Your project is live on the internet.",
  },
  {
    week: 6,
    title: "Project #2",
    icon: Code,
    description:
      "You've learned databases, auth, APIs, deployment. Now build something new from scratch—faster.\n\nThis project uses everything you've learned.",
    output: "A second complete project.",
  },
  {
    week: 7,
    title: "Advanced Patterns",
    icon: Zap,
    description:
      "Patterns for more complex work.\n\n• Multi-step workflows\n• Background jobs and queues\n• Real-time features\n• Error handling",
    output: "Advanced features added to your projects.",
  },
  {
    week: 8,
    title: "Production Polish + Ship Day",
    icon: Trophy,
    description:
      "Final polish. Launch prep. Ship Day.\n\n• Performance optimization\n• Edge cases\n• User experience polish\n• Ship Day presentations",
    output: "Production-ready projects you're proud of.",
  },
];

// Tiers
const tiers = [
  {
    name: "Foundation",
    price: 997,
    creditPrice: 700,
    description: "The curriculum. The community. The skills.",
    features: [
      "All 8 weeks of training",
      "Weekly office hours (group Q&A)",
      "Private Discord channel",
      "Project templates and resources",
      "Lifetime access to curriculum updates",
    ],
    bestFor: "Self-directed learners who don't need much hand-holding.",
    popular: false,
    available: true,
  },
  {
    name: "Accelerator",
    price: 2497,
    creditPrice: 2200,
    description: "Everything in Foundation, plus personalized support.",
    features: [
      "Everything in Foundation",
      "2 private 1-on-1 calls (30 min each)",
      "Async project review (submit for feedback)",
      "Priority support in Discord",
      "Advanced project templates",
    ],
    bestFor:
      "People who want guidance on their specific projects and faster feedback loops.",
    popular: true,
    available: true,
  },
  {
    name: "Intensive",
    price: 4997,
    creditPrice: 4700,
    description: "Maximum support. For serious builders.",
    features: [
      "Everything in Accelerator",
      "4 private 1-on-1 calls (60 min each)",
      "Custom CLAUDE.md built for your project",
      "Direct Slack access to Simon",
      "Priority scheduling for calls",
      "Code review on demand",
    ],
    bestFor:
      "People building something complex or with tight deadlines who need maximum support.",
    popular: false,
    available: true,
    limited: "1 spot at a time",
  },
];

// Testimonials
const testimonials = [
  {
    name: "Rachel K.",
    role: "Freelance Designer",
    project: "Client Portal",
    story: `Rachel came to Week 1 using four different tools for her freelance design business.

"I had Notion for project tracking. Loom for feedback. Stripe for invoicing. Email for everything else. Nothing talked to each other. I was copying and pasting client names between tabs like it was 2005."

Week 4, she built the API integrations.
Week 5, she deployed it.
Week 6, her first client logged in.

"They uploaded files, left comments, and paid an invoice. All in one place. MY place. I built that."

She cancelled $87/month in subscriptions the next day.`,
  },
  {
    name: "David M.",
    role: "Operations Manager",
    project: "Team Dashboard",
    story: `David's team ran on spreadsheets.

"Every Monday, I'd spend 2 hours pulling numbers from three different tools into a Google Sheet. Then I'd format it. Then I'd email it to my boss. Then she'd ask for a different view. Another hour gone."

Week 3, he built the authentication so his team could log in.
Week 4, he connected the APIs.
Week 5, he deployed it.

"Now the dashboard updates itself. My boss has her own login. She looks at whatever view she wants. I got 5 hours of my week back."

He built the whole thing during his lunch breaks.`,
  },
  {
    name: "Maria L.",
    role: "Gym Owner",
    project: "Gym Management System",
    story: `Maria was paying $150/month for gym software she hated.

"It had 47 features. I used 3. But the 3 I needed didn't work the way I wanted. I couldn't customize anything. Every month I'd think: there has to be a better way."

Week 2, she built the class scheduling.
Week 3, member logins.
Week 4, Stripe payments.
Week 8, she turned off the old software.

"My members book classes, pay monthly, check their history. It does exactly what I need. Nothing more. And I own it."

$150/month × 12 months = $1,800/year she's not paying anymore.`,
  },
];

// FAQ items
const faqItems = [
  {
    question: "Do I need to have done the Sprint?",
    answer: `Not required, but recommended.

The Sprint gives you the foundation.
The 8-Week builds on it.

If you haven't done the Sprint, you can start there and apply your $297 credit to the 8-Week when you're ready.`,
  },
  {
    question: "How much time does this take?",
    answer: `3-5 hours per week.

Some weeks lighter (mostly training).
Some weeks heavier (build weeks).

It fits around a job if you protect the time.`,
  },
  {
    question: "What's the difference between the tiers?",
    answer: `Foundation: Self-directed. You follow the curriculum, join office hours, get community support.

Accelerator: Personalized support. You get 1-on-1 calls and async project review for your specific projects.

Intensive: Maximum support. More 1-on-1 time, direct Slack access, custom CLAUDE.md, code review on demand.

Most people do well with Foundation or Accelerator. Intensive is for complex projects or tight deadlines.`,
  },
  {
    question: "Can I upgrade tiers later?",
    answer: `Yes. Pay the difference between tiers.

Start with Foundation. If you want more support midway, upgrade to Accelerator and schedule your calls.`,
  },
  {
    question: "What if I get stuck?",
    answer: `Office hours are weekly (all tiers).
Discord is always active.
Accelerator/Intensive get priority support.

You won't be left alone with problems.`,
  },
];

// FAQ Accordion component
function FAQItem({
  question,
  answer,
}: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-border/50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-5 flex items-center justify-between text-left group"
      >
        <span className={`font-semibold transition-colors duration-200 ${isOpen ? "text-accent" : ""}`}>
          {question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <ChevronDown className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="overflow-hidden"
          >
            <div className="pb-5">
              <p className="text-muted-foreground whitespace-pre-line">{answer}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function EightWeekContent() {
  const nextCohort = getNextCohortDate();

  return (
    <main className="pt-16">
      {/* Back to Learn Hub */}
      <div className="px-4 py-3 bg-muted/30 border-b border-border/50">
        <div className="max-w-4xl mx-auto">
          <Link
            href="/learn"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-accent transition-colors"
          >
            <ArrowRight className="w-4 h-4 rotate-180" />
            <span>Compare all programs</span>
          </Link>
        </div>
      </div>

      {/* Hero */}
      <Section className="py-24 sm:py-32">
        <div className="text-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="space-y-6"
          >
            {/* Hero Icon */}
            <div className="flex justify-center">
              <motion.div
                className="w-24 h-24 sm:w-28 sm:h-28 relative"
                initial={{ rotate: 3, scale: 1 }}
                whileHover={{ rotate: -5, scale: 1.1 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <Image
                  src="/assets/3dicons/3dicons-calender-dynamic-color.png"
                  alt="8-Week Program"
                  fill
                  className="object-contain drop-shadow-xl"
                  unoptimized
                />
              </motion.div>
            </div>

            <p className="text-sm text-accent font-medium uppercase tracking-wider">
              For Sprint Graduates
            </p>

            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight">
              You proved you can build.
            </h1>

            <div className="text-lg text-muted-foreground leading-relaxed space-y-4">
              <p className="text-foreground font-medium">
                Now build the skill permanently.
              </p>
              <p>
                The 8-Week Production AI Mastery program takes you from
                <br />
                &quot;I made one thing&quot; to &quot;I can make anything.&quot;
              </p>
              <p>
                More projects. Deeper patterns.
                <br />
                Databases. Authentication. Deployment.
                <br />
                The full toolkit.
              </p>
            </div>

            <div className="pt-4 bg-accent/10 border border-accent/20 rounded-lg px-6 py-4 inline-block">
              <p className="text-accent font-medium">
                Your $297 Sprint credit is ready to apply.
              </p>
            </div>

            <div className="pt-4">
              <Button variant="accent" size="lg" asChild>
                <Link href="#tiers">
                  View Tiers & Enroll
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </Section>

      {/* Cold Traffic Hero (alternate view) */}
      <section className="py-16 px-4 bg-muted/30 border-y border-border/50">
        <Section className="py-0 px-0">
          <div className="space-y-6">
            <p className="text-sm text-muted-foreground text-center">
              New here? Here&apos;s what this is about:
            </p>

            <blockquote className="text-lg text-muted-foreground leading-relaxed border-l-4 border-accent/50 pl-6 italic">
              Six months ago, Rachel couldn&apos;t write a line of code.
              <br />
              <br />
              Last month, she launched a client portal.
              <br />
              Real logins. Real payments. Real clients using it.
              <br />
              <br />
              &quot;I built that,&quot; she told me. &quot;Still can&apos;t believe it.&quot;
            </blockquote>

            <p className="text-center text-muted-foreground">
              If you haven&apos;t done the Sprint yet,{" "}
              <Link href="/sprint" className="text-accent hover:underline">
                start there
              </Link>
              . Your $297 becomes credit here.
            </p>
          </div>
        </Section>
      </section>

      {/* Section 1: What This Is */}
      <Section>
          <div className="space-y-6">
            <h2 className="font-display text-2xl sm:text-3xl font-semibold text-center mb-8">
              What This Is
            </h2>

            <div className="space-y-4 text-muted-foreground">
              <p>
                The Sprint was 7 days, one project.
                <br />
                <span className="text-foreground font-medium">
                  The 8-Week is 8 weeks, multiple projects—each one building on
                  the last.
                </span>
              </p>

              <div className="bg-card border border-border/50 rounded-lg p-6 font-mono text-sm">
                <p>Week 1: Foundation refresh + project scoping</p>
                <p>Week 2: Data persistence (databases)</p>
                <p>Week 3: User authentication</p>
                <p>Week 4: APIs and integrations</p>
                <p>Week 5: Deployment and hosting</p>
                <p>Week 6: Project #2 (your choice)</p>
                <p>Week 7: Advanced patterns</p>
                <p>Week 8: Production polish + Ship Day</p>
              </div>

              <p className="text-foreground font-medium pt-4">
                By the end, you&apos;ll have built 2-3 real projects and have the
                skills to build anything else you want.
              </p>
            </div>
          </div>
      </Section>

      {/* Section 2: Who This Is For */}
      <section className="py-20 px-4 bg-muted/30 border-y border-border/50">
        <Section className="py-0 px-0">
          <div className="space-y-6">
            <h2 className="font-display text-2xl sm:text-3xl font-semibold text-center mb-8">
              Who This Is For
            </h2>

            <div className="space-y-4 text-muted-foreground">
              <p>
                You&apos;ve done the Sprint.
                <br />
                You shipped something.
                <br />
                You felt what it&apos;s like to build.
              </p>

              <p className="text-foreground font-medium pt-2">Now you want more:</p>

              <div className="grid sm:grid-cols-2 gap-4 pt-2">
                <div className="flex items-start gap-3 bg-background p-4 rounded-lg border border-border/50">
                  <Database className="w-5 h-5 text-accent mt-0.5" />
                  <span>
                    To build things that persist (databases, users, real apps)
                  </span>
                </div>
                <div className="flex items-start gap-3 bg-background p-4 rounded-lg border border-border/50">
                  <Globe className="w-5 h-5 text-accent mt-0.5" />
                  <span>
                    To deploy things online (not just on your computer)
                  </span>
                </div>
                <div className="flex items-start gap-3 bg-background p-4 rounded-lg border border-border/50">
                  <Zap className="w-5 h-5 text-accent mt-0.5" />
                  <span>To connect to other tools (APIs, integrations)</span>
                </div>
                <div className="flex items-start gap-3 bg-background p-4 rounded-lg border border-border/50">
                  <Rocket className="w-5 h-5 text-accent mt-0.5" />
                  <span>To build faster (patterns that scale)</span>
                </div>
              </div>

              <p className="pt-4 text-foreground font-medium">
                The 8-Week is for people who caught the building bug and want to
                go deeper.
              </p>
            </div>
          </div>
        </Section>
      </section>

      {/* Section 2.5: Why Go Deeper */}
      <Section>
          <div className="space-y-6">
            <h2 className="font-display text-2xl sm:text-3xl font-semibold text-center mb-8">
              Why Go Deeper
            </h2>

            <div className="space-y-4 text-muted-foreground">
              <p>
                Most people who stop at the Sprint build one tool.
                <br />
                It works. They&apos;re happy.
              </p>

              <p>
                Then 6 months later, they try to build something more complex.
                <br />
                They hit walls they didn&apos;t hit before.
              </p>

              <div className="bg-card border border-border/50 rounded-lg p-6 space-y-3">
                <p className="flex items-start gap-2">
                  <span className="text-destructive">✕</span>
                  <span>
                    The data doesn&apos;t persist.{" "}
                    <span className="text-muted-foreground/70">
                      (You need a database.)
                    </span>
                  </span>
                </p>
                <p className="flex items-start gap-2">
                  <span className="text-destructive">✕</span>
                  <span>
                    Other people need to use it.{" "}
                    <span className="text-muted-foreground/70">
                      (You need authentication.)
                    </span>
                  </span>
                </p>
                <p className="flex items-start gap-2">
                  <span className="text-destructive">✕</span>
                  <span>
                    It needs to connect to other tools.{" "}
                    <span className="text-muted-foreground/70">
                      (You need APIs.)
                    </span>
                  </span>
                </p>
                <p className="flex items-start gap-2">
                  <span className="text-destructive">✕</span>
                  <span>
                    It needs to live on the internet.{" "}
                    <span className="text-muted-foreground/70">
                      (You need deployment.)
                    </span>
                  </span>
                </p>
              </div>

              <p className="pt-2">The patterns are different at this level.</p>

              <p className="text-foreground font-medium pt-2">
                The 8-Week teaches you those patterns.
                <br />
                So when you have the next idea, you know how to build it.
              </p>
            </div>
          </div>
      </Section>

      {/* Section 3: The Three Tiers */}
      <section
        id="tiers"
        className="py-20 px-4 bg-muted/30 border-y border-border/50"
      >
        <Section width="wide" className="py-0 px-0">
          <div className="space-y-8">
            <h2 className="font-display text-2xl sm:text-3xl font-semibold text-center mb-12">
              Choose your level of support
            </h2>

            <div className="grid md:grid-cols-3 gap-6">
              {tiers.map((tier, i) => (
                <FeatureCard
                  key={i}
                  className={`h-full ${tier.popular ? "border-accent ring-1 ring-accent/20" : ""}`}
                >
                  <div className="p-4 space-y-4">
                  {tier.popular && (
                    <div className="absolute top-4 right-4 bg-accent text-accent-foreground text-xs font-semibold px-3 py-1 rounded-full">
                      POPULAR
                    </div>
                  )}

                  <div className="space-y-4">
                    <div>
                      <h3 className="font-display text-xl font-semibold">
                        {tier.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {tier.description}
                      </p>
                    </div>

                    <div>
                      <p className="text-3xl font-bold">
                        ${tier.price.toLocaleString()}
                      </p>
                      <p className="text-sm text-accent">
                        With Sprint credit: ${tier.creditPrice.toLocaleString()}
                      </p>
                    </div>

                    <ul className="space-y-2">
                      {tier.features.map((feature, j) => (
                        <li key={j} className="flex items-start gap-2 text-sm">
                          <Check className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                          <span className="text-muted-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="pt-2">
                      <p className="text-xs text-muted-foreground">
                        <span className="font-medium">Best for:</span>{" "}
                        {tier.bestFor}
                      </p>
                      {tier.limited && (
                        <p className="text-xs text-accent mt-1 font-medium">
                          {tier.limited}
                        </p>
                      )}
                    </div>

                    <Button
                      variant={tier.popular ? "accent" : "outline"}
                      className="w-full"
                      asChild
                    >
                      <Link href={`/checkout/8-week/${tier.name.toLowerCase()}`}>
                        Enroll - {tier.name}
                      </Link>
                    </Button>
                  </div>
                  </div>
                </FeatureCard>
              ))}
            </div>
          </div>
        </Section>
      </section>

      {/* Section 4: Week-by-Week Curriculum */}
      <Section width="wide">
          <div className="space-y-8">
            <h2 className="font-display text-2xl sm:text-3xl font-semibold text-center mb-12">
              What you&apos;ll build each week
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {curriculum.map((week, i) => {
                const Icon = week.icon;
                return (
                  <FeatureCard key={i} className="bg-card group overflow-hidden">
                    <div className="absolute inset-0 bg-muted/20 opacity-0 group-hover:opacity-100 transition-opacity z-0 flex items-center justify-center pointer-events-none">
                        <p className="text-xs font-mono text-muted-foreground/40 font-bold uppercase tracking-widest">GIF: {week.title}</p>
                    </div>
                    <div className="p-4 h-full flex flex-col relative z-10">
                      <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0 mb-4">
                        <Icon className="w-6 h-6 text-accent" />
                      </div>
                      <div className="flex-1 space-y-2">
                        <h3 className="font-semibold text-lg">
                          Week {week.week}:<br/>{week.title}
                        </h3>
                        <p className="text-muted-foreground text-sm whitespace-pre-line leading-relaxed">
                          {week.description}
                        </p>
                        <div className="pt-4 mt-auto">
                            <div className="bg-accent/5 border border-accent/20 rounded-md px-3 py-2">
                            <p className="text-xs">
                                <span className="font-medium text-accent">
                                Output:
                                </span>{" "}
                                {week.output}
                            </p>
                            </div>
                        </div>
                      </div>
                    </div>
                  </FeatureCard>
                );
              })}
            </div>
          </div>
      </Section>

      {/* Section 5: What 8-Week Graduates Built */}
      <section className="py-20 px-4 bg-muted/30 border-y border-border/50">
        <Section width="wide" className="py-0 px-0">
          <div className="space-y-12">
            <h2 className="font-display text-2xl sm:text-3xl font-semibold text-center">
              Real projects from real graduates
            </h2>

            <div className="grid md:grid-cols-3 gap-6">
              {testimonials.map((testimonial, i) => (
                <div key={i} className="space-y-4">
                    <div className="bg-card border border-border/50 rounded-lg p-6 shadow-sm h-full">
                        <div className="flex items-start gap-4 mb-4">
                            <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
                            <span className="text-base font-semibold text-accent">
                                {testimonial.name.charAt(0)}
                            </span>
                            </div>
                            <div>
                            <p className="font-semibold text-sm">{testimonial.name}</p>
                            <p className="text-xs text-muted-foreground">
                                {testimonial.role}
                            </p>
                            <p className="text-xs text-accent font-medium mt-1">
                                Built: {testimonial.project}
                            </p>
                            </div>
                        </div>
                        <p className="text-muted-foreground whitespace-pre-line text-sm leading-relaxed">
                            {testimonial.story}
                        </p>
                    </div>
                </div>
              ))}
            </div>
          </div>
        </Section>
      </section>

      {/* Section 6: FAQ */}
      <Section>
          <div className="space-y-8">
            <h2 className="font-display text-2xl sm:text-3xl font-semibold text-center mb-8">
              Questions you probably have
            </h2>

            <div className="divide-y divide-border/50">
              {faqItems.map((item, i) => (
                <FAQItem key={i} question={item.question} answer={item.answer} />
              ))}
            </div>
          </div>
      </Section>

      {/* Section 7: The Offer Box */}
      <section className="py-20 px-4 bg-muted/30 border-y border-border/50">
        <Section className="py-0 px-0">
          <div className="bg-card border-2 border-accent/30 rounded-xl p-8 shadow-lg max-w-2xl mx-auto">
              <div className="text-center space-y-6">
                <h2 className="font-display text-2xl font-semibold">
                  8-Week Production AI Mastery
                </h2>

                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-2xl font-bold">$997</p>
                    <p className="text-xs text-muted-foreground">Foundation</p>
                    <p className="text-xs text-accent">w/ credit: $700</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold">$2,497</p>
                    <p className="text-xs text-muted-foreground">Accelerator</p>
                    <p className="text-xs text-accent">w/ credit: $2,200</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold">$4,997</p>
                    <p className="text-xs text-muted-foreground">Intensive</p>
                    <p className="text-xs text-accent">w/ credit: $4,700</p>
                  </div>
                </div>

                <div className="space-y-3 text-left pt-4 border-t border-border/50">
                  <p className="font-medium text-center">All tiers include:</p>
                  <div className="grid sm:grid-cols-2 gap-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Video className="w-4 h-4 text-accent" />
                      <span className="text-muted-foreground">
                        8 weeks of structured training
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="w-4 h-4 text-accent" />
                      <span className="text-muted-foreground">
                        Weekly office hours
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <MessageSquare className="w-4 h-4 text-accent" />
                      <span className="text-muted-foreground">
                        Private Discord community
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Star className="w-4 h-4 text-accent" />
                      <span className="text-muted-foreground">
                        Lifetime curriculum access
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">
                    Next cohort starts:{" "}
                    <span className="font-medium">{nextCohort}</span>
                  </p>
                </div>

                <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-lg px-4 py-3">
                  <p className="text-sm text-amber-800 dark:text-amber-200">
                    <span className="font-medium">Note:</span> Skills rust if
                    you don&apos;t use them. The longer you wait after the Sprint,
                    the more you&apos;ll have to relearn.
                  </p>
                </div>

                <Button variant="accent" size="lg" className="w-full" asChild>
                  <Link href="#tiers">
                    Compare Tiers & Enroll
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </div>
          </div>
        </Section>
      </section>

      {/* Section 8: What Comes After */}
      <Section>
          <div className="space-y-6">
            <h2 className="font-display text-2xl sm:text-3xl font-semibold text-center mb-8">
              What Comes After
            </h2>

            <div className="space-y-4 text-muted-foreground">
              <p>
                After the 8-Week, you have the skills.
                <br />
                You can build on your own.
                <br />
                You don&apos;t need more programs.
              </p>

              <p className="text-foreground font-medium pt-2">
                But if you want to keep building with a community:
              </p>

              <div className="bg-card border border-border/50 rounded-lg p-6 transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 hover:border-accent/30">
                <h3 className="font-semibold text-lg mb-2">
                  The AI Builders Club
                </h3>
                <p className="text-2xl font-bold mb-3">$97/month</p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-accent" />
                    Monthly build challenges
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-accent" />
                    New patterns as AI evolves
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-accent" />
                    Office hours with Simon
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-accent" />
                    Private community
                  </li>
                </ul>
                <p className="text-sm text-muted-foreground mt-4">
                  The Club is for people who want to stay sharp and keep
                  building with others.
                </p>
                <p className="text-sm text-muted-foreground mt-2 italic">
                  It&apos;s optional. The skill is yours either way.
                </p>
              </div>
            </div>
          </div>
      </Section>

      {/* Section 9: Final CTA */}
      <section className="py-20 px-4 bg-primary text-primary-foreground">
        <Section className="py-0 px-0">
          <div className="space-y-6 text-center max-w-2xl mx-auto">
            <p className="text-lg text-primary-foreground/80">
              You&apos;ve proven you can build.
            </p>
            <p className="text-primary-foreground/80">
              The question now is how far you want to take it.
            </p>
            <p className="text-lg font-medium">If you&apos;re ready to go deeper:</p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
              <Button variant="accent" size="lg" asChild>
                <Link href="#tiers">
                  View Tier Comparison
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>

            <p className="text-sm text-primary-foreground/60">
              Next cohort: {nextCohort}
            </p>
          </div>
        </Section>
      </section>
    </main>
  );
}
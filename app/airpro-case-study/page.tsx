import { Metadata } from "next";
import Image from "next/image";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "AirPro AI Implementation Guide | LemonBrand",
  description: "Complete guide to implementing AI solutions for AirPro operations, including ChatGPT, Claude, and custom automation agents.",
  keywords: ["AI implementation", "ChatGPT", "Claude", "business automation", "AI agents", "AirPro"],
};

export default function AirProCaseStudyPage() {
  return (
    <main className="bg-white dark:bg-neutral-950">
      {/* Hero Section */}
      <section className="relative pt-[16rem] pb-[10rem] px-4 md:px-8 overflow-hidden">
        {/* Dot Background */}
        <div
          className={cn(
            "absolute inset-0",
            "[background-size:20px_20px]",
            "[background-image:radial-gradient(#d4d4d4_1px,transparent_1px)]",
            "dark:[background-image:radial-gradient(#404040_1px,transparent_1px)]",
          )}
        />
        {/* Radial gradient for faded look */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-neutral-950"></div>

        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-900 dark:text-neutral-50 mb-6">
            Use Many AI Models. Not One.
          </h1>
          <p className="text-xl md:text-2xl text-neutral-600 dark:text-neutral-300">
            One model = blind spots. Many models = better work.
          </p>
        </div>
      </section>

      {/* Simple view of AI */}
      <section className="py-16 px-4 md:px-8 bg-neutral-50 dark:bg-neutral-900">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-neutral-50 mb-8">
            Simple view of AI
          </h2>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white dark:bg-neutral-950 p-6 rounded-3xl border border-neutral-200 dark:border-neutral-800">
              <h4 className="text-xl font-semibold text-neutral-900 dark:text-neutral-50 mb-3">
                Conversational (LLMs)
              </h4>
              <p className="text-neutral-600 dark:text-neutral-300">
                Chatbots that read, write, and talk. They help you think and draft. Examples: ChatGPT and Claude.
              </p>
            </div>
            <div className="bg-white dark:bg-neutral-950 p-6 rounded-3xl border border-neutral-200 dark:border-neutral-800">
              <h4 className="text-xl font-semibold text-neutral-900 dark:text-neutral-50 mb-3">
                Knowledge (Databases)
              </h4>
              <p className="text-neutral-600 dark:text-neutral-300">
                Spreadsheets and databases that store facts. They are exact but do not chat.
              </p>
            </div>
          </div>

          <p className="text-lg text-neutral-700 dark:text-neutral-200 mb-4">
            The real power comes when Conversational models read your Knowledge systems and report back in plain words.
          </p>
          <p className="text-lg text-neutral-700 dark:text-neutral-200">
            Effective use of AI can save 10s of hours per person, every week. Increase in productivity is incredible.
          </p>
        </div>
      </section>

      {/* Why many models win */}
      <section className="py-16 px-4 md:px-8">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-neutral-50 mb-8">
            Why many models win
          </h2>

          <ul className="space-y-4 mb-6">
            <li className="flex gap-3">
              <span className="text-orange-500 mt-1">•</span>
              <span className="text-neutral-700 dark:text-neutral-200">
                No single model is best at everything. Using two or more reduces mistakes.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-orange-500 mt-1">•</span>
              <span className="text-neutral-700 dark:text-neutral-200">
                Cross‑check key work: ask both models and compare answers.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-orange-500 mt-1">•</span>
              <span className="text-neutral-700 dark:text-neutral-200">
                Mix price tiers: cheap for simple tasks, premium for hard ones.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-orange-500 mt-1">•</span>
              <span className="text-neutral-700 dark:text-neutral-200">
                Avoid lock‑in: you can switch fast as the market changes.
              </span>
            </li>
          </ul>

          <p className="text-lg text-neutral-700 dark:text-neutral-200">
            <strong className="text-neutral-900 dark:text-neutral-50">Why one model is wrong here:</strong>{" "}
            Different jobs need different strengths. A single model can fail from outages, policy changes, price swings, or bias. Using two models keeps work moving and keeps answers honest.
          </p>
        </div>
      </section>

      {/* Two stars to start with */}
      <section className="py-16 px-4 md:px-8 bg-neutral-50 dark:bg-neutral-900">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-neutral-50 mb-8">
            Two stars to start with
          </h2>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white dark:bg-neutral-950 p-8 rounded-3xl border-2 border-orange-500 dark:border-orange-400 relative overflow-hidden">
              <div className="absolute top-4 right-4 bg-orange-500 dark:bg-orange-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                Primary
              </div>
              <h3 className="text-2xl font-bold text-neutral-900 dark:text-neutral-50 mb-4">
                ChatGPT
              </h3>
              <ul className="space-y-3">
                <li className="flex gap-3">
                  <span className="text-orange-500 mt-1">•</span>
                  <span className="text-neutral-700 dark:text-neutral-200">
                    Great at quick thinking, analysis, and planning.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-orange-500 mt-1">•</span>
                  <span className="text-neutral-700 dark:text-neutral-200">
                    Strong voice and image tools. Easy on phones.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-orange-500 mt-1">•</span>
                  <span className="text-neutral-700 dark:text-neutral-200">
                    Wide app add‑ons to connect with your work tools.
                  </span>
                </li>
              </ul>
            </div>

            <div className="bg-white dark:bg-neutral-950 p-8 rounded-3xl border-2 border-orange-500 dark:border-orange-400 relative overflow-hidden">
              <div className="absolute top-4 right-4 bg-orange-500 dark:bg-orange-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                Primary
              </div>
              <h3 className="text-2xl font-bold text-neutral-900 dark:text-neutral-50 mb-4">
                Claude
              </h3>
              <ul className="space-y-3">
                <li className="flex gap-3">
                  <span className="text-orange-500 mt-1">•</span>
                  <span className="text-neutral-700 dark:text-neutral-200">
                    Calm, clear writing. Handles long docs well.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-orange-500 mt-1">•</span>
                  <span className="text-neutral-700 dark:text-neutral-200">
                    Solid coding help and step‑by‑step reasoning.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-orange-500 mt-1">•</span>
                  <span className="text-neutral-700 dark:text-neutral-200">
                    Pairs well with ChatGPT for double‑checks.
                  </span>
                </li>
              </ul>
            </div>
          </div>

          <p className="text-lg text-neutral-700 dark:text-neutral-200 mb-4">
            <strong className="text-neutral-900 dark:text-neutral-50">Why these two (ChatGPT + Claude):</strong>{" "}
            They are fast, stable, and widely used. ChatGPT is great at quick thinking and tools. Claude shines at long, careful writing. Together they catch each other&apos;s misses.
          </p>
          <p className="text-lg text-neutral-700 dark:text-neutral-200">
            Also useful (secondary): Microsoft Copilot for Office files inside M365, and Perplexity for web research with sources.
          </p>
        </div>
      </section>

      {/* Personal assistants */}
      <section className="py-16 px-4 md:px-8">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-neutral-50 mb-6">
            Personal assistants for everyone
          </h2>
          <p className="text-lg text-neutral-700 dark:text-neutral-200">
            Each person gets an AI buddy on phone and laptop. It drafts emails, turns meetings into notes, pulls numbers from sheets, and reminds you of tasks. People do more in less time with fewer back‑and‑forths. Managers get faster updates and fewer status meetings.
          </p>
        </div>
      </section>

      {/* Security */}
      <section className="py-16 px-4 md:px-8 bg-neutral-50 dark:bg-neutral-900">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-neutral-50 mb-8">
            Security: where your data goes
          </h2>

          <div className="bg-white dark:bg-neutral-950 p-6 rounded-3xl border border-neutral-200 dark:border-neutral-800 mb-6">
            <h4 className="text-xl font-semibold text-neutral-900 dark:text-neutral-50 mb-4">
              What happens under the hood
            </h4>
            <ul className="space-y-3 mb-6">
              <li className="flex gap-3">
                <span className="text-orange-500 mt-1">•</span>
                <span className="text-neutral-700 dark:text-neutral-200">
                  Your prompts and files go to the provider&apos;s cloud servers to get an answer.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-orange-500 mt-1">•</span>
                <span className="text-neutral-700 dark:text-neutral-200">
                  Copies can be kept as logs for a time (for safety, abuse checks, and uptime).
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-orange-500 mt-1">•</span>
                <span className="text-neutral-700 dark:text-neutral-200">
                  Unless on an enterprise plan with data controls, staff tools may view some logs.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-orange-500 mt-1">•</span>
                <span className="text-neutral-700 dark:text-neutral-200">
                  Attachments (PDFs, images, CSVs) are stored to process them, then kept for a period.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-orange-500 mt-1">•</span>
                <span className="text-neutral-700 dark:text-neutral-200">
                  Basic metadata is kept too (time, IP, file name). Choose Canada data options when needed.
                </span>
              </li>
            </ul>
            <p className="text-lg text-neutral-700 dark:text-neutral-200">
              <strong className="text-neutral-900 dark:text-neutral-50">Simple rule:</strong>{" "}
              do not paste secrets. For sensitive work, use an enterprise setup with data‑retention limits and model‑training opt‑out (available in settings on paid tiers).
            </p>
          </div>

          <div className="bg-white dark:bg-neutral-950 p-6 rounded-3xl border border-neutral-200 dark:border-neutral-800">
            <h4 className="text-xl font-semibold text-neutral-900 dark:text-neutral-50 mb-4">
              By model (quick view)
            </h4>
            <ul className="space-y-4">
              <li className="text-neutral-700 dark:text-neutral-200">
                <strong className="text-neutral-900 dark:text-neutral-50">ChatGPT (OpenAI):</strong>{" "}
                Prompts/files are processed in OpenAI&apos;s cloud. Consumer/Teams plans may retain logs for safety. Enterprise adds admin controls and limits on retention.{" "}
                <em className="text-orange-600 dark:text-orange-400">Do not upload:</em>{" "}
                client PII, contracts, unreleased financials, source code, or regulated data unless your enterprise controls are enabled.
              </li>
              <li className="text-neutral-700 dark:text-neutral-200">
                <strong className="text-neutral-900 dark:text-neutral-50">Claude (Anthropic):</strong>{" "}
                Similar cloud processing with strong safety defaults. Enterprise plans offer stricter data controls.{" "}
                <em className="text-orange-600 dark:text-orange-400">Do not upload</em>{" "}
                sensitive or regulated data unless under enterprise protections.
              </li>
              <li className="text-neutral-700 dark:text-neutral-200">
                <strong className="text-neutral-900 dark:text-neutral-50">Microsoft Copilot:</strong>{" "}
                Runs inside your Microsoft cloud and respects your Graph permissions. Good for Office files. Still avoid secrets unless your tenant policies allow and data classification is in place.
              </li>
              <li className="text-neutral-700 dark:text-neutral-200">
                <strong className="text-neutral-900 dark:text-neutral-50">Perplexity:</strong>{" "}
                Built for web answers. Queries may reach the open web. Treat prompts as public; do not upload client files.
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Hallucinations */}
      <section className="py-16 px-4 md:px-8">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-neutral-50 mb-6">
            Hallucinations (and how to reduce them)
          </h2>
          <p className="text-lg text-neutral-700 dark:text-neutral-200 mb-6">
            AI can &quot;sound right&quot; but be wrong. For example, When asking about a sheet, make it show its work:
          </p>
          <ul className="space-y-3">
            <li className="flex gap-3">
              <span className="text-orange-500 mt-1">•</span>
              <span className="text-neutral-700 dark:text-neutral-200">
                Ask for cell ranges used (e.g., &quot;Sum B2:B19, exclude blanks&quot;).
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-orange-500 mt-1">•</span>
              <span className="text-neutral-700 dark:text-neutral-200">
                Ask for the exact formula it would place in a cell.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-orange-500 mt-1">•</span>
              <span className="text-neutral-700 dark:text-neutral-200">
                Have it list checkpoints (totals match, counts match, no text in number columns).
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-orange-500 mt-1">•</span>
              <span className="text-neutral-700 dark:text-neutral-200">
                Never let it write to the sheet without a preview table you approve.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-orange-500 mt-1">•</span>
              <span className="text-neutral-700 dark:text-neutral-200">
                Ask for sources or links when it cites facts.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-orange-500 mt-1">•</span>
              <span className="text-neutral-700 dark:text-neutral-200">
                Cross‑check important answers with a second model.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-orange-500 mt-1">•</span>
              <span className="text-neutral-700 dark:text-neutral-200">
                Spot‑check numbers and re-run on a small sample.
              </span>
            </li>
          </ul>
        </div>
      </section>

      {/* App integrations */}
      <section className="py-16 px-4 md:px-8 bg-neutral-50 dark:bg-neutral-900">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-neutral-50 mb-6">
            App integrations on your computer
          </h2>
          <p className="text-lg text-neutral-700 dark:text-neutral-200">
            Models can connect to your calendar, email, files, Sharepoint, Excel, Teams, and browsers via official add‑ons. Some tasks can drive desktop apps by safe automations. Always review the permission screen before turning on an add‑on.
          </p>
        </div>
      </section>

      {/* Multimodal */}
      <section className="py-16 px-4 md:px-8">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-neutral-50 mb-6">
            How to use multimodal at work
          </h2>
          <ul className="space-y-3">
            <li className="flex gap-3">
              <span className="text-orange-500 mt-1">•</span>
              <span className="text-neutral-700 dark:text-neutral-200">
                <strong className="text-neutral-900 dark:text-neutral-50">Voice → Notes:</strong>{" "}
                Dictate ideas; get a clean summary and tasks.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-orange-500 mt-1">•</span>
              <span className="text-neutral-700 dark:text-neutral-200">
                <strong className="text-neutral-900 dark:text-neutral-50">Image → Data:</strong>{" "}
                Snap a whiteboard, receipt, or form; get a table.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-orange-500 mt-1">•</span>
              <span className="text-neutral-700 dark:text-neutral-200">
                <strong className="text-neutral-900 dark:text-neutral-50">Docs → Answers:</strong>{" "}
                Drop a PDF/CSV; ask pointed questions.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-orange-500 mt-1">•</span>
              <span className="text-neutral-700 dark:text-neutral-200">
                <strong className="text-neutral-900 dark:text-neutral-50">Screen → Steps:</strong>{" "}
                Record a short clip; get written how‑to steps.
              </span>
            </li>
          </ul>
        </div>
      </section>

      {/* Prompting */}
      <section className="py-16 px-4 md:px-8 bg-neutral-50 dark:bg-neutral-900">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-neutral-50 mb-6">
            Prompting: be fast
          </h2>
          <ul className="space-y-3 mb-8">
            <li className="flex gap-3">
              <span className="text-orange-500 mt-1">•</span>
              <span className="text-neutral-700 dark:text-neutral-200">
                Give <strong className="text-neutral-900 dark:text-neutral-50">Role</strong>,{" "}
                <strong className="text-neutral-900 dark:text-neutral-50">Goal</strong>,{" "}
                <strong className="text-neutral-900 dark:text-neutral-50">Source</strong>,{" "}
                <strong className="text-neutral-900 dark:text-neutral-50">Output</strong>,{" "}
                <strong className="text-neutral-900 dark:text-neutral-50">Limits</strong> (RG‑SOL).
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-orange-500 mt-1">•</span>
              <span className="text-neutral-700 dark:text-neutral-200">
                Paste a tiny example of the format you want.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-orange-500 mt-1">•</span>
              <span className="text-neutral-700 dark:text-neutral-200">
                Ask for 3 options and a 5‑step checklist.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-orange-500 mt-1">•</span>
              <span className="text-neutral-700 dark:text-neutral-200">
                Save good prompts in a shared note for reuse.
              </span>
            </li>
          </ul>

          <div className="bg-white dark:bg-neutral-950 p-6 rounded-3xl border border-neutral-200 dark:border-neutral-800">
            <h4 className="text-xl font-semibold text-neutral-900 dark:text-neutral-50 mb-4">
              Example prompt (AirPro – CC295 fleet)
            </h4>
            <div className="text-neutral-700 dark:text-neutral-200 space-y-2 font-mono text-sm">
              <p><strong className="text-neutral-900 dark:text-neutral-50">Role:</strong> You are an operations assistant for AirPro.</p>
              <p><strong className="text-neutral-900 dark:text-neutral-50">Goal:</strong> Create today&apos;s CC295 readiness report.</p>
              <p><strong className="text-neutral-900 dark:text-neutral-50">Sources:</strong> Excel &quot;CC295_Fleet&quot; — tabs Fleet (B2:G100), Defects (A2:F500), Maint (A2:H200); Ops_Log PDF at /AirPro/Logs/2025-08-01.pdf.</p>
              <p><strong className="text-neutral-900 dark:text-neutral-50">Output:</strong> For each tail, show: Location, Last flight date, Open defects (# and short text), Next maintenance, Crew notes. Then add a summary: aircraft ready today / total, top 3 risks.</p>
              <p><strong className="text-neutral-900 dark:text-neutral-50">Limits:</strong> If data is missing, write &quot;Unknown&quot; and list the exact cell ranges you checked. Do not guess. Show any formula used for totals.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Rapid custom app development */}
      <section className="py-16 px-4 md:px-8">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-neutral-50 mb-6">
            Rapid custom app development
          </h2>
          <p className="text-lg text-neutral-700 dark:text-neutral-200">
            Small, useful tools can be built in days with no‑code. Examples: a form that writes to a sheet, a bot that summarizes PDFs, a dashboard that refreshes daily.
          </p>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 px-4 md:px-8 bg-neutral-50 dark:bg-neutral-900">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-neutral-50 mb-8">
            Timeline &amp; quick access
          </h2>
          <div className="space-y-4">
            <div className="flex gap-4 items-start">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-orange-500 dark:bg-orange-600 text-white flex items-center justify-center font-bold">
                1
              </div>
              <div className="flex-1">
                <h4 className="text-lg font-semibold text-neutral-900 dark:text-neutral-50 mb-1">
                  Day 1
                </h4>
                <p className="text-neutral-700 dark:text-neutral-200">
                  Create ChatGPT and Claude accounts; install mobile apps.
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-orange-500 dark:bg-orange-600 text-white flex items-center justify-center font-bold">
                2
              </div>
              <div className="flex-1">
                <h4 className="text-lg font-semibold text-neutral-900 dark:text-neutral-50 mb-1">
                  Week 1
                </h4>
                <p className="text-neutral-700 dark:text-neutral-200">
                  Short training on prompts and voice. Pick 3 team tasks.
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-orange-500 dark:bg-orange-600 text-white flex items-center justify-center font-bold">
                3
              </div>
              <div className="flex-1">
                <h4 className="text-lg font-semibold text-neutral-900 dark:text-neutral-50 mb-1">
                  Weeks 2–3
                </h4>
                <p className="text-neutral-700 dark:text-neutral-200">
                  Connect email, calendars, and sheets. Set safety rules.
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-orange-500 dark:bg-orange-600 text-white flex items-center justify-center font-bold">
                4
              </div>
              <div className="flex-1">
                <h4 className="text-lg font-semibold text-neutral-900 dark:text-neutral-50 mb-1">
                  Week 3
                </h4>
                <p className="text-neutral-700 dark:text-neutral-200">
                  Ship one mini‑app (report bot or sheet helper).
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-orange-500 dark:bg-orange-600 text-white flex items-center justify-center font-bold">
                5
              </div>
              <div className="flex-1">
                <h4 className="text-lg font-semibold text-neutral-900 dark:text-neutral-50 mb-1">
                  Month 2
                </h4>
                <p className="text-neutral-700 dark:text-neutral-200">
                  Scale to more teams; add second model checks.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Training matters */}
      <section className="py-16 px-4 md:px-8">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-neutral-50 mb-6">
            Training matters
          </h2>
          <ul className="space-y-3">
            <li className="flex gap-3">
              <span className="text-orange-500 mt-1">•</span>
              <span className="text-neutral-700 dark:text-neutral-200">
                Short, hands‑on sessions (60 minutes) beat long decks.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-orange-500 mt-1">•</span>
              <span className="text-neutral-700 dark:text-neutral-200">
                Weekly drills on prompts and data checks build habits.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-orange-500 mt-1">•</span>
              <span className="text-neutral-700 dark:text-neutral-200">
                Share a small prompt library; update it monthly.
              </span>
            </li>
          </ul>
        </div>
      </section>

      {/* Things you could do with AI today */}
      <section className="py-16 px-4 md:px-8 bg-neutral-50 dark:bg-neutral-900">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-neutral-50 mb-8">
            Things you could do with AI today.
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-neutral-950 p-6 rounded-3xl border border-neutral-200 dark:border-neutral-800">
              <div className="text-4xl mb-3">📧</div>
              <h4 className="text-lg font-semibold text-neutral-900 dark:text-neutral-50 mb-2">
                Email
              </h4>
              <p className="text-neutral-700 dark:text-neutral-200 mb-3">
                Triage inbox and draft replies.
              </p>
              <strong className="text-orange-600 dark:text-orange-400">
                Save 45–60 min/day
              </strong>
            </div>

            <div className="bg-white dark:bg-neutral-950 p-6 rounded-3xl border border-neutral-200 dark:border-neutral-800">
              <div className="text-4xl mb-3">📝</div>
              <h4 className="text-lg font-semibold text-neutral-900 dark:text-neutral-50 mb-2">
                Meetings
              </h4>
              <p className="text-neutral-700 dark:text-neutral-200 mb-3">
                Turn recordings into action lists.
              </p>
              <strong className="text-orange-600 dark:text-orange-400">
                Save 20–30 min/meeting
              </strong>
            </div>

            <div className="bg-white dark:bg-neutral-950 p-6 rounded-3xl border border-neutral-200 dark:border-neutral-800">
              <div className="text-4xl mb-3">📊</div>
              <h4 className="text-lg font-semibold text-neutral-900 dark:text-neutral-50 mb-2">
                Data
              </h4>
              <p className="text-neutral-700 dark:text-neutral-200 mb-3">
                Pull numbers from PDFs and sheets.
              </p>
              <strong className="text-orange-600 dark:text-orange-400">
                Save 2–4 hrs/report
              </strong>
            </div>

            <div className="bg-white dark:bg-neutral-950 p-6 rounded-3xl border border-neutral-200 dark:border-neutral-800">
              <div className="text-4xl mb-3">✍️</div>
              <h4 className="text-lg font-semibold text-neutral-900 dark:text-neutral-50 mb-2">
                Docs
              </h4>
              <p className="text-neutral-700 dark:text-neutral-200 mb-3">
                First drafts of guides and proposals.
              </p>
              <strong className="text-orange-600 dark:text-orange-400">
                Save 1–3 hrs/doc
              </strong>
            </div>

            <div className="bg-white dark:bg-neutral-950 p-6 rounded-3xl border border-neutral-200 dark:border-neutral-800">
              <div className="text-4xl mb-3">🔍</div>
              <h4 className="text-lg font-semibold text-neutral-900 dark:text-neutral-50 mb-2">
                Research
              </h4>
              <p className="text-neutral-700 dark:text-neutral-200 mb-3">
                Quick web scans with sources.
              </p>
              <strong className="text-orange-600 dark:text-orange-400">
                Save 3–6 hrs/project
              </strong>
            </div>
          </div>
        </div>
      </section>

      {/* AI agents */}
      <section className="py-16 px-4 md:px-8">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-neutral-50 mb-6">
            AI agents (for AirPro)
          </h2>
          <p className="text-lg text-neutral-700 dark:text-neutral-200 mb-8">
            Small programs that work for you, with your rules. Start simple and keep a human in the loop.
          </p>

          <h3 className="text-2xl font-bold text-neutral-900 dark:text-neutral-50 mb-4">
            What to expect
          </h3>
          <ul className="space-y-3 mb-8">
            <li className="flex gap-3">
              <span className="text-orange-500 mt-1">•</span>
              <span className="text-neutral-700 dark:text-neutral-200">
                Works from your data: Excel, SharePoint, email, Teams.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-orange-500 mt-1">•</span>
              <span className="text-neutral-700 dark:text-neutral-200">
                Reads and compiles; asks before sending or changing anything.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-orange-500 mt-1">•</span>
              <span className="text-neutral-700 dark:text-neutral-200">
                Needs clear rules, named ranges, and test data.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-orange-500 mt-1">•</span>
              <span className="text-neutral-700 dark:text-neutral-200">
                Mistakes happen if data is messy; review logs and improve.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-orange-500 mt-1">•</span>
              <span className="text-neutral-700 dark:text-neutral-200">
                Runs on a schedule (hourly/daily) or a trigger (new row, email received).
              </span>
            </li>
          </ul>

          <h3 className="text-2xl font-bold text-neutral-900 dark:text-neutral-50 mb-4">
            Likely use cases
          </h3>
          <ul className="space-y-3 mb-8">
            <li className="flex gap-3">
              <span className="text-orange-500 mt-1">•</span>
              <span className="text-neutral-700 dark:text-neutral-200">
                <strong className="text-neutral-900 dark:text-neutral-50">Daily readiness bot:</strong>{" "}
                Pull Fleet/Defects/Maint tabs → build report → post to Teams and email ops.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-orange-500 mt-1">•</span>
              <span className="text-neutral-700 dark:text-neutral-200">
                <strong className="text-neutral-900 dark:text-neutral-50">Defect triage:</strong>{" "}
                Flag high‑impact items, missing fields, or overdue actions; create Planner tasks.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-orange-500 mt-1">•</span>
              <span className="text-neutral-700 dark:text-neutral-200">
                <strong className="text-neutral-900 dark:text-neutral-50">Document digester:</strong>{" "}
                Summarize new PDFs with key changes.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-orange-500 mt-1">•</span>
              <span className="text-neutral-700 dark:text-neutral-200">
                <strong className="text-neutral-900 dark:text-neutral-50">Data QA:</strong>{" "}
                Spot anomalies in spreadsheets.
              </span>
            </li>
          </ul>

          <h3 className="text-2xl font-bold text-neutral-900 dark:text-neutral-50 mb-4">
            Agent timeline
          </h3>
          <p className="text-lg text-neutral-700 dark:text-neutral-200 mb-6">
            Agents are new, but they will rapidly grow in importance and impact. Here&apos;s how AirPro might implement them.
          </p>
          <div className="space-y-4 mb-8">
            <div className="flex gap-4 items-start">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-orange-500 dark:bg-orange-600 text-white flex items-center justify-center font-bold">
                1
              </div>
              <div className="flex-1">
                <h4 className="text-lg font-semibold text-neutral-900 dark:text-neutral-50 mb-1">
                  Week 1-2
                </h4>
                <p className="text-neutral-700 dark:text-neutral-200">
                  Pick one workflow (e.g., readiness). Create read‑only access and sample data.
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-orange-500 dark:bg-orange-600 text-white flex items-center justify-center font-bold">
                2
              </div>
              <div className="flex-1">
                <h4 className="text-lg font-semibold text-neutral-900 dark:text-neutral-50 mb-1">
                  Week 3-4
                </h4>
                <p className="text-neutral-700 dark:text-neutral-200">
                  Build the bot in staging. Define the message format and approval step.
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-orange-500 dark:bg-orange-600 text-white flex items-center justify-center font-bold">
                3
              </div>
              <div className="flex-1">
                <h4 className="text-lg font-semibold text-neutral-900 dark:text-neutral-50 mb-1">
                  Month 2
                </h4>
                <p className="text-neutral-700 dark:text-neutral-200">
                  Pilot with 3–5 users. Track errors; tune prompts and rules.
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-orange-500 dark:bg-orange-600 text-white flex items-center justify-center font-bold">
                4
              </div>
              <div className="flex-1">
                <h4 className="text-lg font-semibold text-neutral-900 dark:text-neutral-50 mb-1">
                  Month 3
                </h4>
                <p className="text-neutral-700 dark:text-neutral-200">
                  Expand to defect triage and maintenance watch. Measure time saved.
                </p>
              </div>
            </div>
          </div>

          <h3 className="text-2xl font-bold text-neutral-900 dark:text-neutral-50 mb-4">
            Safety &amp; access
          </h3>
          <ul className="space-y-3">
            <li className="flex gap-3">
              <span className="text-orange-500 mt-1">•</span>
              <span className="text-neutral-700 dark:text-neutral-200">
                Start read‑only. Give least privilege and log every run.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-orange-500 mt-1">•</span>
              <span className="text-neutral-700 dark:text-neutral-200">
                No secrets or regulated data in prompts unless under enterprise controls.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-orange-500 mt-1">•</span>
              <span className="text-neutral-700 dark:text-neutral-200">
                Use a staging sheet first; promote after checks pass.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-orange-500 mt-1">•</span>
              <span className="text-neutral-700 dark:text-neutral-200">
                Notify in Teams; require &quot;Approve&quot; to send email or write back.
              </span>
            </li>
          </ul>
        </div>
      </section>

      {/* Key points */}
      <section className="py-16 px-4 md:px-8 bg-orange-50 dark:bg-orange-950/20">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-neutral-50 mb-8">
            Key points
          </h2>
          <ul className="space-y-4">
            <li className="flex gap-3">
              <span className="text-orange-500 text-xl mt-1">•</span>
              <span className="text-lg text-neutral-700 dark:text-neutral-200">
                Do not lock into one model. Use two or more.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-orange-500 text-xl mt-1">•</span>
              <span className="text-lg text-neutral-700 dark:text-neutral-200">
                Keep private data out unless on enterprise controls.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-orange-500 text-xl mt-1">•</span>
              <span className="text-lg text-neutral-700 dark:text-neutral-200">
                Make AI show its work, especially with spreadsheets.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-orange-500 text-xl mt-1">•</span>
              <span className="text-lg text-neutral-700 dark:text-neutral-200">
                Phones make AI handy: voice, photos, quick checks.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-orange-500 text-xl mt-1">•</span>
              <span className="text-lg text-neutral-700 dark:text-neutral-200">
                Ship one mini‑app in 3 weeks; scale from there.
              </span>
            </li>
          </ul>
        </div>
      </section>

      {/* Footer */}
      <section className="py-16 px-4 md:px-8 bg-neutral-900 dark:bg-neutral-950">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-lg text-neutral-100 dark:text-neutral-200 mb-8">
            AI is a helper, not a boss. Pair strong Conversational models with your Knowledge systems, and use more than one model to stay sharp, safe, and fast.
          </p>
        </div>
      </section>

      {/* Credits */}
      <section className="py-12 px-4 md:px-8 bg-neutral-50 dark:bg-neutral-900">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-neutral-700 dark:text-neutral-300 mb-4">
            This document was created by <strong className="text-neutral-900 dark:text-neutral-50">Lemonbrand</strong> for <strong className="text-neutral-900 dark:text-neutral-50">AirPro</strong>.
          </p>
          <div className="flex justify-center">
            <Image
              src="https://cdn.prod.website-files.com/67f2c3d3da332df3a9d5d98a/67f2c845a1aa4919ed61743e_Company%20Logo%20Black.svg"
              alt="Lemonbrand Logo"
              width={120}
              height={40}
              className="opacity-30 dark:invert"
            />
          </div>
        </div>
      </section>
    </main>
  );
}

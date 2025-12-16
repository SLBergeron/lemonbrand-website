import type { Page } from "@/components/sarah/steps/types";

export const pages: Page[] = [
  // PAGE 1: You're Not Behind
  {
    id: "youre-not-behind",
    title: "You're Not Behind",
    description: "Permission + validation. Let's start with the truth about AI adoption.",
    estimatedMinutes: 4,
    badge: {
      name: "Permission Granted",
      icon: "shield",
      xp: 25,
    },
    steps: [
      {
        id: "1-1",
        type: "text",
        content: {
          title: "Let's start here: You're not behind.",
          body: "95% of AI pilots at companies fail. But not because the technology doesn't work. They fail because people lack clarity on what they're actually trying to achieve.",
          highlight: "stat",
        },
      },
      {
        id: "1-2",
        type: "multiple-choice",
        content: {
          question: "Which sounds most like you right now?",
          options: [
            {
              id: "skeptic",
              label: "The Skeptic",
              description: "I've tried AI but it never gives me what I want. I'm not sure it actually works.",
            },
            {
              id: "overwhelmed",
              label: "The Overwhelmed",
              description: "I know I should learn this but I barely have time for my actual work.",
            },
            {
              id: "tool-jumper",
              label: "The Tool-Jumper",
              description: "I've tried ChatGPT, Claude, Perplexity... nothing sticks. There's always something newer.",
            },
          ],
          feedback: {
            neutral: "All three are valid. Here's the thing—the problem isn't you. It's how AI gets introduced. Most training focuses on tools when it should focus on clarity.",
          },
        },
      },
      {
        id: "1-3",
        type: "text",
        content: {
          body: "Most people haven't moved past using AI as a slightly smarter Google. The companies figuring this out aren't more technically sophisticated—they're more clear on what they're trying to achieve.",
        },
      },
      {
        id: "1-4",
        type: "reveal",
        content: {
          prompt: "What does real success look like?",
          buttonLabel: "Tap to see a real example",
          revealType: "text",
          hiddenContent: "A recruiter created one simple automation for scheduling. It saved her team 2-10 hours per week. Not 30 tools. One automation. One problem solved.",
          caption: "From a 70-person recruiting firm that figured it out.",
        },
      },
      {
        id: "1-5",
        type: "text",
        content: {
          title: "This isn't about learning AI.",
          body: "It's about getting clear on what you want, then letting AI help you get there. The skill isn't technical—it's clarity.",
          highlight: "tip",
        },
      },
      {
        id: "1-6",
        type: "build",
        content: {
          title: "What do YOU want more time for?",
          description: "Select what matters most to you. We'll reference this later.",
          fields: [
            {
              id: "time-for",
              label: "I want more time for...",
              type: "checkbox",
              options: [
                "Strategic thinking and planning",
                "Creative work and ideation",
                "Building relationships with my team",
                "Deep focus on important projects",
              ],
            },
          ],
          showResult: false,
        },
      },
      {
        id: "1-7",
        type: "completion",
        content: {
          badge: {
            name: "Permission Granted",
            icon: "shield",
            xp: 25,
          },
          message: "You have permission to experiment. You have permission to not know everything. Let's get clear on what matters.",
        },
      },
    ],
  },

  // PAGE 2: The Intern Metaphor
  {
    id: "the-intern-metaphor",
    title: "The Intern Metaphor",
    description: "Reframe AI as a smart intern you're training.",
    estimatedMinutes: 4,
    badge: {
      name: "Good Manager",
      icon: "users",
      xp: 30,
    },
    steps: [
      {
        id: "2-1",
        type: "text",
        content: {
          title: "Think of AI like a smart intern.",
          body: "Eager, fast, and capable—but needs clear direction. You need to explain the tone, the steps, and what 'done' looks like. Just like you would for any junior team member.",
        },
      },
      {
        id: "2-2",
        type: "compare",
        content: {
          title: "Bad manager vs. good manager",
          left: {
            label: "Vague direction",
            content: "Write me an email.",
            style: "bad",
          },
          right: {
            label: "Clear direction",
            content: "Write a follow-up email to a client who requested a proposal last week. Tone: professional but warm. Length: 3 paragraphs. Mention we're excited to partner.",
            style: "good",
          },
          explanation: "The second prompt gives your 'intern' everything they need to succeed on the first try.",
        },
      },
      {
        id: "2-3",
        type: "text",
        content: {
          title: "Welcome to the SOP era.",
          body: "You can only automate what you can explain. If you can train a junior employee to do something, you can train AI to help with it. The skill is documentation, not coding.",
          highlight: "tip",
        },
      },
      {
        id: "2-4",
        type: "drag-drop",
        content: {
          instruction: "Sort these instructions: helpful or too vague?",
          items: [
            { id: "item-1", label: "Make it good", correctZone: "vague" },
            { id: "item-2", label: "Use a friendly, professional tone", correctZone: "helpful" },
            { id: "item-3", label: "Fix this", correctZone: "vague" },
            { id: "item-4", label: "Include a clear call-to-action at the end", correctZone: "helpful" },
            { id: "item-5", label: "Improve the email", correctZone: "vague" },
            { id: "item-6", label: "Structure as: intro, 3 bullet points, closing", correctZone: "helpful" },
          ],
          zones: [
            { id: "helpful", label: "Helpful for an intern", description: "Specific, actionable" },
            { id: "vague", label: "Too vague", description: "Needs more detail" },
          ],
        },
      },
      {
        id: "2-5",
        type: "text",
        content: {
          body: "Your intern doesn't know your context. Every time you start, you need to set the scene: Who are you? What's the goal? What does success look like?",
        },
      },
      {
        id: "2-6",
        type: "build",
        content: {
          title: "Brief your intern",
          description: "Fill in how you'd set context for a task.",
          fields: [
            {
              id: "role",
              label: "Your role is...",
              type: "dropdown",
              options: ["Marketing Director", "Content Strategist", "Brand Manager", "Campaign Lead"],
            },
            {
              id: "goal",
              label: "The goal is...",
              type: "dropdown",
              options: [
                "to drive awareness of a new product",
                "to engage our existing customers",
                "to generate qualified leads",
                "to build thought leadership",
              ],
            },
            {
              id: "success",
              label: "Success looks like...",
              type: "dropdown",
              options: [
                "clear, compelling copy that matches our brand voice",
                "content that educates without being salesy",
                "a draft I can refine in 10 minutes or less",
                "multiple options I can choose from",
              ],
            },
          ],
          template: "You are helping a {role}. {goal}. {success}.",
          showResult: true,
        },
      },
      {
        id: "2-7",
        type: "completion",
        content: {
          badge: {
            name: "Good Manager",
            icon: "users",
            xp: 30,
          },
          message: "You now think like a good manager. Clear direction leads to clear results.",
        },
      },
    ],
  },

  // PAGE 3: Getting Clear
  {
    id: "getting-clear",
    title: "Getting Clear",
    description: "The actual skill - clarity before prompting.",
    estimatedMinutes: 5,
    badge: {
      name: "Clarity Seeker",
      icon: "target",
      xp: 35,
    },
    steps: [
      {
        id: "3-1",
        type: "text",
        content: {
          title: "Before you type anything, ask yourself...",
          body: "What am I trying to achieve? What would a perfect outcome look like? What would I tell a junior employee?",
          highlight: "quote",
        },
      },
      {
        id: "3-2",
        type: "multiple-choice",
        content: {
          question: "You have a messy document with Q1 campaign ideas. What do you ask AI to do first?",
          options: [
            {
              id: "shorter",
              label: "Make it shorter",
              description: "Cut it down to the essentials.",
            },
            {
              id: "organize",
              label: "Organize it into categories",
              description: "Group similar ideas together.",
              isCorrect: true,
            },
            {
              id: "rewrite",
              label: "Rewrite it beautifully",
              description: "Polish the language and formatting.",
            },
          ],
          feedback: {
            correct: "Exactly. Structure first, polish later. Organization helps you see what you actually have before you start refining.",
            incorrect: "Good instinct, but try organizing first. Structure helps you see what you have before you cut or polish.",
          },
        },
      },
      {
        id: "3-3",
        type: "text",
        content: {
          title: "Clarity → Output",
          body: "The quality of what you get out is directly tied to how clear you are about what you want. Vague in, vague out.",
        },
      },
      {
        id: "3-4",
        type: "build",
        content: {
          title: "Define success first",
          description: "You need 10 social posts for a product launch. Fill in the specifics.",
          fields: [
            {
              id: "platform",
              label: "Platform",
              type: "dropdown",
              options: ["Instagram", "LinkedIn", "Twitter/X", "Multiple platforms"],
            },
            {
              id: "tone",
              label: "Tone",
              type: "dropdown",
              options: ["Professional", "Playful", "Inspirational", "Educational"],
            },
            {
              id: "include",
              label: "Must include",
              type: "dropdown",
              options: ["Product benefit", "Call-to-action", "Hashtags", "Customer quote"],
            },
            {
              id: "length",
              label: "Length",
              type: "dropdown",
              options: ["Short (under 50 words)", "Medium (50-100 words)", "Long (100+ words)"],
            },
          ],
          template: "Create 10 social media posts for {platform}. Tone: {tone}. Each post must include: {include}. Length: {length}.",
          showResult: true,
        },
      },
      {
        id: "3-5",
        type: "reveal",
        content: {
          prompt: "See your clarity become a prompt",
          buttonLabel: "Show example output",
          revealType: "text",
          hiddenContent: "When you define platform, tone, requirements, and length upfront, you get posts you can actually use—not generic content you need to rewrite from scratch.",
        },
      },
      {
        id: "3-6",
        type: "drag-drop",
        content: {
          instruction: "What's missing from each prompt?",
          items: [
            { id: "p1", label: "\"Write a blog post about AI\"", correctZone: "missing-context" },
            { id: "p2", label: "\"Help me with this email to my boss about the project delay\"", correctZone: "missing-format" },
            { id: "p3", label: "\"Make something for our social media\"", correctZone: "missing-goal" },
            { id: "p4", label: "\"Write 3 LinkedIn posts about our new CRM feature, professional tone, 100 words each, with a question hook\"", correctZone: "complete" },
          ],
          zones: [
            { id: "missing-context", label: "Missing context", description: "No background info" },
            { id: "missing-format", label: "Missing format", description: "How should it look?" },
            { id: "missing-goal", label: "Missing goal", description: "What's the purpose?" },
            { id: "complete", label: "Complete", description: "Has everything needed" },
          ],
        },
      },
      {
        id: "3-7",
        type: "completion",
        content: {
          badge: {
            name: "Clarity Seeker",
            icon: "target",
            xp: 35,
          },
          message: "You've learned the real skill: getting clear before you start. This is what separates effective AI users from frustrated ones.",
        },
      },
    ],
  },

  // PAGE 4: Your First Win
  {
    id: "your-first-win",
    title: "Your First Win",
    description: "See the difference clarity makes—in real time.",
    estimatedMinutes: 4,
    badge: {
      name: "First Win",
      icon: "rocket",
      xp: 30,
    },
    steps: [
      {
        id: "4-1",
        type: "text",
        content: {
          title: "Let's make this real.",
          body: "Forget theory. Let's look at an actual task everyone does: summarizing a meeting. You'll see exactly why clarity changes everything.",
        },
      },
      {
        id: "4-2",
        type: "text",
        content: {
          title: "The scenario",
          body: "You just finished a 45-minute team meeting. Your manager asks you to send a summary to the three people who couldn't attend. You have messy notes. Go.",
          highlight: "tip",
        },
      },
      {
        id: "4-3",
        type: "compare",
        content: {
          title: "Two ways to ask AI for help",
          left: {
            label: "What most people type",
            content: "Summarize this meeting",
            style: "bad",
          },
          right: {
            label: "What actually works",
            content: "Summarize these meeting notes for 3 colleagues who missed the call. Include: key decisions, action items with owners, and what they need to know before Friday. Keep it under 200 words. Friendly but professional tone.",
            style: "good",
          },
          explanation: "Same task. Same AI. Wildly different results. The difference isn't the technology—it's the clarity.",
        },
      },
      {
        id: "4-4",
        type: "drag-drop",
        content: {
          instruction: "What made the second prompt better?",
          items: [
            { id: "audience", label: "Who will read it", correctZone: "included" },
            { id: "format", label: "What to include", correctZone: "included" },
            { id: "length", label: "How long it should be", correctZone: "included" },
            { id: "tone", label: "What tone to use", correctZone: "included" },
            { id: "fancy", label: "Fancy vocabulary", correctZone: "not-included" },
            { id: "technical", label: "Technical AI terms", correctZone: "not-included" },
          ],
          zones: [
            { id: "included", label: "Made it better" },
            { id: "not-included", label: "Didn't matter" },
          ],
        },
      },
      {
        id: "4-5",
        type: "text",
        content: {
          title: "Notice what's NOT on that list?",
          body: "No prompt engineering tricks. No special keywords. Just the same things you'd tell a new hire: who's it for, what do they need, how should it look. That's the whole skill.",
          highlight: "quote",
        },
      },
      {
        id: "4-6",
        type: "multiple-choice",
        content: {
          question: "You need to write 5 LinkedIn posts about a product launch. What's MOST important to tell AI?",
          options: [
            {
              id: "wrong1",
              label: "Use advanced NLP techniques",
              description: "Technical jargon for the AI.",
            },
            {
              id: "wrong2",
              label: "Please and thank you",
              description: "Being polite to the AI.",
            },
            {
              id: "correct",
              label: "Target audience and tone",
              description: "Who's reading and how it should feel.",
              isCorrect: true,
            },
            {
              id: "wrong3",
              label: "The longest prompt possible",
              description: "More words = better results.",
            },
          ],
          feedback: {
            correct: "Exactly. Audience and tone. The same things you'd tell a copywriter. AI is no different.",
            incorrect: "Not quite. Think about what you'd tell a human copywriter. That's what AI needs too.",
          },
        },
      },
      {
        id: "4-7",
        type: "completion",
        content: {
          badge: {
            name: "First Win",
            icon: "rocket",
            xp: 30,
          },
          message: "You've seen the difference clarity makes. Try it this week: take one tedious task, add context, format, and tone. Watch what happens.",
        },
      },
    ],
  },

  // PAGE 5: Your Superpower
  {
    id: "your-superpower",
    title: "Your Superpower",
    description: "The one skill that makes everything else easier.",
    estimatedMinutes: 4,
    badge: {
      name: "Focused Learner",
      icon: "brain",
      xp: 35,
    },
    steps: [
      {
        id: "5-1",
        type: "text",
        content: {
          title: "Forget the tool parade.",
          body: "There are hundreds of AI tools. New ones every week. You don't need to track them all. You need ONE that you actually use.",
        },
      },
      {
        id: "5-2",
        type: "text",
        content: {
          title: "My recommendation: start with Claude.",
          body: "It's what I use every day. It's like having a thoughtful colleague who's always available—to think through problems, draft documents, prep for meetings, or just bounce ideas off.",
          highlight: "tip",
        },
      },
      {
        id: "5-3",
        type: "compare",
        content: {
          title: "Two ways to use AI",
          left: {
            label: "What most people do",
            content: "Open ChatGPT once a month. Ask a random question. Get a meh answer. Close the tab. Repeat.",
            style: "bad",
          },
          right: {
            label: "What actually works",
            content: "Keep Claude open all day. Talk through your work. Use voice when it's easier. Let it handle the tedious parts while you focus on what matters.",
            style: "good",
          },
          explanation: "The difference isn't the tool. It's treating AI like a thinking partner, not a search engine.",
        },
      },
      {
        id: "5-4",
        type: "multiple-choice",
        content: {
          question: "What's the real superpower here?",
          options: [
            {
              id: "wrong1",
              label: "Knowing 30 different AI tools",
              description: "Being a tool expert.",
            },
            {
              id: "wrong2",
              label: "Writing perfect prompts",
              description: "Mastering prompt engineering.",
            },
            {
              id: "correct",
              label: "Talking through your work with AI",
              description: "Using AI as a thinking partner.",
              isCorrect: true,
            },
            {
              id: "wrong3",
              label: "Automating everything",
              description: "Replacing all human work.",
            },
          ],
          feedback: {
            correct: "Exactly. The skill is conversation—explaining what you need clearly. The tool is just the medium.",
            incorrect: "Not quite. The real skill isn't about tools or prompts—it's about talking through your work.",
          },
        },
      },
      {
        id: "5-5",
        type: "text",
        content: {
          title: "Yes, there are other tools.",
          body: "Image generators. Research assistants. Specialized apps. They exist, and some are great. But you don't need them yet. Start with one conversational AI. Get comfortable. I'm always here if you want recommendations for something specific.",
        },
      },
      {
        id: "5-6",
        type: "text",
        content: {
          title: "What I do every day:",
          body: "I talk to Claude like I'm talking to you right now. I use voice to capture ideas. I let AI handle drafts, summaries, and busywork—so I can focus on strategy, relationships, and the work that actually matters.",
          highlight: "quote",
        },
      },
      {
        id: "5-7",
        type: "completion",
        content: {
          badge: {
            name: "Focused Learner",
            icon: "brain",
            xp: 35,
          },
          message: "You've got clarity: start with Claude, talk through your work, ask me when you need specific tool advice. That's it.",
        },
      },
    ],
  },

  // PAGE 6: Become a Champion
  {
    id: "become-a-champion",
    title: "Become a Champion",
    description: "Position yourself to spread what you've learned.",
    estimatedMinutes: 4,
    badge: {
      name: "AI Champion",
      icon: "trophy",
      xp: 50,
    },
    steps: [
      {
        id: "6-1",
        type: "text",
        content: {
          title: "AI doesn't spread like other software.",
          body: "Unlike Asana where one person's use benefits everyone automatically, AI workflows are personal. Your prompts, your GPTs, your automations—they're built around YOUR context.",
        },
      },
      {
        id: "6-2",
        type: "text",
        content: {
          title: "What does spread: peer-built solutions.",
          body: "The recruiter's scheduling automation spread because a PEER built it—not a consultant, not an engineer. That peer could be you.",
          highlight: "quote",
        },
      },
      {
        id: "6-3",
        type: "multiple-choice",
        content: {
          question: "Who on your team might benefit from what you've learned?",
          options: [
            {
              id: "skeptic",
              label: "Someone skeptical",
              description: "They doubt AI works but might trust you.",
            },
            {
              id: "overwhelmed",
              label: "Someone overwhelmed",
              description: "They want to learn but have no bandwidth.",
            },
            {
              id: "jumper",
              label: "Someone jumping between tools",
              description: "They're trying everything but mastering nothing.",
            },
          ],
          feedback: {
            neutral: "You probably know someone in each category. The best champions start with one person at a time.",
          },
        },
      },
      {
        id: "6-4",
        type: "text",
        content: {
          title: "The champion model",
          body: "3-5 people with permission to experiment, room to fail, and eagerness to share. That's how AI adoption actually works. You're now one of those people.",
          highlight: "tip",
        },
      },
      {
        id: "6-5",
        type: "build",
        content: {
          title: "Your first share",
          description: "What ONE thing will you show someone else this week?",
          fields: [
            {
              id: "show-to",
              label: "I'll show...",
              type: "text",
              placeholder: "e.g., my teammate Maria",
            },
            {
              id: "show-what",
              label: "How to...",
              type: "dropdown",
              options: [
                "use the intern metaphor to get better results",
                "document a process as a reusable prompt",
                "pick one tool and focus on it",
                "get clear before typing anything",
              ],
            },
          ],
          showResult: false,
        },
      },
      {
        id: "6-6",
        type: "build",
        content: {
          title: "Your 3-day plan",
          description: "Make it concrete. What will you do this week?",
          fields: [
            {
              id: "day1",
              label: "Day 1: Try",
              type: "dropdown",
              options: [
                "using AI for one tedious task",
                "documenting my process for something repetitive",
                "asking better questions with the intern mindset",
              ],
            },
            {
              id: "day2",
              label: "Day 2: Document",
              type: "dropdown",
              options: [
                "what worked and what didn't",
                "the prompt that gave me the best result",
                "how much time I saved",
              ],
            },
            {
              id: "day3",
              label: "Day 3: Share with",
              type: "text",
              placeholder: "e.g., one colleague who might benefit",
            },
          ],
          showResult: false,
        },
      },
      {
        id: "6-7",
        type: "completion",
        content: {
          badge: {
            name: "AI Champion",
            icon: "trophy",
            xp: 50,
          },
          message: "You've completed all 6 lessons. You're not just using AI—you're ready to help others use it too. That's what champions do.",
        },
      },
    ],
  },
];

// Export individual pages for easy access
export const page1 = pages[0];
export const page2 = pages[1];
export const page3 = pages[2];
export const page4 = pages[3];
export const page5 = pages[4];
export const page6 = pages[5];

// Helper to get page by ID
export function getPageById(id: string): Page | undefined {
  return pages.find(p => p.id === id);
}

// Helper to get page index
export function getPageIndex(id: string): number {
  return pages.findIndex(p => p.id === id);
}

// Total XP available
export const totalAvailableXP = pages.reduce((sum, page) => sum + page.badge.xp, 0);

import { Metadata } from "next";
import { LegalContentWithToc } from "@/components/LegalContentWithToc";

export const metadata: Metadata = {
  title: "Terms of Service | LemonBrand",
  description: "The deal between us. What you get, what I deliver, how we work together.",
};

const tocLinks = [
  { title: "The agreement", href: "#the-agreement" },
  { title: "What I do", href: "#what-i-do" },
  { title: "What you get", href: "#what-you-get" },
  { title: "What I need from you", href: "#what-i-need-from-you" },
  { title: "Project timelines", href: "#project-timelines" },
  { title: "What can go wrong", href: "#what-can-go-wrong" },
  { title: "Cancellation policy", href: "#cancellation-policy" },
  { title: "Confidentiality", href: "#confidentiality" },
  { title: "Intellectual property", href: "#intellectual-property" },
  { title: "Liability limits", href: "#liability-limits" },
  { title: "Warranties and guarantees", href: "#warranties-and-guarantees" },
  { title: "Acceptable use", href: "#acceptable-use" },
  { title: "Support and maintenance", href: "#support-and-maintenance" },
  { title: "Dispute resolution", href: "#dispute-resolution" },
  { title: "Contact and questions", href: "#contact-and-questions" },
];

const tldr = [
  "I build automation systems on your infrastructure",
  "You own everything we create together",
  "I fix issues for 30 days post-launch",
  "Payment is 50% upfront, 50% on delivery",
  "Either party can cancel retainers with 30 days notice",
  "I'm not liable beyond what you paid me",
  "Canadian law applies",
  "Questions? Email me",
];

const termsContent = `
## The agreement

This is the deal between you and me (Simon Bergeron, operating as LemonBrand). When you hire me, book a call, or use the website, you're agreeing to these terms.

No lawyers wrote this. I did. It's written in plain English because legal documents shouldn't require a law degree to understand.

---

## What I do

**I build AI automation systems.** Specifically:

- Workflow automation using Make.com, Zapier, n8n, and similar tools
- AI integration with OpenAI, Claude, and custom agents
- CRM automation across HubSpot, Salesforce, and other platforms
- Sales and marketing automation systems
- Operations dashboards and intelligence systems
- Content distribution and repurposing workflows

**I work directly with you.** No agency overhead. No account managers. Just me building, deploying, and supporting your systems.

---

## What you get

### Discovery Phase
- Deep-dive analysis of your operations
- Automation opportunity identification
- Success metrics definition
- Custom system architecture plan
- Integration planning and technical specs

### Build Phase
- Done-with-you implementation (not done-for-you)
- Seamless integration with your existing tools
- Team training and documentation
- Testing and quality assurance
- Launch support and handoff

### Post-Launch
- 30 days of fixes and adjustments included
- Optional ongoing support via monthly retainer
- System optimization and scaling
- Performance monitoring and reporting

### What You Own
**Everything.** The automations are built on your accounts using your tools. You control all access. You can revoke my permissions anytime. No vendor lock-in. No held hostage.

---

## What I need from you

### Access
- Login credentials to your tools and platforms
- Permissions to build and test within your systems
- API keys and integration access where needed

I only access what's required to do the work. Once the project ends, revoke my access. Your data stays yours.

### Communication
- Clear communication about goals and requirements
- Timely responses during the build phase
- Feedback on implementations and tests
- Participation in training sessions

### Payment
- 50% deposit upfront to start work
- 50% due upon delivery and launch
- Monthly retainers billed at the start of each month
- Payment via Stripe (credit card or ACH)
- Net 7 terms for invoices

**Late payments:** I pause work after 7 days. Your systems stay running, but no updates, fixes, or new builds until payment clears.

---

## Project timelines

**Discovery:** 1-2 weeks depending on complexity

**Build:** 2-6 weeks depending on scope:
- Simple workflows: 2-3 weeks
- Multi-system integrations: 4-6 weeks
- Complex custom builds: 6+ weeks

**I set realistic timelines.** I won't overpromise to close the deal. If something takes longer than expected, I'll communicate immediately and adjust.

**Delays happen.** If your team is slow to respond or provide access, timelines extend accordingly. If I'm the bottleneck, I own it and communicate proactively.

---

## What can go wrong

### Technical Issues
**APIs change.** Platforms update. Integrations break. That's the nature of software.

**During the project:** I fix it as part of the work.

**After launch (first 30 days):** I fix it for free.

**After 30 days:** Retainer clients get priority support. One-off clients can book fix sprints at my hourly rate.

### Scope Changes
**You change your mind:** If requirements change mid-project, we re-scope and adjust pricing. Small tweaks are fine. Complete pivots require a new agreement.

**I discover problems:** If I find issues in your existing systems that need fixing first, we discuss options and adjust scope accordingly.

### Service Interruptions
**If third-party services go down:** (Make.com, your CRM, etc.) I can't fix that. I'll help troubleshoot and communicate with vendors, but uptime depends on the platforms we integrate with.

**If your account gets suspended:** Not my fault. If you violate a platform's terms and they shut you down, that's on you.

---

## Cancellation policy

### Before We Start
You can cancel anytime before I begin work. Full refund of deposit.

### During Discovery
If you cancel during discovery, you pay for time spent (hourly rate × hours worked). Remaining deposit refunded.

### During Build
If you cancel mid-build, you pay for work completed. You keep everything built so far. No refund on work delivered.

### Monthly Retainers
Either party can cancel with 30 days notice. No long-term contracts. No cancellation fees. If you're not happy, you can leave.

---

## Confidentiality

**I don't share your data.** Period.

**NDAs:** I'll sign one if you need it. Most clients don't bother, but I'm happy to if you want the extra protection.

**Your systems:** Everything stays in your infrastructure. I don't keep copies of your customer data, proprietary workflows, or sensitive business information after projects end.

**My work:** I may use general insights and anonymized case studies for marketing. Specific client details require your permission first.

---

## Intellectual property

**Your stuff stays yours.** Business data, customer information, proprietary processes—all yours.

**My stuff stays mine.** General frameworks, templates, and methodologies I bring to the project remain my intellectual property.

**What we build together:** You own it. The specific automations and systems we create for your business belong to you.

**My templates and tools:** If I use pre-built components or frameworks I've developed, you get a license to use them in your business, but I retain ownership and can reuse them with other clients.

---

## Liability limits

**Here's what I'm responsible for:**
- Delivering the work as scoped
- Fixing bugs and errors in systems I build
- Maintaining confidentiality of your data
- Operating with reasonable skill and care

**Here's what I'm not responsible for:**
- Third-party platform failures or downtime
- Data loss caused by your systems or team
- Revenue claims or business outcomes (I build systems; you run your business)
- Indirect damages, lost profits, or consequential losses

**Maximum liability:** The total amount you paid me for the project. If you paid $10K, that's the max I'm liable for.

**Why this matters:** I'm a solo operator, not a corporation with insurance pools. This keeps pricing reasonable while protecting both of us.

---

## Warranties and guarantees

**What I guarantee:**
- Systems will work as specified at time of delivery
- Integrations will function with current API versions
- Code will be clean, documented, and maintainable
- Training will be thorough and clear

**What I don't guarantee:**
- Specific business outcomes or ROI (your results depend on how you use the systems)
- Future compatibility (platforms change; we adapt)
- Zero downtime (impossible promise in software)
- Platform uptime (that's on Make.com, HubSpot, etc.)

**"As-is" after 30 days:** Once the 30-day post-launch period ends, systems are delivered as-is unless you're on a retainer.

---

## Acceptable use

**You can:**
- Use the systems for legitimate business purposes
- Modify and extend the automations
- Hire someone else to maintain them
- Share documentation with your team

**You can't:**
- Resell the systems as your own product
- Use them for illegal activities
- Violate platform terms of service
- Spam people or violate privacy laws

**If you break laws using my systems:** That's on you. I'm not liable for how you use the tools I build.

---

## Support and maintenance

### First 30 Days (Included)
- Bug fixes and adjustments
- Performance optimization
- Training clarifications
- Integration troubleshooting

### After 30 Days (Retainer)
**Standard retainer includes:**
- 72-hour response time for issues
- Monthly optimization sprints
- Platform updates and maintenance
- Ongoing training and documentation

**Custom SLAs available.** Need same-day support? We can set that up. Pricing adjusts accordingly.

---

## Dispute resolution

**Step 1: Talk to me.** Email simon@lemonbrand.io with the issue. I'll respond within 48 hours. Most problems get solved here.

**Step 2: Mediation.** If we can't resolve it directly, we agree to try mediation before lawsuits.

**Step 3: Arbitration.** If mediation fails, binding arbitration in Ontario, Canada. Much cheaper and faster than courts.

**Governing law:** Ontario, Canada. If you're elsewhere, Canadian law applies.

**No class actions.** Disputes are individual, not class-wide.

---

## Service modifications

**I can:**
- Update pricing for new clients (doesn't affect existing agreements)
- Change service offerings and focus areas
- Retire specific services with 90 days notice
- Update these terms (with email notification)

**If terms change materially:** I'll email you 30 days before changes take effect. If you don't like the changes, you can cancel your retainer without penalty.

---

## Account termination

**I can terminate if:**
- You don't pay invoices after 30 days
- You violate these terms
- You ask me to do illegal or unethical work
- Working together becomes impossible

**You can terminate if:**
- You're not happy with the service (just give 30 days notice)
- Your business changes direction
- You want to bring work in-house

**When service ends:**
- You keep everything built so far
- I revoke my access to your systems
- Outstanding invoices are due immediately
- I delete any data I have on you (except legal/tax records)

---

## Disclaimer

**I'm not a lawyer, accountant, or compliance expert.** I build automation systems. If you need legal, financial, or regulatory advice, hire the appropriate professional.

**Industry-specific regulations:** If you're in healthcare (HIPAA), finance (SOC2), or other regulated industries, you're responsible for ensuring systems comply. I'll work with your compliance team, but ultimate responsibility is yours.

**Testing is critical.** You must test all systems before going live. I'll help with testing, but you're responsible for verifying everything works for your specific use case.

---

## Force majeure

**If something beyond my control prevents me from delivering:** (natural disasters, pandemics, internet infrastructure failure, platform shutdowns) I'm not liable for delays or non-delivery.

**I'll communicate immediately** and work to find solutions, but some things are genuinely outside my control.

---

## Entire agreement

**This is the deal.** These terms, plus any project-specific scope documents or proposals, constitute the entire agreement between us.

**Verbal promises don't count.** If it's not written in the scope or these terms, it's not part of the deal.

**Amendments require writing.** Changes to agreements must be documented via email or written addendum.

---

## Contact and questions

**Questions about these terms?**

Email: simon@lemonbrand.io

I'll respond within 48 hours. Usually faster.
`;

export default function TermsPage() {
  return (
    <LegalContentWithToc
      title="Terms of Service"
      lastUpdated="September 30, 2025"
      tldr={tldr}
      content={termsContent}
      tocLinks={tocLinks}
    />
  );
}

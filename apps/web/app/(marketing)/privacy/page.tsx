import {
  createPageMetadata,
  generateWebPageSchema,
  JsonLd,
} from "@/lib/seo";
import { LegalContentWithToc } from "@/components/LegalContentWithToc";

export const metadata = createPageMetadata({
  title: "Privacy Policy | LemonBrand",
  description:
    "How we handle your data. Clear. Direct. No legal BS. We collect what we need to deliver the service, don't sell your data, and you can leave anytime.",
  path: "/privacy",
  aiMetadata: {
    "ai:page-type": "legal",
    "ai:document-type": "privacy-policy",
    "ai:summary":
      "LemonBrand collects minimal data needed for service delivery. No data selling. Users own everything built together. GDPR compliant.",
  },
});

const tocLinks = [
  { title: "Here's the deal", href: "#heres-the-deal" },
  { title: "What data I collect", href: "#what-data-i-collect" },
  { title: "What I don't collect", href: "#what-i-dont-collect" },
  { title: "What I do with your data", href: "#what-i-do-with-your-data" },
  { title: "Who I share your data with", href: "#who-i-share-your-data-with" },
  { title: "Your rights", href: "#your-rights" },
  { title: "Data security", href: "#data-security" },
  { title: "Client work specifics", href: "#client-work-specifics" },
  { title: "Changes to this policy", href: "#changes-to-this-policy" },
  { title: "International data transfers", href: "#international-data-transfers" },
  { title: "Contact", href: "#contact" },
];

const tldr = [
  "I collect what I need to deliver the service",
  "I don't sell your data",
  "You own everything we build together",
  "You can leave anytime",
  "I'm a real person you can actually email",
];

const privacyContent = `
## Here's the deal

I'm Simon. I run LemonBrand. This is how I handle your data.

No corporate speak. No legal gymnastics. Just straight talk about what data I collect, why I collect it, and what I do with it.

---

## What data I collect

### When you visit the website

**Analytics:**

I use Vercel Analytics to see what pages people visit and where traffic comes from. It's privacy-friendly - no cookies, no tracking across sites, no personal data stored. Just basic page view counts.

**Cookies:**

Only what's needed for cookie consent preferences. That's it.

### When you sign up for the newsletter

**Email address:**

That's all I need. No phone number. No home address. Just your email.

**Name (optional):**

If you give it, I'll use it to personalize emails. If you don't, that's cool too.

### When you book a call

**Email, name, timezone:**

So I can actually show up to the call at the right time.

**Any context you provide:**

If you tell me about your business in the booking form, I read it before our call. Revolutionary, I know.

### When you become a client

**Business information:**

Whatever you share during discovery. I need to understand your business to build systems that work.

**System access:**

Temporary access to your tools (CRM, automation platforms, etc.) to do the work. You control this access. You can revoke it anytime.

**Payment information:**

Handled by Stripe. I never see your full credit card number. Stripe's privacy policy covers this.

---

## What I don't collect

- Browsing history across other sites
- Social media activity
- Anything from your personal devices
- Data I don't need to deliver the service

---

## What I do with your data

### Newsletter subscribers

**Send you emails.**

That's it. No selling your email to third parties. No spam. No affiliate schemes.

You can unsubscribe anytime with one click.

### Prospective clients

**Prepare for calls:**

I read your context. I research your industry. I show up ready.

**Follow up:**

If we talk and you want to move forward, I'll send you a proposal or next steps.

**Stay in touch:**

If now isn't the right time, I might check in every few months. You can tell me to stop anytime.

### Active clients

**Deliver the work:**

Access your systems, build automation, train your team.

**Provide support:**

Fix issues, optimize systems, answer questions.

**Improve service:**

Learn what works so I can serve future clients better.

---

## Who I share your data with

### Service providers I use:

**Vercel Analytics:**

Privacy-friendly website analytics. No cookies, no tracking, no personal data collection. Just basic page view metrics.

**Kit (ConvertKit):**

Handles newsletter emails. Their privacy policy covers how they handle data.

**Cal.com:**

Manages calendar bookings. They handle scheduling data.

**Stripe:**

Processes payments. They're PCI compliant and never share your full payment details with me.

**Automation Platforms (Make.com, n8n, Zapier):**

Where I build automation systems. When working with clients, I work inside *your* automation platform accounts when possible, so you own the data.

That's the full list.

### Who I don't share with:

- Advertisers
- Data brokers
- Anyone asking without a legal requirement
- Other clients (your data stays your data)

---

## Your rights

### You can:

**See what data I have:**

Email me at simon@lemonbrand.io. I'll send you everything I have on you.

**Update your data:**

Change your email, name, or any other info. Just tell me.

**Delete your data:**

Want out? Email me. I'll delete everything except what I legally have to keep (invoices, contracts, tax records for 7 years).

**Unsubscribe:**

One click. No guilt trip. No "are you sure" screens.

**Revoke access:**

If we're working together and you want to cut my access to your systems, just do it. You control all the logins.

---

## Data security

**How I protect your stuff:**

- All connections encrypted (HTTPS, TLS)
- Limited access (just me, no team)
- No storing sensitive data unless required for the work
- Regular backups kept secure
- API keys and credentials stored in encrypted password managers

**What I can't protect against:**

- You getting phished (use 2FA everywhere)
- Someone stealing your laptop
- Major security breaches at third-party services I use

I do my best. But perfect security doesn't exist.

---

## Client work specifics

### When we're building automation together:

**Your data stays in your infrastructure:**

I'm building on *your* accounts. You own everything.

**Temporary access only:**

I access your systems only while we're actively working. When the project ends, revoke my access.

**No data retention:**

Once the project ends, I don't keep copies of your client data, customer lists, or proprietary info. I keep project documentation and communication for my records.

**NDAs welcome:**

Need one? I'll sign it. Most clients don't need it, but I'm happy to.

---

## Changes to this policy

**I'll tell you:**

If I change how I handle data in a meaningful way, I'll email everyone on my list and update this page with a new date.

Minor fixes (typos, clarifications) won't trigger an email. Check the date at the top if you want to see what changed.

---

## International data transfers

**I'm in Canada:**

If you're elsewhere, your data might cross borders. I use service providers that comply with GDPR and other privacy laws.

If you're in the EU and have concerns, email me. We'll figure it out.

---

## Kids

**This site isn't for kids:**

Services are B2B. If you're under 18, this probably isn't relevant to you anyway.

---

## Contact

**Questions? Concerns? Want your data deleted?**

Email: simon@lemonbrand.io

I'll reply within 48 hours. Usually faster.
`;

export default function PrivacyPage() {
  const webPageSchema = generateWebPageSchema({
    name: "Privacy Policy | LemonBrand",
    description:
      "How we handle your data. Clear. Direct. No legal BS.",
    url: "https://lemonbrand.io/privacy",
  });

  return (
    <>
      <JsonLd data={webPageSchema} />
      <LegalContentWithToc
        title="Privacy Policy"
        lastUpdated="September 30, 2025"
        tldr={tldr}
        content={privacyContent}
        tocLinks={tocLinks}
      />
    </>
  );
}

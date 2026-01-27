import {
  createPageMetadata,
  generateWebPageSchema,
  JsonLd,
} from "@/lib/seo";
import { LegalContentWithToc } from "@/components/LegalContentWithToc";

export const metadata = createPageMetadata({
  title: "Cookie Policy | LemonBrand",
  description:
    "What cookies we use and why. No tracking circus, just functional basics. Essential cookies, analytics, and third-party service cookies explained.",
  path: "/cookies",
  aiMetadata: {
    "ai:page-type": "legal",
    "ai:document-type": "cookie-policy",
    "ai:summary":
      "LemonBrand uses essential cookies for site function, optional analytics, and third-party cookies from Kit, Cal.com, and Stripe. No advertising or cross-site tracking.",
  },
});

const tocLinks = [
  { title: "What cookies are", href: "#what-cookies-are" },
  { title: "What this site uses", href: "#what-this-site-uses" },
  { title: "What we don't use", href: "#what-we-dont-use" },
  { title: "Third-party cookies", href: "#third-party-cookies" },
  { title: "How to control cookies", href: "#how-to-control-cookies" },
  { title: "Mobile devices", href: "#mobile-devices" },
  { title: "Cookie consent", href: "#cookie-consent" },
  { title: "Changes to cookies we use", href: "#changes-to-cookies-we-use" },
  { title: "Data retention", href: "#data-retention" },
  { title: "Questions about cookies", href: "#questions-about-cookies" },
];

const tldr = [
  "Essential cookies make the site work (can't disable without breaking things)",
  "Analytics cookies help me see what pages are useful (you can disable these)",
  "Third-party cookies: Kit (newsletter), Cal.com (bookings), Stripe (payments)",
  "No advertising or tracking - I'm not following you around the internet",
  "You control them - use browser settings to block, delete, or customize anytime",
];

const cookiesContent = `
## What cookies are

Cookies are tiny text files stored on your device when you visit a website. They help websites remember things about you—like whether you're logged in, what's in your cart, or which pages you've visited.

**That's it.** No magic. No surveillance state. Just small files that make websites work.

---

## What this site uses

### Essential Cookies

**Purpose:** Make the website actually function.

**What they do:**
- Remember your session while browsing
- Keep forms working properly
- Maintain security settings
- Store your preferences (like dark mode)

**Can you disable them?** Technically yes, but the site won't work right.

**Duration:** Session cookies (deleted when you close the browser) and some that last up to 1 year.

### Analytics Cookies

**Purpose:** See what pages people visit and where traffic comes from.

**What we track:**
- Page views and visit duration
- Referral sources (how you found the site)
- General location (country/region, not exact address)
- Device type (mobile, desktop, etc.)

**What we don't track:**
- Your browsing history on other sites
- Personal identity (unless you voluntarily provide it)
- Keystroke patterns or mouse movements
- Anything invasive or creepy

**Tools we use:**
- Basic analytics (likely Google Analytics or similar)
- No ad tracking pixels
- No third-party marketing cookies

**Can you disable them?** Yes. Use your browser settings or opt-out tools. The site still works fine without them.

**Duration:** Up to 2 years (standard analytics cookie lifetime).

### Form Cookies (Kit/ConvertKit)

**Purpose:** Handle newsletter signups and form submissions.

**What they do:**
- Remember if you've already signed up
- Track attribution (how you found the form)
- Prevent duplicate submissions
- Manage subscription preferences

**Third party:** Kit (ConvertKit) handles these. Their privacy policy covers how they use cookies: [convertkit.com/privacy](https://convertkit.com/privacy)

**Can you disable them?** Yes, but you won't be able to subscribe to the newsletter.

**Duration:** Varies, typically up to 1 year.

### Calendar Booking Cookies (Cal.com)

**Purpose:** Handle meeting bookings and scheduling.

**What they do:**
- Remember your timezone
- Store booking preferences
- Maintain session during scheduling
- Prevent double-booking

**Third party:** Cal.com handles these. Their privacy policy: [cal.com/privacy](https://cal.com/privacy)

**Can you disable them?** Yes, but you won't be able to book calls through the site.

**Duration:** Varies, typically session-based with some lasting up to 1 year.

---

## What we don't use

**No advertising cookies.** I don't run ads or sell ad space. No Facebook Pixel. No Google Ads tracking. None of that.

**No cross-site tracking.** I don't follow you around the internet. What you do on other sites is your business.

**No behavioral profiling.** I'm not building a psychological profile of you to manipulate your decisions.

**No selling your data.** Your cookie data isn't for sale. Ever.

---

## Third-party cookies

### Services That Might Set Cookies

**Kit (ConvertKit):**
- Handles newsletter signups
- Their cookies track form attribution and subscriptions
- Privacy policy: [convertkit.com/privacy](https://convertkit.com/privacy)

**Cal.com:**
- Handles meeting bookings
- Their cookies manage scheduling sessions
- Privacy policy: [cal.com/privacy](https://cal.com/privacy)

**Payment processor (Stripe):**
- If you become a client and pay invoices
- Their cookies handle secure payment processing
- Privacy policy: [stripe.com/privacy](https://stripe.com/privacy)

**Analytics provider:**
- Basic traffic and usage analytics
- Standard analytics cookies only
- No advertising or tracking cookies

**I don't control third-party cookies.** Each service has its own privacy policy. If you have concerns about their cookies, check their policies or disable them in your browser.

---

## How to control cookies

### Browser Settings

**All major browsers let you:**
- Block all cookies
- Block third-party cookies only
- Delete existing cookies
- Get warnings before cookies are set

**How to do it:**
- **Chrome:** Settings → Privacy and security → Cookies and other site data
- **Firefox:** Settings → Privacy & Security → Cookies and Site Data
- **Safari:** Preferences → Privacy → Cookies and website data
- **Edge:** Settings → Cookies and site permissions → Cookies and site data

### Browser Extensions

**Cookie management tools:**
- Privacy Badger (blocks tracking cookies)
- uBlock Origin (blocks ads and trackers)
- Cookie AutoDelete (automatically clears cookies)

### Do Not Track (DNT)

**Most browsers have a "Do Not Track" setting.** I respect it. If your browser sends a DNT signal, I honor that preference.

**Reality check:** Not all websites respect DNT. I do, but it's not legally enforceable everywhere.

---

## Mobile devices

### iOS (Safari)
Settings → Safari → Block All Cookies (or customize)

### Android (Chrome)
Chrome app → Settings → Site settings → Cookies

### In-app browsers
If you're opening links from apps (Facebook, Instagram, etc.), those browsers may have their own cookie policies. I don't control that.

---

## Cookie consent

**EU visitors:** Cookie consent banner appears on first visit. You can accept, reject, or customize which cookies you allow.

**Everyone else:** Cookies are used by default. You can disable them in your browser settings anytime.

**Your choice matters.** Essential cookies are necessary for the site to work, but analytics and third-party cookies are optional. Disable them if you want.

---

## Changes to cookies we use

**If I add new cookies:** I'll update this policy and change the "Last Updated" date.

**Material changes:** If I start using cookies in a significantly different way (like adding advertising), I'll notify subscribers via email.

**Check the date at the top.** If you want to see what changed, compare against your last visit.

---

## Data retention

**Session cookies:** Deleted when you close your browser.

**Persistent cookies:** Expire after their set duration (anywhere from 30 days to 2 years).

**You can delete them anytime.** Clear your browser cookies and they're gone immediately.

---

## Questions about cookies

**Want more details about what cookies are currently set?**

Check your browser's developer tools (usually F12) → Application/Storage → Cookies. You'll see every cookie currently stored from this site.

**Still have questions?**

Email: simon@lemonbrand.io

I'll respond within 48 hours.
`;

export default function CookiesPage() {
  const webPageSchema = generateWebPageSchema({
    name: "Cookie Policy | LemonBrand",
    description:
      "What cookies we use and why. No tracking circus, just functional basics.",
    url: "https://lemonbrand.io/cookies",
  });

  return (
    <>
      <JsonLd data={webPageSchema} />
      <LegalContentWithToc
        title="Cookie Policy"
        lastUpdated="September 30, 2025"
        tldr={tldr}
        content={cookiesContent}
        tocLinks={tocLinks}
      />
    </>
  );
}

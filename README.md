# LemonBrand Website

Production website for lemonbrand.io - AI-powered automation agency.

## Tech Stack

- **Framework:** Next.js 14+ (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** Custom components + shadcn/ui
- **Deployment:** Vercel (recommended)

## Project Structure

```
lemonbrand-website/
├── app/                    # Next.js app directory (routes & pages)
│   ├── page.tsx           # Homepage
│   ├── calculator/        # ROI Calculator page
│   ├── resources/         # Resources page
│   ├── privacy/           # Privacy policy
│   ├── terms/             # Terms of service
│   └── cookies/           # Cookie policy
├── components/            # Reusable React components
│   ├── ui/               # Base UI components
│   ├── hero.tsx          # Hero section
│   ├── navbar.tsx        # Navigation
│   ├── features.tsx      # Features section
│   ├── pricing.tsx       # Pricing section
│   └── ...               # Other components
├── public/               # Static assets
│   └── logos/            # Brand logos
├── lib/                  # Utility functions
├── constants/            # Constants and config
└── context/              # React context providers
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### Build

```bash
# Create production build
npm run build

# Start production server
npm start
```

## Key Pages

- **Homepage (/)** - Main landing page with hero, features, case studies
- **Calculator (/calculator)** - ROI calculator for automation savings
- **Resources (/resources)** - Resources and documentation
- **Legal Pages** - Privacy policy, terms of service, cookies

## Features

- ✅ Responsive design (mobile-first)
- ✅ Dark mode support
- ✅ ROI Calculator with real-time calculations
- ✅ Video modal integration (VSL)
- ✅ Cookie consent banner
- ✅ SEO optimized
- ✅ Fast page loads (Next.js optimization)

## Brand

**Brand Name:** LemonBrand
**Tagline:** "Automate your way to freedom"
**Focus:** AI-powered automation for marketing agencies and contractors
**Positioning:** Outcomes over features, transparency over corporate speak

## Development Notes

- Uses Next.js App Router (not Pages Router)
- TypeScript strict mode enabled
- Tailwind with custom config
- Component library based on shadcn/ui patterns
- Dark mode via next-themes

## Deployment

Recommended deployment on Vercel:

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

Or connect the GitHub repository to Vercel for automatic deployments.

## Related Repositories

- **Main Documentation Repo:** [lemonbrandRelaunch](https://github.com/yourusername/lemonbrandRelaunch) - Strategy, content, and business documentation

## License

Proprietary - LemonBrand Agency

## Contact

For questions about the website, contact Simon at LemonBrand.

---

**Built with AI partnership as a demonstration of what's possible.**

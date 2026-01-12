import Link from "next/link";
import Image from "next/image";
import { Youtube, Twitter, Mail, Github } from "lucide-react";
import { TikTokIcon } from "@/components/icons/TikTokIcon";
import { SOCIAL_LINKS } from "@/constants/links";

const pageLinks = [
  { name: "About", href: "/about" },
  { name: "Pricing", href: "/pricing" },
  { name: "Videos", href: "/videos" },
  { name: "FAQ", href: "/faq" },
  { name: "Sprint", href: "/sprint" },
  { name: "8-Week", href: "/8-week" },
  { name: "Club", href: "/club" },
];

const socials = [
  { href: SOCIAL_LINKS.YOUTUBE, icon: Youtube, label: "YouTube" },
  { href: SOCIAL_LINKS.TIKTOK, icon: TikTokIcon, label: "TikTok" },
  { href: SOCIAL_LINKS.TWITTER, icon: Twitter, label: "Twitter" },
  { href: SOCIAL_LINKS.NEWSLETTER, icon: Mail, label: "Newsletter" },
  { href: SOCIAL_LINKS.GITHUB, icon: Github, label: "GitHub" },
];

export function Footer() {
  return (
    <footer className="border-t border-border/50 py-10 sm:py-12 md:py-16 px-3 sm:px-4 bg-background relative overflow-hidden">
      {/* Decorative top border gradient */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent" />

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 sm:gap-10 md:gap-12 mb-10 sm:mb-12 md:mb-16">
          {/* Brand Column */}
          <div className="md:col-span-2 space-y-6">
            <div>
              <Link href="/" className="inline-flex items-center gap-2 mb-3 group">
                <Image
                  src="/assets/logo_lemonbrand_256x256.svg"
                  alt="LemonBrand"
                  width={32}
                  height={32}
                  className="w-8 h-8"
                />
                <span className="font-display text-xl font-semibold tracking-tight group-hover:text-accent transition-colors">
                  LemonBrand
                </span>
              </Link>
              <p className="text-muted-foreground max-w-sm leading-relaxed">
                Building AI businesses in public. Helping operations teams ship production systems in days, not months.
              </p>
            </div>
            
            <div className="flex gap-4">
              {socials.map((social) => {
                const Icon = social.icon;
                return (
                  <Link
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full bg-muted/50 hover:bg-accent/10 hover:text-accent transition-colors duration-200"
                    aria-label={social.label}
                  >
                    <Icon className="w-5 h-5" />
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Links Column */}
          <div>
            <h3 className="font-semibold mb-4 text-foreground">Explore</h3>
            <ul className="space-y-3">
              {pageLinks.slice(0, 4).map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-accent transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Programs Column */}
          <div>
            <h3 className="font-semibold mb-4 text-foreground">Programs</h3>
            <ul className="space-y-3">
              {pageLinks.slice(4).map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-accent transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/free/claudemd"
                  className="text-muted-foreground hover:text-accent transition-colors duration-200"
                >
                  Free Templates
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-border/50 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground text-center md:text-left">
            &copy; {new Date().getFullYear()} Simon Bergeron. All rights reserved.
          </p>

          <div className="flex gap-6 text-xs text-muted-foreground">
            <Link
              href="/privacy"
              className="hover:text-foreground transition-colors duration-200"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="hover:text-foreground transition-colors duration-200"
            >
              Terms of Service
            </Link>
            <Link
              href="/cookies"
              className="hover:text-foreground transition-colors duration-200"
            >
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
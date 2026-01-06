import Link from "next/link";
import { Youtube, Twitter, Mail, Github } from "lucide-react";
import { TikTokIcon } from "@/components/icons/TikTokIcon";
import { SOCIAL_LINKS } from "@/constants/links";

const socials = [
  { href: SOCIAL_LINKS.YOUTUBE, icon: Youtube, label: "YouTube" },
  { href: SOCIAL_LINKS.TIKTOK, icon: TikTokIcon, label: "TikTok" },
  { href: SOCIAL_LINKS.TWITTER, icon: Twitter, label: "Twitter" },
  { href: SOCIAL_LINKS.NEWSLETTER, icon: Mail, label: "Newsletter" },
  { href: SOCIAL_LINKS.GITHUB, icon: Github, label: "GitHub" },
];

export function Footer() {
  return (
    <footer className="border-t border-border/50 py-12 px-4 bg-muted/20">
      <div className="max-w-5xl mx-auto">
        {/* Main content */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mb-8">
          {/* Brand */}
          <div className="text-center sm:text-left">
            <p className="font-display text-lg font-semibold tracking-tight mb-1">
              Simon Bergeron
            </p>
            <p className="text-sm text-muted-foreground">
              Building AI businesses in public
            </p>
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-5">
            {socials.map((social) => {
              const Icon = social.icon;
              return (
                <Link
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-accent transition-colors duration-200"
                  aria-label={social.label}
                >
                  <Icon className="w-5 h-5" />
                </Link>
              );
            })}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-border/50 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Copyright */}
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} Simon Bergeron. All rights reserved.
          </p>

          {/* Legal Links */}
          <div className="flex items-center gap-6 text-xs text-muted-foreground">
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
          </div>
        </div>
      </div>
    </footer>
  );
}

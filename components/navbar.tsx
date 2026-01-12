"use client";

import { IconMenu2, IconX } from "@tabler/icons-react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { ModeToggle } from "./mode-toggle";
import { Button } from "@/components/ui/button";
import { Logo } from "./logo";

const navItems = [
  { name: "Sprint", link: "/sprint" },
  { name: "8-Week", link: "/8-week" },
  { name: "Club", link: "/club" },
  { name: "About", link: "/about" },
];

// Premium nav link with underline-grow animation
const NavLink = ({
  href,
  external,
  children,
  onClick,
  className = "",
}: {
  href: string;
  external?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}) => (
  <Link
    href={href}
    onClick={onClick}
    className={`
      relative text-sm font-medium text-muted-foreground
      transition-colors duration-200
      hover:text-foreground
      group
      ${className}
    `}
    {...(external && {
      target: "_blank",
      rel: "noopener noreferrer",
    })}
  >
    {children}
    <span
      className="
        absolute -bottom-0.5 left-0 h-px w-0
        bg-accent
        transition-all duration-300 ease-out
        group-hover:w-full
      "
    />
  </Link>
);

export const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-xl border-b border-border/50 transition-all duration-300">
      <div className="max-w-5xl mx-auto px-3 sm:px-4 md:px-6">
        <div className="flex items-center justify-between h-14 sm:h-16">
          {/* Logo */}
          <Logo />

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                href={item.link}
              >
                {item.name}
              </NavLink>
            ))}
            <ModeToggle />
            <Button variant="accent" size="sm" asChild>
              <Link href="/free/claudemd">Get Free Template</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 sm:gap-4 md:hidden shrink-0">
            <ModeToggle />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 hover:bg-muted rounded-md transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <IconX className="w-5 h-5" />
              ) : (
                <IconMenu2 className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden border-t border-border/50 bg-background/95 backdrop-blur-xl"
          >
            <div className="px-3 sm:px-4 py-4 sm:py-6 space-y-4 sm:space-y-5">
              {navItems.map((item) => (
                <NavLink
                  key={item.name}
                  href={item.link}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-1"
                >
                  {item.name}
                </NavLink>
              ))}
              <Button variant="accent" size="sm" className="w-full mt-4" asChild>
                <Link href="/free/claudemd" onClick={() => setMobileMenuOpen(false)}>
                  Get Free Template
                </Link>
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

"use client";

import { IconMenu2, IconX, IconChevronDown } from "@tabler/icons-react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { ModeToggle } from "./mode-toggle";
import { Button } from "@/components/ui/button";
import { Logo } from "./logo";

// Dropdown menu structure
const productsDropdown = [
  { name: "Lemonbrand ATS", href: "https://ats.lemonbrand.io", external: true, description: "Ontario-compliant hiring" },
  { name: "Book-A-Desk", href: "https://desk.lemonbrand.io", external: true, description: "Desk booking you own" },
  { name: "Custom Builds", href: "/custom", description: "Tools built to your spec" },
  { name: "VerifiedNode", href: "https://www.verifiednode.com", external: true, description: "Contractor verification" },
];

const learnDropdown = [
  { name: "Compare Programs", href: "/learn", description: "Find your starting point", highlight: true },
  { name: "7-Day Sprint", href: "/sprint", description: "$297 - Build your first tool" },
  { name: "8-Week Program", href: "/8-week", description: "$997+ - Master the skill" },
  { name: "Builders Club", href: "/club", description: "$97/mo - Keep building" },
  { name: "Free Templates", href: "/free/claudemd", description: "CLAUDE.md and more" },
];

// Desktop dropdown component
function DesktopDropdown({
  label,
  items,
}: {
  label: string;
  items: typeof productsDropdown;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setIsOpen(false), 150);
  };

  return (
    <div
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        className="relative text-sm font-medium text-muted-foreground transition-colors duration-200 hover:text-foreground group flex items-center gap-1"
        onClick={() => setIsOpen(!isOpen)}
      >
        {label}
        <IconChevronDown
          className={`w-4 h-4 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
        />
        <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-accent transition-all duration-300 ease-out group-hover:w-full" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full left-0 pt-2 z-50"
          >
            <div className="bg-background/95 backdrop-blur-xl border border-border rounded-lg shadow-lg min-w-[220px] py-2">
              {items.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  {...(item.external && {
                    target: "_blank",
                    rel: "noopener noreferrer",
                  })}
                  onClick={() => setIsOpen(false)}
                  className={`block px-4 py-2.5 hover:bg-muted/50 transition-colors ${
                    "highlight" in item && item.highlight
                      ? "bg-accent/5 border-l-2 border-accent"
                      : ""
                  }`}
                >
                  <p className="text-sm font-medium text-foreground">
                    {item.name}
                    {item.external && (
                      <span className="text-muted-foreground ml-1">↗</span>
                    )}
                  </p>
                  <p className="text-xs text-muted-foreground">{item.description}</p>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Mobile accordion component
function MobileAccordion({
  label,
  items,
  onItemClick,
}: {
  label: string;
  items: typeof productsDropdown;
  onItemClick: () => void;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-border/30 last:border-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-3 flex items-center justify-between text-left"
      >
        <span className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
          {label}
        </span>
        <IconChevronDown
          className={`w-4 h-4 text-muted-foreground transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="pb-3 pl-4 space-y-2">
              {items.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  {...(item.external && {
                    target: "_blank",
                    rel: "noopener noreferrer",
                  })}
                  onClick={onItemClick}
                  className={`block py-2 px-3 rounded-md hover:bg-muted/50 transition-colors ${
                    "highlight" in item && item.highlight
                      ? "bg-accent/5 border-l-2 border-accent"
                      : ""
                  }`}
                >
                  <p className="text-sm font-medium text-foreground">
                    {item.name}
                    {item.external && (
                      <span className="text-muted-foreground ml-1">↗</span>
                    )}
                  </p>
                  <p className="text-xs text-muted-foreground">{item.description}</p>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Simple nav link
const NavLink = ({
  href,
  children,
  onClick,
  className = "",
}: {
  href: string;
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
            <NavLink href="/tools">Free Tools</NavLink>
            <DesktopDropdown label="Products" items={productsDropdown} />
            <DesktopDropdown label="Learn" items={learnDropdown} />
            <NavLink href="/pricing">Pricing</NavLink>
            <ModeToggle />
            <Button variant="accent" size="sm" asChild>
              <Link href="/custom">Get a Quote</Link>
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
            <div className="px-3 sm:px-4 py-4 sm:py-6 space-y-1">
              {/* Free Tools link */}
              <Link
                href="/tools"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-3 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors border-b border-border/30"
              >
                Free Tools
              </Link>

              {/* Products dropdown */}
              <MobileAccordion
                label="Products"
                items={productsDropdown}
                onItemClick={() => setMobileMenuOpen(false)}
              />

              {/* Learn dropdown */}
              <MobileAccordion
                label="Learn"
                items={learnDropdown}
                onItemClick={() => setMobileMenuOpen(false)}
              />

              {/* Pricing link */}
              <Link
                href="/pricing"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-3 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors border-b border-border/30"
              >
                Pricing
              </Link>

              <Button variant="accent" size="sm" className="w-full mt-4" asChild>
                <Link href="/custom" onClick={() => setMobileMenuOpen(false)}>
                  Get a Quote
                </Link>
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

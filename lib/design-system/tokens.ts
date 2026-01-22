/**
 * Design System Tokens
 * 
 * Centralized design tokens for the LemonBrand website.
 * These tokens reference CSS variables defined in globals.css.
 */

// Color tokens (reference CSS variables)
export const colors = {
  // Primary palette
  primary: 'hsl(var(--primary))',
  primaryForeground: 'hsl(var(--primary-foreground))',
  secondary: 'hsl(var(--secondary))',
  secondaryForeground: 'hsl(var(--secondary-foreground))',
  
  // Accent colors
  accent: 'hsl(var(--accent))',
  accentForeground: 'hsl(var(--accent-foreground))',
  success: 'hsl(var(--success))',
  successForeground: 'hsl(var(--success-foreground))',
  
  // Base colors
  background: 'hsl(var(--background))',
  foreground: 'hsl(var(--foreground))',
  card: 'hsl(var(--card))',
  cardForeground: 'hsl(var(--card-foreground))',
  
  // Muted colors
  muted: 'hsl(var(--muted))',
  mutedForeground: 'hsl(var(--muted-foreground))',
  
  // Borders and inputs
  border: 'hsl(var(--border))',
  input: 'hsl(var(--input))',
  ring: 'hsl(var(--ring))',
  
  // Semantic colors
  destructive: 'hsl(var(--destructive))',
  popover: 'hsl(var(--popover))',
  popoverForeground: 'hsl(var(--popover-foreground))',
} as const;

// Spacing tokens
export const spacing = {
  xs: '0.25rem',
  sm: '0.5rem',
  md: '1rem',
  lg: '1.5rem',
  xl: '2rem',
  '2xl': '3rem',
  '3xl': '4rem',
  '4xl': '5rem',
  '5xl': '6rem',
  section: 'clamp(5rem, 10vw, 8rem)',
  sectionSm: 'clamp(3rem, 6vw, 5rem)',
  container: 'clamp(1rem, 4vw, 2rem)',
} as const;

// Typography tokens
export const typography = {
  fontFamily: {
    display: 'var(--font-display)',
    body: 'var(--font-body)',
    mono: 'var(--font-mono)',
  },
  fontSize: {
    display: 'var(--text-display)',
    h1: 'var(--text-h1)',
    h2: 'var(--text-h2)',
    h3: 'var(--text-h3)',
    h4: 'var(--text-h4)',
    bodyLg: 'var(--text-body-lg)',
    body: 'var(--text-body)',
    small: 'var(--text-small)',
    caption: 'var(--text-caption)',
  },
  fontWeight: {
    display: 'var(--font-weight-display)',
    heading: 'var(--font-weight-heading)',
    body: 'var(--font-weight-body)',
    medium: 'var(--font-weight-medium)',
    light: 'var(--font-weight-light)',
  },
  lineHeight: {
    tight: 'var(--leading-tight)',
    snug: 'var(--leading-snug)',
    normal: 'var(--leading-normal)',
    relaxed: 'var(--leading-relaxed)',
  },
  letterSpacing: {
    tight: 'var(--tracking-tight)',
    normal: 'var(--tracking-normal)',
    wide: 'var(--tracking-wide)',
    wider: 'var(--tracking-wider)',
  },
} as const;

// Shadow tokens
export const shadows = {
  xs: 'var(--shadow-xs)',
  sm: 'var(--shadow-sm)',
  md: 'var(--shadow-md)',
  lg: 'var(--shadow-lg)',
  xl: 'var(--shadow-xl)',
  accent: 'var(--shadow-accent)',
} as const;

// Border radius tokens
export const borderRadius = {
  sm: 'calc(var(--radius) - 2px)',
  md: 'var(--radius)',
  lg: 'calc(var(--radius) + 4px)',
  xl: 'calc(var(--radius) + 8px)',
  full: '9999px',
} as const;

// Animation tokens
export const animations = {
  duration: {
    fast: 'var(--duration-fast)',
    normal: 'var(--duration-normal)',
    slow: 'var(--duration-slow)',
    slower: 'var(--duration-slower)',
  },
  ease: {
    out: 'var(--ease-out)',
    inOut: 'var(--ease-in-out)',
    spring: 'var(--ease-spring)',
  },
} as const;

// Layout tokens
export const layout = {
  maxWidth: {
    prose: 'var(--max-w-prose)',
    content: 'var(--max-w-content)',
    wide: 'var(--max-w-wide)',
  },
  containerPadding: 'var(--container-px)',
} as const;


# Design System

## Purpose
Shared visual language for the CB Test Consultancy website. All pages and components derive their colors, typography, and spacing from these tokens.

## Color Tokens (tailwind.config.ts)

| Token | Hex | Usage |
|---|---|---|
| `background` | `#F5F7FD` | Page background |
| `surface` | `#E8EBF6` | Cards, input fields, blockquotes |
| `accent` | `#0077AA` | CTAs, links, active nav, icon color, borders on hover |
| `accent-dim` | `#005580` | Hover state for accent-colored buttons |
| `text-primary` | `#0D1117` | Body copy, headings |
| `text-muted` | `#5C6B88` | Subtitles, meta text, placeholders |

## Typography

| Role | Font | Weight | Usage |
|---|---|---|---|
| `font-display` | Syne | 700 (Bold) | Hero h1, section h2, page h1 |
| `font-display` | Syne | 600 (SemiBold) | Sub-headings |
| `font-sans` | Inter | 400 / 500 | Body copy, nav links, UI text |
| `font-mono` | System monospace | 400 | Section eyebrows (uppercase tracking), code |

Fonts loaded via Fontsource (`@fontsource/syne`, `@fontsource/inter`).

## Heading Sizes

| Level | Class | Typical use |
|---|---|---|
| h1 display | `text-5xl md:text-6xl` | Page titles (About, Blog, Contact, Portfolio) |
| h1 hero | `text-6xl md:text-7xl` | Hero heading only |
| h2 section | `text-4xl md:text-5xl` | Section headings on Home |
| h3 card | `text-xl` | Card titles (ServiceCard, PortfolioCard, BlogPostCard) |

All headings use `text-balance` for even line breaks.

## Section Eyebrows
Small uppercase mono labels above content blocks:
```
font-mono text-accent text-xs tracking-widest uppercase
```
Used in: Hero, Contact page (Direct contact / Location / Business / Response time), About page (Certifications / Skills & tooling / Education).

## Shared Component Patterns

### Surface Card
```
bg-surface border border-surface hover:border-accent transition-colors p-8
```
Used in: ServiceCard, PortfolioCard, ContactForm inputs, availability block on Contact.

### Primary Button
```
bg-accent text-white px-8 py-4 font-semibold text-lg hover:bg-accent-dim transition-colors
```

### Outline Button
```
border border-white text-white px-8 py-4 font-semibold text-lg hover:bg-white hover:text-background transition-colors
```
(Used on dark hero background only.)

### Outline Button (light bg variant)
```
border border-accent text-accent px-4 py-2 hover:bg-accent hover:text-white transition-colors
```

## Motion
Framer Motion used for entrance animations:
- Hero text: `opacity: 0 → 1`, `y: 40 → 0`, duration 0.7s, easeOut
- Hero decoration: `opacity: 0 → 1`, duration 1s, delay 0.4s
- All animations respect `useReducedMotion()` — instantly skip if enabled

## Prose (Blog)
Class `.prose-dark` in `globals.css` styles MDX content:
- Headings: `font-display font-bold text-text-primary`
- Body: `text-text-primary leading-relaxed`
- Links: `text-accent hover:text-accent-dim`
- Code blocks: `bg-surface border border-surface`
- Inline code: `bg-surface text-accent`

## Scrollbar
Custom scrollbar via `::-webkit-scrollbar`:
- Track: `bg-background`
- Thumb: `bg-surface rounded-full`
- Thumb hover: `bg-accent-dim`

# Hero

## Purpose
Full-viewport opening section on the Home page. First impression — communicates who Chiel is and what he does.

## File
`components/Hero.tsx` (client component)

## Layout
Full-viewport height (`min-h-screen`), centered vertically, 2-column grid on md+. Left column: text + CTAs. Right column: removed (previously concentric circles decoration).

## Background
- Image: `public/images/poster.jpg` — dark blue close-up photo of code on a screen
- Rendered via `next/image` with `fill` + `object-cover object-center`, `priority` (LCP image)
- Overlay: `linear-gradient(105deg, rgba(5,15,30,0.82) 0%, rgba(5,15,30,0.60) 55%, rgba(5,15,30,0.35) 100%)`
  - Left side darker (text readable), right side more transparent (image visible)

## Content (left column)

1. **Eyebrow**: `QA Consulting · Playwright · AI Testing` — mono, accent color, xs, tracked
2. **Heading**: `Testing at the speed of modern teams.`
   - "speed" wrapped in `<span className="text-accent">` for teal highlight
   - White text (`text-white`) on dark background
   - Size: `text-6xl md:text-7xl`, `leading-[1.05]`, `text-balance`
3. **Subtext**: `17+ years helping finance, retail, energy, and government teams ship flawless digital products.`
   - `text-white/70` (70% opacity white), `text-xl`
4. **CTAs** (flex row on sm+, column on mobile):
   - Primary: "Let's talk →" → `/contact` — `bg-accent text-white`
   - Secondary: "View work" → `/portfolio` — `border-white text-white hover:bg-white hover:text-background`

## Animation (Framer Motion)
- Left column: `opacity: 0, y: 40` → `opacity: 1, y: 0`, duration 0.7s, easeOut
- Respects `useReducedMotion()` — no movement if user prefers reduced motion

## Notes
- Hero is the only section with a dark background; rest of site is light (`bg-background`)
- `pt-24` accounts for fixed nav height

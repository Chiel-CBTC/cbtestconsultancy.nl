# Portfolio

## Purpose
Showcases Chiel's client work. Static data hardcoded in the page component — no CMS.

## Files
- `app/portfolio/page.tsx` — page + client data
- `components/PortfolioCard.tsx` — card component

## Page Layout (/portfolio)
- Page title: `Clients & work` — `text-5xl md:text-6xl`, `max-w-2xl`
- Subtitle: intro text about sectors (finance, retail, energy, government)
- Grid: `md:grid-cols-2 lg:grid-cols-3 gap-6`
- `pt-32 pb-24` to clear fixed nav

## Client Data (hardcoded in page.tsx)

| Client | Sector | Key achievement |
|---|---|---|
| Rabobank | Finance | Playwright suite for online banking portal; regression from 3 days → 4 hours |
| TenneT | Energy | E2E test strategy for grid management software; coached internal QA |
| Action | Retail | API + UI coverage for e-commerce during peak-season deployments |
| Europarcs | Hospitality | Booking flow tested across web, iOS, Android |
| Gadero | E-commerce | Automated regression for product catalog + checkout |
| Provincie Gelderland | Government | QA across UX/dev/business stakeholders; WCAG accessibility |

Each entry has: `client`, `sector`, `blurb` (2 sentences), `tags: string[]`

## PortfolioCard (components/PortfolioCard.tsx)
Displays: client name (h3, `text-text-primary text-xl`), sector badge, blurb (`text-text-muted`), tags (mono pills).
Uses surface card pattern: `bg-surface border border-surface hover:border-accent`.

## Adding Clients
Add an entry to the `clients` array in `app/portfolio/page.tsx`. No build step required beyond normal Next.js rebuild.

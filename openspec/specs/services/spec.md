# Services

## Purpose
Communicates Chiel's three core service pillars on the Home page. Sits below the Hero and drives visitors toward understanding what he offers.

## Files
- `app/page.tsx` — service data + section markup
- `components/ServiceCard.tsx` — card component

## Sections on Home page (top to bottom)

### 1. Service Pillars (`bg-background py-32`)
Section heading: `Quality baked in, not bolted on.` — `text-4xl md:text-5xl`, `text-text-primary`, `text-balance`, `mb-16 max-w-2xl`

3-column grid (`md:grid-cols-3 gap-6`) of ServiceCards:

| # | Title | SVG Icon | Description |
|---|---|---|---|
| 1 | Agile / Scrum / DevOps QA | Circular arrow + checkmark (28×28 viewBox, rendered at 56×56) | Embedded quality in every sprint. Align testing with delivery cadence — backlog refinement to release gates. |
| 2 | Playwright Test Automation | Code brackets + slash (28×28 viewBox, rendered at 56×56) | Modern, maintainable TypeScript test suites. Fast feedback in CI/CD via GitHub Actions and Azure DevOps. |
| 3 | AI-Powered Testing | Neural network nodes (28×28 viewBox, rendered at 56×56) | AI-assisted generation, failure triage, OpenAI / Claude integrations in testing pipeline. |

### 2. Client Logo Strip (ClientLogoStrip.tsx)
`border-y border-surface py-16 bg-background`
Clients (text-only, `opacity-40 hover:opacity-80`): Rabobank, TenneT, Action, Europarcs, Gadero, Provincie Gelderland

### 3. CTA Section (`bg-background py-32`)
Centered text block:
- Heading: `Interested in working together?`
- Subtext: `Let's talk about your product, your team, and how I can help you ship with confidence.`
- Button: `Get in touch →` → `/contact` — `bg-accent text-white px-10 py-5`

## ServiceCard Component (components/ServiceCard.tsx)
```
Props: { icon: ReactNode, title: string, description: string }

Layout: bg-surface border border-surface hover:border-accent transition-colors p-8 flex flex-col gap-4 group

- Icon: div.text-accent (inherits accent color)
- Title: font-display font-bold text-text-primary text-xl group-hover:text-accent transition-colors
- Description: text-text-muted leading-relaxed
```

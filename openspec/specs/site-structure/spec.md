# Site Structure

## Purpose
Overall architecture, routing, navigation, footer, SEO metadata, and deployment configuration.

## Tech Stack

| Concern | Choice |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v3 |
| Static export | `output: 'export'` in `next.config.ts` |
| Fonts | Fontsource (Syne + Inter) |
| Animations | Framer Motion |
| Contact form | Formspree (env: `NEXT_PUBLIC_FORMSPREE_ENDPOINT`) |
| Deployment | Upload `out/` to shared hosting |

## Routing

```
/             → app/page.tsx          (Home)
/about        → app/about/page.tsx    (About Chiel)
/portfolio    → app/portfolio/page.tsx (Clients & work)
/blog         → app/blog/page.tsx     (Blog listing)
/blog/[slug]  → app/blog/[slug]/page.tsx (Post detail)
/contact      → app/contact/page.tsx  (Contact)
```

All routes are statically pre-rendered at build time (`output: 'export'`).

## Root Layout (app/layout.tsx)

Wraps every page with:
- `<Nav />` — fixed top navigation
- `<main className="flex-1">` — page content
- `<Footer />` — site footer

Global metadata defaults:
- Title template: `%s | CB Test Consultancy`
- Default title: `CB Test Consultancy — QA & Test Automation`
- Description: `17+ years of QA experience. Playwright test automation, AI-powered testing, and Agile QA consulting. Based in Arnhem, Netherlands.`
- OG: `website`, `en_US`, site name set
- Body: `bg-background text-text-primary min-h-screen flex flex-col`

## Navigation (Nav.tsx)

- Fixed at top, `z-50`, white background, `border-b border-gray-100`
- Height: `h-24` (96px)
- Logo: `cbtc-logo.png`, height `h-16`
- Links: Home, Portfolio, About, Blog, Contact
- Active link: `text-accent`; inactive: `text-gray-500 hover:text-gray-900`
- Mobile: nav links hidden (`hidden md:flex`), replaced by Contact CTA button (`md:hidden`)

## Footer (Footer.tsx)

Three columns (flex row on md+, column on mobile):
1. Company info: CB Test Consultancy, Chiel Bleumink · KvK 09217715, Arnhem, Netherlands
2. Nav links: Home, Portfolio, About, Blog, Contact, Disclaimer (all `hover:text-accent`)
3. Copyright: © {year}

Styling: `border-t border-surface bg-background`, padding `py-12`

## SEO
- Each page exports its own `Metadata` object with `title` and `description`
- `app/layout.tsx` sets global OG and Twitter card defaults
- Pages override title (shown as `{title} | CB Test Consultancy`)

## Deployment

```bash
npm run build    # generates out/ via static export
./deploy.sh      # helper script to upload out/ to host
```

Build output: `out/` directory with full static HTML/CSS/JS + images.

After `npm run build`, the dev server cache (`.next/`) is corrupted. Fix: `rm -rf .next` before restarting `npm run dev`.

## Environment Variables

| Variable | Required | Purpose |
|---|---|---|
| `NEXT_PUBLIC_FORMSPREE_ENDPOINT` | Yes (production) | Contact form POST target |

See `.env.local.example` for setup instructions.

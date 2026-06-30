# CB Test Consultancy — Website Rebuild Design Spec

**Date**: 2026-06-30  
**Owner**: Chiel Bleumink  
**Scope**: Full rebuild of cbtestconsultancy.nl — replacing existing WordPress site with a custom Next.js static site.

---

## 1. Goals

- Replace WordPress with a hand-coded, maintainable site.
- Dramatically improve visual quality: bold, modern agency aesthetic that reads "senior consultant" not "freelancer".
- Improve portfolio depth: logos + case study blurbs instead of logos only.
- Add SEO-friendly blog powered by MDX files in the repo.
- Deploy to existing shared hosting via static export.

---

## 2. Tech Stack

| Concern | Choice |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v3 |
| Blog | MDX via `@next/mdx` (App Router native) |
| Syntax highlight | Shiki |
| Contact form | Formspree free tier (50 submissions/month) |
| Deployment | `output: 'export'` → upload `out/` to existing host |
| Fonts | Syne (headings) + Inter (body) via Fontsource |
| Animations | Framer Motion (minimal — page transitions + card reveals only) |

---

## 3. Visual Identity

### Color palette

| Token | Value | Usage |
|---|---|---|
| `background` | `#0A0A0F` | Page background |
| `surface` | `#13131A` | Cards, nav |
| `accent` | `#00D4FF` | CTAs, highlights, borders |
| `accent-dim` | `#007A99` | Hover states |
| `text-primary` | `#F0F0F5` | Body copy |
| `text-muted` | `#8888A0` | Subtitles, captions |
| `white` | `#FFFFFF` | High-emphasis headings |

### Typography

- **Display/hero headings**: Syne Bold (700), large — 64–96px on desktop
- **Section headings**: Syne SemiBold (600), 32–48px
- **Body**: Inter Regular (400) / Medium (500), 16–18px
- **Code / monospace accents**: `font-mono` (Geist Mono or system)

### Design principles

- Dark background throughout (near-black `#0A0A0F`)
- Large, confident type — whitespace is intentional, not empty
- Cyan `#00D4FF` used sparingly as the single accent: borders, underlines, buttons, highlighted words
- Subtle geometric grid or noise texture on hero background
- Cards use `#13131A` surface with `1px` cyan border on hover
- Smooth page transitions (Next.js App Router + Framer Motion minimal)

---

## 4. Site Structure

### Navigation (5 items — same as current)

```
Home  |  Portfolio  |  About  |  Blog  |  Contact
```

### Pages

#### 4.1 Home (`/`)

**Hero** (full viewport)
- Large display heading: e.g. *"Testing at the speed of modern teams."*
- Subline: `17+ years · Playwright · AI-powered QA`
- Two CTAs: primary `Let's talk →` (→ /contact), secondary `View work` (→ /portfolio)
- Right column: abstract tech visual or high-quality photo
- Subtle animated grid background

**Service pillars** (3 cards below the fold)
- Agile / Scrum / DevOps QA
- Playwright Test Automation
- AI-Powered Testing

Each card: icon, bold title, 2-sentence description.

**Trusted by** (logo strip)
- 6 client logos: Action, Europarcs, Gadero, TenneT, Rabobank, Provincie Gelderland
- Muted / greyscale logos that brighten on hover

**CTA banner**
- "Interested in working together?" → Contact button

#### 4.2 Portfolio (`/portfolio`)

**Header**: short intro paragraph (current copy is fine as a base).

**Client card grid** (2 or 3 columns)

Each card contains:
- Client logo
- Sector badge (Finance / Retail / Energy / Government / Infrastructure)
- 2–3 sentence blurb: what was done, what improved
- Optional: tech tags (e.g. `Playwright` `Azure DevOps`)

Clients and sectors:
| Client | Sector |
|---|---|
| Rabobank | Finance |
| TenneT | Energy |
| Provincie Gelderland | Government |
| Action | Retail |
| Europarcs | Hospitality |
| Gadero | E-commerce |

_Copy for each blurb to be written by Chiel — spec sets the structure._

#### 4.3 About (`/about`)

**Split layout** (desktop: 50/50; mobile: stacked)

Left: professional photo. If no photo is available at build time, use an abstract geometric avatar placeholder with cyan accent — not a broken image.

Right:
- Punchy bio (2–3 paragraphs)
- **Skills grid**: tech badges — Playwright, TypeScript, GitHub Actions, Azure DevOps, Postman, GraphQL, iOS/Android
- **Cert badges**: ISTQB Foundation, PSM1
- Education: HTS Technical Computer Science

#### 4.4 Blog (`/blog`)

**Post list**: reverse-chronological, each entry shows:
- Title
- Date
- Reading time estimate
- 1-sentence excerpt

**Post page** (`/blog/[slug]`):
- MDX rendered content
- Syntax highlighting via Shiki (dark theme)
- Back link to post list
- No comments (keep it simple)

**Content source**: `.mdx` files in `/content/blog/` — frontmatter with `title`, `date`, `excerpt`, `tags`.

#### 4.5 Contact (`/contact`)

**Contact details** (always visible, no form required to reach out):
- Email: chiel.bleumink@cbtestconsultancy.nl
- Phone: +31 (0)6 46 27 05 84
- Location: Arnhem, Netherlands
- KvK: 09217715

**Contact form**:
- Fields: Name, Email, Message
- Submits to Formspree endpoint (POST)
- Client-side validation
- Success / error state feedback

---

## 5. File Structure

```
/
├── app/
│   ├── layout.tsx              # Root layout: Nav + Footer
│   ├── page.tsx                # Home
│   ├── portfolio/
│   │   └── page.tsx
│   ├── about/
│   │   └── page.tsx
│   ├── blog/
│   │   ├── page.tsx            # Post list
│   │   └── [slug]/
│   │       └── page.tsx        # Individual post
│   └── contact/
│       └── page.tsx
├── components/
│   ├── Nav.tsx
│   ├── Footer.tsx
│   ├── Hero.tsx
│   ├── ServiceCard.tsx
│   ├── PortfolioCard.tsx
│   ├── BlogPostCard.tsx
│   └── ContactForm.tsx
├── content/
│   └── blog/
│       └── *.mdx               # Blog posts
├── public/
│   ├── images/
│   │   └── clients/            # Client logos
│   └── ...
├── lib/
│   └── blog.ts                 # MDX utilities (read files, parse frontmatter)
├── next.config.ts              # output: 'export'
└── tailwind.config.ts
```

---

## 6. Deployment

1. `npm run build` → generates `out/` directory
2. Upload `out/` contents to existing shared host via FTP/rsync/SFTP
3. No Node.js process required on server
4. Contact form works via Formspree (client-side POST) — no server-side code needed

**Domain**: cbtestconsultancy.nl stays on existing host, DNS unchanged.

---

## 7. Out of Scope

- CMS or admin UI (posts are MDX files, edited in code)
- Authentication
- E-commerce
- Analytics (can add later — simple script tag if needed)
- Multilingual (Dutch/English) — English only for now
- Dark/light toggle — dark mode only

---

## 8. Open items (need Chiel's input before build)

- Hero heading copy — final tagline decision
- Portfolio blurbs — 2–3 sentences per client
- About page bio — polished text
- Professional photo for About page
- Formspree account / endpoint URL
- Client logo files (SVG preferred)
- Any existing blog posts to migrate from WordPress

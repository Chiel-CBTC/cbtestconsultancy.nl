# CB Test Consultancy — Website Rebuild Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build and deploy a bold, dark-themed Next.js static site replacing the existing WordPress cbtestconsultancy.nl, with pages for Home, Portfolio, About, Blog (MDX), and Contact (Formspree).

**Architecture:** Next.js 14 App Router with `output: 'export'` generates a static `out/` directory uploaded to the existing shared host. Blog posts live as MDX files in `content/blog/` and are read at build time via `lib/blog.ts`. The contact form POSTs to Formspree — no server required.

**Tech Stack:** Next.js 14, TypeScript, Tailwind CSS v3, Framer Motion, `next-mdx-remote/rsc` (used instead of `@next/mdx` — better suited for `content/` directory with dynamic slugs), `gray-matter`, `rehype-pretty-code` (Shiki), `@fontsource/syne`, `@fontsource/inter`, Formspree, Vitest + React Testing Library, Playwright.

## Global Constraints

- Node.js ≥ 18
- Next.js 14 (App Router only — no `pages/` directory)
- `output: 'export'` always on — no API routes, no server-side runtime
- TypeScript strict mode — no `any`, no untyped props
- Dark background `#0A0A0F` throughout — no light mode
- Accent color: `#00D4FF` (cyan) only — no other accent colors
- Fonts: `Syne` (display/headings), `Inter` (body) — loaded via Fontsource, never Google Fonts CDN
- All images: `next/image` with `unoptimized: true` (required for static export)
- Contact form: Formspree endpoint in `NEXT_PUBLIC_FORMSPREE_ENDPOINT` env var
- No comments in code unless the WHY is non-obvious

---

## File Map

```
/
├── app/
│   ├── layout.tsx                  # Root layout: fonts, Nav, Footer, metadata
│   ├── globals.css                 # Tailwind base, custom scrollbar, prose styles
│   ├── page.tsx                    # Home: Hero + ServiceCards + LogoStrip + CTA
│   ├── portfolio/
│   │   └── page.tsx                # Portfolio: header + PortfolioCard grid
│   ├── about/
│   │   └── page.tsx                # About: split layout, bio, skills, certs
│   ├── blog/
│   │   ├── page.tsx                # Blog list: BlogPostCard list
│   │   └── [slug]/
│   │       └── page.tsx            # Blog post: MDX render via next-mdx-remote
│   └── contact/
│       └── page.tsx                # Contact: details + ContactForm
├── components/
│   ├── Nav.tsx                     # Top navigation bar
│   ├── Footer.tsx                  # Footer with copyright + KvK
│   ├── Hero.tsx                    # Full-viewport hero section
│   ├── ServiceCard.tsx             # Single service pillar card
│   ├── ClientLogoStrip.tsx         # Trusted-by logo row
│   ├── PortfolioCard.tsx           # Client card: logo + sector + blurb + tags
│   ├── BlogPostCard.tsx            # Post list item: title + date + excerpt
│   └── ContactForm.tsx             # Formspree-backed contact form ('use client')
├── content/
│   └── blog/
│       └── hello-world.mdx         # Placeholder post (real posts added by Chiel)
├── lib/
│   └── blog.ts                     # getAllPosts(), getPostBySlug() — server-only
├── public/
│   └── images/
│       └── clients/                # Client logos: action.svg, rabobank.svg, etc.
├── __tests__/
│   ├── lib/blog.test.ts            # Unit tests for blog.ts
│   ├── components/BlogPostCard.test.tsx
│   └── components/ContactForm.test.tsx
├── e2e/
│   └── smoke.spec.ts               # Playwright: nav + form + blog
├── next.config.ts
├── tailwind.config.ts
├── vitest.config.ts
├── vitest.setup.ts
├── playwright.config.ts
└── .env.local.example
```

---

## Task 1: Project Scaffold + Dependencies

**Files:**
- Create: `next.config.ts`
- Create: `.env.local.example`
- Create: `vitest.config.ts`
- Create: `vitest.setup.ts`
- Create: `playwright.config.ts`
- Modify: `package.json` (scripts)

**Interfaces:**
- Produces: working `npm run dev`, `npm run build`, `npm test`, `npm run e2e`

- [ ] **Step 1: Bootstrap Next.js project**

Run from `/home/chiel/AgenticAI/cbtestconsultancy/`:

```bash
npx create-next-app@14 . --typescript --tailwind --eslint --app --no-src-dir --import-alias "@/*"
```

When prompted, confirm overwrite of existing directory contents (only the docs/ folder exists — it's safe).

- [ ] **Step 2: Install production dependencies**

```bash
npm install framer-motion next-mdx-remote gray-matter rehype-pretty-code shiki \
  @fontsource/syne @fontsource/inter
```

- [ ] **Step 3: Install dev dependencies**

```bash
npm install -D vitest @vitejs/plugin-react @testing-library/react \
  @testing-library/jest-dom @testing-library/user-event jsdom \
  @playwright/test @types/node
```

- [ ] **Step 4: Install Playwright browsers**

```bash
npx playwright install chromium
```

- [ ] **Step 5: Write `next.config.ts`**

```typescript
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
}

export default nextConfig
```

- [ ] **Step 6: Write `vitest.config.ts`**

```typescript
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
    globals: true,
    exclude: ['e2e/**', 'node_modules/**'],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '.'),
    },
  },
})
```

- [ ] **Step 7: Write `vitest.setup.ts`**

```typescript
import '@testing-library/jest-dom'
```

- [ ] **Step 8: Write `playwright.config.ts`**

```typescript
import { defineConfig } from '@playwright/test'

export default defineConfig({
  testDir: './e2e',
  use: {
    baseURL: 'http://localhost:3000',
  },
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
  },
})
```

- [ ] **Step 9: Write `.env.local.example`**

```bash
# Formspree endpoint — create a free form at https://formspree.io
# Replace with your actual endpoint after creating a Formspree account
NEXT_PUBLIC_FORMSPREE_ENDPOINT=https://formspree.io/f/YOUR_FORM_ID
```

Copy to `.env.local` and fill in real value before running contact form.

- [ ] **Step 10: Update `package.json` scripts**

Replace the `scripts` block with:

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "test": "vitest run",
    "test:watch": "vitest",
    "e2e": "playwright test",
    "e2e:ui": "playwright test --ui"
  }
}
```

- [ ] **Step 11: Verify scaffold builds**

```bash
npm run build
```

Expected: successful build, `out/` directory created.

- [ ] **Step 12: Commit**

```bash
git add -A
git commit -m "feat: scaffold Next.js 14 project with all dependencies"
```

---

## Task 2: Design System — Tailwind Config + Global CSS

**Files:**
- Modify: `tailwind.config.ts`
- Modify: `app/globals.css`

**Interfaces:**
- Produces: Tailwind utility classes `bg-background`, `bg-surface`, `text-accent`, `text-text-primary`, `text-text-muted`, `font-display`, `font-sans`

- [ ] **Step 1: Write `tailwind.config.ts`**

```typescript
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#0A0A0F',
        surface: '#13131A',
        accent: '#00D4FF',
        'accent-dim': '#007A99',
        'text-primary': '#F0F0F5',
        'text-muted': '#8888A0',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Syne', 'system-ui', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'monospace'],
      },
    },
  },
  plugins: [],
}

export default config
```

- [ ] **Step 2: Write `app/globals.css`**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Fontsource imports */
@import '@fontsource/syne/600.css';
@import '@fontsource/syne/700.css';
@import '@fontsource/inter/400.css';
@import '@fontsource/inter/500.css';

@layer base {
  html {
    @apply bg-background text-text-primary;
    scroll-behavior: smooth;
  }

  body {
    @apply font-sans antialiased;
  }

  /* Custom scrollbar */
  ::-webkit-scrollbar {
    width: 6px;
  }
  ::-webkit-scrollbar-track {
    @apply bg-background;
  }
  ::-webkit-scrollbar-thumb {
    @apply bg-surface rounded-full;
  }
  ::-webkit-scrollbar-thumb:hover {
    @apply bg-accent-dim;
  }
}

/* MDX prose styles used in blog posts */
@layer components {
  .prose-dark h1,
  .prose-dark h2,
  .prose-dark h3,
  .prose-dark h4 {
    @apply font-display font-bold text-white;
  }

  .prose-dark h1 { @apply text-4xl mt-12 mb-6; }
  .prose-dark h2 { @apply text-3xl mt-10 mb-4; }
  .prose-dark h3 { @apply text-2xl mt-8 mb-3; }

  .prose-dark p {
    @apply text-text-primary leading-relaxed mb-6;
  }

  .prose-dark a {
    @apply text-accent underline hover:text-accent-dim transition-colors;
  }

  .prose-dark ul,
  .prose-dark ol {
    @apply text-text-primary mb-6 pl-6;
  }

  .prose-dark li {
    @apply mb-2;
  }

  .prose-dark ul li {
    @apply list-disc;
  }

  .prose-dark ol li {
    @apply list-decimal;
  }

  .prose-dark blockquote {
    @apply border-l-4 border-accent pl-6 italic text-text-muted my-8;
  }

  /* rehype-pretty-code output */
  .prose-dark pre {
    @apply rounded-none border border-surface my-8 overflow-x-auto;
  }

  .prose-dark pre code {
    @apply text-sm leading-relaxed;
  }

  .prose-dark :not(pre) > code {
    @apply bg-surface text-accent px-1.5 py-0.5 rounded text-sm font-mono;
  }
}
```

- [ ] **Step 3: Verify Tailwind resolves custom tokens**

Start dev server:

```bash
npm run dev
```

Open `http://localhost:3000`, open DevTools. Temporarily add `className="bg-background text-accent"` to a test element in `app/page.tsx` (the default Next.js page), confirm `#0A0A0F` background and `#00D4FF` text appear. Remove the test.

- [ ] **Step 4: Commit**

```bash
git add tailwind.config.ts app/globals.css
git commit -m "feat: add design system tokens and global CSS"
```

---

## Task 3: Layout — Nav, Footer, Root Layout

**Files:**
- Create: `components/Nav.tsx`
- Create: `components/Footer.tsx`
- Modify: `app/layout.tsx`

**Interfaces:**
- Produces:
  - `Nav` — default export, no props
  - `Footer` — default export, no props
  - Root layout wraps all pages with Nav + Footer + metadata

- [ ] **Step 1: Write failing test for Nav**

Create `__tests__/components/Nav.test.tsx`:

```typescript
import { render, screen } from '@testing-library/react'
import Nav from '@/components/Nav'

vi.mock('next/navigation', () => ({
  usePathname: () => '/',
}))

describe('Nav', () => {
  it('renders all five nav links', () => {
    render(<Nav />)
    expect(screen.getByRole('link', { name: /home/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /portfolio/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /about/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /blog/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /contact/i })).toBeInTheDocument()
  })

  it('renders the logo / brand name', () => {
    render(<Nav />)
    expect(screen.getByText(/cb test consultancy/i)).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npm test -- --reporter=verbose Nav
```

Expected: FAIL — `Cannot find module '@/components/Nav'`

- [ ] **Step 3: Write `components/Nav.tsx`**

```typescript
'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const links = [
  { href: '/', label: 'Home' },
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/about', label: 'About' },
  { href: '/blog', label: 'Blog' },
  { href: '/contact', label: 'Contact' },
]

export default function Nav() {
  const pathname = usePathname()

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-surface bg-background/80 backdrop-blur-sm">
      <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link
          href="/"
          className="font-display font-bold text-white text-lg tracking-tight hover:text-accent transition-colors"
        >
          CB Test Consultancy
        </Link>

        <ul className="hidden md:flex items-center gap-8">
          {links.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className={`text-sm font-medium transition-colors ${
                  pathname === href
                    ? 'text-accent'
                    : 'text-text-muted hover:text-text-primary'
                }`}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile: simple contact CTA */}
        <Link
          href="/contact"
          className="md:hidden text-sm font-semibold text-accent border border-accent px-4 py-2 hover:bg-accent hover:text-background transition-colors"
        >
          Contact
        </Link>
      </nav>
    </header>
  )
}
```

- [ ] **Step 4: Run test to verify it passes**

```bash
npm test -- --reporter=verbose Nav
```

Expected: PASS (2 tests)

- [ ] **Step 5: Write failing test for Footer**

Create `__tests__/components/Footer.test.tsx`:

```typescript
import { render, screen } from '@testing-library/react'
import Footer from '@/components/Footer'

describe('Footer', () => {
  it('shows copyright and KvK number', () => {
    render(<Footer />)
    expect(screen.getByText(/cb test consultancy/i)).toBeInTheDocument()
    expect(screen.getByText(/09217715/)).toBeInTheDocument()
  })
})
```

- [ ] **Step 6: Run test to verify it fails**

```bash
npm test -- --reporter=verbose Footer
```

Expected: FAIL — `Cannot find module '@/components/Footer'`

- [ ] **Step 7: Write `components/Footer.tsx`**

```typescript
import Link from 'next/link'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-surface bg-background">
      <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        <div>
          <p className="font-display font-bold text-white mb-1">CB Test Consultancy</p>
          <p className="text-text-muted text-sm">Chiel Bleumink · KvK 09217715</p>
          <p className="text-text-muted text-sm">Arnhem, Netherlands</p>
        </div>

        <nav className="flex flex-wrap gap-6 text-sm text-text-muted">
          {[
            { href: '/', label: 'Home' },
            { href: '/portfolio', label: 'Portfolio' },
            { href: '/about', label: 'About' },
            { href: '/blog', label: 'Blog' },
            { href: '/contact', label: 'Contact' },
          ].map(({ href, label }) => (
            <Link key={href} href={href} className="hover:text-accent transition-colors">
              {label}
            </Link>
          ))}
        </nav>

        <p className="text-text-muted text-sm">© {year} CB Test Consultancy</p>
      </div>
    </footer>
  )
}
```

- [ ] **Step 8: Run Footer test to verify it passes**

```bash
npm test -- --reporter=verbose Footer
```

Expected: PASS

- [ ] **Step 9: Write `app/layout.tsx`**

```typescript
import type { Metadata } from 'next'
import './globals.css'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: {
    default: 'CB Test Consultancy — QA & Test Automation',
    template: '%s | CB Test Consultancy',
  },
  description:
    '17+ years of QA experience. Playwright test automation, AI-powered testing, and Agile QA consulting. Based in Arnhem, Netherlands.',
  keywords: ['QA consultant', 'test automation', 'Playwright', 'AI testing', 'Agile QA', 'Netherlands'],
  openGraph: {
    siteName: 'CB Test Consultancy',
    locale: 'en_US',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-background text-text-primary min-h-screen flex flex-col">
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
```

- [ ] **Step 10: Run all tests**

```bash
npm test
```

Expected: PASS (3 tests across 2 files)

- [ ] **Step 11: Commit**

```bash
git add components/Nav.tsx components/Footer.tsx app/layout.tsx \
  __tests__/components/Nav.test.tsx __tests__/components/Footer.test.tsx
git commit -m "feat: add Nav, Footer, and root layout"
```

---

## Task 4: Home Page

**Files:**
- Create: `components/Hero.tsx`
- Create: `components/ServiceCard.tsx`
- Create: `components/ClientLogoStrip.tsx`
- Modify: `app/page.tsx`

**Interfaces:**
- Consumes: Tailwind tokens from Task 2; Nav/Footer from Task 3
- Produces:
  - `ServiceCard({ icon, title, description }: ServiceCardProps)` — default export
  - `ClientLogoStrip` — default export, no props
  - `Hero` — default export, no props

- [ ] **Step 1: Write `components/Hero.tsx`**

```typescript
'use client'
import Link from 'next/link'
import { motion } from 'framer-motion'

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center bg-background overflow-hidden pt-16">
      {/* Subtle grid texture */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(0,212,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,1) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <p className="font-mono text-accent text-xs tracking-[0.25em] uppercase mb-8">
            QA Consulting · Playwright · AI Testing
          </p>
          <h1 className="font-display font-bold text-white text-6xl md:text-7xl leading-[1.05] mb-8">
            Testing at the{' '}
            <span className="text-accent">speed</span>{' '}
            of modern teams.
          </h1>
          <p className="text-text-muted text-xl leading-relaxed mb-10 max-w-lg">
            17+ years helping finance, retail, energy, and government teams ship
            flawless digital products.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/contact"
              className="inline-block bg-accent text-background px-8 py-4 font-semibold text-lg hover:bg-accent-dim transition-colors text-center"
            >
              Let&apos;s talk →
            </Link>
            <Link
              href="/portfolio"
              className="inline-block border border-accent text-accent px-8 py-4 font-semibold text-lg hover:bg-accent hover:text-background transition-colors text-center"
            >
              View work
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="hidden md:flex items-center justify-center"
          aria-hidden
        >
          <div className="relative w-72 h-72">
            {[0, 32, 64, 96].map((inset, i) => (
              <div
                key={inset}
                className="absolute rounded-full border border-accent"
                style={{
                  inset,
                  opacity: 0.1 + i * 0.1,
                }}
              />
            ))}
            <div className="absolute inset-[120px] rounded-full bg-accent opacity-10" />
            <div className="absolute top-1/2 left-0 right-0 h-px bg-accent opacity-10" />
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-accent opacity-10" />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Write `components/ServiceCard.tsx`**

```typescript
import type { ReactNode } from 'react'

interface ServiceCardProps {
  icon: ReactNode
  title: string
  description: string
}

export default function ServiceCard({ icon, title, description }: ServiceCardProps) {
  return (
    <div className="bg-surface border border-surface hover:border-accent transition-colors p-8 flex flex-col gap-4 group">
      <div className="text-accent text-3xl">{icon}</div>
      <h3 className="font-display font-bold text-white text-xl group-hover:text-accent transition-colors">
        {title}
      </h3>
      <p className="text-text-muted leading-relaxed">{description}</p>
    </div>
  )
}
```

- [ ] **Step 3: Write `components/ClientLogoStrip.tsx`**

Client logos are SVG files in `public/images/clients/`. Until real SVGs are added, render text badges as placeholders — the structure is already correct and will upgrade transparently.

```typescript
const clients = [
  { name: 'Rabobank', slug: 'rabobank' },
  { name: 'TenneT', slug: 'tennet' },
  { name: 'Action', slug: 'action' },
  { name: 'Europarcs', slug: 'europarcs' },
  { name: 'Gadero', slug: 'gadero' },
  { name: 'Provincie Gelderland', slug: 'gelderland' },
]

export default function ClientLogoStrip() {
  return (
    <section className="border-y border-surface py-16 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <p className="text-text-muted text-sm font-mono tracking-widest uppercase text-center mb-10">
          Trusted by
        </p>
        <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-8">
          {clients.map(({ name }) => (
            <span
              key={name}
              className="text-text-muted font-display font-semibold text-lg opacity-40 hover:opacity-80 transition-opacity cursor-default"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 4: Write `app/page.tsx`**

```typescript
import Hero from '@/components/Hero'
import ServiceCard from '@/components/ServiceCard'
import ClientLogoStrip from '@/components/ClientLogoStrip'
import Link from 'next/link'

const services = [
  {
    icon: '⚡',
    title: 'Agile / Scrum / DevOps QA',
    description:
      'Embedded quality in every sprint. I align testing with your delivery cadence — from backlog refinement to release gates.',
  },
  {
    icon: '🎭',
    title: 'Playwright Test Automation',
    description:
      'Modern, maintainable test suites in TypeScript with Playwright. Fast feedback in CI/CD via GitHub Actions and Azure DevOps.',
  },
  {
    icon: '🤖',
    title: 'AI-Powered Testing',
    description:
      'Smarter test coverage through AI-assisted generation, intelligent failure triage, and OpenAI / Claude integrations in your pipeline.',
  },
]

export default function HomePage() {
  return (
    <>
      <Hero />

      {/* Service pillars */}
      <section className="bg-background py-32">
        <div className="max-w-7xl mx-auto px-6">
          <p className="font-mono text-accent text-xs tracking-[0.25em] uppercase mb-4">
            What I do
          </p>
          <h2 className="font-display font-bold text-white text-4xl md:text-5xl mb-16 max-w-2xl">
            Quality baked in, not bolted on.
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {services.map((s) => (
              <ServiceCard key={s.title} {...s} />
            ))}
          </div>
        </div>
      </section>

      <ClientLogoStrip />

      {/* CTA */}
      <section className="bg-background py-32">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="font-display font-bold text-white text-4xl md:text-5xl mb-6">
            Interested in working together?
          </h2>
          <p className="text-text-muted text-xl mb-10">
            Let&apos;s talk about your product, your team, and how I can help you ship with confidence.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-accent text-background px-10 py-5 font-semibold text-lg hover:bg-accent-dim transition-colors"
          >
            Get in touch →
          </Link>
        </div>
      </section>
    </>
  )
}
```

- [ ] **Step 5: Verify home page renders**

```bash
npm run dev
```

Open `http://localhost:3000`. Verify:
- Hero section fills viewport, grid texture visible
- "Testing at the speed of modern teams." heading displays in Syne font
- 3 service cards render below the fold
- Logo strip shows all 6 client names
- CTA section at bottom

- [ ] **Step 6: Commit**

```bash
git add components/Hero.tsx components/ServiceCard.tsx components/ClientLogoStrip.tsx app/page.tsx
git commit -m "feat: add home page with hero, service cards, and logo strip"
```

---

## Task 5: Portfolio Page

**Files:**
- Create: `components/PortfolioCard.tsx`
- Create: `app/portfolio/page.tsx`

**Interfaces:**
- Produces:
  ```typescript
  interface PortfolioCardProps {
    client: string
    sector: string
    blurb: string
    tags: string[]
  }
  // default export PortfolioCard(props: PortfolioCardProps): JSX.Element
  ```

- [ ] **Step 1: Write `components/PortfolioCard.tsx`**

```typescript
interface PortfolioCardProps {
  client: string
  sector: string
  blurb: string
  tags: string[]
}

export default function PortfolioCard({ client, sector, blurb, tags }: PortfolioCardProps) {
  return (
    <div className="bg-surface border border-surface hover:border-accent transition-colors p-8 flex flex-col gap-6">
      <div className="flex items-start justify-between gap-4">
        <h3 className="font-display font-bold text-white text-xl">{client}</h3>
        <span className="text-xs font-mono tracking-widest uppercase text-accent border border-accent px-2 py-1 whitespace-nowrap">
          {sector}
        </span>
      </div>
      <p className="text-text-muted leading-relaxed flex-1">{blurb}</p>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className="text-xs font-mono text-text-muted bg-background border border-surface px-2 py-1"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Write `app/portfolio/page.tsx`**

```typescript
import type { Metadata } from 'next'
import PortfolioCard from '@/components/PortfolioCard'

export const metadata: Metadata = {
  title: 'Portfolio',
  description: 'QA consulting work for Rabobank, TenneT, Action, and more.',
}

const clients = [
  {
    client: 'Rabobank',
    sector: 'Finance',
    blurb:
      'Built and maintained a Playwright test suite for the online banking portal, reducing regression cycles from 3 days to 4 hours. Introduced shift-left testing practices across three scrum teams.',
    tags: ['Playwright', 'TypeScript', 'Azure DevOps', 'ISTQB'],
  },
  {
    client: 'TenneT',
    sector: 'Energy',
    blurb:
      'Established an end-to-end automated testing strategy for grid management software. Coached internal QA engineers in modern test automation principles.',
    tags: ['Playwright', 'GitHub Actions', 'Test Strategy'],
  },
  {
    client: 'Action',
    sector: 'Retail',
    blurb:
      'Delivered API and UI test coverage for the e-commerce platform during peak-season deployments. Integrated test reporting into the CI/CD pipeline.',
    tags: ['API Testing', 'Postman', 'CI/CD'],
  },
  {
    client: 'Europarcs',
    sector: 'Hospitality',
    blurb:
      'Tested and validated the booking flow across web and iOS/Android apps, ensuring a consistent guest experience across all channels.',
    tags: ['Mobile Testing', 'iOS', 'Android', 'Playwright'],
  },
  {
    client: 'Gadero',
    sector: 'E-commerce',
    blurb:
      'Set up automated regression coverage for the product catalog and checkout flow, enabling weekly releases with confidence.',
    tags: ['Playwright', 'TypeScript', 'GitHub Actions'],
  },
  {
    client: 'Provincie Gelderland',
    sector: 'Government',
    blurb:
      'Coordinated QA across UX, development, and business stakeholders for citizen-facing web applications. Ensured WCAG accessibility compliance.',
    tags: ['Accessibility', 'Test Strategy', 'Stakeholder Coordination'],
  },
]

export default function PortfolioPage() {
  return (
    <div className="bg-background min-h-screen pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        <p className="font-mono text-accent text-xs tracking-[0.25em] uppercase mb-4">
          Portfolio
        </p>
        <h1 className="font-display font-bold text-white text-5xl md:text-6xl mb-6 max-w-2xl">
          Clients & work
        </h1>
        <p className="text-text-muted text-xl max-w-2xl mb-16 leading-relaxed">
          Over the years I&apos;ve helped businesses in finance, retail, energy, and government
          ship flawless digital products through thorough testing and proactive quality assurance.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {clients.map((c) => (
            <PortfolioCard key={c.client} {...c} />
          ))}
        </div>
      </div>
    </div>
  )
}
```

**Note:** The blurbs above are example copy — Chiel should replace them with accurate descriptions of his actual work.

- [ ] **Step 3: Verify portfolio page**

Open `http://localhost:3000/portfolio`. Verify: 6 cards render in a grid, each with client name, sector badge, blurb, and tech tags.

- [ ] **Step 4: Commit**

```bash
git add components/PortfolioCard.tsx app/portfolio/page.tsx
git commit -m "feat: add portfolio page with client cards and case study blurbs"
```

---

## Task 6: About Page

**Files:**
- Create: `app/about/page.tsx`

**Interfaces:**
- Consumes: Tailwind tokens from Task 2

- [ ] **Step 1: Write `app/about/page.tsx`**

```typescript
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About',
  description:
    'Chiel Bleumink — senior QA consultant with 17+ years in finance, retail, energy, and government.',
}

const skills = [
  'Playwright', 'TypeScript', 'GitHub Actions', 'Azure DevOps',
  'Postman', 'GraphQL / Apollo', 'iOS Testing', 'Android Testing',
  'AI / Claude Integration', 'Scrum / Agile', 'DevOps', 'CI/CD',
]

const certs = [
  { name: 'ISTQB Foundation', abbr: 'ISTQB' },
  { name: 'Professional Scrum Master 1', abbr: 'PSM1' },
]

export default function AboutPage() {
  return (
    <div className="bg-background min-h-screen pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        <p className="font-mono text-accent text-xs tracking-[0.25em] uppercase mb-4">
          About
        </p>
        <h1 className="font-display font-bold text-white text-5xl md:text-6xl mb-20 max-w-xl">
          Chiel Bleumink
        </h1>

        <div className="grid md:grid-cols-2 gap-20 items-start">
          {/* Photo column */}
          <div className="flex flex-col gap-8">
            <div className="aspect-square bg-surface border border-surface flex items-center justify-center max-w-sm">
              {/* Replace with: <Image src="/images/chiel.jpg" alt="Chiel Bleumink" fill className="object-cover" /> */}
              <div className="flex flex-col items-center gap-4 text-text-muted">
                <div className="w-24 h-24 rounded-full border-2 border-accent opacity-30" />
                <span className="font-mono text-xs tracking-widest">Photo coming soon</span>
              </div>
            </div>

            {/* Certs */}
            <div>
              <p className="font-mono text-accent text-xs tracking-widest uppercase mb-4">
                Certifications
              </p>
              <div className="flex flex-wrap gap-3">
                {certs.map(({ name, abbr }) => (
                  <div
                    key={abbr}
                    title={name}
                    className="border border-accent text-accent font-mono text-sm px-4 py-2 hover:bg-accent hover:text-background transition-colors cursor-default"
                  >
                    {abbr}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bio + skills column */}
          <div className="flex flex-col gap-12">
            <div className="flex flex-col gap-5 text-text-primary text-lg leading-relaxed">
              <p>
                I&apos;m a senior QA consultant based in Arnhem, Netherlands, with 17+ years of
                experience across finance, retail, energy, and government sectors.
              </p>
              <p>
                I specialize in Playwright-based test automation, helping teams move from
                manual regression cycles to fast, reliable CI/CD pipelines. I work hands-on
                with developers, UX designers, and business stakeholders to make quality
                everyone&apos;s responsibility.
              </p>
              <p>
                More recently I&apos;ve been integrating AI — Claude, GitHub Copilot, OpenCode —
                into testing workflows to generate smarter test cases, triage failures faster,
                and reduce maintenance overhead.
              </p>
              <p>
                I hold an ISTQB Foundation certification and a PSM1 Scrum Master credential,
                and studied Technical Computer Science (HTS).
              </p>
            </div>

            {/* Skills */}
            <div>
              <p className="font-mono text-accent text-xs tracking-widest uppercase mb-6">
                Skills & tooling
              </p>
              <div className="flex flex-wrap gap-3">
                {skills.map((skill) => (
                  <span
                    key={skill}
                    className="text-sm font-mono text-text-muted bg-surface border border-surface px-3 py-2 hover:border-accent hover:text-accent transition-colors cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Education */}
            <div>
              <p className="font-mono text-accent text-xs tracking-widest uppercase mb-4">
                Education
              </p>
              <p className="text-text-muted">HTS Technical Computer Science</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
```

**Note:** Bio copy is a polished draft — Chiel should review and personalize. Replace the photo placeholder `div` with a real `next/image` once a photo is available.

- [ ] **Step 2: Verify about page**

Open `http://localhost:3000/about`. Verify: split layout, bio renders, skill badges display, cert badges show.

- [ ] **Step 3: Commit**

```bash
git add app/about/page.tsx
git commit -m "feat: add about page with bio, skills, and certifications"
```

---

## Task 7: Blog Infrastructure — lib/blog.ts + MDX Config + Placeholder Post

**Files:**
- Create: `lib/blog.ts`
- Create: `content/blog/hello-world.mdx`
- Create: `__tests__/lib/blog.test.ts`

**Interfaces:**
- Produces:
  ```typescript
  export interface PostMeta {
    slug: string
    title: string
    date: string        // ISO 8601: "2026-06-30"
    excerpt: string
    tags: string[]
    readingTime: string // "3 min read"
  }

  export interface Post extends PostMeta {
    source: string      // raw MDX content (no frontmatter)
  }

  export function getAllPosts(): PostMeta[]    // sorted newest-first
  export function getPostBySlug(slug: string): Post | null
  ```

- [ ] **Step 1: Write placeholder blog post**

Create `content/blog/hello-world.mdx`:

```mdx
---
title: "Welcome to the CB Test Consultancy Blog"
date: "2026-06-30"
excerpt: "Quality assurance insights, testing strategies, and lessons from 17+ years in the field."
tags: ["qa", "testing", "welcome"]
---

Quality assurance is more than finding bugs — it's about building confidence that what you ship
actually works for real users under real conditions.

Over the coming months I'll be writing about Playwright automation patterns, AI-assisted testing,
and practical Agile QA strategies I've picked up across finance, retail, and energy sectors.

Stay tuned.
```

- [ ] **Step 2: Write failing test for `lib/blog.ts`**

Create `__tests__/lib/blog.test.ts`:

```typescript
import { describe, it, expect, vi, beforeEach } from 'vitest'
import * as fs from 'fs'

vi.mock('fs')

const mockMdx = `---
title: "Test Post"
date: "2026-01-15"
excerpt: "A test post."
tags: ["testing"]
---

This is the body of the post. It has some words in it for reading time calculation.
`

describe('getAllPosts', () => {
  beforeEach(() => {
    vi.mocked(fs.readdirSync).mockReturnValue(['test-post.mdx'] as unknown as fs.Dirent[])
    vi.mocked(fs.readFileSync).mockReturnValue(mockMdx)
  })

  it('returns posts sorted newest-first', async () => {
    const { getAllPosts } = await import('@/lib/blog')
    const posts = getAllPosts()
    expect(posts).toHaveLength(1)
    expect(posts[0].slug).toBe('test-post')
    expect(posts[0].title).toBe('Test Post')
    expect(posts[0].date).toBe('2026-01-15')
    expect(posts[0].excerpt).toBe('A test post.')
    expect(posts[0].tags).toEqual(['testing'])
    expect(posts[0].readingTime).toMatch(/\d+ min read/)
  })
})

describe('getPostBySlug', () => {
  beforeEach(() => {
    vi.mocked(fs.existsSync).mockReturnValue(true)
    vi.mocked(fs.readFileSync).mockReturnValue(mockMdx)
  })

  it('returns null for missing slug', async () => {
    vi.mocked(fs.existsSync).mockReturnValue(false)
    const { getPostBySlug } = await import('@/lib/blog')
    expect(getPostBySlug('does-not-exist')).toBeNull()
  })

  it('returns post with source content', async () => {
    const { getPostBySlug } = await import('@/lib/blog')
    const post = getPostBySlug('test-post')
    expect(post).not.toBeNull()
    expect(post!.source).toContain('body of the post')
    expect(post!.source).not.toContain('title:')
  })
})
```

- [ ] **Step 3: Run tests to verify they fail**

```bash
npm test -- --reporter=verbose blog
```

Expected: FAIL — `Cannot find module '@/lib/blog'`

- [ ] **Step 4: Write `lib/blog.ts`**

```typescript
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const BLOG_DIR = path.join(process.cwd(), 'content', 'blog')

export interface PostMeta {
  slug: string
  title: string
  date: string
  excerpt: string
  tags: string[]
  readingTime: string
}

export interface Post extends PostMeta {
  source: string
}

function estimateReadingTime(content: string): string {
  const words = content.trim().split(/\s+/).length
  const minutes = Math.max(1, Math.ceil(words / 200))
  return `${minutes} min read`
}

export function getAllPosts(): PostMeta[] {
  const files = fs.readdirSync(BLOG_DIR).filter((f) => String(f).endsWith('.mdx'))
  return (files as string[])
    .map((filename) => {
      const slug = filename.replace(/\.mdx$/, '')
      const raw = fs.readFileSync(path.join(BLOG_DIR, filename), 'utf-8')
      const { data, content } = matter(raw)
      return {
        slug,
        title: data.title as string,
        date: data.date as string,
        excerpt: data.excerpt as string,
        tags: (data.tags as string[]) ?? [],
        readingTime: estimateReadingTime(content),
      }
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getPostBySlug(slug: string): Post | null {
  const filepath = path.join(BLOG_DIR, `${slug}.mdx`)
  if (!fs.existsSync(filepath)) return null
  const raw = fs.readFileSync(filepath, 'utf-8')
  const { data, content } = matter(raw)
  return {
    slug,
    title: data.title as string,
    date: data.date as string,
    excerpt: data.excerpt as string,
    tags: (data.tags as string[]) ?? [],
    readingTime: estimateReadingTime(content),
    source: content,
  }
}
```

- [ ] **Step 5: Run tests to verify they pass**

```bash
npm test -- --reporter=verbose blog
```

Expected: PASS (3 tests)

- [ ] **Step 6: Commit**

```bash
git add lib/blog.ts content/blog/hello-world.mdx __tests__/lib/blog.test.ts
git commit -m "feat: add blog infrastructure with lib/blog.ts and placeholder post"
```

---

## Task 8: Blog Pages — List + Post

**Files:**
- Create: `components/BlogPostCard.tsx`
- Create: `app/blog/page.tsx`
- Create: `app/blog/[slug]/page.tsx`

**Interfaces:**
- Consumes: `getAllPosts(): PostMeta[]`, `getPostBySlug(slug): Post | null` from `@/lib/blog`
- Produces:
  ```typescript
  interface BlogPostCardProps {
    slug: string
    title: string
    date: string
    excerpt: string
    readingTime: string
  }
  // default export BlogPostCard(props: BlogPostCardProps): JSX.Element
  ```

- [ ] **Step 1: Write failing test for BlogPostCard**

Create `__tests__/components/BlogPostCard.test.tsx`:

```typescript
import { render, screen } from '@testing-library/react'
import BlogPostCard from '@/components/BlogPostCard'

const props = {
  slug: 'hello-world',
  title: 'Hello World',
  date: '2026-06-30',
  excerpt: 'A short excerpt.',
  readingTime: '2 min read',
}

describe('BlogPostCard', () => {
  it('renders title as a link to the post', () => {
    render(<BlogPostCard {...props} />)
    const link = screen.getByRole('link', { name: /hello world/i })
    expect(link).toHaveAttribute('href', '/blog/hello-world')
  })

  it('renders excerpt and reading time', () => {
    render(<BlogPostCard {...props} />)
    expect(screen.getByText('A short excerpt.')).toBeInTheDocument()
    expect(screen.getByText('2 min read')).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npm test -- --reporter=verbose BlogPostCard
```

Expected: FAIL — `Cannot find module '@/components/BlogPostCard'`

- [ ] **Step 3: Write `components/BlogPostCard.tsx`**

```typescript
import Link from 'next/link'

interface BlogPostCardProps {
  slug: string
  title: string
  date: string
  excerpt: string
  readingTime: string
}

export default function BlogPostCard({ slug, title, date, excerpt, readingTime }: BlogPostCardProps) {
  const formatted = new Date(date).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  return (
    <article className="border-b border-surface py-10 group">
      <div className="flex items-center gap-4 text-text-muted font-mono text-xs tracking-widest uppercase mb-4">
        <time dateTime={date}>{formatted}</time>
        <span>·</span>
        <span>{readingTime}</span>
      </div>
      <h2 className="font-display font-bold text-white text-2xl mb-3 group-hover:text-accent transition-colors">
        <Link href={`/blog/${slug}`}>{title}</Link>
      </h2>
      <p className="text-text-muted leading-relaxed mb-4">{excerpt}</p>
      <Link
        href={`/blog/${slug}`}
        className="text-accent text-sm font-medium hover:text-accent-dim transition-colors"
      >
        Read post →
      </Link>
    </article>
  )
}
```

- [ ] **Step 4: Run test to verify it passes**

```bash
npm test -- --reporter=verbose BlogPostCard
```

Expected: PASS (2 tests)

- [ ] **Step 5: Write `app/blog/page.tsx`**

```typescript
import type { Metadata } from 'next'
import { getAllPosts } from '@/lib/blog'
import BlogPostCard from '@/components/BlogPostCard'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'QA insights, Playwright patterns, and AI testing strategies from Chiel Bleumink.',
}

export default function BlogPage() {
  const posts = getAllPosts()

  return (
    <div className="bg-background min-h-screen pt-32 pb-24">
      <div className="max-w-3xl mx-auto px-6">
        <p className="font-mono text-accent text-xs tracking-[0.25em] uppercase mb-4">Blog</p>
        <h1 className="font-display font-bold text-white text-5xl md:text-6xl mb-16">
          Thoughts on QA
        </h1>

        {posts.length === 0 ? (
          <p className="text-text-muted text-xl">Posts coming soon.</p>
        ) : (
          <div>
            {posts.map((post) => (
              <BlogPostCard key={post.slug} {...post} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
```

- [ ] **Step 6: Install MDX + rehype packages**

`next-mdx-remote` was already installed in Task 1. Install the remark/rehype plugins:

```bash
npm install remark-gfm rehype-pretty-code
```

- [ ] **Step 7: Write `app/blog/[slug]/page.tsx`**

```typescript
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { MDXRemote } from 'next-mdx-remote/rsc'
import remarkGfm from 'remark-gfm'
import rehypePrettyCode from 'rehype-pretty-code'
import { getAllPosts, getPostBySlug } from '@/lib/blog'

interface PageProps {
  params: { slug: string }
}

export async function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const post = getPostBySlug(params.slug)
  if (!post) return {}
  return {
    title: post.title,
    description: post.excerpt,
  }
}

export default function BlogPostPage({ params }: PageProps) {
  const post = getPostBySlug(params.slug)
  if (!post) notFound()

  const formatted = new Date(post.date).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  return (
    <div className="bg-background min-h-screen pt-32 pb-24">
      <div className="max-w-3xl mx-auto px-6">
        <Link
          href="/blog"
          className="text-text-muted text-sm font-mono hover:text-accent transition-colors mb-12 inline-block"
        >
          ← All posts
        </Link>

        <header className="mb-12">
          <div className="flex items-center gap-4 text-text-muted font-mono text-xs tracking-widest uppercase mb-6">
            <time dateTime={post.date}>{formatted}</time>
            <span>·</span>
            <span>{post.readingTime}</span>
          </div>
          <h1 className="font-display font-bold text-white text-4xl md:text-5xl leading-tight">
            {post.title}
          </h1>
        </header>

        <div className="prose-dark">
          <MDXRemote
            source={post.source}
            options={{
              mdxOptions: {
                remarkPlugins: [remarkGfm],
                rehypePlugins: [
                  [rehypePrettyCode, { theme: 'github-dark-dimmed' }],
                ],
              },
            }}
          />
        </div>

        <div className="flex flex-wrap gap-2 mt-12">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs font-mono text-text-muted bg-surface border border-surface px-3 py-1"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
```

- [ ] **Step 8: Verify blog pages**

```bash
npm run dev
```

- Open `http://localhost:3000/blog` — placeholder post card renders
- Click post → opens `/blog/hello-world` — MDX content renders with correct typography

- [ ] **Step 9: Commit**

```bash
git add components/BlogPostCard.tsx app/blog/ __tests__/components/BlogPostCard.test.tsx
git commit -m "feat: add blog list and post pages with MDX rendering"
```

---

## Task 9: Contact Page

**Files:**
- Create: `components/ContactForm.tsx`
- Create: `app/contact/page.tsx`
- Create: `__tests__/components/ContactForm.test.tsx`

**Interfaces:**
- Produces: `ContactForm` — default export, no props, `'use client'`

- [ ] **Step 1: Write failing test for ContactForm**

Create `__tests__/components/ContactForm.test.tsx`:

```typescript
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ContactForm from '@/components/ContactForm'

global.fetch = vi.fn()

describe('ContactForm', () => {
  beforeEach(() => {
    vi.mocked(fetch).mockResolvedValue(new Response(null, { status: 200 }))
  })

  it('renders all form fields', () => {
    render(<ContactForm />)
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/message/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /send/i })).toBeInTheDocument()
  })

  it('shows success message after successful submit', async () => {
    const user = userEvent.setup()
    render(<ContactForm />)

    await user.type(screen.getByLabelText(/name/i), 'Jane Doe')
    await user.type(screen.getByLabelText(/email/i), 'jane@example.com')
    await user.type(screen.getByLabelText(/message/i), 'Hello!')
    await user.click(screen.getByRole('button', { name: /send/i }))

    await waitFor(() => {
      expect(screen.getByText(/message sent/i)).toBeInTheDocument()
    })
  })

  it('shows error message on fetch failure', async () => {
    vi.mocked(fetch).mockResolvedValue(new Response(null, { status: 500 }))
    const user = userEvent.setup()
    render(<ContactForm />)

    await user.type(screen.getByLabelText(/name/i), 'Jane')
    await user.type(screen.getByLabelText(/email/i), 'jane@example.com')
    await user.type(screen.getByLabelText(/message/i), 'Hi')
    await user.click(screen.getByRole('button', { name: /send/i }))

    await waitFor(() => {
      expect(screen.getByText(/something went wrong/i)).toBeInTheDocument()
    })
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npm test -- --reporter=verbose ContactForm
```

Expected: FAIL — `Cannot find module '@/components/ContactForm'`

- [ ] **Step 3: Write `components/ContactForm.tsx`**

```typescript
'use client'
import { useState } from 'react'

type FormState = 'idle' | 'submitting' | 'success' | 'error'

export default function ContactForm() {
  const [state, setState] = useState<FormState>('idle')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setState('submitting')

    const formData = new FormData(e.currentTarget)

    try {
      const endpoint = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT
      const res = await fetch(endpoint!, {
        method: 'POST',
        body: formData,
        headers: { Accept: 'application/json' },
      })
      setState(res.ok ? 'success' : 'error')
    } catch {
      setState('error')
    }
  }

  if (state === 'success') {
    return (
      <div className="bg-surface border border-accent p-8 text-center">
        <p className="font-display font-bold text-white text-xl mb-2">Message sent ✓</p>
        <p className="text-text-muted">I&apos;ll get back to you as soon as possible.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <label htmlFor="name" className="text-sm font-mono text-text-muted tracking-widest uppercase">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          className="bg-surface border border-surface focus:border-accent outline-none px-4 py-3 text-text-primary transition-colors"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="text-sm font-mono text-text-muted tracking-widest uppercase">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="bg-surface border border-surface focus:border-accent outline-none px-4 py-3 text-text-primary transition-colors"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="message" className="text-sm font-mono text-text-muted tracking-widest uppercase">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={6}
          required
          className="bg-surface border border-surface focus:border-accent outline-none px-4 py-3 text-text-primary transition-colors resize-none"
        />
      </div>

      {state === 'error' && (
        <p className="text-red-400 text-sm">Something went wrong — please try again or email me directly.</p>
      )}

      <button
        type="submit"
        disabled={state === 'submitting'}
        className="bg-accent text-background px-8 py-4 font-semibold text-lg hover:bg-accent-dim transition-colors disabled:opacity-50 disabled:cursor-not-allowed self-start"
      >
        {state === 'submitting' ? 'Sending…' : 'Send message →'}
      </button>
    </form>
  )
}
```

- [ ] **Step 4: Run test to verify it passes**

```bash
npm test -- --reporter=verbose ContactForm
```

Expected: PASS (3 tests)

- [ ] **Step 5: Write `app/contact/page.tsx`**

```typescript
import type { Metadata } from 'next'
import ContactForm from '@/components/ContactForm'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with Chiel Bleumink — QA consultant based in Arnhem, Netherlands.',
}

export default function ContactPage() {
  return (
    <div className="bg-background min-h-screen pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        <p className="font-mono text-accent text-xs tracking-[0.25em] uppercase mb-4">
          Contact
        </p>
        <h1 className="font-display font-bold text-white text-5xl md:text-6xl mb-20 max-w-xl">
          Let&apos;s work together.
        </h1>

        <div className="grid md:grid-cols-2 gap-20">
          {/* Contact details */}
          <div className="flex flex-col gap-10">
            <div>
              <p className="font-mono text-accent text-xs tracking-widest uppercase mb-4">
                Direct contact
              </p>
              <div className="flex flex-col gap-4 text-text-primary">
                <a
                  href="mailto:chiel.bleumink@cbtestconsultancy.nl"
                  className="hover:text-accent transition-colors"
                >
                  chiel.bleumink@cbtestconsultancy.nl
                </a>
                <a href="tel:+31646270584" className="hover:text-accent transition-colors">
                  +31 (0)6 46 27 05 84
                </a>
              </div>
            </div>

            <div>
              <p className="font-mono text-accent text-xs tracking-widest uppercase mb-4">
                Location
              </p>
              <p className="text-text-muted">Arnhem, Netherlands</p>
            </div>

            <div>
              <p className="font-mono text-accent text-xs tracking-widest uppercase mb-4">
                Business
              </p>
              <p className="text-text-muted">KvK 09217715</p>
            </div>
          </div>

          {/* Form */}
          <ContactForm />
        </div>
      </div>
    </div>
  )
}
```

- [ ] **Step 6: Run all tests**

```bash
npm test
```

Expected: PASS (all tests across all files)

- [ ] **Step 7: Verify contact page**

Open `http://localhost:3000/contact`. Verify: split layout, contact details left, form right. Test form validation (empty submit should be blocked by browser `required`).

- [ ] **Step 8: Commit**

```bash
git add components/ContactForm.tsx app/contact/page.tsx \
  __tests__/components/ContactForm.test.tsx
git commit -m "feat: add contact page with Formspree-backed form"
```

---

## Task 10: Static Export — Build Verification + Deployment Script

**Files:**
- Modify: `next.config.ts` (already set, verify)
- Create: `deploy.sh`

**Interfaces:**
- Produces: `out/` directory ready for upload to shared host

- [ ] **Step 1: Verify `next.config.ts` has `output: 'export'`**

`next.config.ts` should already contain:

```typescript
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
}

export default nextConfig
```

If not, fix it now.

- [ ] **Step 2: Run full build**

```bash
npm run build
```

Expected:
- Build completes without errors
- `out/` directory created
- Pages listed: `/`, `/portfolio`, `/about`, `/blog`, `/blog/hello-world`, `/contact`

If build fails with MDX-related errors, install the `@types/mdx` package:

```bash
npm install -D @types/mdx
```

- [ ] **Step 3: Serve static output locally to verify**

```bash
npx serve out -p 4000
```

Open `http://localhost:4000`. Click through all five pages: Home → Portfolio → About → Blog → Blog post → Contact. Verify:
- Nav links all work
- No broken images or 404s
- Contact form renders (submission requires `.env.local` with real Formspree endpoint)

- [ ] **Step 4: Write `deploy.sh`**

```bash
#!/usr/bin/env bash
set -e

echo "Building site..."
npm run build

echo "Build complete. Contents of out/:"
ls out/

echo ""
echo "Upload the contents of out/ to your host's public_html (or www) directory."
echo "Example with rsync (replace USER, HOST, PATH):"
echo ""
echo "  rsync -avz --delete out/ USER@HOST:/path/to/public_html/"
echo ""
echo "Example with FTP (use your host's file manager or an FTP client like FileZilla)."
```

```bash
chmod +x deploy.sh
```

- [ ] **Step 5: Commit**

```bash
git add next.config.ts deploy.sh
git commit -m "feat: verify static export and add deploy helper script"
```

---

## Task 11: Playwright E2E Smoke Tests

**Files:**
- Create: `e2e/smoke.spec.ts`

**Interfaces:**
- Consumes: running dev server at `http://localhost:3000`

- [ ] **Step 1: Write `e2e/smoke.spec.ts`**

```typescript
import { test, expect } from '@playwright/test'

test.describe('Navigation smoke tests', () => {
  test('home page loads with hero heading', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Testing at the')
    await expect(page.locator('text=CB Test Consultancy')).toBeVisible()
  })

  test('portfolio page shows client cards', async ({ page }) => {
    await page.goto('/portfolio')
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Clients')
    await expect(page.getByText('Rabobank')).toBeVisible()
    await expect(page.getByText('TenneT')).toBeVisible()
  })

  test('about page shows Chiel Bleumink', async ({ page }) => {
    await page.goto('/about')
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Chiel Bleumink')
    await expect(page.getByText('ISTQB')).toBeVisible()
    await expect(page.getByText('PSM1')).toBeVisible()
  })

  test('blog page lists posts', async ({ page }) => {
    await page.goto('/blog')
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Thoughts on QA')
    await expect(page.getByText('Welcome to the CB Test Consultancy Blog')).toBeVisible()
  })

  test('blog post page renders MDX content', async ({ page }) => {
    await page.goto('/blog/hello-world')
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Welcome to the CB')
    await expect(page.getByRole('link', { name: /← all posts/i })).toBeVisible()
  })

  test('contact page shows form and contact details', async ({ page }) => {
    await page.goto('/contact')
    await expect(page.getByRole('heading', { level: 1 })).toContainText("Let's work together")
    await expect(page.getByLabelText(/name/i)).toBeVisible()
    await expect(page.getByLabelText(/email/i)).toBeVisible()
    await expect(page.getByLabelText(/message/i)).toBeVisible()
    await expect(page.getByText('chiel.bleumink@cbtestconsultancy.nl')).toBeVisible()
  })

  test('nav links navigate correctly', async ({ page }) => {
    await page.goto('/')
    await page.click('text=Portfolio')
    await expect(page).toHaveURL('/portfolio')

    await page.click('text=About')
    await expect(page).toHaveURL('/about')

    await page.click('text=Blog')
    await expect(page).toHaveURL('/blog')

    await page.click('text=Contact')
    await expect(page).toHaveURL('/contact')
  })
})
```

- [ ] **Step 2: Run E2E tests**

In one terminal, start the dev server (if not already running):

```bash
npm run dev
```

In another terminal, run:

```bash
npm run e2e
```

Expected: All 7 tests PASS.

If a test fails, check the error — most likely a heading text mismatch between the spec and the component. Fix the component text to match (or update the assertion if the component text is deliberately different).

- [ ] **Step 3: Commit**

```bash
git add e2e/smoke.spec.ts
git commit -m "feat: add Playwright E2E smoke tests for all pages"
```

---

## Final Checklist

- [ ] `npm test` — all unit tests pass
- [ ] `npm run e2e` — all E2E tests pass
- [ ] `npm run build` — static export builds without errors
- [ ] `npx serve out -p 4000` — all pages work from static output
- [ ] Review and personalize: portfolio blurbs, About bio, hero tagline
- [ ] Replace photo placeholder in About with real image
- [ ] Add real client logo SVGs to `public/images/clients/`
- [ ] Create Formspree account → get endpoint URL → add to `.env.local`
- [ ] Upload `out/` to existing host

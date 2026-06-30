## 1. Disclaimer Page

- [ ] 1.1 Create `app/disclaimer/page.tsx` with Metadata (title: "Disclaimer", description) and page component
- [ ] 1.2 Add page heading "Disclaimer" using `font-display font-bold text-text-primary text-5xl md:text-6xl`
- [ ] 1.3 Add legal content sections: Liability, Intellectual Property, External Links, Changes
- [ ] 1.4 Style using `max-w-3xl mx-auto px-6 pt-32 pb-24 bg-background min-h-screen` (same as Blog page)

## 2. Footer Update

- [ ] 2.1 Open `components/Footer.tsx` and add `{ href: '/disclaimer', label: 'Disclaimer' }` to the nav links
- [ ] 2.2 Verify the Disclaimer link renders with correct `hover:text-accent transition-colors` class

## 3. Verification

- [ ] 3.1 Run `npm run dev` and navigate to `/disclaimer` — page renders correctly with nav and footer
- [ ] 3.2 Confirm Disclaimer link appears in footer on all pages
- [ ] 3.3 Run `npm run build` and verify `out/disclaimer.html` exists in build output

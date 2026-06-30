## Context

The site is a Next.js 14 static export. All pages are pre-rendered at build time. The footer already has a nav link list; adding a Disclaimer link follows the existing pattern. No CMS, no database — content is hardcoded in the page component.

## Goals / Non-Goals

**Goals:**
- Static `/disclaimer` page with standard Dutch/EU legal copy
- Footer link to `/disclaimer`

**Non-Goals:**
- Privacy policy page (separate change if needed)
- Cookie consent / GDPR banner
- Dynamically generated or CMS-managed legal content

## Decisions

**Static page, no MDX**: Disclaimer content changes rarely and has no author workflow. Hardcoding in TSX is consistent with the About and Contact pages. MDX would add unnecessary indirection.

**Footer placement only**: Disclaimer does not belong in the main nav (5 items already, disclaimer is not a primary destination). Footer is the conventional location for legal links.

**No separate layout**: Reuses the root layout (Nav + Footer) like all other pages. Same `pt-32 pb-24 max-w-3xl` pattern as Blog for a narrow readable column.

## Risks / Trade-offs

Legal accuracy → Content is boilerplate; Chiel should review copy before publishing. The page ships as-is — not legal advice.

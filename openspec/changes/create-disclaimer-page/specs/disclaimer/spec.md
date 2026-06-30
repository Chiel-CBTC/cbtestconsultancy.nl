## ADDED Requirements

### Requirement: Disclaimer page exists at /disclaimer
The system SHALL render a static disclaimer page at the `/disclaimer` route, pre-rendered at build time as part of the static export.

#### Scenario: Page loads
- **WHEN** a visitor navigates to `/disclaimer`
- **THEN** the page renders with the site nav, footer, and legal content sections

#### Scenario: Page is included in static export
- **WHEN** `npm run build` runs
- **THEN** `out/disclaimer.html` exists in the build output

### Requirement: Disclaimer page contains required legal sections
The page SHALL contain the following sections with appropriate headings:
1. Liability / Aansprakelijkheid — limits on accuracy/completeness of content
2. Intellectual Property / Intellectueel eigendom — copyright notice
3. External Links / Externe links — no responsibility for third-party sites
4. Changes — right to modify content without notice

#### Scenario: All sections present
- **WHEN** the disclaimer page is rendered
- **THEN** it contains headings for Liability, Intellectual Property, External Links, and Changes

### Requirement: Disclaimer page follows site design conventions
The page SHALL use the same layout, typography, and color tokens as other static pages (About, Blog, Portfolio).

#### Scenario: Design consistency
- **WHEN** the disclaimer page is rendered
- **THEN** it uses `bg-background`, `text-text-primary`, `font-display` headings, and `max-w-3xl` content column

## Why

A disclaimer page is required for Dutch/EU businesses operating a website — covering liability limitations, intellectual property, and content accuracy. It also provides a place to reference privacy and cookie policies in the future.

## What Changes

- Add a new static `/disclaimer` page with legal copy (liability, IP, links, accuracy)
- Add a "Disclaimer" link to the site footer

## Capabilities

### New Capabilities
- `disclaimer`: Static disclaimer page at `/disclaimer` with legal text sections

### Modified Capabilities
- `site-structure`: Footer gains a Disclaimer link

## Impact

- New file: `app/disclaimer/page.tsx`
- Modified file: `components/Footer.tsx` (add nav link)
- No new dependencies, no API changes, no env vars required

# Contact

## Purpose
Primary conversion page. Two paths: direct contact info (always visible) and a Formspree-backed contact form (only shown when env var is configured).

## Files
- `app/contact/page.tsx` — page layout + contact info
- `components/ContactForm.tsx` — form with Formspree submission

## Page Layout (/contact)
Two-column grid (`md:grid-cols-2 gap-24`), left-weighted. On mobile: single column (right column hidden with `hidden md:flex`).

### Left Column — Contact Info
Heading: `Let's work together.` — `text-5xl md:text-6xl`, `mb-16`

Three info blocks, each with a mono eyebrow + value:
1. **Direct contact**: email (`chiel.bleumink@cbtestconsultancy.nl`) + phone (`+31 (0)6 46 27 05 84`) — both are `<a>` tags with `hover:text-accent`
2. **Location**: Arnhem, Netherlands
3. **Business**: KvK 09217715

### Right Column — Availability Card (desktop only)
Surface card (`bg-surface border border-surface p-10`):
- Green dot indicator + `AVAILABLE FOR PROJECTS` eyebrow
- Availability statement: open to QA consulting, Playwright automation, AI-powered testing integrations
- Secondary text: embedded QA or external consultant; short or long-term

Below card:
- `RESPONSE TIME` eyebrow
- `Usually within one business day.`

## ContactForm Component (components/ContactForm.tsx)
Client component. Renders a form if `NEXT_PUBLIC_FORMSPREE_ENDPOINT` is set.

### States
| State | What renders |
|---|---|
| `idle` | Form (name, email, message fields + submit button) |
| `submitting` | Button shows `Sending…`, disabled |
| `success` | Success message: `Message sent ✓` |
| `error` | Error message + form remains |
| No env var | Fallback: plain text with direct email link |

### Form Fields
- Name (text, required)
- Email (email, required)
- Message (textarea, 6 rows, required)

### Submission
POST to `NEXT_PUBLIC_FORMSPREE_ENDPOINT` with `FormData`, header `Accept: application/json`.

### Styling
Fields: `bg-surface border border-surface focus:border-accent outline-none px-4 py-3 text-text-primary`
Submit: `bg-accent text-white px-8 py-4 font-semibold hover:bg-accent-dim`

## Environment Setup
```env
NEXT_PUBLIC_FORMSPREE_ENDPOINT=https://formspree.io/f/<your-id>
```
Without this variable, the form is replaced by a fallback with the direct email address.

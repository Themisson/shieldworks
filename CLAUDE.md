# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start dev server on http://localhost:3000
npm run build    # Production build
npm run start    # Start production server (after build)
npm run lint     # ESLint
```

## Architecture Overview

**Next.js 16 App Router** site for ShieldWorks — the personal professional brand of Themisson dos Santos Vasconcelos. Stack: React 19, TypeScript, Tailwind CSS, Vercel (hosting + analytics).

### Data layer (`src/data/`)

All site content lives in static TypeScript files — there is no CMS or database for the main site:

- `src/data/site.ts` — single source of truth for brand info, navigation items, practice areas, featured solutions, digital projects, research areas, academic services, and interest options used in forms.
- `src/data/insights.ts` — article/blog entries as static typed objects. Add new insights here; `published: false` hides them. Functions `getPublishedInsights()`, `getRecentInsights(limit)`, and `getInsightBySlug(slug)` are used across the app.

### Bilingual translation system (`src/i18n/`)

Translation is client-side and DOM-based, **not** React-tree-based:

- `translations.ts` — flat key-value dictionary mapping Portuguese strings to English.
- `locale-provider.tsx` — `LocaleProvider` wraps the app. On locale change, `translateDocument()` walks every text node in `document.body` via `TreeWalker` and replaces matching strings. The original text is cached in a `WeakMap` so it survives re-renders.
- `useLocale()` hook provides `{ locale, setLocale, t }`. The `t()` helper is for inline programmatic translation; DOM walking handles everything already rendered as JSX text.
- Locale preference is stored in `localStorage` under `shieldworks-locale`, defaulting to browser language detection.
- **Adding new text:** add the Portuguese string as the key and English translation as the value in `translations.ts`.

### SEO (`src/lib/seo.ts`, `src/app/layout.tsx`, `src/app/sitemap.ts`)

- `SITE_URL` = `https://www.shieldworks.com.br` (canonical base).
- `canonicalUrl(path)` builds absolute URLs used in metadata and structured data.
- `src/app/layout.tsx` injects JSON-LD structured data for `WebSite`, `Person`, and `Organization`.
- Dynamic insight pages generate their own `Article` JSON-LD and `generateStaticParams()` for static export.
- `sitemap.ts` auto-includes all static routes + all published insight slugs.

### API routes (`src/app/api/`)

- `POST /api/contact` — validates payload via `validateContactPayload()`, then sends email via Resend. Requires env vars.
- `POST /api/feedback` — validates via `validateFeedbackPayload()` and returns 202. No storage currently.
- Form validation logic (types, validation functions) is in `src/lib/form-validation.ts`. The allowed `interest` values are imported from `src/data/site.ts`.

### Environment variables

Defined in `.env.local` (see `.env.example`):

| Variable | Purpose |
|---|---|
| `RESEND_API_KEY` | Resend API key for contact form emails |
| `CONTACT_TO_EMAIL` | Recipient email address |
| `CONTACT_FROM_EMAIL` | Sender address (must be verified in Resend) |

### Tailwind custom design tokens (`tailwind.config.ts`)

| Token | Usage |
|---|---|
| `petroleum-{50,100,500,700,900}` | Primary brand color (teal/dark teal) |
| `graphite-{50,100,500,700,900}` | Neutral dark grays for text and backgrounds |
| `signal` | Accent teal (`#2f8f83`) for icons and highlights |
| `shadow-soft` | Consistent card shadow |

### Deployment

The site is deployed on **Vercel** (primary). DigitalOcean is reserved for future backend systems, APIs, and subdomains (`app.`, `demo.`, `academy.shieldworks.com.br`). See `docs/` for deployment notes.

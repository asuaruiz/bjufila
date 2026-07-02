# BJUFILA — Commercial Cleaning Website (Orlando, FL)

High-performance, SEO-first website for **BJUFILA Cleaning & Dishwashing Services LLC**, built to win the digital-growth proposal. React + Vite + TypeScript + Tailwind v4, Supabase backend, prerendered static HTML per route, Netlify-ready.

## Quick start

```bash
npm install
npm run dev        # local dev at http://localhost:5173
npm run build      # production build → dist/  (client + SSR prerender of all routes)
npm run preview    # NOTE: vite preview uses SPA fallback and will show hydration warnings
```

> **Important:** `vite preview` serves `index.html` for every path (SPA fallback), which does **not** match the prerendered per-route HTML and produces hydration warnings **locally only**. To preview production behavior accurately, use a static host that serves the per-route files (Netlify, `npx serve dist` without `-s`, etc.). On Netlify this is automatic.

## Tech & features

- **Stack:** React 18, Vite 5, TypeScript, Tailwind CSS v4, react-router-dom, react-helmet-async.
- **Pages:** Home, Services (list + 6 detail pages), Gallery (before/after slider + filterable grid), Blog (4 articles), About, Contact, Quote, 404.
- **Lead capture:** Quote form + newsletter → Supabase. Automated confirmation email + sales notification via a Supabase Edge Function.
- **SEO:**
  - Every route is **prerendered to static HTML** at build time (`scripts/prerender.mjs`) so crawlers get full content without executing JS.
  - Per-page `<title>`, meta, OpenGraph/Twitter, canonical.
  - JSON-LD: `CleaningService`/`LocalBusiness`, `Service`, `BreadcrumbList`, `FAQPage`, `BlogPosting`.
  - `public/sitemap.xml`, `public/robots.txt`, and **`public/llms.txt`** (for AI/LLM search indexing).
- **Performance / mobile:** lazy images with explicit dimensions (no layout shift), route-agnostic single bundle, mobile-first layout, `prefers-reduced-motion` support.

## Supabase

- **Project:** `orwctxxnqwmwvtlfwmqu` (URL `https://orwctxxnqwmwvtlfwmqu.supabase.co`)
- **Tables:** `bjufila_quotes`, `bjufila_subscribers` (RLS: anonymous **insert-only**, no public read — leads stay private).
- **Edge Function:** `bjufila-quote-notify` (sends confirmation + sales email; JWT verification disabled since it's a public form endpoint).
- Client credentials live in `.env` (`VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`). The publishable/anon key is safe to ship.

### Enabling real confirmation emails (currently stubbed)

The Edge Function is deployed and called on every submission, but it only *sends* email when a provider key is present. To turn emails on:

1. Create a [Resend](https://resend.com) account and verify the `bjufilacds.com` domain.
2. In the Supabase dashboard → Edge Functions → `bjufila-quote-notify` → Secrets, add:
   - `RESEND_API_KEY` = your Resend API key
   - `BJUFILA_FROM_EMAIL` = e.g. `BJUFILA <hello@bjufilacds.com>`
   - `BJUFILA_SALES_EMAIL` = `sales@bjufilacds.com`

Until then, leads are still saved to `bjufila_quotes` and visible in the Supabase Table Editor.

## Deploy to Netlify

1. Push this repo to GitHub.
2. In Netlify: **New site from Git** → build command `npm run build`, publish directory `dist`.
3. Add the two `VITE_SUPABASE_*` environment variables (same values as `.env`).
4. Point `bjufilacds.com` DNS (Cloudflare) to Netlify.

`public/_redirects` provides a SPA fallback for unknown paths **without** overriding the prerendered files (no `!` force flag), so Netlify serves the real per-route HTML.

## Logo

`public/logo.png` is the client's existing logo (BJUFILA star + globe), pulled from the current site.

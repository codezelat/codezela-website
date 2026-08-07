# Codezela Technologies Website ✨

The complete public Codezela website, rebuilt with Next.js 16, React 19, TypeScript, Tailwind CSS 4, and Bun. It includes the homepage, top-level company pages, all industry pages, all portfolio case studies, legal pages, local media, technical SEO, and the proposal email workflow.

## 🌐 Public site surface

The application contains 66 indexable public routes:

- Home, Services, Portfolio, Industries, About, and Contact
- 40 industry detail pages under `/industry/[slug]`
- 18 portfolio case studies under `/portfolio/[slug]`
- Privacy Policy and Terms and Conditions

`/ca` is a permanent redirect to [cca.it.com](https://cca.it.com/). Internal navigation, cards, footer links, and detail links remain inside this application.

## 🧰 Technology

- Next.js 16 App Router and static generation
- React 19 and TypeScript
- Tailwind CSS 4
- Next.js Image and Font optimisation
- Motion, Embla Carousel, Lucide, and React Icons
- Next.js Third Parties for performance-conscious Google measurement
- Resend for proposal notifications and submitter confirmations
- Zod for server-side form validation
- Bun as the only package manager

## 🚀 Local development

Requirements:

- Bun 1.3.14 or newer
- Node.js 20.9 or newer, as required by Next.js 16

Install and start the development server:

```bash
bun install
bun run dev
```

To use the project’s usual local port:

```bash
bun run dev -- --port 3100
```

Then open [http://localhost:3100](http://localhost:3100).

## 🔐 Environment configuration

Copy the example file and add server-side credentials locally:

```bash
cp .env.example .env.local
```

| Variable | Purpose |
| --- | --- |
| `RESEND_API_KEY` | Server-only Resend credential used by the proposal API |
| `PROPOSAL_FROM_EMAIL` | Verified sender identity for notification and confirmation emails |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | Public Cloudflare Turnstile widget key used on the final proposal step |
| `TURNSTILE_SECRET_KEY` | Server-only Turnstile key used by the proposal API for Siteverify validation |

Never commit `.env.local`, API keys, or provider credentials. The committed `.env.example` contains names and safe placeholders only.

## ✉️ Proposal delivery

`POST /api/proposals` validates requests on the server, rejects oversized or invalid payloads, applies honeypot and same-site checks, rate-limits known IP addresses, validates a single-use Cloudflare Turnstile token, and sends two clean emails through Resend:

- An internal notification to `info@codezela.com` and `sayuru@codezela.com`, with reply-to set to the submitter
- A confirmation to the submitter, with reply-to set to `info@codezela.com`

Email delivery requires a verified sender domain and valid production environment variables. A local build verifies the code path but does not prove live provider delivery.

Turnstile is explicitly rendered only on the final proposal step. Tokens are checked through Cloudflare Siteverify with the visitor IP when available, the `proposal_submit` action, the request hostname, an eight-second timeout, one safe retry, and a per-submission idempotency key. Expired, rejected, or consumed tokens are refreshed without discarding the visitor’s form details.

## 📊 Analytics and consent

The site preserves the existing Google Analytics 4 property (`G-NYCH8NBNH1`) and Google Ads destination (`AW-941011769`) through one Google tag integration. Consent Mode v2 defaults optional storage to denied, and measurement scripts load only after a visitor accepts optional cookies.

- The consent preference is retained for 180 days and can be changed through **Cookie Preferences** in the footer.
- Rejecting optional cookies keeps Google measurement scripts unloaded on a fresh visit and removes known first-party Google measurement cookies when possible.
- Successful proposal delivery records a GA4 `generate_lead` event without names, email addresses, phone numbers, project descriptions, submission references, or other form values.
- GA4 enhanced measurement handles normal page loads and browser-history page changes; do not add duplicate manual page-view events unless the GA property is reconfigured accordingly.

## ✅ Quality gate

Run the complete local code gate before handing off a change:

```bash
bun run lint
bun run typecheck
bun run build
```

For rendered changes, also test the affected route in production mode, exercise the interaction, check desktop and mobile layouts, review browser errors, and run Lighthouse against the production build.

## 📁 Project map

```text
src/
├── app/                 App Router pages, metadata, sitemap, robots, and API
├── components/
│   ├── home/            Shared header, footer, homepage sections, and proposal UI
│   ├── pages/           Top-level and detail-page compositions
│   └── shared/          Reusable motion, carousel, metrics, FAQ, and SEO components
├── data/                Route content, FAQ profiles, industry visuals, and metrics
└── lib/                 Email, validation, and structured-data helpers

public/
├── images/              Local, responsive website imagery
└── seo/                 Favicons and social-sharing artwork
```

## 🔎 SEO and discoverability

The site provides route-specific titles and descriptions, canonical URLs, Open Graph and X metadata, crawlable text, semantic headings, `robots.txt`, an XML sitemap, and JSON-LD for the relevant page type, breadcrumbs, projects, and visible FAQs. Legacy WordPress sitemap endpoints permanently redirect to the current `/sitemap.xml`, preserving compatibility with old submissions and crawler history.

FAQ structured data must always match the questions and answers visitors can read. Structured data helps machines understand a page, but it is not a promise of a rich result or a search ranking.

## ⚡ Images and performance

- Public media is stored locally; the website does not depend on the previous WordPress media library at runtime.
- Content images use `next/image`, explicit aspect ratios, responsive `sizes`, lazy loading below the fold, and higher fetch priority only for genuine above-the-fold content.
- Industry panel photography is stored as consistent 1280×720 WebP assets and delivered responsively by Next.js.
- Industry photography was sourced through [Unsplash](https://unsplash.com/) search and is governed by the [Unsplash License](https://unsplash.com/license). Review third-party asset rights before redistribution outside this project.

## 🚢 Deployment checklist

Before a production release:

1. Run the full quality gate and rendered browser checks.
2. Confirm all environment variables are configured on the intended deployment project.
3. Verify the Resend sender domain and send one real end-to-end proposal test.
4. Restrict the production Turnstile widget to `codezela.com` and `www.codezela.com`, then complete one real challenge and confirm a valid Siteverify event in Turnstile Analytics.
5. Check canonical URLs, sitemap, robots, redirects, and social images on the deployed origin.
6. Accept and reject optional cookies in a clean browser session, then confirm GA4 Realtime/DebugView and Google Ads receive only the expected consented events.
7. Run Lighthouse and link crawling against the deployed URL; local scores do not prove production CDN or third-party performance.
8. Confirm no secrets, local reports, screenshots, generated audits, or unrelated files are staged.

## 🤝 Repository rules

This repository is Bun-only. Keep `bun.lock` as the sole package-manager lockfile and use `bun run`, `bunx`, and `bun install` for all dependency and script work. See [AGENTS.md](./AGENTS.md) for the implementation contract.

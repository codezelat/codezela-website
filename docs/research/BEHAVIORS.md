# Homepage behavior inventory

Reference behavior inspected on the live homepage on 2026-08-07.

## Header and navigation

- Desktop header shows logo, five links, and a pink `Let’s talk` CTA.
- Mobile header shows logo and menu control. The menu expands inline and exposes Home, Services, Industries, About, Portfolio, and Contact.
- Links for pages not in this homepage milestone remain absolute production URLs so they do not masquerade as implemented local pages.

## Calls to action

- `Schedule a Free Consultation` opens the existing external scheduling URL.
- `Request a Proposal` opens an accessible modal dialog.
- `Let’s talk`, portfolio, industry, footer, and social destinations retain the live URLs.

## Proposal dialog

The dialog has a close control, Escape dismissal, focus-safe controls, validation, and four progress steps:

1. Full name, email, and optional phone.
2. Company name, required industry, and optional website.
3. Multi-select services and project goals.
4. Estimated budget, timeline, and project description.

The local milestone does not invent a private form API. Final submission opens a fully composed email to `info@codezela.com` with the entered proposal details, keeping the flow functional without silently discarding user data.

## Carousels and motion

- Services, industries, clients, and awards have previous/next controls and autoplay.
- Autoplay pauses on pointer interaction and respects reduced-motion preferences.
- Card counts respond at mobile, tablet, and desktop breakpoints.

## Quality constraints

- Images load locally from `public/images` and reserve their layout dimensions.
- Interactive controls are keyboard reachable and visibly focused.
- No runtime dependency on Elementor, WordPress JavaScript, or the live media host.
- Local validation includes desktop/mobile screenshots, console review, link/control checks, reduced-motion handling, lint, types, and production build.

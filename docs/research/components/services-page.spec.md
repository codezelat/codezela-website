# ServicesPage specification

- Target: `src/components/pages/ServicesPage.tsx` and `src/app/services/page.tsx`
- References: `codezela-services-desktop-top.png`, `codezela-services-y850.png`, `codezela-services-y1650.png`, `codezela-services-y2450.png`, `codezela-services-mobile-top.png`
- Interaction: click-driven tabs; one independent active state per service row.

## Hero

- Use the shared Header above the page and shared Footer below it.
- Desktop min-height about 900px. Content shell is 1280px wide.
- Left headline: `We offer premium services with a professional workflow, to achieve successful outcomes`; Poppins 52px/1.05, weight 500, dark purple, max-width 520px.
- Right side is the four-step timeline from the reference: Inception Meeting; Strategize for Success; Bringing Ideas to Life; Refining Perfection. A 2px purple vertical rule with a 48px purple dot and 18px pale ring runs through it. Labels are 30px and descriptions 17px gray.
- Mobile keeps the large blank header-to-copy rhythm, uses 40px/1.06 headline, then stacks the process beneath it without overflow.

## Intro and service rows

- Centered H1 `Our Services`, 40px desktop / 34px mobile, dark purple.
- Centered paragraph verbatim from `docs/research/codezela/services.json`, max-width 820px.
- Eight rows from the live page. Use the route-scoped icons in `public/images/services`.
- Desktop row: 1px #eadfec border, 6px radius, grid `34% 34% 32%`, min-height about 230px. First and second columns have right dividers. Page shell max-width 1280px.
- First column icon 40px purple, H2 25px/1.1 bold, body 17px/1.35.
- Middle column is a tablist with three equal rows and thin separators. Active tab is purple; inactive text #555. Include a chevron.
- Right panel title 16px semibold and body 17px/1.45.
- Mobile stacks icon/summary, scroll-safe tab list, and panel; retain separators and comfortable 22px padding.
- Tab content must be copied exactly from `docs/research/codezela/services-tab-states.json`. The visible tab typo `Custom E-commerce Website Development i` is part of the live reference and should not be invented elsewhere.

## Motion and accessibility

- Wrap hero groups and rows with shared `MotionReveal` using small stagger delays.
- Use actual `role=tablist`, `role=tab`, `aria-selected`, `aria-controls`, and `role=tabpanel`. Arrow keys move among tabs; Enter/Space activate.
- Hover only changes color/arrow position and adds a very small shadow; no layout shift.

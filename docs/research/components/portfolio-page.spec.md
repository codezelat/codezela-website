# PortfolioPage specification

- Target: `src/components/pages/PortfolioPage.tsx` and `src/app/portfolio/page.tsx`
- References: `codezela-portfolio-desktop-top.png`, `codezela-portfolio-y850.png`, `codezela-portfolio-y1650.png`, the remaining `codezela-portfolio-y*.png`, and mobile top reference.
- Interaction: linked rows with hover/focus motion.

## Hero

- Desktop min-height about 760px, shell max-width 1280px.
- Left H1 exactly `Our expertise, drives projects towards success and build conversions`; Poppins 52px/1.04, 500, dark purple, width about 570px.
- Right uses the local pale concentric target asset and three purple pills with white check icons: `Delivering impactful digital solutions`, `Innovating across diverse industries`, `Empowering brands with technology`.
- Mobile stacks headline then pills over the target. Use 40px/1.05 headline and 20px pill copy; avoid clipping.

## Project list

- Fifteen real projects, real text from `docs/research/codezela/portfolio.json`, and real local assets in `public/images/portfolio`.
- Desktop rows alternate text-left/image-right then image-left/text-right. Each row is about 580px tall, pale #fff8ff with a very subtle pink border; adjacent row keeps 64-80px vertical spacing.
- Text panel padding about 22px. Category chip is pale pink with magenta 18px semibold copy. Title 34px/1.08 bold; description 18px/1.35 gray; industry label sits near the bottom in muted gray.
- Image panel has a white inner card, 28px radius, and `object-contain` with stable aspect ratio.
- Mobile is one column with image first, then copy, 20px padding; no fixed-height text clipping.
- Make each full row an accessible link to its live portfolio detail URL. Add a small image scale and row lift on hover/focus, with 300ms easing.

## Motion and performance

- Use `MotionReveal` and stagger only enough to preserve scroll smoothness.
- `next/image` with responsive sizes; only hero target is priority/preloaded. Project images remain lazy.
- Preserve the exact on-page project order.

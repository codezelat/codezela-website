# AboutPage specification

- Target: `src/components/pages/AboutPage.tsx` and `src/app/about/page.tsx`
- References: `codezela-about-desktop-top.png`, `codezela-about-y850.png` through `codezela-about-y5650.png`, mobile top reference.
- Interaction: scroll reveals, animated stats, click-driven location selector.

## Hero and stats

- Desktop hero min-height about 760px. H1 copy is `Our values are what ensures project success and client satisfaction`; 52px/1.04 dark purple, left 45%.
- Right is a pale nested-square field using the about hero image and three purple bubbles: Design, Engineer, Data, each with a white check.
- Stats strip has a left-to-right purple-to-magenta gradient, rounded top-left and bottom-right corners, three equal columns, white 46px numbers and 20px labels. The live counter targets are 843+ Clients Worldwide, 2389+ Projects Completed, and 13+ Years of Experience; lower screenshot values are mid-animation frames.

## Main sections

- `Who We Are`: centered H1/description, then two-column long copy and overlapping `meeting-2` / `meeting-1` images. Copy verbatim from `docs/research/codezela/about.json` body text.
- Vision/Mission: full-width dark purple, two equal centered white columns, about 400px high.
- `Bringing Your Idea To Life Is Easy`: four-step horizontal timeline on desktop; vertical stacked timeline on mobile. Preserve the four live labels/descriptions.
- `Our Core Values`: left layered `handshake-close-up-executives` and `Rectangle-76` images; right four numbered values with exact live copy.
- `Passionate and Young Energy Drives Success`: three equal leader cards with the CEO, COO, CFO images/names/titles from the live page.
- Contact CTA uses the centered live copy/button and a pale background.
- Locations: five selector cards on the left and active office content on the right. At minimum the default Head Office content must match the live reference. Use the five local location images and update title, city, description, and address on selection.

## Motion and accessibility

- Stats count once after intersection and honor reduced motion.
- Location selector uses buttons with `aria-pressed`; images have useful alt text.
- Use `MotionReveal` per section and light image/card hover motion without altering layout.

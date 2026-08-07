# IndustriesPage specification

- Target: `src/components/pages/IndustriesPage.tsx` and `src/app/industries/page.tsx`
- References: `codezela-industries-desktop-top.png`, `codezela-industries-y850.png`, `codezela-industries-y1550.png`, mobile top reference.
- Hero copy: `We utilize modern technologies to revolutionize industries`; left 52px/1.04 purple heading. Right is a pale target with a 4 x 3 grid of rounded purple technology tiles.
- Main H1 `Our Industry Expertise` plus exact centered description.
- Desktop content grid: 430px selector column and flexible detail. Five selector cards per page, 190px high, icon 54px, label 18px bold. Active selector uses solid purple and white.
- Provide Previous/Next controls and paginate the full existing `industries` dataset five at a time. Selecting a card updates the detail on the right.
- Default detail title is `Transforming Finance and Banking with Innovative Technology` and uses the exact long paragraph from the live extraction. Other entries use their existing exact dataset copy without inventing facts.
- Mobile stacks selector carousel/list above the detail. Preserve all local icons and visible detail link.

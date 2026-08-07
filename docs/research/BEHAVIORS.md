# Codezela route behavior map

## Shared behaviors

- Header links use a magenta active state and a quick color transition on hover.
- `Let’s talk` swaps its two labels vertically on hover. The mobile menu opens with a short fade/translate transition, traps no page layout width, closes on link click or Escape, and exposes `aria-expanded`.
- Content sections use a single consistent fade-up reveal when first intersecting the viewport. Reduced-motion users receive the final state immediately.
- Buttons rise 2px on hover, keyboard focus remains visible, and cards use small shadow/translate micro-interactions without changing their geometry.

## Services

- Interaction model: click-driven tabs, independent per service card.
- Each card opens on its first tab. Activating a tab changes the purple active label and the right-side title/description with a short opacity transition.
- Tabs support mouse, Enter/Space, and arrow-key navigation semantics.

## Portfolio

- Interaction model: link/hover driven.
- Rows alternate media-right/media-left on desktop and become image-first stacked cards on mobile.
- Hovering a project subtly scales its image and raises the row. Each row remains one accessible link.

## Industries

- Interaction model: click-driven selector with previous/next controls.
- Selecting one of five industry cards updates the title, long description, icon, and detail link. Active card becomes solid purple with white text.

## About

- Interaction model: scroll reveal plus click-driven location selector.
- Stats animate from zero once when visible unless reduced motion is requested.
- Location cards update the office title, city, description, address, and supporting image.

## Contact

- Interaction model: links only. Telephone, WhatsApp, email, Calendly, proposal dialog, and social controls navigate or open their intended targets.
- No contact form is visible on the live reference page.

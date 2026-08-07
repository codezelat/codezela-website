# Codezela Website Engineering Guide

This file is the working contract for contributors and coding agents. Apply these rules to every change unless the user gives a more specific instruction.

## 1. Protect the product

- Preserve approved copy, company facts, counts, testimonials, project evidence, and legal text. Do not silently invent, “correct,” or replace them.
- Treat existing worktree changes as user-owned. Inspect `git status` before editing and do not reset, discard, stage, commit, push, or deploy unless explicitly asked.
- Keep secrets out of source, logs, screenshots, documentation, and client bundles. Only document environment-variable names and safe examples.
- Do not add runtime links or media dependencies to the previous Codezela site. Public content and assets should resolve locally unless an external destination is intentional.
- External links open in a new tab with `target="_blank"` and `rel="noreferrer"`. Internal navigation stays in the current tab.

## 2. Use the repository toolchain

- Use Bun only: `bun install`, `bun run`, and `bunx`. Do not create npm, pnpm, or Yarn lockfiles.
- Keep `bun.lock` as the sole dependency lockfile.
- Prefer the existing libraries and shared components before adding a dependency. Any new package needs a clear bundle, maintenance, and accessibility justification.
- Use `rg` or `rg --files` for repository search.

## 3. Build with Next.js and React carefully

- This project uses Next.js 16 and React 19. Read the relevant guide in `node_modules/next/dist/docs/` before changing framework-specific behaviour.
- Prefer Server Components. Add `"use client"` only around the smallest stateful or browser-dependent boundary.
- Keep static data and work at module scope where practical. Avoid unnecessary effects, duplicated listeners, render waterfalls, and large client props.
- Use `next/link` for internal routes and `next/image` for content imagery. Supply meaningful `alt` text, intrinsic dimensions or a stable `fill` container, an accurate `sizes` value, and priority only for a genuine LCP image.
- Respect reduced-motion preferences and avoid scroll handlers that block the main thread. Throttle visual scroll work with animation frames and use passive listeners where appropriate.
- Route changes must land at the top of the next page. Preserve the shared scroll-restoration behaviour.

## 4. Preserve visual and responsive fidelity

- Match the approved desktop and mobile design before introducing a redesign. Content changes do not authorise visual changes.
- Reuse the site shell, typography, colour tokens, spacing rhythm, button treatments, and shared interaction patterns.
- Test at a representative desktop viewport and at least one narrow mobile viewport. Check wrapping, overflow, sticky navigation, focus visibility, image crops, layout shifts, and interaction states.
- Micro-interactions should be subtle, consistent, GPU-friendly, and usable with reduced motion. Never trade clarity or performance for decorative motion.

## 5. Content, SEO, and structured data

- Each indexable page needs a useful title, description, canonical URL, semantic heading hierarchy, crawlable visible content, and appropriate social metadata.
- Keep `robots.ts` and `sitemap.ts` aligned with the real public route set. Do not include API routes, redirects, or error pages in the sitemap.
- JSON-LD must use valid JSON, escape `<`, describe the page accurately, and match visible content. Never add fake ratings, reviews, business facts, or FAQ answers.
- Write for people first. Use natural search language where it helps visitors; avoid keyword stuffing, hidden text, doorway content, ranking guarantees, and unsupported superlatives.
- FAQ copy should answer route-specific decisions, integrations, risks, accessibility, performance, and international needs without claiming automatic legal or regulatory compliance.

## 6. Forms and server security

- Validate untrusted input on the server and enforce size, rate, bot, and same-site controls before provider calls.
- Keep Resend credentials and sender configuration server-only. Do not expose them through `NEXT_PUBLIC_*` variables.
- Internal notifications reply to the submitter; submitter confirmations reply to the official Codezela address.
- Return understandable success and retry messages without leaking provider details, request headers, IP data, or stack traces.
- Local mocks and build success do not prove production provider delivery. State that boundary clearly.

## 7. Required verification

Run the repository gate after meaningful changes:

```bash
bun run lint
bun run typecheck
bun run build
```

For rendered or interaction work, also:

- Test the real affected route in a browser.
- Confirm page identity, visible content, interaction state, and absence of framework overlays.
- Check relevant browser warnings and errors.
- Verify desktop and mobile behaviour.
- Run a production-mode Lighthouse pass when performance, accessibility, best practices, or SEO is in scope.
- Crawl internal links and key metadata when routes, navigation, sitemap, canonical URLs, or structured data change.

Do not call the repository, feature, email workflow, deployment, or Lighthouse result “fully verified” beyond the evidence actually collected.

## 8. Handoff quality

- Keep generated screenshots, Lighthouse reports, traces, and temporary scripts outside the repository unless explicitly requested as project artifacts.
- Before handoff, review `git diff --check`, `git status --short`, and the exact changed-file set.
- Report what changed, the routes and viewports tested, the commands that passed, and any remaining production-only checks.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

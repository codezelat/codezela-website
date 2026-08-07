# Codezela Technologies Website

Production-oriented Next.js implementation of the Codezela Technologies website. The local application includes the complete public top-navigation experience:

- Home
- Services
- Portfolio
- Industries
- About
- Contact

Shared navigation stays inside the local application.

The application also includes the complete local detail surface discovered from the live canonical content:

- 40 industry detail routes under `/industry/<slug>`
- 18 portfolio case-study routes under `/portfolio/<slug>`
- Privacy Policy and Terms and Conditions

All public navigation, collection cards, legal links, industry links, and portfolio links remain inside the local application.

## Requirements

- Bun 1.3.14 or newer
- Node.js 20.9 or newer (required by Next.js 16)

## Local development

```bash
bun install
bun run dev
```

Open [http://localhost:3000](http://localhost:3000), or the next available port printed by Next.js if 3000 is already occupied.

## Quality gate

```bash
bun run lint
bun run typecheck
bun run build
```

## Local content and assets

All public content and media are stored in this repository under `src/data`, `public/images`, and `public/seo`. The application has no runtime dependency on the previous website or its WordPress media library.

The repository is Bun-only. Keep `bun.lock` as the sole package-manager lockfile.

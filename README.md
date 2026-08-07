# Codezela Technologies Website

Production-oriented Next.js implementation of the Codezela Technologies website. The local application includes the complete public top-navigation experience:

- Home
- Services
- Portfolio
- Industries
- About
- Contact

Shared navigation stays inside the local application. Portfolio and industry detail links continue to their existing production pages until those deeper routes are implemented.

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

## Asset sync

Source assets are stored locally under `public/images`, route-specific media under `public/images/<route>`, and SEO assets under `public/seo`. To refresh all configured assets from the live source:

```bash
bun run assets:sync
```

The repository is Bun-only. Keep `bun.lock` as the sole package-manager lockfile.

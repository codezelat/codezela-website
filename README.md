# Codezela Technologies Website

Production-oriented Next.js implementation of the Codezela Technologies website. The current scope is the complete homepage; internal links continue to the existing production website until their local routes are implemented.

## Requirements

- Bun 1.3.14 or newer
- Node.js 20.9 or newer (required by Next.js 16)

## Local development

```bash
bun install
bun run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Quality gate

```bash
bun run lint
bun run typecheck
bun run build
```

## Asset sync

Homepage source assets are stored locally under `public/images` and SEO assets under `public/seo`. To refresh the configured homepage assets from the live source:

```bash
bun run assets:sync
```

The repository is Bun-only. Keep `bun.lock` as the sole package-manager lockfile.

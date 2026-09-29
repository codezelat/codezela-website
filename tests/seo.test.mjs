import { expect, test } from "bun:test";
import sitemap from "../src/app/sitemap";
import robots from "../src/app/robots";
import config from "../next.config";

test("sitemap contains the unique public route set, never private or error routes", () => {
  const entries = sitemap();
  expect(entries).toHaveLength(67);
  expect(new Set(entries.map(({ url }) => url)).size).toBe(entries.length);
  for (const { url, lastModified } of entries) {
    const parsed = new URL(url);
    expect(parsed.origin).toBe("https://codezela.com");
    expect(parsed.pathname).not.toMatch(/^\/(?:api|payment|ca|404|_not-found)(?:\/|$)/);
    expect(Number.isNaN(new Date(lastModified).valueOf())).toBe(false);
  }
});

test("robots blocks APIs while allowing crawlers to read payment noindex", () => {
  expect(robots()).toMatchObject({
    rules: { userAgent: "*", allow: "/", disallow: ["/api/"] },
    sitemap: "https://codezela.com/sitemap.xml",
  });
});

test("private payment responses remain noindex and uncached", async () => {
  const headers = await config.headers();
  for (const path of ["/payment/:path*", "/api/payments/:path*"]) {
    const values = headers.find(({ source }) => source === path)?.headers;
    expect(values).toContainEqual({ key: "X-Robots-Tag", value: "noindex, nofollow, noarchive" });
    expect(values).toContainEqual({ key: "Cache-Control", value: "private, no-store, max-age=0" });
  }
});

test("image optimization stays enabled with bounded responsive variants", () => {
  expect(config.images.unoptimized).not.toBe(true);
  expect(config.images.qualities).toEqual([75, 85]);
  expect(config.images.remotePatterns ?? []).toHaveLength(0);
});

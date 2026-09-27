import { expect, test } from "bun:test";
import {
  networkCompanies,
  networkEducation,
  networkProducts,
} from "../src/data/network";
import sitemap from "../src/app/sitemap";

const entries = [...networkCompanies, ...networkProducts, ...networkEducation];

test("network includes all requested companies, products and education connections", () => {
  expect(networkCompanies).toHaveLength(6);
  expect(networkProducts.map(({ href }) => new URL(href).hostname)).toEqual([
    "kairo.lk",
    "scopeseal.codezela.com",
    "pagegoblin.org",
    "drivedock.app",
    "cw.codezela.com",
  ]);
  expect(networkEducation).toHaveLength(3);
  expect(new Set(entries.map(({ href }) => href)).size).toBe(entries.length);
});

test("network artwork is local, optimized and has recorded source provenance", async () => {
  for (const entry of entries) {
    expect(entry.href).toStartWith("https://");
    expect(entry.imageSource).toStartWith("https://");
    const asset = Bun.file(
      new URL(`../public/images/network/${entry.image}.webp`, import.meta.url),
    );
    expect(await asset.exists()).toBe(true);
    expect(asset.size).toBeLessThan(100_000);
  }
});

test("network is included once in the public sitemap", () => {
  expect(
    sitemap().filter(({ url }) => url === "https://codezela.com/network"),
  ).toHaveLength(1);
});

test("education relationships and private product availability stay explicit", () => {
  expect(
    networkEducation.find(({ name }) => name === "ISBS Campus")?.description,
  ).toContain("under SITC Campus");
  expect(
    networkProducts.find(({ name }) => name === "Cite Worthy")?.label,
  ).toContain("Private preview");
});

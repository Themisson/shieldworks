import fs from "node:fs";
import { describe, expect, it } from "vitest";
import * as site from "@/data/site";
import { caseStudies } from "@/data/cases";
import { featuredPublications } from "@/data/publications";
import { localizedPath, stripLocale } from "@/i18n/routing";

const baseline = JSON.parse(
  fs.readFileSync("content/baseline-inventory.json", "utf8"),
);
describe("baseline evidence and locale routing", () => {
  it("retains professional facts, services, research, systems and contact options", () => {
    for (const [key, value] of Object.entries(baseline.site))
      expect(
        JSON.parse(JSON.stringify(site[key as keyof typeof site])),
        key,
      ).toEqual(value);
  });
  it("retains every case, method, delivery and publication field", () => {
    expect(caseStudies).toEqual(baseline.cases);
    expect(featuredPublications).toEqual(baseline.publications);
  });
  it("does not prefix APIs, assets or external destinations", () => {
    for (const path of [
      "/api/contact",
      "/_next/static/chunk.js",
      "/feed.xml",
      "https://example.test/",
      "//example.test/",
    ])
      expect(localizedPath(path, "en")).toBe(path);
    expect(localizedPath("/en/pesquisa", "en")).toBe("/en/pesquisa");
    expect(localizedPath("/en/pesquisa", "pt")).toBe("/pesquisa");
    expect(stripLocale("/engineering")).toBe("/engineering");
  });
});

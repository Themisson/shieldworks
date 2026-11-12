import { describe, expect, it } from "vitest";
import sitemap from "@/app/sitemap";

describe("sitemap", () => {
  it("gives every entry a real last-modified date", () => {
    const entries = sitemap();
    expect(entries.length).toBeGreaterThanOrEqual(60);
    const today = new Date().toISOString().slice(0, 10);
    for (const entry of entries) {
      expect(entry.lastModified, entry.url).toMatch(/^\d{4}-\d{2}-\d{2}/);
      expect(String(entry.lastModified).slice(0, 10) <= today, entry.url).toBe(true);
    }
  });
});

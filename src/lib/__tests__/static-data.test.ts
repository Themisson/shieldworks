import { describe, expect, it } from "vitest";
import { validateStaticData } from "@/lib/validate-static-data";

describe("validateStaticData", () => {
  it("validates cases, publications and insights schemas", () => {
    const result = validateStaticData();
    expect(result.ok, result.errors.join("\n")).toBe(true);
  });
});

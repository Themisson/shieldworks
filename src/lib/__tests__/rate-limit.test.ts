import { afterEach, describe, expect, it } from "vitest";
import { __resetRateLimitForTests, checkRateLimit } from "@/lib/rate-limit";

afterEach(() => {
  __resetRateLimitForTests();
});

describe("checkRateLimit", () => {
  it("allows requests under the limit", () => {
    const first = checkRateLimit("test-ip", 3, 60_000);
    const second = checkRateLimit("test-ip", 3, 60_000);
    expect(first.allowed).toBe(true);
    expect(second.allowed).toBe(true);
  });

  it("blocks after max requests", () => {
    checkRateLimit("burst-ip", 2, 60_000);
    checkRateLimit("burst-ip", 2, 60_000);
    const blocked = checkRateLimit("burst-ip", 2, 60_000);
    expect(blocked.allowed).toBe(false);
    expect(blocked.remaining).toBe(0);
  });
});

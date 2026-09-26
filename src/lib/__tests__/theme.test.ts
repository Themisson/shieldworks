import { describe, expect, it } from "vitest";
import { THEME_INIT_SCRIPT, THEME_KEY } from "@/lib/theme";

/** Runs the head script against a minimal window/document. */
function boot(
  saved: string | null,
  systemDark: boolean,
  storageThrows = false,
) {
  const attributes: Record<string, string> = {};
  const reads: string[] = [];
  const writes: string[] = [];
  const window = {
    localStorage: {
      getItem(key: string) {
        if (storageThrows) throw new Error("blocked");
        reads.push(key);
        return saved;
      },
      setItem(key: string) {
        writes.push(key);
      },
    },
    matchMedia: (query: string) => ({
      matches: query.includes("dark") && systemDark,
    }),
  };
  const document = {
    documentElement: {
      setAttribute(name: string, value: string) {
        attributes[name] = value;
      },
    },
  };
  new Function("window", "document", THEME_INIT_SCRIPT)(window, document);
  return { theme: attributes["data-theme"], reads, writes };
}

describe("theme bootstrap", () => {
  it("follows the system when nothing is saved", () => {
    expect(boot(null, true).theme).toBe("dark");
    expect(boot(null, false).theme).toBe("light");
  });
  it("lets an explicit choice win over the system", () => {
    expect(boot("light", true).theme).toBe("light");
    expect(boot("dark", false).theme).toBe("dark");
  });
  it("ignores tampered values and blocked storage", () => {
    expect(boot("purple", true).theme).toBe("dark");
    expect(boot(null, false, true).theme).toBe("light");
  });
  it("reads only its own key and never writes", () => {
    const run = boot("dark", false);
    expect(run.reads).toEqual([THEME_KEY]);
    expect(run.writes).toEqual([]);
  });
});

import { describe, expect, it } from "vitest";
import { buildEmailBodies, escapeHtml, formatOptional } from "@/lib/email";

describe("email helpers", () => {
  it("escapes html", () => {
    expect(escapeHtml(`<a href="x">y&z</a>`)).toContain("&lt;a");
    expect(escapeHtml(`<a href="x">y&z</a>`)).toContain("&amp;");
  });

  it("formats optional values", () => {
    expect(formatOptional("  ok ")).toBe("ok");
    expect(formatOptional("")).toBe("Não informado");
    expect(formatOptional(undefined)).toBe("Não informado");
  });

  it("builds text and html bodies", () => {
    const { text, html } = buildEmailBodies("Assunto", "Intro", [
      ["Nome", "Ana"],
      ["Mensagem", "Olá <b>"]
    ]);
    expect(text).toContain("Nome: Ana");
    expect(html).toContain("Assunto");
    expect(html).toContain("&lt;b");
  });
});

import { describe, expect, it } from "vitest";
import {
  isHoneypotTripped,
  validateContactPayload,
  validateFeedbackPayload
} from "@/lib/form-validation";

const validContact = {
  name: "Maria Silva",
  email: "maria@example.com",
  interest: "Engenharia computacional",
  message: "Preciso de apoio em modelagem numérica."
};

describe("validateContactPayload", () => {
  it("accepts a valid payload", () => {
    const result = validateContactPayload(validContact);
    expect(result.error).toBeUndefined();
    expect(result.data?.name).toBe("Maria Silva");
  });

  it("rejects missing name", () => {
    const result = validateContactPayload({ ...validContact, name: "" });
    expect(result.error).toMatch(/nome/i);
  });

  it("rejects invalid email", () => {
    const result = validateContactPayload({ ...validContact, email: "not-an-email" });
    expect(result.error).toMatch(/e-mail/i);
  });

  it("rejects unknown interest", () => {
    const result = validateContactPayload({ ...validContact, interest: "Alienigena" });
    expect(result.error).toMatch(/interesse/i);
  });

  it("rejects oversized message", () => {
    const result = validateContactPayload({ ...validContact, message: "x".repeat(4001) });
    expect(result.error).toMatch(/tamanho/i);
  });

  it("flags honeypot when website is filled", () => {
    expect(isHoneypotTripped({ ...validContact, website: "http://spam.test" })).toBe(true);
    const result = validateContactPayload({ ...validContact, website: "http://spam.test" });
    expect(result.error).toBe("honeypot");
  });
});

describe("validateFeedbackPayload", () => {
  it("accepts valid feedback", () => {
    const result = validateFeedbackPayload({
      rating: 5,
      interest: "Pesquisa aplicada",
      comment: "Ótimo conteúdo."
    });
    expect(result.error).toBeUndefined();
    expect(result.data?.rating).toBe(5);
  });

  it("rejects rating outside 1-5", () => {
    const result = validateFeedbackPayload({ rating: 0, interest: "Pesquisa aplicada" });
    expect(result.error).toMatch(/nota/i);
  });

  it("allows empty optional email", () => {
    const result = validateFeedbackPayload({ rating: 4, interest: "Sistemas institucionais", email: "" });
    expect(result.error).toBeUndefined();
  });

  it("rejects invalid optional email", () => {
    const result = validateFeedbackPayload({
      rating: 4,
      interest: "Sistemas institucionais",
      email: "bad"
    });
    expect(result.error).toMatch(/e-mail/i);
  });
});

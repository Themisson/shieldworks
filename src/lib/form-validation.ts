import { interestOptions } from "@/data/site";

export type ContactPayload = {
  name: string;
  email: string;
  phone?: string;
  institution?: string;
  interest: string;
  message: string;
};

export type FeedbackPayload = {
  name?: string;
  email?: string;
  rating: number;
  interest: string;
  comment?: string;
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function asString(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function isKnownInterest(value: string) {
  return interestOptions.includes(value);
}

export function validateContactPayload(input: unknown): { data?: ContactPayload; error?: string } {
  if (!input || typeof input !== "object") {
    return { error: "Dados inválidos." };
  }

  const payload = input as Record<string, unknown>;
  const data: ContactPayload = {
    name: asString(payload.name),
    email: asString(payload.email),
    phone: asString(payload.phone),
    institution: asString(payload.institution),
    interest: asString(payload.interest),
    message: asString(payload.message)
  };

  if (!data.name) {
    return { error: "Informe o nome." };
  }

  if (!emailPattern.test(data.email)) {
    return { error: "Informe um e-mail válido." };
  }

  if (!isKnownInterest(data.interest)) {
    return { error: "Selecione uma área de interesse válida." };
  }

  if (!data.message) {
    return { error: "Informe a mensagem." };
  }

  return { data };
}

export function validateFeedbackPayload(input: unknown): { data?: FeedbackPayload; error?: string } {
  if (!input || typeof input !== "object") {
    return { error: "Dados inválidos." };
  }

  const payload = input as Record<string, unknown>;
  const rating = Number(payload.rating);
  const email = asString(payload.email);
  const data: FeedbackPayload = {
    name: asString(payload.name),
    email,
    rating,
    interest: asString(payload.interest),
    comment: asString(payload.comment)
  };

  if (email && !emailPattern.test(email)) {
    return { error: "Informe um e-mail válido ou deixe o campo em branco." };
  }

  if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
    return { error: "Informe uma nota entre 1 e 5." };
  }

  if (!isKnownInterest(data.interest)) {
    return { error: "Selecione uma área de interesse válida." };
  }

  return { data };
}

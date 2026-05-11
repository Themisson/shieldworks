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
    return { error: "Dados invalidos." };
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

  if (data.name.length < 3) {
    return { error: "Informe um nome com pelo menos 3 caracteres." };
  }

  if (!emailPattern.test(data.email)) {
    return { error: "Informe um e-mail valido." };
  }

  if (!isKnownInterest(data.interest)) {
    return { error: "Selecione uma area de interesse valida." };
  }

  if (data.message.length < 10) {
    return { error: "Descreva a demanda com pelo menos 10 caracteres." };
  }

  return { data };
}

export function validateFeedbackPayload(input: unknown): { data?: FeedbackPayload; error?: string } {
  if (!input || typeof input !== "object") {
    return { error: "Dados invalidos." };
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
    return { error: "Informe um e-mail valido ou deixe o campo em branco." };
  }

  if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
    return { error: "Informe uma nota entre 1 e 5." };
  }

  if (!isKnownInterest(data.interest)) {
    return { error: "Selecione uma area de interesse valida." };
  }

  return { data };
}

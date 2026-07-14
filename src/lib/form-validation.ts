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
const MAX_NAME = 120;
const MAX_EMAIL = 254;
const MAX_PHONE = 40;
const MAX_INSTITUTION = 160;
const MAX_MESSAGE = 4000;
const MAX_COMMENT = 2000;

function asString(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function isKnownInterest(value: string) {
  return (interestOptions as readonly string[]).includes(value);
}

/** Honeypot field must be empty (bots often fill hidden fields). */
export function isHoneypotTripped(input: unknown) {
  if (!input || typeof input !== "object") {
    return false;
  }

  const payload = input as Record<string, unknown>;
  const honey = asString(payload.website ?? payload.company_url ?? payload.honeypot);
  return honey.length > 0;
}

export function validateContactPayload(input: unknown): { data?: ContactPayload; error?: string } {
  if (!input || typeof input !== "object") {
    return { error: "Dados inválidos." };
  }

  if (isHoneypotTripped(input)) {
    return { error: "honeypot" };
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

  if (data.name.length > MAX_NAME) {
    return { error: "Nome excede o tamanho permitido." };
  }

  if (!emailPattern.test(data.email) || data.email.length > MAX_EMAIL) {
    return { error: "Informe um e-mail válido." };
  }

  if (data.phone && data.phone.length > MAX_PHONE) {
    return { error: "Telefone excede o tamanho permitido." };
  }

  if (data.institution && data.institution.length > MAX_INSTITUTION) {
    return { error: "Instituição excede o tamanho permitido." };
  }

  if (!isKnownInterest(data.interest)) {
    return { error: "Selecione uma área de interesse válida." };
  }

  if (!data.message) {
    return { error: "Informe a mensagem." };
  }

  if (data.message.length > MAX_MESSAGE) {
    return { error: "Mensagem excede o tamanho permitido." };
  }

  return { data };
}

export function validateFeedbackPayload(input: unknown): { data?: FeedbackPayload; error?: string } {
  if (!input || typeof input !== "object") {
    return { error: "Dados inválidos." };
  }

  if (isHoneypotTripped(input)) {
    return { error: "honeypot" };
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

  if (data.name && data.name.length > MAX_NAME) {
    return { error: "Nome excede o tamanho permitido." };
  }

  if (email && (!emailPattern.test(email) || email.length > MAX_EMAIL)) {
    return { error: "Informe um e-mail válido ou deixe o campo em branco." };
  }

  if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
    return { error: "Informe uma nota entre 1 e 5." };
  }

  if (!isKnownInterest(data.interest)) {
    return { error: "Selecione uma área de interesse válida." };
  }

  if (data.comment && data.comment.length > MAX_COMMENT) {
    return { error: "Comentário excede o tamanho permitido." };
  }

  return { data };
}

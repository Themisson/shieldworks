"use client";

import { useState, type FormEvent } from "react";
import { Send } from "lucide-react";
import { interestOptions } from "@/data/site";
import { useLocale } from "@/i18n/locale-provider";

type FormStatus = {
  type: "idle" | "loading" | "success" | "error";
  message: string;
};

const initialStatus: FormStatus = { type: "idle", message: "" };

function formDataToObject(form: HTMLFormElement) {
  return Object.fromEntries(new FormData(form).entries());
}

async function submitForm(endpoint: string, form: HTMLFormElement) {
  const response = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formDataToObject(form))
  });
  const body = (await response.json().catch(() => null)) as { message?: string } | null;

  if (!response.ok) {
    throw new Error(body?.message || "Não foi possível enviar os dados.");
  }

  return body?.message || "Dados enviados com sucesso.";
}

function StatusMessage({ status }: { status: FormStatus }) {
  if (status.type === "idle") {
    return null;
  }

  const className =
    status.type === "success"
      ? "border-signal/20 bg-signal/10 text-petroleum-900"
      : status.type === "error"
        ? "border-red-200 bg-red-50 text-red-800"
        : "border-graphite-100 bg-graphite-50 text-graphite-600";

  return (
    <div className={`mt-5 rounded-md border px-4 py-3 text-sm ${className}`} aria-live="polite">
      {status.message}
    </div>
  );
}

export function ContactForm() {
  const [status, setStatus] = useState<FormStatus>(initialStatus);
  const { t } = useLocale();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setStatus({ type: "loading", message: t("Enviando mensagem...") });

    try {
      const message = await submitForm("/api/contact", form);
      form.reset();
      setStatus({ type: "success", message });
    } catch (error) {
      setStatus({ type: "error", message: error instanceof Error ? error.message : "Erro inesperado." });
    }
  }

  return (
    <form className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm" aria-label={t("Formulário de contato")} onSubmit={handleSubmit}>
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label className="label" htmlFor="name">{t("Nome")}</label>
          <input className="field mt-2" id="name" name="name" type="text" autoComplete="name" required />
        </div>
        <div>
          <label className="label" htmlFor="email">{t("E-mail")}</label>
          <input className="field mt-2" id="email" name="email" type="email" autoComplete="email" required />
        </div>
        <div>
          <label className="label" htmlFor="phone">{t("Telefone/WhatsApp")}</label>
          <input className="field mt-2" id="phone" name="phone" type="tel" autoComplete="tel" />
        </div>
        <div>
          <label className="label" htmlFor="institution">{t("Instituição, se houver")}</label>
          <input className="field mt-2" id="institution" name="institution" type="text" />
        </div>
        <div>
          <label className="label" htmlFor="interest">{t("Área de interesse")}</label>
          <select className="field mt-2" id="interest" name="interest" defaultValue="" required>
            <option value="" disabled>{t("Selecione uma área")}</option>
            {interestOptions.map((option) => (
              <option key={option} value={option}>{t(option)}</option>
            ))}
          </select>
        </div>
        <div className="sm:col-span-2">
          <label className="label" htmlFor="message">{t("Mensagem")}</label>
          <textarea className="field mt-2 min-h-36" id="message" name="message" required />
        </div>
      </div>
      <p className="mt-4 text-xs leading-5 text-graphite-500">
        {t("As informações enviadas serão utilizadas exclusivamente para análise da demanda e retorno profissional.")}
      </p>
      <StatusMessage status={status} />
      <button className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-md bg-petroleum-700 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-petroleum-900 disabled:cursor-not-allowed disabled:opacity-70" type="submit" disabled={status.type === "loading"}>
        <Send className="h-4 w-4" aria-hidden="true" />
        {status.type === "loading" ? t("Enviando...") : t("Enviar mensagem")}
      </button>
    </form>
  );
}

type FeedbackFormProps = {
  className?: string;
  onSuccess?: () => void;
};

export function FeedbackForm({ className = "", onSuccess }: FeedbackFormProps) {
  const [status, setStatus] = useState<FormStatus>(initialStatus);
  const { t } = useLocale();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setStatus({ type: "loading", message: t("Registrando feedback...") });

    try {
      const message = await submitForm("/api/feedback", form);
      form.reset();
      setStatus({ type: "success", message });
      onSuccess?.();
    } catch (error) {
      setStatus({ type: "error", message: error instanceof Error ? error.message : "Erro inesperado." });
    }
  }

  return (
    <form
      className={`rounded-2xl border border-slate-200/80 bg-slate-50 p-6 shadow-sm ${className}`}
      aria-label={t("Formulário de opinião")}
      onSubmit={handleSubmit}
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="label" htmlFor="feedback-name">{t("Nome opcional")}</label>
          <input className="field mt-2" id="feedback-name" name="name" type="text" />
        </div>
        <div>
          <label className="label" htmlFor="feedback-email">{t("E-mail opcional")}</label>
          <input className="field mt-2" id="feedback-email" name="email" type="email" />
        </div>
        <div>
          <label className="label" htmlFor="rating">{t("Nota de 1 a 5")}</label>
          <select className="field mt-2" id="rating" name="rating" defaultValue="5">
            {[1, 2, 3, 4, 5].map((rating) => (
              <option key={rating} value={rating}>{rating}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="label" htmlFor="feedback-interest">{t("Área de interesse")}</label>
          <select className="field mt-2" id="feedback-interest" name="interest" defaultValue="" required>
            <option value="" disabled>{t("Selecione uma área")}</option>
            {interestOptions.map((option) => (
              <option key={option} value={option}>{t(option)}</option>
            ))}
          </select>
        </div>
        <div className="sm:col-span-2">
          <label className="label" htmlFor="comment">{t("Comentário")}</label>
          <textarea className="field mt-2 min-h-28" id="comment" name="comment" />
        </div>
      </div>
      <StatusMessage status={status} />
      <button className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-md border border-petroleum-700 px-5 py-2.5 text-sm font-semibold text-petroleum-900 transition hover:bg-petroleum-50 disabled:cursor-not-allowed disabled:opacity-70" type="submit" disabled={status.type === "loading"}>
        {status.type === "loading" ? t("Enviando...") : t("Enviar feedback")}
      </button>
    </form>
  );
}

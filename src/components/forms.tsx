"use client";

import { useState, type FormEvent } from "react";
import { Loader2, Send } from "lucide-react";
import { interestOptions } from "@/data/site";
import { useLocale } from "@/i18n/locale-provider";
import { trackEvent } from "@/lib/analytics";

type FormStatus = {
  type: "idle" | "loading" | "success" | "error";
  message: string;
};

type ContactFieldErrors = Partial<Record<"name" | "email" | "interest" | "message", string>>;

const initialStatus: FormStatus = { type: "idle", message: "" };
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function formDataToObject(form: HTMLFormElement) {
  return Object.fromEntries(new FormData(form).entries());
}

async function submitForm(endpoint: string, form: HTMLFormElement) {
  const response = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formDataToObject(form))
  });
  const data = (await response.json().catch(() => null)) as { ok?: boolean; message?: string } | null;

  if (!response.ok) {
    throw new Error(data?.message ?? "Não foi possível enviar os dados.");
  }

  return data?.message ?? "Dados enviados com sucesso.";
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

function requiredLabel(label: string) {
  return (
    <>
      {label} <span aria-hidden="true">*</span>
    </>
  );
}

function fieldClassName(hasError: boolean) {
  return `field mt-2 ${hasError ? "border-red-300 bg-red-50/40 focus:border-red-400 focus:ring-red-100" : ""}`;
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) {
    return null;
  }

  return (
    <p id={id} className="mt-1.5 text-xs leading-5 text-red-700">
      {message}
    </p>
  );
}

/** Hidden honeypot — leave empty. Visible only to bots that autofill every field. */
function HoneypotField({ id }: { id: string }) {
  return (
    <div
      aria-hidden="true"
      className="absolute -left-[9999px] h-0 w-0 overflow-hidden opacity-0"
      tabIndex={-1}
    >
      <label htmlFor={id}>Website</label>
      <input id={id} name="website" type="text" autoComplete="off" tabIndex={-1} defaultValue="" />
    </div>
  );
}

export function ContactForm() {
  const [status, setStatus] = useState<FormStatus>(initialStatus);
  const [fieldErrors, setFieldErrors] = useState<ContactFieldErrors>({});
  const { t } = useLocale();

  function validateRequiredFields(form: HTMLFormElement) {
    const data = formDataToObject(form) as Record<string, FormDataEntryValue>;
    const errors: ContactFieldErrors = {};

    if (!String(data.name ?? "").trim()) {
      errors.name = t("form.required");
    }

    const email = String(data.email ?? "").trim();
    if (!email) {
      errors.email = t("form.required");
    } else if (!emailPattern.test(email)) {
      errors.email = t("form.invalid_email");
    }

    if (!String(data.interest ?? "").trim()) {
      errors.interest = t("form.required");
    }

    if (!String(data.message ?? "").trim()) {
      errors.message = t("form.required");
    }

    return errors;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const errors = validateRequiredFields(form);

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      setStatus({ type: "error", message: t("form.required_contact") });
      return;
    }

    setFieldErrors({});
    setStatus({ type: "loading", message: t("form.sending_message") });
    trackEvent("contact_form_submit");

    try {
      const message = await submitForm("/api/contact", form);
      form.reset();
      setStatus({ type: "success", message });
      trackEvent("contact_form_success");
    } catch (error) {
      setStatus({ type: "error", message: error instanceof Error ? error.message : "Erro inesperado." });
      trackEvent("contact_form_error");
    }
  }

  return (
    <form
      className="relative rounded-2xl border border-graphite-100/80 bg-white p-6 shadow-card"
      aria-label={t("form.contact_aria")}
      onSubmit={handleSubmit}
      noValidate
    >
      <HoneypotField id="contact-website" />
      <p className="mb-5 text-xs leading-5 text-graphite-500">{t("form.required_hint")}</p>
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label className="label" htmlFor="name">{requiredLabel(t("form.name"))}</label>
          <input
            className={fieldClassName(Boolean(fieldErrors.name))}
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            required
            maxLength={120}
            aria-invalid={Boolean(fieldErrors.name)}
            aria-describedby={fieldErrors.name ? "name-error" : undefined}
          />
          <FieldError id="name-error" message={fieldErrors.name} />
        </div>
        <div>
          <label className="label" htmlFor="email">{requiredLabel(t("form.email"))}</label>
          <input
            className={fieldClassName(Boolean(fieldErrors.email))}
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            maxLength={254}
            aria-invalid={Boolean(fieldErrors.email)}
            aria-describedby={fieldErrors.email ? "email-error" : undefined}
          />
          <FieldError id="email-error" message={fieldErrors.email} />
        </div>
        <div>
          <label className="label" htmlFor="phone">{t("form.phone")}</label>
          <input className="field mt-2" id="phone" name="phone" type="tel" autoComplete="tel" maxLength={40} />
        </div>
        <div>
          <label className="label" htmlFor="institution">{t("form.institution")}</label>
          <input
            className="field mt-2"
            id="institution"
            name="institution"
            type="text"
            autoComplete="organization"
            maxLength={160}
          />
        </div>
        <div>
          <label className="label" htmlFor="interest">{requiredLabel(t("form.interest"))}</label>
          <select
            className={fieldClassName(Boolean(fieldErrors.interest))}
            id="interest"
            name="interest"
            defaultValue=""
            required
            aria-invalid={Boolean(fieldErrors.interest)}
            aria-describedby={fieldErrors.interest ? "interest-error" : undefined}
          >
            <option value="" disabled>{t("form.select_area")}</option>
            {interestOptions.map((option) => (
              <option key={option} value={option}>{t(option)}</option>
            ))}
          </select>
          <FieldError id="interest-error" message={fieldErrors.interest} />
        </div>
        <div className="sm:col-span-2">
          <label className="label" htmlFor="message">{requiredLabel(t("form.message"))}</label>
          <textarea
            className={`${fieldClassName(Boolean(fieldErrors.message))} min-h-36`}
            id="message"
            name="message"
            required
            maxLength={4000}
            aria-invalid={Boolean(fieldErrors.message)}
            aria-describedby={fieldErrors.message ? "message-error" : undefined}
          />
          <FieldError id="message-error" message={fieldErrors.message} />
        </div>
      </div>
      <p className="mt-4 text-xs leading-5 text-graphite-500">
        {t("form.privacy_note")}
      </p>
      <StatusMessage status={status} />
      <button
        className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-xl bg-petroleum-800 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition duration-200 hover:bg-petroleum-900 hover:shadow-md focus:outline-none focus-visible:ring-4 focus-visible:ring-petroleum-100 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70"
        type="submit"
        disabled={status.type === "loading"}
        aria-busy={status.type === "loading"}
      >
        {status.type === "loading"
          ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
          : <Send className="h-4 w-4" aria-hidden="true" />}
        {status.type === "loading" ? t("form.sending") : t("form.send")}
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
    setStatus({ type: "loading", message: t("form.sending_feedback") });
    trackEvent("feedback_form_submit");

    try {
      const message = await submitForm("/api/feedback", form);
      form.reset();
      setStatus({ type: "success", message });
      trackEvent("feedback_form_success");
      onSuccess?.();
    } catch (error) {
      setStatus({ type: "error", message: error instanceof Error ? error.message : "Erro inesperado." });
      trackEvent("feedback_form_error");
    }
  }

  return (
    <form
      className={`relative rounded-2xl border border-graphite-100/80 bg-graphite-50/60 p-6 shadow-card ${className}`}
      aria-label={t("form.feedback_aria")}
      onSubmit={handleSubmit}
    >
      <HoneypotField id="feedback-website" />
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="label" htmlFor="feedback-name">{t("form.name_optional")}</label>
          <input className="field mt-2" id="feedback-name" name="name" type="text" maxLength={120} />
        </div>
        <div>
          <label className="label" htmlFor="feedback-email">{t("form.email_optional")}</label>
          <input className="field mt-2" id="feedback-email" name="email" type="email" maxLength={254} />
        </div>
        <div>
          <label className="label" htmlFor="rating">{t("form.rating")}</label>
          <select className="field mt-2" id="rating" name="rating" defaultValue="5">
            {[1, 2, 3, 4, 5].map((rating) => (
              <option key={rating} value={rating}>{rating}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="label" htmlFor="feedback-interest">{t("form.interest")}</label>
          <select className="field mt-2" id="feedback-interest" name="interest" defaultValue="" required>
            <option value="" disabled>{t("form.select_area")}</option>
            {interestOptions.map((option) => (
              <option key={option} value={option}>{t(option)}</option>
            ))}
          </select>
        </div>
        <div className="sm:col-span-2">
          <label className="label" htmlFor="comment">{t("form.comment")}</label>
          <textarea className="field mt-2 min-h-28" id="comment" name="comment" maxLength={2000} />
        </div>
      </div>
      <StatusMessage status={status} />
      <button
        className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-xl border border-petroleum-200 bg-white px-5 py-2.5 text-sm font-semibold text-petroleum-900 shadow-sm transition duration-200 hover:border-petroleum-400 hover:bg-petroleum-50 focus:outline-none focus-visible:ring-4 focus-visible:ring-petroleum-100 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70"
        type="submit"
        disabled={status.type === "loading"}
        aria-busy={status.type === "loading"}
      >
        {status.type === "loading" && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
        {status.type === "loading" ? t("form.sending") : t("form.send_feedback")}
      </button>
    </form>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import { MessageSquare, X } from "lucide-react";
import { FeedbackForm } from "@/components/forms";
import { useLocale } from "@/i18n/locale-provider";

export function FloatingFeedback() {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useLocale();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  function closeModal() {
    setIsOpen(false);
  }

  function handleSuccess() {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
    }

    closeTimerRef.current = setTimeout(() => {
      closeModal();
    }, 1400);
  }

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    const triggerButton = buttonRef.current;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        closeModal();
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
      triggerButton?.focus();
    };
  }, [isOpen]);

  useEffect(() => {
    return () => {
      if (closeTimerRef.current) {
        clearTimeout(closeTimerRef.current);
      }
    };
  }, []);

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        className="group fixed bottom-4 right-4 z-50 inline-flex h-12 w-12 items-center justify-center rounded-full bg-slate-900 text-white shadow-lg transition-all duration-200 hover:-translate-y-0.5 hover:bg-slate-800 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 sm:bottom-6 sm:right-6"
        aria-label={t("Abrir formulário de feedback")}
        aria-expanded={isOpen}
        aria-controls="feedback-modal"
        onClick={() => setIsOpen(true)}
      >
        <MessageSquare className="h-5 w-5" aria-hidden="true" />
        <span className="pointer-events-none absolute bottom-full right-0 mb-3 hidden whitespace-nowrap rounded-md bg-slate-950 px-3 py-1.5 text-xs font-medium text-white shadow-sm group-hover:block group-focus-visible:block">
          {t("Enviar feedback")}
        </span>
      </button>

      {isOpen ? (
        <div
          className="fixed inset-0 z-[60] flex items-end justify-center bg-slate-950/45 px-4 py-4 backdrop-blur-sm sm:items-center sm:py-8"
          role="presentation"
          onMouseDown={closeModal}
        >
          <section
            id="feedback-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="feedback-modal-title"
            aria-describedby="feedback-modal-description"
            className="max-h-[calc(100vh-2rem)] w-full max-w-2xl overflow-y-auto rounded-2xl border border-slate-200 bg-white p-5 shadow-2xl sm:p-6"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4 border-b border-slate-200 pb-4">
              <div>
                <h2 id="feedback-modal-title" className="text-lg font-semibold tracking-tight text-slate-950">
                  {t("Enviar feedback")}
                </h2>
                <p id="feedback-modal-description" className="mt-2 text-sm leading-6 text-slate-600">
                  {t("Sua opinião ajuda a melhorar a experiência, os conteúdos e as soluções apresentadas no site.")}
                </p>
              </div>
              <button
                ref={closeButtonRef}
                type="button"
                className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-slate-200 text-slate-700 transition hover:bg-slate-50 hover:text-slate-950 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2"
                aria-label={t("Fechar formulário de feedback")}
                onClick={closeModal}
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
            <FeedbackForm className="mt-5 border-0 bg-white p-0 shadow-none" onSuccess={handleSuccess} />
          </section>
        </div>
      ) : null}
    </>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import { MessageSquare, X } from "lucide-react";
import { FeedbackForm } from "@/components/forms";
import { useLocale } from "@/i18n/locale-provider";

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function FloatingFeedback() {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useLocale();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLElement>(null);
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
    const dialog = dialogRef.current;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        closeModal();
        return;
      }

      if (event.key !== "Tab" || !dialog) {
        return;
      }

      const focusable = Array.from(dialog.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)).filter(
        (el) => !el.hasAttribute("disabled") && el.tabIndex !== -1 && el.offsetParent !== null
      );

      if (focusable.length === 0) {
        event.preventDefault();
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement as HTMLElement | null;

      if (event.shiftKey && active === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
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
        className="group fixed bottom-4 right-4 z-50 inline-flex h-12 w-12 items-center justify-center rounded-full bg-petroleum-900 text-white shadow-lift transition duration-200 ease-out hover:-translate-y-0.5 hover:bg-petroleum-800 hover:shadow-glow focus:outline-none focus-visible:ring-2 focus-visible:ring-petroleum-400 focus-visible:ring-offset-2 active:scale-[0.98] sm:bottom-6 sm:right-6"
        aria-label={t("feedback.open")}
        aria-expanded={isOpen}
        aria-controls="feedback-modal"
        onClick={() => setIsOpen(true)}
      >
        <MessageSquare className="h-5 w-5" aria-hidden="true" />
        <span className="pointer-events-none absolute bottom-full right-0 mb-3 hidden whitespace-nowrap rounded-xl bg-graphite-900 px-3 py-1.5 text-xs font-medium text-white shadow-sm group-hover:block group-focus-visible:block">
          {t("form.send_feedback")}
        </span>
      </button>

      {isOpen ? (
        <div
          className="fixed inset-0 z-[60] flex items-end justify-center bg-graphite-950/45 px-4 py-4 backdrop-blur-sm sm:items-center sm:py-8"
          role="presentation"
          onMouseDown={closeModal}
        >
          <section
            ref={dialogRef}
            id="feedback-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="feedback-modal-title"
            aria-describedby="feedback-modal-description"
            className="max-h-[calc(100dvh-2rem)] w-full max-w-2xl overflow-y-auto rounded-2xl border border-graphite-100 bg-white p-5 shadow-lift sm:p-6"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4 border-b border-graphite-100 pb-4">
              <div>
                <h2 id="feedback-modal-title" className="text-lg font-semibold tracking-tight text-graphite-900">
                  {t("form.send_feedback")}
                </h2>
                <p id="feedback-modal-description" className="mt-2 text-sm leading-6 text-graphite-600">
                  {t("feedback.description")}
                </p>
              </div>
              <button
                ref={closeButtonRef}
                type="button"
                className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-graphite-100 text-graphite-700 transition hover:bg-graphite-50 hover:text-graphite-950 focus:outline-none focus-visible:ring-2 focus-visible:ring-petroleum-400 focus-visible:ring-offset-2"
                aria-label={t("feedback.close")}
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

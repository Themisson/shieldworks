"use client";

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { localeLabels, translate, translations, type Locale } from "@/i18n/translations";

type LocaleContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  /** Translate by semantic key (preferred) or Portuguese source text (fallback). */
  t: (key: string) => string;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);
const originalText = new WeakMap<Text, string>();

function translateDocument(locale: Locale) {
  if (typeof document === "undefined") {
    return;
  }

  document.documentElement.lang = locale === "pt" ? "pt-BR" : "en";

  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      const parent = node.parentElement;
      if (!parent || ["SCRIPT", "STYLE", "TEXTAREA", "INPUT", "CODE"].includes(parent.tagName)) {
        return NodeFilter.FILTER_REJECT;
      }
      return node.textContent?.trim() ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
    }
  });

  const nodes: Text[] = [];
  while (walker.nextNode()) {
    nodes.push(walker.currentNode as Text);
  }

  nodes.forEach((node) => {
    if (!originalText.has(node)) {
      originalText.set(node, node.textContent || "");
    }

    const source = originalText.get(node) || "";
    const trimmed = source.trim();
    // Server content is Portuguese; map PT -> EN via dictionary built from message keys
    const translated = locale === "en" ? translations[trimmed] : undefined;

    node.textContent = translated ? source.replace(trimmed, translated) : source;
  });
}

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(() => {
    if (typeof window === "undefined") {
      return "pt";
    }
    const storedLocale = window.localStorage.getItem("shieldworks-locale") as Locale | null;
    const browserLocale: Locale = navigator.language.toLowerCase().startsWith("en") ? "en" : "pt";
    return storedLocale === "en" || storedLocale === "pt" ? storedLocale : browserLocale;
  });

  useEffect(() => {
    translateDocument(locale);
  }, [locale]);

  const value = useMemo<LocaleContextValue>(
    () => ({
      locale,
      setLocale(nextLocale) {
        window.localStorage.setItem("shieldworks-locale", nextLocale);
        setLocaleState(nextLocale);
      },
      t(key) {
        return translate(key, locale);
      }
    }),
    [locale]
  );

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale() {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error("useLocale must be used inside LocaleProvider");
  }
  return context;
}

export function LanguageToggle() {
  const { locale, setLocale } = useLocale();

  return (
    <div
      className="inline-flex rounded-xl border border-graphite-100 bg-white p-1 shadow-sm"
      aria-label={locale === "en" ? "Select language" : "Selecionar idioma"}
    >
      {(["pt", "en"] as Locale[]).map((item) => (
        <button
          key={item}
          type="button"
          className={`min-h-8 rounded-lg px-2.5 text-xs font-semibold transition duration-200 ${
            locale === item ? "bg-petroleum-800 text-white shadow-sm" : "text-graphite-600 hover:bg-graphite-50"
          }`}
          aria-pressed={locale === item}
          onClick={() => setLocale(item)}
        >
          {localeLabels[item]}
        </button>
      ))}
    </div>
  );
}

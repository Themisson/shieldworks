"use client";

import { createContext, useContext, useMemo, type ReactNode } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { translate, type Locale } from "@/i18n/translations";
import { localizedPath, stripLocale } from "@/i18n/routing";

type LocaleContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
};
const LocaleContext = createContext<LocaleContextValue | null>(null);

export function LocaleProvider({
  children,
  initialLocale = "pt",
}: {
  children: ReactNode;
  initialLocale?: Locale;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const value = useMemo<LocaleContextValue>(
    () => ({
      locale: initialLocale,
      setLocale(locale) {
        router.push(localizedPath(stripLocale(pathname), locale));
      },
      t(key) {
        return translate(key, initialLocale);
      },
    }),
    [initialLocale, pathname, router],
  );
  return (
    <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
  );
}

export function useLocale() {
  const context = useContext(LocaleContext);
  if (!context) throw new Error("useLocale must be used inside LocaleProvider");
  return context;
}

/** React owns text on server render and navigation. */
export function Text({ children }: { children: string }) {
  const { t } = useLocale();
  return <>{t(children)}</>;
}

export function LanguageToggle() {
  const { locale } = useLocale();
  const pathname = usePathname();
  return (
    <nav
      className="language-toggle"
      aria-label={locale === "en" ? "Language" : "Idioma"}
    >
      {(["pt", "en"] as const).map((item) => (
        <Link
          key={item}
          href={localizedPath(stripLocale(pathname), item)}
          hrefLang={item === "pt" ? "pt-BR" : "en"}
          aria-current={locale === item ? "page" : undefined}
        >
          {item.toUpperCase()}
        </Link>
      ))}
    </nav>
  );
}

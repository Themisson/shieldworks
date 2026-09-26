import type { Locale } from "@/i18n/translations";

export function stripLocale(path: string) {
  return path.replace(/^\/(en|pt)(?=\/|$)/, "") || "/";
}

export function localizedPath(path: string, locale: Locale) {
  if (
    !path.startsWith("/") ||
    path.startsWith("//") ||
    /^\/(api|_next)(\/|$)/.test(path) ||
    /\.[a-z]+(?:\?|$)/i.test(path)
  )
    return path;
  const clean = stripLocale(path);
  return locale === "en" ? `/en${clean === "/" ? "" : clean}` : clean;
}

export function isLocale(value: string): value is Locale {
  return value === "pt" || value === "en";
}

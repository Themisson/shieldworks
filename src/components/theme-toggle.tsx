"use client";

import { useSyncExternalStore } from "react";
import { Moon, Sun } from "lucide-react";
import { useLocale } from "@/i18n/locale-provider";
import { currentTheme, subscribe, toggleTheme, type Theme } from "@/lib/theme";

const serverTheme = (): Theme => "light";

/**
 * One button that names the action ("Ativar tema escuro"). Both icons are rendered and
 * CSS shows the right one from data-theme, so hydration never swaps the icon.
 */
export function ThemeToggle() {
  const theme = useSyncExternalStore(subscribe, currentTheme, serverTheme);
  const { locale } = useLocale();
  const dark = theme === "dark";
  const label =
    locale === "en"
      ? dark
        ? "Switch to light theme"
        : "Switch to dark theme"
      : dark
        ? "Ativar tema claro"
        : "Ativar tema escuro";
  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={toggleTheme}
      aria-label={label}
      title={label}
    >
      <Moon className="theme-icon theme-icon-moon" aria-hidden="true" />
      <Sun className="theme-icon theme-icon-sun" aria-hidden="true" />
    </button>
  );
}

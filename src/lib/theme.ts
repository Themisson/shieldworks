/**
 * Light/dark theme (pattern shared with AcadImprove, ADR 0009). The document carries
 * `data-theme`; without a saved choice the system preference decides. Choosing the
 * theme that matches the system clears the saved key, so the site follows it again.
 * Visual preference only: content and URLs never depend on it.
 */
export type Theme = "light" | "dark";

export const THEME_KEY = "shieldworks:theme";

export const THEME_COLORS: Record<Theme, string> = {
  light: "#f6f8f7",
  dark: "#0d171a",
};

/** Runs in <head> before first paint; reads only its own key and never writes. */
export const THEME_INIT_SCRIPT = `(function(){var t=null;try{var s=window.localStorage.getItem(${JSON.stringify(THEME_KEY)});if(s==="light"||s==="dark")t=s}catch(e){}if(!t){t=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}document.documentElement.setAttribute("data-theme",t)})();`;

const listeners = new Set<() => void>();
const SYSTEM_QUERY = "(prefers-color-scheme: dark)";

function readPreference(): Theme | null {
  try {
    const value = window.localStorage.getItem(THEME_KEY);
    if (value === "light" || value === "dark") return value;
    if (value !== null) window.localStorage.removeItem(THEME_KEY);
  } catch {
    // Storage may be unavailable (privacy modes); the system preference applies.
  }
  return null;
}

function writePreference(theme: Theme | null) {
  try {
    if (theme) window.localStorage.setItem(THEME_KEY, theme);
    else window.localStorage.removeItem(THEME_KEY);
  } catch {
    // Not persisted, but the current page still switches.
  }
}

export function systemTheme(): Theme {
  return typeof window !== "undefined" &&
    window.matchMedia?.(SYSTEM_QUERY).matches
    ? "dark"
    : "light";
}

export function currentTheme(): Theme {
  if (typeof document === "undefined") return "light";
  return document.documentElement.dataset.theme === "dark" ? "dark" : "light";
}

function apply(theme: Theme) {
  const root = document.documentElement;
  root.dataset.theme = theme;
  document
    .querySelectorAll<HTMLMetaElement>('meta[name="theme-color"]')
    .forEach((meta) => meta.setAttribute("content", THEME_COLORS[theme]));
}

function notify() {
  listeners.forEach((listener) => listener());
}

export function setTheme(theme: Theme) {
  writePreference(theme === systemTheme() ? null : theme);
  apply(theme);
  notify();
}

/** Colours cross-fade briefly on an explicit switch, never on load or reduced motion. */
export function toggleTheme() {
  const root = document.documentElement;
  const calm = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
  if (!calm) {
    root.classList.add("theme-switching");
    window.setTimeout(() => root.classList.remove("theme-switching"), 400);
  }
  setTheme(currentTheme() === "dark" ? "light" : "dark");
}

export function subscribe(listener: () => void) {
  listeners.add(listener);
  const media = window.matchMedia?.(SYSTEM_QUERY);
  // Follow the system only while the visitor has not chosen a theme.
  const follow = () => {
    if (readPreference()) return;
    apply(systemTheme());
    notify();
  };
  media?.addEventListener("change", follow);
  return () => {
    listeners.delete(listener);
    media?.removeEventListener("change", follow);
  };
}

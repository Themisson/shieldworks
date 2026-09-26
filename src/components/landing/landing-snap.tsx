"use client";

import { useEffect } from "react";

/** Native scrolling only. Mandatory is earned by measured fit, never forced on tall content. */
export function LandingSnap() {
  useEffect(() => {
    const root = document.documentElement;
    const sections = [
      ...document.querySelectorAll<HTMLElement>(".landing-screen"),
    ];
    const header = document.querySelector<HTMLElement>(".site-header");
    const desktop = window.matchMedia(
      "(min-width: 80rem) and (min-height: 50rem) and (hover: hover) and (pointer: fine)",
    );
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let alive = true;
    const measure = () => {
      const available =
        window.innerHeight - (header?.getBoundingClientRect().height ?? 72);
      const fits = sections.every(
        (section) =>
          section.getBoundingClientRect().height <= available + 2 &&
          section.scrollHeight <= available + 2,
      );
      const mode =
        desktop.matches && !reduced.matches && fits ? "mandatory" : "proximity";
      if (root.dataset.landingSnap !== mode) root.dataset.landingSnap = mode;
    };
    const schedule = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(measure);
    };
    const observer = new ResizeObserver(schedule);
    sections.forEach((section) => observer.observe(section));
    if (header) observer.observe(header);
    window.addEventListener("resize", schedule);
    desktop.addEventListener("change", schedule);
    reduced.addEventListener("change", schedule);
    document.fonts.ready.then(() => {
      if (alive) schedule();
    });
    schedule();
    return () => {
      alive = false;
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("resize", schedule);
      desktop.removeEventListener("change", schedule);
      reduced.removeEventListener("change", schedule);
      delete root.dataset.landingSnap;
    };
  }, []);
  return null;
}

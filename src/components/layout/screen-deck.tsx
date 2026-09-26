"use client";

import { useEffect } from "react";

const DESKTOP =
  "(min-width: 64rem) and (min-height: 33rem) and (hover: hover) and (pointer: fine)";

/**
 * Pages made of full-screen topics (.landing-screen inside .landing-screens).
 * 1. Mandatory snap only when every topic fits the usable height (ResizeObserver),
 *    otherwise the CSS proximity snap; native scrolling, no wheel/key interception.
 * 2. Slides: a topic that is off-screen waits "armed"; when it reaches the viewport its
 *    content slides in from the side it comes from. Visible content is never hidden,
 *    and reduced motion or missing JavaScript leave everything in place.
 */
export function ScreenDeck() {
  useEffect(() => {
    const root = document.documentElement;
    const sections = [
      ...document.querySelectorAll<HTMLElement>(".landing-screen"),
    ];
    const header = document.querySelector<HTMLElement>(".site-header");
    const desktop = window.matchMedia(DESKTOP);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let alive = true;
    const measure = () => {
      const available =
        window.innerHeight - (header?.getBoundingClientRect().height ?? 72);
      // Layout height only: slide offsets (transforms) must not count as overflow.
      const fits = sections.every(
        (section) => section.offsetHeight <= available + 2,
      );
      const mode =
        desktop.matches && !reduced.matches && fits ? "mandatory" : "proximity";
      if (root.dataset.landingSnap !== mode) root.dataset.landingSnap = mode;
    };
    const schedule = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(measure);
    };
    const resize = new ResizeObserver(schedule);
    sections.forEach((section) => resize.observe(section));
    if (header) resize.observe(header);
    window.addEventListener("resize", schedule);
    desktop.addEventListener("change", schedule);
    reduced.addEventListener("change", schedule);
    document.fonts.ready.then(() => {
      if (alive) schedule();
    });
    schedule();

    // Arm only topics that are completely off-screen, so nothing visible disappears.
    // Show when the topic's edge passes 15% into the viewport (not after a ratio of a
    // possibly very tall section), so a phone never shows an empty band.
    const supported = "IntersectionObserver" in window;
    const arm = supported
      ? new IntersectionObserver((entries) => {
          for (const entry of entries) {
            const section = entry.target as HTMLElement;
            if (entry.isIntersecting || reduced.matches) continue;
            section.dataset.slideFrom =
              entry.boundingClientRect.top < 0 ? "above" : "below";
            section.dataset.slide = "armed";
          }
        }, { rootMargin: "-2px 0px -2px 0px" })
      : null;
    const show = supported
      ? new IntersectionObserver(
          (entries) => {
            for (const entry of entries) {
              const section = entry.target as HTMLElement;
              if (entry.isIntersecting && section.dataset.slide === "armed")
                section.dataset.slide = "in";
            }
          },
          { rootMargin: "-15% 0px -15% 0px" },
        )
      : null;
    sections.forEach((section) => {
      arm?.observe(section);
      show?.observe(section);
    });
    return () => {
      alive = false;
      cancelAnimationFrame(frame);
      resize.disconnect();
      arm?.disconnect();
      show?.disconnect();
      window.removeEventListener("resize", schedule);
      desktop.removeEventListener("change", schedule);
      reduced.removeEventListener("change", schedule);
      delete root.dataset.landingSnap;
      sections.forEach((section) => {
        delete section.dataset.slide;
        delete section.dataset.slideFrom;
      });
    };
  }, []);
  return null;
}

"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import type { SceneVariant } from "./scene-artwork";

const STEP_MS = 2600;

/**
 * Client shell for a server-rendered drawing. It only toggles data attributes:
 * the artwork itself never ships as JavaScript and stays complete without it.
 */
export function SceneFrame({
  kind,
  variant,
  steps,
  note,
  pause,
  resume,
  legend,
  children,
}: {
  kind: string;
  variant: SceneVariant;
  steps: number;
  note: string;
  pause: string;
  resume: string;
  legend?: ReactNode;
  children: ReactNode;
}) {
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [paused, setPaused] = useState(false);
  const [holding, setHolding] = useState(false);
  const [step, setStep] = useState(0);
  const playing = inView && !hidden && !reduced && !paused;
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    // The reader's pointer or focus on numbered copy takes over from the sequence.
    const scope = node.closest("section") ?? node;
    const linked = (event: Event) =>
      event.target instanceof Element && !!event.target.closest("[data-focus]");
    const hold = (event: Event) => {
      if (linked(event)) setHolding(true);
    };
    const release = (event: Event) => {
      if (linked(event)) setHolding(false);
    };
    scope.addEventListener("pointerover", hold);
    scope.addEventListener("pointerout", release);
    scope.addEventListener("focusin", hold);
    scope.addEventListener("focusout", release);
    return () => {
      scope.removeEventListener("pointerover", hold);
      scope.removeEventListener("pointerout", release);
      scope.removeEventListener("focusin", hold);
      scope.removeEventListener("focusout", release);
    };
  }, []);
  useEffect(() => {
    const node = ref.current;
    if (!node || !window.IntersectionObserver) return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let first = true;
    // Strokes are only hidden for an entrance when the scene starts off-screen.
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (first && !entry.isIntersecting && !motion.matches)
          node.dataset.entrance = "armed";
        else if (entry.isIntersecting && node.dataset.entrance === "armed")
          node.dataset.entrance = "run";
        first = false;
        setInView(entry.isIntersecting);
      },
      { threshold: 0.2 },
    );
    observer.observe(node);
    node.dataset.motionReady = "true";
    const sync = () => {
      setHidden(document.hidden);
      setReduced(motion.matches);
    };
    sync();
    document.addEventListener("visibilitychange", sync);
    motion.addEventListener("change", sync);
    return () => {
      observer.disconnect();
      delete node.dataset.motionReady;
      delete node.dataset.entrance;
      document.removeEventListener("visibilitychange", sync);
      motion.removeEventListener("change", sync);
    };
  }, []);
  useEffect(() => {
    if (!playing || holding || steps < 2) return;
    // Each part in turn, then one rest beat showing the complete drawing.
    const timer = window.setInterval(
      () => setStep((current) => (current + 1) % (steps + 1)),
      STEP_MS,
    );
    return () => window.clearInterval(timer);
  }, [playing, holding, steps]);
  return (
    <figure
      ref={ref}
      className={`engineering-plate plate-${variant} plate-${kind}`}
      data-scene-kind={kind}
      data-playing={playing}
      data-step={playing && !holding && step ? step : undefined}
    >
      {children}
      <figcaption className="plate-caption">
        {legend}
        <div className="plate-note">
          <span>{note}</span>
          <button
            type="button"
            className="motion-control"
            aria-pressed={paused}
            onClick={() => setPaused((value) => !value)}
          >
            {paused ? resume : pause}
          </button>
        </div>
      </figcaption>
    </figure>
  );
}

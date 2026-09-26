"use client";

import { useEffect, useRef, useState } from "react";
import { useLocale } from "@/i18n/locale-provider";

export type SceneKind =
  | "integrated"
  | "research"
  | "numerical"
  | "software"
  | "safety"
  | "knowledge";

const descriptions: Record<SceneKind, { pt: string; en: string }> = {
  integrated: {
    pt: "Esquema conceitual: formação geológica e poço, discretização em malha, processamento e leitura de resultados. Não representa dados de uma simulação.",
    en: "Conceptual diagram: geological formation and well, mesh discretization, processing and results. It does not represent simulation data.",
  },
  research: {
    pt: "Esquema de poço vertical em estratos geológicos, com camadas de sal e campos termomecânicos conceituais.",
    en: "Diagram of a vertical well in geological layers, with salt layers and conceptual thermomechanical fields.",
  },
  numerical: {
    pt: "Malha de elementos conectados a uma curva conceitual de resultados numéricos.",
    en: "Element mesh connected to a conceptual curve of numerical results.",
  },
  software: {
    pt: "Fluxo conceitual de dados: entrada, validação, processamento e painel de indicadores.",
    en: "Conceptual data flow: input, validation, processing and indicator dashboard.",
  },
  safety: {
    pt: "Camadas de proteção entre um evento e a decisão operacional, com barreiras redundantes.",
    en: "Layers of protection between an event and an operational decision, with redundant barriers.",
  },
  knowledge: {
    pt: "Rede conectando pesquisa, métodos, software, publicações e decisão.",
    en: "Network connecting research, methods, software, publications and decisions.",
  },
};

/** Original technical plates; static geometry remains complete without animation or JS. */
export function EngineeringScene({
  kind = "integrated",
}: {
  kind?: SceneKind;
}) {
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);
  const [paused, setPaused] = useState(false);
  const [hidden, setHidden] = useState(false);
  const { locale } = useLocale();
  useEffect(() => {
    const node = ref.current;
    if (!node || !window.IntersectionObserver) return;
    node.dataset.motionReady = "true";
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.15 },
    );
    observer.observe(node);
    const visibility = () => setHidden(document.hidden);
    document.addEventListener("visibilitychange", visibility);
    return () => {
      observer.disconnect();
      delete node.dataset.motionReady;
      document.removeEventListener("visibilitychange", visibility);
    };
  }, []);
  const label = (pt: string, en: string) => (locale === "en" ? en : pt);
  return (
    <figure
      ref={ref}
      className={`engineering-plate plate-${kind}`}
      data-playing={inView && !paused && !hidden}
    >
      <div className="plate-meta">
        <span>
          SW /{" "}
          {
            {
              integrated: label("CONVERGÊNCIA", "CONVERGENCE"),
              research: label("GEOMECÂNICA", "GEOMECHANICS"),
              numerical: label("DISCRETIZAÇÃO", "DISCRETIZATION"),
              software: label("SISTEMAS", "SYSTEMS"),
              safety: label("BARREIRAS", "BARRIERS"),
              knowledge: label("CONHECIMENTO", "KNOWLEDGE"),
            }[kind]
          }
        </span>
        <span>{label("ESTUDO CONCEITUAL", "CONCEPTUAL STUDY")}</span>
      </div>
      <svg
        viewBox="0 0 760 560"
        fill="none"
        role="img"
        aria-label={descriptions[kind][locale]}
      >
        <g className="plate-grid" stroke="currentColor" strokeWidth="0.6">
          {Array.from({ length: 15 }, (_, i) => (
            <path key={`x${i}`} d={`M${30 + i * 50} 35V525`} />
          ))}
          {Array.from({ length: 10 }, (_, i) => (
            <path key={`y${i}`} d={`M30 ${50 + i * 50}H730`} />
          ))}
        </g>
        {(kind === "integrated" || kind === "research") && (
          <g>
            <path d="M70 235 175 180 380 237 265 296Z" className="strata-top" />
            <path d="M70 235 265 296V466L70 405Z" className="strata-side" />
            <path d="M265 296 380 237V407L265 466Z" className="strata-front" />
            <g stroke="currentColor" className="strata-lines">
              <path d="m70 275 195 61 115-59m-310 40 195 61 115-59m-310 40 195 61 115-59m-310 40 195 61 115-59" />
              <path
                d="m70 310 195 61 115-59"
                strokeWidth="12"
                className="salt-layer"
              />
            </g>
            <path
              d="M224 123v294m14-294v294"
              className="well-casing"
              strokeWidth="4"
            />
            <path d="M231 112v316" className="well-core" strokeWidth="3" />
            <path
              d="M202 120h60m-49-9h39m-34 322h26"
              className="well-core"
              strokeWidth="2"
            />
            <g className="stress-field" strokeWidth="1.3">
              <ellipse cx="231" cy="343" rx="42" ry="20" />
              <ellipse cx="231" cy="343" rx="70" ry="34" />
              <ellipse cx="231" cy="343" rx="96" ry="47" />
            </g>
            <path
              d="M90 460v30h165m-165 0 8-5m-8 5 8 5"
              className="plate-rule"
            />
            <text x="72" y="513">
              {label("FORMAÇÃO / POÇO", "FORMATION / WELL")}
            </text>
            <text x="115" y="320" className="salt-label">
              {label("SAL", "SALT")}
            </text>
          </g>
        )}
        {(kind === "integrated" || kind === "numerical") && (
          <g
            transform={
              kind === "numerical" ? "translate(-200 50) scale(1.5)" : undefined
            }
          >
            <g className="mesh" strokeWidth="1">
              {Array.from({ length: 6 }, (_, i) => (
                <path
                  key={`m${i}`}
                  d={`M${390 + i * 34} ${190 - i * 7}l-58 118M390 ${190 + i * 22}l170-35`}
                />
              ))}
              {Array.from({ length: 4 }, (_, i) => (
                <path
                  key={`d${i}`}
                  d={`M${390 + i * 34} ${190 - i * 7}l${112 - i * 18} 73`}
                />
              ))}
              {Array.from({ length: 16 }, (_, i) => (
                <circle
                  key={`n${i}`}
                  cx={398 + (i % 4) * 38 - Math.floor(i / 4) * 10}
                  cy={196 + Math.floor(i / 4) * 24 - (i % 4) * 7}
                  r="2.3"
                />
              ))}
            </g>
            <text x="392" y="142">
              {label("DISCRETIZAÇÃO", "DISCRETIZATION")}
            </text>
          </g>
        )}
        {(kind === "integrated" ||
          kind === "software" ||
          kind === "numerical") && (
          <g>
            <rect
              x="435"
              y="345"
              width="258"
              height="140"
              rx="5"
              className="dashboard-plane"
            />
            <path d="M435 370h258m-239 17v76h215" className="plate-rule" />
            <path
              d="m462 449 31-8 28 9 32-38 25 12 31-29 28 9 23-17"
              pathLength="1"
              className="result-curve scene-draw"
            />
            <path d="M473 360h28m12 0h18m12 0h18" className="plate-rule" />
            <text x="450" y="511">
              {label("DADOS / DECISÃO", "DATA / DECISION")}
            </text>
          </g>
        )}
        {kind === "integrated" && (
          <g className="flow-line">
            <path d="M298 166h61v90h36m150 37v31h47v20" strokeDasharray="4 7" />
            <circle cx="359" cy="210" r="4" className="scene-signal" />
          </g>
        )}
        {kind === "software" && (
          <g>
            {[0, 1, 2].map((i) => (
              <g
                key={i}
                transform={`translate(${75 + i * 115} ${150 + i * 25})`}
              >
                <rect
                  width="90"
                  height="105"
                  rx="6"
                  className="dashboard-plane"
                />
                <path
                  d="M15 24h60M15 43h40m-40 20h52m-52 20h30"
                  className="plate-rule"
                />
                <text x="16" y="-18">
                  {
                    [
                      label("DADOS", "DATA"),
                      "API",
                      label("PROCESSO", "PROCESS"),
                    ][i]
                  }
                </text>
              </g>
            ))}
            <path
              d="M165 195h25m90 25h25m90 27h70v95"
              className="flow-line scene-draw"
              pathLength="1"
            />
          </g>
        )}
        {kind === "safety" && (
          <g>
            {[0, 1, 2, 3].map((i) => (
              <g
                key={i}
                transform={`translate(${160 + i * 115} ${160 + i * 20})`}
              >
                <path d="m0 0 72-25v150l-72 25Z" className="barrier" />
                <path
                  d="m15 50 16 16 28-45"
                  className="well-core"
                  strokeWidth="3"
                />
              </g>
            ))}
            <path
              d="M75 290h530"
              strokeDasharray="6 10"
              className="flow-line"
            />
            <text x="75" y="400">
              {label(
                "EVENTO → BARREIRAS → DECISÃO",
                "EVENT → BARRIERS → DECISION",
              )}
            </text>
          </g>
        )}
        {kind === "knowledge" && (
          <g>
            <g className="flow-line">
              <path d="M380 275 200 150m180 125 180-125m-180 125-210 100m210-100 210 100m-210-100v180" />
            </g>
            {[
              [380, 275],
              [200, 150],
              [560, 150],
              [170, 375],
              [590, 375],
              [380, 455],
            ].map(([x, y], i) => (
              <g key={i}>
                <circle
                  cx={x}
                  cy={y}
                  r={i === 0 ? 45 : 30}
                  className="network-node"
                />
                <text x={x} y={y + 5} textAnchor="middle">
                  {
                    [
                      "SW",
                      label("PESQUISA", "RESEARCH"),
                      label("MÉTODOS", "METHODS"),
                      "SOFTWARE",
                      label("PUBLICAÇÃO", "PUBLISHING"),
                      label("DECISÃO", "DECISION"),
                    ][i]
                  }
                </text>
              </g>
            ))}
          </g>
        )}
        <path
          d="M30 70V35h35m630 0h35v35M30 490v35h35m630 0h35v-35"
          className="plate-rule"
        />
      </svg>
      <figcaption className="plate-caption">
        <span>
          {label(
            "Representação esquemática, sem escala.",
            "Schematic representation, not to scale.",
          )}
        </span>
        <button
          type="button"
          className="motion-control"
          aria-pressed={paused}
          onClick={() => setPaused((value) => !value)}
        >
          {paused
            ? label("Retomar movimento", "Resume motion")
            : label("Pausar movimento", "Pause motion")}
        </button>
      </figcaption>
    </figure>
  );
}

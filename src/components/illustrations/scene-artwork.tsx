import type { CSSProperties, ReactNode } from "react";
import {
  AreasArtwork,
  CareerArtwork,
  ConvergenceArtwork,
  ResearchProcessArtwork,
} from "./about-artwork";

export type SceneKind =
  | "integrated"
  | "approach"
  | "solutions"
  | "research"
  | "publication"
  | "software"
  | "cases"
  | "editorial"
  | "knowledge"
  | "trajectory"
  | "updates"
  | "contact"
  | "numerical"
  | "aboutConvergence"
  | "aboutAreas"
  | "researchProcess"
  | "career";

export type SceneVariant = "hero" | "standard" | "compact" | "wide";

/** Geometry of each drawing. Compact scenes are wide strips that sit beside or under copy. */
export const sceneFormat: Record<
  SceneKind,
  { variant: SceneVariant; viewBox: string; narrowViewBox?: string }
> = {
  integrated: { variant: "hero", viewBox: "0 0 600 400" },
  approach: { variant: "compact", viewBox: "0 0 480 160" },
  solutions: { variant: "compact", viewBox: "0 0 480 200" },
  research: { variant: "standard", viewBox: "0 0 480 340" },
  publication: { variant: "compact", viewBox: "0 0 480 190" },
  software: { variant: "compact", viewBox: "0 0 480 164" },
  cases: { variant: "compact", viewBox: "0 0 480 180" },
  editorial: { variant: "compact", viewBox: "0 0 480 170" },
  knowledge: { variant: "standard", viewBox: "0 0 480 360" },
  trajectory: { variant: "compact", viewBox: "0 0 480 170" },
  updates: { variant: "compact", viewBox: "0 0 480 170" },
  contact: { variant: "standard", viewBox: "0 0 480 360" },
  numerical: { variant: "standard", viewBox: "0 0 480 340" },
  aboutConvergence: { variant: "hero", viewBox: "0 0 600 430" },
  aboutAreas: { variant: "standard", viewBox: "0 0 360 360" },
  researchProcess: {
    variant: "wide",
    viewBox: "0 0 960 150",
    narrowViewBox: "0 0 360 290",
  },
  career: { variant: "wide", viewBox: "0 0 960 330" },
};

/**
 * One numbered element of a scene. `n` matches the numbered copy around the drawing:
 * pointing at that copy, or the timed sequence, brings this part forward.
 */
function Part({ n, children }: { n: number; children: ReactNode }) {
  return (
    <g data-part={n} style={{ "--d": n } as CSSProperties}>
      {children}
    </g>
  );
}

function Num({
  x,
  y,
  n,
  anchor = "middle",
}: {
  x: number;
  y: number;
  n: number;
  anchor?: "start" | "middle" | "end";
}) {
  return (
    <text x={x} y={y} className="a-num" textAnchor={anchor}>
      {String(n).padStart(2, "0")}
    </text>
  );
}

function Flow({ d }: { d: string }) {
  return <path d={d} className="scene-flow" />;
}

/** Small pictograms drawn around the origin, sized for a 24-unit node. */
const glyphs = {
  doc: "M-10-15h13l8 8v22h-21ZM3-15v8h8M-5-2h11M-5 4h11M-5 10h7",
  lens: "M-12-3a9 9 0 1 0 18 0a9 9 0 1 0-18 0M3 3l9 9",
  mesh: "M-13 10 0-13l13 23ZM-6.5-1.5h13L0 10Z",
  strata:
    "M-14-8C-7-12 0-4 14-9M-14-1C-7-5 0 3 14-2M-14 6C-7 2 0 10 14 5M-14 13C-7 9 0 17 14 12",
  panel: "M-14-11h28v22h-28ZM-14-5h28M-8 7V2M-3 7V-1M2 7V3M7 7V0",
  shield: "M0-15 12-10v9C12 8 6 13 0 16-6 13-12 8-12-1v-9Z",
  check: "m-5 0 3.5 3.5L6-4",
  book: "M0-8C-5-11-10-11-14-9V9C-10 7-5 7 0 10 5 7 10 7 14 9V-9C10-11 5-11 0-8ZM0-8V10",
  code: "M-7-8-15 0l8 8M7-8l8 8-8 8M3-11-3 11",
  target: "M-12 0a12 12 0 1 0 24 0a12 12 0 1 0-24 0M-5 0a5 5 0 1 0 10 0a5 5 0 1 0-10 0",
  well: "M-14-4C-8-7-3-1 3-4s8-1 11 0M-14 6C-8 3-3 9 3 6s8-1 11 0M-3-14v28M3-14v28M-7-14h14",
  alert: "M0-13 13 10h-26ZM0-4v6M0 6.5h0",
};

function Node({
  x,
  y,
  r = 24,
  glyph,
  check = false,
}: {
  x: number;
  y: number;
  r?: number;
  glyph: keyof typeof glyphs;
  check?: boolean;
}) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <circle r={r} className="a-fill a-ink" />
      <path d={glyphs[glyph]} className="a-ink" />
      {check && (
        <path d={glyphs.check} className="a-accent scene-draw" pathLength={1} />
      )}
    </g>
  );
}

/** Triangulated grid as two paths: one for edges, one for nodes (round caps). */
function Mesh({ xs, ys }: { xs: number[]; ys: number[] }) {
  let edges = "";
  let nodes = "";
  ys.forEach((y, j) =>
    xs.forEach((x, i) => {
      nodes += `M${x} ${y}h0`;
      const right = xs[i + 1];
      const below = ys[j + 1];
      if (right !== undefined) edges += `M${x} ${y}H${right}`;
      if (below !== undefined) edges += `M${x} ${y}V${below}`;
      if (right !== undefined && below !== undefined)
        edges +=
          (i + j) % 2
            ? `M${x} ${below}L${right} ${y}`
            : `M${x} ${y}L${right} ${below}`;
    }),
  );
  return (
    <g>
      <path d={edges} className="a-mute" />
      <path d={nodes} className="a-dots" />
    </g>
  );
}

const graded = (origin: number, steps: number[]) =>
  steps.map((step) => origin + step);

/*
 * Geological cross-section in a local 200 × 220 box: strata, a salt interval
 * and a cased well. Salt and well can be separate numbered parts.
 */
function Strata() {
  return (
    <path
      d="M0 20C60 10 130 30 200 16M0 66C70 56 120 76 200 62M0 216C60 206 140 226 200 212"
      className="a-mute"
    />
  );
}

function Salt({ detail = false }: { detail?: boolean }) {
  return (
    <g>
      <path
        d="M0 118C60 104 120 128 200 112V180C130 166 70 190 0 178Z"
        className="a-tint a-ink"
      />
      <path
        d="M12 136l7-7M22 164l7-7M172 132l7-7M182 160l7-7M58 172l7-7M140 170l7-7"
        className="a-soft"
      />
      <ellipse cx="100" cy="147" rx="36" ry="40" className="a-mute a-dash" />
      <ellipse cx="100" cy="147" rx="21" ry="25" className="a-accent" />
      <path
        d="M42 147h16m-5-4 5 4-5 4M158 147h-16m5-4-5 4 5 4"
        className="a-accent"
      />
      {detail && (
        <rect
          x="110"
          y="106"
          width="90"
          height="82"
          className="a-soft a-dash"
        />
      )}
    </g>
  );
}

function Well() {
  return (
    <g>
      <path d="M94 2V204M106 2V204M86 2H114M89 204h9m4 0h9" className="a-ink" />
      <path d="M100-6V214" className="a-warm scene-draw" pathLength={1} />
    </g>
  );
}

function Chart({ x, y, w = 130, h = 100 }: Box) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect width={w} height={h} rx="8" className="a-fill a-ink" />
      <path d={`M12 12V${h - 14}H${w - 10}`} className="a-mute" />
      <path
        d={`M16 ${h - 22}C${w * 0.3} ${h - 26} ${w * 0.42} ${h * 0.5} ${w * 0.56} ${h * 0.38}S${w * 0.8} ${h * 0.16} ${w - 14} ${h * 0.13}`}
        className="a-accent scene-draw"
        pathLength={1}
      />
      <path
        d={`M16 ${h - 18}C${w * 0.38} ${h - 22} ${w * 0.55} ${h * 0.6} ${w * 0.68} ${h * 0.5}S${w * 0.86} ${h * 0.36} ${w - 14} ${h * 0.34}`}
        className="a-mute a-dash"
      />
    </g>
  );
}

type Box = { x: number; y: number; w?: number; h?: number };

function Doc({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M0 0h62l24 24v86H0Z" className="a-fill a-ink" />
      <path d="M62 0v24h24" className="a-ink" />
      <path d="M14 22h30" className="a-accent" />
      <path d="M14 44h56M14 56h44M14 68h56M14 80h36" className="a-mute" />
      <path d="M14 96h22" className="a-warm" />
    </g>
  );
}

function Window({ x, y, w, h }: Box & { w: number; h: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect width={w} height={h} rx="8" className="a-fill a-ink" />
      <path d={`M0 18H${w}`} className="a-ink" />
      <path d="M10 9h0M18 9h0M26 9h0" className="a-dots a-dots-small" />
    </g>
  );
}

const shieldPath = "M0-24 20-16v15C20 13 10 21 0 26-10 21-20 13-20-1v-15Z";

function Shield({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d={shieldPath} className="a-fill a-ink" />
      <path
        d="m-8 1 6 6 11-13"
        className="a-accent scene-draw"
        pathLength={1}
      />
    </g>
  );
}

export function SceneArtwork({
  kind,
  narrow = false,
}: {
  kind: SceneKind;
  narrow?: boolean;
}) {
  switch (kind) {
    case "aboutConvergence":
      return <ConvergenceArtwork />;
    case "aboutAreas":
      return <AreasArtwork />;
    case "researchProcess":
      return <ResearchProcessArtwork narrow={narrow} />;
    case "career":
      return <CareerArtwork />;
    case "integrated":
      return (
        <g>
          <Part n={1}>
            <g transform="translate(30 84) scale(1.1)">
              <Strata />
              <Salt detail />
              <Well />
            </g>
            <Num x={140} y={58} n={1} />
          </Part>
          <path d="M250 202 300 190M250 291l50-1" className="a-soft a-dash" />
          <Part n={2}>
            <Mesh
              xs={graded(302, [0, 10, 22, 36, 53, 74, 98, 124])}
              ys={graded(190, [0, 20, 40, 60, 80, 100])}
            />
            <path
              d="M284 200h10m-3-3 3 3-3 3M284 230h10m-3-3 3 3-3 3M284 260h10m-3-3 3 3-3 3"
              className="a-warm"
            />
            <Num x={358} y={172} n={2} />
          </Part>
          <Part n={3}>
            <Flow d="M422 240C442 240 432 146 450 146" />
            <Chart x={450} y={96} />
            <Flow d="M515 204V262" />
            <Shield x={515} y={300} s={1.1} />
            <Num x={515} y={80} n={3} />
          </Part>
        </g>
      );
    case "approach":
      return (
        <g>
          <Flow d="M100 66H140M220 66H260M340 66H380" />
          {(["doc", "lens", "mesh", "shield"] as const).map((glyph, i) => (
            <Part key={glyph} n={i + 1}>
              <circle
                cx={60 + i * 120}
                cy={66}
                r={38}
                className="a-soft a-dash"
              />
              <Node
                x={60 + i * 120}
                y={66}
                r={28}
                glyph={glyph}
                check={glyph === "shield"}
              />
              <Num x={60 + i * 120} y={134} n={i + 1} />
            </Part>
          ))}
        </g>
      );
    case "solutions": {
      const nodes = [
        [118, 140, "mesh", 82, 128],
        [165, 76, "strata", 143, 45],
        [240, 52, "panel", 240, 17],
        [315, 76, "shield", 337, 45],
        [362, 140, "book", 398, 128],
      ] as const;
      return (
        <g>
          <circle cx="240" cy="180" r="14" className="a-soft" />
          <circle cx="240" cy="180" r="5" className="a-warm-fill" />
          {nodes.map(([x, y, glyph, nx, ny], i) => {
            const dx = 240 - x;
            const dy = 180 - y;
            const length = Math.hypot(dx, dy);
            const [ux, uy] = [dx / length, dy / length];
            return (
              <Part key={glyph} n={i + 1}>
                <Flow
                  d={`M${(x + ux * 28).toFixed(1)} ${(y + uy * 28).toFixed(1)}L${(240 - ux * 18).toFixed(1)} ${(180 - uy * 18).toFixed(1)}`}
                />
                <Node x={x} y={y} glyph={glyph} />
                <Num x={nx} y={ny + 4} n={i + 1} />
              </Part>
            );
          })}
        </g>
      );
    }
    case "research":
      return (
        <g>
          <g transform="translate(40 60) scale(1.2)">
            <Strata />
            <Part n={1}>
              <Salt detail />
            </Part>
            <Part n={3}>
              <Well />
            </Part>
          </g>
          <Part n={1}>
            <Num x={20} y={241} n={1} />
          </Part>
          <Part n={3}>
            <Num x={160} y={40} n={3} />
          </Part>
          <path d="M280 188 318 176M280 285l38 1" className="a-soft a-dash" />
          <Part n={2}>
            <Mesh
              xs={graded(318, [0, 10, 22, 36, 53, 74, 98, 126])}
              ys={graded(176, [0, 22, 44, 66, 88, 110])}
            />
            <path
              d="M300 187h10m-3-3 3 3-3 3M300 231h10m-3-3 3 3-3 3M300 275h10m-3-3 3 3-3 3"
              className="a-warm"
            />
            <Num x={378} y={158} n={2} />
          </Part>
        </g>
      );
    case "publication":
      return (
        <g>
          <Part n={1}>
            <g transform="translate(20 18) scale(.62)">
              <Strata />
              <Salt />
              <Well />
            </g>
            <Num x={82} y={180} n={1} />
          </Part>
          <Part n={2}>
            <Flow d="M150 88h26" />
            <g transform="translate(184 36)">
              <rect width="124" height="104" rx="8" className="a-fill a-ink" />
              <path d="M12 12v80h102" className="a-mute" />
              <path
                d="M16 88 62 34c6-7 12-12 18-13s10 3 14 11l6 14h12"
                className="a-accent scene-draw"
                pathLength={1}
              />
              <circle cx="62" cy="34" r="3.5" className="a-warm-fill" />
            </g>
            <Num x={246} y={180} n={2} />
          </Part>
          <Part n={3}>
            <Flow d="M314 88h30" />
            <Doc x={352} y={30} />
            <Num x={395} y={180} n={3} />
          </Part>
        </g>
      );
    case "software":
      return (
        <g>
          {[
            <g key="mdfolio">
              <path d="M22 18h34l12 12v44H22Z" className="a-tint a-mute" />
              <path d="M40 30h34l12 12v44H40Z" className="a-fill a-ink" />
              <path d="M74 30v12h12" className="a-ink" />
              <path d="M50 56h24M50 66h18M50 76h24" className="a-mute" />
            </g>,
            <g key="acadimprove">
              <path d="M18 84h68" className="a-mute" />
              <path
                d="M24 84V64h10v20M42 84V54h10v30M60 84V60h10v24M78 84V42h8v42"
                className="a-ink"
              />
              <path
                d="m22 46 20-10 18 4 24-20"
                className="a-accent scene-draw"
                pathLength={1}
              />
            </g>,
            <g key="sursum">
              <path
                d="M16 34h72M16 44h72M16 54h72M16 64h72M16 74h72"
                className="a-soft"
              />
              <path
                d="M29 69c0-3 4-5 7-5s4 2 4 4-4 5-7 5-4-2-4-4ZM49 59c0-3 4-5 7-5s4 2 4 4-4 5-7 5-4-2-4-4ZM69 49c0-3 4-5 7-5s4 2 4 4-4 5-7 5-4-2-4-4Z"
                className="a-accent-fill"
              />
              <path d="M40 68V40M60 58V30M80 48V20" className="a-ink" />
            </g>,
            <g key="gabarita">
              {[0, 1, 2].map((row) =>
                [0, 1, 2, 3].map((col) => (
                  <circle
                    key={`${row}-${col}`}
                    cx={28 + col * 16}
                    cy={40 + row * 18}
                    r="5"
                    className={
                      col === [1, 3, 0][row] ? "a-accent-fill" : "a-mute"
                    }
                  />
                )),
              )}
              <path d="M16 30h72" className="a-warm scene-scan" />
            </g>,
          ].map((glyph, i) => (
            <Part key={i} n={i + 1}>
              <g transform={`translate(${8 + i * 120} 12)`}>
                <rect width="104" height="100" rx="10" className="a-fill a-ink" />
                {glyph}
              </g>
              <Num x={60 + i * 120} y={142} n={i + 1} />
            </Part>
          ))}
        </g>
      );
    case "cases":
      return (
        <g>
          <Part n={1}>
            <path
              d="M40 24l7-7M168 24l7-7M40 148l7-7M168 148l7-7M28 86l7-7M184 86l7-7"
              className="a-soft"
            />
            <path
              d="M88 82a22 22 0 1 0 44 0a22 22 0 1 0-44 0ZM98 82a12 12 0 1 0 24 0a12 12 0 1 0-24 0Z"
              className="a-tint"
              fillRule="evenodd"
            />
            <circle cx="110" cy="82" r="12" className="a-ink" />
            <circle cx="110" cy="82" r="22" className="a-ink" />
            <circle cx="110" cy="82" r="32" className="a-ink" />
            <circle cx="110" cy="82" r="46" className="a-mute a-dash" />
            <path
              d="M162 82h12m-4-4 4 4-4 4M58 82H46m4-4-4 4 4 4M110 30V18m-4 4 4-4 4 4M110 134v12m-4-4 4 4 4-4"
              className="a-warm"
            />
            <Num x={110} y={172} n={1} />
          </Part>
          <path d="M240 26v112" className="a-soft a-dash" />
          <Part n={2}>
            <Window x={290} y={22} w={170} h={118} />
            <path d="M330 40v100" className="a-mute" />
            <path d="M300 56h20M300 68h16M300 80h20" className="a-mute" />
            <path d="M364 58h86M364 76h86M364 94h86M364 112h86" className="a-soft" />
            <path
              d="m344 55 4 4 8-8m-12 23 4 4 8-8m-12 23 4 4 8-8"
              className="a-accent scene-draw"
              pathLength={1}
            />
            <Num x={375} y={172} n={2} />
          </Part>
        </g>
      );
    case "editorial":
      return (
        <g>
          <Part n={1}>
            <g transform="translate(16 36)">
              <path
                d="M0 10C22 0 44 2 60 12 76 2 98 0 120 10V92C98 82 76 84 60 94 44 84 22 82 0 92Z"
                className="a-fill a-ink"
              />
              <path d="M60 12v82" className="a-ink" />
              <path
                d="M12 32c14-5 28-5 38-1M12 46c14-5 28-5 38-1M12 60c14-5 28-5 38-1M72 32c14-5 28-5 38-1"
                className="a-mute"
              />
              <path
                d="M72 52h36M72 64h24"
                className="a-accent scene-draw"
                pathLength={1}
              />
            </g>
            <Num x={76} y={160} n={1} />
          </Part>
          <Part n={2}>
            <Flow d="M142 82h28" />
            <Window x={178} y={34} w={124} h={96} />
            <path d="M192 68h28M200 80h52M192 104h44" className="a-mute" />
            <path
              d="M200 92h36"
              className="a-accent scene-draw"
              pathLength={1}
            />
            <Num x={240} y={160} n={2} />
          </Part>
          <Part n={3}>
            <Flow d="M308 82h30" />
            <Doc x={346} y={22} />
            <path d="M420 64h0M420 88h0" className="a-dots a-dots-warm" />
            <Num x={389} y={160} n={3} />
          </Part>
        </g>
      );
    case "knowledge": {
      const nodes = [
        [240, 60, "strata", 240, 20],
        [343.9, 120, "mesh", 384, 98],
        [343.9, 240, "code", 384, 266],
        [240, 300, "doc", 240, 350],
        [136.1, 240, "alert", 96, 266],
        [136.1, 120, "target", 96, 98],
      ] as const;
      return (
        <g>
          <path
            d="M240 60 343.9 120V240L240 300 136.1 240V120Z"
            className="a-soft"
          />
          {nodes.map(([x, y, glyph, nx, ny], i) => {
            const [ux, uy] = [(x - 240) / 120, (y - 180) / 120];
            return (
              <Part key={glyph} n={i + 1}>
                <Flow
                  d={`M${(240 + ux * 40).toFixed(1)} ${(180 + uy * 40).toFixed(1)}L${(x - ux * 30).toFixed(1)} ${(y - uy * 30).toFixed(1)}`}
                />
                <Node x={x} y={y} r={26} glyph={glyph} />
                <Num x={nx} y={ny} n={i + 1} />
              </Part>
            );
          })}
          <circle cx="240" cy="180" r="34" className="a-fill a-ink" />
          <circle cx="240" cy="180" r="44" className="a-soft a-dash" />
          <Shield x={240} y={180} s={0.78} />
        </g>
      );
    }
    case "trajectory":
      return (
        <g>
          <path
            d="M10 150C40 146 44 122 70 118S190 90 240 82 360 58 410 46 454 30 470 26"
            className="a-warm scene-draw"
            pathLength={1}
          />
          {(["well", "code", "book"] as const).map((glyph, i) => (
            <Part key={glyph} n={i + 1}>
              <Node x={70 + i * 170} y={118 - i * 36} r={26} glyph={glyph} />
              <Num x={70 + i * 170} y={162 - i * 36} n={i + 1} />
            </Part>
          ))}
        </g>
      );
    case "updates":
      return (
        <g>
          <Part n={1}>
            <Doc x={40} y={22} />
            <Num x={83} y={160} n={1} />
          </Part>
          <Part n={2}>
            <Flow d="M134 77h52" />
            <circle cx="214" cy="122" r="5" className="a-warm-fill" />
            <path
              d="M214 100a22 22 0 0 1 22 22M214 82a40 40 0 0 1 40 40M214 64a58 58 0 0 1 58 58"
              className="a-warm a-bold scene-draw"
              pathLength={1}
            />
            <Num x={240} y={160} n={2} />
          </Part>
          <Part n={3}>
            <Flow d="M290 77h52" />
            <rect x="350" y="18" width="96" height="120" rx="12" className="a-fill a-ink" />
            <path
              d="M364 42h56M364 60h68M364 72h52M364 94h68M364 106h44M364 124h60"
              className="a-mute"
            />
            <path d="M436 42h0" className="a-dots" />
            <Num x={398} y={160} n={3} />
          </Part>
        </g>
      );
    case "contact":
      return (
        <g>
          <Part n={1}>
            <path
              d="M44 40H236Q250 40 250 54V146Q250 160 236 160H96L70 184V160H44Q30 160 30 146V54Q30 40 44 40Z"
              className="a-fill a-ink"
            />
            <path d="M58 76h150M58 100h120M58 124h168" className="a-mute" />
            <path d="M48 76h0M48 100h0M48 124h0" className="a-dots" />
            <Num x={30} y={26} n={1} anchor="start" />
          </Part>
          <Part n={2}>
            <path
              d="M234 170H436Q450 170 450 184V266Q450 280 436 280H404V304L380 280H234Q220 280 220 266V184Q220 170 234 170Z"
              className="a-fill a-ink"
            />
            <path
              d="M244 194h12v12h-12ZM244 220h12v12h-12ZM244 246h12v12h-12Z"
              className="a-ink"
            />
            <path
              d="m246 200 3 3 6-6m-9 29 3 3 6-6m-9 29 3 3 6-6"
              className="a-accent scene-draw"
              pathLength={1}
            />
            <path d="M268 200h120M268 226h96M268 252h140" className="a-mute" />
            <Num x={450} y={158} n={2} anchor="end" />
          </Part>
          <Part n={3}>
            <Flow d="M300 280C300 318 230 322 170 322H118" />
            <path d="M236 319h0M178 322h0" className="a-dots" />
            <Shield x={88} y={318} s={0.8} />
            <Num x={40} y={323} n={3} />
          </Part>
        </g>
      );
    case "numerical":
      return (
        <g>
          <Part n={1}>
            <path
              d="M80 30v18m-4-5 4 5 4-5M120 30v18m-4-5 4 5 4-5M160 30v18m-4-5 4 5 4-5M200 30v18m-4-5 4 5 4-5"
              className="a-warm"
            />
            <Mesh
              xs={graded(40, [0, 12, 26, 42, 61, 84, 110, 140, 172, 206])}
              ys={graded(58, [0, 26, 52, 78, 104, 130, 156, 182])}
            />
            <path
              d="M60 252l8 12H52ZM140 252l8 12h-16ZM220 252l8 12h-16Z"
              className="a-ink"
            />
            <Num x={140} y={292} n={1} />
          </Part>
          <Part n={2}>
            <Flow d="M252 150C272 150 274 104 294 104" />
            <Window x={296} y={50} w={150} h={100} />
            <path d="M310 86h40M318 100h64M318 114h48M310 128h56" className="a-mute" />
            <Num x={371} y={36} n={2} />
          </Part>
          <Part n={3}>
            <Flow d="M371 154v28" />
            <Chart x={296} y={186} w={150} h={110} />
            <Num x={371} y={322} n={3} />
          </Part>
        </g>
      );
  }
}

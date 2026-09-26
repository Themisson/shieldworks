import type { CSSProperties, ReactNode } from "react";

/*
 * Drawings for the About page. Same vocabulary as scene-artwork.tsx: light strokes,
 * numerals only, numbered parts (data-part) that match numbered copy (data-focus).
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

const glyphs = {
  mesh: "M-13 10 0-13l13 23ZM-6.5-1.5h13L0 10Z",
  strata:
    "M-14-8C-7-12 0-4 14-9M-14-1C-7-5 0 3 14-2M-14 6C-7 2 0 10 14 5M-14 13C-7 9 0 17 14 12",
  code: "M-7-8-15 0l8 8M7-8l8 8-8 8M3-11-3 11",
  alert: "M0-13 13 10h-26ZM0-4v6M0 6.5h0",
  well: "M-14-4C-8-7-3-1 3-4s8-1 11 0M-14 6C-8 3-3 9 3 6s8-1 11 0M-3-14v28M3-14v28M-7-14h14",
  forces: "M-8-8h16v16h-16ZM-20 0h8m-3-3 3 3-3 3M20 0h-8m3-3-3 3 3 3M0-20v8m-3-3 3 3 3-3",
  compare: "M-14 10C-6 8-3-1 3-5S10-10 14-12M-14 13C-5 11 0 2 5-2S11-6 14-7",
  doc: "M-10-15h13l8 8v22h-21ZM3-15v8h8M-5-2h11M-5 4h11M-5 10h7",
};

function Node({
  x,
  y,
  r = 24,
  glyph,
}: {
  x: number;
  y: number;
  r?: number;
  glyph: keyof typeof glyphs;
}) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <circle r={r} className="a-fill a-ink" />
      <path d={glyphs[glyph]} className="a-ink" />
    </g>
  );
}

function Hub({ x, y, r = 36 }: { x: number; y: number; r?: number }) {
  return (
    <g>
      <circle cx={x} cy={y} r={r + 16} className="a-soft a-dash" />
      <circle cx={x} cy={y} r={r} className="a-fill a-ink" />
      <g transform={`translate(${x} ${y}) scale(${r / 40})`}>
        <path
          d="M0-24 20-16v15C20 13 10 21 0 26-10 21-20 13-20-1v-15Z"
          className="a-fill a-ink"
        />
        <path
          d="m-8 1 6 6 11-13"
          className="a-accent scene-draw"
          pathLength={1}
        />
      </g>
    </g>
  );
}

function mesh(xs: number[], ys: number[]) {
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

/** Hero: four technical artefacts converging on the ShieldWorks hub. */
export function ConvergenceArtwork() {
  return (
    <g>
      <Part n={1}>
        <path
          d="M64 34v16m-4-5 4 5 4-5M104 34v16m-4-5 4 5 4-5M144 34v16m-4-5 4 5 4-5"
          className="a-warm"
        />
        {mesh(
          [40, 54, 70, 88, 110, 136, 166].map((x) => x),
          [58, 80, 102, 124, 146, 168],
        )}
        <path
          d="M52 172l7 11H45ZM103 172l7 11H96ZM154 172l7 11h-14Z"
          className="a-ink"
        />
        <path d="M176 150C226 150 238 194 262 206" className="scene-flow" />
        <Num x={24} y={40} n={1} anchor="start" />
      </Part>
      <Part n={2}>
        <g transform="translate(338 34) scale(.55)">
          <path
            d="M0 20C60 10 130 30 200 16M0 66C70 56 120 76 200 62M0 216C60 206 140 226 200 212"
            className="a-mute"
          />
          <path
            d="M0 118C60 104 120 128 200 112V180C130 166 70 190 0 178Z"
            className="a-tint a-ink"
          />
          <path d="M94 2V204M106 2V204M86 2H114" className="a-ink" />
          <path d="M100-6V214" className="a-warm" />
          <ellipse cx="100" cy="147" rx="21" ry="25" className="a-accent" />
        </g>
        <g transform="translate(468 52)">
          <rect width="112" height="94" rx="8" className="a-fill a-ink" />
          <path d="M12 12v68h90" className="a-mute" />
          <path
            d="M16 76C20 52 28 44 42 42S78 38 88 28 98 16 100 12"
            className="a-accent scene-draw"
            pathLength={1}
          />
          <path
            d="M20 58h0M32 46h0M50 41h0M68 38h0M84 31h0"
            className="a-dots a-dots-warm"
          />
        </g>
        <path d="M466 150C414 150 360 174 338 204" className="scene-flow" />
        <Num x={580} y={40} n={2} anchor="end" />
      </Part>
      <Part n={3}>
        <g transform="translate(362 286)">
          <rect width="128" height="100" rx="8" className="a-fill a-ink" />
          <path d="M0 18h128" className="a-ink" />
          <path d="M10 9h0M18 9h0M26 9h0" className="a-dots a-dots-small" />
          <path d="M22 40l-8 8 8 8M52 40l8 8-8 8M42 36l-10 24" className="a-ink" />
          <path d="M72 44h40M72 56h28M22 74h60M22 86h40" className="a-mute" />
        </g>
        <g transform="translate(506 304)">
          <rect width="74" height="82" rx="6" className="a-fill a-ink" />
          <path d="M0 20h74M0 41h74M0 62h74M25 0v82M50 0v82" className="a-soft" />
          <path
            d="M31 31h13M6 52h13M56 52h13M31 72h13"
            className="a-accent scene-draw"
            pathLength={1}
          />
        </g>
        <path d="M360 300C344 300 340 262 330 240" className="scene-flow" />
        <Num x={580} y={414} n={3} anchor="end" />
      </Part>
      <Part n={4}>
        <path d={glyphs.alert} className="a-warm" transform="translate(52 336)" />
        <path d="M72 336h38" className="scene-flow" />
        <path
          d="M112 296h14v80h-14ZM140 296h14v80h-14ZM168 296h14v80h-14Z"
          className="a-tint a-ink"
        />
        <g transform="translate(222 336)">
          <circle r="20" className="a-fill a-ink" />
          <path d="m-7 0 5 5 9-10" className="a-accent scene-draw" pathLength={1} />
        </g>
        <path d="M242 312C258 300 262 266 272 240" className="scene-flow" />
        <Num x={24} y={414} n={4} anchor="start" />
      </Part>
      <Hub x={300} y={220} />
    </g>
  );
}

/** Four axes from one hub; each axis carries the branches listed beside it. */
export function AreasArtwork() {
  const axes = [
    // n, axis path, branch ticks, endpoint, glyph, numeral
    [1, "M144 180H52", "M118 180l-10-14M92 180l-10 14M66 180l-10-14", [30, 180], "mesh", [30, 216]],
    [2, "M180 144V52", "M180 118l14-10M180 92l-14-10M180 66l14-10", [180, 30], "strata", [218, 34]],
    [3, "M216 180H308", "M242 180l10 14M268 180l10-14M294 180l10 14", [330, 180], "code", [330, 216]],
    [4, "M180 216V308", "M180 242l-14 10M180 268l14 10M180 294l-14 10", [180, 330], "alert", [218, 334]],
  ] as const;
  return (
    <g>
      {axes.map(([n, axis, ticks, [x, y], glyph, [nx, ny]]) => (
        <Part key={n} n={n}>
          <path d={axis} className="scene-flow" />
          <path d={ticks} className="a-mute" />
          <Node x={x} y={y} r={22} glyph={glyph} />
          <Num x={nx} y={ny} n={n} />
        </Part>
      ))}
      <Hub x={180} y={180} r={30} />
    </g>
  );
}

const processGlyphs = ["well", "forces", "mesh", "code", "compare", "doc"] as const;

/** Research as a process: from the physical problem to the publication. */
export function ResearchProcessArtwork({ narrow }: { narrow: boolean }) {
  const points = narrow
    ? [
        [60, 64],
        [180, 64],
        [300, 64],
        [300, 204],
        [180, 204],
        [60, 204],
      ]
    : processGlyphs.map((_, i) => [80 + i * 160, 72]);
  const flow = narrow
    ? "M92 64h56M212 64h56M300 96v76M268 204h-56M148 204H92"
    : "M112 72h96M272 72h96M432 72h96M592 72h96M752 72h96";
  return (
    <g>
      <path d={flow} className="scene-flow" />
      {processGlyphs.map((glyph, i) => {
        const [x, y] = points[i];
        return (
          <Part key={glyph} n={i + 1}>
            <circle cx={x} cy={y} r={40} className="a-soft a-dash" />
            <Node x={x} y={y} r={30} glyph={glyph} />
            <Num x={x} y={y + 62} n={i + 1} />
          </Part>
        );
      })}
    </g>
  );
}

/*
 * Knowledge map, not a timeline: four lines (disciplines) whose stations converge on
 * ShieldWorks. Position along a line carries no date; dated facts live in the copy.
 */
const careerLines = [
  ["a-line-operation", "M40 56H600L700 150H846"],
  ["a-line-engineering", "M40 128H616L656 158H846"],
  ["a-line-computing", "M40 204H616L656 172H846"],
  ["a-line-teaching", "M40 276H600L700 180H846"],
] as const;

export const careerStations = [
  [120, 56],
  [340, 56],
  [150, 128],
  [330, 128],
  [510, 128],
  [240, 204],
  [470, 204],
  [300, 276],
] as const;

export function CareerArtwork() {
  return (
    <g>
      {careerLines.map(([line, d]) => (
        <path key={line} d={d} className={`${line} scene-draw`} pathLength={1} />
      ))}
      {careerStations.map(([x, y], i) => (
        <Part key={i} n={i + 1}>
          <circle cx={x} cy={y} r={11} className="a-fill a-station" />
          <circle cx={x} cy={y} r={4} className="a-accent-fill" />
          <Num x={x} y={y - 22} n={i + 1} />
        </Part>
      ))}
      <Part n={9}>
        <Hub x={880} y={165} r={30} />
        <Num x={880} y={232} n={9} />
      </Part>
    </g>
  );
}

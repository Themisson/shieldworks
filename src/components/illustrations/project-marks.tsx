/**
 * Marks of the ShieldWorks products: each is the favicon of the published
 * application, copied from its repository (see `source` in src/data/projects.ts)
 * and inlined so the drawing follows the site's `data-theme` instead of the
 * browser's colour scheme. Colours live in src/styles/project-marks.css.
 */

const marks: Record<string, React.ReactElement> = {
  mdfolio: (
    <svg viewBox="0 0 512 512" aria-hidden="true" focusable="false">
      <rect width="512" height="512" rx="96" className="mark-mdfolio-plate" />
      <path d="M104 88h210c54 0 98 44 98 98v238H202c-54 0-98-44-98-98V88Z" className="mark-mdfolio-page" />
      <path
        d="M176 168v176m0-176h94c48 0 86 38 86 86s-38 86-86 86h-94M256 88v336"
        fill="none"
        className="mark-mdfolio-letter"
        strokeWidth="24"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  acadimprove: (
    <svg viewBox="103 163.5 341 341" aria-hidden="true" focusable="false">
      <path className="mark-acad-a" d="M264.4 194.5L308.3 194.5C312.2 194.5 316.7 197.4 318.3 200.9L439.9 467L388.1 467C376.3 467 363.1 458 358.8 447L317.6 341.5C318.5 340.4 321.4 337 323 335C324.6 333 326.2 331.5 327.5 329.5C328.8 327.5 330.1 325.4 331 323C331.9 320.6 332.8 317.7 333.2 315C333.6 312.3 333.7 309.5 333.5 307C333.3 304.5 332.7 301.9 332 300C331.3 298.1 329.9 296.2 329.5 295.5C328.6 294.9 326.6 294.2 324 292C321.4 289.8 318.1 285.2 314 282C309.9 278.8 304.2 274.9 299.5 272.5C294.8 270.1 287.8 268.3 285.5 267.5L284 265C283.2 266.2 281 269.5 279.5 272C278 274.5 276.5 277 275 280C273.5 283 272.3 286.7 270.5 290C268.7 293.3 266.9 296.8 264 300C261.1 303.2 257.5 306.6 253 309.5C248.5 312.4 242.5 314.9 237 317.5C231.5 320.1 226.2 322.1 220 325C213.8 327.9 205.3 332.2 200 335C194.7 337.8 191.1 340.1 188 342C184.9 343.9 182.4 345.8 181.3 346.5L251.5 202.6C253.7 198.1 259.5 194.5 264.4 194.5Z" />
      <path className="mark-acad-f" d="M224.7 257.5C228.9 257.7 242.4 258 250 258.5C257.6 259 264.3 259.4 270 260.5C275.7 261.6 281.7 264.2 284 265C283.2 266.2 281 269.5 279.5 272C278 274.5 276.5 277 275 280C273.5 283 272.3 286.7 270.5 290C268.7 293.3 266.9 296.8 264 300C261.1 303.2 257.5 306.6 253 309.5C248.5 312.4 242.5 314.9 237 317.5C231.5 320.1 226.2 322.1 220 325C213.8 327.9 205.3 332.2 200 335C194.7 337.8 191.1 340.1 188 342C184.9 343.9 182.4 345.8 181.3 346.5Z" />
      <path className="mark-acad-b" d="M284 265C286.7 265.8 294.8 267.5 300 270C305.2 272.5 310.9 276.6 315 280C319.1 283.4 322.3 287.2 324.5 290.5C326.7 293.8 327.5 296.8 328 300C328.5 303.2 328.3 306.7 327.5 310C326.7 313.3 325.2 316.7 323 320C320.8 323.3 318.2 326.7 314 330C309.8 333.3 304.3 336.7 298 340C291.7 343.3 284.2 346.7 276 350C267.8 353.3 258 356.7 249 360C240 363.3 230.5 366.7 222 370C213.5 373.3 205.5 376.7 198 380C190.5 383.3 183.5 386.7 177 390C170.5 393.3 164.3 396.7 159 400C153.7 403.3 149.1 407.1 145 410C140.9 412.9 136.2 416.2 134.5 417.5C135.1 416.2 136.2 412.9 138 410C139.8 407.1 142.5 403.3 145 400C147.5 396.7 149.8 393.3 153 390C156.2 386.7 160 383.3 164 380C168 376.7 172 373.3 177 370C182 366.7 187.8 363.3 194 360C200.2 356.7 206.8 353.3 214 350C221.2 346.7 228.8 343.3 237 340C245.2 336.7 255.3 333.3 263 330C270.7 326.7 277.5 323.3 283 320C288.5 316.7 292.7 313.3 296 310C299.3 306.7 301.7 303 303 300C304.3 297 304.3 294.8 304 292C303.7 289.2 302.4 286.2 301 283.5C299.6 280.8 297.3 277.8 295.5 275.5C293.7 273.2 291.9 271.8 290 270C288.1 268.2 285 265.8 284 265Z" />
      <path className="mark-acad-l1" d="M107 472.3L107 457.8C107 452.9 110.7 447.2 115.3 445.2L154.5 428.2C155.3 427.9 156 428.3 156 429.2L156 472.3C156 473.5 155 474.5 153.8 474.5L109.2 474.5C108 474.5 107 473.5 107 472.3Z" />
      <path className="mark-acad-l2" d="M175 472.3L175 418.3C175 413.9 178.3 408.9 182.4 407.1L223.5 389.5C224.3 389.2 225 389.6 225 390.5L225 472.3C225 473.5 224 474.5 222.8 474.5L177.2 474.5C176 474.5 175 473.5 175 472.3Z" />
      <path className="mark-acad-l3" d="M244 472.3L244 388.4C244 382.9 248.2 376.7 253.3 374.7L293.2 358.7C294.7 358.1 296 358.9 296 360.6L296 472.3C296 473.5 295 474.5 293.8 474.5L246.2 474.5C245 474.5 244 473.5 244 472.3Z" />
    </svg>
  ),
  sursum: (
    <svg viewBox="1 0 22 23" aria-hidden="true" focusable="false">
      <g
        fill="none"
        className="mark-sursum-stroke"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 22C8.5 19 3.5 15.5 3.5 11.5C3.5 9 5.5 7.2 7.6 7.2C8.9 7.2 10 7.8 10.8 8.7" />
        <path d="M12 22C15.5 19 20.5 15.5 20.5 11.5C20.5 9 18.5 7.2 16.4 7.2C15.1 7.2 14 7.8 13.2 8.7" />
        <path d="M12 12.5V1M8.5 4.5H15.5" />
      </g>
    </svg>
  ),
  gabarita: (
    <svg viewBox="1 1 22 22" aria-hidden="true" focusable="false">
      <circle cx="12" cy="12" r="10" fill="none" className="mark-gabarita-ring" strokeWidth="1.5" />
      <circle cx="12" cy="12" r="7" className="mark-gabarita-disc" />
      <path
        d="M8.4 12.2 10.9 14.7 15.6 9.8"
        fill="none"
        className="mark-gabarita-check"
        strokeWidth="2.1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  sentinela: (
    <svg viewBox="4 1 40 46" aria-hidden="true" focusable="false">
      <path
        className="mark-sentinela-shield"
        d="M24 3.5 40.5 9.6v13.1c0 10.3-6.6 18-16.5 21.8C14.1 40.7 7.5 33 7.5 22.7V9.6Z"
      />
      <path
        className="mark-sentinela-pulse"
        d="M13.5 25.5h5.2l3.3-8 4.6 14.5 3-6.5h4.9"
        fill="none"
        strokeWidth="3.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  obravisao: (
    <svg viewBox="0 0 32 32" aria-hidden="true" focusable="false">
      <path
        className="mark-obravisao-frame"
        d="M1 1H10V4H4V10H1Z M31 1V10H28V4H22V1Z M1 31V22H4V28H10V31Z M31 31H22V28H28V22H31Z"
      />
      <path
        className="mark-obravisao-house"
        fillRule="evenodd"
        d="M16 6L25 14V25H7V14Z M12.06 15.94L14.5 18.38L19.94 12.94L22.06 15.06L14.5 22.62L9.94 18.06Z"
      />
      <path
        className="mark-obravisao-check"
        d="M12.06 15.94L14.5 18.38L19.94 12.94L22.06 15.06L14.5 22.62L9.94 18.06Z"
      />
    </svg>
  ),
  naescala: (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      className="mark-naescala"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <circle cx="32" cy="32" r="29" strokeWidth="2.25" />
      <g strokeWidth="2.25">
        <line x1="32" y1="7.5" x2="32" y2="3" />
        <line x1="45.25" y1="9.05" x2="46.5" y2="6.88" />
        <line x1="54.95" y1="18.75" x2="57.11" y2="17.5" />
        <line x1="56.5" y1="32" x2="61" y2="32" />
        <line x1="54.95" y1="45.25" x2="57.11" y2="46.5" />
        <line x1="45.25" y1="54.95" x2="46.5" y2="57.11" />
        <line x1="32" y1="56.5" x2="32" y2="61" />
        <line x1="18.75" y1="54.95" x2="17.5" y2="57.11" />
        <line x1="9.05" y1="45.25" x2="6.88" y2="46.5" />
        <line x1="7.5" y1="32" x2="3" y2="32" />
        <line x1="9.05" y1="18.75" x2="6.88" y2="17.5" />
        <line x1="18.75" y1="9.05" x2="17.5" y2="6.88" />
      </g>
      <g strokeWidth="1.5">
        <line x1="14" y1="20" x2="14" y2="44" />
        <line x1="19.14" y1="20" x2="19.14" y2="44" />
        <line x1="24.29" y1="20" x2="24.29" y2="44" />
        <line x1="29.43" y1="20" x2="29.43" y2="44" />
        <line x1="34.57" y1="20" x2="34.57" y2="44" />
        <line x1="39.71" y1="20" x2="39.71" y2="44" />
        <line x1="44.86" y1="20" x2="44.86" y2="44" />
        <line x1="50" y1="20" x2="50" y2="44" />
        <line x1="14" y1="20" x2="50" y2="20" />
        <line x1="14" y1="28" x2="50" y2="28" />
        <line x1="14" y1="36" x2="50" y2="36" />
        <line x1="14" y1="44" x2="50" y2="44" />
      </g>
      <rect x="40.71" y="29" width="3.14" height="6" rx="0.75" className="mark-naescala-slot" stroke="none" />
    </svg>
  ),
};

export const projectMarkSlugs = Object.keys(marks);

/** The product's own mark inside a themed plate; `name` is announced by the card title. */
export function ProjectMark({ slug }: { slug: string }) {
  const mark = marks[slug];
  if (!mark) return null;
  return (
    <span className="project-mark" data-mark={slug} aria-hidden="true">
      {mark}
    </span>
  );
}

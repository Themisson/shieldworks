// Records, for each sitemap route group, the date of the last commit that changed its
// page or catalogue. Vercel builds from a shallow clone, so the dates are committed
// in src/data/sitemap-dates.json instead of being read from Git at build time.
// Dependency-only commits (chore(deps)) are skipped: they do not change content.
// Run with `npm run sitemap:dates` after changing a page or a catalogue in src/data.
import fs from "node:fs";
import { execFileSync } from "node:child_process";

const page = (route) => `src/app/[locale]${route}/page.tsx`;
const sources = {
  "/": ["src/app/[locale]/page.tsx", "src/components/landing"],
  "/sobre": [page("/sobre"), "src/data/profile.ts", "src/styles/about.css"],
  "/solucoes": [page("/solucoes")],
  "/sistemas": [page("/sistemas")],
  "/projetos": [page("/projetos"), "src/data/projects.ts"],
  "/projetos/*": [page("/projetos/[slug]"), "src/data/projects.ts"],
  "/pesquisa": [page("/pesquisa"), "src/data/research.ts"],
  "/pesquisa/*": [page("/pesquisa/[area]"), "src/data/research.ts"],
  "/pesquisa/publicacoes": [page("/pesquisa/publicacoes"), "src/data/publications.ts"],
  "/pesquisa/publicacoes/*": [page("/pesquisa/publicacoes/[id]"), "src/data/publications.ts"],
  "/pesquisa/projetos": [page("/pesquisa/projetos"), "src/data/research.ts"],
  "/assessoria-academica": [page("/assessoria-academica")],
  "/contato": [page("/contato")],
  "/privacidade": [page("/privacidade")],
  "/conteudo": [page("/conteudo"), "content/articles"],
  "/cases": [page("/cases"), "src/data/cases.ts"],
  "/cases/*": [page("/cases/[slug]"), "src/data/cases.ts"],
};

const dates = {};
for (const [route, paths] of Object.entries(sources)) {
  for (const path of paths) if (!fs.existsSync(path)) throw new Error(`Missing source for ${route}: ${path}`);
  const date = execFileSync(
    "git",
    ["log", "-1", "--format=%cs", "--invert-grep", "--grep=^chore(deps)", "--", ...paths.map((path) => `:(literal)${path}`)],
    { encoding: "utf8" },
  ).trim();
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) throw new Error(`No commit date for ${route}`);
  dates[route] = date;
}
fs.writeFileSync("src/data/sitemap-dates.json", `${JSON.stringify(dates, null, 2)}\n`);
console.log(dates);

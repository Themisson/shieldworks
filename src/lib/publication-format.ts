import type { Publication } from "@/data/publications";
import type { Locale } from "@/i18n/translations";

const kindLabels: Record<Publication["kind"], [string, string]> = {
  artigo: ["Artigo científico", "Journal article"],
  periodico: ["Periódico", "Journal"],
  congresso: ["Artigo em congresso", "Conference paper"],
  tese: ["Tese", "Thesis"],
};

export function kindLabel(kind: Publication["kind"], locale: Locale) {
  return kindLabels[kind][locale === "en" ? 1 : 0];
}

export function citation(publication: Publication) {
  return `${publication.authors} (${publication.year}). ${publication.title}. ${publication.venue}.${publication.doi ? ` DOI: ${publication.doi}.` : ""}`;
}
const bibEscape = (value: string) =>
  value
    .replace(/\\/g, "\\textbackslash{}")
    .replace(/[{}%&#_$]/g, (char) => `\\${char}`);
export function bibtex(publication: Publication) {
  const kind =
    publication.kind === "tese"
      ? "phdthesis"
      : publication.kind === "congresso"
        ? "inproceedings"
        : "article";
  const venue =
    kind === "phdthesis"
      ? "school"
      : kind === "inproceedings"
        ? "booktitle"
        : "journal";
  const authors = publication.authors
    .split(",")
    .map((author) => author.trim())
    .join(" and ")
    .replace(/ et al\./g, " and others");
  const fields: [string, string][] = [
    ["title", publication.title],
    ["author", authors],
    ["year", String(publication.year)],
    [venue, publication.venue],
    ["url", publication.href],
  ];
  if (publication.doi) fields.push(["doi", publication.doi]);
  return `@${kind}{${publication.id},\n${fields.map(([key, value]) => `  ${key} = {${bibEscape(value)}}`).join(",\n")}\n}`;
}

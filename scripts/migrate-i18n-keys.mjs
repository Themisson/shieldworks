import fs from "node:fs";

const src = fs.readFileSync(new URL("../src/i18n/translations.ts", import.meta.url), "utf8");
const start = src.indexOf("export const translations");
const braceStart = src.indexOf("{", start);
const braceEnd = src.lastIndexOf("};");
const body = src.slice(braceStart, braceEnd + 1);
const entries = [...body.matchAll(/"((?:\\.|[^"\\])*)"\s*:\s*"((?:\\.|[^"\\])*)"/g)].map((m) => [
  JSON.parse(`"${m[1]}"`),
  JSON.parse(`"${m[2]}"`)
]);

function slug(s) {
  return s
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ".")
    .replace(/^\.|\.$/g, "")
    .slice(0, 48)
    .replace(/\.+/g, ".");
}

const preferred = {
  Início: "nav.home",
  Sobre: "nav.about",
  Soluções: "nav.solutions",
  Sistemas: "nav.systems",
  Pesquisa: "nav.research",
  Insights: "nav.insights",
  "Assessoria Acadêmica": "nav.academic",
  Contato: "nav.contact",
  Privacidade: "nav.privacy",
  Menu: "nav.menu",
  Navegação: "nav.navigation",
  Nome: "form.name",
  "E-mail": "form.email",
  Mensagem: "form.message",
  "Enviar mensagem": "form.send",
  "Enviando...": "form.sending",
  "Este campo é obrigatório.": "form.required",
  "Informe um e-mail válido.": "form.invalid_email",
  "Selecione uma área": "form.select_area",
  "Área de interesse": "form.interest",
  "Telefone/WhatsApp": "form.phone",
  Instituição: "form.institution",
  Comentário: "form.comment",
  "Nome opcional": "form.name_optional",
  "E-mail opcional": "form.email_optional",
  "Nota de 1 a 5": "form.rating",
  "Enviar feedback": "form.send_feedback",
  "Formulário de contato": "form.contact_aria",
  "Formulário de opinião": "form.feedback_aria",
  "Campos marcados com * são obrigatórios.": "form.required_hint",
  "Enviando mensagem...": "form.sending_message",
  "Registrando feedback...": "form.sending_feedback",
  "Preencha os campos obrigatórios: nome, e-mail, área de interesse e mensagem.": "form.required_contact",
  "As informações enviadas serão utilizadas exclusivamente para análise da demanda e retorno profissional.":
    "form.privacy_note",
  "Vamos conversar": "cta.talk",
  "Solicitar contato": "cta.request_contact",
  "Falar sobre um projeto": "cta.project",
  "Abrir formulário de feedback": "feedback.open",
  "Fechar formulário de feedback": "feedback.close",
  "Sua opinião ajuda a melhorar a experiência, os conteúdos e as soluções apresentadas no site.":
    "feedback.description",
  Lattes: "link.lattes",
  ORCID: "link.orcid",
  GitHub: "link.github",
  LinkedIn: "link.linkedin",
  "Google Acadêmico": "link.scholar",
  WhatsApp: "link.whatsapp",
  "Currículo Lattes": "link.lattes_full",
  "Acessar sistemas": "action.access_systems",
  "Solicitar uma análise inicial": "action.request_analysis",
  "Ver como posso ajudar": "action.how_i_help",
  "Ver todas as soluções": "action.all_solutions",
  "Ver todos os insights": "action.all_insights",
  "Ler conteúdo": "action.read_content",
  "Contexto": "case.context",
  "Problema": "case.problem",
  "Método": "case.method",
  "Entregas": "case.delivery",
  "Impacto": "case.impact",
  "Ver o case": "case.view",
  "Pesquisa aplicada": "case.type.research",
  "Sistema digital": "case.type.system",
  "Consultoria técnica": "case.type.consulting",
  "Artigo": "pub.article",
  "Tese": "pub.thesis",
  "Congresso": "pub.conference",
  "Periódico": "pub.journal",
  "Destaque": "pub.highlight",
  "Ver no Scholar": "pub.view_scholar"
};

const used = new Set();
const lines = [];

for (const [pt, en] of entries) {
  let key = preferred[pt];
  if (!key) {
    const base = `msg.${slug(pt) || "item"}`;
    key = base;
    let i = 2;
    while (used.has(key)) {
      key = `${base}.${i}`;
      i += 1;
    }
  }
  if (used.has(key)) {
    let i = 2;
    const base = key;
    while (used.has(key)) {
      key = `${base}.${i}`;
      i += 1;
    }
  }
  used.add(key);
  lines.push(`  ${JSON.stringify(key)}: { pt: ${JSON.stringify(pt)}, en: ${JSON.stringify(en)} }`);
}

const out = `export type Locale = "pt" | "en";

export const localeLabels: Record<Locale, string> = {
  pt: "PT",
  en: "EN"
};

export const messages = {
${lines.join(",\n")}
} as const;

export type MessageKey = keyof typeof messages;

/** PT text -> EN (DOM walker for server-rendered Portuguese content) */
export const translations: Record<string, string> = Object.fromEntries(
  Object.values(messages).map((entry) => [entry.pt, entry.en])
);

/**
 * Translate by semantic key (preferred) or Portuguese source text (fallback).
 */
export function translate(key: string, locale: Locale): string {
  const entry = (messages as Record<string, { pt: string; en: string } | undefined>)[key];
  if (entry) {
    return entry[locale] ?? entry.pt;
  }

  if (locale === "en") {
    return translations[key] ?? key;
  }

  // If a message key was used while locale is pt, return its pt value when available
  return key;
}

/** Server-safe Portuguese string for a message key */
export function msg(key: MessageKey): string {
  return messages[key].pt;
}
`;

const outPath = new URL("../src/i18n/translations.ts", import.meta.url);
fs.writeFileSync(outPath, out, "utf8");
console.log(`Migrated ${entries.length} entries to keyed messages.`);

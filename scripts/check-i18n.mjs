import fs from "node:fs";
import path from "node:path";
import ts from "typescript";

/**
 * Coverage guard for keyed messages: { key: { pt, en } }.
 */

const translationsPath = path.resolve("src/i18n/translations.ts");

// Dynamic import of compiled is hard for TS; parse the source instead.
const source = fs.readFileSync(translationsPath, "utf8");
const start = source.indexOf("export const messages");
const braceStart = source.indexOf("{", start);
const braceEnd = source.indexOf("} as const", braceStart);
if (braceStart < 0 || braceEnd < 0) {
  console.error("Could not parse messages object.");
  process.exit(1);
}

const objectLiteral = source.slice(braceStart, braceEnd + 1);
const entryRegex =
  /"((?:\\.|[^"\\])*)"\s*:\s*\{\s*pt:\s*"((?:\\.|[^"\\])*)"\s*,\s*en:\s*"((?:\\.|[^"\\])*)"\s*\}/g;

const entries = [...objectLiteral.matchAll(entryRegex)].map((match) => ({
  key: JSON.parse(`"${match[1]}"`),
  pt: JSON.parse(`"${match[2]}"`),
  en: JSON.parse(`"${match[3]}"`),
}));

const keys = new Set();
const pts = new Set();
const issues = [];

for (const entry of entries) {
  if (keys.has(entry.key)) {
    issues.push(`Duplicate key: ${entry.key}`);
  }
  keys.add(entry.key);

  if (!entry.pt.trim()) {
    issues.push(`Empty PT for key: ${entry.key}`);
  }
  if (!entry.en.trim()) {
    issues.push(`Empty EN for key: ${entry.key}`);
  }
  if (pts.has(entry.pt)) {
    // Same PT in two keys is ok for aliases, but warn only if identical key collision — skip
  }
  pts.add(entry.pt);

  if (!entry.key.includes(".") && !entry.key.startsWith("msg.")) {
    issues.push(`Key should be namespaced (a.b): ${entry.key}`);
  }
}

if (entries.length < 50) {
  issues.push(`Unexpectedly small dictionary size: ${entries.length}`);
}

// Validate the supplemental React-owned source aliases without executing TypeScript.
const aliases = ts.createSourceFile(
  "v2-messages.ts",
  fs.readFileSync("src/i18n/v2-messages.ts", "utf8"),
  ts.ScriptTarget.Latest,
  true,
);
for (const diagnostic of aliases.parseDiagnostics)
  issues.push(ts.flattenDiagnosticMessageText(diagnostic.messageText, "\n"));
const declaration = aliases.statements.find((node) =>
  ts.isVariableStatement(node),
)?.declarationList.declarations[0];
const aliasKeys = new Set();
if (!declaration || !ts.isObjectLiteralExpression(declaration.initializer))
  issues.push("Invalid V2 aliases object");
else
  for (const property of declaration.initializer.properties) {
    if (
      !ts.isPropertyAssignment(property) ||
      !(ts.isStringLiteral(property.name) || ts.isIdentifier(property.name)) ||
      !ts.isStringLiteral(property.initializer)
    ) {
      issues.push("Aliases must contain literal text pairs");
      continue;
    }
    const key = property.name.text,
      value = property.initializer.text;
    if (aliasKeys.has(key)) issues.push(`Duplicate V2 source: ${key}`);
    if (!key.trim() || !value.trim())
      issues.push(`Empty V2 translation: ${key}`);
    aliasKeys.add(key);
  }
if (
  /TreeWalker|translateDocument|createTreeWalker/.test(
    fs.readFileSync("src/i18n/locale-provider.tsx", "utf8"),
  )
)
  issues.push("DOM translation must not return");

// Preferred semantic keys must exist
const required = [
  "nav.home",
  "nav.contact",
  "form.name",
  "form.email",
  "form.send",
  "form.required",
  "cta.talk",
];
for (const key of required) {
  if (!keys.has(key)) {
    issues.push(`Missing required semantic key: ${key}`);
  }
}

if (issues.length) {
  console.error(
    "i18n check failed:\n" + issues.map((i) => `- ${i}`).join("\n"),
  );
  process.exit(1);
}

console.log(
  `i18n check passed (${entries.length} keyed messages, ${aliasKeys.size} V2 aliases, ${required.length} required keys ok).`,
);

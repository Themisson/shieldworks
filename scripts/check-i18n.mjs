import fs from "node:fs";
import path from "node:path";

/**
 * Coverage guard for the flat PT→EN dictionary.
 * Fails if:
 * - empty translation values
 * - duplicate keys (already prevented by TS, but double-check runtime object)
 * - translation value equals key for long UI strings (likely missing)
 */

const translationsPath = path.resolve("src/i18n/translations.ts");
const source = fs.readFileSync(translationsPath, "utf8");

// Extract object body between first { and last };
const start = source.indexOf("export const translations");
const braceStart = source.indexOf("{", start);
const braceEnd = source.lastIndexOf("};");
if (braceStart < 0 || braceEnd < 0) {
  console.error("Could not parse translations object.");
  process.exit(1);
}

const objectLiteral = source.slice(braceStart, braceEnd + 1);
// Convert TS object to JSON-ish via Function (keys/values are string literals)
const entries = [...objectLiteral.matchAll(/"((?:\\.|[^"\\])*)"\s*:\s*"((?:\\.|[^"\\])*)"/g)].map(
  (match) => [JSON.parse(`"${match[1]}"`), JSON.parse(`"${match[2]}"`)]
);

const map = new Map();
const issues = [];

for (const [key, value] of entries) {
  if (map.has(key)) {
    issues.push(`Duplicate key: ${key}`);
  }
  map.set(key, value);

  if (!value.trim()) {
    issues.push(`Empty translation for: ${key}`);
  }

  if (key.length > 40 && value === key) {
    issues.push(`Likely untranslated long string: ${key.slice(0, 80)}...`);
  }
}

if (map.size < 50) {
  issues.push(`Unexpectedly small dictionary size: ${map.size}`);
}

if (issues.length) {
  console.error("i18n check failed:\n" + issues.map((i) => `- ${i}`).join("\n"));
  process.exit(1);
}

console.log(`i18n check passed (${map.size} entries).`);

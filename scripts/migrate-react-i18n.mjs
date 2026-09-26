// One-time migration of baseline JSX text to React-owned translation nodes.
// The migration is idempotent and never walks or mutates a browser DOM.
import fs from "node:fs";
import path from "node:path";
import ts from "typescript";

const config = ts.readConfigFile("tsconfig.json", ts.sys.readFile);
const parsed = ts.parseJsonConfigFileContent(config.config, ts.sys, process.cwd());
const program = ts.createProgram(parsed.fileNames, parsed.options);
const checker = program.getTypeChecker();
const baseline = new Set([
  "section-title", "footer", "logo", "ProfileHighlights", "ProfessionalLinks", "publications",
  "case-study", "card", "button-link", "badge", "cta", "forms", "FloatingFeedback", "profile-portrait"
]);
let count = 0;
for (const file of program.getSourceFiles()) {
  const name = file.fileName.replaceAll("\\", "/");
  if (!name.endsWith(".tsx") || !(name.includes("/app/[locale]/") || name.includes("/components/"))) continue;
  if (name.includes("/app/[locale]/") && ["layout.tsx","page.tsx"].includes(path.basename(name)) && name.split("/app/[locale]/")[1].split("/").length === 1) continue;
  if (name.includes("/components/") && !baseline.has(path.basename(name,".tsx"))) continue;
  let source = fs.readFileSync(file.fileName, "utf8");
  const edits = [];
  const insideText = node => {
    for(let parent=node.parent;parent;parent=parent.parent) {
      if (ts.isJsxElement(parent) && parent.openingElement.tagName.getText(file) === "Text") return true;
    }
    return false;
  };
  function visit(node) {
    if (insideText(node)) return;
    if (ts.isJsxText(node)) {
      const raw = node.text.replace(/\s+/g," ").trim();
      if(raw && !/^[*·©↗→×]+$/.test(raw)) edits.push([node.getStart(file),node.getEnd(),`<Text>{${JSON.stringify(raw)}}</Text>`]);
    } else if (ts.isJsxExpression(node) && node.expression && (ts.isJsxElement(node.parent) || ts.isJsxFragment(node.parent))) {
      const type = checker.getTypeAtLocation(node.expression);
      if (type.flags & (ts.TypeFlags.String | ts.TypeFlags.StringLiteral | ts.TypeFlags.TemplateLiteral)) {
        edits.push([node.getStart(file),node.getEnd(),`<Text>{${node.expression.getText(file)}}</Text>`]);
      }
    }
    ts.forEachChild(node,visit);
  }
  visit(file);
  if(edits.length) {
    for (const [start,end,text] of edits.sort((a,b)=>b[0]-a[0])) source=source.slice(0,start)+text+source.slice(end);
    if (source.includes('from "@/i18n/locale-provider"')) source=source.replace(/import \{([^}]+)\} from "@\/i18n\/locale-provider";/,(_,names)=>`import { ${names.trim()}, Text } from "@/i18n/locale-provider";`);
    else {
      const insertion=source.startsWith('"use client";') ? source.indexOf("\n")+1 : 0;
      source=source.slice(0,insertion)+'\nimport { Text } from "@/i18n/locale-provider";\n'+source.slice(insertion);
    }
    count+=edits.length;
  }
  source=source.replace('import Link from "next/link";', 'import Link from "@/components/localized-link";');
  fs.writeFileSync(file.fileName,source);
}
console.log(`Migrated ${count} baseline text nodes to React translations.`);

// Reproducible local visual review and resource measurements; never contacts production.
import fs from "node:fs";
import { spawn } from "node:child_process";
import { chromium } from "@playwright/test";

const directory = "test-results/visual-review";
fs.mkdirSync(directory, { recursive: true });
fs.mkdirSync("docs/validation", { recursive: true });
fs.cpSync("public", ".next/standalone/public", { recursive: true });
fs.cpSync(".next/static", ".next/standalone/.next/static", { recursive: true });
const server = spawn(process.execPath, [".next/standalone/server.js"], {
  env: { ...process.env, HOSTNAME: "127.0.0.1", PORT: "3400" },
  stdio: ["ignore", "pipe", "pipe"],
});
let logs = "";
server.stdout.on("data", (chunk) => {
  logs += chunk;
});
server.stderr.on("data", (chunk) => {
  logs += chunk;
});
const ready = async () => {
  for (let i = 0; i < 120; i++) {
    if (server.exitCode !== null) throw new Error(logs);
    try {
      if ((await fetch("http://127.0.0.1:3400")).ok) return;
    } catch {}
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
  throw new Error("Local review server did not start");
};
let browser;
try {
  await ready();
  browser = await chromium.launch();
  const measurements = [];
  for (const width of [390, 1440]) {
    const context = await browser.newContext({
      viewport: { width, height: width === 390 ? 844 : 900 },
    });
    const page = await context.newPage();
    await page.addInitScript(() => {
      window.reviewMetrics = { lcp: 0, cls: 0, longTasks: 0 };
      new PerformanceObserver((list) => {
        for (const item of list.getEntries())
          window.reviewMetrics.lcp = item.startTime;
      }).observe({ type: "largest-contentful-paint", buffered: true });
      new PerformanceObserver((list) => {
        for (const item of list.getEntries())
          if (!item.hadRecentInput) window.reviewMetrics.cls += item.value;
      }).observe({ type: "layout-shift", buffered: true });
      new PerformanceObserver((list) => {
        for (const item of list.getEntries())
          window.reviewMetrics.longTasks += Math.max(0, item.duration - 50);
      }).observe({ type: "longtask", buffered: true });
    });
    await page.goto("http://127.0.0.1:3400");
    await page.waitForLoadState("networkidle");
    await page.evaluate(() => document.fonts.ready);
    measurements.push(
      await page.evaluate((width) => {
        const entries = performance.getEntriesByType("resource");
        const sum = (items, field) =>
          Math.round(items.reduce((value, item) => value + item[field], 0));
        return {
          width,
          ...window.reviewMetrics,
          lcp: window.reviewMetrics.lcp > 0 ? window.reviewMetrics.lcp : null,
          fcp: performance.getEntriesByName("first-contentful-paint")[0]
            ?.startTime,
          resources: entries.length,
          jsTransferBytes: sum(
            entries.filter((item) => item.initiatorType === "script"),
            "transferSize",
          ),
          totalTransferBytes: sum(entries, "transferSize"),
          resourcesByType: entries.map((item) => ({
            name: new URL(item.name).pathname,
            transferBytes: item.transferSize,
            decodedBytes: item.decodedBodySize,
          })),
        };
      }, width),
    );
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.screenshot({
      path: `${directory}/home-${width}.png`,
      fullPage: true,
      animations: "disabled",
    });
    const sectionGeometry = await page
      .locator(".landing-screen")
      .evaluateAll((nodes) =>
        nodes.map((node) => ({
          id: node.id,
          y: node.getBoundingClientRect().top + window.scrollY,
          height: node.getBoundingClientRect().height,
        })),
      );
    fs.writeFileSync(
      `${directory}/sections-${width}.json`,
      JSON.stringify(sectionGeometry, null, 2),
    );
    for (const section of await page.locator(".landing-screen").all()) {
      const id = await section.getAttribute("id");
      await section.screenshot({
        path: `${directory}/section-${id}-${width}.png`,
        animations: "disabled",
      });
    }
    for (const route of [
      "sobre",
      "solucoes",
      "sistemas",
      "pesquisa",
      "pesquisa/publicacoes/ijrmms-2025-lot",
      "conteudo/modelagem-numerica-com-abaqus",
      "projetos/mdfolio",
      "contato",
      "assessoria-academica",
      "privacidade",
    ]) {
      await page.goto("http://127.0.0.1:3400/" + route);
      await page.evaluate(() => document.fonts.ready);
      await page.screenshot({
        path: `${directory}/page-${route.replaceAll("/", "-")}-${width}.png`,
        fullPage: true,
        animations: "disabled",
      });
    }
    await context.close();
  }
  fs.writeFileSync(
    "docs/validation/performance-local.json",
    JSON.stringify(
      {
        date: "2026-09-26",
        method:
          "Chromium headless, local standalone, cold browser contexts, no CPU/network throttling; synthetic measurements, not field CWV or Lighthouse; null LCP means the observer did not receive a candidate",
        measurements,
      },
      null,
      2,
    ) + "\n",
  );
  console.log(
    JSON.stringify(
      measurements.map((result) =>
        Object.fromEntries(
          Object.entries(result).filter(([key]) => key !== "resourcesByType"),
        ),
      ),
      null,
      2,
    ),
  );
} finally {
  await browser?.close();
  server.kill();
  fs.writeFileSync("docs/validation/server-review.log", logs);
}

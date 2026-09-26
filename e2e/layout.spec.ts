import { test, expect, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const viewports = [
  [360, 800],
  [390, 844],
  [430, 932],
  [768, 1024],
  [1024, 768],
  [1280, 720],
  [1366, 768],
  [1440, 900],
  [1536, 864],
  [1600, 900],
  [1707, 898],
  [1920, 1080],
  [2560, 1440],
];
const routes = [
  "/",
  "/projetos",
  "/projetos/mdfolio",
  "/pesquisa",
  "/pesquisa/geomecanica",
  "/pesquisa/publicacoes/ijrmms-2025-lot",
  "/conteudo/modelagem-numerica-com-abaqus",
  "/contato",
  "/sobre",
  "/sistemas",
  "/assessoria-academica",
  "/privacidade",
  "/cases",
];

async function noOverflow(page: Page) {
  expect(
    await page.evaluate(
      () =>
        document.documentElement.scrollWidth -
        document.documentElement.clientWidth,
    ),
  ).toBeLessThanOrEqual(1);
}

for (const [width, height] of viewports) {
  test(`responsive ${width}x${height}`, async ({ page }, info) => {
    await page.setViewportSize({ width, height });
    await page.emulateMedia({ reducedMotion: "reduce" });
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    page.on("console", (message) => {
      if (message.type() === "error") errors.push(message.text());
    });
    for (const route of routes) {
      const response = await page.goto(route);
      expect(response?.status(), route).toBe(200);
      await page.evaluate(() => document.fonts.ready);
      await expect(page.locator("main h1")).toHaveCount(1);
      await noOverflow(page);
      const geometry = await page.evaluate(() => {
        const header = document
          .querySelector(".header-row")!
          .getBoundingClientRect();
        const footer = document
          .querySelector("footer .section-shell")!
          .getBoundingClientRect();
        const shell = document
          .querySelector("main .section-shell")!
          .getBoundingClientRect();
        const gutter = parseFloat(
          getComputedStyle(document.querySelector(".header-row")!).paddingLeft,
        );
        return {
          header: header.left + gutter,
          footer:
            footer.left +
            parseFloat(
              getComputedStyle(document.querySelector("footer .section-shell")!)
                .paddingLeft,
            ),
          main:
            shell.left +
            parseFloat(
              getComputedStyle(document.querySelector("main .section-shell")!)
                .paddingLeft,
            ),
          width: header.width,
        };
      });
      expect(Math.abs(geometry.header - geometry.footer)).toBeLessThanOrEqual(
        1,
      );
      expect(Math.abs(geometry.header - geometry.main)).toBeLessThanOrEqual(1);
      expect(geometry.width).toBeGreaterThanOrEqual(width - 1);
      if (route === "/") {
        await expect(page.locator(".landing-screen")).toHaveCount(12);
        const sections = await page
          .locator(".landing-screen")
          .evaluateAll((nodes) =>
            nodes.map((node) => ({
              height: node.clientHeight,
              scroll: node.scrollHeight,
            })),
          );
        expect(
          sections.every((section) => section.scroll <= section.height + 2),
        ).toBe(true);
        await page.screenshot({
          path: info.outputPath(`home-${width}.png`),
          fullPage: true,
          animations: "disabled",
        });
      }
      if (
        route === "/conteudo/modelagem-numerica-com-abaqus" ||
        route === "/projetos/mdfolio" ||
        route === "/contato"
      )
        await page.screenshot({
          path: info.outputPath(`${route.split("/")[1]}-${width}.png`),
          fullPage: true,
          animations: "disabled",
        });
    }
    expect(errors).toEqual([]);
  });
}

for (const width of [390, 1440]) {
  test(`accessible landmarks and contrast ${width}`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    for (const route of [
      "/",
      "/contato",
      "/conteudo/modelagem-numerica-com-abaqus",
      "/pesquisa",
      "/projetos/mdfolio",
      "/en/sobre",
    ]) {
      await page.goto(route);
      const results = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
        .analyze();
      expect(
        results.violations.map((item) => ({
          id: item.id,
          nodes: item.nodes.map((node) => node.target),
        })),
        route,
      ).toEqual([]);
    }
  });
}

test("mobile menu traps focus, closes with Escape and navigates", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  const trigger = page.getByRole("button", { name: "Abrir menu de navegação" });
  await trigger.click();
  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();
  await expect(trigger).toHaveAttribute("aria-expanded", "true");
  for (let index = 0; index < 20; index++) {
    await page.keyboard.press("Tab");
    expect(
      await dialog.evaluate((node) => node.contains(document.activeElement)),
    ).toBe(true);
  }
  await page.keyboard.press("Escape");
  await expect(dialog).not.toBeVisible();
  await expect(trigger).toBeFocused();
  await trigger.click();
  await dialog.getByRole("link", { name: "Projetos", exact: true }).click();
  await expect(page).toHaveURL(/\/projetos$/);
  await expect(dialog).not.toBeVisible();
});

test("locale SSR, canonical, redirects and English content", async ({
  page,
  request,
}) => {
  for (const route of [
    "/",
    "/en",
    "/pt",
    "/en/sobre",
    "/en/contato",
    "/en/pesquisa",
  ]) {
    const response = await request.get(route);
    expect(response.status()).toBe(200);
    const html = await response.text();
    expect(html).toContain(
      route.startsWith("/en") ? 'lang="en"' : 'lang="pt-BR"',
    );
  }
  await page.goto("/en");
  await expect(page.locator("h1")).toContainText(
    "Engineering, research and software",
  );
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    "href",
    "https://www.shieldworks.com.br/en",
  );
  await page.goto("/en/sobre");
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    "href",
    "https://www.shieldworks.com.br/en/sobre",
  );
  await expect(page.locator("main")).toContainText("Computational");
  await page.goto("/insights/modelagem-numerica-com-abaqus");
  await expect(page).toHaveURL(/\/conteudo\/modelagem-numerica-com-abaqus$/);
  await page.goto("/en/insights");
  await expect(page).toHaveURL(/\/en\/conteudo$/);
  await page.goto("/pt");
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    "href",
    "https://www.shieldworks.com.br",
  );
});

test("sections, anchors, snap, motion and keyboard scroll", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1920, height: 1080 });
  await page.goto("/");
  const indicator = page.getByRole("navigation", { name: "Seções da página" });
  await expect(indicator).toBeVisible();
  await expect(page.locator(".engineering-plate").first()).toHaveAttribute(
    "data-playing",
    "true",
  );
  await page.getByRole("button", { name: "Pausar movimento" }).first().click();
  await expect(page.locator(".engineering-plate").first()).toHaveAttribute(
    "data-playing",
    "false",
  );
  await page.getByRole("button", { name: "Retomar movimento" }).first().click();
  // Chromium serializes the default proximity keyword as simply "y".
  expect(
    await page.evaluate(
      () => getComputedStyle(document.documentElement).scrollSnapType,
    ),
  ).toBe("y");
  await indicator
    .getByRole("link", { name: "04 / Pesquisa", exact: true })
    .click();
  await expect(
    indicator.getByRole("link", { name: "04 / Pesquisa", exact: true }),
  ).toHaveAttribute("aria-current", "location");
  expect(
    await page
      .locator("#pesquisa")
      .evaluate((node) => node.getBoundingClientRect().top),
  ).toBeGreaterThanOrEqual(70);
  await expect(page.locator(".engineering-plate").first()).toHaveAttribute(
    "data-playing",
    "false",
  );
  await page.keyboard.press("End");
  await expect(page.locator("footer")).toBeInViewport();
  await page.keyboard.press("Home");
  await expect(page.locator("h1")).toBeInViewport();
  await page.emulateMedia({ reducedMotion: "reduce" });
  expect(
    await page.evaluate(
      () => getComputedStyle(document.documentElement).scrollSnapType,
    ),
  ).toBe("none");
  expect(
    await page
      .locator(".scene-draw")
      .first()
      .evaluate((node) => getComputedStyle(node).animationName),
  ).toBe("none");
  await page.setViewportSize({ width: 1280, height: 600 });
  expect(
    await page.evaluate(
      () => getComputedStyle(document.documentElement).scrollSnapType,
    ),
  ).toBe("none");
});

test("filter, feeds, OG, not-found and contact validation without sending", async ({
  page,
  request,
}) => {
  await page.goto("/conteudo?category=invalid");
  await expect(page.locator("main")).toContainText("Nenhum");
  const feed = await request.get("/feed.xml");
  expect(feed.status()).toBe(200);
  expect(feed.headers()["content-type"]).toContain("xml");
  expect((await feed.text()).match(/<item>/g)).toHaveLength(6);
  const sitemap = await request.get("/sitemap.xml");
  expect(sitemap.status()).toBe(200);
  expect(await sitemap.text()).toContain("/en/pesquisa/publicacoes");
  const og = await request.get("/og?title=Engenharia");
  expect(og.status()).toBe(200);
  expect(og.headers()["content-type"]).toBe("image/png");
  const missing = await page.goto("/pagina-inexistente");
  expect(missing?.status()).toBe(404);
  await expect(page.locator("h1")).toBeVisible();
  await page.goto("/contato");
  await page.route("**/api/contact", (route) =>
    route.fulfill({
      status: 503,
      contentType: "application/json",
      body: JSON.stringify({ error: "Envio indisponível para teste local." }),
    }),
  );
  await page.getByRole("button", { name: /Enviar/ }).click();
  expect(
    await page
      .locator('input[name="name"]')
      .evaluate((node) => (node as HTMLInputElement).validity.valueMissing),
  ).toBe(true);
  await page.locator('input[name="name"]').fill("Teste local");
  await page.locator('input[name="email"]').fill("local@example.test");
  await page
    .locator('textarea[name="message"]')
    .fill(
      "Validação local com requisição interceptada pelo Playwright, sem enviar email.",
    );
  const consent = page.locator('input[type="checkbox"]');
  if (await consent.count()) await consent.check();
  await page.locator('select[name="interest"]').selectOption({ index: 1 });
  await page.getByRole("button", { name: /Enviar/ }).click();
  await expect(page.locator('[aria-live="polite"]')).toContainText(
    "Não foi possível enviar",
  );
});

test("small height, large text and no JavaScript keep content readable", async ({
  browser,
  page,
}) => {
  await page.setViewportSize({ width: 1024, height: 500 });
  await page.goto("/");
  await page.addStyleTag({ content: "html { font-size: 24px !important; }" });
  await noOverflow(page);
  await expect(page.locator("h1")).toBeVisible();
  const context = await browser.newContext({
    javaScriptEnabled: false,
    viewport: { width: 390, height: 844 },
  });
  const staticPage = await context.newPage();
  await staticPage.goto("/en");
  await expect(staticPage.locator("h1")).toContainText("Engineering");
  await noOverflow(staticPage);
  expect(
    await staticPage
      .locator(".scene-draw")
      .first()
      .evaluate((node) => getComputedStyle(node).animationName),
  ).toBe("none");
  await context.close();
});

test("feedback modal isolates background, traps focus and restores trigger", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  const trigger = page.locator(".feedback-trigger");
  await expect(trigger).not.toBeInViewport();
  await trigger.click();
  const dialog = page.locator("#feedback-modal");
  await expect(dialog).toBeVisible();
  expect(
    await page.locator("main").evaluate((node) => (node as HTMLElement).inert),
  ).toBe(true);
  for (let index = 0; index < 24; index++) {
    await page.keyboard.press("Tab");
    expect(
      await dialog.evaluate((node) => node.contains(document.activeElement)),
    ).toBe(true);
  }
  await page.keyboard.press("Escape");
  await expect(dialog).not.toBeVisible();
  await expect(trigger).toBeFocused();
  expect(
    await page.locator("main").evaluate((node) => (node as HTMLElement).inert),
  ).toBe(false);
});

test("all canonical sitemap destinations render and language links navigate", async ({
  request,
  page,
}) => {
  const xml = await (await request.get("/sitemap.xml")).text();
  const links = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map(
    (match) => new URL(match[1]).pathname,
  );
  expect(links.length).toBeGreaterThanOrEqual(60);
  for (const link of links) {
    const response = await request.get(link);
    expect(response.status(), link).toBe(200);
  }
  await page.goto("/projetos/acadimprove");
  await page
    .getByRole("navigation", { name: "Idioma" })
    .getByRole("link", { name: "EN", exact: true })
    .click();
  await expect(page).toHaveURL(/\/en\/projetos\/acadimprove$/);
  await expect(page.locator("main")).toContainText("In development");
  await page
    .getByRole("navigation", { name: "Language" })
    .getByRole("link", { name: "PT", exact: true })
    .click();
  await expect(page).toHaveURL(/\/projetos\/acadimprove$/);
  await expect(page.locator("main")).toContainText("Em desenvolvimento");
});

test("English pages retain responsive layout and localized metadata", async ({
  page,
}) => {
  for (const width of [360, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    for (const route of [
      "/en",
      "/en/solucoes",
      "/en/sistemas",
      "/en/contato",
      "/en/privacidade",
      "/en/pesquisa/metodos-numericos",
      "/en/projetos/gabarita",
      "/en/conteudo/modelagem-numerica-com-abaqus",
    ]) {
      await page.goto(route);
      await noOverflow(page);
      await expect(page.locator("html")).toHaveAttribute("lang", "en");
      await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
        "href",
        "https://www.shieldworks.com.br" + route,
      );
    }
  }
});

test("landing contact preserves the analytics event without personal data", async ({
  page,
}) => {
  await page.addInitScript(() => {
    const queue: [string, unknown?][] = [];
    window.vaq = queue;
    window.va = (event: string, data?: unknown) => queue.push([event, data]);
  });
  await page.goto("/");
  await page.getByRole("link", { name: "Apresentar minha demanda" }).click();
  await expect(page).toHaveURL(/\/contato$/);
  const events = await page.evaluate(() =>
    (window.vaq ?? []).filter((entry) => entry[0] === "event"),
  );
  expect(events).toContainEqual([
    "event",
    expect.objectContaining({
      name: "cta_contact_click",
      data: { source: "landing" },
    }),
  ]);
});

import { test, expect } from "@playwright/test";

const sections = [
  "inicio",
  "shieldworks",
  "solucoes",
  "pesquisa",
  "publicacao",
  "projetos",
  "cases",
  "conteudo",
  "conhecimento",
  "sobre",
  "atualizacoes",
  "contato",
];

test("native next-topic journey aligns every screen and reaches the footer", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1920, height: 1080 });
  await page.goto("/");
  await page.evaluate(() => document.fonts.ready);
  await expect
    .poll(() =>
      page.evaluate(
        () => getComputedStyle(document.documentElement).scrollSnapType,
      ),
    )
    .toBe("y mandatory");
  const diagrams = await page
    .locator(".engineering-plate")
    .evaluateAll((nodes) =>
      nodes.map((node) => node.getAttribute("data-scene-kind")),
    );
  expect(new Set(diagrams).size).toBe(12);
  for (const id of sections) {
    await expect(page.locator(`#${id} svg[role="img"]`)).toHaveCount(1);
    expect(
      await page
        .locator(`#${id}`)
        .evaluate((node) =>
          Math.abs(node.getBoundingClientRect().height - (innerHeight - 72)),
        ),
    ).toBeLessThanOrEqual(2);
    expect(
      await page
        .locator(`#${id}`)
        .evaluate((node) => getComputedStyle(node).scrollSnapAlign),
    ).toBe("start");
    expect(
      await page
        .locator(`#${id}`)
        .evaluate((node) => getComputedStyle(node).scrollSnapStop),
    ).toBe("normal");
  }
  for (let i = 0; i < sections.length - 1; i++) {
    await page.locator(`#${sections[i]} .section-advance a`).click();
    await expect(page).toHaveURL(new RegExp(`#${sections[i + 1]}$`));
    await expect
      .poll(() =>
        page
          .locator(`#${sections[i + 1]}`)
          .evaluate((node) => Math.abs(node.getBoundingClientRect().top - 72)),
      )
      .toBeLessThanOrEqual(2);
  }
  await page.keyboard.press("End");
  await expect(page.locator("footer")).toBeInViewport();
  await page.keyboard.press("Home");
  await expect(page.locator("h1")).toBeInViewport();
  await page.mouse.wheel(0, 750);
  await expect
    .poll(() =>
      page
        .locator("#shieldworks")
        .evaluate((node) => Math.abs(node.getBoundingClientRect().top - 72)),
    )
    .toBeLessThanOrEqual(2);
  await page.keyboard.press("PageDown");
  await expect
    .poll(() =>
      page
        .locator("#solucoes")
        .evaluate((node) => Math.abs(node.getBoundingClientRect().top - 72)),
    )
    .toBeLessThanOrEqual(2);
});

test("snap adapts to tablet, mobile, reduced motion and genuinely tall content", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  await page.evaluate(() => document.fonts.ready);
  const snap = () =>
    page.evaluate(
      () => getComputedStyle(document.documentElement).scrollSnapType,
    );
  await expect.poll(snap).toBe("y mandatory");
  // Simulate enlarged editorial content; the real resize observer must remove mandatory.
  await page.locator("#conteudo").evaluate((node) => {
    const extra = document.createElement("div");
    extra.id = "long-content-fixture";
    extra.style.minHeight = "150vh";
    extra.textContent = "Extended content remains reachable";
    node.append(extra);
  });
  await expect.poll(snap).toBe("y");
  await page
    .locator("#conteudo .section-advance a")
    .evaluate((node) => node.scrollIntoView({ behavior: "instant" }));
  const before = await page.evaluate(() => scrollY);
  await page.keyboard.press("PageDown");
  await expect
    .poll(() => page.evaluate(() => scrollY))
    .toBeGreaterThan(before + 300);
  await page.locator("#long-content-fixture").evaluate((node) => node.remove());
  await expect.poll(snap).toBe("y mandatory");
  await page.setViewportSize({ width: 768, height: 1024 });
  await expect.poll(snap).toBe("y");
  await page.setViewportSize({ width: 390, height: 844 });
  await expect.poll(snap).toBe("none");
  await page.setViewportSize({ width: 1440, height: 500 });
  await expect.poll(snap).toBe("none");
  await page.setViewportSize({ width: 1920, height: 1080 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect.poll(snap).toBe("none");
  for (const id of sections) {
    expect(
      await page
        .locator(`#${id} .scene-draw, #${id} .scene-flow`)
        .first()
        .evaluate((node) => getComputedStyle(node).animationName),
    ).toBe("none");
  }
  expect(
    await page.evaluate(
      () => getComputedStyle(document.documentElement).scrollBehavior,
    ),
  ).toBe("auto");
  await page.goto("/projetos");
  await expect(page.locator("html")).not.toHaveAttribute("data-landing-snap");
  expect(await snap()).toBe("none");
});

test("every scene pauses outside the viewport and keeps complete static geometry", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  const hero = page.locator("#inicio .engineering-plate");
  await expect(hero).toHaveAttribute("data-playing", "true");
  await page.locator("#inicio .motion-control").click();
  await expect(hero).toHaveAttribute("data-playing", "false");
  expect(
    await hero
      .locator(".scene-flow")
      .first()
      .evaluate((node) => getComputedStyle(node).animationPlayState),
  ).toBe("paused");
  await page.locator("#inicio .motion-control").click();
  await page.locator("#inicio .section-advance a").click();
  await expect(hero).toHaveAttribute("data-playing", "false");
  await expect(page.locator("#shieldworks .engineering-plate")).toHaveAttribute(
    "data-playing",
    "true",
  );
  const ids = await page
    .locator("linearGradient")
    .evaluateAll((nodes) => nodes.map((node) => node.id));
  expect(new Set(ids).size).toBe(ids.length);
  expect(
    await page.locator("#pesquisa svg").getAttribute("aria-label"),
  ).toContain("intervalo salino");
});

test("each topic fills one screen on common laptop viewports without clipping", async ({
  page,
}) => {
  // Browser chrome leaves roughly these inner sizes on 1366×768, 1280×800, 1440×900 and 1536×864 laptops.
  for (const [width, height] of [
    [1366, 650],
    [1280, 720],
    [1440, 790],
    [1536, 730],
  ]) {
    await page.setViewportSize({ width, height });
    await page.goto("/");
    await page.evaluate(() => document.fonts.ready);
    await expect
      .poll(() =>
        page.evaluate(
          () => getComputedStyle(document.documentElement).scrollSnapType,
        ),
      )
      .toBe("y mandatory");
    // Geometry is about layout: clear pending slide offsets (transforms) first.
    await page.evaluate(() =>
      document
        .querySelectorAll<HTMLElement>(".landing-screen")
        .forEach((section) => delete section.dataset.slide),
    );
    for (const id of sections) {
      const geometry = await page.locator(`#${id}`).evaluate((section) => {
        const box = section.getBoundingClientRect();
        const advance = section
          .querySelector(".section-advance a")!
          .getBoundingClientRect();
        const content = [
          ...section.querySelectorAll(
            ":scope > .section-shell:not(.section-advance) *",
          ),
        ].reduce(
          (bottom, node) => Math.max(bottom, node.getBoundingClientRect().bottom),
          0,
        );
        return {
          fill: Math.abs(box.height - (innerHeight - 72)),
          overflow: section.scrollHeight - section.clientHeight,
          contentInside: content <= box.bottom,
          advanceClear: advance.top >= content - 1 && advance.bottom <= box.bottom,
        };
      });
      expect(geometry, `${width}x${height} #${id}`).toEqual({
        fill: expect.any(Number),
        overflow: expect.any(Number),
        contentInside: true,
        advanceClear: true,
      });
      expect(geometry.fill, `${width}x${height} #${id}`).toBeLessThanOrEqual(3);
      expect(geometry.overflow, `${width}x${height} #${id}`).toBeLessThanOrEqual(1);
    }
  }
});

test("numbered copy and drawings highlight together, with and without JavaScript", async ({
  page,
  browser,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  const opacity = (selector: string) =>
    page.locator(selector).first().evaluate((node) => getComputedStyle(node).opacity);
  // Only scenes that start off-screen draw themselves in.
  await expect(page.locator("#inicio .engineering-plate")).not.toHaveAttribute(
    "data-entrance",
    /.+/,
  );
  await expect(page.locator("#contato .engineering-plate")).toHaveAttribute(
    "data-entrance",
    "armed",
  );
  // Drawings carry no words at a scaled-down size: labels live in HTML.
  const labels = await page
    .locator('svg[role="img"] text')
    .evaluateAll((nodes) => nodes.map((node) => node.textContent));
  expect(labels.length).toBeGreaterThan(0);
  expect(labels.every((text) => /^\d{2}$/.test(text ?? ""))).toBe(true);
  // The timed sequence walks the parts and lights the matching numbered item.
  await page.locator("#inicio .section-advance a").click();
  const approach = page.locator("#shieldworks .engineering-plate");
  await expect(approach).toHaveAttribute("data-entrance", "run");
  await expect(approach).toHaveAttribute("data-step", "1", { timeout: 6_000 });
  await expect
    .poll(() =>
      page
        .locator('#shieldworks [data-focus="1"]')
        .evaluate((node) => getComputedStyle(node).borderTopColor),
    )
    .toBe("rgb(28, 107, 89)");
  // Pointing at a numbered item takes over from the sequence.
  await page.locator("#solucoes").evaluate((node) =>
    node.scrollIntoView({ behavior: "instant" }),
  );
  await page.locator('#solucoes [data-focus="4"]').hover();
  await expect(page.locator("#solucoes .engineering-plate")).not.toHaveAttribute(
    "data-step",
    /.+/,
  );
  await expect.poll(() => opacity('#solucoes [data-part="4"]')).toBe("1");
  await expect.poll(() => opacity('#solucoes [data-part="1"]')).toBe("0.36");
  // Keyboard focus does the same.
  await page.mouse.move(2, 2);
  await page.locator('#pesquisa [data-focus="2"]').focus();
  await expect.poll(() => opacity('#pesquisa [data-part="2"]')).toBe("1");
  await expect.poll(() => opacity('#pesquisa [data-part="3"]')).toBe("0.36");
  // The pointer link is CSS only, so it survives without JavaScript.
  const context = await browser.newContext({
    javaScriptEnabled: false,
    viewport: { width: 1440, height: 900 },
  });
  const staticPage = await context.newPage();
  await staticPage.goto("/");
  await staticPage.locator('#projetos [data-focus="3"]').hover();
  await expect
    .poll(() =>
      staticPage
        .locator('#projetos [data-part="3"]')
        .evaluate((node) => getComputedStyle(node).opacity),
    )
    .toBe("1");
  await expect
    .poll(() =>
      staticPage
        .locator('#projetos [data-part="1"]')
        .evaluate((node) => getComputedStyle(node).opacity),
    )
    .toBe("0.36");
  await context.close();
});

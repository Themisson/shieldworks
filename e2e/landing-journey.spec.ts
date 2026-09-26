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

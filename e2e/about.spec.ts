import { test, expect } from "@playwright/test";

const noOverflow = () =>
  document.documentElement.scrollWidth - document.documentElement.clientWidth;

test("about keeps the portrait as identity, not as the first screen", async ({
  page,
}) => {
  for (const [width, height, min, max] of [
    [1440, 900, 240, 300],
    [768, 1024, 200, 240],
    [390, 844, 160, 220],
  ]) {
    await page.setViewportSize({ width, height });
    await page.goto("/sobre");
    await page.evaluate(() => document.fonts.ready);
    expect(await page.evaluate(noOverflow), `${width}`).toBeLessThanOrEqual(1);
    await expect(page.locator("main h1")).toHaveCount(1);
    await expect(page.locator("main h1")).toBeInViewport();
    // The first screen belongs to the statement and the convergence drawing.
    await expect(page.locator(".about-portrait")).not.toBeInViewport({
      ratio: 0.5,
    });
    const box = await page
      .locator(".about-portrait")
      .evaluate((node) => node.getBoundingClientRect().toJSON());
    expect(box.width, `${width}`).toBeGreaterThanOrEqual(min);
    expect(box.width, `${width}`).toBeLessThanOrEqual(max);
    expect(Math.round((box.width / box.height) * 100)).toBe(80);
  }
});

test("about scenes, knowledge map and links adapt from desktop to phone", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/sobre");
  const visibleScenes = () =>
    page
      .locator('.about-page svg[role="img"]')
      .evaluateAll(
        (nodes) => nodes.filter((node) => node.checkVisibility()).length,
      );
  expect(await visibleScenes()).toBe(4);
  await expect(page.locator(".plate-career")).toBeVisible();
  await expect(page.locator(".career-stations li")).toHaveCount(9);
  for (const href of [
    "/pesquisa",
    "/pesquisa/publicacoes",
    "/projetos",
    "/contato",
  ]) {
    await expect(
      page.locator(`main a[href="${href}"]`).first(),
    ).toBeAttached();
  }
  // Pointing at a station brings its part of the map forward.
  await page.locator("#trajetoria").evaluate((node) =>
    node.scrollIntoView({ behavior: "instant" }),
  );
  await page.locator('.career-stations [data-focus="5"]').hover();
  const opacity = (n: number) =>
    page
      .locator(`.plate-career [data-part="${n}"]`)
      .evaluate((node) => getComputedStyle(node).opacity);
  await expect.poll(() => opacity(5)).toBe("1");
  await expect.poll(() => opacity(1)).toBe("0.36");
  // Phones read the same stations as a rail; the research process turns vertical.
  await page.setViewportSize({ width: 390, height: 844 });
  await expect(page.locator(".plate-career")).toBeHidden();
  await expect(page.locator(".career-stations li").first()).toBeVisible();
  expect(
    await page
      .locator("#pesquisa-aplicada svg.scene-narrow")
      .evaluate((node) => getComputedStyle(node).display),
  ).toBe("block");
  expect(await visibleScenes()).toBe(3);
  expect(await page.evaluate(noOverflow)).toBeLessThanOrEqual(1);
});

test("about shows complete, still drawings with reduced motion", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/sobre");
  await page.locator("#pesquisa-aplicada").evaluate((node) =>
    node.scrollIntoView({ behavior: "instant" }),
  );
  const states = await page
    .locator(".about-page .engineering-plate")
    .evaluateAll((figures) =>
      figures.map((figure) => ({
        entrance: figure.getAttribute("data-entrance"),
        step: figure.getAttribute("data-step"),
        animations: [...figure.querySelectorAll(".scene-draw, .scene-flow")]
          .map((node) => getComputedStyle(node).animationName)
          .filter((name) => name !== "none").length,
        hidden: [...figure.querySelectorAll("[data-part]")].filter(
          (node) => getComputedStyle(node).opacity !== "1",
        ).length,
      })),
    );
  expect(states.length).toBe(4);
  for (const state of states)
    expect(state).toEqual({ entrance: null, step: null, animations: 0, hidden: 0 });
  await expect(page.locator(".about-page .motion-control").first()).toBeHidden();
});

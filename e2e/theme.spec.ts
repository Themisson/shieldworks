import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("theme follows the system until chosen, then persists", async ({
  page,
}) => {
  await page.emulateMedia({ colorScheme: "dark" });
  await page.goto("/");
  const html = page.locator("html");
  await expect(html).toHaveAttribute("data-theme", "dark");
  // Without a saved choice, a system change is followed live.
  await page.emulateMedia({ colorScheme: "light" });
  await expect(html).toHaveAttribute("data-theme", "light");
  await page.getByRole("button", { name: "Ativar tema escuro" }).click();
  await expect(html).toHaveAttribute("data-theme", "dark");
  expect(
    await page.evaluate(() => localStorage.getItem("shieldworks:theme")),
  ).toBe("dark");
  await page.reload();
  await expect(html).toHaveAttribute("data-theme", "dark");
  await expect(
    page.getByRole("button", { name: "Ativar tema claro" }),
  ).toBeVisible();
  // Choosing the system theme again clears the key, so the site follows it again.
  await page.getByRole("button", { name: "Ativar tema claro" }).click();
  await expect(html).toHaveAttribute("data-theme", "light");
  expect(
    await page.evaluate(() => localStorage.getItem("shieldworks:theme")),
  ).toBeNull();
  await page.goto("/en");
  await expect(
    page.getByRole("button", { name: "Switch to dark theme" }),
  ).toBeVisible();
});

test("the theme is applied while the document is still loading", async ({
  page,
}) => {
  await page.addInitScript(() => {
    localStorage.setItem("shieldworks:theme", "dark");
    const record = window as unknown as { themeAppliedAt?: string };
    // Observe the document itself: <html> may not exist yet when this runs.
    new MutationObserver(() => {
      if (document.documentElement?.dataset.theme && !record.themeAppliedAt)
        record.themeAppliedAt = document.readyState;
    }).observe(document, {
      attributes: true,
      subtree: true,
      childList: true,
      attributeFilter: ["data-theme"],
    });
  });
  await page.goto("/sobre");
  expect(
    await page.evaluate(
      () => (window as unknown as { themeAppliedAt?: string }).themeAppliedAt,
    ),
  ).toBe("loading");
});

for (const width of [390, 1440]) {
  test(`dark theme keeps WCAG contrast ${width}`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.addInitScript(() =>
      localStorage.setItem("shieldworks:theme", "dark"),
    );
    for (const route of [
      "/",
      "/sobre",
      "/en/sobre",
      "/contato",
      "/pesquisa",
      "/sistemas",
      "/projetos/mdfolio",
      "/cases/apb-evaporitos-termomecanica",
    ]) {
      await page.goto(route);
      await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
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

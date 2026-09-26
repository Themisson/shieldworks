import { test, expect, type Page } from "@playwright/test";

const offsetBelowHeader = (page: Page, selector: string) =>
  page.locator(selector).evaluate((node) => {
    const header = document
      .querySelector(".site-header")!
      .getBoundingClientRect();
    return Math.round(node.getBoundingClientRect().top - header.bottom);
  });

test("topic pages fit one screen and snap on laptops at 150% scaling", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1280, height: 590 });
  for (const route of ["/", "/sobre", "/en/sobre"]) {
    await page.goto(route);
    await page.evaluate(() => document.fonts.ready);
    await expect
      .poll(() =>
        page.evaluate(
          () => getComputedStyle(document.documentElement).scrollSnapType,
        ),
      )
      .toBe("y mandatory");
    const overflow = await page.evaluate(() => {
      const available =
        innerHeight -
        document.querySelector(".site-header")!.getBoundingClientRect().height;
      return [...document.querySelectorAll<HTMLElement>(".landing-screen")]
        .filter((section) => section.offsetHeight > available + 2)
        .map((section) => section.id);
    });
    expect(overflow, route).toEqual([]);
  }
});

test("in-page links frame each topic exactly below the header", async ({
  page,
}) => {
  for (const [width, height] of [
    [1440, 790],
    [1280, 590],
    [390, 740],
  ]) {
    await page.setViewportSize({ width, height });
    await page.goto("/");
    await page.locator("#conhecimento .section-advance a").click();
    await expect(page).toHaveURL(/#sobre$/);
    // Smooth scrolling: wait for the topic to settle exactly below the header.
    await expect
      .poll(async () => Math.abs(await offsetBelowHeader(page, "#sobre")), {
        timeout: 6_000,
      })
      .toBeLessThanOrEqual(1);
    await page.goto("/sobre");
    await page.locator('.about-anchors a[href="#trajetoria"]').click();
    // Smooth scrolling: wait for the topic to settle exactly below the header.
    await expect
      .poll(async () => Math.abs(await offsetBelowHeader(page, "#trajetoria")), {
        timeout: 6_000,
      })
      .toBeLessThanOrEqual(1);
  }
});

test("each topic arrives like a slide, without hiding what is on screen", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 790 });
  await page.goto("/sobre");
  await expect(page.locator("#origem")).not.toHaveAttribute(
    "data-slide",
    /.+/,
  );
  await expect(page.locator("#quem-sou")).toHaveAttribute(
    "data-slide",
    "armed",
  );
  await page.locator("#origem .section-advance a").click();
  await expect(page.locator("#quem-sou")).toHaveAttribute("data-slide", "in");
  await expect
    .poll(() =>
      page
        .locator("#quem-sou .about-person-grid > div")
        .evaluate((node) => getComputedStyle(node).opacity),
    )
    .toBe("1");
  // The topic left behind re-arms to slide in from above on the way back.
  await page.locator("#quem-sou .section-advance a").click();
  await expect(page.locator("#origem")).toHaveAttribute(
    "data-slide-from",
    "above",
  );
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/sobre");
  await expect(page.locator(".landing-screen[data-slide]")).toHaveCount(0);
});

import { test } from "@playwright/test";

test.describe("Take lesson screenshots", () => {
  test("Day 0 screenshot", async ({ page }) => {
    await page.goto("/sprint/preview/day/0");
    await page.waitForTimeout(1000); // Wait for animations
    await page.screenshot({
      path: "tests/screenshots/day-0-full.png",
      fullPage: true,
    });
  });

  test("Day 1 screenshot", async ({ page }) => {
    await page.goto("/sprint/preview/day/1");
    await page.waitForTimeout(1000);
    await page.screenshot({
      path: "tests/screenshots/day-1-full.png",
      fullPage: true,
    });
  });
});

import { test, expect } from "@playwright/test";

test.describe("Button styling verification", () => {
  test("Start Free Trial button has correct styling", async ({ page }) => {
    await page.goto("/sprint");

    // Find the "Start Free Trial" button
    const button = page.getByRole("link", { name: /start free trial/i });
    await expect(button).toBeVisible();

    // Get computed styles
    const styles = await button.evaluate((el) => {
      const computed = window.getComputedStyle(el);
      return {
        paddingLeft: computed.paddingLeft,
        paddingRight: computed.paddingRight,
        paddingTop: computed.paddingTop,
        paddingBottom: computed.paddingBottom,
        borderRadius: computed.borderRadius,
        backgroundColor: computed.backgroundColor,
        height: computed.height,
      };
    });

    console.log("Button computed styles:", JSON.stringify(styles, null, 2));

    // Check padding exists (should be at least 24px = 1.5rem for px-6 or 32px = 2rem for px-8)
    const paddingLeft = parseFloat(styles.paddingLeft);
    const paddingRight = parseFloat(styles.paddingRight);
    expect(paddingLeft).toBeGreaterThan(20);
    expect(paddingRight).toBeGreaterThan(20);

    // Check border-radius exists (should be at least 4px)
    const borderRadius = parseFloat(styles.borderRadius);
    expect(borderRadius).toBeGreaterThan(2);

    // Check height (h-12 = 48px = 3rem)
    const height = parseFloat(styles.height);
    expect(height).toBeGreaterThanOrEqual(40);

    // Check background color is not transparent (accent color should be visible)
    expect(styles.backgroundColor).not.toBe("rgba(0, 0, 0, 0)");
    expect(styles.backgroundColor).not.toBe("transparent");

    // Take a screenshot for visual inspection
    await page.screenshot({
      path: "tests/screenshots/sprint-page-button.png",
      fullPage: false,
    });
  });

  test("Enroll Now button on lesson preview has correct styling", async ({
    page,
  }) => {
    await page.goto("/sprint/preview/day/1");

    // Find the "Enroll Now" button in TrialCTA
    const button = page.getByRole("link", { name: /enroll now/i });
    await expect(button).toBeVisible();

    // Get computed styles
    const styles = await button.evaluate((el) => {
      const computed = window.getComputedStyle(el);
      return {
        paddingLeft: computed.paddingLeft,
        paddingRight: computed.paddingRight,
        borderRadius: computed.borderRadius,
        backgroundColor: computed.backgroundColor,
        height: computed.height,
      };
    });

    console.log("Enroll Now button styles:", JSON.stringify(styles, null, 2));

    // Check padding
    const paddingLeft = parseFloat(styles.paddingLeft);
    expect(paddingLeft).toBeGreaterThan(20);

    // Check border-radius
    const borderRadius = parseFloat(styles.borderRadius);
    expect(borderRadius).toBeGreaterThan(2);

    // Take screenshot
    await page.screenshot({
      path: "tests/screenshots/lesson-cta-button.png",
      fullPage: false,
    });
  });
});

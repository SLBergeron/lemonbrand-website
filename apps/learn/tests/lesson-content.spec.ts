import { test, expect } from "@playwright/test";

test.describe("Lesson content verification", () => {
  test("Day 0 has interactive sections", async ({ page }) => {
    await page.goto("/sprint/preview/day/0");

    // Check header
    await expect(page.getByRole("heading", { name: /Get Ready to Build/i })).toBeVisible();

    // Check learning objectives section
    await expect(page.getByText(/By the end of today/i)).toBeVisible();

    // Check for comparison section (Cursor vs Terminal)
    await expect(page.getByText(/Cursor vs Terminal/i)).toBeVisible();

    // Check for form section (Define Your Project)
    await expect(page.getByText(/Define Your Project/i)).toBeVisible();

    // Check for bonus section (collapsible)
    await expect(page.getByText(/For the Impatient/i)).toBeVisible();

    // Check checklist exists
    await expect(page.getByText(/Day Checklist/i)).toBeVisible();

    // Take full page screenshot
    await page.screenshot({
      path: "tests/screenshots/day-0-full.png",
      fullPage: true,
    });
  });

  test("Day 0 form can be filled and generates file", async ({ page }) => {
    await page.goto("/sprint/preview/day/0");

    // Find the form section
    const formSection = page.locator("section", { hasText: "Define Your Project" });
    await expect(formSection).toBeVisible();

    // Fill in form fields
    await page.fill('textarea[placeholder*="A tool that helps me"]', "A tool that generates project proposals for my consulting business");

    // Select radio button
    await page.click('text=My clients');

    await page.fill('textarea[placeholder*="Currently I spend time"]', "I manually write proposals in Google Docs, copying from templates and customizing each one. Takes about 2 hours per proposal.");

    await page.fill('textarea[placeholder*="I want this because"]', "I want to spend more time on actual client work and less on document preparation.");

    // Submit form
    await page.click('button:has-text("Generate project-idea.md")');

    // Check for success state
    await expect(page.getByText(/Saved!/i)).toBeVisible({ timeout: 5000 });

    // Check for download button
    await expect(page.getByRole("button", { name: /Download/i })).toBeVisible();

    // Screenshot the completed form
    await page.screenshot({
      path: "tests/screenshots/day-0-form-complete.png",
      fullPage: false,
    });
  });

  test("Day 1 has scoping content", async ({ page }) => {
    await page.goto("/sprint/preview/day/1");

    // Check header
    await expect(page.getByRole("heading", { name: /Scope Your Project/i })).toBeVisible();

    // Check key concepts
    await expect(page.getByText(/Thinking Partner/i)).toBeVisible();
    await expect(page.getByText(/Plan Mode vs Build Mode/i)).toBeVisible();
    await expect(page.getByText(/Reference Files, Don't Paste/i)).toBeVisible();

    // Check exercise sections
    await expect(page.getByText(/The Scoping Conversation/i)).toBeVisible();

    // Check for code block with folder structure
    await expect(page.getByText(/project-idea.md/i)).toBeVisible();

    // Check for bonus section
    await expect(page.getByText(/Make the Model Disagree/i)).toBeVisible();

    // Take full page screenshot
    await page.screenshot({
      path: "tests/screenshots/day-1-full.png",
      fullPage: true,
    });
  });

  test("Exercise sections have copyable prompts", async ({ page }) => {
    await page.goto("/sprint/preview/day/1");

    // Find the scoping exercise
    const exerciseSection = page.locator("section", { hasText: "The Scoping Conversation" });
    await expect(exerciseSection).toBeVisible();

    // Check for the prompt box
    const promptBox = exerciseSection.locator(".font-mono");
    await expect(promptBox).toBeVisible();

    // Verify prompt content
    await expect(promptBox).toContainText("Read project-idea.md");
  });

  test("Bonus sections are collapsible", async ({ page }) => {
    await page.goto("/sprint/preview/day/0");

    // Find the bonus section button
    const bonusButton = page.locator("button", { hasText: "For the Impatient" });
    await expect(bonusButton).toBeVisible();

    // Content should be visible by default or after clicking (depending on collapsed state)
    await bonusButton.click();

    // Check if content is now visible
    await expect(page.getByText(/Talk to Claude about your project/i)).toBeVisible();
  });
});

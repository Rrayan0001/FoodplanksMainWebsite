import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("renders a complete responsive page with working images and no browser errors", async ({ page }, testInfo) => {
  const errors: string[] = [];
  page.on("pageerror", error => errors.push(error.message));
  await page.goto("/");
  await expect(page).toHaveTitle(/Food Planks/);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Gather round.Stay a while.");
  for (const image of await page.locator("main img").all()) {
    await image.scrollIntoViewIfNeeded();
    await expect.poll(() => image.evaluate((img: HTMLImageElement) => img.complete && img.naturalWidth > 0)).toBeTruthy();
  }
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBeTruthy();
  await page.locator(".gallery-grid").evaluate(element => element.scrollTo({ left: 0, behavior: "instant" }));
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.screenshot({ path: `/tmp/opencode/foodplanks-${testInfo.project.name}.png`, fullPage: true });
  expect(errors).toEqual([]);
});

test("cuisine tabs filter cards and support keyboard navigation", async ({ page }) => {
  await page.goto("/#flavours");
  const panel = page.getByRole("tabpanel");
  await expect(panel.getByRole("article")).toHaveCount(3);
  const northIndian = page.getByRole("tab", { name: /^North Indian/ });
  await northIndian.click();
  await expect(panel.getByRole("article")).toHaveCount(1);
  await northIndian.press("ArrowRight");
  await expect(page.getByRole("tab", { name: /^Continental & Chinese/ })).toBeFocused();
  await expect(panel.getByRole("article")).toHaveCount(1);
  await page.getByRole("tab", { name: /^Continental & Chinese/ }).press("Home");
  await expect(panel.getByRole("article")).toHaveCount(3);
});

test("gallery opens, navigates, closes on Escape, and restores focus", async ({ page }) => {
  await page.goto("/#moments");
  const trigger = page.getByRole("button", { name: "View Under the lights" });
  await trigger.click();
  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();
  await expect(dialog.getByRole("heading")).toHaveText("Under the lights");
  await page.getByRole("button", { name: "Next image" }).click();
  await expect(dialog.getByRole("heading")).toHaveText("Indoors or out");
  await page.keyboard.press("ArrowLeft");
  await expect(dialog.getByRole("heading")).toHaveText("Under the lights");
  await page.keyboard.press("Escape");
  await expect(dialog).not.toBeVisible();
  await expect(trigger).toBeFocused();
  expect(await page.evaluate(() => document.body.style.overflow)).not.toBe("hidden");
});

test("menu, reservations, directions, and sources have real destinations", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("link", { name: "Find your table" })).toHaveAttribute("href", "tel:+919901158899");
  await expect(page.getByRole("link", { name: "Explore the full menu" })).toHaveAttribute("href", "https://www.zomato.com/bangalore/food-planks-1-sahakara-nagar-bangalore/menu");
  await expect(page.getByRole("link", { name: "Get directions" })).toHaveAttribute("href", /destination=13\.0877931,77\.5903605/);
  await page.getByRole("link", { name: "Sources & image credits" }).click();
  await expect(page.getByRole("heading", { level: 1 })).toContainText("image credits.");
  await expect(page.getByText(/supplied by Food Planks/)).toBeVisible();
});

test("navigation is usable at the current viewport", async ({ page }, testInfo) => {
  await page.goto("/");
  const nav = page.getByRole("navigation", { name: "Main navigation" });
  if (testInfo.project.name === "mobile") {
    await expect(nav).not.toBeVisible();
    await page.getByRole("button", { name: "Open navigation" }).click();
    await expect(nav).toBeVisible();
    await expect(nav.getByRole("link", { name: "Our story" })).toBeFocused();
    await page.keyboard.press("Escape");
    await expect(nav).not.toBeVisible();
    await expect(page.getByRole("button", { name: "Open navigation" })).toBeFocused();
    await page.getByRole("button", { name: "Open navigation" }).click();
  }
  await nav.getByRole("link", { name: "Find us" }).click();
  await expect(page).toHaveURL(/#visit$/);
  expect(await page.evaluate(() => document.body.style.overflow)).not.toBe("hidden");
});

test("homepage and gallery meet automated WCAG AA checks", async ({ page }) => {
  await page.goto("/");
  const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa"]).analyze();
  expect(results.violations).toEqual([]);
  await page.getByRole("button", { name: "View Under the lights" }).click();
  const galleryResults = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa"]).analyze();
  expect(galleryResults.violations).toEqual([]);
});

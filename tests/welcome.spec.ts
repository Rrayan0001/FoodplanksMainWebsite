import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("welcome preview stays, dismisses, and does not consume the session", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/?welcome=stay");
  const overlay = page.getByRole("dialog", { name: "Welcome to Food Planks" });
  await expect(overlay).toBeVisible();
  await expect(overlay.locator(".welcome-doodle path")).toHaveCount(7);
  await expect(overlay.getByText("SETTING YOUR TABLE")).toBeVisible();
  await expect(overlay.getByText("Food Planks", { exact: true })).toBeVisible();
  expect(
    (await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa"]).analyze()).violations,
  ).toEqual([]);
  await page.screenshot({ path: "/tmp/opencode/foodplanks-welcome.png" });
  const skip = overlay.getByRole("button", { name: "Skip intro" });
  const box = await skip.boundingBox();
  expect(box!.height).toBeGreaterThanOrEqual(48);
  await skip.click();
  await expect(overlay).not.toBeVisible();
  // Preview mode bypasses the seen check and must not consume the once-per-session show.
  expect(await page.evaluate(() => sessionStorage.getItem("foodplanks-welcome-seen"))).toBeNull();
  await expect(page.locator("main")).not.toHaveAttribute("inert", "");
  // Preview still forces a show on reload, even after dismiss.
  await page.reload();
  await expect(page.getByRole("dialog", { name: "Welcome to Food Planks" })).toBeVisible();
});

test("welcome auto-exits and stays dismissed on reload", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/");
  const overlay = page.getByRole("dialog", { name: "Welcome to Food Planks" });
  await expect(overlay).toBeVisible({ timeout: 5000 });
  await expect(overlay).not.toBeVisible({ timeout: 9000 });
  // Normal visits remember the show once per tab session.
  expect(await page.evaluate(() => sessionStorage.getItem("foodplanks-welcome-seen"))).toBe("1");
  await page.reload();
  await expect(page.getByRole("dialog", { name: "Welcome to Food Planks" })).not.toBeVisible();
});

test("reduced motion skips the welcome overlay entirely", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("dialog", { name: "Welcome to Food Planks" })).not.toBeVisible();
});

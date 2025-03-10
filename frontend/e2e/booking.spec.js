import { test, expect } from "@playwright/test";

test.describe("Booking", () => {
  let baseURL;

  test.beforeEach(async ({ page }) => {
    baseURL = process.env.BASE_URL;
    await page.goto(baseURL);
    await expect(page).toHaveTitle("Rehab-Aid");
  });
});

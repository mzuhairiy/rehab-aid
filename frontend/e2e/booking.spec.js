import { test, expect } from "@playwright/test";

test.describe("Booking", () => {
  let baseURL;

  test.beforeEach(async ({ page }) => {
    baseURL = process.env.BASE_URL;
    await page.goto(baseURL);
    await expect(page).toHaveTitle("Rehab-Aid");
  });

  test("User should successfully booked an appointment", async ({ page }) => {
    await page.locator("//button[contains(text(),'Login')]").click();
    await page
      .locator("input[placeholder='Enter Your Email']")
      .fill("revon@hotmail.com");
    await page.locator("input[placeholder='Password']").fill("123abc1");
    await page.locator("button[type='submit']").click();
    await page.waitForTimeout(1000);
    await page.click("header li:nth-child(2) a:nth-child(1)");
    await page.waitForTimeout(2000);
    await page.locator(".grid > div:nth-child(2) a").first().click();
    await page.goto(baseURL);
    await page.waitForTimeout(1000);
    await page.click("header li:nth-child(2) a:nth-child(1)");
    await page.waitForTimeout(2000);
    await page.locator(".grid > div:nth-child(2) a").first().click();
    await expect(page.locator("//button[normalize-space()='Book Appointment']"))
      .toBeVisible;
  });
});

import { test, expect } from "@playwright/test";

test.describe("Homepage", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle("Rehab-Aid");
  });

  test("Should direct to find a doctor page", async ({ page }) => {
    await page.click("header li:nth-child(2) a:nth-child(1)");
    await expect(page).toHaveURL("http://localhost:5173/doctors");
    await expect(page.locator("h2[class='heading']")).toBeVisible();
  });

  test("Should direct to services page", async ({ page }) => {
    await page.click("header li:nth-child(3) a:nth-child(1)");
    await expect(page).toHaveURL("http://localhost:5173/services");
    await expect(
      page.locator("//h2[normalize-space()='Cancer Care']"),
    ).toBeVisible();
    await expect(
      page.locator("//h2[normalize-space()='Labor & Delivery']"),
    ).toBeVisible();
    await expect(
      page.locator("//h2[normalize-space()='Heart & Vascular']"),
    ).toBeVisible();
  });

  test("Should direct to contact page", async ({ page }) => {
    await page.click("header li:nth-child(4) a:nth-child(1)");
    await expect(page).toHaveURL("http://localhost:5173/contact");
    await expect(page.locator(".heading.text-center")).toContainText(
      "Contact Us",
    );
  });

  test("Should direct to login page", async ({ page }) => {
    await page.click("//button[normalize-space()='Login']");
    await expect(page).toHaveURL("http://localhost:5173/login");
    await expect(
      page.locator(
        "h3[class='text-headingColor text-[22px] leading-9 font-bold mb-10']",
      ),
    ).toContainText("Hello! Welcome.");
  });
});

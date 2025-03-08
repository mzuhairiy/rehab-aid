import { test, expect } from "@playwright/test";

test.describe("Homepage", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(process.env.BASE_URL || "http://localhost:5173"); // ✅ Handle kalau BASE_URL kosong
    await expect(page).toHaveTitle("Rehab-Aid");
  });

  test("Should direct to find a doctor page", async ({ page }) => {
    await page.click("header li:nth-child(2) a:nth-child(1)");
    await expect(page).toHaveURL("(`${baseURL}/doctors");
    await expect(page.locator("h2[class='heading']")).toBeVisible();
  });

  test("Should direct to services page", async ({ page }) => {
    await page.click("header li:nth-child(3) a:nth-child(1)");
    await expect(page).toHaveURL("(`${baseURL}/services");
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
    await expect(page).toHaveURL("(`${baseURL}/contact");
    await expect(page.locator(".heading.text-center")).toContainText(
      "Contact Us",
    );
  });

  test("Should direct to login page", async ({ page }) => {
    await page.click("//button[normalize-space()='Login']");
    await expect(page).toHaveURL("(`${baseURL}/login");
    await expect(
      page.locator(
        "h3[class='text-headingColor text-[22px] leading-9 font-bold mb-10']",
      ),
    ).toContainText("Hello! Welcome.");
  });
});

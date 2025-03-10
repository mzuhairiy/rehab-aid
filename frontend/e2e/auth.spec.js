import { test, expect } from "@playwright/test";
import { faker } from "@faker-js/faker";

const randomFirstName = faker.person.firstName();
const randomLastName = faker.person.lastName();
const randomEmail = faker.internet.email();
const randomPass = faker.internet.password();

test.describe("Authentication", () => {
  let baseURL;

  test.beforeEach(async ({ page }) => {
    baseURL = process.env.BASE_URL;
    await page.goto(baseURL);
    await expect(page).toHaveTitle("Rehab-Aid");
  });

  test("User should be able to register with valid format", async ({
    page,
  }) => {
    await page.click("//button[normalize-space()='Login']");
    await page.click("//a[contains(text(),'Register')]");
    await expect(
      page.locator(
        "//body/div[@id='root']/main[1]/section[1]/div[1]/div[1]/div[2]/h3[1]",
      ),
    ).toContainText("Create an Account");
    await page.locator("input[placeholder='Full Name']").fill(randomFirstName);
    await page
      .locator("input[placeholder='Enter your email']")
      .fill(randomEmail);
    await page.locator("input[placeholder='Password']").fill(randomPass);
    await page.selectOption("select[name='role']", "Patient");
    await page.selectOption("select[name='gender']", "Male");
    await page.click("label[for='customFile']");
    await page.setInputFiles(
      "input#customFile",
      "frontend/src/assets/images/heroImg02.png",
    );
    await page.click("//button[normalize-space()='Sign Up']");
    await expect(
      page.locator(
        "h3[class='text-headingColor text-[22px] leading-9 font-bold mb-10']",
      ),
    ).toContainText("Hello! Welcome");
  });

  test("User should not be able to register due to an invalid format.", async ({
    page,
  }) => {
    await page.click("//button[normalize-space()='Login']");
    await page.click("//a[contains(text(),'Register')]");
    await expect(
      page.locator(
        "//body/div[@id='root']/main[1]/section[1]/div[1]/div[1]/div[2]/h3[1]",
      ),
    ).toContainText("Create an Account");
    await page.locator("input[placeholder='Full Name']").fill(randomFirstName);
    await page
      .locator("input[placeholder='Enter your email']")
      .fill("randomEmail");
    await page.locator("input[placeholder='Password']").fill("1");
    await page.selectOption("select[name='role']", "Patient");
    await page.selectOption("select[name='gender']", "Male");
    await page.click("label[for='customFile']");
    await page.setInputFiles(
      "input#customFile",
      "frontend/src/assets/images/heroImg02.png",
    );
    const emailField = page.getByPlaceholder("Enter your email");
    const validationMsg = await emailField.evaluate(
      (input) => input.validationMessage,
    );
    await page.click("//button[normalize-space()='Sign Up']");
    expect(validationMsg).toContain(
      "Please include an '@' in the email address",
    );
  });

  test("Should direct to Login page", async ({ page }) => {
    await page.click("//button[normalize-space()='Login']");
    await expect(page).toHaveURL(`${baseURL}/login`);
    await expect(
      page.locator(
        "h3[class='text-headingColor text-[22px] leading-9 font-bold mb-10']",
      ),
    ).toContainText("Hello! Welcome.");
  });

  test("Should login successfully with registered account", async ({
    page,
  }) => {
    await page.locator("//button[contains(text(),'Login')]").click();
    await page
      .locator("input[placeholder='Enter Your Email']")
      .fill("revon@hotmail.com");
    await page.locator("input[placeholder='Password']").fill("123abc1");
    await page.locator("button[type='submit']").click();
    await expect(page.locator(".w-full.rounded-full")).toBeVisible();
  });
});

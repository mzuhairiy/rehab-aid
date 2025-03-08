import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  timeout: 30000, // Timeout per test (30s)
  use: {
    headless: true,
    baseURL: "https://rehab-aid.netlify.app/",
  },
});

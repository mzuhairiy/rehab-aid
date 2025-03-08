import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./e2e",
  timeout: 30000, // Timeout per test (30s)
  use: {
    headless: true,
    baseURL: "http://localhost:5173",
  },
});

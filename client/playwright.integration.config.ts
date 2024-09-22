import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: '.',
  timeout: 30 * 1000,
  expect: {
    timeout: 5000,
  },
  fullyParallel: true,
  retries: 2,
  use: {
    actionTimeout: 0,
    trace: 'on-first-retry',
  },
  testMatch: ['src/**/*.spec.ts'],
  testIgnore: ['src/e2e/**/*.spec.ts'],
  projects: [
    {
      name: 'chromium',
      use: { browserName: 'chromium' },
    },
    {
      name: 'firefox',
      use: { browserName: 'firefox' },
    },
  ],
});

import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './src/e2e',
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
  testMatch: '**/*.spec.ts', 
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

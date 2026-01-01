import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 30 * 1000,
  expect: { timeout: 5000 },
  reporter: [['html', { open: 'on-failure' }]],
  use: {
    headless: false,
    viewport: { width: 2000, height: 800 },
    ignoreHTTPSErrors: true,
    video: 'retain-on-failure'
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } }
  //  { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
   // { name: 'webkit', use: { ...devices['Desktop Safari'] } }
  ]
});

import { test, expect } from '@playwright/test';
import { BasePage } from '../../e2e/page-objects/base-page';

test('Nav bar works', async ({ page }) => {
  await page.goto('http://localhost:5173');
  await page.waitForLoadState('networkidle');

  const app = new BasePage(page);

  await app.expectAboutPageTitle();

  await page.getByRole('link', { name: 'Map', exact: true  }).click();

  expect(page.getByText('Select bacteria')).toBeVisible();

  await page.getByRole('link', { name: 'About', exact: true }).click();

  await app.expectAboutPageTitle();
});

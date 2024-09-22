import { test } from '@playwright/test';
import { BasePage } from '../../e2e/page-objects/base-page';

test('Dropdown changes bacteria visible on map', async ({ page }) => {
  const app = new BasePage(page);

  await app.load({ url: 'http://localhost:5173/map?parameter=NFP_ENT' });
  await app.mockMapApiResponse();
  await app.expectMapWorks();
});

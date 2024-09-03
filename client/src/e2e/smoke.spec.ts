import { test } from "@playwright/test";
import { BasePage } from "./page-objects/base-page";

test("Smoke test", async ({ page }) => {
  const app = new BasePage(page);

  await app.load({
    url: "https://crap-dev.onrender.com/",
  });

  await app.expectAboutPageTitle();

  await page.getByRole("link", { name: "Explore bacteria hotspots" }).click();

  await app.expectMapWorks();

  await page.getByRole("link", { name: "about" }).click();
  
  await app.expectFundraisingLinkWorks();
});

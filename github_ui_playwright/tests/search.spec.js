import { test, expect } from '@playwright/test';
import DashboardPage from "../pages/DashboardPage";


test('Search Existing Repository', async ({ page }) => {
  const dashboard = new DashboardPage(page);

  await page.goto('https://github.com');
    dashboard.searchRepository('playwright');
  await expect(page).toHaveURL(/search/);
  await page.waitForTimeout(2000);

});

test('Search Random Text - Negative', async ({ page }) => {
  const dashboard = new DashboardPage(page);

  await page.goto('https://github.com/');
    dashboard.searchRepository('asdasdxyzrandom');
    await expect(page).toHaveURL(/search/);
    await expect(page.getByRole('heading', { name: /0 results/i })).toBeVisible();
    console.log("No results found");

  });

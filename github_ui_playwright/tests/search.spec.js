import { test, expect } from '@playwright/test';

test.skip('Search Existing Repository', async ({ page }) => {
  await page.goto('https://github.com');
  await page.locator('button[aria-label="Search or jump to…"]').click();
  await page.waitForTimeout(2000);
  await page.locator('input[name="query-builder-test"]').fill('playwright');
  await page.waitForTimeout(2000);
  //('input[placeholder="Search or jump to..."]', 'playwright');
  //await page.fill('input[placeholder="Search or jump to..."]', 'playwright');
  await page.keyboard.press('Enter');
  await page.waitForTimeout(2000);
  await expect(page).toHaveURL(/search/);
  await page.waitForTimeout(2000);

});

test('Search Random Text - Negative', async ({ page }) => {
  await page.goto('https://github.com/');
  await page.locator('button[aria-label="Search or jump to…"]').click();
  await page.waitForTimeout(2000);
  await page.locator('input[name="query-builder-test"]').fill('asdasdxyzrandom');//('input[placeholder="Search or jump to..."]', 'asdasdxyzrandom');
    await page.waitForTimeout(2000);
  await page.keyboard.press('Enter');
    await expect(page).toHaveURL(/search/);
  await page.waitForTimeout(2000);
 // await expect(page.locator('text=repository results')).toBeVisible();
});
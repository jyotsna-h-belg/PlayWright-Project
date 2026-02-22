import { test, expect } from '@playwright/test';
import LoginPage from '../pages/LoginPage';

test.describe('Login Tests', () => {

  test('Positive - Valid Login', async ({ page }) => {
    const login = new LoginPage(page);

    await login.goto();
    await login.login(process.env.USERNAME, process.env.PASSWORD);

    await expect(page).toHaveURL(/github.com/);
    await page.waitForTimeout(4000);
  });

  test.skip('Negative - Invalid Password', async ({ page }) => {
    const login = new LoginPage(page);

    await login.goto();
    await login.login(process.env.USERNAME, "wrongpass");

    await expect(page.locator(login.errorMessage)).toBeVisible();
    await page.waitForTimeout(4000);
    await browser.close();
  });

});
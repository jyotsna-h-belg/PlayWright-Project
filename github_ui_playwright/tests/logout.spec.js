import { test, expect } from '@playwright/test';
import LoginPage from '../pages/LoginPage';
import DashboardPage from '../pages/DashboardPage';

test('Logout Test', async ({ page }) => {

   const login = new LoginPage(page);
   const dashboard = new DashboardPage(page);

  await login.goto();
   await login.login(process.env.USERNAME, process.env.PASSWORD);
   await page.waitForTimeout(8000);
   await expect(page).toHaveURL(/github.com/);
   //await dashboard.verifyLoginSuccessful();
  

 await dashboard.logout();


  await expect(page).toHaveURL(/login/);
});

/*

test('Logout Test', async ({ page }) => {

  const login = new LoginPage(page);
  await login.goto();
  await login.login(process.env.USERNAME, process.env.PASSWORD);

  await page.click('summary[aria-label="View profile and more"]');
  await page.click('text=Sign out');

  await expect(page).toHaveURL(/login/);
});*/


//const { test, expect } = require('@playwright/test');
//const LoginPage = require('../pages/LoginPage');


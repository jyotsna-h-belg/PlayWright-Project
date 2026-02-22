

// import { test, expect } from '@playwright/test';
// import LoginPage from '../pages/LoginPage';
// import RepositoryPage from '../pages/RepositoryPage';
// import data from '../utils/testData';

// test.describe('Repository Tests', () => {

//   test.beforeEach(async ({ page }) => {
//     const login = new LoginPage(page);
//     await login.goto();
//     await login.login(process.env.USERNAME, process.env.PASSWORD);
//   });

//   test.only('Positive - Create Repository', async ({ page }) => {
//     const repo = new RepositoryPage(page);
//     await repo.createRepository(data.validRepoName);

//     await expect(page).toHaveURL(/playwright-ui-test-repo/);
//   });

//   test('Negative - Empty Repository Name', async ({ page }) => {
//     const repo = new RepositoryPage(page);
//     await repo.createRepository(data.invalidRepoName);

//     await expect(page.locator(repo.errorMsg)).toBeVisible();
//   });

// });


import DashboardPage from '../pages/DashboardPage';
import { test, expect } from '@playwright/test';
import LoginPage from '../pages/LoginPage';
import RepositoryPage from '../pages/RepositoryPage';
import data from '../utils/testData';

test('Positive - Create Repository - POM version', async ({ page }) => {

  const login = new LoginPage(page);
  const dashboard = new DashboardPage(page);
  const repo = new RepositoryPage(page);
  await login.goto();
  await login.login(process.env.USERNAME, process.env.PASSWORD);

  //await dashboard.verifyLoginSuccessful();
  await dashboard.clickNewRepository();
  await page.waitForTimeout(3000);

  await repo.createRepository(data.validRepoName);
  await page.waitForTimeout(5000);

 // await expect(page).toHaveURL('/github.com/playwright-ui-test-repo');
  await expect(page).toHaveURL('new');

});

test.skip('Negative - Create Repository with Empty Name - POM version', async ({ page }) => {
  
  const login = new LoginPage(page);  
  const dashboard = new DashboardPage(page);
  const repo = new RepositoryPage(page);
  await login.goto();
  await login.login(process.env.USERNAME, process.env.PASSWORD);

  //await dashboard.verifyLoginSuccessful();
  await dashboard.clickNewRepository();
  await page.waitForTimeout(3000);

  await repo.createRepository(data.invalidRepoName);
  
  //await expect(page.locator(repo.errorMsg)).toBeVisible();
});

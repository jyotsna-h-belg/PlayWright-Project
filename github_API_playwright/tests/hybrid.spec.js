import { test, expect } from '@playwright/test';
import dotenv from 'dotenv';
import { GitHubAPI } from '../api/github.api.js';
import { LoginPage } from '../pages/LoginPage.js';
import { RepoPage } from '../pages/RepoPage.js';

dotenv.config();

test('GitHub End-to-End Repository Management', async ({ page }) => {

  const repoName = `playwright-repo-${Date.now()}`;
  const issueTitle = "Test Issue via Automation";

  // 1️⃣ Create Repo via API
  const repoResponse = await GitHubAPI.createRepo(repoName);
  expect(repoResponse.status()).toBe(201);

  // 2️⃣ Create Issue via API
  const issueResponse = await GitHubAPI.createIssue(repoName, issueTitle);
  expect(issueResponse.status()).toBe(201);

  // 3️⃣ Login via UI
  const loginPage = new LoginPage(page);
  await loginPage.login(
    process.env.GITHUB_USERNAME,
    process.env.GITHUB_PASSWORD
  );

  // 4️⃣ Validate in UI
  const repoPage = new RepoPage(page, process.env.GITHUB_USERNAME, repoName);
  await repoPage.openRepo();
  await repoPage.verifyRepoVisible();
  await repoPage.verifyIssueExists(issueTitle);

  // 5️⃣ Delete Repo via API
  const deleteResponse = await GitHubAPI.deleteRepo(repoName);
  expect(deleteResponse.status()).toBe(204);

});
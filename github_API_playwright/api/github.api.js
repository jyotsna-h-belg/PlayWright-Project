import { request } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

const BASE_URL = 'https://api.github.com';
const TOKEN = process.env.GITHUB_TOKEN;
const USERNAME = process.env.GITHUB_USERNAME;

export class GitHubAPI {

  static async createRepo(repoName) {
    const context = await request.newContext({
      extraHTTPHeaders: {
        Authorization: `Bearer ${TOKEN}`,
        //Authorization: `token ${TOKEN}`,
        Accept: 'application/vnd.github+json'
      }
    });

    const response = await context.post(`${BASE_URL}/user/repos`, {
      data: {
        name: repoName,
        private: false
      }
    });

    console.log("Create Repo Status:", response.status());
    return response;
  }

  static async createIssue(repoName, title) {
    const context = await request.newContext({
      extraHTTPHeaders: {
        Authorization: `Bearer ${TOKEN}`,
        //Authorization: `token ${TOKEN}`,
        Accept: 'application/vnd.github+json'
      }
    });

    const response = await context.post(
      `${BASE_URL}/repos/${USERNAME}/${repoName}/issues`,
      {
        data: {
          title: title,
          body: "Created via Playwright API automation"
        }
      }
    );

    console.log("Create Issue Status:", response.status());
    return response;
  }

  static async deleteRepo(repoName) {
    const context = await request.newContext({
      extraHTTPHeaders: {
        Authorization: `Bearer ${TOKEN}`,
        //Authorization: `token ${TOKEN}`,
        Accept: 'application/vnd.github+json'
      }
    });

    const response = await context.delete(
      `${BASE_URL}/repos/${USERNAME}/${repoName}`
    );

    console.log("Delete Repo Status:", response.status());
    return response;
  }
}
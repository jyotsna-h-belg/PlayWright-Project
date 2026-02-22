
export class RepoPage {
  constructor(page, username, repoName) {
    this.page = page;
    this.repoUrl = `https://github.com/${username}/${repoName}`;
    this.issueTab = 'a[href$="/issues"]';
  }

  async openRepo() {
    await this.page.goto(this.repoUrl);
  }

  async verifyRepoVisible() {
    await this.page.waitForLoadState('domcontentloaded');
  }

  async verifyIssueExists(issueTitle) {

  await this.page.goto(`${this.repoUrl}/issues`);

  // wait for issues page to load
  await this.page.waitForLoadState('domcontentloaded');

  // retry once if needed
  await this.page.reload();
  await this.page.waitForLoadState('domcontentloaded');

  await this.page.getByText(issueTitle, { exact: false }).waitFor({
    timeout: 15000
  });
}
  // async verifyIssueExists(issueTitle) {
  //   await this.page.click(this.issueTab);
  //   await this.page.getByText(issueTitle).waitFor();
  // }
}

// export class RepoPage {
//   constructor(page, username, repoName) {
//     this.page = page;
//     this.repoUrl = `https://github.com/${username}/${repoName}`;
//         this.issuesTab = page.locator('a[data-tab-item="issues-tab"]');
//         //this.issueTab = page.getByRole('link', { name: 'Issues' });
//     //this.issueTab = 'a[href$="/issues"]';
//   }

//   async openRepo() {
//     await this.page.goto(this.repoUrl);
//   }

//   async verifyRepoVisible() {
//     await this.page.waitForLoadState('domcontentloaded');
//   }

 
//   // async verifyIssueExists(issueTitle) {
//   //   await this.page.getByRole('tab', { name: 'Issues' }).click();
//   //   //await this.page.click(this.issueTab);
//   //   //await this.page.getByText(issueTitle).waitFor();
//   // }
// }
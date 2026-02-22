const { TIMEOUT } = require("node:dns");

class RepositoryPage {
  constructor(page) {
    this.page = page;

    //this.newRepoBtn = 'text=New';
    this.repoNameField = '#repository-name-input';
    this.createBtn = 'button:has-text("Create repository")';
    //'text=Create repository';
    this.errorMsg = '.flash-error';
  }

  async createRepository(name) {
      
      // If owner selection appears
  // const ownerSelector = this.page.locator('text=Select owner');

  // if (await ownerSelector.isVisible().catch(() => false)) {
  //   await this.page.click('text=YourUsername'); 
  // }

    //await this.page.click(this.newRepoBtn);
    await this.page.waitForSelector(this.repoNameField);
    await this.page.fill(this.repoNameField, name);
    await this.page.click(this.createBtn);
    await this.page.waitForTimeout(5000);
  }
}

module.exports = RepositoryPage;
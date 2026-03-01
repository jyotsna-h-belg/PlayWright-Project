const { TIMEOUT } = require("node:dns");

class RepositoryPage {
  constructor(page) {
    this.page = page;

    //this.newRepoBtn = 'text=New';
    this.repoNameField = "#repository-name-input";
    this.createBtn = 'button:has-text("Create repository")';
    //this.errorMsg = ".flash-error";
    this.errorMsg = "#repository-name-input[aria-invalid='true']";
  }

  async createRepository(name) {
    await this.page.waitForSelector(this.repoNameField);
    await this.page.fill(this.repoNameField, name);
    await this.page.click(this.createBtn);
    await this.page.waitForTimeout(5000);
  }
}

module.exports = RepositoryPage;

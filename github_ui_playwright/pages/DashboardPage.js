class DashboardPage {
  constructor(page) {
    this.page = page;

    // Locators
    this.profileIcon = 'summary[aria-label="View profile and more"]';
    ((this.logoutButton = "menuitem"), { name: "Sign out" }); //'text=Sign out';
    this.newRepositoryButton = 'a[href="/new"]'; //'text=New';
    this.repositoriesTab = 'a[href="/?tab=repositories"]';
    this.searchRepo = 'button[aria-label="Search or jump to…"]';
  }

  async verifyLoginSuccessful() {
    await this.page.waitForSelector(this.profileIcon);
  }

  async clickNewRepository() {
    await this.page.click(this.newRepositoryButton);
  }

  async goToRepositoriesTab() {
    await this.page.click(this.repositoriesTab);
  }
  async searchRepository(repoName) {
    await this.page.click(this.searchRepo);
    await this.page.fill('input[name="query-builder-test"]', repoName);
    await this.page.keyboard.press("Enter");
  }   
  
  async logout() {
    await this.page.click(this.profileIcon);
    await this.page.waitForSelector("text=Sign out");
    await this.page.click(this.logoutButton);
  }
}
module.exports = DashboardPage;

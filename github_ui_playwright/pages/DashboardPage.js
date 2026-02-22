
// class DashboardPage {
//   constructor(page) {
//     this.page = page;

//     // Proper Locators
//     this.profileIcon = 'summary[aria-label="View profile and more"]';
//     this.logoutButton = 'menuitem', { name: 'Sign out' };
//     this.newRepositoryButton = 'a[href="/new"]';
//     this.repositoriesTab = 'a[href="/?tab=repositories"]';
//   }

//   async verifyLoginSuccessful() {
//     await this.profileIcon.waitFor({ state: 'visible', timeout: 80000 });
//   }

//   async clickNewRepository() {
//     await this.newRepositoryButton.click();
//   }

//   async goToRepositoriesTab() {
//     await this.repositoriesTab.click();
//   }

//   async logout() {

    
//     await this.profileIcon.click();
//     await this.logoutButton.click();
//   }
// }

// module.exports = DashboardPage;

class DashboardPage {
  constructor(page) {
    this.page = page;

    // Locators
    this.profileIcon = 'summary[aria-label="View profile and more"]';
    this.logoutButton =  'menuitem', { name: 'Sign out' }; //'text=Sign out';
    this.newRepositoryButton = 'a[href="/new"]' //'text=New';
    this.repositoriesTab = 'a[href="/?tab=repositories"]';
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

  async logout() {
   
    await this.page.click(this.profileIcon);
    await this.page.waitForSelector('text=Sign out');
    await this.page.click(this.logoutButton);
  }
}

module.exports = DashboardPage;
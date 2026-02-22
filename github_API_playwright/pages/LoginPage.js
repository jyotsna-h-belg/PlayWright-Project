export class LoginPage {
  constructor(page) {
    this.page = page;
    this.usernameInput = '#login_field';
    this.passwordInput = '#password';
    this.signInButton = 'input[type="submit"]';
  }

  async login(username, password) {
    await this.page.goto('https://github.com/login');
    await this.page.fill(this.usernameInput, username);
    await this.page.fill(this.passwordInput, password);
    await this.page.click(this.signInButton);
  }
}
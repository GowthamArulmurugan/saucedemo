const { expect } = require('@playwright/test');
const { locators } = require('../locators/locators');
const { BasePage } = require('./BasePage');

class LoginPage extends BasePage {
  /** @param {import('@playwright/test').Page} page */
  constructor(page) {
    super(page);
    this.selectors = locators.login;
  }

  usernameInput() {
    return this.page.locator(this.selectors.username);
  }

  passwordInput() {
    return this.page.locator(this.selectors.password);
  }

  loginButton() {
    return this.page.locator(this.selectors.loginButton);
  }

  errorBanner() {
    return this.page.locator(this.selectors.error);
  }

  async open() {
    await this.goto('/');
    await expect(this.loginButton()).toBeVisible();
  }

  async submitCredentials(username, password) {
    await this.usernameInput().fill(username);
    await this.passwordInput().fill(password);
    await this.loginButton().click();
  }

  async expectErrorMessage(message) {
    await expect(this.errorBanner()).toBeVisible();
    await expect(this.errorBanner()).toHaveText(message);
  }

  async expectOnLoginPage() {
    await expect(this.loginButton()).toBeVisible();
  }
}

module.exports = { LoginPage };

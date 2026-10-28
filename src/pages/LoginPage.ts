import { expect, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
  private readonly usernameInput = () => this.page.locator('[data-test="username"]');
  private readonly passwordInput = () => this.page.locator('[data-test="password"]');
  private readonly loginButton = () => this.page.locator('[data-test="login-button"]');
  private readonly errorBanner = () => this.page.locator('[data-test="error"]');

  constructor(page: Page) {
    super(page);
  }

  async open(): Promise<void> {
    await this.goto('/');
    await expect(this.loginButton()).toBeVisible();
  }

  async submitCredentials(username: string, password: string): Promise<void> {
    await this.usernameInput().fill(username);
    await this.passwordInput().fill(password);
    await this.loginButton().click();
  }

  async expectErrorMessage(message: string | RegExp): Promise<void> {
    await expect(this.errorBanner()).toBeVisible();
    await expect(this.errorBanner()).toHaveText(message);
  }

  async expectOnLoginPage(): Promise<void> {
    await expect(this.loginButton()).toBeVisible();
  }
}

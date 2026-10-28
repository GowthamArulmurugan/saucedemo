import { expect, Locator, Page } from '@playwright/test';

/** Shared helpers — no fixed sleeps; use Playwright auto-waiting. */
export class BasePage {
  constructor(protected readonly page: Page) {}

  async goto(path = '/'): Promise<void> {
    await this.page.goto(path);
  }

  protected locator(selector: string): Locator {
    return this.page.locator(selector);
  }

  async expectUrl(pathOrPattern: string | RegExp): Promise<void> {
    await expect(this.page).toHaveURL(pathOrPattern);
  }

  async openBurgerMenu(): Promise<void> {
    await this.page.locator('#react-burger-menu-btn').click();
  }

  async logout(): Promise<void> {
    await this.openBurgerMenu();
    await this.page.locator('#logout_sidebar_link').click();
  }

  /** Parses displayed currency text (e.g. "$29.99") to a number. */
  static parsePrice(text: string): number {
    return Number.parseFloat(text.replace(/[^0-9.]/g, ''));
  }

  /** Returns true when numeric prices are monotonically non-decreasing. */
  static pricesSortedLowToHigh(priceTexts: string[]): boolean {
    const values = priceTexts.map(BasePage.parsePrice);
    return values.every((price, index) => index === 0 || price >= values[index - 1]);
  }

  /** Returns true when numeric prices are monotonically non-increasing. */
  static pricesSortedHighToLow(priceTexts: string[]): boolean {
    const values = priceTexts.map(BasePage.parsePrice);
    return values.every((price, index) => index === 0 || price <= values[index - 1]);
  }

  static namesSortedAsc(names: string[]): boolean {
    const sorted = [...names].sort((a, b) => a.localeCompare(b));
    return names.every((name, index) => name === sorted[index]);
  }

  static namesSortedDesc(names: string[]): boolean {
    const sorted = [...names].sort((a, b) => b.localeCompare(a));
    return names.every((name, index) => name === sorted[index]);
  }
}

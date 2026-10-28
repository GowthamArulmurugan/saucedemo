const { expect } = require('@playwright/test');
const { locators } = require('../locators/locators');

/** Shared helpers — no fixed sleeps; use Playwright auto-waiting. */
class BasePage {
  /** @param {import('@playwright/test').Page} page */
  constructor(page) {
    this.page = page;
  }

  async goto(path = '/') {
    await this.page.goto(path);
  }

  async expectUrl(pathOrPattern) {
    await expect(this.page).toHaveURL(pathOrPattern);
  }

  async openBurgerMenu() {
    await this.page.locator(locators.menu.burgerButton).click();
  }

  async logout() {
    await this.openBurgerMenu();
    await this.page.locator(locators.menu.logoutLink).click();
  }

  /** @param {string} text */
  static parsePrice(text) {
    return Number.parseFloat(text.replace(/[^0-9.]/g, ''));
  }

  /** @param {string[]} priceTexts */
  static pricesSortedLowToHigh(priceTexts) {
    const values = priceTexts.map(BasePage.parsePrice);
    return values.every((price, index) => index === 0 || price >= values[index - 1]);
  }

  /** @param {string[]} priceTexts */
  static pricesSortedHighToLow(priceTexts) {
    const values = priceTexts.map(BasePage.parsePrice);
    return values.every((price, index) => index === 0 || price <= values[index - 1]);
  }

  /** @param {string[]} names */
  static namesSortedAsc(names) {
    const sorted = [...names].sort((a, b) => a.localeCompare(b));
    return names.every((name, index) => name === sorted[index]);
  }

  /** @param {string[]} names */
  static namesSortedDesc(names) {
    const sorted = [...names].sort((a, b) => b.localeCompare(a));
    return names.every((name, index) => name === sorted[index]);
  }
}

module.exports = { BasePage };

const { expect } = require('@playwright/test');
const { sortOptions, products } = require('../test-data/products');
const { addToCartButton, removeButton, locators } = require('../locators/locators');
const { BasePage } = require('./BasePage');

class InventoryPage extends BasePage {
  /** @param {import('@playwright/test').Page} page */
  constructor(page) {
    super(page);
    this.selectors = locators.inventory;
  }

  sortDropdown() {
    return this.page.locator(this.selectors.sortDropdown);
  }

  productNames() {
    return this.page.locator(this.selectors.productName);
  }

  productPrices() {
    return this.page.locator(this.selectors.productPrice);
  }

  cartLink() {
    return this.page.locator(this.selectors.shoppingCartLink);
  }

  cartBadge() {
    return this.page.locator(this.selectors.cartBadge);
  }

  async expectLoaded() {
    await this.expectUrl(/inventory\.html/);
    await expect(this.sortDropdown()).toBeVisible();
  }

  /** @param {keyof typeof sortOptions} optionKey */
  async sortBy(optionKey) {
    const option = sortOptions[optionKey];
    await this.sortDropdown().selectOption(option.value);
  }

  async getAllProductNames() {
    return this.productNames().allTextContents();
  }

  async getAllProductPrices() {
    return this.productPrices().allTextContents();
  }

  /** @param {keyof typeof products} productKey */
  addToCartLocator(productKey) {
    const slug = products[productKey].slug;
    return this.page.locator(addToCartButton(slug));
  }

  /** @param {keyof typeof products} productKey */
  removeLocator(productKey) {
    const slug = products[productKey].slug;
    return this.page.locator(removeButton(slug));
  }

  /** @param {keyof typeof products} productKey */
  async addProductToCart(productKey) {
    await this.addToCartLocator(productKey).click();
  }

  /** @param {keyof typeof products} productKey */
  async removeProductFromInventory(productKey) {
    await this.removeLocator(productKey).click();
  }

  async openCart() {
    await this.cartLink().click();
    await this.expectUrl(/cart\.html/);
  }

  async expectCartBadgeCount(count) {
    if (count === 0) {
      await expect(this.cartBadge()).toHaveCount(0);
      return;
    }
    await expect(this.cartBadge()).toHaveText(String(count));
  }
}

module.exports = { InventoryPage };

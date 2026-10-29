const { expect } = require('@playwright/test');
const { products } = require('../test-data/products');
const { removeButton, locators } = require('../locators/locators');
const { BasePage } = require('./BasePage');

class CartPage extends BasePage {
  /** @param {import('@playwright/test').Page} page */
  constructor(page) {
    super(page);
    this.selectors = locators.cart;
  }

  checkoutButton() {
    return this.page.locator(this.selectors.checkoutButton);
  }

  cartBadge() {
    return this.page.locator(locators.inventory.cartBadge);
  }

  cartItems() {
    return this.page.locator(this.selectors.cartItem);
  }

  async expectLoaded() {
    await this.expectUrl(/cart\.html/);
  }

  async startCheckout() {
    await this.checkoutButton().click();
    await this.expectUrl(/checkout-step-one\.html/);
  }

  /** @param {keyof typeof products} productKey */
  async removeProduct(productKey) {
    const slug = products[productKey].slug;
    await this.page.locator(removeButton(slug)).click();
  }

  async expectItemCount(count) {
    await expect(this.cartItems()).toHaveCount(count);
  }

  async expectCartBadgeCount(count) {
    if (count === 0) {
      await expect(this.cartBadge()).toHaveCount(0);
      return;
    }
    await expect(this.cartBadge()).toHaveText(String(count));
  }

  /** @param {Array<keyof typeof products>} productKeys */
  async expectCartContainsProducts(productKeys) {
    await expect(this.cartItems()).toHaveCount(productKeys.length);
    for (const key of productKeys) {
      const name = products[key].name;
      await expect(
        this.page.locator(this.selectors.cartItem).filter({ hasText: name }),
      ).toHaveCount(1);
    }
  }
}

module.exports = { CartPage };

const { env } = require('../config/environment');
const { users } = require('../test-data/users');

/**
 * High-level flows composed from page objects (reused by upcoming TC## tests).
 */
class SauceDemoFlows {
  /**
   * @param {import('@playwright/test').Page} page
   * @param {import('../pages/LoginPage').LoginPage} loginPage
   * @param {import('../pages/InventoryPage').InventoryPage} inventoryPage
   * @param {import('../pages/CartPage').CartPage} cartPage
   * @param {import('../pages/CheckoutPage').CheckoutPage} checkoutPage
   */
  constructor(page, loginPage, inventoryPage, cartPage, checkoutPage) {
    this.page = page;
    this.loginPage = loginPage;
    this.inventoryPage = inventoryPage;
    this.cartPage = cartPage;
    this.checkoutPage = checkoutPage;
  }

  /** @param {keyof typeof users} userKey */
  async loginAs(userKey) {
    const user = users[userKey];
    await this.loginWith(user);
  }

  async loginWith(user) {
    await this.loginPage.open();
    await this.loginPage.submitCredentials(user.username, user.password);
    await this.inventoryPage.expectLoaded();
  }

  async loginAsStandardUser() {
    await this.loginWith({
      username: env.standardUser,
      password: env.password,
    });
  }

  /** @param {Array<keyof import('../test-data/products').products>} productKeys */
  async addProductsToCart(productKeys) {
    for (const key of productKeys) {
      await this.inventoryPage.addProductToCart(key);
    }
  }

  async checkoutWithCustomer(customer) {
    await this.inventoryPage.openCart();
    await this.cartPage.startCheckout();
    await this.checkoutPage.fillCustomerInfo(customer);
    await this.checkoutPage.continueFromCustomerInfo();
    await this.checkoutPage.expectOverviewStep();
  }

  async completeCheckoutFromInventory(customer) {
    await this.checkoutWithCustomer(customer);
    await this.checkoutPage.expectTotalsMatchFormula();
    await this.checkoutPage.finishOrder();
  }

  async clearSessionAndOpen(path) {
    await this.page.context().clearCookies();
    await this.page.goto(path);
  }

  async logoutFromApplication() {
    await this.inventoryPage.logout();
  }
}

module.exports = { SauceDemoFlows };

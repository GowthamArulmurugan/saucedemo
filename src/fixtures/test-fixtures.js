const { test: base, expect } = require('@playwright/test');
const { SauceDemoFlows } = require('../common/SauceDemoFlows');
const {
  LoginPage,
  InventoryPage,
  CartPage,
  CheckoutPage,
} = require('../pages');

const test = base.extend({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

  inventoryPage: async ({ page }, use) => {
    await use(new InventoryPage(page));
  },

  cartPage: async ({ page }, use) => {
    await use(new CartPage(page));
  },

  checkoutPage: async ({ page }, use) => {
    await use(new CheckoutPage(page));
  },

  flows: async ({ page, loginPage, inventoryPage, cartPage, checkoutPage }, use) => {
    await use(
      new SauceDemoFlows(page, loginPage, inventoryPage, cartPage, checkoutPage),
    );
  },

  authenticatedStandardUser: [
    async ({ flows }, use) => {
      await flows.loginAsStandardUser();
      await use();
    },
    { auto: false },
  ],
});

module.exports = { test, expect };

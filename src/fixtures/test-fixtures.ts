import { test as base, expect } from '@playwright/test';
import { SauceDemoFlows } from '../common/SauceDemoFlows';
import {
  CartPage,
  CheckoutPage,
  InventoryPage,
  LoginPage,
} from '../pages';

type SauceFixtures = {
  loginPage: LoginPage;
  inventoryPage: InventoryPage;
  cartPage: CartPage;
  checkoutPage: CheckoutPage;
  flows: SauceDemoFlows;
  /** Fresh login as standard_user before each test that uses this fixture. */
  authenticatedStandardUser: void;
};

export const test = base.extend<SauceFixtures>({
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

export { expect };

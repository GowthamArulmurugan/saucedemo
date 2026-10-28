import { Page } from '@playwright/test';
import { env } from '../config/environment';
import { CheckoutCustomer } from '../test-data/checkout';
import { ProductKey } from '../test-data/products';
import { SauceUser, SauceUserKey, users } from '../test-data/users';
import {
  CartPage,
  CheckoutPage,
  InventoryPage,
  LoginPage,
} from '../pages';

/**
 * High-level flows composed from page objects (reused by upcoming TC## tests).
 */
export class SauceDemoFlows {
  constructor(
    private readonly page: Page,
    readonly loginPage: LoginPage,
    readonly inventoryPage: InventoryPage,
    readonly cartPage: CartPage,
    readonly checkoutPage: CheckoutPage,
  ) {}

  async loginAs(userKey: SauceUserKey): Promise<void> {
    const user = users[userKey];
    await this.loginWith(user);
  }

  async loginWith(user: Pick<SauceUser, 'username' | 'password'>): Promise<void> {
    await this.loginPage.open();
    await this.loginPage.submitCredentials(user.username, user.password);
    await this.inventoryPage.expectLoaded();
  }

  async loginAsStandardUser(): Promise<void> {
    await this.loginWith({
      username: env.standardUser,
      password: env.password,
    });
  }

  async addProductsToCart(productKeys: ProductKey[]): Promise<void> {
    for (const key of productKeys) {
      await this.inventoryPage.addProductToCart(key);
    }
  }

  async checkoutWithCustomer(customer: CheckoutCustomer): Promise<void> {
    await this.inventoryPage.openCart();
    await this.cartPage.startCheckout();
    await this.checkoutPage.fillCustomerInfo(customer);
    await this.checkoutPage.continueFromCustomerInfo();
    await this.checkoutPage.expectOverviewStep();
  }

  async completeCheckoutFromInventory(customer: CheckoutCustomer): Promise<void> {
    await this.checkoutWithCustomer(customer);
    await this.checkoutPage.expectTotalsMatchFormula();
    await this.checkoutPage.finishOrder();
  }

  async clearSessionAndOpen(path: string): Promise<void> {
    await this.page.context().clearCookies();
    await this.page.goto(path);
  }
}

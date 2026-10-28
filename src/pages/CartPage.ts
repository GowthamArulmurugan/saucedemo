import { expect, Page } from '@playwright/test';
import { ProductKey, products } from '../test-data/products';
import { BasePage } from './BasePage';

export class CartPage extends BasePage {
  private readonly checkoutButton = () => this.page.locator('[data-test="checkout"]');
  private readonly cartBadge = () => this.page.locator('.shopping_cart_badge');
  private readonly cartItems = () => this.page.locator('.cart_item');

  constructor(page: Page) {
    super(page);
  }

  async expectLoaded(): Promise<void> {
    await this.expectUrl(/cart\.html/);
  }

  async startCheckout(): Promise<void> {
    await this.checkoutButton().click();
    await this.expectUrl(/checkout-step-one\.html/);
  }

  async removeProduct(productKey: ProductKey): Promise<void> {
    const slug = products[productKey].slug;
    await this.page.locator(`[data-test="remove-${slug}"]`).click();
  }

  async expectItemCount(count: number): Promise<void> {
    await expect(this.cartItems()).toHaveCount(count);
  }

  async expectCartBadgeCount(count: number): Promise<void> {
    if (count === 0) {
      await expect(this.cartBadge()).toHaveCount(0);
      return;
    }
    await expect(this.cartBadge()).toHaveText(String(count));
  }
}

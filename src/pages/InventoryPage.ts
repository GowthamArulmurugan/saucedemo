import { expect, Page } from '@playwright/test';
import { SortOptionKey, sortOptions, ProductKey, products } from '../test-data/products';
import { BasePage } from './BasePage';

export class InventoryPage extends BasePage {
  private readonly sortDropdown = () => this.page.locator('[data-test="product-sort-container"]');
  private readonly productNames = () => this.page.locator('.inventory_item_name');
  private readonly productPrices = () => this.page.locator('.inventory_item_price');
  private readonly cartLink = () => this.page.locator('[data-test="shopping-cart-link"]');
  private readonly cartBadge = () => this.page.locator('.shopping_cart_badge');

  constructor(page: Page) {
    super(page);
  }

  async expectLoaded(): Promise<void> {
    await this.expectUrl(/inventory\.html/);
    await expect(this.sortDropdown()).toBeVisible();
  }

  async sortBy(optionKey: SortOptionKey): Promise<void> {
    const option = sortOptions[optionKey];
    await this.sortDropdown().selectOption(option.value);
  }

  async getAllProductNames(): Promise<string[]> {
    return this.productNames().allTextContents();
  }

  async getAllProductPrices(): Promise<string[]> {
    return this.productPrices().allTextContents();
  }

  private addToCartButton(productKey: ProductKey) {
    const slug = products[productKey].slug;
    return this.page.locator(`[data-test="add-to-cart-${slug}"]`);
  }

  private removeButton(productKey: ProductKey) {
    const slug = products[productKey].slug;
    return this.page.locator(`[data-test="remove-${slug}"]`);
  }

  async addProductToCart(productKey: ProductKey): Promise<void> {
    await this.addToCartButton(productKey).click();
  }

  async removeProductFromInventory(productKey: ProductKey): Promise<void> {
    await this.removeButton(productKey).click();
  }

  async openCart(): Promise<void> {
    await this.cartLink().click();
    await this.expectUrl(/cart\.html/);
  }

  async expectCartBadgeCount(count: number): Promise<void> {
    if (count === 0) {
      await expect(this.cartBadge()).toHaveCount(0);
      return;
    }
    await expect(this.cartBadge()).toHaveText(String(count));
  }
}

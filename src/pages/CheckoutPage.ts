import { expect, Page } from '@playwright/test';
import { CheckoutCustomer } from '../test-data/checkout';
import { BasePage } from './BasePage';

export class CheckoutPage extends BasePage {
  private readonly firstNameInput = () => this.page.locator('[data-test="firstName"]');
  private readonly lastNameInput = () => this.page.locator('[data-test="lastName"]');
  private readonly postalCodeInput = () => this.page.locator('[data-test="postalCode"]');
  private readonly continueButton = () => this.page.locator('[data-test="continue"]');
  private readonly cancelButton = () => this.page.locator('[data-test="cancel"]');
  private readonly finishButton = () => this.page.locator('[data-test="finish"]');
  private readonly errorBanner = () => this.page.locator('[data-test="error"]');
  private readonly itemTotalLabel = () => this.page.locator('.summary_subtotal_label');
  private readonly taxLabel = () => this.page.locator('.summary_tax_label');
  private readonly totalLabel = () => this.page.locator('.summary_total_label');
  private readonly completeHeader = () => this.page.locator('.complete-header');
  private readonly cartBadge = () => this.page.locator('.shopping_cart_badge');

  constructor(page: Page) {
    super(page);
  }

  async fillCustomerInfo(customer: CheckoutCustomer): Promise<void> {
    await this.firstNameInput().fill(customer.firstName);
    await this.lastNameInput().fill(customer.lastName);
    await this.postalCodeInput().fill(customer.postalCode);
  }

  async continueFromCustomerInfo(): Promise<void> {
    await this.continueButton().click();
  }

  async expectCustomerInfoStep(): Promise<void> {
    await this.expectUrl(/checkout-step-one\.html/);
  }

  async expectOverviewStep(): Promise<void> {
    await this.expectUrl(/checkout-step-two\.html/);
  }

  async expectValidationError(message: string): Promise<void> {
    await expect(this.errorBanner()).toBeVisible();
    await expect(this.errorBanner()).toHaveText(message);
  }

  async expectTotalsMatchFormula(): Promise<void> {
    const itemTotalText = await this.itemTotalLabel().textContent();
    const taxText = await this.taxLabel().textContent();
    const totalText = await this.totalLabel().textContent();
    expect(itemTotalText).toBeTruthy();
    expect(taxText).toBeTruthy();
    expect(totalText).toBeTruthy();

    const itemTotal = BasePage.parsePrice(itemTotalText!);
    const tax = BasePage.parsePrice(taxText!);
    const total = BasePage.parsePrice(totalText!);
    expect(total).toBeCloseTo(itemTotal + tax, 2);
  }

  async finishOrder(): Promise<void> {
    await this.finishButton().click();
    await this.expectUrl(/checkout-complete\.html/);
  }

  async cancelOverview(): Promise<void> {
    await this.cancelButton().click();
  }

  async expectOrderComplete(message: string): Promise<void> {
    await expect(this.completeHeader()).toHaveText(message);
  }

  async expectEmptyCartBadge(): Promise<void> {
    await expect(this.cartBadge()).toHaveCount(0);
  }
}

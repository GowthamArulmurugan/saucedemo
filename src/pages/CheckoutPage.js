const { expect } = require('@playwright/test');
const { locators } = require('../locators/locators');
const { BasePage } = require('./BasePage');

class CheckoutPage extends BasePage {
  /** @param {import('@playwright/test').Page} page */
  constructor(page) {
    super(page);
    this.stepOne = locators.checkout.stepOne;
    this.stepTwo = locators.checkout.stepTwo;
    this.complete = locators.checkout.complete;
  }

  firstNameInput() {
    return this.page.locator(this.stepOne.firstName);
  }

  lastNameInput() {
    return this.page.locator(this.stepOne.lastName);
  }

  postalCodeInput() {
    return this.page.locator(this.stepOne.postalCode);
  }

  continueButton() {
    return this.page.locator(this.stepOne.continue);
  }

  cancelButtonOnStepOne() {
    return this.page.locator(this.stepOne.cancel);
  }

  finishButton() {
    return this.page.locator(this.stepTwo.finish);
  }

  cancelButtonOnOverview() {
    return this.page.locator(this.stepTwo.cancel);
  }

  errorBanner() {
    return this.page.locator(this.stepOne.error);
  }

  itemTotalLabel() {
    return this.page.locator(this.stepTwo.itemTotal);
  }

  taxLabel() {
    return this.page.locator(this.stepTwo.tax);
  }

  totalLabel() {
    return this.page.locator(this.stepTwo.total);
  }

  completeHeader() {
    return this.page.locator(this.complete.header);
  }

  cartBadge() {
    return this.page.locator(locators.inventory.cartBadge);
  }

  async fillCustomerInfo(customer) {
    await this.firstNameInput().fill(customer.firstName);
    await this.lastNameInput().fill(customer.lastName);
    await this.postalCodeInput().fill(customer.postalCode);
  }

  async continueFromCustomerInfo() {
    await this.continueButton().click();
  }

  async expectCustomerInfoStep() {
    await this.expectUrl(/checkout-step-one\.html/);
  }

  async expectOverviewStep() {
    await this.expectUrl(/checkout-step-two\.html/);
  }

  async expectValidationError(message) {
    await expect(this.errorBanner()).toBeVisible();
    await expect(this.errorBanner()).toHaveText(message);
  }

  async expectTotalsMatchFormula() {
    const itemTotalText = await this.itemTotalLabel().textContent();
    const taxText = await this.taxLabel().textContent();
    const totalText = await this.totalLabel().textContent();
    expect(itemTotalText).toBeTruthy();
    expect(taxText).toBeTruthy();
    expect(totalText).toBeTruthy();

    const itemTotal = BasePage.parsePrice(itemTotalText);
    const tax = BasePage.parsePrice(taxText);
    const total = BasePage.parsePrice(totalText);
    expect(total).toBeCloseTo(itemTotal + tax, 2);
  }

  async finishOrder() {
    await this.finishButton().click();
    await this.expectUrl(/checkout-complete\.html/);
  }

  async cancelOverview() {
    await this.cancelButtonOnOverview().click();
  }

  async expectOrderComplete(message) {
    await expect(this.completeHeader()).toHaveText(message);
  }

  async expectEmptyCartBadge() {
    await expect(this.cartBadge()).toHaveCount(0);
  }
}

module.exports = { CheckoutPage };

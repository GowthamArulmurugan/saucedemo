const { test } = require('../src/fixtures/test-fixtures');
const {
  checkoutCustomers,
  checkoutValidationMessages,
  orderCompleteHeader,
} = require('../src/test-data/checkout');

test.describe('Checkout', () => {
  test('TC14 complete checkout validates totals and empties cart', async ({
    flows,
    inventoryPage,
    checkoutPage,
  }) => {
    await flows.loginAsStandardUser();
    await inventoryPage.addProductToCart('bikeLight');
    await flows.completeCheckoutFromInventory(checkoutCustomers.valid);
    await checkoutPage.expectOrderComplete(orderCompleteHeader);
    await checkoutPage.expectEmptyCartBadge();
  });

  test('TC15 checkout required field validation', async ({
    flows,
    inventoryPage,
    cartPage,
    checkoutPage,
  }) => {
    const scenarios = [
      {
        label: 'first name',
        customer: checkoutCustomers.missingFirstName,
        message: checkoutValidationMessages.firstName,
      },
      {
        label: 'last name',
        customer: checkoutCustomers.missingLastName,
        message: checkoutValidationMessages.lastName,
      },
      {
        label: 'postal code',
        customer: checkoutCustomers.missingPostalCode,
        message: checkoutValidationMessages.postalCode,
      },
    ];

    await flows.loginAsStandardUser();
    await inventoryPage.addProductToCart('bikeLight');
    await inventoryPage.openCart();
    await cartPage.startCheckout();

    for (const { label, customer, message } of scenarios) {
      await test.step(`missing ${label}`, async () => {
        await checkoutPage.fillCustomerInfo(customer);
        await checkoutPage.continueFromCustomerInfo();
        await checkoutPage.expectValidationError(message);
      });
    }
  });
});

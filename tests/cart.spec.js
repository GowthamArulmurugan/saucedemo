const { test, expect } = require('../src/fixtures/test-fixtures');
const { products } = require('../src/test-data/products');

test.describe('Shopping cart', () => {
  test.beforeEach(async ({ flows }) => {
    await flows.loginAsStandardUser();
  });

  test('TC10 add one product updates cart badge to 1', async ({
    inventoryPage,
  }) => {
    await inventoryPage.addProductToCart('backpack');
    await inventoryPage.expectCartBadgeCount(1);
    await expect(inventoryPage.addToCartLocator('backpack')).toHaveCount(0);
    await expect(inventoryPage.removeLocator('backpack')).toBeVisible();
  });

  test('TC11 add two products remove one updates badge and cart contents', async ({
    inventoryPage,
    cartPage,
  }) => {
    await inventoryPage.addProductToCart('onesie');
    await inventoryPage.addProductToCart('bikeLight');
    await inventoryPage.expectCartBadgeCount(2);

    await inventoryPage.removeProductFromInventory('onesie');
    await inventoryPage.expectCartBadgeCount(1);

    await inventoryPage.openCart();
    await cartPage.expectItemCount(1);
    await cartPage.expectCartContainsProducts(['bikeLight']);
    await cartPage.expectCartBadgeCount(1);
  });
});

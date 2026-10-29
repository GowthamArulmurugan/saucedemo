const { test, expect } = require('../src/fixtures/test-fixtures');
const { BasePage } = require('../src/pages/BasePage');

test.describe('Product sorting', () => {
  test.beforeEach(async ({ flows }) => {
    await flows.loginAsStandardUser();
  });

  test('TC06 sort by name A to Z orders full product list', async ({
    inventoryPage,
  }) => {
    await inventoryPage.sortBy('nameAsc');
    const names = await inventoryPage.getAllProductNames();
    expect(names).toHaveLength(6);
    expect(BasePage.namesSortedAsc(names)).toBe(true);
  });

  test('TC07 sort by price low to high orders full price list', async ({
    inventoryPage,
  }) => {
    await inventoryPage.sortBy('priceLowHigh');
    const prices = await inventoryPage.getAllProductPrices();
    expect(prices).toHaveLength(6);
    expect(BasePage.pricesSortedLowToHigh(prices)).toBe(true);
  });

  test('TC08 sort by name Z to A orders full product list', async ({
    inventoryPage,
  }) => {
    await inventoryPage.sortBy('nameDesc');
    const names = await inventoryPage.getAllProductNames();
    expect(names).toHaveLength(6);
    expect(BasePage.namesSortedDesc(names)).toBe(true);
  });

  test('TC09 sort by price high to low orders full price list', async ({
    inventoryPage,
  }) => {
    await inventoryPage.sortBy('priceHighLow');
    const prices = await inventoryPage.getAllProductPrices();
    expect(prices).toHaveLength(6);
    expect(BasePage.pricesSortedHighToLow(prices)).toBe(true);
  });
});

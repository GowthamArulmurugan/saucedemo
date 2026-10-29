const { test, expect } = require('../src/fixtures/test-fixtures');
const { users, invalidCredentials } = require('../src/test-data/users');
const {
  lockedOutLoginMessage,
  invalidLoginMessage,
} = require('../src/test-data/checkout');

test.describe('Login', () => {
  test('TC01 standard user logs in and sees products', async ({
    flows,
    inventoryPage,
  }) => {
    await flows.loginAsStandardUser();
    await inventoryPage.expectLoaded();
    await expect(inventoryPage.productNames()).toHaveCount(6);
  });

  test('TC02 locked-out user sees lockout error', async ({ loginPage }) => {
    const user = users.lockedOut;
    await loginPage.open();
    await loginPage.submitCredentials(user.username, user.password);
    await loginPage.expectErrorMessage(lockedOutLoginMessage);
    await loginPage.expectOnLoginPage();
    await loginPage.expectCannotBrowseProducts();
  });

  test('TC03 invalid password shows credential error', async ({ loginPage }) => {
    await loginPage.open();
    await loginPage.submitCredentials(
      invalidCredentials.username,
      invalidCredentials.password,
    );
    await loginPage.expectErrorMessage(invalidLoginMessage);
    await loginPage.expectOnLoginPage();
  });
});

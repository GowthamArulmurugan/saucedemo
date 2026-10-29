const { test } = require('../src/fixtures/test-fixtures');

test.describe('Session and URL access', () => {
  test('TC18 guest cannot open inventory after logout or without session', async ({
    flows,
    loginPage,
    page,
  }) => {
    await test.step('direct inventory URL with no session', async () => {
      await flows.clearSessionAndOpen('/inventory.html');
      await loginPage.expectOnLoginPage();
      await loginPage.expectCannotBrowseProducts();
    });

    await test.step('direct inventory URL after logout', async () => {
      await flows.loginAsStandardUser();
      await flows.logoutFromApplication();
      await page.goto('/inventory.html');
      await loginPage.expectOnLoginPage();
      await loginPage.expectCannotBrowseProducts();
    });
  });
});

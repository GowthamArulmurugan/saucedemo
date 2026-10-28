# Sauce Demo automation

JavaScript Playwright UI tests for [Sauce Demo](https://www.saucedemo.com/), aligned with the manual suite in `../assessment/A1_Manual_Test_Suite.xlsx`.

**Status:** Page objects, locators, shared flows, fixtures, and test data are in place. Executable specs (`TC01` …) will be added next.

**Language:** JavaScript (CommonJS). Locators live in one module and were checked on the live site with Playwright MCP.

## Prerequisites

- Node.js 18+
- npm

## Setup

```bash
cd saucedemo
npm install
npx playwright install chromium
copy .env.example .env
```

Environment variables (see `.env.example`):

| Variable | Purpose | Default |
|----------|---------|---------|
| `BASE_URL` | Application under test | `https://www.saucedemo.com` |
| `HEADED` | `true` = visible browser (local default) | `true` |
| `SAUCE_STANDARD_USER` | Override standard username | from `src/test-data/users.js` |
| `SAUCE_PASSWORD` | Shared password | `secret_sauce` |

## Run tests

```bash
npm test              # uses HEADED from .env (headed by default)
npm run test:headed   # force headed
npm run report        # open HTML report after a run
```

Reports (assessment requirement):

- HTML: `playwright-report/`
- JUnit XML: `test-results/junit.xml`
- Screenshots: **only on failure** (`screenshot: 'only-on-failure'`)

## Project layout

```
playwright.config.js
src/
  locators/locators.js      # single source of selectors (MCP-verified on Sauce Demo)
  config/environment.js     # env-backed settings
  test-data/                # users.js, products.js, checkout.js, manual-case-map.js
  pages/                    # Page Object Model — methods only, no selectors in tests
  common/SauceDemoFlows.js  # reusable login / cart / checkout flows
  fixtures/test-fixtures.js # extended test + page/fixture wiring
tests/                      # TC## specs (next step)
```

## Locators (Playwright MCP)

All page objects import selectors from `src/locators/locators.js`. Do not duplicate selectors in spec files.

| Area | Key selectors |
|------|----------------|
| Login | `[data-test="username"]`, `[data-test="password"]`, `[data-test="login-button"]`, `[data-test="error"]` |
| Inventory | `[data-test="product-sort-container"]`, `[data-test="shopping-cart-link"]`, `.inventory_item_name`, `.inventory_item_price`, `.shopping_cart_badge` |
| Cart | `[data-test="checkout"]`, `.cart_item` |
| Checkout step 1 | `[data-test="firstName"]`, `[data-test="lastName"]`, `[data-test="postalCode"]`, `[data-test="continue"]`, `[data-test="cancel"]` |
| Checkout step 2 | `[data-test="finish"]`, `.summary_subtotal_label`, `.summary_tax_label`, `.summary_total_label` |
| Complete | `.complete-header`, `[data-test="back-to-products"]` |
| Menu | `#react-burger-menu-btn`, `#logout_sidebar_link` |
| Add to cart | `[data-test="add-to-cart-{slug}"]` — slugs in `productCartSlugs` inside `locators.js` |

## Writing specs (next step)

Import the custom fixture — not `@playwright/test` directly:

```javascript
const { test, expect } = require('../src/fixtures/test-fixtures');

test('TC01 standard user logs in', async ({ flows, inventoryPage }) => {
  await flows.loginAsStandardUser();
  await inventoryPage.expectLoaded();
});
```

Each test should log in or set up its own state so cases stay independent and order-free.

## Manual case → automation map

| Manual ID | Automate (A1) | Automated test |
|-----------|---------------|----------------|
| TC01 | Yes | pending |
| TC02 | Yes | pending |
| TC03 | Yes | pending |
| TC06 | Yes | pending |
| TC07 | Yes | pending |
| TC08 | Yes | pending |
| TC09 | Yes | pending |
| TC10 | Yes | pending |
| TC11 | Yes | pending |
| TC14 | Yes | pending |
| TC15 | Yes | pending |
| TC18 | Yes | pending |
| TC04–TC05, TC12–TC13, TC16–TC17, TC19–TC23 | No | manual only |

Source of truth for titles: `src/test-data/manual-case-map.js`.

## Growing to ~200 tests

Extend the 11 automated manual cases with data-driven variants (sort × product combinations, checkout boundaries, user personas), API checks if a backend exists, and visual baselines for `visual_user`. Add new UI steps only in `src/pages/` or `SauceDemoFlows.js`; keep specs thin and name tests with the manual ID prefix (`TC07 …`).

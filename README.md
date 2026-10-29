# Sauce Demo automation

JavaScript Playwright UI tests for [Sauce Demo](https://www.saucedemo.com/), aligned with the manual suite in `../assessment/A1_Manual_Test_Suite.xlsx`.

**Status:** 12 automated tests (A1 cases marked Automate = Yes), mapped to manual IDs `TC01`–`TC18`.

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
tests/                      # login, sort, cart, checkout, security specs
```

## Test specs

| File | Manual IDs |
|------|------------|
| `tests/login.spec.js` | TC01, TC02, TC03 |
| `tests/inventory-sort.spec.js` | TC06, TC07, TC08, TC09 |
| `tests/cart.spec.js` | TC10, TC11 |
| `tests/checkout.spec.js` | TC14, TC15 |
| `tests/security.spec.js` | TC18 |

Section A2 minimum (8 tests) is covered; all eleven A1 “Automate = Yes” cases are implemented (12 including sort/name variants).

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

## Manual case → automation map

| Manual ID | Automate (A1) | Automated test |
|-----------|---------------|----------------|
| TC01 | Yes | `TC01 standard user logs in and sees products` |
| TC02 | Yes | `TC02 locked-out user sees lockout error` |
| TC03 | Yes | `TC03 invalid password shows credential error` |
| TC06 | Yes | `TC06 sort by name A to Z orders full product list` |
| TC07 | Yes | `TC07 sort by price low to high orders full price list` |
| TC08 | Yes | `TC08 sort by name Z to A orders full product list` |
| TC09 | Yes | `TC09 sort by price high to low orders full price list` |
| TC10 | Yes | `TC10 add one product updates cart badge to 1` |
| TC11 | Yes | `TC11 add two products remove one updates badge and cart contents` |
| TC14 | Yes | `TC14 complete checkout validates totals and empties cart` |
| TC15 | Yes | `TC15 checkout required field validation` (parameterized steps) |
| TC18 | Yes | `TC18 guest cannot open inventory after logout or without session` |
| TC04–TC05, TC12–TC13, TC16–TC17, TC19–TC23 | No | manual only |

## Source of truth for titles: `src/test-data/manual-case-map.js`.


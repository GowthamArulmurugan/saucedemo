# Sauce Demo automation — Harvee QA assessment (Section A2)

Playwright + TypeScript UI tests for [Sauce Demo](https://www.saucedemo.com/), aligned with the manual suite in `../assessment/A1_Manual_Test_Suite.xlsx`.

**Status:** Page objects, shared flows, fixtures, and test data are in place. Executable specs (`TC01` …) will be added next.

## Prerequisites

- Node.js 18+
- npm

## Setup

```bash
cd saucedemo
npm install
npx playwright install chromium
cp .env.example .env
```

Environment variables (see `.env.example`):

| Variable | Purpose | Default |
|----------|---------|---------|
| `BASE_URL` | Application under test | `https://www.saucedemo.com` |
| `HEADED` | `true` = visible browser (local default) | `true` |
| `SAUCE_STANDARD_USER` | Override standard username | from `src/test-data/users.ts` |
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
- Screenshots: captured **only on failure** (`screenshot: 'only-on-failure'`)

## Project layout

```
src/
  config/environment.ts     # env-backed settings (no hard-coded URLs in tests)
  test-data/                # users, products, checkout messages, manual-case map
  pages/                    # Page Object Model (locators stay out of spec files)
  common/SauceDemoFlows.ts  # reusable login / cart / checkout flows
  fixtures/test-fixtures.ts # extended test + page/fixture wiring
tests/                      # TC## specs (next step)
```

## Writing specs (next step)

Import the custom fixture — not `@playwright/test` directly:

```typescript
import { test, expect } from '../src/fixtures/test-fixtures';

test('TC01 standard user logs in', async ({ flows, inventoryPage }) => {
  await flows.loginAsStandardUser();
  await inventoryPage.expectLoaded();
});
```

Use `test.use({ authenticatedStandardUser: true })` or call `flows.loginAsStandardUser()` inside the test so each case stays independent.

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

Source of truth for titles: `src/test-data/manual-case-map.ts`.

## Growing to ~200 tests

Start from the 11 automated manual cases, then add data-driven variants (each sort × each user type allowed, cart combinations, checkout boundary data), contract tests if an API layer exists, and visual snapshots for `visual_user`. Keep POM and `SauceDemoFlows` as the only place new UI steps are added; specs stay thin and tagged by manual ID prefix (`TC07 …`).

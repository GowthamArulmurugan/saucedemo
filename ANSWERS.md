# Section B — AI output and client communication

## B1. Review AI-generated code

### Problems found

1. **Hard-coded URL** — `page.goto('https://www.saucedemo.com')` belongs in config/env (assessment and maintainability); staging/prod URLs must not live in the test body.
2. **Fragile / legacy selectors** — Uses `#user-name`, `#password`, etc. Sauce Demo exposes stable `[data-test="…"]` attributes; IDs and `text=Add to cart` break when copy or layout changes and do not identify *which* product was added.
3. **Fixed sleep** — `waitForTimeout(3000)` is explicitly against good automation practice; it slows CI and hides real timing bugs. Use Playwright auto-waiting or assert a visible state (e.g. cart badge, overview page).
4. **Weak assertion** — `expect(total).toBeTruthy()` only checks that *some* text exists, not that the total is **correct** (business rule: total = item subtotal + tax). A wrong total like `$0.01` would pass.
5. **No calculation check** — Does not read item subtotal or tax lines, so regressions in tax math are missed.
6. **No traceability** — Test name does not map to a manual case ID (Section A requirement for A2).
7. **No Page Object Model** — Locators and steps are inlined; assessment requires POM (or equivalent) so UI changes touch one place.
8. **Non-isolated flow** — Clicks first “Add to cart” on the page without naming the product; cart contents and expected subtotal are unknown.
9. **Credentials in test** — Username/password should come from test data or env, not literals in the spec.
10. **No failure diagnostics** — Project standard is screenshot on failure + report; the snippet does not show it relies on framework config (acceptable if config exists, but the test itself is not review-ready for merge).

### Rewritten test (JavaScript, POM + fixtures — matches this repo)

Uses existing page objects and test data; asserts **total = subtotal + tax**, not merely “truthy”.

```javascript
const { test } = require('../src/fixtures/test-fixtures');
const { checkoutCustomers } = require('../src/test-data/checkout');

test('TC14 cart total equals item subtotal plus tax on checkout overview', async ({
  flows,
  inventoryPage,
  checkoutPage,
}) => {
  await flows.loginAsStandardUser();
  await inventoryPage.addProductToCart('bikeLight');
  await flows.checkoutWithCustomer(checkoutCustomers.valid);
  await checkoutPage.expectTotalsMatchFormula();
});
```

`expectTotalsMatchFormula()` in `CheckoutPage` reads `.summary_subtotal_label`, `.summary_tax_label`, and `.summary_total_label` and asserts the numeric total matches subtotal + tax—what “checks the cart total” should mean for this use case.

---

## B2. Test an AI feature

**Chosen scenario:** **3 — Test case generator** (user story → fixed JSON → test management import).

| # | Evaluation check | What we measure | Scoring |
|---|------------------|-----------------|---------|
| 1 | **Requirement coverage** | Generated cases cover acceptance criteria from the story (happy path, negatives, boundaries)—nothing critical missing, nothing that invents scope. | **human review** — Auto-compare case titles/steps to a checklist derived from the story; human judges “invented requirement” false positives. |
| 2 | **No invented requirements** | Cases must not add rules not in the story (e.g. “validate email format” when the story says nothing about email). | **Human review** (sampled) — Spot-check 10–20% of outputs; flag hallucinated fields/rules. |
| 3 | **Duplicate / redundant cases** | Same behaviour covered once; near-duplicate titles or steps are merged or rejected. | **Automatic** — Embedding or text similarity threshold on title + steps; fail if similarity > agreed limit. |
| 4 | **Valid import JSON** | Output parses as JSON, matches the TMS schema (required keys, types, enums), and import dry-run succeeds. | **Automatic** — JSON Schema validation + CI job that runs importer against a test project without committing. |

---

## B3. Defect report (Jira)

| Field | Content |
|--------|---------|
| **Title** | [4.2.0] Inventory sort “Price (low to high)” displays higher-priced item before lower-priced item |
| **Environment** | Release **4.2.0**, **Chrome** (latest), Windows/macOS, `https://www.saucedemo.com/` (or client UAT URL), user **standard_user** |
| **Preconditions** | User logged in; inventory page loaded with default product list |
| **Steps to reproduce** | 1. Log in as standard_user. 2. Open Products / inventory. 3. Open sort dropdown. 4. Select **Price (low to high)**. 5. Read product prices from top to bottom of the list. |
| **Expected result** | Prices appear in **non-decreasing** order for all visible items (each price ≥ the one above). Example: $15.99 appears **before** $29.99. |
| **Actual result** | An item priced **$29.99** appears **above** an item priced **$15.99** (order violates low-to-high). Reproduced on **every** run since 4.2.0. |
| **Severity** | **Major** — Core shopping behaviour (find affordable items) is wrong; does not block checkout entirely but misleads customers and breaks trust in sort/filter. Not Critical unless client treats sort as release gate for all e-commerce flows. |
| **Evidence to attach** | Screenshot of sorted list with prices annotated; short screen recording; link to failed automation **TC07** (full-list price assertion); browser/version; build 4.2.0. |

---

## B4. Message to the product manager

Quick update before Friday’s release.

Testing on 4.2.0 found a **sorting issue**: “Price (low to high)” sometimes shows more expensive items above cheaper ones (e.g. $29.99 before $15.99). That’s consistent on every run, so I’d treat it as a real product bug, not a one-off.

We also see a **checkout test fail about 1 in 10 times**; re-running usually passes, which suggests timing or instability rather than a broken checkout for everyone.

**Recommendation:** Fix the sort bug and ship a small patch, or release Friday with sort disabled/hidden if that’s possible. For checkout, I’d hold the release only if you need a hard guarantee; otherwise release with monitoring and a hotfix plan if customer reports spike.

Happy to join a 15-minute call today to pick the least risky option.


---

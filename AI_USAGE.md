# AI usage (Playwright automation)

---

## 1. First scaffold (pages, fixtures, config)

**What I asked:**  
Set up a Playwright project for saucedemo.com: page objects so locators stay out of tests, a config file with base URL and users from environment variables, custom fixtures for pages and shared login/cart/checkout flows, test data in separate files, HTML and JUnit reports, screenshots on failure, and a README with how to run and a table mapping manual test IDs to automation. Do not write the actual TC tests yet—just the foundation.

**What I checked:**  
I read through the generated structure against the assessment PDF (POM, no hard-coded URL in tests, independent tests later). I ran `npx playwright test --list` to confirm the config loads.

**What I changed:**  
I kept the layout but made sure credentials come from `environment.js` and `users.js`, not from test files. I added `manual-case-map.js` so A1 IDs line up with what we will automate. I set headed mode via `HEADED` in `.env.example` because I want to see the browser while building tests locally.

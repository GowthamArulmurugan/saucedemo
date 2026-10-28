/**
 * Sauce Demo locators — verified on https://www.saucedemo.com/ with Playwright MCP.
 * Prefer [data-test] selectors from the app; CSS classes listed where no data-test exists.
 * Last verified: 28 Oct 2026 (inventory add-to-cart slugs collected from live DOM).
 */

const locators = {
  login: {
    username: '[data-test="username"]',
    password: '[data-test="password"]',
    loginButton: '[data-test="login-button"]',
    error: '[data-test="error"]',
  },
  inventory: {
    sortDropdown: '[data-test="product-sort-container"]',
    shoppingCartLink: '[data-test="shopping-cart-link"]',
    productName: '.inventory_item_name',
    productPrice: '.inventory_item_price',
    cartBadge: '.shopping_cart_badge',
  },
  cart: {
    checkoutButton: '[data-test="checkout"]',
    cartItem: '.cart_item',
    continueShopping: '[data-test="continue-shopping"]',
  },
  checkout: {
    stepOne: {
      firstName: '[data-test="firstName"]',
      lastName: '[data-test="lastName"]',
      postalCode: '[data-test="postalCode"]',
      continue: '[data-test="continue"]',
      cancel: '[data-test="cancel"]',
      error: '[data-test="error"]',
    },
    stepTwo: {
      finish: '[data-test="finish"]',
      cancel: '[data-test="cancel"]',
      itemTotal: '.summary_subtotal_label',
      tax: '.summary_tax_label',
      total: '.summary_total_label',
    },
    complete: {
      header: '.complete-header',
      backHome: '[data-test="back-to-products"]',
    },
  },
  menu: {
    burgerButton: '#react-burger-menu-btn',
    logoutLink: '#logout_sidebar_link',
  },
};

/** Live MCP-verified add-to-cart data-test suffixes (full attribute: add-to-cart-{slug}). */
const productCartSlugs = [
  'sauce-labs-backpack',
  'sauce-labs-bike-light',
  'sauce-labs-bolt-t-shirt',
  'sauce-labs-fleece-jacket',
  'sauce-labs-onesie',
  'test.allthethings()-t-shirt-(red)',
];

function addToCartButton(slug) {
  return `[data-test="add-to-cart-${slug}"]`;
}

function removeButton(slug) {
  return `[data-test="remove-${slug}"]`;
}

module.exports = {
  locators,
  productCartSlugs,
  addToCartButton,
  removeButton,
};

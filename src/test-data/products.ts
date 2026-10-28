export interface ProductCatalogItem {
  name: string;
  slug: string;
  price: number;
}

/** Inventory items on Sauce Demo (prices for assertions in sort/checkout tests). */
export const products = {
  backpack: {
    name: 'Sauce Labs Backpack',
    slug: 'sauce-labs-backpack',
    price: 29.99,
  },
  bikeLight: {
    name: 'Sauce Labs Bike Light',
    slug: 'sauce-labs-bike-light',
    price: 9.99,
  },
  boltTShirt: {
    name: 'Sauce Labs Bolt T-Shirt',
    slug: 'sauce-labs-bolt-t-shirt',
    price: 15.99,
  },
  fleeceJacket: {
    name: 'Sauce Labs Fleece Jacket',
    slug: 'sauce-labs-fleece-jacket',
    price: 49.99,
  },
  onesie: {
    name: 'Sauce Labs Onesie',
    slug: 'sauce-labs-onesie',
    price: 7.99,
  },
  redTShirt: {
    name: 'Test.allTheThings() T-Shirt (Red)',
    slug: 'test.allthethings()-t-shirt-(red)',
    price: 15.99,
  },
} as const satisfies Record<string, ProductCatalogItem>;

export type ProductKey = keyof typeof products;

export const sortOptions = {
  nameAsc: { label: 'Name (A to Z)', value: 'az' },
  nameDesc: { label: 'Name (Z to A)', value: 'za' },
  priceLowHigh: { label: 'Price (low to high)', value: 'lohi' },
  priceHighLow: { label: 'Price (high to low)', value: 'hilo' },
} as const;

export type SortOptionKey = keyof typeof sortOptions;

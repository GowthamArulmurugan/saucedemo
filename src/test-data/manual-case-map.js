/** A1 manual case ID → automated test name in tests/*.spec.js */
const manualCaseAutomationMap = [
  {
    manualId: 'TC01',
    title: 'Standard user logs in successfully',
    automate: 'Yes',
    automatedTestName: 'TC01 standard user logs in and sees products',
  },
  {
    manualId: 'TC02',
    title: 'Login blocked for locked-out user',
    automate: 'Yes',
    automatedTestName: 'TC02 locked-out user sees lockout error',
  },
  {
    manualId: 'TC03',
    title: 'Invalid username or password rejected',
    automate: 'Yes',
    automatedTestName: 'TC03 invalid password shows credential error',
  },
  {
    manualId: 'TC06',
    title: 'Sort products by name A to Z',
    automate: 'Yes',
    automatedTestName: 'TC06 sort by name A to Z orders full product list',
  },
  {
    manualId: 'TC07',
    title: 'Sort products by price low to high (full list)',
    automate: 'Yes',
    automatedTestName: 'TC07 sort by price low to high orders full price list',
  },
  {
    manualId: 'TC08',
    title: 'Sort products by name Z to A',
    automate: 'Yes',
    automatedTestName: 'TC08 sort by name Z to A orders full product list',
  },
  {
    manualId: 'TC09',
    title: 'Sort products by price high to low',
    automate: 'Yes',
    automatedTestName: 'TC09 sort by price high to low orders full price list',
  },
  {
    manualId: 'TC10',
    title: 'Add single product; cart badge updates',
    automate: 'Yes',
    automatedTestName: 'TC10 add one product updates cart badge to 1',
  },
  {
    manualId: 'TC11',
    title: 'Add two items, remove one from products page',
    automate: 'Yes',
    automatedTestName: 'TC11 add two products remove one updates badge and cart contents',
  },
  {
    manualId: 'TC14',
    title: 'Complete checkout – totals and empty cart',
    automate: 'Yes',
    automatedTestName: 'TC14 complete checkout validates totals and empties cart',
  },
  {
    manualId: 'TC15',
    title: 'Required checkout fields missing (parameterized)',
    automate: 'Yes',
    automatedTestName: 'TC15 checkout required field validation',
  },
  {
    manualId: 'TC18',
    title: 'Open inventory URL after logout / without session',
    automate: 'Yes',
    automatedTestName: 'TC18 guest cannot open inventory after logout or without session',
  },
];

module.exports = { manualCaseAutomationMap };

/** A1 manual case ID → automation status (specs added in a follow-up commit). */
const manualCaseAutomationMap = [
  {
    manualId: 'TC01',
    title: 'Standard user logs in successfully',
    automate: 'Yes',
    automatedTestName: 'TC01 — pending',
  },
  {
    manualId: 'TC02',
    title: 'Login blocked for locked-out user',
    automate: 'Yes',
    automatedTestName: 'TC02 — pending',
  },
  {
    manualId: 'TC03',
    title: 'Invalid username or password rejected',
    automate: 'Yes',
    automatedTestName: 'TC03 — pending',
  },
  {
    manualId: 'TC06',
    title: 'Sort products by name A to Z',
    automate: 'Yes',
    automatedTestName: 'TC06 — pending',
  },
  {
    manualId: 'TC07',
    title: 'Sort products by price low to high (full list)',
    automate: 'Yes',
    automatedTestName: 'TC07 — pending',
  },
  {
    manualId: 'TC08',
    title: 'Sort products by name Z to A',
    automate: 'Yes',
    automatedTestName: 'TC08 — pending',
  },
  {
    manualId: 'TC09',
    title: 'Sort products by price high to low',
    automate: 'Yes',
    automatedTestName: 'TC09 — pending',
  },
  {
    manualId: 'TC10',
    title: 'Add single product; cart badge updates',
    automate: 'Yes',
    automatedTestName: 'TC10 — pending',
  },
  {
    manualId: 'TC11',
    title: 'Add two items, remove one from products page',
    automate: 'Yes',
    automatedTestName: 'TC11 — pending',
  },
  {
    manualId: 'TC14',
    title: 'Complete checkout – totals and empty cart',
    automate: 'Yes',
    automatedTestName: 'TC14 — pending',
  },
  {
    manualId: 'TC15',
    title: 'Required checkout fields missing (parameterized)',
    automate: 'Yes',
    automatedTestName: 'TC15 — pending',
  },
  {
    manualId: 'TC18',
    title: 'Open inventory URL after logout / without session',
    automate: 'Yes',
    automatedTestName: 'TC18 — pending',
  },
];

module.exports = { manualCaseAutomationMap };

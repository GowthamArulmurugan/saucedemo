export interface CheckoutCustomer {
  firstName: string;
  lastName: string;
  postalCode: string;
}

export const checkoutCustomers = {
  valid: {
    firstName: 'Gowtham',
    lastName: 'A',
    postalCode: '600001',
  },
  missingFirstName: {
    firstName: '',
    lastName: 'User',
    postalCode: '600001',
  },
  missingLastName: {
    firstName: 'Test',
    lastName: '',
    postalCode: '600001',
  },
  missingPostalCode: {
    firstName: 'Test',
    lastName: 'User',
    postalCode: '',
  },
} as const satisfies Record<string, CheckoutCustomer>;

export const checkoutValidationMessages = {
  firstName: 'Error: First Name is required',
  lastName: 'Error: Last Name is required',
  postalCode: 'Error: Postal Code is required',
} as const;

export const lockedOutLoginMessage =
  'Epic sadface: Sorry, this user has been locked out.';

export const invalidLoginMessage =
  'Epic sadface: Username and password do not match any user in this service';

export const orderCompleteHeader = 'Thank you for your order!';

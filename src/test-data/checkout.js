const checkoutCustomers = {
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
};

const checkoutValidationMessages = {
  firstName: 'Error: First Name is required',
  lastName: 'Error: Last Name is required',
  postalCode: 'Error: Postal Code is required',
};

const lockedOutLoginMessage =
  'Epic sadface: Sorry, this user has been locked out.';

const invalidLoginMessage =
  'Epic sadface: Username and password do not match any user in this service';

const orderCompleteHeader = 'Thank you for your order!';

module.exports = {
  checkoutCustomers,
  checkoutValidationMessages,
  lockedOutLoginMessage,
  invalidLoginMessage,
  orderCompleteHeader,
};

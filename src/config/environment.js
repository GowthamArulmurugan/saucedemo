const { users } = require('../test-data/users');

/** Runtime configuration from environment variables (no hard-coded URLs in tests). */
const env = {
  baseURL: process.env.BASE_URL ?? 'https://www.saucedemo.com',
  headed: (process.env.HEADED ?? 'true').toLowerCase() === 'true',
  standardUser: process.env.SAUCE_STANDARD_USER ?? users.standard.username,
  password: process.env.SAUCE_PASSWORD ?? users.standard.password,
};

module.exports = { env };

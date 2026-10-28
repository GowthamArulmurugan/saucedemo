import { users } from '../test-data/users';

/**
 * Runtime configuration from environment variables.
 * Tests must not hard-code base URL or credentials.
 */
export const env = {
  baseURL: process.env.BASE_URL ?? 'https://www.saucedemo.com',
  headed: (process.env.HEADED ?? 'true').toLowerCase() === 'true',
  standardUser: process.env.SAUCE_STANDARD_USER ?? users.standard.username,
  password: process.env.SAUCE_PASSWORD ?? users.standard.password,
} as const;

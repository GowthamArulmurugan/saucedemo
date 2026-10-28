const sharedPassword = 'secret_sauce';

/** Test users listed on the Sauce Demo login page. */
const users = {
  standard: {
    key: 'standard',
    username: 'standard_user',
    password: sharedPassword,
    description: 'Happy-path registered customer',
  },
  lockedOut: {
    key: 'lockedOut',
    username: 'locked_out_user',
    password: sharedPassword,
    description: 'Account locked — login must fail',
  },
  problem: {
    key: 'problem',
    username: 'problem_user',
    password: sharedPassword,
    description: 'Known cart/checkout data issues (exploratory persona)',
  },
  performanceGlitch: {
    key: 'performanceGlitch',
    username: 'performance_glitch_user',
    password: sharedPassword,
    description: 'Simulated slow responses',
  },
  error: {
    key: 'error',
    username: 'error_user',
    password: sharedPassword,
    description: 'Simulated service errors',
  },
  visual: {
    key: 'visual',
    username: 'visual_user',
    password: sharedPassword,
    description: 'Visual regression demo user',
  },
};

const invalidCredentials = {
  username: users.standard.username,
  password: 'wrong_password',
};

module.exports = { users, invalidCredentials };

export const environment = {
  production: false,
  /**
   * Base API URL for local or staging server
   * Example: http://localhost:3000/api OR https://staging.policyplanner.com/api
   */
  // apiBaseUrl: 'http://localhost:3000/api',
  // apiBaseUrl: 'http://localhost:1202',
  apiBaseUrl: 'https://policyplanner.com/health-insurance/',

  /**
   * Optional: you can add other global configs here if needed
   * e.g., timeout, logging flag, feature toggles, etc.
   */
  requestTimeout: 30000, // 30 seconds
  enableDebugLogs: true
};

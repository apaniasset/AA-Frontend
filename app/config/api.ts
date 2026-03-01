// API Configuration
export const API_CONFIG = {
  BASE_URL: 'https://apaniasset.com/api',
  TIMEOUT: 30000, // 30 seconds
};

export const API_ENDPOINTS = {
  // Admin
  ADMIN_USERS_CREATE: '/admin/users/create',
  ADMIN_LOGIN: '/admin/login',

  // Merchant
  MERCHANT_REGISTER: '/merchant/register',
  MERCHANT_LOGIN: '/merchant/login',
  MERCHANT_FORGOT_PASSWORD: '/merchant/forgot-password',
  MERCHANT_SEND_OTP: '/merchant/send-otp',
  MERCHANT_VERIFY_OTP: '/merchant/verify-otp',

  // User
  USER_REGISTER: '/user/register',
  USER_LOGIN: '/user/login',
  USER_FORGOT_PASSWORD: '/user/forgot-password',

  // Properties
  PROPERTIES_STORE: '/properties/store',
  PROPERTIES_LIST: '/properties/list',
  PROPERTIES_SHOW: '/properties/show',

  // Master Data
  STATE_LIST: '/state/list',
  CITY_LIST: '/city/list',
  AREA_LIST: '/area/list',
};

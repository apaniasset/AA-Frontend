// API Configuration
export const API_CONFIG = {
  BASE_URL: 'https://nodeapi.apaniasset.in/api',
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

  // Merchant OTP (registration)
  MERCHANT_SEND_OTP_REGISTRATION: '/merchant/send-otp',
  MERCHANT_VERIFY_OTP_REGISTRATION: '/merchant/verify-otp-registration',

  // User
  USER_REGISTER: '/user/register',
  USER_LOGIN: '/user/login',
  USER_FORGOT_PASSWORD: '/user/forgot-password',
};

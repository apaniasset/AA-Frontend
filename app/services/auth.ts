import { post } from './api';
import { API_ENDPOINTS } from '../config/api';
import type { ApiResponse } from './api';

export type MerchantRegisterPayload = {
  name: string;
  phone: string;
  email: string;
  password: string;
  confirm_password: string;
  company_name?: string;
  referral_code?: string;
};

export async function merchantRegister(
  body: MerchantRegisterPayload
): Promise<ApiResponse<{ merchant?: unknown; token?: string; [key: string]: unknown }>> {
  return post(API_ENDPOINTS.MERCHANT_REGISTER, body);
}

export async function merchantSendOtpRegistration(body: {
  phone: string;
}): Promise<ApiResponse<{ otp?: string; [key: string]: unknown }>> {
  return post(API_ENDPOINTS.MERCHANT_SEND_OTP_REGISTRATION, body);
}

export async function merchantVerifyOtpRegistration(body: {
  phone: string;
  otp: string;
}): Promise<ApiResponse<unknown>> {
  return post(API_ENDPOINTS.MERCHANT_VERIFY_OTP_REGISTRATION, body);
}

export const merchantSendOtp = merchantSendOtpRegistration;
export const merchantVerifyOtp = merchantVerifyOtpRegistration;

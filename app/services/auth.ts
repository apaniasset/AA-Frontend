import { post } from './api';
import { API_ENDPOINTS } from '../config/api';
import { ApiResponse } from './api';

// ===== Admin user creation =====

export interface CreateUserRequest {
  name: string;
  email: string;
  phone: string;
  password: string;
  role: string; // 'merchant' | 'staff' | 'admin'
}

export interface CreateUserResponse {
  id: number;
}

export async function createUser(
  data: CreateUserRequest
): Promise<ApiResponse<CreateUserResponse>> {
  return post<CreateUserResponse>(API_ENDPOINTS.ADMIN_USERS_CREATE, data);
}

// ===== Merchant auth =====

export interface MerchantRegisterRequest {
  name: string;
  phone: string;
  email: string;
  company_name: string;
  password: string;
  confirm_password: string;
  referral_code?: string;
}

export interface MerchantData {
  id: number;
  name: string;
  email: string;
  phone: string;
  company_name: string;
  referred_by: string | null;
  referrer_code: string | null;
}

export interface MerchantRegisterResponse {
  merchant: MerchantData;
  token: string;
}

export interface LoginRequest {
  identifier: string; // email or phone
  password: string;
}

export interface LoginResponse {
  merchant: MerchantData;
  token: string;
}

export interface MerchantSendOtpRequest {
  phone: string;
}

export interface MerchantSendOtpResponse {
  otp?: string;
}

export async function merchantRegister(
  data: MerchantRegisterRequest
): Promise<ApiResponse<MerchantRegisterResponse>> {
  return post<MerchantRegisterResponse>(API_ENDPOINTS.MERCHANT_REGISTER, data);
}

export async function merchantLogin(
  data: LoginRequest
): Promise<ApiResponse<LoginResponse>> {
  return post<LoginResponse>(API_ENDPOINTS.MERCHANT_LOGIN, data);
}

export async function merchantSendOtp(
  data: MerchantSendOtpRequest
): Promise<ApiResponse<MerchantSendOtpResponse>> {
  return post<MerchantSendOtpResponse>(API_ENDPOINTS.MERCHANT_SEND_OTP, data);
}

// ===== User auth (buyers) =====

export interface UserRegisterRequest {
  name: string;
  phone: string;
  email: string;
  password: string;
}

export interface UserData {
  id: number;
  name: string;
  email: string;
  phone: string;
  status: string;
}

export interface UserRegisterResponse {
  user: UserData;
  token: string;
}

export async function userRegister(
  data: UserRegisterRequest
): Promise<ApiResponse<UserRegisterResponse>> {
  return post<UserRegisterResponse>(API_ENDPOINTS.USER_REGISTER, data);
}

export interface UserForgotPasswordRequest {
  identifier: string; // phone or email
}

export interface UserForgotPasswordResponse {
  otp: string;
}

export async function userForgotPassword(
  data: UserForgotPasswordRequest
): Promise<ApiResponse<UserForgotPasswordResponse>> {
  return post<UserForgotPasswordResponse>(
    API_ENDPOINTS.USER_FORGOT_PASSWORD,
    data
  );
}


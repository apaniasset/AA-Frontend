import { post } from './api';
import { API_ENDPOINTS } from '../config/api';
import { ApiResponse } from './api';

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

export interface MerchantRegisterRequest {
  name: string;
  phone: string;
  email: string;
  company_name: string;
  password: string;
  confirm_password: string;
  referral_code?: string; // Optional
}

export interface MerchantRegisterResponse {
  merchant: MerchantData;
  token: string;
}

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

export interface LoginRequest {
  identifier: string; // Can be email or phone
  password: string;
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

export interface LoginResponse {
  merchant: MerchantData;
  token: string;
}

/**
 * Create a new user (Admin endpoint)
 * POST /admin/users/create
 */
export async function createUser(
  data: CreateUserRequest
): Promise<ApiResponse<CreateUserResponse>> {
  return post<CreateUserResponse>(API_ENDPOINTS.ADMIN_USERS_CREATE, data);
}

/**
 * Merchant registration
 * POST /merchant/register
 */
export async function merchantRegister(
  data: MerchantRegisterRequest
): Promise<ApiResponse<MerchantRegisterResponse>> {
  return post<MerchantRegisterResponse>(API_ENDPOINTS.MERCHANT_REGISTER, data);
}

/**
 * Merchant login
 * POST /merchant/login
 */
export async function merchantLogin(
  data: LoginRequest
): Promise<ApiResponse<LoginResponse>> {
  return post<LoginResponse>(API_ENDPOINTS.MERCHANT_LOGIN, data);
}

/**
 * User registration
 * POST /user/register
 */
export async function userRegister(
  data: UserRegisterRequest
): Promise<ApiResponse<UserRegisterResponse>> {
  return post<UserRegisterResponse>(API_ENDPOINTS.USER_REGISTER, data);
}

export interface UserForgotPasswordRequest {
  identifier: string; // Phone number or email
}

export interface UserForgotPasswordResponse {
  otp: string;
}

/**
 * User forgot password
 * POST /user/forgot-password
 */
export async function userForgotPassword(
  data: UserForgotPasswordRequest
): Promise<ApiResponse<UserForgotPasswordResponse>> {
  return post<UserForgotPasswordResponse>(API_ENDPOINTS.USER_FORGOT_PASSWORD, data);
}

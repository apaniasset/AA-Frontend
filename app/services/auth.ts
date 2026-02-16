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

/**
 * Create a new user (Admin endpoint)
 * POST /admin/users/create
 */
export async function createUser(
  data: CreateUserRequest
): Promise<ApiResponse<CreateUserResponse>> {
  return post<CreateUserResponse>(API_ENDPOINTS.ADMIN_USERS_CREATE, data);
}

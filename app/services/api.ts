import { API_CONFIG } from '../config/api';

export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}

export interface ApiError {
  message: string;
  status?: number;
  data?: any;
}

/**
 * Generic API request function
 */
async function apiRequest<T = any>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  const url = `${API_CONFIG.BASE_URL}${endpoint}`;

  const defaultHeaders: HeadersInit = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  };

  const config: RequestInit = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
    timeout: API_CONFIG.TIMEOUT,
  };

  try {
    const response = await fetch(url, config);

    // Parse response
    let responseData: any;
    const contentType = response.headers.get('content-type');
    
    if (contentType && contentType.includes('application/json')) {
      responseData = await response.json();
    } else {
      responseData = await response.text();
    }

    // Handle non-OK responses
    if (!response.ok) {
      const error: ApiError = {
        message: responseData?.message || responseData?.error || `HTTP ${response.status}: ${response.statusText}`,
        status: response.status,
        data: responseData,
      };
      throw error;
    }

    // Return successful response
    return {
      success: true,
      message: responseData?.message || 'Success',
      data: responseData?.data || responseData,
    };
  } catch (error: any) {
    // Handle network errors or other exceptions
    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      throw {
        message: 'Network error. Please check your internet connection.',
        status: 0,
      } as ApiError;
    }

    // Re-throw API errors
    throw error;
  }
}

/**
 * POST request helper
 */
export async function post<T = any>(
  endpoint: string,
  data: any,
  headers?: HeadersInit
): Promise<ApiResponse<T>> {
  return apiRequest<T>(endpoint, {
    method: 'POST',
    body: JSON.stringify(data),
    headers,
  });
}

/**
 * GET request helper
 */
export async function get<T = any>(
  endpoint: string,
  headers?: HeadersInit
): Promise<ApiResponse<T>> {
  return apiRequest<T>(endpoint, {
    method: 'GET',
    headers,
  });
}

/**
 * PUT request helper
 */
export async function put<T = any>(
  endpoint: string,
  data: any,
  headers?: HeadersInit
): Promise<ApiResponse<T>> {
  return apiRequest<T>(endpoint, {
    method: 'PUT',
    body: JSON.stringify(data),
    headers,
  });
}

/**
 * DELETE request helper
 */
export async function del<T = any>(
  endpoint: string,
  headers?: HeadersInit
): Promise<ApiResponse<T>> {
  return apiRequest<T>(endpoint, {
    method: 'DELETE',
    headers,
  });
}

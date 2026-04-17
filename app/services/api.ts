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
type ApiHeaders = Record<string, string>;
type ApiRequestConfig = RequestInit & { timeout?: number };
function isFormDataBody(body: unknown): body is FormData {
  // RN provides global FormData
  return typeof FormData !== 'undefined' && body instanceof FormData;
}

function stripContentTypeHeader(headers: ApiHeaders): void {
  for (const key of Object.keys(headers)) {
    if (key.toLowerCase() === 'content-type') {
      delete headers[key];
    }
  }
}

async function readFetchResponseAsApiResult<T>(response: Response): Promise<ApiResponse<T>> {
  const contentType = response.headers.get('content-type');
  let responseData: any;
  if (contentType && contentType.includes('application/json')) {
    responseData = await response.json();
  } else {
    responseData = await response.text();
  }

  if (!response.ok) {
    throw {
      message: responseData?.message || responseData?.error || `HTTP ${response.status}: ${response.statusText}`,
      status: response.status,
      data: responseData,
    } as ApiError;
  }

  return {
    success: true,
    message: responseData?.message || 'Success',
    data: responseData?.data || responseData,
  };
}

async function fetchMultipartOnce<T>(
  url: string,
  method: string,
  headers: ApiHeaders,
  body: FormData
): Promise<ApiResponse<T>> {
  const hdrs = { ...headers };
  stripContentTypeHeader(hdrs);
  const response = await fetch(url, { method, headers: hdrs, body });
  return readFetchResponseAsApiResult<T>(response);
}

/**
 * RN `fetch` + multipart often throws `Network request failed` on Android / New Arch while JSON works.
 * `XMLHttpRequest.send(FormData)` uses the legacy stack and usually uploads reliably.
 */
function xhrRequestFormData<T>(
  url: string,
  method: string,
  headers: ApiHeaders,
  body: FormData
): Promise<ApiResponse<T>> {
  const timeoutMs = API_CONFIG.FORM_UPLOAD_TIMEOUT_MS ?? API_CONFIG.TIMEOUT;

  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open(method, url, true);
    xhr.timeout = timeoutMs;

    const hdrs = { ...headers };
    stripContentTypeHeader(hdrs);
    Object.entries(hdrs).forEach(([k, v]) => {
      if (v != null && v !== '') {
        try {
          xhr.setRequestHeader(k, String(v));
        } catch {
          /* ignore invalid header names */
        }
      }
    });

    xhr.onload = () => {
      const ct = xhr.getResponseHeader('content-type') || '';
      let responseData: any;
      try {
        if (ct.includes('application/json')) {
          responseData = JSON.parse(xhr.responseText || '{}');
        } else {
          responseData = xhr.responseText;
        }
      } catch {
        responseData = xhr.responseText;
      }

      if (xhr.status < 200 || xhr.status >= 300) {
        reject({
          message:
            (typeof responseData === 'object' && responseData?.message) ||
            responseData?.error ||
            `HTTP ${xhr.status}: ${xhr.statusText || 'Error'}`,
          status: xhr.status,
          data: responseData,
        } as ApiError);
        return;
      }

      resolve({
        success: true,
        message: responseData?.message || 'Success',
        data: responseData?.data || responseData,
      });
    };

    xhr.onerror = () => {
      if (__DEV__) {
        console.warn('[api] XHR multipart failed — one fetch retry', url);
      }
      fetchMultipartOnce<T>(url, method, hdrs, body)
        .then(resolve)
        .catch((e: any) => {
          if (__DEV__) {
            console.warn('[api] fetch multipart retry failed', e?.message ?? e);
          }
          reject({
            message: 'Network error. Please check your internet connection.',
            status: 0,
          } as ApiError);
        });
    };

    xhr.ontimeout = () => {
      reject({
        message: 'Upload timed out. Try fewer or smaller photos.',
        status: 0,
      } as ApiError);
    };

    try {
      xhr.send(body);
    } catch (e: any) {
      reject({
        message: e?.message || 'Could not start upload.',
        status: 0,
      } as ApiError);
    }
  });
}

/** RN `fetch` often fails with `TypeError: Network request failed` (no "fetch" substring) — Postman still works (different TLS stack / no ATS). */
function isLikelyTransportFailure(error: unknown): boolean {
  if (error == null || typeof error !== 'object') return false;
  const e = error as { name?: string; message?: string; status?: number };
  if (typeof e.status === 'number' && e.status > 0) return false;
  const name = String(e.name ?? '');
  const msg = String(e.message ?? '').toLowerCase();
  if (name === 'TypeError' && (msg.includes('network request failed') || msg.includes('failed to fetch'))) {
    return true;
  }
  if (msg.includes('network request failed')) return true;
  return false;
}

async function apiRequest<T = any>(
  endpoint: string,
  options: ApiRequestConfig = {}
): Promise<ApiResponse<T>> {
  const url = `${API_CONFIG.BASE_URL}${endpoint}`;

  const defaultHeaders: ApiHeaders = {
    Accept: 'application/json',
  };

  const mergedHeaders: ApiHeaders = {
    ...defaultHeaders,
    ...(typeof options.headers === 'object' && !(options.headers instanceof Headers)
      ? (options.headers as ApiHeaders)
      : {}),
  };

  // Only set JSON Content-Type when we are not sending FormData and caller didn't set it.
  const hasContentType = Object.keys(mergedHeaders).some(
    (k) => k.toLowerCase() === 'content-type'
  );
  if (!hasContentType && !isFormDataBody(options.body)) {
    mergedHeaders['Content-Type'] = 'application/json';
  }

  if (isFormDataBody(options.body)) {
    stripContentTypeHeader(mergedHeaders);
    const method = (options.method as string | undefined) || 'POST';
    if (__DEV__) {
      console.warn('[api] multipart body → using XHR', url, method);
    }
    return xhrRequestFormData<T>(url, method, mergedHeaders, options.body);
  }

  const config: ApiRequestConfig = {
    ...options,
    headers: mergedHeaders,
    timeout: API_CONFIG.TIMEOUT,
  };

  try {
    const response = await fetch(url, config as RequestInit);
    return await readFetchResponseAsApiResult<T>(response);
  } catch (error: any) {
    if (__DEV__) {
      console.warn('[api] request failed', url, {
        name: error?.name,
        message: error?.message,
        status: error?.status,
        bodyIsForm: isFormDataBody(options.body),
      });
    }
    if (isLikelyTransportFailure(error)) {
      if (__DEV__) {
        console.warn(
          '[api] transport failure (Postman can still work: different TLS client, or Postman hitting another host). Compare URL with app/config api.ts BASE_URL.'
        );
      }
      throw {
        message: 'Network error. Please check your internet connection.',
        status: 0,
      } as ApiError;
    }

    throw error;
  }
}

/**
 * POST request helper
 */
export async function post<T = any>(
  endpoint: string,
  data: any,
  headers?: ApiHeaders
): Promise<ApiResponse<T>> {
  const body = isFormDataBody(data) ? data : JSON.stringify(data);
  return apiRequest<T>(endpoint, {
    method: 'POST',
    body,
    headers,
  });
}

/**
 * GET request helper
 */
export async function get<T = any>(
  endpoint: string,
  headers?: ApiHeaders
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
  headers?: ApiHeaders
): Promise<ApiResponse<T>> {
  const body = isFormDataBody(data) ? data : JSON.stringify(data);
  return apiRequest<T>(endpoint, {
    method: 'PUT',
    body,
    headers,
  });
}

/**
 * DELETE request helper
 */
export async function del<T = any>(
  endpoint: string,
  headers?: ApiHeaders
): Promise<ApiResponse<T>> {
  return apiRequest<T>(endpoint, {
    method: 'DELETE',
    headers,
  });
}

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
 * RN 0.83 New Architecture breaks XHR/fetch multipart file-part bridging for file:// URIs.
 * Fix: fetch each file:// URI locally to get a real Blob, rebuild FormData with Blob entries,
 * then dispatch via XHR. This bypasses the broken New Arch file-bridge layer.
 */
async function resolveFormDataFileBlobs(body: FormData): Promise<FormData> {
  // FormData._parts is a RN-specific internal structure: [key, value][].
  // We need to iterate and replace file:// string objects with real Blobs.
  const parts: [string, any][] = (body as any)._parts ?? [];
  if (!parts.length) return body;

  const resolved = new FormData();
  for (const [key, value] of parts) {
    const isFilePart =
      value !== null &&
      typeof value === 'object' &&
      typeof value.uri === 'string' &&
      value.uri.length > 0;

    if (isFilePart) {
      const fileUri: string = value.uri;
      const mimeType: string = value.type || 'image/jpeg';
      const fileName: string = value.name || 'upload.jpg';
      try {
        // fetch(file://) works reliably on Android RN New Arch for local reading.
        const fileResponse = await fetch(fileUri);
        const blob = await fileResponse.blob();
        // Attach as proper Blob — RN New Arch FormData handles Blob correctly.
        resolved.append(key, blob, fileName);
        if (__DEV__) {
          console.warn('[api] resolved file blob', { key, fileName, size: blob.size, mimeType });
        }
      } catch (blobErr: any) {
        if (__DEV__) {
          console.warn('[api] blob resolve failed for', fileUri, blobErr?.message);
        }
        // Fall back to raw part so upload still attempts.
        resolved.append(key, value);
      }
    } else {
      resolved.append(key, value);
    }
  }
  return resolved;
}

/**
 * RN `fetch` + multipart often throws `Network request failed` on Android / New Arch while JSON works.
 * We pre-resolve file:// URI parts to real Blobs, then use XHR (with fetch fallback).
 */
function xhrSendFormData<T>(
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
        console.warn('[api] XHR onerror for', url);
      }
      reject({
        message: 'Upload failed. Please check your internet connection and try again.',
        status: 0,
      } as ApiError);
    };

    xhr.upload.onerror = () => {
      if (__DEV__) {
        console.warn('[api] XHR upload.onerror for', url);
      }
      reject({
        message: 'Upload failed. Please check your internet connection and try again.',
        status: 0,
      } as ApiError);
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

async function xhrRequestFormData<T>(
  url: string,
  method: string,
  headers: ApiHeaders,
  body: FormData
): Promise<ApiResponse<T>> {
  // Step 1: pre-resolve all file:// URI parts → real Blobs (fixes RN 0.83 New Arch)
  let resolvedBody: FormData;
  try {
    resolvedBody = await resolveFormDataFileBlobs(body);
  } catch {
    resolvedBody = body;
  }
  // Step 2: send resolved FormData via XHR
  return xhrSendFormData<T>(url, method, headers, resolvedBody);
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
      console.warn('[api] multipart body → resolving blobs + XHR', url, method);
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

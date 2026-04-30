import { API_ENDPOINTS } from '../config/api';
import { loadAuth } from '../utils/authStorage';
import { ApiResponse, post } from './api';

export interface MasterLead {
  id: number;
  name?: string;
  phone?: string;
  created_at?: string;
  [key: string]: unknown;
}

export interface MasterLeadsListResponse {
  leads?: MasterLead[];
  list?: MasterLead[];
  data?: MasterLead[];
}

export interface UnlockLeadResponse {
  id?: number;
  phone?: string;
  lead?: MasterLead;
  [key: string]: unknown;
}

async function authHeaders(): Promise<Record<string, string>> {
  const auth = await loadAuth();
  const headers: Record<string, string> = {};
  if (auth?.token) {
    headers.Authorization = `Bearer ${auth.token}`;
  }
  return headers;
}

export async function getMasterLeadsList(
  payload: Record<string, unknown> = {}
): Promise<ApiResponse<MasterLeadsListResponse>> {
  return post<MasterLeadsListResponse>(
    API_ENDPOINTS.MERCHANT_MASTER_LEADS_LIST,
    payload,
    await authHeaders()
  );
}

export async function unlockMasterLead(
  lead_id: number
): Promise<ApiResponse<UnlockLeadResponse>> {
  return post<UnlockLeadResponse>(
    API_ENDPOINTS.MERCHANT_MASTER_LEADS_UNLOCK,
    { lead_id },
    await authHeaders()
  );
}

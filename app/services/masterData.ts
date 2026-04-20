import { get } from './api';
import { API_ENDPOINTS } from '../config/api';
import { ApiResponse } from './api';

export interface StateItem {
  id: number;
  country_id: number;
  state_name: string;
  state_code: string;
  state_type?: string;
  is_active?: number;
}

export interface CityItem {
  id: number;
  state_id: number;
  city_name: string;
  is_active?: number;
}

export interface AreaItem {
  id: number;
  city_id: number;
  area_name: string;
  pincode?: string;
  is_active?: number;
}

export async function getStates(): Promise<ApiResponse<StateItem[]>> {
  return get<StateItem[]>(API_ENDPOINTS.STATE_LIST);
}

/** Get cities. Optionally pass stateId to fetch cities for that state (if backend supports ?state_id=). */
export async function getCities(stateId?: number): Promise<ApiResponse<CityItem[]>> {
  const url = stateId != null ? `${API_ENDPOINTS.CITY_LIST}?state_id=${stateId}` : API_ENDPOINTS.CITY_LIST;
  return get<CityItem[]>(url);
}

/** Get areas for a city. Pass city_id as query param. */
export async function getAreas(cityId: number): Promise<ApiResponse<AreaItem[]>> {
  const url = `${API_ENDPOINTS.AREA_LIST}?city_id=${cityId}`;
  return get<AreaItem[]>(url);
}

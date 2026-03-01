import { post, get } from './api';
import { API_ENDPOINTS } from '../config/api';
import { ApiResponse } from './api';
import { loadAuth } from '../utils/authStorage';

/**
 * Request body for POST /properties/store (property posting API)
 */
export interface PropertyStoreRequest {
  title: string;
  listing_type: string;
  property_segment: string;
  property_type: string;
  description: string;
  address: string;
  address_line2?: string;
  landmark?: string;
  city: number;
  state: number;
  zip_code: string;
  location?: string;
  sale_price?: number;
  rent_price?: number;
  security_deposit?: number;
  maintenance?: number;
  price_negotiable?: number;
  rent_negotiable?: number;
  maintenance_included?: number;
  bedrooms?: number;
  bathrooms?: number;
  balconies?: number;
  floor_number?: number;
  total_floors?: number;
  furnishing_status?: string;
  facing?: string;
  property_age?: string;
  construction_status?: string;
  carpet_area?: number;
  area_sqft?: number;
  area?: number;
  land_area?: number;
  no_brokerage?: number;
  video_url?: string;
  property_id_custom?: string;
  nearby_areas?: string[];
  amenity?: string[];
  rera_number?: string;
  possession_date?: string;
  construction_start_date?: string;
  plot_length?: number;
  plot_breadth?: number;
  corner_plot?: number;
  fencing_done?: number;
  pg_type?: string;
  total_beds?: number;
  available_beds?: number;
  room_type?: string;
  food_facility?: number;
  preferred_tenants?: string;
  gate_closing_time?: string;
  laundry?: number;
  wifi?: number;
  cabins?: number;
  workstations?: number;
  washrooms_private?: number;
  washrooms_shared?: number;
  loading_dock?: number;
  lock_in_period?: number;
  ceiling_height?: number;
  suitable_for?: string;
  frontage_width?: number;
  visibility_type?: string;
  truck_entry?: number;
  road_width?: number;
  covered_area?: number;
  soil_type?: string;
  water_source?: string;
  road_access?: number;
  distance_from_highway?: number;
  land_type?: string;
  authority_approved?: string;
  approved_by?: string;
  na_plot?: number;
  encumbrance_free?: number;
  private_garden?: number;
  servant_room?: number;
  store_room?: number;
}

/**
 * Created property as returned by POST /properties/store (data object)
 */
export interface CreatedProperty {
  id: number;
  merchant_id: number;
  admin_id: number | null;
  user_id: number | null;
  status: string;
  property_id: string;
  property_id_custom: string | null;
  title: string;
  description: string;
  listing_type: string;
  property_main_type: string;
  property_segment: string;
  address_line1: string;
  city_id: number;
  locality_id: number | null;
  pincode: string;
  address_line2: string | null;
  landmark: string | null;
  state_id: number;
  location: string | null;
  nearby_area: string | null;
  sale_price: number | null;
  rent_price: number | null;
  security_deposit: number | null;
  maintenance: number | null;
  price_negotiable: number | null;
  rent_negotiable: number | null;
  maintenance_included: number | null;
  bedrooms: number | null;
  bathrooms: number | null;
  balconies: number | null;
  floor_no: number | null;
  floors_total: number | null;
  furnishing_status: string | null;
  facing: string | null;
  age_of_property: string | null;
  property_age: string | null;
  possession_status: string | null;
  rera_number: string | null;
  construction_start_date: string | null;
  possession_date: string | null;
  no_brokerage: number | null;
  carpet_area: number | null;
  area_sqft: number | null;
  built_up_area: number | null;
  land_area: number | null;
  plot_length: number | null;
  plot_breadth: number | null;
  corner_plot: number | null;
  fencing_done: number | null;
  pg_type: string | null;
  total_beds: number | null;
  available_beds: number | null;
  room_type: string | null;
  preferred_tenants: string | null;
  food_facility: number | null;
  gate_closing_time: string | null;
  laundry: number | null;
  wifi: number | null;
  cabins: number | null;
  workstations: number | null;
  washrooms_private: number | null;
  washrooms_shared: number | null;
  loading_dock: number | null;
  lock_in_period: number | null;
  ceiling_height: number | null;
  suitable_for: string | null;
  frontage_width: number | null;
  visibility_type: string | null;
  truck_entry: number | null;
  road_width: number | null;
  covered_area: number | null;
  soil_type: string | null;
  water_source: string | null;
  road_access: number | null;
  distance_from_highway: number | null;
  land_type: string | null;
  authority_approved: string | null;
  approved_by: string | null;
  na_plot: number | null;
  encumbrance_free: number | null;
  private_garden: number | null;
  servant_room: number | null;
  store_room: number | null;
  video_url: string | null;
  amenities: string | null;
  images?: unknown[];
  created_at: string;
  updated_at: string;
}

/**
 * Call POST /properties/store to create a new property.
 * Uses the stored merchant token for Authorization.
 * Returns the created property on success (201).
 */
export async function storeProperty(
  data: PropertyStoreRequest
): Promise<ApiResponse<CreatedProperty>> {
  const auth = await loadAuth();
  const headers: Record<string, string> = {};
  if (auth?.token) {
    headers.Authorization = `Bearer ${auth.token}`;
  }
  return post<CreatedProperty>(API_ENDPOINTS.PROPERTIES_STORE, data, headers);
}

/** Single property item in list API response */
export interface PropertyListItem {
  id: number;
  property_id: string | null;
  title: string | null;
  listing_type: string | null;
  property_segment: string | null;
  sale_price: string | null;
  rent_price: string | null;
  city: string | null;
  state: string | null;
  area: string | null;
  pincode: string | null;
  status: string;
  address_line1: string | null;
  carpet_area: number | null;
  built_up_area: number | null;
  images?: { id: number; property_id: number; image_url: string; is_primary: number }[];
  [key: string]: unknown;
}

/** Paginated list response from GET /properties/list */
export interface PropertiesListResponse {
  current_page: number;
  data: PropertyListItem[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
}

/**
 * Call GET /properties/list to fetch properties (paginated).
 * Uses stored merchant token for Authorization when available.
 */
export async function getPropertiesList(
  page: number = 1
): Promise<ApiResponse<PropertiesListResponse>> {
  const auth = await loadAuth();
  const headers: Record<string, string> = {};
  if (auth?.token) {
    headers.Authorization = `Bearer ${auth.token}`;
  }
  const url = page > 1 ? `${API_ENDPOINTS.PROPERTIES_LIST}?page=${page}` : API_ENDPOINTS.PROPERTIES_LIST;
  return get<PropertiesListResponse>(url, headers);
}

/** Full property details from POST /properties/show */
export interface PropertyDetailData {
  id: number;
  property_id: string | null;
  title: string | null;
  description: string | null;
  listing_type: string | null;
  property_segment: string | null;
  sale_price: string | null;
  rent_price: string | null;
  city_id: number | null;
  locality_id: number | null;
  city: string | null;
  state: string | null;
  area: string | null;
  pincode: string | null;
  address_line1: string | null;
  address_line2: string | null;
  landmark: string | null;
  carpet_area: number | null;
  built_up_area: number | null;
  bedrooms: number | null;
  bathrooms: number | null;
  balconies: number | null;
  furnishing_status: string | null;
  facing: string | null;
  possession_status: string | null;
  age_of_property: string | null;
  floor_no: number | null;
  floors_total: number | null;
  amenities: string | null;
  status: string;
  images?: { id: number; property_id: number; image_url: string; is_primary: number }[];
  merchant?: Record<string, unknown>;
  [key: string]: unknown;
}

/**
 * Call POST /properties/show with body { id } to fetch full property details.
 * Uses stored merchant token for Authorization when available.
 */
export async function getPropertyDetails(
  id: number
): Promise<ApiResponse<PropertyDetailData>> {
  const auth = await loadAuth();
  const headers: Record<string, string> = {};
  if (auth?.token) {
    headers.Authorization = `Bearer ${auth.token}`;
  }
  return post<PropertyDetailData>(API_ENDPOINTS.PROPERTIES_SHOW, { id }, headers);
}

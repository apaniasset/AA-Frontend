import { post, get } from './api';
import { API_ENDPOINTS } from '../config/api';
import { ApiResponse } from './api';
import { loadAuth } from '../utils/authStorage';

/** When the UI does not ask for country yet — matches typical Postman `country: 1`. */
export const DEFAULT_PROPERTY_COUNTRY_ID = 1;

/**
 * Request body for POST /properties/store (property posting API).
 * Field names align with working Postman `multipart/form-data` (e.g. `property_type_id`, `neighborhood`, `amenity_ids[]`, `images[]`).
 */
export interface PropertyStoreRequest {
  title: string;
  listing_type: string;
  property_segment: string;
  /** Legacy string label; send together with `property_type_id` when API expects an ID. */
  property_type: string;
  /** Backend ID from `/property-type/list` (Postman: property_type_id). */
  property_type_id?: number;
  description: string;
  address: string;
  address_line2?: string;
  landmark?: string;
  country?: number;
  city: number;
  state: number;
  /** Postman: neighborhood (area / locality id). */
  neighborhood?: number;
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
  /** Some DB columns map from this key instead of `area`. */
  built_up_area?: number;
  land_area?: number;
  no_brokerage?: number;
  video_url?: string;
  property_id_custom?: string;
  /** Prefer sending as one comma-separated field (Postman style); see `appendPropertyStorePayload`. */
  nearby_areas?: string[];
  /** Legacy name-based chips — omit when `amenity_ids` is set. */
  amenity?: string[];
  /** Postman: amenity_ids[] numeric IDs. */
  amenity_ids?: number[];
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
  /** Postman may send text like `2km`. */
  distance_from_highway?: number | string;
  land_type?: string;
  authority_approved?: string;
  approved_by?: string;
  na_plot?: number;
  encumbrance_free?: number;
  private_garden?: number;
  servant_room?: number;
  store_room?: number;
  available_from?: string;
  agreement_duration?: string;
  notice_period?: string;
  electricity_charges?: string;
  water_charges?: string;
  ownership_type?: string;
  transaction_type?: string;
  flooring_type?: string;
}

/** Local image asset for multipart `images[]` on property create */
export type PropertyImageAsset = {
  uri: string;
  type?: string;
  fileName?: string;
};

/** RN `fetch` multipart needs a real URI scheme; bare `/data/...` paths often fail with `Network request failed`. */
function ensureMultipartFileUri(uri: string): string {
  const t = String(uri).trim();
  if (!t) return t;
  if (/^[a-zA-Z][a-zA-Z0-9+.-]*:/.test(t)) return t;
  if (t.startsWith('/')) return `file://${t}`;
  return t;
}

function safeUploadFileName(name: string, index: number): string {
  const raw = String(name || '').trim() || `property_${index}.jpg`;
  const base = raw.replace(/[^a-zA-Z0-9._-]+/g, '_') || `property_${index}.jpg`;
  if (base.length <= 120) return base;
  return `property_${index}.jpg`;
}

/** Same fields the wire request sends — omits `undefined` / `null` so DevTools logs match JSON/multipart reality. */
function propertyStorePayloadForLog(data: PropertyStoreRequest): Record<string, unknown> {
  return Object.fromEntries(
    (Object.entries(data) as [keyof PropertyStoreRequest, unknown][]).filter(
      ([, value]) => value !== undefined && value !== null
    )
  ) as Record<string, unknown>;
}

function appendPropertyStorePayload(form: FormData, data: PropertyStoreRequest) {
  (Object.entries(data) as [keyof PropertyStoreRequest, unknown][]).forEach(([key, value]) => {
    if (value === undefined || value === null) return;
    const k = String(key);

    if (k === 'amenity_ids' && Array.isArray(value)) {
      (value as number[]).forEach((id) => {
        if (id != null && Number.isFinite(Number(id))) {
          form.append('amenity_ids[]', String(id));
        }
      });
      return;
    }

    if (k === 'nearby_areas' && Array.isArray(value)) {
      const parts = (value as string[]).map((x) => String(x).trim()).filter(Boolean);
      if (parts.length) {
        form.append('nearby_areas', parts.join(', '));
      }
      return;
    }

    if (Array.isArray(value)) {
      (value as string[]).forEach((item) => {
        if (item != null && String(item).length > 0) {
          form.append(`${k}[]`, String(item));
        }
      });
      return;
    }
    form.append(k, String(value));
  });
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
  data: PropertyStoreRequest,
  imageAssets?: PropertyImageAsset[]
): Promise<ApiResponse<CreatedProperty>> {
  const auth = await loadAuth();
  const headers: Record<string, string> = {};
  if (auth?.token) {
    headers.Authorization = `Bearer ${auth.token}`;
  }

  const files = imageAssets?.filter((a) => a?.uri) ?? [];
  if (__DEV__) {
    console.warn('[properties/store] request', {
      endpoint: API_ENDPOINTS.PROPERTIES_STORE,
      mode: 'multipart/form-data',
      body: propertyStorePayloadForLog(data),
      imageCount: files.length,
      imageFormKeys: files.map(() => 'images[]'),
      images: files.map((f, i) => ({
        index: i,
        type: f.type,
        fileName: f.fileName,
        uriPreview:
          typeof f.uri === 'string'
            ? f.uri.length > 60
              ? `${f.uri.slice(0, 56)}…`
              : f.uri
            : f.uri,
      })),
    });
  }

  const form = new FormData();
  const payload: PropertyStoreRequest = { ...data };
  if (payload.amenity_ids?.length) {
    delete (payload as { amenity?: string[] }).amenity;
  }
  appendPropertyStorePayload(form, payload);

  files.forEach((asset, index) => {
    const part = {
      uri: ensureMultipartFileUri(asset.uri),
      type: asset.type || 'image/jpeg',
      name: safeUploadFileName(asset.fileName || `property_${index}.jpg`, index),
    } as any;
    // Backend / working Postman uses `images[]` per file (including a single upload).
    form.append('images[]', part);
  });
  const res = await post<CreatedProperty>(API_ENDPOINTS.PROPERTIES_STORE, form, headers);

  if (__DEV__) {
    console.warn('[properties/store] response', {
      success: res.success,
      message: res.message,
      error: res.error,
      data: res.data,
    });
  }
  return res;
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
  furnishing_status?: string | null;
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
 * Search/filter payload for POST /properties/list (matches backend applyFilters).
 */
export interface PropertyListFilters {
  search?: string;
  search_name?: string;
  type?: 'buy' | 'rent';
  listing_type?: string;
  property_main_type?: string;
  property_segment?: string;
  property_type_id?: number;
  city_id?: number;
  locality_id?: number;
  bedrooms?: number;
  min_price?: number;
  max_price?: number;
  furnishing_status?: string;
  possession_status?: string;
  owner_only?: 0 | 1;
  per_page?: number;
  page?: number;
}

/**
 * Call GET /all-properties to fetch properties (paginated).
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

/** Normalize list API payload: paginator `{ data: [] }` or raw `[]`. */
export function extractPropertyListItems(
  payload: PropertiesListResponse | PropertyListItem[] | null | undefined,
): PropertyListItem[] {
  if (payload == null) {
    return [];
  }
  if (Array.isArray(payload)) {
    return payload;
  }
  if (typeof payload === 'object' && Array.isArray(payload.data)) {
    return payload.data;
  }
  return [];
}

function buildAllPropertiesQuery(filters: PropertyListFilters): string {
  const params = new URLSearchParams();
  const set = (key: string, value: string | number | undefined | null) => {
    if (value === undefined || value === null || value === '') {
      return;
    }
    params.append(key, String(value));
  };
  set('search', filters.search);
  set('search_name', filters.search_name);
  set('type', filters.type);
  set('listing_type', filters.listing_type);
  set('property_main_type', filters.property_main_type);
  set('property_segment', filters.property_segment);
  if (filters.property_type_id != null) {
    set('property_type_id', filters.property_type_id);
  }
  if (filters.city_id != null) {
    set('city_id', filters.city_id);
  }
  if (filters.locality_id != null) {
    set('locality_id', filters.locality_id);
  }
  if (filters.bedrooms != null) {
    set('bedrooms', filters.bedrooms);
  }
  if (filters.min_price != null) {
    set('min_price', filters.min_price);
  }
  if (filters.max_price != null) {
    set('max_price', filters.max_price);
  }
  set('furnishing_status', filters.furnishing_status);
  set('possession_status', filters.possession_status);
  if (filters.owner_only != null) {
    set('owner_only', filters.owner_only);
  }
  if (filters.per_page != null) {
    set('per_page', filters.per_page);
  }
  if (filters.page != null) {
    set('page', filters.page);
  }
  const q = params.toString();
  return q ? `?${q}` : '';
}

/**
 * GET /all-properties with query filters (matches Postman / typical Laravel route).
 * Previously used POST + FormData; many backends only allow GET here, which left lists empty.
 */
export async function searchPropertiesList(
  filters: PropertyListFilters = {}
): Promise<ApiResponse<PropertiesListResponse>> {
  const auth = await loadAuth();
  const headers: Record<string, string> = {};
  if (auth?.token) {
    headers.Authorization = `Bearer ${auth.token}`;
  }
  const query = buildAllPropertiesQuery(filters);
  return get<PropertiesListResponse>(`${API_ENDPOINTS.PROPERTIES_LIST}${query}`, headers);
}

/** Property type from POST /property-type/list */
export interface PropertyTypeItem {
  id: number;
  name: string;
  is_active?: number;
  created_at?: string;
  updated_at?: string;
}

/**
 * Call POST /property-type/list to fetch property types (for filters / home chips).
 */
export async function getPropertyTypes(
  body?: { category?: number }
): Promise<ApiResponse<PropertyTypeItem[]>> {
  const auth = await loadAuth();
  const headers: Record<string, string> = {};
  if (auth?.token) {
    headers.Authorization = `Bearer ${auth.token}`;
  }
  return post<PropertyTypeItem[]>(API_ENDPOINTS.PROPERTY_TYPE_LIST, body ?? {}, headers);
}

/**
 * Call GET /user/properties to fetch the logged-in user's (merchant's) posted property list.
 * Uses stored merchant token for Authorization.
 * Handles both paginated { data: { data: [...] } } and direct { data: [...] } response shapes.
 */
export async function getUserProperties(
  page: number = 1
): Promise<ApiResponse<PropertiesListResponse | PropertyListItem[]>> {
  const auth = await loadAuth();
  const headers: Record<string, string> = {};
  if (auth?.token) {
    headers.Authorization = `Bearer ${auth.token}`;
  }
  const url = page > 1 ? `${API_ENDPOINTS.USER_PROPERTIES}?page=${page}` : API_ENDPOINTS.USER_PROPERTIES;
  return get<PropertiesListResponse | PropertyListItem[]>(url, headers);
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

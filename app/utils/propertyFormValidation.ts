/** Max lengths and validators for the add-property wizard */

export const PROPERTY_FIELD_MAX = {
  TITLE: 120,
  DESCRIPTION: 2000,
  ADDRESS: 500,
  ADDRESS_LINE2: 200,
  LANDMARK: 200,
  LOCATION: 300,
  PINCODE: 6,
  PRICE_DIGITS: 15,
  FLOOR_DIGITS: 3,
  AREA_DIGITS: 10,
  FACING: 40,
  CONSTRUCTION_STATUS: 80,
  NEARBY: 500,
  VIDEO_URL: 500,
  PROPERTY_ID_CUSTOM: 80,
  RERA: 64,
  DATE_INPUT: 10,
  SHORT_LABEL: 80,
  GATE_TIME: 12,
  NUMERIC_SMALL: 6,
} as const;

export function digitsOnly(value: string, maxLen: number): string {
  return value.replace(/\D/g, '').slice(0, maxLen);
}

export function clampLength(value: string, maxLen: number): string {
  return value.slice(0, maxLen);
}

/** India-style 6-digit pincode */
export function isIndianPincode(value: string): boolean {
  return /^\d{6}$/.test(value.trim());
}

/** Non-empty string must be YYYY-MM-DD and a real calendar date */
export function isIsoDateString(value: string): boolean {
  const t = value.trim();
  if (!/^\d{4}-\d{2}-\d{2}$/.test(t)) return false;
  const [y, m, d] = t.split('-').map((n) => parseInt(n, 10));
  if (m < 1 || m > 12 || d < 1 || d > 31) return false;
  const dt = new Date(t + 'T12:00:00');
  return !Number.isNaN(dt.getTime());
}

export function isValidOptionalHttpUrl(value: string): boolean {
  const t = value.trim();
  if (!t) return true;
  if (!/^https?:\/\//i.test(t)) return false;
  try {
    new URL(t);
    return true;
  } catch {
    return false;
  }
}

export type Step1FieldErrors = Partial<{ title: string; description: string }>;

export function getStep1FieldErrors(title: string, description: string): Step1FieldErrors {
  const e: Step1FieldErrors = {};
  const ti = title.trim();
  const de = description.trim();
  if (ti.length < 3) e.title = 'At least 3 characters required.';
  else if (ti.length > PROPERTY_FIELD_MAX.TITLE) e.title = `Maximum ${PROPERTY_FIELD_MAX.TITLE} characters.`;
  if (de.length < 10) e.description = 'At least 10 characters required.';
  else if (de.length > PROPERTY_FIELD_MAX.DESCRIPTION) e.description = `Maximum ${PROPERTY_FIELD_MAX.DESCRIPTION} characters.`;
  return e;
}

export type Step2FieldErrors = Partial<{
  address: string;
  locationStateCity: string;
  zipCode: string;
  area: string;
  salePrice: string;
  expectedRent: string;
  facing: string;
  constructionStatus: string;
}>;

export function getStep2FieldErrors(params: {
  address: string;
  stateId: number | null;
  cityId: number | null;
  zipCode: string;
  carpetArea: string;
  builtUpArea: string;
  listingType: string;
  salePrice: string;
  expectedRent: string;
  facing: string;
  constructionStatus: string;
}): Step2FieldErrors {
  const e: Step2FieldErrors = {};
  if (!params.address.trim()) e.address = 'Address is required.';
  else if (params.address.trim().length > PROPERTY_FIELD_MAX.ADDRESS) {
    e.address = `Maximum ${PROPERTY_FIELD_MAX.ADDRESS} characters.`;
  }
  if (params.stateId == null) e.locationStateCity = 'Please select state.';
  else if (params.cityId == null) e.locationStateCity = 'Please select city.';
  if (!isIndianPincode(params.zipCode)) e.zipCode = 'Enter exactly 6 digits.';
  const c = params.carpetArea.trim() ? parseInt(params.carpetArea.replace(/\D/g, ''), 10) : NaN;
  const b = params.builtUpArea.trim() ? parseInt(params.builtUpArea.replace(/\D/g, ''), 10) : NaN;
  if ((Number.isNaN(c) || c <= 0) && (Number.isNaN(b) || b <= 0)) {
    e.area = 'Enter carpet area and/or built-up area (at least one positive number).';
  }
  if (!params.facing.trim()) e.facing = 'Required (e.g. East, North-East).';
  else if (params.facing.trim().length > PROPERTY_FIELD_MAX.FACING) {
    e.facing = `Maximum ${PROPERTY_FIELD_MAX.FACING} characters.`;
  }
  if (!params.constructionStatus.trim()) e.constructionStatus = 'Required (e.g. Ready to Move).';
  else if (params.constructionStatus.trim().length > PROPERTY_FIELD_MAX.CONSTRUCTION_STATUS) {
    e.constructionStatus = `Maximum ${PROPERTY_FIELD_MAX.CONSTRUCTION_STATUS} characters.`;
  }
  const lt = params.listingType;
  if (lt === 'Sale') {
    const sp = params.salePrice.trim().replace(/\D/g, '');
    if (!sp || parseInt(sp, 10) <= 0) e.salePrice = 'Sale price is required (numbers only).';
  }
  if (lt === 'Rent' || lt === 'Paying Guest') {
    const er = params.expectedRent.trim().replace(/\D/g, '');
    if (!er || parseInt(er, 10) <= 0) e.expectedRent = 'Expected rent is required (numbers only).';
  }
  return e;
}

export type Step3FieldErrors = Partial<{
  videoUrl: string;
  possessionDate: string;
  constructionStartDate: string;
  gateClosingTime: string;
  banner: string;
}>;

export function getStep3FieldErrors(values: {
  videoUrl: string;
  possessionDate: string;
  constructionStartDate: string;
  gateClosingTime: string;
}): Pick<Step3FieldErrors, 'videoUrl' | 'possessionDate' | 'constructionStartDate' | 'gateClosingTime'> {
  const e: Pick<Step3FieldErrors, 'videoUrl' | 'possessionDate' | 'constructionStartDate' | 'gateClosingTime'> = {};
  if (!isValidOptionalHttpUrl(values.videoUrl)) e.videoUrl = 'Enter a valid http(s) URL or leave empty.';
  const p = values.possessionDate.trim();
  if (p && !isIsoDateString(p)) e.possessionDate = 'Use format YYYY-MM-DD.';
  const c = values.constructionStartDate.trim();
  if (c && !isIsoDateString(c)) e.constructionStartDate = 'Use format YYYY-MM-DD.';
  const gt = values.gateClosingTime.trim();
  if (gt && !/^\d{1,2}:\d{2}(:\d{2})?$/.test(gt)) e.gateClosingTime = 'Use HH:MM or HH:MM:SS (24-hour).';
  return e;
}

export function getStep3DraftBanner(draft: Record<string, unknown>): string | undefined {
  if (!draft.title || !draft.description || !draft.address || draft.city == null || draft.state == null || !draft.zip_code) {
    return 'Complete steps 1–2: title, description, address, state, city and pincode.';
  }
  if (!isIndianPincode(String(draft.zip_code))) {
    return 'Pincode must be 6 digits. Use Back and fix step 2.';
  }
  return undefined;
}

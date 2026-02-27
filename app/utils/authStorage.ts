import AsyncStorage from '@react-native-async-storage/async-storage';

const AUTH_STORAGE_KEY = '@aa_merchant_auth';

export interface StoredAuth {
  merchant: Record<string, unknown>;
  token: string;
}

export async function saveAuth(merchant: Record<string, unknown>, token: string): Promise<void> {
  const payload: StoredAuth = { merchant, token };
  await AsyncStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(payload));
}

export async function loadAuth(): Promise<StoredAuth | null> {
  try {
    const raw = await AsyncStorage.getItem(AUTH_STORAGE_KEY);
    if (!raw) return null;
    const data = JSON.parse(raw) as StoredAuth;
    if (data?.merchant && data?.token) return data;
    return null;
  } catch {
    return null;
  }
}

export async function clearAuth(): Promise<void> {
  await AsyncStorage.removeItem(AUTH_STORAGE_KEY);
}

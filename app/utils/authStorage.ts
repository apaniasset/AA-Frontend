import AsyncStorage from '@react-native-async-storage/async-storage';

const KEY_TOKEN = '@auth_token';
const KEY_MERCHANT = '@auth_merchant';

export async function saveAuth(merchant: Record<string, unknown>, token: string): Promise<void> {
  await AsyncStorage.setItem(KEY_TOKEN, token);
  await AsyncStorage.setItem(KEY_MERCHANT, JSON.stringify(merchant));
}

export async function loadAuth(): Promise<{
  token: string | null;
  merchant: Record<string, unknown> | null;
}> {
  const [token, raw] = await Promise.all([
    AsyncStorage.getItem(KEY_TOKEN),
    AsyncStorage.getItem(KEY_MERCHANT),
  ]);
  let merchant: Record<string, unknown> | null = null;
  if (raw) {
    try {
      merchant = JSON.parse(raw) as Record<string, unknown>;
    } catch {
      merchant = null;
    }
  }
  return { token, merchant };
}

export async function clearAuth(): Promise<void> {
  await AsyncStorage.removeItem(KEY_TOKEN);
  await AsyncStorage.removeItem(KEY_MERCHANT);
}

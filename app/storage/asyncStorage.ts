import AsyncStorage from "@react-native-async-storage/async-storage";

export function asyncSetAuth(data: any) {
    AsyncStorage.setItem("authorization", JSON.stringify(data));
}
export async function asyncGetAuth() {
    let data = await AsyncStorage.getItem('authorization');
    if (data)
        return JSON.parse(data);
}

export function asyncSetUser(data: any) {
    AsyncStorage.setItem("user", JSON.stringify(data));
}
export async function asyncGetUser() {
    let data = await AsyncStorage.getItem('user');
    if (data)
        return JSON.parse(data);
}

export function asyncLogout() {
    AsyncStorage.removeItem('user');
    AsyncStorage.removeItem('authorization');
    // AsyncStorage.clear()
}

export async function asyncGetDeviceToken() {
    let data: any = await AsyncStorage.getItem('deviceToken');
    return JSON.parse(data);
}

export function asyncSetDeviceToken(data: any) {
    AsyncStorage.setItem("deviceToken", JSON.stringify(data));
}
import { Alert, Clipboard, ToastAndroid, Linking, Platform, Share, PermissionsAndroid } from 'react-native';
// import { useNetInfo } from "@react-native-community/netinfo";
// import { addUser, deleteUser } from '../store/slices/user';
// import store, { } from '../store/Index';
// import { removeAuth, setAuth } from '../store/slices/authentication';
import moment from 'moment';
// import { RATE_APP_URL, SHARE_APP_URL } from '../env';

import SpInAppUpdates, {
  NeedsUpdateResponse,
  IAUUpdateKind,
  StartUpdateOptions,
  AndroidUpdateType,
  IAUInstallStatus
} from 'sp-react-native-in-app-updates';
import { navigateRef } from '../navigation/AppContainer';
import { showMsg } from './showMsg';
import { asyncLogout, asyncSetAuth, asyncSetUser } from '../storage/asyncStorage';
import Geolocation from '@react-native-community/geolocation';
import { requestExternalStoragePermissionForDownload, requestFineLocationPermission } from '../services/PermissionService';
import colors from './colors';
import { CHILI_MILD, CHILI_MEDIUM, CHILI_HOT, CHILI_VERY_HOT } from './images';
import { facebookSignin, googleSignin } from '../config/SocialLogin';
import { addUser, deleteUser } from '../store/slices/user';
import { removeAuth, setAuth } from '../store/slices/authentication';
import store from '../store/Index';
import { getAppSettingWithoutAuth, socialLogin } from '../lib/auth/Index';
import { setNewHeaderWithJwt } from '../services/ApiService';
import RNFS from 'react-native-fs';
import { Buffer } from 'buffer';
import { captureRef } from 'react-native-view-shot';
import RNFetchBlob from 'rn-fetch-blob';
import { deviceTokenRemove } from '../lib/deviceToken';
import { getBundleId, getVersion } from 'react-native-device-info';

const dispatch = store.dispatch;
const reduxState = store.getState();
const user = reduxState.user;
let isAlertShowing = false;
let resetScreenFlag: (() => void) | null = null;
export const IOS_APP_STORE_ID = '';

export const setResetScreenFlagCallback = (callback: () => void) => {
  resetScreenFlag = callback;
};
export const checkAppUpdate = async () => {
  try {
    if (isAlertShowing) {
      console.log('Update alert is already showing');
      return false;
    }
    let res: any = await getAppSettingWithoutAuth(Platform.OS === 'android' ? 'android_latest_version' : 'ios_latest_version');
    if (res && res.status === 200) {
      const latestVersion = res?.value;
      if (latestVersion) {
        const packageName = await getBundleId();
        const currentVersion = getVersion();
        let url = Platform.OS === 'android'
          ? `https://play.google.com/store/apps/details?id=${packageName}`
          : `https://apps.apple.com/us/app/minetenaz/id${IOS_APP_STORE_ID}`;

        let result = compareVersions(latestVersion, currentVersion);
        if (result) {
          isAlertShowing = true;
          Alert.alert(
            'Update Required',
            `A new version (${latestVersion}) of the app is available. Please update to continue using the app.`,
            [
              {
                text: 'Update Now',
                onPress: () => {
                  Linking.openURL(url);
                  isAlertShowing = false;
                  if (resetScreenFlag) resetScreenFlag();
                }
              },
            ],
            { cancelable: false }
          );
          return true;
        } else {
          console.log("No update needed - current version is up to date");
          return false;
        }
      } else {
        console.log("latestVersion not found in response");
        return false;
      }
    } else {
      console.log("API response invalid or status not 200:", res);
      return false;
    }

  } catch (error) {
    console.error("Error checking for updates:", error);
    isAlertShowing = false;
    return false;
  }
};
function compareVersions(v1: any, v2: any) {
  if (!v1 || !v2) return false;
  
  // Normalize versions by splitting and padding with zeros
  const a = v1.split('.').map(Number);
  const b = v2.split('.').map(Number);
  
  // Pad shorter array with zeros (e.g., [1, 0] becomes [1, 0, 0])
  const maxLength = Math.max(a.length, b.length);
  while (a.length < maxLength) a.push(0);
  while (b.length < maxLength) b.push(0);
  
  // Compare each segment
  for (let i = 0; i < maxLength; i++) {
    if (a[i] > b[i]) {
      return true; // v1 is greater, update needed
    } else if (a[i] < b[i]) {
      return false; // v2 is greater or equal, no update needed
    }
  }
  
  return false;
}

async function deviceLogout(id: any) {
  try {
    const body = {
      user_id: id,
      platform: Platform.OS
    }
    let res: any = await deviceTokenRemove(body);
    if (res) {
    }
  } catch (error) {
    console.log("logout error:", error);
  }
}

export function forceLogout() {
  deviceLogout(user?.id)
  dispatch(deleteUser());
  dispatch(removeAuth());
  asyncLogout();
}

export function logout() {
  Alert.alert('Logout', 'Are you sure you want to logout?', [
    {
      text: 'Cancel',
      style: 'cancel',
    },
    {
      text: 'OK',
      onPress: () => {
        forceLogout()
      }
    },
  ]);
}

// export function networkCheck() {
//   const { type, isConnected } = useNetInfo();  
//   return Boolean(isConnected);
//   if (!Boolean(isConnected)) {
//     navigationPush("NoInterNet", {})
//     showMsg({ title: "No Internet!", description: 'Please check your network connection!', type: "WARNING" });
//   }
// }

// navigationPush('NoInternet',{ })
export const navigationPush = (screenName: string, value: any = {}) => {
  if (navigateRef.isReady()) {
    navigateRef.navigate(screenName, value);
  }
}

export const copyToClipboard = (link: any) => {
  Clipboard.setString(link || '')
  ToastAndroid.show('Text copied to clipboard', ToastAndroid.SHORT)
}

export const openSettings = () => {
  Alert.alert(
    'Permission',
    'Please grant permission to access the storage or gallery.',
    [
      {
        text: 'OK', onPress: () => {
          if (Platform.OS === 'ios') {
            Linking.openURL('app-settings:');
          } else {
            Linking.openSettings();
          }
        }
      },
    ]
  );
};

export const formattedDate = (dateString: any) => {
  return moment(dateString).fromNow();
};

export async function getLocation() {
  const hasPermission: any = await requestFineLocationPermission();
  if (!hasPermission) {
    return null;
  }

  const options =
    Platform.OS === "android" && Platform.Version < 12
      ? {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 0,
      }
      : {
        enableHighAccuracy: false,
        timeout: 7000,
        maximumAge: 30000,
      };

  let attempts = 0;
  const maxRetries = 3;
  const accuracyThreshold = 150;

  while (attempts < maxRetries) {
    try {
      const position: any = await new Promise((resolve, reject) => {
        Geolocation.getCurrentPosition(resolve, reject, options);
      });

      const { latitude, longitude, accuracy } = position.coords;

      // ✅ Acceptable location
      if (accuracy <= accuracyThreshold || Platform.OS === "ios") {
        return {
          latitude: parseFloat(latitude.toFixed(7)),
          longitude: parseFloat(longitude.toFixed(7)),
        };
      }

      // ✅ Retry if accuracy not good enough
      console.warn(`Location not accurate enough (accuracy=${accuracy}m). Retrying...`);
      attempts += 1; // 🔴 previously missing, now added

    } catch (error) {
      console.error("Location fetch error:", error);
      attempts += 1;
    }
  }

  // ✅ If still not good after retries, return last known but warn user
  showMsg({
    title: "Location Error",
    description:
      "Unable to get an accurate location. Please enable GPS and try again.",
    type: "WARNING",
  });

  return null;
}



// ******* Rate us *********
// export const rateUs = () => {
//   if (RATE_APP_URL) {
//     Linking.openURL(RATE_APP_URL);
//   } else {
//     console.error('Rate app URL is not defined in the environment variables.');
//   }
// };

// ******* share app *******
// export const shareApp = () => {
//   if (SHARE_APP_URL) {
//     Share.share({
//       message: SHARE_APP_URL,
//     })
//       .then((result) => { })
//       .catch((errorMsg) => console.log(errorMsg));
//   } else {
//     console.error('Share app URL is not defined in the environment variables.');
//   }
// };


type FileField = {
  uri: string;
  type: string;
  name: string;
};

type JsonValue = string | number | boolean | null | undefined | FileField;

type JsonData = {
  [key: string]: JsonValue;
};

export function convertJsonToFormData(json: JsonData): FormData {
  const formData = new FormData();

  Object.entries(json).forEach(([key, value]) => {
    if (
      value &&
      typeof value === 'object' &&
      'uri' in value &&
      'type' in value &&
      'name' in value
    ) {
      formData.append(key, {
        uri: value.uri,
        type: value.type,
        name: value.name,
      } as any);
    } else {
      formData.append(key, value ?? '');
    }
  });

  return formData;
}
export const dateformat = (date: any) => {
  if (!date) return
  return new Date(date).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}

export function setLogin(data: any) {
  setNewHeaderWithJwt("Bearer " + data?.token);
  asyncSetAuth(data?.token);
  asyncSetUser(data?.user);
  dispatch(addUser(data?.user));
  dispatch(setAuth(data?.token));
}


export async function handleSocialLogin(source: string, navigation: any, setSocialLoginLoader: any, type: any) {
  try {
    let token;

    if (source === 'google') {
      token = await googleSignin();
    } else if (source === 'facebook') {
      token = await facebookSignin();
    } else {
      throw new Error('Unsupported source');
    }

    if (token) {
      setSocialLoginLoader(true);
      const res = await socialLogin({ source, token, type });

      if (res?.user) {
        setLogin(res);
        // If first time user, navigate to MakeProfile first
        console.log("res?.user?.is_first_time",res?.user?.is_first_time);
        if (res?.user?.is_first_time === 1) {
          setTimeout(() => {
            if (navigateRef.isReady()) {
              navigateRef.navigate("MakeProfile", { data: res?.user });
            } else {
              navigation.navigate("MakeProfile", { data: res?.user });
            }
          }, 100);
          return res; // Return early to prevent navigation to Drawer
        } else {
          showMsg({ title: "Login", description: res?.message, type: 'PASSED' });
          // Handle navigation after successful login
          if (res?.user?.type == 4) {
            // Attender - redirect to ClaimList
            setTimeout(() => {
              if (navigateRef.isReady()) {
                navigateRef.reset({
                  index: 0,
                  routes: [{ name: 'Drawer' }],
                });
                setTimeout(() => {
                  navigateRef.navigate("ClaimList");
                }, 300);
              } else {
                navigation.reset({
                  index: 0,
                  routes: [{ name: 'Drawer' }],
                });
                setTimeout(() => {
                  navigation.navigate("ClaimList");
                }, 300);
              }
            }, 100);
          } else {
            // Customer/Ambassador/Restaurant - redirect to Drawer (dashboard)
            setTimeout(() => {
              if (navigateRef.isReady()) {
                navigateRef.reset({
                  index: 0,
                  routes: [{ name: 'Drawer' }],
                });
              } else {
                navigation.reset({
                  index: 0,
                  routes: [{ name: 'Drawer' }],
                });
              }
            }, 100);
          }
        }

        return res;
      }
    }
  } catch (error) {
    console.error(`${source} login error:`, error);
    // showMsg({ title: 'Error', description: 'Login failed. Please try again.', type: 'FAILED' });
  }
}


export const isValidImageSize = (image: any, maxSizeMB: number) => {
  if (!image?.fileSize) {
    return false;
  }

  const maxSizeBytes = maxSizeMB * 1024 * 1024;

  if (image.fileSize > maxSizeBytes) {
    const sizeInMB = (image.fileSize / (1024 * 1024)).toFixed(2);
    showMsg({
      title: 'WARNING',
      description: `Selected image is ${sizeInMB}MB. Please select an image smaller than ${maxSizeMB}MB.`,
      type: 'WARNING',
    });
    return false;
  }

  return true;
};

if (typeof global.Buffer === 'undefined') {
  global.Buffer = Buffer;
}


export const downloadBlobFile = async (response: any) => {
  try {
    if (Platform.OS === 'android' && Platform.Version < 29) {
      let permission = await requestExternalStoragePermissionForDownload();
      console.log("Permission granted:", permission);
      if (!permission) {
        Alert.alert('Allow permission', 'Allow storage permission to download', [
          { text: 'Cancel' },
          { text: 'Open Settings', onPress: () => Linking.openSettings() },
        ]);
        return;
      }
    }

    const fileBlob = response?.fileBlob;
    const contentDisposition = response?.contentDisposition;

    if (!fileBlob) {
      throw new Error('File blob missing');
    }

    const filenameMatch = contentDisposition?.match(/filename="?(.+)"?/);
    const now = new Date();
    const dateStr = now.toISOString().split('T')[0];
    const timeStr = now.toTimeString().split(' ')[0].replace(/:/g, '-');

    const filename = filenameMatch && filenameMatch.length > 0
      ? filenameMatch[1].replace(/(\.[^\.]+)$/, `_${dateStr}_${timeStr}$1`)
      : `report_${dateStr}_${timeStr}.pdf`;

    const base64Data = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64data = reader.result as string;
        const base64 = base64data.split(',')[1];
        resolve(base64);
      };
      reader.onerror = reject;
      reader.readAsDataURL(fileBlob);
    });

    const { dirs } = RNFetchBlob.fs;
    const saveDir = Platform.OS === 'ios' ? dirs?.DocumentDir : dirs?.DownloadDir;
    const folderName = 'Menupalz';
    const folderPath = `${saveDir}/${folderName}`;

    const exists = await RNFetchBlob.fs.exists(folderPath);
    if (!exists) {
      await RNFetchBlob.fs.mkdir(folderPath);
    }

    const filePath = `${folderPath}/${filename}`;

    await RNFetchBlob.fs.writeFile(filePath, base64Data, 'base64');

    RNFetchBlob.fs.scanFile([{ path: filePath, mime: 'application/pdf' }])
      .then(() => {
        console.log('Scan complete, file should be visible now');
      })
      .catch((err) => {
        console.log('Scan failed:', err);
      });

    if (Platform.OS === 'android') {
      ToastAndroid.show(`File downloaded: ${folderName}/${filename}`, ToastAndroid.SHORT);
    } else {
      Alert.alert('Download complete', `File saved at: ${filePath}`);
    }

    return filePath;
  } catch (error: any) {
    console.error('Download error:', error);
    Alert.alert('Download failed', error.message || 'Unknown error');
  }
};


export const downloadAsPng = async (qrRef: any) => {
  try {
    if (Platform.OS === 'android' && Platform.Version < 29) {
      let permission = await requestExternalStoragePermissionForDownload();
      console.log("Permission granted:", permission);
      if (!permission) {
        Alert.alert('Allow permission', 'Allow storage permission to download', [
          { text: 'Cancel' },
          { text: 'Open Settings', onPress: () => Linking.openSettings() },
        ]);
        return;
      }
    }

    const uri = await captureRef(qrRef, {
      format: 'png',
      quality: 1,
    });

    const folderName = 'Menupalz';
    const folderPath = `${RNFS.DownloadDirectoryPath}/${folderName}`;

    const exists = await RNFS.exists(folderPath);
    if (!exists) {
      await RNFS.mkdir(folderPath);
    }

    const now = new Date();
    const dateStr = now.toISOString().split('T')[0];
    const timeStr = now.toTimeString().split(' ')[0].replace(/:/g, '-');

    const destPath = `${folderPath}/qr-code-${dateStr}_${timeStr}.png`;

    await RNFS.copyFile(uri, destPath);

    RNFetchBlob.fs.scanFile([{ path: destPath, mime: 'image/png' }])
      .then(() => {
        console.log('Scan complete, file should be visible now');
      })
      .catch((err) => {
        console.log('Scan failed:', err);
      });

    showMsg({
      title: 'Success',
      description: `Downloaded successfully to ${folderName} folder.`,
      type: 'PASSED',
    });
  } catch (error: any) {
    console.error(error);
    showMsg({
      title: 'Error',
      description: 'Failed to download.',
      type: 'FAILED',
    });
  }
};


export const shareLink = (link: string) => {
  if (link) {
    Share.share({
      message: link,
    })
      .then((result) => {
        if (result.action === Share.sharedAction) {
          // ToastAndroid.show("Shared successfully!", ToastAndroid.SHORT);
        }
      })
      .catch((error) => {
        console.log("Error while sharing:", error);
      });
  } else {
    ToastAndroid.show("Link not available", ToastAndroid.SHORT);
  }
};

export const checkForUpdates = async () => {
  const inAppUpdates = new SpInAppUpdates(
    false// isDebug
  );
  // curVersion is optional if you don't provide it will automatically take from the app using react-native-device-info
  try {
    await inAppUpdates.checkNeedsUpdate().then((result) => {
      try {
        if (result.shouldUpdate) {
          let updateOptions: StartUpdateOptions = {};
          if (Platform.OS === "android") {
            // android only, on iOS the user will be promped to go to your app store page
            updateOptions = {
              updateType: IAUUpdateKind.IMMEDIATE,
            };
          }
          if (Platform.OS === "ios") {
            updateOptions = {
              title: "Update available",
              message:
                "There is a new version of the app available on the App Store, do you want to update it?",
              buttonUpgradeText: "Update",
              buttonCancelText: "Cancel",
            };
          }
          inAppUpdates.addStatusUpdateListener((downloadStatus) => {
            console.log("download status", downloadStatus);
            if (downloadStatus.status === IAUInstallStatus.DOWNLOADED) {
              console.log("downloaded");
              inAppUpdates.installUpdate();
              inAppUpdates.removeStatusUpdateListener((finalStatus) => {
                console.log("final status", finalStatus);
              });
            }
          });
          inAppUpdates.startUpdate(updateOptions);
        }
      } catch (error) {
        console.log(error);
      }
    });
  } catch (error) {
    console.log(error);
  }
};

// Spicy Level Functions
export const getSpicyLevelText = (spicy_level: number) => {
  if (spicy_level === 0) return 'No Spicy';
  if (spicy_level === 1) return 'Mild';
  if (spicy_level === 2) return 'Medium';
  if (spicy_level === 3) return 'Hot';
  if (spicy_level === 4) return 'Extreme';
  return 'Mild';
};

export const getSpicyLevelColor = (spicy_level: number) => {
  if (spicy_level === 0) return colors.GRAY;
  if (spicy_level === 1) return colors.GREEN;
  if (spicy_level === 2) return colors.YELLOW;
  if (spicy_level === 3) return colors.ORANGE;
  if (spicy_level === 4) return colors.RED;
  return colors.GREEN;
};



export const getSpicyLevelImage = (spicy_level: number) => {
  if (spicy_level === 0) return null; // No image for no spicy
  if (spicy_level === 1) return CHILI_MILD;
  if (spicy_level === 2) return CHILI_MEDIUM;
  if (spicy_level === 3) return CHILI_HOT;
  if (spicy_level === 4) return CHILI_VERY_HOT;
  return CHILI_MILD;
};

export const Page_Limit = 10;
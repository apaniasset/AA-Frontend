import { Alert, Platform } from 'react-native';
import store from '../store/Index';
import { deleteUser } from '../store/slices/user';
import { removeAuth } from '../store/slices/authentication';
import { asyncLogout } from '../storage/asyncStorage';

// Minimal version of Menupalz forceLogout wired for AA-Frontend.
export function forceLogout(): void {
  const state = store.getState() as any;
  const userId = state?.user?.id;
  console.log('forceLogout called, userId:', userId);

  store.dispatch(deleteUser());
  store.dispatch(removeAuth());
  asyncLogout();
}

export function logout(): void {
  Alert.alert('Logout', 'Are you sure you want to logout?', [
    { text: 'Cancel', style: 'cancel' },
    {
      text: 'OK',
      onPress: () => {
        forceLogout();
      },
    },
  ]);
}


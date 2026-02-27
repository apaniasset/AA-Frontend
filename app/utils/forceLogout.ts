import store from '../redux/store';
import { removeUser } from '../redux/reducer/user';

// Clear user data and login flag. Call on unauthorized/expired token.
export function forceLogout(): void {
  // removeUser reducer ignores payload, but TS expects one argument
  store.dispatch(removeUser(undefined as any));
}


import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { asyncSetUser } from '../../storage/asyncStorage'

interface RestaurantType {
  id: string;
  title: string;
}

interface UserState {
  id: string;
  restaurant_id: string;
  name: string;
  type: number;
  email: string;
  postal_code: string | null;
  state: string | null;
  city: string | null;
  country_id: string | null;
  latitude: string | null;
  longitude: string | null;
  address: string | null;
  contact_number: string;
  status: string;
  updated_at: string;
  created_at: string;
  profile_pic: string;
  web_link: string;
  company_reg_no: string;
  rank: number;
  code: string;
  source: string | null;
  is_first_time: number;
  restaurant_type: RestaurantType | null;
  currency_symbol: string | null;
  end_time: string | null;
  start_time: string | null;
  is_delete_requested: boolean;
}

const initialState: UserState = {
  id: '',
  restaurant_id: '',
  name: '',
  type: 1,
  email: '',
  postal_code: null,
  state: null,
  city: null,
  country_id: null,
  latitude: null,
  longitude: null,
  address: null,
  contact_number: '',
  status: '',
  updated_at: '',
  created_at: '',
  profile_pic: '',
  web_link: '',
  company_reg_no: '',
  rank: 0,
  code: '',
  source: null,
  is_first_time: 0,
  restaurant_type: null,
  currency_symbol: '$',
  end_time: null,
  start_time: null,
  is_delete_requested: false
};


const userSlice = createSlice({
  name: 'userDetails',
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<UserState>) => {
      return { ...state, ...action.payload }
    },
    deleteUser: () => initialState,
    changeProfileImage: (state, action: PayloadAction<string>) => {
      state.profile_pic = action.payload;
      asyncSetUser(state)
    },
    removeProfileImage: (state) => {
      state.profile_pic = '';
      asyncSetUser(state);
    },
  }
})

export const { addUser, deleteUser, changeProfileImage, removeProfileImage } = userSlice.actions
export default userSlice.reducer

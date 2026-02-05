import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'userData',
  initialState: {
    userData: {},
    login : false,
  },
  reducers: {

    setUser(state,action :any) {
      const user = action.payload;
      return {...state, userData:user,login:true}
    },

    updateUser(state, action) {
      const updatedFields = action.payload; 
      return {
        ...state,
        userData: {
          ...state.userData, 
          ...updatedFields,
        },
        login: true,
      };
    },

    removeUser(state,action) {
       return {...state, userData:{},login:false}
    },
  }
})


export const {  setUser , updateUser , removeUser  } = userSlice.actions;

export default userSlice.reducer;
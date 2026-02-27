import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface CounterState {
    jwToken: string,
    refreshToken: string,
    jwTokenExpiryDate: string,
    refreshTokenExpiryDate: string,
}

const initialState: CounterState = {
    jwToken: '',
    refreshToken: '',
    jwTokenExpiryDate: '',
    refreshTokenExpiryDate: '',
}

const authSlice = createSlice({
    name: 'authentication',
    initialState,
    reducers: {
        setAuth: (state, action) => {
            state.jwToken = "Bearer " + action.payload;
            // state.refreshToken = action.payload.refreshToken;
            // state.jwTokenExpiryDate = action.payload.expiryTime
            // state.refreshTokenExpiryDate = action.payload.refreshTokenExpiryTime
        },
        removeAuth: () => {
            return initialState;
        }
    }
});

export default authSlice.reducer;
export const { setAuth, removeAuth } = authSlice.actions;

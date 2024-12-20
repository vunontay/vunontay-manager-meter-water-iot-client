import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the initial state type
interface AuthState {
    accessToken: string | null;
    refreshToken: string | null;
    role: string | null;
    _id: string | null;
}

// Define the initial state
const initialState: AuthState = {
    accessToken: null,
    refreshToken: null,
    role: null,
    _id: null,
};

// Create slice
const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        // Set user login tokens
        setTokens: (
            state,
            action: PayloadAction<{
                accessToken: string;
                refreshToken: string;
                role: string;
                _id: string;
            }>
        ) => {
            state.accessToken = action.payload.accessToken;
            state.refreshToken = action.payload.refreshToken;
            state.role = action.payload.role;
            state._id = action.payload._id;
        },
        // Logout - reset state
        logout: (state) => {
            state.accessToken = null;
            state.refreshToken = null;
            state.role = null;
            state._id = null;
        },
    },
});

export const { setTokens, logout } = authSlice.actions;
export default authSlice.reducer;

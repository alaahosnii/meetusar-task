import { createSlice } from "@reduxjs/toolkit";
import { Error } from "@/app/_types/Types";
import { GetUserInfoResponse } from "@/app/_types/Types";
import { loginUser, logOutUser, getLoggedInUser } from "./thunks/authThunks";

type AuthError = {
    error: Error
}

const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: null as GetUserInfoResponse | null,
        isLoggedIn: false,
        isLoginLoading: false,
        loginError: null as Error | null,
        getLoggedInUserError: null as Error | null,
        getLoggedInUserLoading: false,
        token: null as string | null,
        isLogoutLoading: false,
        logoutError: null as Error | null
    },

    reducers: {
        resetLoginError: (state) => {
            if (state.loginError) {
                state.loginError = null;
            }
        },

    },

    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.isLoginLoading = true;
                state.loginError = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.token = action.payload.token;
                state.isLoggedIn = true;
                state.isLoginLoading = false;
                state.loginError = null;
                localStorage.setItem("isLoggedIn", "true");

            })
            .addCase(loginUser.rejected, (state, action) => {
                const error = action.payload as AuthError;

                state.isLoginLoading = false;
                state.loginError = error.error;
            })
            .addCase(logOutUser.pending, (state) => {
                state.isLogoutLoading = true;
                state.logoutError = null;
            })
            .addCase(logOutUser.fulfilled, (state) => {
                state.isLoggedIn = false;
                state.user = null;
                state.token = null;
                state.isLogoutLoading = false;
                state.logoutError = null;
                localStorage.removeItem("isLoggedIn");
            })
            .addCase(logOutUser.rejected, (state, action) => {
                state.isLoggedIn = false;
                state.user = null;
                state.token = null;
                state.isLogoutLoading = false;
                state.logoutError = action.payload as Error;
                localStorage.removeItem("isLoggedIn");
            })
            .addCase(getLoggedInUser.pending, (state) => {
                state.getLoggedInUserLoading = true;
                state.getLoggedInUserError = null;
            })
            .addCase(getLoggedInUser.fulfilled, (state, action) => {
                state.user = action.payload as GetUserInfoResponse;
                state.getLoggedInUserLoading = false;
                state.getLoggedInUserError = null;
            })
            .addCase(getLoggedInUser.rejected, (state, action) => {
                state.isLoggedIn = false;
                state.user = null;
                state.token = null;
                state.getLoggedInUserError = action.payload as Error;
                state.getLoggedInUserLoading = false;
            })
    }
});

export const { resetLoginError } = authSlice.actions;
export default authSlice.reducer;
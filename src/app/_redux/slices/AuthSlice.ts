import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../services/axiosInstance";
import { Error, LoginData } from "@/app/_types/productTypes";
import { AxiosError } from "axios";
import { LoginResponse } from "@/app/_types/loginResponse";
import { GetUserInfoResponse } from "@/app/_types/getUserInfoResponse";

type AuthError = {
    error: Error
}
export const loginUser = createAsyncThunk(
    "auth/loginUser",
    async (user: LoginData, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post("/auth/login", user);
            console.log("response", response);

            return response.data as LoginResponse;
        } catch (error: unknown) {
            const axiosError = error as AxiosError;
            console.log("Login error:", axiosError?.response?.data || axiosError.message);

            return rejectWithValue(axiosError?.response?.data || "An unknown error occurred");
        }
    }
);

export const logOutUser = createAsyncThunk(
    "auth/logOutUser",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post("/auth/logOut");
            return response.data;
        }
        catch (error: unknown) {
            const axiosError = error as AxiosError;
            return rejectWithValue(axiosError?.response?.data || "An unknown error occurred");
        }
    }
);

export const getLoggedInUser = createAsyncThunk(
    "auth/getLoggedInUser",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get("/auth/loggedInUser", {
            });
            return response.data as GetUserInfoResponse;
        } catch (error: unknown) {
            const axiosError = error as AxiosError;
            return rejectWithValue(axiosError?.response?.data || "An unknown error occurred");
        }
    }
)

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
                console.log("action.payload", action.payload);
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
            .addCase(logOutUser.fulfilled, (state, action) => {
                state.isLoggedIn = false;
                state.user = null;
                state.token = null;
                state.isLogoutLoading = false;
                state.logoutError = null;
                localStorage.removeItem("isLoggedIn");
                localStorage.removeItem("token");
            })
            .addCase(logOutUser.rejected, (state, action) => {
                state.isLoggedIn = false;
                state.user = null;
                state.token = null;
                state.isLogoutLoading = false;
                state.logoutError = action.payload as Error;
                localStorage.removeItem("isLoggedIn");
                localStorage.removeItem("token");
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
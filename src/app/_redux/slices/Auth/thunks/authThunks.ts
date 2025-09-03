import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../services/axiosInstance";
import { LoginData } from "@/app/_types/Types";
import { AxiosError } from "axios";
import { LoginResponse } from "@/app/_types/Types";
import { GetUserInfoResponse } from "@/app/_types/Types";

export const loginUser = createAsyncThunk(
    "auth/loginUser",
    async (user: LoginData, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post("/auth/login", user);
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
);

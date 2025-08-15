import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

import guestSignIn from "../../apis/user/guestSignIn";
import logoutUser from "../../apis/user/logoutUser";
import signIn from "../../apis/user/signIn";
import signUp from "../../apis/user/signUp";
import getCurrentUser from "../../apis/user/getCurrentUser";

const authStorage = {
    get: <T>(key: string, defaultValue: T): T => {
        try {
            const item = sessionStorage.getItem(key);
            return item ? (JSON.parse(item) as T) : defaultValue;
        } catch {
            return defaultValue;
        }
    },
    set: (key: string, value: unknown) => {
        sessionStorage.setItem(key, JSON.stringify(value));
    },
    clear: () => {
        sessionStorage.removeItem("isLoggedIn");
        sessionStorage.removeItem("role");
        sessionStorage.removeItem("data");
    },
};

type initialStateType = {
    isLoggedIn: boolean;
    data: Record<string, unknown>;
    role: string;
};

const initialState: initialStateType = {
    isLoggedIn: authStorage.get<boolean>("isLoggedIn", false),
    role: authStorage.get<string>("role", "VISITOR"),
    data: authStorage.get<Record<string, unknown>>("data", {}),
};

const resetAuthState = (state: initialStateType) => {
    state.isLoggedIn = false;
    state.role = "VISITOR";
    state.data = {};
    authStorage.clear();
};

const handleError = (error: unknown) => {
    if (typeof error === "object" && error !== null && "response" in error) {
        const err = error as {
            response?: {
                status?: number;
                data?: { message: string };
            };
        };

        toast.error(err?.response?.data?.message || "An error occurred");

        if (err.response?.status === 455) {
            return { clearState: true };
        }
    } else {
        toast.error("An unexpected error occurred");
        console.log(error);
    }
};

export const register = createAsyncThunk(
    "auth/register",
    async (data: {
        file: any;
        fullName: string;
        email: string;
        password: string;
    }) => {
        try {
            return await signUp(
                data.file[0],
                data.fullName,
                data.email,
                data.password
            );
        } catch (error) {
            handleError(error);
        }
    }
);

export const login = createAsyncThunk(
    "auth/login",
    async (data: { email: string; password: string }) => {
        try {
            return await signIn(data.email, data.password);
        } catch (error) {
            handleError(error);
        }
    }
);

export const guestLogin = createAsyncThunk("auth/guestLogin", async () => {
    try {
        return await guestSignIn();
    } catch (error) {
        handleError(error);
    }
});

export const logout = createAsyncThunk("auth/logout", async () => {
    try {
        return await logoutUser();
    } catch (error) {
        handleError(error);
    }
});

export const getProfile = createAsyncThunk("auth/getProfile", async () => {
    try {
        return await getCurrentUser();
    } catch (error) {
        handleError(error);
    }
});

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(register.fulfilled, (state, action) => {
                state.isLoggedIn = action.payload?.success;
                state.role = action.payload?.data?.role;
                state.data = action.payload?.data;
                authStorage.set("isLoggedIn", action.payload?.success);
                authStorage.set("role", action.payload?.data?.role);
                authStorage.set("data", action.payload?.data);
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoggedIn = action.payload?.success;
                state.role = action.payload?.data?.role;
                state.data = action.payload?.data;
                authStorage.set("isLoggedIn", action.payload?.success);
                authStorage.set("role", action.payload?.data?.role);
                authStorage.set("data", action.payload?.data);
            })
            .addCase(guestLogin.fulfilled, (state, action) => {
                state.isLoggedIn = action.payload?.success;
                state.role = action.payload?.data?.role;
                state.data = action.payload?.data;
                authStorage.set("isLoggedIn", action.payload?.success);
                authStorage.set("role", action.payload?.data?.role);
                authStorage.set("data", action.payload?.data);
            })
            .addCase(logout.fulfilled, (state) => {
                state.isLoggedIn = false;
                state.role = "VISITOR";
                state.data = {};
                authStorage.clear();
            })
            .addCase(getProfile.fulfilled, (state, action) => {
                state.isLoggedIn = true;
                state.role = action.payload?.data?.role;
                state.data = action.payload?.data;
                authStorage.set("isLoggedIn", action.payload?.success);
                authStorage.set("role", action.payload?.data?.role);
                authStorage.set("data", action.payload?.data);
            })
            .addMatcher(
                (action) => action.payload?.clearState,
                (state) => {
                    resetAuthState(state);
                }
            );
    },
});

export default authSlice;

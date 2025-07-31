import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoggedIn: true,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: () => {},
});

export default authSlice;

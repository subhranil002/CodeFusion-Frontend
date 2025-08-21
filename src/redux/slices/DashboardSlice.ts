import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import getRoomsByUser from "../../apis/user/getRoomsByUser";

export type RoomSliceInitialState = {
    rooms: [];
};

const initialState: RoomSliceInitialState = {
    rooms: [],
};

export const fetchRooms = createAsyncThunk("dashboard/fetchRooms", async () => {
    return await getRoomsByUser();
});

const dashboardSlice = createSlice({
    name: "dashboard",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchRooms.fulfilled, (state, action) => {
            state.rooms = action.payload.data.rooms;
        });
    },
});

export default dashboardSlice;

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import getLanguages from "../../apis/room/getLanguages";
import getRoomsByUser from "../../apis/user/getRoomsByUser";

export type Language = {
    id: number;
    name: string;
};

export type RoomCardData = {
    roomId: string;
    roomName: string;
    languageName: string;
    owner: string;
    public: boolean;
};

export type RoomSliceInitialState = {
    languageList: Language[];
    rooms: RoomCardData[];
};

const initialState: RoomSliceInitialState = {
    languageList: [],
    rooms: [],
};

export const fetchLanguages = createAsyncThunk(
    "editor/getLanguages",
    async () => {
        return await getLanguages();
    }
);

export const fetchRooms = createAsyncThunk("dashboard/fetchRooms", async () => {
    return await getRoomsByUser();
});

const dashboardSlice = createSlice({
    name: "dashboard",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchLanguages.fulfilled, (state, action) => {
                state.languageList = action.payload.data;
            })
            .addCase(fetchRooms.fulfilled, (state, action) => {
                state.rooms = action.payload.data.rooms;
            });
    },
});

export default dashboardSlice;

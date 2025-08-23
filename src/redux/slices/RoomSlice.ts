import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import codeRunner from "../../apis/room/codeRunner";
import createRoom from "../../apis/room/createRoom";
import deleteRoom from "../../apis/room/deleteRoom";
import joinRoom from "../../apis/room/joinRoom";
import updateRoom from "../../apis/room/updateRoom";
import editorSocket from "../../configs/EditorSocketConfig";
import type { TerminalData, User } from "../../types/types";
import { guestLogin, login, logout, register } from "./AuthSlice";

const roomStorage = {
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
        sessionStorage.removeItem("roomId");
        sessionStorage.removeItem("roomName");
        sessionStorage.removeItem("languageId");
        sessionStorage.removeItem("languageName");
        sessionStorage.removeItem("owner");
        sessionStorage.removeItem("code");
        sessionStorage.removeItem("terminalData");
        sessionStorage.removeItem("users");
        sessionStorage.removeItem("anyoneCanEdit");
    },
};

export type RoomSliceInitialState = {
    roomId: string;
    roomName: string;
    languageId: string;
    languageName: string;
    owner: string;
    code: string;
    terminalData: TerminalData | null;
    users: User[];
    anyoneCanEdit: boolean;
};

const initialState: RoomSliceInitialState = {
    roomId: roomStorage.get<string>("roomId", ""),
    roomName: roomStorage.get<string>("roomName", ""),
    languageId: roomStorage.get<string>("languageId", ""),
    languageName: roomStorage.get<string>("languageName", ""),
    owner: roomStorage.get<string>("owner", ""),
    code: roomStorage.get<string>("code", ""),
    terminalData: roomStorage.get<TerminalData | null>("terminalData", null),
    users: roomStorage.get<User[]>("users", []),
    anyoneCanEdit: roomStorage.get<boolean>("anyoneCanEdit", false),
};

export const joinRoomById = createAsyncThunk(
    "editor/joinRoomById",
    async (data: { roomId: string }) => {
        return await joinRoom(data.roomId);
    }
);

export const createNewRoom = createAsyncThunk(
    "editor/createNewRoom",
    async (data: {
        roomName: string;
        languageId: number;
        languageName: string;
    }) => {
        return await createRoom(
            data.roomName,
            data.languageId,
            data.languageName
        );
    }
);

export const updateRoomData = createAsyncThunk(
    "editor/updateRoomData",
    async (data: {
        roomId: string;
        roomName?: string;
        code?: string;
        anyoneCanEdit?: boolean;
    }) => {
        return await updateRoom(
            data.roomId,
            data?.roomName,
            data?.code,
            data?.anyoneCanEdit
        );
    }
);

export const deleteRoomById = createAsyncThunk(
    "editor/deleteRoomById",
    async (data: { roomId: string }) => {
        return await deleteRoom(data.roomId);
    }
);

export const executeCode = createAsyncThunk(
    "editor/executeCode",
    async (data: { code: string; langId: number; stdIn?: string }) => {
        return await codeRunner(data.code, data.langId, data?.stdIn);
    }
);

const roomSlice = createSlice({
    name: "room",
    initialState,
    reducers: {
        setUsers(state, action) {
            state.users = action.payload;
        },
        setCode(state, action) {
            state.code = action.payload;
        },
        setTerminalData(state, action) {
            state.terminalData = action.payload;
        },
        resetRoomState(state) {
            state.roomId = "";
            state.roomName = "";
            state.languageId = "";
            state.languageName = "";
            state.owner = "";
            state.code = "";
            state.terminalData = null;
            state.users = [];
            state.anyoneCanEdit = false;
            roomStorage.clear();
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(register.fulfilled, (state, action) => {
                state.users.push({
                    name: action.payload.data.fullName.split(" ")[0],
                    isTyping: false,
                });
            })
            .addCase(login.fulfilled, (state, action) => {
                state.users.push({
                    name: action.payload.data.fullName.split(" ")[0],
                    isTyping: false,
                });
            })
            .addCase(guestLogin.fulfilled, (state, action) => {
                state.users.push({
                    name: action.payload.data.fullName.split(" ")[0],
                    isTyping: false,
                });
            })
            .addCase(logout.fulfilled, (state) => {
                state.roomId = "";
                state.roomName = "";
                state.languageId = "";
                state.languageName = "";
                state.owner = "";
                state.code = "";
                state.terminalData = null;
                state.users = [];
                state.anyoneCanEdit = false;
                roomStorage.clear();
            })
            .addCase(joinRoomById.fulfilled, (state, action) => {
                state.roomId = action.payload.data.roomId;
                state.roomName = action.payload.data.roomName;
                state.languageId = action.payload.data.language.id;
                state.languageName = action.payload.data.language.name;
                state.owner = action.payload.data.owner;
                state.code = action.payload.data.code;
                state.anyoneCanEdit = action.payload.data.anyoneCanEdit;
                roomStorage.set("roomId", action.payload.data.roomId);
                roomStorage.set("roomName", action.payload.data.roomName);
                roomStorage.set("languageId", action.payload.data.language.id);
                roomStorage.set(
                    "languageName",
                    action.payload.data.language.name
                );
                roomStorage.set("owner", action.payload.data.owner);
                roomStorage.set("code", action.payload.data.code);
                roomStorage.set(
                    "anyoneCanEdit",
                    action.payload.data.anyoneCanEdit
                );
            })
            .addCase(executeCode.fulfilled, (state, action) => {
                state.terminalData = action.payload.data;
                roomStorage.set("terminalData", action.payload.data);
                editorSocket.emit("updateTerminal", action.payload.data);
            });
    },
});

export const { setUsers, setCode, setTerminalData, resetRoomState } =
    roomSlice.actions;
export default roomSlice;

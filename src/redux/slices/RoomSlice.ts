import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import codeRunner from "../../apis/room/codeRunner";
import createRoom from "../../apis/room/createRoom";
import getLanguages from "../../apis/room/getLanguages";
import getRoom from "../../apis/room/getRoom";
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
        // sessionStorage.removeItem("public");
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
    // public: boolean;
};

const initialState: RoomSliceInitialState = {
    roomId: roomStorage.get<string>("roomId", "HGE4K7"),
    roomName: roomStorage.get<string>("roomName", "Test Room"),
    languageId: roomStorage.get<string>("languageId", "109"),
    languageName: roomStorage.get<string>("languageName", "Python"),
    owner: roomStorage.get<string>("owner", "68a5e56dc966f2c70b8d6253"),
    code: roomStorage.get<string>("code", "print('Hello, World!')"),
    terminalData: roomStorage.get<TerminalData | null>("terminalData", null),
    users: roomStorage.get<User[]>("users", []),
    // public: roomStorage.get<boolean>("public", false),
};

export const fetchLanguages = createAsyncThunk(
    "editor/getLanguages",
    async () => {
        return await getLanguages();
    }
);

export const setRoom = createAsyncThunk(
    "editor/setRoom",
    async (data: { roomId: string; roomName: string }) => {
        return await getRoom(data.roomId);
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
    async (data: { roomId: string; roomName?: string; code?: string }) => {
        return await updateRoom(data.roomId, data?.roomName, data?.code);
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
            // state.public = false;
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
                roomStorage.set("users", state.users); // remove
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
                // state.public = false;
                roomStorage.clear();
            })
            .addCase(setRoom.fulfilled, (state, action) => {
                state.roomId = action.payload.data.roomId;
                state.roomName = action.payload.data.roomName;
                state.languageId = action.payload.data.language.id;
                state.languageName = action.payload.data.language.name;
                state.owner = action.payload.data.owner;
                state.code = action.payload.data.code;
                // state.public = action.payload.data.public;
                roomStorage.set("roomId", action.payload.data.roomId);
                roomStorage.set("roomName", action.payload.data.roomName);
                roomStorage.set("languageId", action.payload.data.language.id);
                roomStorage.set(
                    "languageName",
                    action.payload.data.language.name
                );
                roomStorage.set("owner", action.payload.data.owner);
                roomStorage.set("code", action.payload.data.code);
                // roomStorage.set("public", action.payload.data.public);
            })
            .addCase(executeCode.fulfilled, (state, action) => {
                state.terminalData = action.payload.data;
                roomStorage.set("terminalData", action.payload.data);
                editorSocket.emit("updateTerminal", action.payload.data);
            });
    },
});

export const { setUsers, setCode, setTerminalData } = roomSlice.actions;
export default roomSlice;

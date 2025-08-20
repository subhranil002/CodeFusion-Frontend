import {
    createAsyncThunk,
    createSlice,
    type PayloadAction,
} from "@reduxjs/toolkit";

import codeRunner from "../../apis/room/codeRunner";
import getLanguages from "../../apis/room/getLanguages";
import editorSocket from "../../configs/EditorSocketConfig";
import type {
    InitialState,
    Language,
    TerminalData,
    User,
} from "../../types/types";

const initialState: InitialState = {
    users: [],
    code: "// Write code here...",
    currentLanguage: null,
    languageList: [],
    terminalData: null,
};

export const fetchLanguages = createAsyncThunk(
    "editor/getLanguages",
    async () => {
        return await getLanguages();
    }
);

export const executeCode = createAsyncThunk(
    "editor/executeCode",
    async (data: { code: string; langId: number; stdIn?: string }) => {
        return await codeRunner(data.code, data.langId, data?.stdIn);
    }
);

const editorSlice = createSlice({
    name: "editor",
    initialState,
    reducers: {
        setUsers(state, action: PayloadAction<User[]>) {
            state.users = action.payload;
        },
        setCode(state, action: PayloadAction<string>) {
            state.code = action.payload;
        },
        setLanguage(state, action: PayloadAction<Language>) {
            state.currentLanguage = action.payload;
        },
        setTerminalData(state, action: PayloadAction<TerminalData>) {
            state.terminalData = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchLanguages.fulfilled, (state, action) => {
                state.languageList = action.payload.data;
                state.currentLanguage = action.payload.data[0];
            })
            .addCase(executeCode.fulfilled, (state, action) => {
                state.terminalData = action.payload.data;
                editorSocket.emit("updateTerminal", action.payload.data);
            });
    },
});

export const { setUsers, setCode, setLanguage, setTerminalData } =
    editorSlice.actions;
export default editorSlice;

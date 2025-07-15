import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type User = {
    name: string;
    isTyping: boolean;
};

type InitialState = {
    users: User[]; // ← array of User
    code: string;
    language: string;
};

const initialState: InitialState = {
    users: [],
    code: "// Write code here...",
    language: "javascript",
};

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
        setLanguage(state, action: PayloadAction<string>) {
            state.language = action.payload;
        },
    },
});

export const { setUsers, setCode, setLanguage } = editorSlice.actions;
export default editorSlice;

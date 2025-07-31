import { configureStore } from "@reduxjs/toolkit";
import editorSlice from "./slices/EditorSlice";
import authSlice from "./slices/AuthSlice";

const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        editor: editorSlice.reducer,
    },
    devTools: import.meta.env.VITE_NODE_ENV === "development",
});

export default store;

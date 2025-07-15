import { configureStore } from "@reduxjs/toolkit";
import editorSlice from "./slices/EditorSlice";

const store = configureStore({
    reducer: {
        editor: editorSlice.reducer,
    },
    devTools: import.meta.env.VITE_NODE_ENV === "development",
});

export default store;

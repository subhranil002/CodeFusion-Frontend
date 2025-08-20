import { configureStore } from "@reduxjs/toolkit";

import authSlice from "./slices/AuthSlice";
import editorSlice from "./slices/RoomSlice";

const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        editor: editorSlice.reducer,
    },
    devTools: import.meta.env.VITE_NODE_ENV === "development",
});

export default store;

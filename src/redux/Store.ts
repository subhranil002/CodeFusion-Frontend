import { configureStore } from "@reduxjs/toolkit";

import authSlice from "./slices/AuthSlice";
import dashboardSlice from "./slices/DashboardSlice";
import roomSlice from "./slices/RoomSlice";

const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        room: roomSlice.reducer,
        dashboard: dashboardSlice.reducer,
    },
    devTools: import.meta.env.VITE_NODE_ENV === "development",
});

export default store;

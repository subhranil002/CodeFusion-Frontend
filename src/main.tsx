import "./index.css";
import "leaflet/dist/leaflet.css"

import { Analytics } from "@vercel/analytics/react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import App from "./App.tsx";
import AppToaster from "./AppToaster/AppToaster.tsx";
import store from "./redux/Store.ts";

createRoot(document.getElementById("root")!).render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
            <AppToaster />
            <Analytics />
        </BrowserRouter>
    </Provider>
);

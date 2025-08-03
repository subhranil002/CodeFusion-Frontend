import "./index.css";

import { Analytics } from "@vercel/analytics/react"
import { createRoot } from "react-dom/client";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import App from "./App.tsx";
import store from "./redux/Store.ts";

createRoot(document.getElementById("root")!).render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
            <Toaster />
            <Analytics/>
        </BrowserRouter>
    </Provider>
);

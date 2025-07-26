import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/Store.ts";
import { Toaster } from "react-hot-toast";
import { Analytics } from "@vercel/analytics/react"

createRoot(document.getElementById("root")!).render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
            <Toaster />
            <Analytics/>
        </BrowserRouter>
    </Provider>
);

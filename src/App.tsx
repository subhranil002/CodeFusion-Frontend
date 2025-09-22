import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import Router from "./router/Router";

function App() {
    const location = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location.pathname]);

    useEffect(() => {
        const theme = localStorage.getItem("site-theme") || "light";
        document.documentElement.setAttribute("data-theme", theme);
    }, []);

    return <Router />;
}

export default App;

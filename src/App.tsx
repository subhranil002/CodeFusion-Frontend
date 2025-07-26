import { useEffect } from "react";
import Router from "./router/Router";
import { useLocation } from "react-router-dom";

function App() {
    const location = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location.pathname]);

    return <Router />;
}

export default App;

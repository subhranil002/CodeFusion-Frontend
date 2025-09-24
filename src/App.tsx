import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

import editorSocket from "./configs/EditorSocketConfig";
import { resetRoomState } from "./redux/slices/RoomSlice";
import Router from "./router/Router";

function App() {
    const location = useLocation();
    const dispatch = useDispatch();
    const { roomId } = useSelector((state: any) => state.room);

    useEffect(() => {
        window.scrollTo(0, 0);
        if (roomId) {
            editorSocket.emit("leaveRoom");
            dispatch(resetRoomState());
        }

        return () => {
            editorSocket.off("leaveRoom");
        };
    }, [location.pathname]);

    useEffect(() => {
        const theme = localStorage.getItem("site-theme") || "light";
        document.documentElement.setAttribute("data-theme", theme);
    }, []);

    return <Router />;
}

export default App;

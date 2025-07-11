import { io } from "socket.io-client";
import CodePlayground from "./pages/CodePlayground";
import { Route, Routes } from "react-router-dom";

function App() {
    const socket = io("http://localhost:3000");
    socket.on("connect", () => {
        console.log("Connected to server");
    });

    return (
        <Routes>
            <Route path="/:roomId" element={<CodePlayground />} />
        </Routes>
    );
}

export default App;

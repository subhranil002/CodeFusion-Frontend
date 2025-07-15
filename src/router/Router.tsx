import { Route, Routes } from "react-router-dom";
import JoinRoom from "../pages/JoinRoom";
import CodePlayground from "../pages/CodePlayground";

function Router() {
    return (
        <Routes>
            <Route path="/" element={<JoinRoom />} />
            <Route path="/playground" element={<CodePlayground />} />
        </Routes>
    );
}

export default Router;

import { Route, Routes } from "react-router-dom";
import JoinRoom from "../pages/JoinRoom";
import CodePlayground from "../pages/CodePlayground";
import NotFound from "../pages/NotFound";
// import Home from "../pages/Home";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import RequireAuth from "../components/Auth/RequireAuth";
// import Dashboard from "../pages/Dashboard";

function Router() {
    return (
        <Routes>
            <Route path="/" element={<JoinRoom />} />
            <Route path="/signin" element={<SignIn />} />
            {/* <Route path="/" element={<Home />} />*/}
            <Route path="/signup" element={<SignUp />} />
            <Route element={<RequireAuth />}>
                {/* <Route path="/dashboard" element={<Dashboard />} /> */}
                <Route path="/playground" element={<CodePlayground />} />
            </Route> 
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}

export default Router;

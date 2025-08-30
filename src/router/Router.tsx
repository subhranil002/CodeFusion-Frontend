import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes, useLocation } from "react-router-dom";

import RequireAuth from "../components/Auth/RequireAuth";
import CodePlayground from "../pages/CodePlayground";
import ContactUs from "../pages/Contact";
import Dashboard from "../pages/Dashboard";
import Home from "../pages/Home";
import NotFound from "../pages/NotFound";
import Profile from "../pages/Profile";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import { getProfile } from "../redux/slices/AuthSlice";

function Router() {
    const dispatch: any = useDispatch();
    const location = useLocation();

    const paths = ["/", "/signup", "/signin", "/contact"];

    useEffect(() => {
        if (!paths.includes(location.pathname)) {
            (async () => {
                await dispatch(getProfile());
            })();
        }
    }, [location.pathname]);

    useEffect(() => {
        (async () => {
            await dispatch(getProfile());
        })();
    }, []);

    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route element={<RequireAuth />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route
                    path="/playground/:roomId"
                    element={<CodePlayground />}
                />
                <Route path="/profile" element={<Profile />} />
            </Route>
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}

export default Router;

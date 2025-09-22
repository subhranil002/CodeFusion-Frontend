import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes, useLocation } from "react-router-dom";

import RequireAuth from "../components/Auth/RequireAuth";
import About from "../pages/About";
import CodePlayground from "../pages/Code/CodePlayground";
import Dashboard from "../pages/Code/Dashboard";
import ContactUs from "../pages/Contact";
import Home from "../pages/Home";
import NotFound from "../pages/NotFound";
import Pricing from "../pages/Pricing";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import ChangePassword from "../pages/User/ChangePassword";
import EditProfile from "../pages/User/EditProfile";
import ForgotPassword from "../pages/User/ForgotPassword";
import Profile from "../pages/User/Profile";
import ResetPassword from "../pages/User/ResetPassword";
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
            <Route path="/about" element={<About />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/forgotpassword" element={<ForgotPassword />} />
            <Route path="/resetpassword/:token" element={<ResetPassword />} />
            <Route element={<RequireAuth />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route
                    path="/playground/:roomId"
                    element={<CodePlayground />}
                />
                <Route path="/profile" element={<Profile />} />
                <Route path="/editprofile" element={<EditProfile />} />
                <Route path="/changepassword" element={<ChangePassword />} />
            </Route>
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}

export default Router;

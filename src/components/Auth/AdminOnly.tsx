import { useEffect } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

function AdminOnly() {
    const { isLoggedIn, role } = useSelector((state: any) => state.auth);
    const location = useLocation();

    useEffect(() => {
        if (isLoggedIn && role !== "ADMIN") {
            toast.error("You don't have access to this page!");
        }
    }, []);

    if (!isLoggedIn) {
        return <Navigate to="/signin" state={{ from: location }} replace />;
    }

    if (role !== "ADMIN") {
        return (
            <Navigate
                to={
                    location.state?.from?.pathname ||
                    location.state?.from ||
                    "/"
                }
                replace
            />
        );
    }

    return <Outlet />;
}

export default AdminOnly;

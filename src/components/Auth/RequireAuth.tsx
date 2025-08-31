import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

function RequireAuth() {
    const { isLoggedIn } = useSelector((state: any) => state.auth);
    const location = useLocation();

    return isLoggedIn ? (
        <Outlet />
    ) : (
        <Navigate to="/signin" state={{ from: location }} replace />
    );
}

export default RequireAuth;

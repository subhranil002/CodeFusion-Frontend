import {
    FaEnvelope,
    FaInfoCircle,
    FaReceipt,
    FaSignOutAlt,
    FaUser,
    FaUserCircle,
} from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { RiMenu2Fill } from "react-icons/ri";
import { TbCoinRupeeFilled } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";

import Logo from "../Assets/Images/logo.png";
import { logout } from "../redux/slices/AuthSlice";

function Header() {
    const dispatch: any = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const { isLoggedIn, role, data } = useSelector((state: any) => state.auth);

    async function handleLogout() {
        await dispatch(logout());
        navigate("/signin");
    }

    function modifyCloudinaryURL(url: string) {
        if (import.meta.env.VITE_IMAGE_TRANSFORMATION === "true") {
            return url.replace(
                "/upload/",
                "/upload/ar_1:1,c_auto,g_auto,w_500/r_max/"
            );
        }
        return url;
    }

    const isActive = (path: string) => location.pathname === path;

    return (
        <div className="navbar bg-base-100 border-b border-base-300 shadow-sm md:px-8">
            <div className="navbar-start">
                <div className="dropdown">
                    <div
                        tabIndex={0}
                        role="button"
                        className="btn btn-ghost lg:hidden"
                    >
                        <RiMenu2Fill size={20} />
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-base font-semibold dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
                    >
                        {isLoggedIn && (
                            <li>
                                <Link
                                    to="/dashboard"
                                    className={`flex items-center gap-2 rounded-md ${
                                        isActive("/dashboard")
                                            ? "bg-neutral text-neutral-content"
                                            : ""
                                    }`}
                                >
                                    <MdDashboard className="text-lg" />
                                    Your Dashboard
                                </Link>
                            </li>
                        )}
                        <li>
                            <Link
                                to="/about"
                                className={`flex items-center gap-2 rounded-md ${
                                    isActive("/about")
                                        ? "bg-neutral text-neutral-content"
                                        : ""
                                }`}
                            >
                                <FaInfoCircle className="text-lg" />
                                About Us
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/pricing"
                                className={`flex items-center gap-2 rounded-md ${
                                    isActive("/pricing")
                                        ? "bg-neutral text-neutral-content"
                                        : ""
                                }`}
                            >
                                <TbCoinRupeeFilled className="text-lg" />
                                Pricing
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/contact"
                                className={`flex items-center gap-2 rounded-md ${
                                    isActive("/contact")
                                        ? "bg-neutral text-neutral-content"
                                        : ""
                                }`}
                            >
                                <FaEnvelope className="text-lg" />
                                Contact Us
                            </Link>
                        </li>
                    </ul>
                </div>
                <Link to="/" className="flex items-center gap-2">
                    <img
                        src={Logo}
                        alt="Logo"
                        className="w-8 h-8 md:w-10 md:h-10"
                    />
                    <span className="text-lg md:text-xl font-bold">
                        CodeFusion
                    </span>
                </Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1 gap-6 text-base font-semibold">
                    {isLoggedIn && (
                        <li>
                            <Link
                                to="/dashboard"
                                className={`flex items-center gap-2 rounded-md ${
                                    isActive("/dashboard")
                                        ? "bg-neutral text-neutral-content"
                                        : ""
                                }`}
                            >
                                <MdDashboard className="text-lg" />
                                Your Dashboard
                            </Link>
                        </li>
                    )}
                    <li>
                        <Link
                            to="/about"
                            className={`flex items-center gap-2 rounded-md ${
                                isActive("/about")
                                    ? "bg-neutral text-neutral-content"
                                    : ""
                            }`}
                        >
                            <FaInfoCircle className="text-lg" />
                            About Us
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/pricing"
                            className={`flex items-center gap-2 rounded-md ${
                                isActive("/pricing")
                                    ? "bg-neutral text-neutral-content"
                                    : ""
                            }`}
                        >
                            <TbCoinRupeeFilled className="text-lg" />
                            Pricing
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/contact"
                            className={`flex items-center gap-2 rounded-md ${
                                isActive("/contact")
                                    ? "bg-neutral text-neutral-content"
                                    : ""
                            }`}
                        >
                            <FaEnvelope className="text-lg" />
                            Contact Us
                        </Link>
                    </li>
                </ul>
            </div>
            <div className="navbar-end dropdown dropdown-bottom text-md flex items-center gap-2">
                <span className="hidden md:block">
                    {isLoggedIn && location.pathname === "/" ? (
                        <span className="capitalize font-semibold">
                            Welcome, {data?.fullName.split(" ")[0]}
                        </span>
                    ) : (
                        ""
                    )}
                </span>
                <div
                    tabIndex={0}
                    role="button"
                    className="btn btn-ghost btn-circle avatar"
                >
                    <div className="w-8 md:w-10 rounded-full">
                        {isLoggedIn ? (
                            <img
                                alt="Profile Avatar"
                                src={modifyCloudinaryURL(
                                    data?.avatar?.secure_url
                                )}
                            />
                        ) : (
                            <FaUserCircle
                                size={32}
                                className="md:size-10 object-cover"
                            />
                        )}
                    </div>
                </div>
                {isLoggedIn ? (
                    <ul
                        tabIndex={0}
                        className="menu menu-base font-semibold dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
                    >
                        <li>
                            <Link
                                to="/profile"
                                className={`flex items-center gap-2 rounded-md ${
                                    isActive("/profile")
                                        ? "bg-neutral text-neutral-content"
                                        : ""
                                }`}
                            >
                                <FaUser className="text-lg" />
                                My Profile
                            </Link>
                        </li>
                        {isLoggedIn &&
                            (role === "CODER" || role === "GUEST") && (
                                <li>
                                    <Link
                                        to="/purchasehistory"
                                        className={`flex items-center gap-2 rounded-md ${
                                            isActive("/purchasehistory")
                                                ? "bg-neutral text-neutral-content"
                                                : ""
                                        }`}
                                    >
                                        <FaReceipt className="text-lg" />
                                        My Purchases
                                    </Link>
                                </li>
                            )}
                        <li>
                            <button
                                onClick={() => handleLogout()}
                                className="flex items-center gap-2"
                            >
                                <FaSignOutAlt className="text-lg" />
                                Logout
                            </button>
                        </li>
                    </ul>
                ) : (
                    <ul
                        tabIndex={0}
                        className="menu menu-base font-semibold dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
                    >
                        <li>
                            <Link
                                to="/signin"
                                className={`flex items-center gap-2 rounded-md ${
                                    isActive("/signin")
                                        ? "bg-neutral text-neutral-content"
                                        : ""
                                }`}
                            >
                                <FaSignOutAlt className="text-lg" />
                                Sign In
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/signup"
                                className={`flex items-center gap-2 rounded-md ${
                                    isActive("/signup")
                                        ? "bg-neutral text-neutral-content"
                                        : ""
                                }`}
                            >
                                <FaUser className="text-lg" />
                                Signup
                            </Link>
                        </li>
                    </ul>
                )}
            </div>
        </div>
    );
}

export default Header;

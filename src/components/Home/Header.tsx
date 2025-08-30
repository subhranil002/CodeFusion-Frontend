import {
    FaArrowRight,
    FaCode,
    FaDoorOpen,
    FaKey,
    FaUser,
} from "react-icons/fa";
import { FaMessage } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { logout } from "../../redux/slices/AuthSlice";

function Header() {
    const { isLoggedIn } = useSelector((state: any) => state.auth);
    const dispatch: any = useDispatch();

    return (
        <header className="container mx-auto px-4 py-6">
            <nav className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                    <div className="avatar">
                        <div className="w-12 rounded-full bg-gradient-to-r from-primary to-accent text-primary-content p-2">
                            <FaCode className="w-6 h-6" />
                        </div>
                    </div>
                    <span className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                        CodeFusion
                    </span>
                </div>

                <span className="flex gap-2">
                    <Link to="/contact">
                        <button className="btn btn-primary">
                            Contact Us
                            <FaMessage className="ml-2" />
                        </button>
                    </Link>
                    {isLoggedIn ? (
                        <>
                            <button
                                className="btn btn-error"
                                onClick={() => dispatch(logout())}
                            >
                                Logout
                                <FaDoorOpen className="ml-2" />
                            </button>
                            <Link to="/profile">
                                <button className="btn btn-primary">
                                    Profile
                                    <FaUser className="ml-2" />
                                </button>
                            </Link>
                            <Link to="/dashboard">
                                <button className="btn btn-primary group">
                                    Dashboard
                                    <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                                </button>
                            </Link>
                        </>
                    ) : (
                        <Link to="/signin">
                            <button className="btn btn-warning group">
                                Sign In
                                <FaKey className="ml-2 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </Link>
                    )}
                </span>
            </nav>
        </header>
    );
}

export default Header;

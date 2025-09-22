import {
    FaCode,
    FaHome,
    FaSearch,
} from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import HomeLayout from "../layouts/HomeLayout";

function NotFound() {
    const { isLoggedIn } = useSelector((state: any) => state.auth);

    return (
        <HomeLayout>
            <div className="min-h-screen bg-gradient-to-br from-base-100 via-base-100 to-primary/10 flex items-center justify-center py-12 px-4">
                <div className="max-w-4xl mx-auto text-center">
                    {/* Animated 404 Display */}
                    <div className="mb-8 relative">
                        <div className="text-9xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent relative">
                            4
                            <span className="inline-block animate-bounce">
                                <FaCode className="inline text-7xl text-warning mx-2" />
                            </span>
                            4
                        </div>
                    </div>

                    {/* Error Message */}
                    <div className="card bg-base-100 shadow-2xl border border-base-300 max-w-2xl mx-auto mb-8">
                        <div className="card-body p-8">
                            <h1 className="card-title text-3xl font-bold justify-center text-error mb-2">
                                Page Not Found
                            </h1>
                            <p className="text-lg text-base-content/80 mb-6">
                                Oops! The page you're looking for seems to have
                                vanished into the digital void.
                            </p>

                            <div className="bg-base-200 rounded-lg p-4 mb-6 text-left">
                                <div className="font-mono text-sm">
                                    <div className="flex">
                                        <span className="text-base-content/50 w-8">
                                            1
                                        </span>
                                        <span className="text-error">
                                            // Error: 404 - Route not found
                                        </span>
                                    </div>
                                    <div className="flex">
                                        <span className="text-base-content/50 w-8">
                                            2
                                        </span>
                                        <span className="text-warning">
                                            if (page.exists()) {"{"}
                                        </span>
                                    </div>
                                    <div className="flex">
                                        <span className="text-base-content/50 w-8">
                                            3
                                        </span>
                                        <span className="text-success ml-4">
                                            renderPage();
                                        </span>
                                    </div>
                                    <div className="flex">
                                        <span className="text-base-content/50 w-8">
                                            4
                                        </span>
                                        <span className="text-warning">
                                            {"}"} else {"{"}
                                        </span>
                                    </div>
                                    <div className="flex">
                                        <span className="text-base-content/50 w-8">
                                            5
                                        </span>
                                        <span className="text-error ml-4">
                                            show404();
                                        </span>
                                    </div>
                                    <div className="flex">
                                        <span className="text-base-content/50 w-8">
                                            6
                                        </span>
                                        <span className="text-warning">
                                            {"}"}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <p className="text-base-content/70 mb-8">
                                The URL might be incorrect, or the page may have
                                been moved. Let's get you back to coding!
                            </p>

                            {/* Action Buttons */}
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link
                                    to="/"
                                    className="btn btn-primary btn-lg gap-2"
                                >
                                    <FaHome className="text-lg" />
                                    Back to Home
                                </Link>
                                {isLoggedIn && (
                                    <Link
                                        to="/dashboard"
                                        className="btn btn-outline btn-lg gap-2"
                                    >
                                        <FaCode className="text-lg" />
                                        Go to Dashboard
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Helpful Suggestions */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
                        <div className="card bg-base-100 shadow-md border border-base-300">
                            <div className="card-body p-6 text-center">
                                <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                                    <FaSearch className="text-xl text-primary" />
                                </div>
                                <h3 className="font-semibold mb-2">
                                    Check the URL
                                </h3>
                                <p className="text-sm text-base-content/70">
                                    Make sure the web address is spelled
                                    correctly.
                                </p>
                            </div>
                        </div>

                        <div className="card bg-base-100 shadow-md border border-base-300">
                            <div className="card-body p-6 text-center">
                                <div className="bg-secondary/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                                    <FaHome className="text-xl text-secondary" />
                                </div>
                                <h3 className="font-semibold mb-2">
                                    Navigate from Home
                                </h3>
                                <p className="text-sm text-base-content/70">
                                    Use the main navigation to find what you
                                    need.
                                </p>
                            </div>
                        </div>

                        <div className="card bg-base-100 shadow-md border border-base-300">
                            <div className="card-body p-6 text-center">
                                <div className="bg-accent/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                                    <FaCode className="text-xl text-accent" />
                                </div>
                                <h3 className="font-semibold mb-2">
                                    Get Coding
                                </h3>
                                <p className="text-sm text-base-content/70">
                                    Return to your dashboard and start
                                    collaborating.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Support Link */}
                    <div className="mt-8 text-base-content/60">
                        <p>
                            Still having trouble?{" "}
                            <Link to="/contact" className="link link-primary">
                                Contact our support team
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </HomeLayout>
    );
}

export default NotFound;

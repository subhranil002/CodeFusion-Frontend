import {
    FaGithub,
    FaHeart,
    FaLinkedin,
    FaTerminal,
    FaTwitter,
    FaYoutube,
} from "react-icons/fa";
import { Link } from "react-router-dom";

import Logo from "../assets/images/logo.png";

function Footer() {
    const footerLinks = [
        {
            title: "Product",
            items: ["Features", "Pricing", "Documentation", "API", "Templates"],
        },
        {
            title: "Company",
            items: ["About", "Blog", "Careers", "Contact", "Press"],
        },
        {
            title: "Support",
            items: [
                "Help Center",
                "Community",
                "Status",
                "Security",
                "Feedback",
            ],
        },
    ];

    return (
        <footer className="bg-base-300 pt-16 pb-8 border-t border-base-content/10 px-10">
            <div className="container mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-5 gap-8 mb-12">
                    {/* Brand Section */}
                    <div className="md:col-span-2 lg:col-span-2">
                        <div className="flex items-center space-x-3 mb-6">
                            <Link to="/" className="flex items-center gap-2">
                                <img
                                    src={Logo}
                                    alt="Logo"
                                    className="w-8 h-8 md:w-10 md:h-10"
                                />
                                <span className="text-xl md:text-2xl font-bold">
                                    CodeFusion
                                </span>
                            </Link>
                        </div>
                        <p className="text-base-content/80 mb-6 text-lg">
                            The ultimate collaborative coding platform for
                            modern development teams.
                        </p>
                        <div className="flex space-x-2 mb-6">
                            <button className="btn btn-circle btn-ghost hover:bg-base-200 hover:text-primary">
                                <FaTwitter className="text-xl" />
                            </button>
                            <button className="btn btn-circle btn-ghost hover:bg-base-200">
                                <FaGithub className="text-xl" />
                            </button>
                            <button className="btn btn-circle btn-ghost hover:bg-base-200 hover:text-primary">
                                <FaLinkedin className="text-xl" />
                            </button>
                            <button className="btn btn-circle btn-ghost hover:bg-base-200 hover:text-secondary">
                                <FaYoutube className="text-xl" />
                            </button>
                        </div>
                    </div>

                    {/* Links Sections */}
                    {footerLinks.map((section, index) => (
                        <div
                            key={index}
                            className="md:col-span-2 lg:col-span-1"
                        >
                            <h3 className="font-bold text-lg mb-4 text-base-content flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-primary"></div>
                                {section.title}
                            </h3>
                            <ul className="space-y-3 text-base-content/80">
                                {section.items.map((item, idx) => (
                                    <li key={idx}>
                                        <button
                                            className="hover:text-secondary transition-colors flex items-center gap-2 group cursor-pointer"
                                        >
                                            <span className="group-hover:translate-x-1 transition-transform">
                                                <FaTerminal className="text-xs opacity-70" />
                                            </span>
                                            {item}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Bottom Section */}
                <div className="border-t border-base-content/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="flex flex-col md:flex-row items-center gap-2 md:gap-6 text-base-content/70">
                        <p>
                            &copy; {new Date().getFullYear()} CodeFusion. All
                            rights reserved.
                        </p>
                        <div className="flex gap-4">
                            <a
                                href="#"
                                className="hover:text-primary transition-colors"
                            >
                                Terms
                            </a>
                            <a
                                href="#"
                                className="hover:text-primary transition-colors"
                            >
                                Privacy
                            </a>
                            <a
                                href="#"
                                className="hover:text-primary transition-colors"
                            >
                                Cookies
                            </a>
                        </div>
                    </div>

                    <div className="text-base-content/70">
                        <span>Made with</span>
                        {" "}
                        <FaHeart className="inline text-error animate-pulse min-w-5" />
                        {" "}
                        <span>
                            by{" "}
                            <a
                                className="link link-warning link-hover font-semibold"
                                href="https://github.com/subhranil002"
                                target="_blank"
                            >
                                Subhranil Chakraborty
                            </a>{" "}
                            for developers
                        </span>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;

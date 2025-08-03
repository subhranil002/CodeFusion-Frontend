import {
    FaCode,
    FaGithub,
    FaLinkedin,
    FaTwitter,
    FaYoutube,
} from "react-icons/fa";

function Footer() {
    return (
        <footer className="bg-base-300 pt-12 pb-8">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
                    <div className="md:col-span-2">
                        <div className="flex items-center space-x-2 mb-4">
                            <div className="avatar">
                                <div className="w-12 rounded-full bg-gradient-to-r from-primary to-accent text-primary-content p-2">
                                    <FaCode className="w-6 h-6" />
                                </div>
                            </div>
                            <span className="text-xl font-bold">
                                CodeFusion
                            </span>
                        </div>
                        <p className="text-base-content/80 mb-4">
                            The ultimate collaborative coding platform for
                            modern development teams.
                        </p>
                        <div className="flex space-x-4">
                            <a
                                href="#"
                                className="btn btn-circle btn-ghost hover:bg-base-200"
                            >
                                <FaTwitter className="text-xl" />
                            </a>
                            <a
                                href="#"
                                className="btn btn-circle btn-ghost hover:bg-base-200"
                            >
                                <FaGithub className="text-xl" />
                            </a>
                            <a
                                href="#"
                                className="btn btn-circle btn-ghost hover:bg-base-200"
                            >
                                <FaLinkedin className="text-xl" />
                            </a>
                            <a
                                href="#"
                                className="btn btn-circle btn-ghost hover:bg-base-200"
                            >
                                <FaYoutube className="text-xl" />
                            </a>
                        </div>
                    </div>

                    {[
                        {
                            title: "Product",
                            items: [
                                "Features",
                                "Pricing",
                                "Documentation",
                                "API",
                            ],
                        },
                        {
                            title: "Company",
                            items: ["About", "Blog", "Careers", "Contact"],
                        },
                        {
                            title: "Support",
                            items: [
                                "Help Center",
                                "Community",
                                "Status",
                                "Security",
                            ],
                        },
                    ].map((section, index) => (
                        <div key={index}>
                            <h3 className="font-semibold text-lg mb-4">
                                {section.title}
                            </h3>
                            <ul className="space-y-2 text-base-content/80">
                                {section.items.map((item, idx) => (
                                    <li key={idx}>
                                        <a
                                            href="#"
                                            className="hover:text-primary transition-colors"
                                        >
                                            {item}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
                <div className="border-t border-base-content/20 mt-8 pt-6 text-center text-base-content/70">
                    <p>
                        &copy; {new Date().getFullYear()} CodeFusion. All rights
                        reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;

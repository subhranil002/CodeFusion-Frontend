import { FaCode, FaLightbulb, FaShieldAlt, FaUsers } from "react-icons/fa";
import { FiZap } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

function Features() {
    const navigate = useNavigate();

    const features = [
        {
            icon: <FaUsers className="w-8 h-8" />,
            title: "Real-time Collaboration",
            desc: "Code together in real-time with your team. See changes instantly and work together seamlessly.",
            color: "primary",
            gradient: "from-primary to-secondary",
        },
        {
            icon: <FiZap className="w-8 h-8" />,
            title: "Lightning Fast Execution",
            desc: "Run code in multiple languages with our integrated Judge0 API. Get results instantly without leaving the editor.",
            color: "accent",
            gradient: "from-accent to-primary",
        },
        {
            icon: <FaShieldAlt className="w-8 h-8" />,
            title: "Secure & Private",
            desc: "Your code is protected with enterprise-grade security. Private rooms ensure confidentiality with role-based access control.",
            color: "success",
            gradient: "from-success to-accent",
        },
        {
            icon: <FaCode className="w-8 h-8" />,
            title: "Multi-Language Support",
            desc: "Code in Python, JavaScript, Java, C++, and more with syntax highlighting and auto-completion.",
            color: "info",
            gradient: "from-info to-success",
        },
        {
            icon: <FaLightbulb className="w-8 h-8" />,
            title: "Intuitive Interface",
            desc: "Designed for developers with a clean, distraction-free interface that works on all devices.",
            color: "warning",
            gradient: "from-warning to-error",
        },
    ];

    return (
        <section className="container mx-auto px-4 py-16 md:py-24 bg-base-100">
            <div className="text-center mb-16">
                <div className="badge badge-outline badge-lg mb-4 p-4">
                    WHY CHOOSE US
                </div>
                <h2 className="text-4xl md:text-5xl font-bold mb-6">
                    Powerful Features for{" "}
                    <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                        Collaborative Coding
                    </span>
                </h2>
                <p className="text-xl text-base-content/80 max-w-3xl mx-auto">
                    CodeFusion is designed by developers for developers, with
                    everything you need to code together in real-time.
                </p>
            </div>

            <div className="flex flex-wrap gap-8 justify-center">
                {features.map((feature: any, index: number) => (
                    <div
                        key={index}
                        className="card bg-base-100 border border-base-300 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group
                        max-w-[350px] lg:max-w-[400px]"
                    >
                        <div className="card-body p-8">
                            <div className={`flex justify-center mb-6`}>
                                <div
                                    className={`p-4 rounded-2xl bg-gradient-to-br ${feature.gradient} text-base-100 shadow-md group-hover:scale-110 transition-transform duration-300`}
                                >
                                    {feature.icon}
                                </div>
                            </div>
                            <h3 className="card-title text-2xl font-bold justify-center text-center mb-4">
                                {feature.title}
                            </h3>
                            <p className="text-base-content/80 text-center">
                                {feature.desc}
                            </p>
                            <div className="card-actions justify-center mt-6"></div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Call to Action */}
            <div className="text-center mt-16">
                <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-3xl p-8 md:p-12 max-w-4xl mx-auto">
                    <h3 className="text-2xl md:text-3xl font-bold mb-4">
                        Ready to Transform Your Coding Experience?
                    </h3>
                    <p className="text-base-content/80 mb-6 max-w-2xl mx-auto">
                        Join thousands of developers who are already using
                        CodeFusion to collaborate, learn, and build amazing
                        projects together.
                    </p>
                    <button
                        className="btn btn-warning btn-lg gap-2"
                        onClick={() => navigate("/dashboard")}
                    >
                        Get Started Free
                        <FiZap className="w-5 h-5" />
                    </button>
                    <p className="text-sm text-base-content/60 mt-4">
                        No credit card required. Start coding in seconds.
                    </p>
                </div>
            </div>
        </section>
    );
}

export default Features;

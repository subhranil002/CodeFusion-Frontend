import { FaGlobe, FaRocket, FaShieldAlt } from "react-icons/fa";

function Features() {
    const features = [
        {
            icon: <FaRocket className="w-8 h-8" />,
            title: "Real-time Collaboration",
            desc: "Code together with your team in real-time with live cursor positions and instant updates.",
            gradient: "from-primary to-secondary",
        },
        {
            icon: <FaShieldAlt className="w-8 h-8" />,
            title: "Secure Environment",
            desc: "Your code is protected with enterprise-grade security and privacy controls.",
            gradient: "from-accent to-primary",
        },
        {
            icon: <FaGlobe className="w-8 h-8" />,
            title: "Multi-language Support",
            desc: "Supports 20+ programming languages with syntax highlighting and auto-completion.",
            gradient: "from-warning to-error",
        },
    ];

    return (
        <section className="max-w-6xl mx-auto px-4 py-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-12">
                Powerful{" "}
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    Features
                </span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {features.map((f, idx) => (
                    <article
                        key={idx}
                        className="card bg-base-100 border border-base-300 shadow-lg group
                       transition-all duration-300 transform hover:shadow-2xl hover:-translate-y-2
                       max-w-full mx-auto"
                        aria-labelledby={`feature-${idx}-title`}
                        role="region"
                    >
                        <div className="card-body items-center text-center p-8">
                            <div
                                className={`p-4 rounded-2xl bg-gradient-to-br ${f.gradient} text-base-100 shadow-md
                           mb-4 inline-flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                                aria-hidden
                            >
                                {f.icon}
                            </div>

                            <h3
                                id={`feature-${idx}-title`}
                                className="card-title text-xl md:text-2xl font-semibold mb-2"
                            >
                                {f.title}
                            </h3>

                            <p className="text-base-content/80 mb-4">
                                {f.desc}
                            </p>
                        </div>
                    </article>
                ))}
            </div>
        </section>
    );
}

export default Features;

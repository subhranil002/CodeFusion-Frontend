import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";

function Hero() {
    return (
        <section className="container mx-auto px-4 py-16 md:py-24 text-center relative">
            <div className="max-w-4xl mx-auto">
                <div className="badge badge-accent badge-lg mb-4 animate-pulse">
                    NEW
                </div>
                <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    Collaborative Coding
                    <br />
                    Made Simple
                </h1>
                <p className="text-xl text-base-content/80 mb-8 max-w-2xl mx-auto">
                    Real-time collaborative code editor that lets you code
                    together with your team, share ideas instantly, and build
                    amazing projects faster.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link to="/dashboard">
                        <button className="btn btn-primary btn-lg gap-2 group">
                            Get Started
                            <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                        </button>
                    </Link>
                    <button className="btn btn-outline btn-lg hover:bg-base-200">
                        Learn More
                    </button>
                </div>
            </div>

            {/* Floating Editor Preview */}
            <div className="mt-16 mx-auto max-w-3xl bg-base-100 border border-base-300 rounded-xl shadow-xl overflow-hidden">
                <div className="flex p-4 bg-base-200">
                    <div className="flex space-x-2">
                        <div className="w-3 h-3 rounded-full bg-error"></div>
                        <div className="w-3 h-3 rounded-full bg-warning"></div>
                        <div className="w-3 h-3 rounded-full bg-success"></div>
                    </div>
                </div>
                <div className="p-6 font-mono text-left">
                    <div className="text-success">// Welcome to CodeFusion</div>
                    <div className="text-accent">function</div>
                    <div className="ml-4">
                        <div className="text-primary">collaborate</div>
                        <div className="ml-4 text-base-content">
                            console.
                            <span className="text-warning">log</span>(
                            <span className="text-secondary">
                                "Hello Team!"
                            </span>
                            );
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Hero;

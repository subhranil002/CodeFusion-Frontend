import { FaArrowRight, FaCode, FaRocket, FaUsers } from "react-icons/fa";
import { Link } from "react-router-dom";

function Hero() {
    return (
        <section className="flex items-center justify-center px-4 py-16 md:py-24 bg-base-200">
            <div className="container mx-10">
                <div className="flex flex-col lg:flex-row items-center gap-12">
                    {/* Left Content */}
                    <div className="flex-1 text-center lg:text-left">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                            Code Together in
                            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                                <br />
                                Real-Time
                            </span>
                        </h1>

                        <p className="text-lg md:text-xl text-base-content/80 mb-8 max-w-2xl mx-auto lg:mx-0">
                            CodeFusion brings developers together with a
                            powerful collaborative editor, multi-language
                            support, and instant code execution. Build amazing
                            projects faster with your team.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12">
                            <Link to="/dashboard">
                                <button className="btn btn-warning btn-lg gap-2 group">
                                    Start Coding
                                    <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                                </button>
                            </Link>
                        </div>

                        {/* Feature Highlights */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl">
                            <div className="flex flex-col items-center lg:items-start p-4 bg-base-100 rounded-lg shadow">
                                <div className="p-3 rounded-full bg-primary/10 mb-2">
                                    <FaCode className="text-2xl text-primary" />
                                </div>
                                <h3 className="font-semibold text-lg">
                                    Multi-Language
                                </h3>
                                <p className="text-sm text-base-content/70 text-center lg:text-left">
                                    Support for 10+ programming languages
                                </p>
                            </div>

                            <div className="flex flex-col items-center lg:items-start p-4 bg-base-100 rounded-lg shadow">
                                <div className="p-3 rounded-full bg-secondary/10 mb-2">
                                    <FaUsers className="text-2xl text-secondary" />
                                </div>
                                <h3 className="font-semibold text-lg">
                                    Real-Time Collaboration
                                </h3>
                                <p className="text-sm text-base-content/70 text-center lg:text-left">
                                    Code together seamlessly
                                </p>
                            </div>

                            <div className="flex flex-col items-center lg:items-start p-4 bg-base-100 rounded-lg shadow">
                                <div className="p-3 rounded-full bg-accent/10 mb-2">
                                    <FaRocket className="text-2xl text-accent" />
                                </div>
                                <h3 className="font-semibold text-lg">
                                    Instant Execution
                                </h3>
                                <p className="text-sm text-base-content/70 text-center lg:text-left">
                                    Run code without leaving the editor
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Right Content - Code Editor Preview */}
                    <div className="flex-1 w-full max-w-2xl">
                        <div className="card bg-base-100 shadow-2xl overflow-hidden">
                            <div className="flex p-4 bg-base-300 justify-between items-center">
                                {/* Top Bar with Circles */}
                                <div className="flex space-x-2">
                                    <div className="w-3 h-3 rounded-full bg-error"></div>
                                    <div className="w-3 h-3 rounded-full bg-warning"></div>
                                    <div className="w-3 h-3 rounded-full bg-success"></div>
                                </div>

                                {/* File Name */}
                                <div className="text-sm font-mono text-base-content/70">
                                    app.js
                                </div>

                                {/* Badge */}
                                <div className="flex gap-2">
                                    <div className="badge badge-sm badge-primary">
                                        3 Online
                                    </div>
                                </div>
                            </div>

                            {/* Code Preview */}
                            <div className="p-6 font-mono text-sm md:text-base bg-base-200">
                                <div className="text-success flex">
                                    <span className="w-8 text-base-content/50">
                                        1
                                    </span>
                                    <span>/* Welcome to CodeFusion */</span>
                                </div>
                                <div className="text-success flex">
                                    <span className="w-8 text-base-content/50">
                                        2
                                    </span>
                                    <span>
                                        // Start coding with your team in
                                        real-time
                                    </span>
                                </div>
                                <div className="flex">
                                    <span className="w-8 text-base-content/50">
                                        3
                                    </span>
                                </div>
                                <div className="text-accent flex">
                                    <span className="w-8 text-base-content/50">
                                        4
                                    </span>
                                    <span>
                                        function collaborativeCoding() {"{"}
                                    </span>
                                </div>
                                <div className="text-warning flex">
                                    <span className="w-8 text-base-content/50">
                                        5
                                    </span>
                                    <span className="ml-8">
                                        const [code, setCode] = useState('');
                                    </span>
                                </div>
                                <div className="flex">
                                    <span className="w-8 text-base-content/50">
                                        6
                                    </span>
                                </div>
                                <div className="text-accent flex">
                                    <span className="w-8 text-base-content/50">
                                        7
                                    </span>
                                    <span className="ml-8">return (</span>
                                </div>
                                <div className="text-secondary flex">
                                    <span className="w-8 text-base-content/50">
                                        8
                                    </span>
                                    <span className="ml-16">&lt;Editor</span>
                                </div>
                                <div className="text-info flex">
                                    <span className="w-8 text-base-content/50">
                                        9
                                    </span>
                                    <span className="ml-20">
                                        value=
                                        {
                                            <span className="text-warning">
                                                {"{"}code{"}"}
                                            </span>
                                        }
                                    </span>
                                </div>
                                <div className="text-info flex">
                                    <span className="w-8 text-base-content/50">
                                        10
                                    </span>
                                    <span className="ml-20">
                                        onChange=
                                        {
                                            <span className="text-warning">
                                                {"{"}setCode{"}"}
                                            </span>
                                        }
                                    </span>
                                </div>
                                <div className="text-info flex">
                                    <span className="w-8 text-base-content/50">
                                        11
                                    </span>
                                    <span className="ml-20">
                                        collaborative=
                                        {
                                            <span className="text-warning">
                                                true
                                            </span>
                                        }
                                    </span>
                                </div>
                                <div className="text-secondary flex">
                                    <span className="w-8 text-base-content/50">
                                        12
                                    </span>
                                    <span className="ml-16">/&gt;</span>
                                </div>
                                <div className="text-accent flex">
                                    <span className="w-8 text-base-content/50">
                                        13
                                    </span>
                                    <span className="ml-8">);</span>
                                </div>
                                <div className="text-accent flex">
                                    <span className="w-8 text-base-content/50">
                                        14
                                    </span>
                                    <span>{"}"}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Hero;

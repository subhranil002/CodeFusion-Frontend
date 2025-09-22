import { FaCode, FaHeadset, FaServer, FaUsers } from "react-icons/fa";

function Stats() {
    return (
        <section className="container mx-auto px-10 py-16 md:py-24">
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                    Trusted by Developers
                    <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                        {" "}
                        Worldwide
                    </span>
                </h2>
                <p className="text-lg text-base-content/70 max-w-2xl mx-auto">
                    Join thousands of developers who are already collaborating
                    and building amazing projects with CodeFusion
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="card bg-base-100 shadow-lg hover:shadow-xl transition-all duration-300 group">
                    <div className="card-body items-center text-center p-6">
                        <div className="rounded-full bg-primary/10 p-4 mb-4 group-hover:bg-primary/20 transition-colors">
                            <FaUsers className="text-3xl text-primary" />
                        </div>
                        <div className="text-4xl font-bold text-primary mb-2">
                            10K+
                        </div>
                        <p className="text-base-content/80 font-medium">
                            Active Developers
                        </p>
                        <div className="badge badge-primary badge-sm mt-2">
                            +25% this month
                        </div>
                    </div>
                </div>

                <div className="card bg-base-100 shadow-lg hover:shadow-xl transition-all duration-300 group">
                    <div className="card-body items-center text-center p-6">
                        <div className="rounded-full bg-accent/10 p-4 mb-4 group-hover:bg-accent/20 transition-colors">
                            <FaCode className="text-3xl text-accent" />
                        </div>
                        <div className="text-4xl font-bold text-accent mb-2">
                            50K+
                        </div>
                        <p className="text-base-content/80 font-medium">
                            Coding Sessions
                        </p>
                        <div className="badge badge-accent badge-sm mt-2">
                            15K+ this month
                        </div>
                    </div>
                </div>

                <div className="card bg-base-100 shadow-lg hover:shadow-xl transition-all duration-300 group">
                    <div className="card-body items-center text-center p-6">
                        <div className="rounded-full bg-success/10 p-4 mb-4 group-hover:bg-success/20 transition-colors">
                            <FaServer className="text-3xl text-success" />
                        </div>
                        <div className="text-4xl font-bold text-success mb-2">
                            99.9%
                        </div>
                        <p className="text-base-content/80 font-medium">
                            Uptime
                        </p>
                        <div className="badge badge-success badge-sm mt-2">
                            99.9% this month
                        </div>
                    </div>
                </div>

                <div className="card bg-base-100 shadow-lg hover:shadow-xl transition-all duration-300 group">
                    <div className="card-body items-center text-center p-6">
                        <div className="rounded-full bg-warning/10 p-4 mb-4 group-hover:bg-warning/20 transition-colors">
                            <FaHeadset className="text-3xl text-warning" />
                        </div>
                        <div className="text-4xl font-bold text-warning mb-2">
                            24/7
                        </div>
                        <p className="text-base-content/80 font-medium">
                            Support
                        </p>
                        <div className="badge badge-warning badge-sm mt-2">
                            Avg. response: {"<"} 5min
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Stats;

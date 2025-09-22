import { FaCode, FaDoorOpen, FaRocket, FaUserFriends } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function HowItWorks() {
    const navigate = useNavigate();

    return (
        <section className="py-10 md:py-24 bg-base-200/50">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                        How It{" "}
                        <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                            Works
                        </span>
                    </h2>
                    <div className="divider w-24 mx-auto"></div>
                    <p className="text-lg md:text-xl text-base-content/80 max-w-2xl mx-auto">
                        Get started in minutes with our simple three-step
                        process to collaborative coding excellence.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4 lg:gap-8 max-w-6xl mx-auto">
                    <div className="flex flex-col items-center group">
                        {/* Step Number and Icon */}
                        <div className="relative mb-6 w-24 h-24 rounded-full flex items-center justify-center bg-primary text-primary-content shadow-lg transform group-hover:scale-110 transition-all duration-300">
                            <div className="text-4xl">
                                <FaDoorOpen />
                            </div>
                            <div className="absolute -top-2 -right-2 badge badge-lg badge-primary border-2 border-base-100">
                                1
                            </div>
                        </div>

                        {/* Content */}
                        <div className="card bg-base-100 shadow-xl h-full w-full text-center transform group-hover:-translate-y-2 transition-all duration-300">
                            <div className="card-body p-6 md:p-4 lg:p-6">
                                <h3 className="text-xl font-bold mb-2">
                                    Create a Room
                                </h3>
                                <p className="text-base-content/80">
                                    Click 'Create New Room' to generate a unique
                                    6-character room ID that you can share with
                                    your team.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col items-center group">
                        {/* Step Number and Icon */}
                        <div className="relative mb-6 w-24 h-24 rounded-full flex items-center justify-center bg-secondary text-secondary-content shadow-lg transform group-hover:scale-110 transition-all duration-300">
                            <div className="text-4xl">
                                <FaUserFriends />
                            </div>
                            <div className="absolute -top-2 -right-2 badge badge-lg badge-secondary border-2 border-base-100">
                                2
                            </div>
                        </div>

                        {/* Content */}
                        <div className="card bg-base-100 shadow-xl h-full w-full text-center transform group-hover:-translate-y-2 transition-all duration-300">
                            <div className="card-body p-6 md:p-4 lg:p-6">
                                <h3 className="text-xl font-bold mb-2">
                                    Invite Your Team
                                </h3>
                                <p className="text-base-content/80">
                                    Share the room ID with your teammates. They
                                    can join instantly using the simple room
                                    code.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col items-center group">
                        {/* Step Number and Icon */}
                        <div className="relative mb-6 w-24 h-24 rounded-full flex items-center justify-center bg-accent text-accent-content shadow-lg transform group-hover:scale-110 transition-all duration-300">
                            <div className="text-4xl">
                                <FaCode />
                            </div>
                            <div className="absolute -top-2 -right-2 badge badge-lg badge-accent border-2 border-base-100">
                                3
                            </div>
                        </div>

                        {/* Content */}
                        <div className="card bg-base-100 shadow-xl h-full w-full text-center transform group-hover:-translate-y-2 transition-all duration-300">
                            <div className="card-body p-6 md:p-4 lg:p-6">
                                <h3 className="text-xl font-bold mb-2">
                                    Start Coding
                                </h3>
                                <p className="text-base-content/80">
                                    Begin collaborating immediately. See
                                    real-time changes, chat, and build amazing
                                    projects together.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Redesigned CTA Section */}
                <div className="text-center mt-16">
                    <div className="card bg-gradient-to-br from-primary/20 to-accent/20 border-2 border-primary/30 shadow-2xl max-w-2xl mx-auto overflow-hidden">
                        <div className="card-body py-10 px-6 md:px-10">
                            <div className="flex justify-center mb-4">
                                <div className="animate-bounce bg-primary text-primary-content rounded-full p-4">
                                    <FaRocket className="text-2xl" />
                                </div>
                            </div>
                            <h3 className="text-2xl md:text-3xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                                Ready to Start Coding Together?
                            </h3>
                            <p className="mb-6 text-base-content/80 text-lg">
                                Join thousands of developers who are already
                                collaborating on CodeFusion
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <button
                                    className="btn btn-warning btn-lg gap-2"
                                    onClick={() => navigate("/dashboard")}
                                >
                                    <FaRocket />
                                    Get Started Now
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default HowItWorks;

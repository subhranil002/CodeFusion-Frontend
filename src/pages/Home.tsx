import {
    FaArrowRight,
    FaCode,
    FaRocket,
    FaShieldAlt,
    FaStar,
    FaUsers,
} from "react-icons/fa";
import { FiZap } from "react-icons/fi";
import { Link } from "react-router-dom";

function Home() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-base-100 to-base-200">
            {/* Header */}
            <header className="container mx-auto px-4 py-6">
                <nav className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <div className="p-2 bg-gradient-to-r from-primary to-accent text-primary-content rounded-lg">
                            <FaCode className="w-6 h-6" />
                        </div>
                        <span className="text-xl font-bold">CodeFusion</span>
                    </div>
                    <Link to="/dashboard">
                        <button className="btn btn-outline">
                            Dashboard
                            <FaArrowRight />
                        </button>
                    </Link>
                </nav>
            </header>

            {/* Hero Section */}
            <section className="container mx-auto px-4 py-20 text-center">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                        Collaborative Coding
                        <br />
                        Made Simple
                    </h1>
                    <p className="text-xl text-base-content/70 mb-8 max-w-2xl mx-auto">
                        Real-time collaborative code editor that lets you code
                        together with your team, share ideas instantly, and
                        build amazing projects faster.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link to="/dashboard">
                            <button className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 btn btn-lg">
                                Get Started
                                <FaArrowRight />
                            </button>
                        </Link>
                        <button className="btn btn-outline btn-lg">
                            Learn More
                        </button>
                    </div>
                </div>
            </section>

            {/* Features */}
            <section className="container mx-auto px-4 py-16">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        Why Choose CodeFusion?
                    </h2>
                    <p className="text-lg text-base-content/70 max-w-2xl mx-auto">
                        Experience the future of collaborative development with
                        our cutting-edge features.
                    </p>
                </div>
                <div className="grid md:grid-cols-3 gap-8">
                    <div className="card text-center border border-base-300 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                        <div className="card-title">
                            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                                <FaUsers className="w-6 h-6 text-primary" />
                            </div>
                            <h3>Real-time Collaboration</h3>
                        </div>
                        <div className="card-body">
                            <p className="text-base-content/70">
                                Code together in real-time with your team. See
                                changes instantly and work together seamlessly.
                            </p>
                        </div>
                    </div>

                    <div className="card text-center border border-base-300 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                        <div className="card-title">
                            <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                                <FiZap className="w-6 h-6 text-accent" />
                            </div>
                            <h3>Lightning Fast</h3>
                        </div>
                        <div className="card-body">
                            <p className="text-base-content/70">
                                Optimized for speed with minimal latency. Focus
                                on coding, not waiting for updates.
                            </p>
                        </div>
                    </div>

                    <div className="card text-center border border-base-300 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                        <div className="card-title">
                            <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                                <FaShieldAlt className="w-6 h-6 text-success" />
                            </div>
                            <h3>Secure & Private</h3>
                        </div>
                        <div className="card-body">
                            <p className="text-base-content/70">
                                Your code is protected with enterprise-grade
                                security. Private rooms ensure confidentiality.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section className="bg-base-200/50 py-20">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            How It Works
                        </h2>
                        <p className="text-lg text-base-content/70 max-w-2xl mx-auto">
                            Get started in minutes with our simple three-step
                            process.
                        </p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                        <div className="text-center">
                            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
                                <span className="text-2xl font-bold text-primary-foreground">
                                    1
                                </span>
                            </div>
                            <h3 className="text-xl font-semibold mb-4">
                                Create a Room
                            </h3>
                            <p className="text-base-content/70">
                                Click "Create New Room" to generate a unique
                                4-character room ID that you can share with your
                                team.
                            </p>
                        </div>
                        <div className="text-center">
                            <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-6">
                                <span className="text-2xl font-bold text-primary-foreground">
                                    2
                                </span>
                            </div>
                            <h3 className="text-xl font-semibold mb-4">
                                Invite Your Team
                            </h3>
                            <p className="text-base-content/70">
                                Share the room ID with your teammates. They can
                                join instantly using the simple room code.
                            </p>
                        </div>
                        <div className="text-center">
                            <div className="w-16 h-16 bg-success rounded-full flex items-center justify-center mx-auto mb-6">
                                <span className="text-2xl font-bold text-primary-foreground">
                                    3
                                </span>
                            </div>
                            <h3 className="text-xl font-semibold mb-4">
                                Start Coding
                            </h3>
                            <p className="text-base-content/70">
                                Begin collaborating immediately. See real-time
                                changes, chat, and build amazing projects
                                together.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="container mx-auto px-4 py-20">
                <div className="grid md:grid-cols-4 gap-8 text-center">
                    <div>
                        <div className="text-4xl font-bold text-primary mb-2">
                            10K+
                        </div>
                        <p className="text-base-content/70">
                            Active Developers
                        </p>
                    </div>
                    <div>
                        <div className="text-4xl font-bold text-accent mb-2">
                            50K+
                        </div>
                        <p className="text-base-content/70">Coding Sessions</p>
                    </div>
                    <div>
                        <div className="text-4xl font-bold text-success mb-2">
                            99.9%
                        </div>
                        <p className="text-base-content/70">Uptime</p>
                    </div>
                    <div>
                        <div className="text-4xl font-bold text-warning mb-2">
                            24/7
                        </div>
                        <p className="text-base-content/70">Support</p>
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="bg-base-200/50 py-20">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            What Developers Say
                        </h2>
                        <p className="text-lg text-base-content/70">
                            Join thousands of developers who love CodeFusion.
                        </p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        <div className="card border border-base-300">
                            <div className="card-body p-6">
                                <div className="flex mb-4">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <FaStar
                                            key={star}
                                            className="w-5 h-5 fill-warning text-warning"
                                        />
                                    ))}
                                </div>
                                <p className="text-base-content/80 mb-4">
                                    "CodeFusion has revolutionized how our team
                                    collaborates. The real-time editing is
                                    seamless and the interface is incredibly
                                    intuitive."
                                </p>
                                <div className="flex items-center">
                                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mr-3">
                                        <span className="text-sm font-medium text-primary">
                                            SM
                                        </span>
                                    </div>
                                    <div>
                                        <p className="font-medium">
                                            Sarah Miller
                                        </p>
                                        <p className="text-sm text-base-content/60">
                                            Senior Developer at TechCorp
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="card border border-base-300">
                            <div className="card-body p-6">
                                <div className="flex mb-4">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <FaStar
                                            key={star}
                                            className="w-5 h-5 fill-warning text-warning"
                                        />
                                    ))}
                                </div>
                                <p className="text-base-content/80 mb-4">
                                    "The perfect tool for pair programming. Low
                                    latency, great features, and it just works.
                                    Our productivity has increased
                                    significantly."
                                </p>
                                <div className="flex items-center">
                                    <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center mr-3">
                                        <span className="text-sm font-medium text-accent">
                                            MJ
                                        </span>
                                    </div>
                                    <div>
                                        <p className="font-medium">
                                            Mike Johnson
                                        </p>
                                        <p className="text-sm text-base-content/60">
                                            Lead Engineer at StartupXYZ
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="card border border-base-300">
                            <div className="card-body p-6">
                                <div className="flex mb-4">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <FaStar
                                            key={star}
                                            className="w-5 h-5 fill-warning text-warning"
                                        />
                                    ))}
                                </div>
                                <p className="text-base-content/80 mb-4">
                                    "Simple to set up, powerful to use.
                                    CodeFusion makes remote collaboration feel
                                    like we're in the same room."
                                </p>
                                <div className="flex items-center">
                                    <div className="w-10 h-10 bg-success/10 rounded-full flex items-center justify-center mr-3">
                                        <span className="text-sm font-medium text-success">
                                            AL
                                        </span>
                                    </div>
                                    <div>
                                        <p className="font-medium">Alex Lee</p>
                                        <p className="text-sm text-base-content/60">
                                            Full Stack Developer
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="container mx-auto px-4 py-20">
                <div className="max-w-4xl mx-auto text-center bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl p-12">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">
                        Ready to Transform Your Coding Experience?
                    </h2>
                    <p className="text-lg text-base-content/70 mb-8 max-w-2xl mx-auto">
                        Join thousands of developers who are already
                        collaborating more effectively with CodeFusion.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link to="/dashboard">
                            <button className="btn btn-lg bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-lg px-8">
                                Start Coding Together
                                <FaRocket className="w-5 h-5 ml-2" />
                            </button>
                        </Link>
                        <button className="btn btn-lg">
                            View Documentation
                        </button>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-base-300 py-12">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-4 gap-8">
                        <div>
                            <div className="flex items-center space-x-2 mb-4">
                                <div className="p-2 bg-gradient-to-r from-primary to-accent text-primary-content rounded-lg">
                                    <FaCode className="w-6 h-6" />
                                </div>
                                <span className="text-xl font-bold">
                                    CodeFusion
                                </span>
                            </div>
                            <p className="text-base-content/70">
                                The ultimate collaborative coding platform for
                                modern development teams.
                            </p>
                        </div>
                        <div>
                            <h3 className="font-semibold mb-4">Product</h3>
                            <ul className="space-y-2 text-base-content/70">
                                <li>
                                    <a
                                        href="#"
                                        className="hover:text-primary transition-colors"
                                    >
                                        Features
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="hover:text-primary transition-colors"
                                    >
                                        Pricing
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="hover:text-primary transition-colors"
                                    >
                                        Documentation
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="hover:text-primary transition-colors"
                                    >
                                        API
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-semibold mb-4">Company</h3>
                            <ul className="space-y-2 text-base-content/70">
                                <li>
                                    <a
                                        href="#"
                                        className="hover:text-primary transition-colors"
                                    >
                                        About
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="hover:text-primary transition-colors"
                                    >
                                        Blog
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="hover:text-primary transition-colors"
                                    >
                                        Careers
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="hover:text-primary transition-colors"
                                    >
                                        Contact
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-semibold mb-4">Support</h3>
                            <ul className="space-y-2 text-base-content/70">
                                <li>
                                    <a
                                        href="#"
                                        className="hover:text-primary transition-colors"
                                    >
                                        Help Center
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="hover:text-primary transition-colors"
                                    >
                                        Community
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="hover:text-primary transition-colors"
                                    >
                                        Status
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="hover:text-primary transition-colors"
                                    >
                                        Security
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="border-t border-base-content/20 mt-8 pt-8 text-center text-base-content/60">
                        <p>&copy; 2024 CodeFusion. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default Home;

import {
    FaCheck,
    FaCrown,
    FaInfinity,
    FaRupeeSign,
    FaShieldAlt,
    FaStar,
} from "react-icons/fa";
import { FiZap } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

import HomeLayout from "../../layouts/HomeLayout";

function SubscribePro() {
    const navigate = useNavigate();

    const proFeatures = [
        {
            icon: <FaInfinity className="w-6 h-6" />,
            title: "Unlimited Everything",
            description: "Code runs, AI interactions, and collaborative rooms",
        },
        {
            icon: <FiZap className="w-6 h-6" />,
            title: "Highest Priority",
            description: "Your code runs first in the execution queue",
        },
        {
            icon: <FaShieldAlt className="w-6 h-6" />,
            title: "24/7 Priority Support",
            description: "Direct line to our technical team",
        },
        {
            icon: <FaStar className="w-6 h-6" />,
            title: "Early Access",
            description: "Be the first to try new features and tools",
        },
    ];

    const enterpriseFeatures = [
        "Custom SLAs & uptime guarantees",
        "SSO & advanced security features",
        "Dedicated account manager",
        "Custom billing and invoicing",
        "On-premise deployment options",
        "Training and onboarding support",
    ];

    const handleSubscribe = () => {
        // Simulate subscription process
        console.log("Subscribing to Pro plan...");
        // In real app, this would integrate with payment gateway
        setTimeout(() => {
            alert("Subscribed to Pro plan!");
        }, 1500);
    };

    return (
        <HomeLayout>
            <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 dark:from-gray-900 dark:to-purple-900 py-12">
                <div className="container mx-auto px-4 max-w-6xl">
                    {/* Header Section */}
                    <div className="text-center mb-12">
                        <div className="badge badge-accent badge-lg mb-4 p-4 text-lg">
                            PREMIUM
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
                            Go <span className="text-accent">Pro</span>
                        </h1>
                        <p className="text-xl text-white max-w-2xl mx-auto">
                            For professionals, teams, and organizations that
                            demand the best collaborative coding experience.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                        {/* Pro Pricing Card */}
                        <div className="lg:col-span-2">
                            <div className="card bg-gradient-to-br from-accent to-purple-600 shadow-2xl text-neutral">
                                <div className="card-body p-8">
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className="p-3 bg-white/20 rounded-2xl">
                                            <FaCrown className="w-8 h-8" />
                                        </div>
                                        <div>
                                            <h2 className="text-2xl font-bold">
                                                Pro Plan
                                            </h2>
                                            <p className="opacity-90">
                                                Maximum power and flexibility
                                            </p>
                                        </div>
                                    </div>

                                    <div className="mb-6">
                                        <div className="flex items-baseline gap-2">
                                            <span className="text-5xl font-bold">
                                                <FaRupeeSign className="inline w-4 h-4" />
                                                999
                                            </span>
                                            <span className="text-lg opacity-90">
                                                /month
                                            </span>
                                        </div>
                                        <p className="opacity-80 mt-2">
                                            Billed monthly • Cancel anytime
                                        </p>
                                    </div>

                                    {/* Pro Features */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                                        {proFeatures.map((feature, index) => (
                                            <div
                                                key={index}
                                                className="flex items-start gap-3 p-3 bg-white/10 rounded-lg"
                                            >
                                                <FaCheck className="w-5 h-5 mt-1 flex-shrink-0" />
                                                <div>
                                                    <h4 className="font-semibold">
                                                        {feature.title}
                                                    </h4>
                                                    <p className="text-sm opacity-90">
                                                        {feature.description}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <button
                                        onClick={handleSubscribe}
                                        className="btn btn-warning sm:btn-lg w-full hover:scale-105 transition-transform gap-2"
                                    >
                                        <FaCrown className="min-w-5 min-h-5" />
                                        Subscribe to Pro
                                    </button>

                                    <p className="text-center text-sm opacity-80 mt-4">
                                        30-day money-back guarantee • Priority
                                        onboarding included
                                    </p>
                                </div>
                            </div>

                            {/* Comparison Table */}
                            <div className="card bg-base-100 shadow-lg mt-8">
                                <div className="card-body">
                                    <h3 className="text-xl font-bold mb-4">
                                        Complete Feature Comparison
                                    </h3>
                                    <div className="overflow-x-auto">
                                        <table className="table table-zebra w-full">
                                            <thead>
                                                <tr>
                                                    <th>Feature</th>
                                                    <th className="text-center">
                                                        Free
                                                    </th>
                                                    <th className="text-center text-primary">
                                                        Basic
                                                    </th>
                                                    <th className="text-center text-accent">
                                                        Pro
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>Collaborative Rooms</td>
                                                    <td className="text-center">
                                                        5
                                                    </td>
                                                    <td className="text-center text-primary font-semibold">
                                                        Unlimited
                                                    </td>
                                                    <td className="text-center text-accent font-semibold">
                                                        Unlimited
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>Daily Code Runs</td>
                                                    <td className="text-center">
                                                        10
                                                    </td>
                                                    <td className="text-center text-primary font-semibold">
                                                        50
                                                    </td>
                                                    <td className="text-center text-accent font-semibold">
                                                        Unlimited
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>AI Interactions</td>
                                                    <td className="text-center">
                                                        5
                                                    </td>
                                                    <td className="text-center text-primary font-semibold">
                                                        25
                                                    </td>
                                                    <td className="text-center text-accent font-semibold">
                                                        Unlimited
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        Compilation Priority
                                                    </td>
                                                    <td className="text-center">
                                                        Standard
                                                    </td>
                                                    <td className="text-center text-primary font-semibold">
                                                        High
                                                    </td>
                                                    <td className="text-center text-accent font-semibold">
                                                        Highest
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>Support</td>
                                                    <td className="text-center">
                                                        Community
                                                    </td>
                                                    <td className="text-center text-primary font-semibold">
                                                        Email
                                                    </td>
                                                    <td className="text-center text-accent font-semibold">
                                                        24/7 Priority
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Enterprise Card */}
                        <div className="card bg-base-100 shadow-2xl border border-warning/20">
                            <div className="card-body p-6">
                                <div className="text-center mb-6">
                                    <div className="badge badge-warning badge-lg mb-3">
                                        ENTERPRISE
                                    </div>
                                    <h3 className="text-2xl font-bold">
                                        Need More?
                                    </h3>
                                    <p className="text-base-content/70">
                                        Custom solutions for large organizations
                                    </p>
                                </div>

                                <div className="space-y-4 mb-6">
                                    {enterpriseFeatures.map(
                                        (feature, index) => (
                                            <div
                                                key={index}
                                                className="flex items-start gap-3"
                                            >
                                                <FaCheck className="w-5 h-5 text-warning mt-1 flex-shrink-0" />
                                                <span className="text-sm">
                                                    {feature}
                                                </span>
                                            </div>
                                        )
                                    )}
                                </div>

                                <button
                                    onClick={() => navigate("/contact")}
                                    className="btn btn-warning btn-outline w-full gap-2"
                                >
                                    Contact Sales
                                </button>

                                <div className="mt-6 p-4 bg-accent/10 rounded-lg">
                                    <p className="text-sm text-center font-semibold">
                                        Already have a team?
                                        <br />
                                        <span className="link link-warning">
                                            Volume discounts available
                                        </span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Success Stories */}
                    <div className="max-w-4xl mx-auto mt-16">
                        <h2 className="text-4xl font-bold text-center mb-8 text-white">
                            Pro Power in Action
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="card bg-base-100 shadow-lg">
                                <div className="card-body text-center">
                                    <div className="text-3xl font-bold text-accent mb-2">
                                        10x
                                    </div>
                                    <p>Faster code execution for Pro users</p>
                                </div>
                            </div>
                            <div className="card bg-base-100 shadow-lg">
                                <div className="card-body text-center">
                                    <div className="text-3xl font-bold text-accent mb-2">
                                        24/7
                                    </div>
                                    <p>Average support response time</p>
                                </div>
                            </div>
                            <div className="card bg-base-100 shadow-lg">
                                <div className="card-body text-center">
                                    <div className="text-3xl font-bold text-accent mb-2">
                                        99.9%
                                    </div>
                                    <p>Uptime SLA for Pro subscribers</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* CTA Section */}
                    <div className="text-center mt-16">
                        <div className="bg-gradient-to-r from-accent/10 to-purple-600/10 rounded-3xl p-8 md:p-12 max-w-4xl mx-auto">
                            <h3 className="text-2xl md:text-3xl font-bold mb-4 text-white">
                                Ready to Code Like a Pro?
                            </h3>
                            <p className="text-white mb-6 max-w-2xl mx-auto">
                                Join thousands of professional developers and
                                teams who trust CodeFusion Pro for their most
                                important projects.
                            </p>
                            <button
                                onClick={handleSubscribe}
                                className="btn btn-accent sm:btn-lg gap-2"
                            >
                                <FaCrown className="min-w-5 min-h-5" />
                                Start Pro Trial - 7 Days Free
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </HomeLayout>
    );
}

export default SubscribePro;

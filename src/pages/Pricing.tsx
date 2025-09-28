import {
    FaCheck,
    FaCrown,
    FaRocket,
    FaRupeeSign,
    FaStar,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import HomeLayout from "../layouts/HomeLayout";

function Pricing() {
    const navigate = useNavigate();

    const plans = [
        {
            name: "Free",
            price: "0",
            period: "Per month",
            description:
                "Perfect to try things out and for small personal projects",
            features: [
                "Up to 5 collaborative rooms",
                "Basic editor tools",
                "10 code runs per day",
                "5 AI interactions per day",
                "Standard compilation priority",
                "Community support",
            ],
            button: "Start Free",
            buttonAction: "/dashboard",
            popular: false,
            icon: <FaStar className="text-yellow-500" />,
        },
        {
            name: "Basic",
            price: "499",
            period: "Per month",
            description: "Affordable plan for active learners and small teams",
            features: [
                "Unlimited collaborative rooms",
                "Advanced editor tools",
                "50 code runs per day",
                "25 AI interactions per day",
                "Higher compilation priority",
                "Email support with faster response",
            ],
            button: "Choose Basic",
            buttonAction: "/subscribe-basic",
            popular: true,
            icon: <FaRocket className="text-primary" />,
        },
        {
            name: "Pro",
            price: "999",
            period: "Per month",
            description: "Full power for professionals and big teams",
            features: [
                "Unlimited collaborative rooms",
                "All advanced editor tools",
                "Unlimited code runs",
                "Unlimited AI interactions",
                "Highest compilation priority",
                "24/7 priority support & early access to features",
            ],
            button: "Go Pro",
            buttonAction: "/subscribe-pro",
            popular: false,
            icon: <FaCrown className="text-purple-500" />,
        },
    ];

    const faqs = [
        {
            question: "Can I switch plans at any time?",
            answer: "Yes, you can upgrade or downgrade your plan whenever you like. Upgrades take effect immediately, while downgrades apply at the end of your billing cycle.",
        },
        {
            question: "What payment methods are supported?",
            answer: "We accept all payment methods. For enterprise customers, we also support invoicing.",
        },
        {
            question: "Do you offer refunds?",
            answer: "We offer refunds on a case-by-case basis. If you believe you’re eligible, contact support within 14 days of purchase and we’ll review your request promptly.",
        },
        {
            question: "Do I keep my projects if I downgrade to Free?",
            answer: "Yes, all your projects remain accessible. However, features beyond the Free plan limits will be restricted.",
        },
        {
            question: "Is support included in all plans?",
            answer: "Community support is included in the Free plan. Paid plans include priority support, with Pro offering 24/7 support.",
        },
        {
            question:
                "Are there discounts for students, educators, or non-profits?",
            answer: "We offer special pricing for eligible students, educators, and non-profits. Apply via our verification form or contact sales for details.",
        },
        {
            question: "Do you offer custom or enterprise plans?",
            answer: "Yes - for larger teams or custom requirements we offer enterprise plans with dedicated support, SSO, custom billing, and SLAs. Contact sales@codefusion.com to discuss options.",
        },
        {
            question:
                "What security and privacy measures do you have in place?",
            answer: "We use industry-standard encryption for data in transit and at rest, role-based access controls, and regular backups. For privacy details, see our Privacy Policy and security documentation.",
        },
    ];

    return (
        <HomeLayout>
            <div className="container mx-auto px-4 py-10 sm:px-10 max-w-6xl">
                {/* Header Section */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">
                        Simple,{" "}
                        <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                            Transparent{" "}
                        </span>
                        Pricing
                    </h1>
                    <p className="text-lg text-base-content/80 max-w-2xl mx-auto">
                        Choose the plan that works best for you and your team.
                        All plans include core collaboration features.
                    </p>
                </div>

                {/* Pricing Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {plans.map((plan, index) => (
                        <div
                            key={index}
                            className={`card rounded-lg shadow-lg transition-all duration-300 hover:scale-105
                                    ${
                                        plan.popular
                                            ? "border-2 border-secondary transform -translate-y-2"
                                            : "border border-base-300"
                                    }`}
                        >
                            <div className="card-body p-6">
                                {/* Popular badge */}
                                {plan.popular && (
                                    <div className="badge badge-secondary badge-lg py-3 px-4 font-bold absolute top-0 right-4 -translate-y-1/2">
                                        MOST POPULAR
                                    </div>
                                )}

                                {/* Plan icon and name */}
                                <div className="flex items-center gap-2 mb-4">
                                    <div className="text-2xl">{plan.icon}</div>
                                    <h2 className="card-title text-2xl font-bold">
                                        {plan.name}
                                    </h2>
                                </div>

                                {/* Price */}
                                <div className="mb-4">
                                    <span className="text-4xl font-bold">
                                        <FaRupeeSign className="inline w-4 h-4" />
                                        {plan.price}
                                    </span>
                                    <span className="text-base-content/70">
                                        /{plan.period}
                                    </span>
                                </div>

                                {/* Description */}
                                <p className="text-base-content/70 mb-6">
                                    {plan.description}
                                </p>

                                {/* Features list */}
                                <div className="space-y-3 mb-8">
                                    {plan.features.map(
                                        (feature, featureIndex) => (
                                            <div
                                                key={featureIndex}
                                                className="flex items-start gap-2"
                                            >
                                                <FaCheck className="text-success mt-1 flex-shrink-0" />
                                                <span>{feature}</span>
                                            </div>
                                        )
                                    )}
                                </div>

                                {/* Button */}
                                <button
                                    className={`btn w-full gap-2 ${
                                        plan.popular
                                            ? "btn-primary"
                                            : "btn-outline"
                                    }`}
                                    onClick={() => navigate(plan.buttonAction)}
                                >
                                    {plan.button}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* FAQ Section */}
                <div className="max-w-3xl mx-auto mt-16">
                    <h2 className="text-2xl font-bold text-center mb-8">
                        Frequently Asked Questions
                    </h2>
                    <div className="space-y-4">
                        {faqs.map((faq, idx) => (
                            <div
                                key={idx}
                                className="collapse collapse-arrow bg-base-200"
                            >
                                <input type="checkbox" />
                                <div className="collapse-title text-lg font-medium">
                                    {faq.question}
                                </div>
                                <div className="collapse-content">
                                    <p>{faq.answer}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Bottom CTA */}
                <div className="text-center mt-16">
                    <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-3xl p-8 md:p-12 max-w-4xl mx-auto">
                        <h3 className="text-2xl md:text-3xl font-bold mb-4">
                            Still have questions?
                        </h3>
                        <p className="text-base-content/80 mb-6 max-w-2xl mx-auto">
                            Our team is here to help you choose the right plan
                            for your needs.
                        </p>
                        <button
                            className="btn btn-outline gap-2"
                            onClick={() => navigate("/contact")}
                        >
                            Contact Us
                        </button>
                    </div>
                </div>
            </div>
        </HomeLayout>
    );
}

export default Pricing;

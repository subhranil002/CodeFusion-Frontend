import { FaCheck, FaCrown, FaRocket, FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import HomeLayout from "../layouts/HomeLayout";

function Pricing() {
    const navigate = useNavigate();

    const plans = [
        {
            name: "Free",
            price: "$0",
            period: "Forever",
            description: "Great for starters and small projects",
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
            name: "Pro Monthly",
            price: "$9",
            period: "Per month",
            description: "For developers and students needing more power",
            features: [
                "Unlimited collaborative rooms",
                "Advanced editor tools",
                "50 code runs per day",
                "25 AI interactions per day",
                "Higher compilation priority",
                "Priority support",
            ],
            button: "Subscribe Monthly",
            buttonAction: "/pro-monthly",
            popular: true,
            icon: <FaRocket className="text-primary" />,
        },
        {
            name: "Pro Yearly",
            price: "$99",
            period: "Per year",
            description: "Best value for teams and professionals",
            features: [
                "All Pro Monthly features",
                "Unlimited code runs",
                "Unlimited AI interactions",
                "Highest compilation priority",
                "24/7 priority support",
                "Early access to new features",
            ],
            button: "Subscribe Yearly",
            buttonAction: "/pro-yearly",
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
            question: "Do you offer team discounts?",
            answer: "Yes, special pricing is available for teams of 5 or more developers. Contact our sales team at sales@codefusion.com for details.",
        },
        {
            question: "Is there a free trial for paid plans?",
            answer: "Yes, we provide a 14-day free trial for both Pro Monthly and Pro Yearly plans. No credit card required to get started.",
        },
        {
            question: "What payment methods are supported?",
            answer: "We accept all payment methods. For enterprise customers, we also support invoicing.",
        },
        {
            question: "Can I cancel my subscription?",
            answer: "Yes, you can cancel anytime from your account profile. Once canceled, your access to Pro features will end immediately, and you’ll be reverted to the Free plan.",
        },
        {
            question: "Do I keep my projects if I downgrade to Free?",
            answer: "Yes, all your projects remain accessible. However, features beyond the Free plan limits will be restricted.",
        },
        {
            question: "Is support included in all plans?",
            answer: "Community support is included in the Free plan. Paid plans include priority support, with Pro Yearly offering 24/7 support.",
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

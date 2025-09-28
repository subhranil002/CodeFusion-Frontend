import { FaCheck, FaRocket, FaRupeeSign } from "react-icons/fa";

import HomeLayout from "../../layouts/HomeLayout";

function SubscribeBasic() {
    const features = [
        {
            title: "Unlimited Rooms",
            description:
                "Create as many collaborative coding rooms as you need",
        },
        {
            title: "50 Daily Code Runs",
            description: "Execute code 5x more than the free plan",
        },
        {
            title: "Small Team Ready",
            description: "Perfect for study groups and small projects",
        },
        {
            title: "Priority Support",
            description: "Faster email response times",
        },
    ];

    const handleSubscribe = () => {
        // Simulate subscription process
        console.log("Subscribing to Basic plan...");
        // In real app, this would integrate with payment gateway
        setTimeout(() => {
            alert("Subscribed to Basic plan!");
        }, 1500);
    };

    return (
        <HomeLayout>
            <div className="min-h-screen bg-gradient-to-br from-base-200 to-base-300 py-12">
                <div className="container mx-auto px-4 max-w-6xl">
                    {/* Header Section */}
                    <div className="text-center mb-12">
                        <div className="badge badge-primary badge-lg mb-4 p-4 text-lg">
                            RECOMMENDED
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">
                            Upgrade to{" "}
                            <span className="text-primary">Basic</span>
                        </h1>
                        <p className="text-xl text-base-content/80 max-w-2xl mx-auto">
                            Perfect for active learners, coding bootcamps, and
                            small teams who need more power and flexibility.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                        {/* Pricing Card */}
                        <div className="card bg-base-100 shadow-2xl border border-primary/20">
                            <div className="card-body p-8">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="p-3 bg-primary/10 rounded-2xl">
                                        <FaRocket className="w-8 h-8 text-primary" />
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-bold">
                                            Basic Plan
                                        </h2>
                                        <p className="text-base-content/70">
                                            Most popular choice
                                        </p>
                                    </div>
                                </div>

                                <div className="mb-6">
                                    <div className="flex items-baseline gap-2">
                                        <span className="text-5xl font-bold text-primary">
                                            <FaRupeeSign className="inline w-4 h-4" />
                                            499
                                        </span>
                                        <span className="text-lg text-base-content/70">
                                            /month
                                        </span>
                                    </div>
                                    <p className="text-base-content/60 mt-2">
                                        Billed monthly • Cancel anytime
                                    </p>
                                </div>

                                {/* Feature List */}
                                <div className="space-y-4 mb-8">
                                    {features.map((feature, index) => (
                                        <div
                                            key={index}
                                            className="flex items-start gap-3 p-3 bg-base-200 rounded-lg"
                                        >
                                            <div className="text-success mt-1">
                                                <FaCheck className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <h4 className="font-semibold">
                                                    {feature.title}
                                                </h4>
                                                <p className="text-sm text-base-content/70">
                                                    {feature.description}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Subscribe Button */}
                                <button
                                    onClick={handleSubscribe}
                                    className="btn btn-primary sm:btn-lg w-full gap-2 hover:scale-105 transition-transform"
                                >
                                    <FaRocket className="min-w-5 min-h-5" />
                                    Subscribe to Basic
                                </button>

                                <p className="text-center text-sm text-base-content/60 mt-4">
                                    No hidden fees • 14-day money-back guarantee
                                </p>
                            </div>
                        </div>

                        {/* Comparison & Benefits */}
                        <div className="space-y-6">
                            {/* Plan Comparison */}
                            <div className="card bg-base-100 shadow-lg">
                                <div className="card-body">
                                    <h3 className="text-xl font-bold mb-4">
                                        Plan Comparison
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
                                                </tr>
                                                <tr>
                                                    <td>Daily Code Runs</td>
                                                    <td className="text-center">
                                                        10
                                                    </td>
                                                    <td className="text-center text-primary font-semibold">
                                                        50
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
                                                </tr>
                                                <tr>
                                                    <td>Support</td>
                                                    <td className="text-center">
                                                        Community
                                                    </td>
                                                    <td className="text-center text-primary font-semibold">
                                                        Priority Email
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>

                            {/* Testimonials */}
                            <div className="card bg-base-100 shadow-lg">
                                <div className="card-body">
                                    <h3 className="text-xl font-bold mb-4">
                                        Loved by Developers
                                    </h3>
                                    <div className="space-y-4">
                                        <div className="p-4 bg-base-200 rounded-lg">
                                            <p className="italic">
                                                "Basic plan was perfect for our
                                                coding bootcamp. The unlimited
                                                rooms let each student have
                                                their own space."
                                            </p>
                                            <p className="text-sm font-semibold mt-2">
                                                - Sarah, Coding Instructor
                                            </p>
                                        </div>
                                        <div className="p-4 bg-base-200 rounded-lg">
                                            <p className="italic">
                                                "Upgraded from Free and never
                                                looked back. The extra code runs
                                                are essential for debugging."
                                            </p>
                                            <p className="text-sm font-semibold mt-2">
                                                - Mike, Freelance Developer
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* FAQ Section */}
                    <div className="max-w-4xl mx-auto mt-16">
                        <h2 className="text-2xl font-bold text-center mb-8">
                            Frequently Asked Questions
                        </h2>
                        <div className="space-y-4">
                            <div className="collapse collapse-plus bg-base-100 shadow-lg">
                                <input type="checkbox" />
                                <div className="collapse-title text-lg font-semibold">
                                    Can I upgrade from Free to Basic?
                                </div>
                                <div className="collapse-content">
                                    <p>
                                        Yes! Your existing rooms and data will
                                        be preserved. You'll immediately get
                                        access to all Basic features.
                                    </p>
                                </div>
                            </div>
                            <div className="collapse collapse-plus bg-base-100 shadow-lg">
                                <input type="checkbox" />
                                <div className="collapse-title text-lg font-semibold">
                                    What payment methods do you accept?
                                </div>
                                <div className="collapse-content">
                                    <p>
                                        We accept all major credit cards,
                                        PayPal, and for some regions, mobile
                                        payment options.
                                    </p>
                                </div>
                            </div>
                            <div className="collapse collapse-plus bg-base-100 shadow-lg">
                                <input type="checkbox" />
                                <div className="collapse-title text-lg font-semibold">
                                    Can I cancel my subscription?
                                </div>
                                <div className="collapse-content">
                                    <p>
                                        Absolutely. You can cancel anytime and
                                        continue using Basic features until the
                                        end of your billing period.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </HomeLayout>
    );
}

export default SubscribeBasic;

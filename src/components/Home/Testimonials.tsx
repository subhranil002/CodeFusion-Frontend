import { FaQuoteLeft, FaStar } from "react-icons/fa";

import cat1 from "../../assets/images/cat1.jpeg";
import cat2 from "../../assets/images/cat2.jpg";
import cat3 from "../../assets/images/cat3.jpeg";

function Testimonials() {
    const testimonials = [
        {
            name: "Poppy",
            role: "Senior Developer at TechCorp",
            image: cat1,
            color: "primary",
            feedback:
                "CodeFusion has revolutionized how our team collaborates. The real-time editing is seamless and the interface is incredibly intuitive.",
        },
        {
            name: "Luna",
            role: "Lead Engineer at StartupXYZ",
            image: cat2,
            color: "secondary",
            feedback:
                "I've tried many collaborative editors, but CodeFusion stands out for its performance and ease of use. It just works!",
        },
        {
            name: "Simba",
            role: "Full Stack Developer at Incubaid",
            image: cat3,
            color: "accent",
            feedback:
                "The multi-language support and instant execution feature have drastically improved our team's productivity. Highly recommend!",
        },
    ];

    return (
        <section className="py-16 bg-gradient-to-br from-base-100 to-base-200">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <div className="badge badge-primary badge-outline badge-lg mb-4">
                        TESTIMONIALS
                    </div>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                        What
                        <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                            {" "}
                            Developers
                            {" "}
                        </span>
                        Say
                    </h2>
                    <p className="text-lg text-base-content/80 max-w-2xl mx-auto">
                        Discover why thousands of developers choose CodeFusion
                        for their collaborative coding needs.
                    </p>
                </div>

                <div className="flex flex-wrap justify-center gap-8 max-w-7xl mx-auto">
                    {testimonials.map((person, index) => (
                        <div
                            key={index}
                            className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 md:max-w-[350px]"
                        >
                            <div className="card-body p-8">
                                <div className="flex justify-between items-start mb-6">
                                    <div className="flex">
                                        {[...Array(5)].map((_, i) => (
                                            <FaStar
                                                key={i}
                                                className="w-5 h-5 fill-warning text-warning"
                                            />
                                        ))}
                                    </div>
                                    <div className="text-3xl opacity-20">
                                        <FaQuoteLeft />
                                    </div>
                                </div>

                                <p className="text-base-content/80 mb-8 text-lg italic">
                                    "{person.feedback}"
                                </p>

                                <div className="flex items-center mt-auto pt-6 border-t border-base-300">
                                    <div className="avatar placeholder w-14 h-14">
                                        <img
                                            src={person.image}
                                            alt={person.name}
                                            className="rounded-full"
                                        />
                                    </div>
                                    <div className="ml-4">
                                        <p className="font-bold text-lg">
                                            {person.name}
                                        </p>
                                        <p className="text-sm text-base-content/60">
                                            {person.role}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Testimonials;

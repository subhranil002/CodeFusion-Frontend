import { FaStar } from "react-icons/fa";

function Testimonials({ testimonials }: any) {
    return (
        <section className="bg-base-200/50 py-16">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        What Developers Say
                    </h2>
                    <div className="divider w-24 mx-auto"></div>
                    <p className="text-lg text-base-content/80">
                        Join thousands of developers who love CodeFusion.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
                    {testimonials.map((person: any, index: number) => (
                        <div
                            key={index}
                            className="card bg-base-100 border border-base-300 hover:border-primary/50 transition-all hover:-translate-y-1"
                        >
                            <div className="card-body p-6">
                                <div className="flex mb-4">
                                    {[...Array(5)].map((_, i) => (
                                        <FaStar
                                            key={i}
                                            className="w-5 h-5 fill-warning text-warning"
                                        />
                                    ))}
                                </div>
                                <p className="text-base-content/80 mb-4 italic">
                                    {person.feedback}
                                </p>
                                <div className="flex items-center">
                                    <div className="avatar placeholder">
                                        <div
                                            className={`bg-gradient-to-r from-${person.color} to-${person.color}/70 text-${person.color}-content rounded-full w-12 h-12`}
                                        >
                                            <span>{person.initials}</span>
                                        </div>
                                    </div>
                                    <div className="ml-4">
                                        <p className="font-medium">
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

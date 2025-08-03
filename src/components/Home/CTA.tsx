import { FaRocket } from "react-icons/fa";
import { Link } from "react-router-dom";

function CTA() {
    return (
        <section className="container mx-auto px-4 py-16">
            <div className="max-w-4xl mx-auto text-center card bg-gradient-to-r from-primary/10 to-accent/10 shadow-xl border border-primary/20">
                <div className="card-body py-12 px-6">
                    <h2 className="card-title justify-center text-3xl md:text-4xl font-bold mb-4">
                        Ready to Transform Your Coding Experience?
                    </h2>
                    <p className="text-lg text-base-content/80 mb-8 max-w-2xl mx-auto">
                        Join thousands of developers who are already
                        collaborating more effectively with CodeFusion.
                    </p>
                    <div className="card-actions justify-center">
                        <Link to="/dashboard">
                            <button className="btn btn-primary btn-lg gap-2 group">
                                Start Coding Together
                                <FaRocket className="group-hover:animate-pulse" />
                            </button>
                        </Link>
                        <button className="btn btn-outline btn-lg hover:bg-base-200">
                            View Documentation
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default CTA;

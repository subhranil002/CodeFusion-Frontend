function Features({ features }: any) {
    return (
        <section className="container mx-auto px-4 py-16">
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                    Why Choose{" "}
                    <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                        CodeFusion
                    </span>
                    ?
                </h2>
                <div className="divider w-24 mx-auto"></div>
                <p className="text-lg text-base-content/80 max-w-2xl mx-auto">
                    Experience the future of collaborative development with our
                    cutting-edge features.
                </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
                {features.map((feature: any, index: number) => (
                    <div
                        key={index}
                        className="card bg-base-100 border border-base-300 shadow-sm hover:shadow-lg transition-shadow group"
                    >
                        <div className="card-body items-center text-center p-8">
                            <div
                                className={`p-4 rounded-full bg-${feature.color}/10 text-${feature.color} mb-4 transition-all duration-300 group-hover:scale-110`}
                            >
                                {feature.icon}
                            </div>
                            <h3 className="card-title text-xl mb-2">
                                {feature.title}
                            </h3>
                            <p className="text-base-content/80">
                                {feature.desc}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default Features;

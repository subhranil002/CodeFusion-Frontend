function HowItWorks({ steps }: any) {
    return (
        <section className="bg-base-200/50 py-16">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        How It Works
                    </h2>
                    <div className="divider w-24 mx-auto"></div>
                    <p className="text-lg text-base-content/80 max-w-2xl mx-auto">
                        Get started in minutes with our simple three-step
                        process.
                    </p>
                </div>
                <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                    {steps.map((item: any, index: number) => (
                        <div
                            key={index}
                            className="card bg-base-100 shadow-sm group hover:-translate-y-2 transition-transform duration-300"
                        >
                            <div className="card-body items-center text-center p-8">
                                <div className="avatar placeholder mb-4">
                                    <div className="w-16 h-16 rounded-full bg-gradient-to-r from-primary to-accent text-primary-content text-2xl font-bold">
                                        {item.step}
                                    </div>
                                </div>
                                <h3 className="text-xl font-semibold mb-2">
                                    {item.title}
                                </h3>
                                <p className="text-base-content/80">
                                    {item.desc}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default HowItWorks;

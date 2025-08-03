function Stats() {
    return (
        <section className="container mx-auto px-4 py-16">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 text-center">
                <div className="card bg-base-100 p-6 hover:bg-gradient-to-br hover:from-primary/10 hover:to-accent/10 transition-all">
                    <div className="text-4xl font-bold text-primary mb-2">
                        10K+
                    </div>
                    <p className="text-base-content/80">Active Developers</p>
                </div>
                <div className="card bg-base-100 p-6 hover:bg-gradient-to-br hover:from-primary/10 hover:to-accent/10 transition-all">
                    <div className="text-4xl font-bold text-accent mb-2">
                        50K+
                    </div>
                    <p className="text-base-content/80">Coding Sessions</p>
                </div>
                <div className="card bg-base-100 p-6 hover:bg-gradient-to-br hover:from-primary/10 hover:to-accent/10 transition-all">
                    <div className="text-4xl font-bold text-success mb-2">
                        99.9%
                    </div>
                    <p className="text-base-content/80">Uptime</p>
                </div>
                <div className="card bg-base-100 p-6 hover:bg-gradient-to-br hover:from-primary/10 hover:to-accent/10 transition-all">
                    <div className="text-4xl font-bold text-warning mb-2">
                        24/7
                    </div>
                    <p className="text-base-content/80">Support</p>
                </div>
            </div>
        </section>
    );
}

export default Stats;

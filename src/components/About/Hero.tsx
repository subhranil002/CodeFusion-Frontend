import { FaCode, FaUsers } from "react-icons/fa";

function Hero() {
    return (
        <section className="max-w-6xl mx-auto text-center p-10">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
                About{" "}
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    CodeFusion
                </span>
            </h1>
            <p className="text-lg md:text-xl text-base-content max-w-3xl mx-auto mb-8">
                CodeFusion is a powerful collaborative coding platform designed
                for developers to code together in real-time, regardless of
                their location. Experience seamless collaboration with our
                advanced features.
            </p>
            <div className="stats shadow bg-base-100 max-w-md mx-auto flex flex-wrap justify-center">
                <div className="stat max-w-[200px] flex flex-col justify-center items-center">
                    <div className="stat-figure text-secondary">
                        <FaUsers className="text-3xl" />
                    </div>
                    <div className="stat-title">Active Users</div>
                    <div className="stat-value">5,000+</div>
                    <div className="stat-desc">Since Launch</div>
                </div>

                <div className="stat max-w-[200px] flex flex-col justify-center items-center">
                    <div className="stat-figure text-primary">
                        <FaCode className="text-3xl" />
                    </div>
                    <div className="stat-title">Projects Created</div>
                    <div className="stat-value">12,500+</div>
                    <div className="stat-desc">↗︎ 400 (22%)</div>
                </div>
            </div>
        </section>
    );
}

export default Hero;

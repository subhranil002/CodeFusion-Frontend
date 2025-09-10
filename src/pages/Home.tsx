import CTA from "../components/Home/CTA";
import Features from "../components/Home/Features";
import Hero from "../components/Home/Hero";
import HowItWorks from "../components/Home/HowItWorks";
import Stats from "../components/Home/Stats";
import Testimonials from "../components/Home/Testimonials";
import HomeLayout from "../layouts/HomeLayout";

function Home() {
    return (
        <HomeLayout>
            <div className="min-h-screen bg-gradient-to-br from-base-100 to-base-200">
                <Hero />
                <Features />
                <HowItWorks />
                <Stats />
                <Testimonials/>
                <CTA />
            </div>
        </HomeLayout>
    );
}

export default Home;

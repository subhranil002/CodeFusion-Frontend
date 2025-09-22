import {
    FaCode,
    FaGlobe,
    FaRocket,
    FaShieldAlt,
    FaUsers,
} from "react-icons/fa";

import Features from "../components/About/Features";
import Hero from "../components/About/Hero";
import CTA from "../components/Home/CTA";
import HowItWorks from "../components/Home/HowItWorks";
import Testimonials from "../components/Home/Testimonials";
import HomeLayout from "../layouts/HomeLayout";

function About() {
    return (
        <HomeLayout>
            <Hero />
            <Features />
            <HowItWorks />
            <Testimonials />
            <CTA />
        </HomeLayout>
    );
}

export default About;

import {
    FaShieldAlt,
    FaUsers,
} from "react-icons/fa";
import { FiZap } from "react-icons/fi";

import CTA from "../components/Home/CTA";
import Features from "../components/Home/Features";
import Footer from "../components/Home/Footer";
import Header from "../components/Home/Header";
import Hero from "../components/Home/Hero";
import HowItWorks from "../components/Home/HowItWorks";
import Stats from "../components/Home/Stats";
import Testimonials from "../components/Home/Testimonials";

function Home() {
    const features = [
        {
            icon: <FaUsers className="w-6 h-6" />,
            title: "Real-time Collaboration",
            desc: "Code together in real-time with your team. See changes instantly and work together seamlessly.",
            color: "primary",
        },
        {
            icon: <FiZap className="w-6 h-6" />,
            title: "Lightning Fast",
            desc: "Optimized for speed with minimal latency. Focus on coding, not waiting for updates.",
            color: "accent",
        },
        {
            icon: <FaShieldAlt className="w-6 h-6" />,
            title: "Secure & Private",
            desc: "Your code is protected with enterprise-grade security. Private rooms ensure confidentiality.",
            color: "success",
        },
    ];

    const steps = [
        {
            step: 1,
            title: "Create a Room",
            desc: "Click 'Create New Room' to generate a unique 4-character room ID that you can share with your team.",
        },
        {
            step: 2,
            title: "Invite Your Team",
            desc: "Share the room ID with your teammates. They can join instantly using the simple room code.",
        },
        {
            step: 3,
            title: "Start Coding",
            desc: "Begin collaborating immediately. See real-time changes, chat, and build amazing projects together.",
        },
    ];

    const testimonials = [
        {
            name: "Sarah Miller",
            role: "Senior Developer at TechCorp",
            initials: "SM",
            color: "primary",
            feedback: "CodeFusion has revolutionized how our team collaborates. The real-time editing is seamless and the interface is incredibly intuitive.",
        },
        {
            name: "Mike Johnson",
            role: "Lead Engineer at StartupXYZ",
            initials: "MJ",
            color: "accent",
            feedback: "CodeFusion has revolutionized how our team collaborates. The real-time editing is seamless and the interface is incredibly intuitive.",
        },
        {
            name: "Alex Lee",
            role: "Full Stack Developer",
            initials: "AL",
            color: "success",
            feedback: "CodeFusion has revolutionized how our team collaborates. The real-time editing is seamless and the interface is incredibly intuitive.",
        },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-base-100 to-base-200">
            <Header />
            <Hero />
            <Features features={features} />
            <HowItWorks steps={steps} />
            <Stats />
            <Testimonials testimonials={testimonials} />
            <CTA />
            <Footer />
        </div>
    );
}

export default Home;

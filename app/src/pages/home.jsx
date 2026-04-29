import React from "react";
import Hero from "../components/portfolio/hero.jsx";
import About from "../components/portfolio/about";
import Projects from "../components/portfolio/projects";
import Services from "../components/portfolio/services";
import Process from "../components/portfolio/process";
import Testimonials from "../components/portfolio/testimonials";
import Contact from "../components/portfolio/contact";
import Footer from "../components/portfolio/footer";
import Navbar from "../components/portfolio/navbar";
import { Import } from "lucide-react";


export default function Home() {
    return (
        <div className="relative min-h-screen bg-[#F5F1E8] text-[#141414]">
            <Navbar />
            <main>
                <Hero />
                <Projects />
                <About />
                <Services />
                <Process />
                <Testimonials />
                <Contact />
            </main>
            <Footer />
        </div>
    );
}

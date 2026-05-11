import React from "react";
import { Helmet } from "react-helmet-async";

import Hero from "../components/portfolio/hero.jsx";
import About from "../components/portfolio/about";
import Projects from "../components/portfolio/projects";
import Services from "../components/portfolio/services";
import Process from "../components/portfolio/process";
import Testimonials from "../components/portfolio/testimonials";
import Contact from "../components/portfolio/contact";
import Footer from "../components/portfolio/footer";
import Navbar from "../components/portfolio/navbar";
import Intro from "../components/portfolio/intro";
import Credentials from "../components/portfolio/Credentials.jsx";

export default function Home() {
  return (
    <>
      <Helmet>
        <title>Gopi Prajapati | UI/UX & Graphic Designer</title>

        <meta
          name="description"
          content="Portfolio of Gopi Prajapati showcasing UI/UX design, mobile apps, SaaS dashboards, and graphic design work."
        />

        <meta
          name="keywords"
          content="UI UX Designer, Portfolio, Figma, Web Design, App Design, Graphic Design"
        />

        <meta property="og:title" content="Gopi Prajapati Portfolio" />

        <meta
          property="og:description"
          content="Explore UI/UX, SaaS dashboard, mobile app and graphic design projects."
        />

        <meta property="og:image" content="/preview.png" />
        <meta property="og:type" content="website" />
      </Helmet>

      <div className="relative min-h-screen bg-[#F5F1E8] text-[#141414]">
        <Navbar />

        <main>
          <Hero />
          <Projects />
          <About />
          <Intro />
          <Services />
          <Credentials />
          <Process />
          <Testimonials />
          <Contact />
        </main>

        <Footer />
      </div>
    </>
  );
}
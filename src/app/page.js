"use client";
import Navbar from "./Navbar";
import Footer from "./Footer";
import HomeSection from "@/components/sections/HomeSection";
import AboutSection from "@/components/sections/AboutSection";
import WorkSection from "@/components/sections/PortofolioSection";
import PhilosophySection from "@/components/sections/PhilosophySection";
import ContactSection from "@/components/sections/ContactSection";

export default function Home() {
  return (
    <div className="relative w-full">
      <Navbar />
      <div className="flex flex-col">
        <section className="h-screen w-full relative">
          <HomeSection />
        </section>
        
        <section className="h-screen w-full">
          <AboutSection />
        </section>
        <section className="h-screen w-full">
          <PhilosophySection />
        </section>
        <section className="h-screen w-full">
          <WorkSection />
        </section>
        <section className="min-h-screen w-full">
          <ContactSection />
        </section>
      </div>
      <div className="relative z-50 bg-[#0F103F] shadow-2xl">
        <Footer />
      </div>
    </div>
  );
}



"use client";

import { useEffect, useState } from "react";
import Preloader from "@/components/Preloader";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import WhyChooseUs from "@/components/WhyChooseUs";
import Gallery from "@/components/Gallery";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Booking from "@/components/Booking";
import Footer from "@/components/Footer";

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Scroll to top on refresh
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="relative bg-stone-50 overflow-hidden">
      {loading ? (
        <Preloader onComplete={() => setLoading(false)} />
      ) : (
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <Hero />
          <About />
          <Services />
          <WhyChooseUs />
          <Gallery />
          <Testimonials />
          <Contact />
          <Booking />
          <Footer />
        </div>
      )}
    </main>
  );
}

"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";
import { useRef } from "react";

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <section
      id="home"
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
    >
      {/* Abstract Background Elements */}
      <div className="absolute inset-0 bg-pink-50 z-0 overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-[20%] -right-[10%] w-[60%] h-[60%] rounded-full bg-pink-100 blur-[100px]"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute -bottom-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-purple-100 blur-[100px]"
        />
      </div>

      <motion.div
        style={{ y, opacity }}
        className="container relative z-10 px-6 mx-auto text-center flex flex-col items-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/50 backdrop-blur-sm border border-stone-200 mb-8"
        >
          <Sparkles className="w-4 h-4 text-purple-500" />
          <span className="text-sm font-medium text-stone-600 uppercase tracking-widest">
            Luxury Beauty Salon
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-5xl md:text-7xl lg:text-8xl font-playfair font-medium text-stone-900 leading-tight mb-6"
        >
          Shape Up <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-400 pr-4">Beauty</span>
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-xl md:text-2xl font-playfair italic text-purple-600 mb-4"
        >
          Where Beauty Meets Perfection.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="max-w-2xl text-stone-500 md:text-lg mb-10"
        >
          Experience premium unisex grooming with expert hair styling, professional makeup, and rejuvenating spa treatments in Kolhapur.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
        >
          <a
            href="#booking"
            className="group relative px-8 py-4 bg-stone-900 text-white rounded-full overflow-hidden flex items-center justify-center gap-2 transition-all hover:shadow-xl hover:shadow-stone-900/20"
          >
            <div className="absolute inset-0 w-0 bg-gradient-to-r from-purple-600 to-pink-500 transition-all duration-[400ms] ease-out group-hover:w-full" />
            <span className="relative z-10 font-medium">Book Appointment</span>
            <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" />
          </a>
          
          <a
            href="#services"
            className="group relative px-8 py-4 bg-stone-900 text-white rounded-full overflow-hidden flex items-center justify-center gap-2 transition-all hover:shadow-xl hover:shadow-stone-900/20"
          >
            <div className="absolute inset-0 w-0 bg-gradient-to-r from-purple-600 to-pink-500 transition-all duration-[400ms] ease-out group-hover:w-full" />
            <span className="relative z-10 font-medium">Explore Services</span>
            <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" />
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}

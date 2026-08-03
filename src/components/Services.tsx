"use client";
import { motion } from "framer-motion";
import { Scissors, Sparkles } from "lucide-react";

const servicesWomen = [
  "Hair Styling", "Hair Coloring", "Hair Smoothening", 
  "Keratin Treatment", "Facial", "Cleanup", 
  "Waxing", "Bleach", "Manicure", 
  "Nail Care", "Nail Art", "Spa", "Makeup"
];

const servicesMen = [
  "Hair Styling", "Beard Styling", "Hair Spa", "Hair Treatments"
];

export default function Services() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <section id="services" className="py-24 bg-stone-50 relative">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-playfair mb-4 text-stone-900"
          >
            Our <span className="italic text-purple-600">Services</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-stone-500"
          >
            Indulge in our comprehensive range of premium beauty and grooming services tailored for both men and women.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-24">
          {/* Women's Services */}
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="bg-white p-8 md:p-10 rounded-[2rem] shadow-xl shadow-pink-100/50 border border-pink-50"
          >
            <div className="flex items-center gap-4 mb-8 pb-6 border-b border-stone-100">
              <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-pink-500" />
              </div>
              <h3 className="text-2xl font-playfair font-semibold text-stone-800">Women's Services</h3>
            </div>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8">
              {servicesWomen.map((service, idx) => (
                <motion.li key={idx} variants={item} className="flex items-center gap-3 group cursor-pointer transition-transform hover:translate-x-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-pink-400 transition-all duration-300 group-hover:scale-[2.5] group-hover:bg-pink-500 group-hover:shadow-[0_0_8px_rgba(236,72,153,0.5)]" />
                  <span className="text-stone-600 font-medium transition-colors group-hover:text-pink-600">{service}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Men's Services */}
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="bg-white p-8 md:p-10 rounded-[2rem] shadow-xl shadow-purple-100/50 border border-purple-50 h-fit"
          >
            <div className="flex items-center gap-4 mb-8 pb-6 border-b border-stone-100">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <Scissors className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-2xl font-playfair font-semibold text-stone-800">Men's Services</h3>
            </div>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8">
              {servicesMen.map((service, idx) => (
                <motion.li key={idx} variants={item} className="flex items-center gap-3 group cursor-pointer transition-transform hover:translate-x-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-500 transition-all duration-300 group-hover:scale-[2.5] group-hover:bg-purple-600 group-hover:shadow-[0_0_8px_rgba(168,85,247,0.5)]" />
                  <span className="text-stone-600 font-medium transition-colors group-hover:text-purple-600">{service}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

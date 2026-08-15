"use client";
import { motion } from "framer-motion";
import Image from "next/image";

const specialities = [
  "Croyoliposis", "Hair Regrowth", "Skin Treatment", "Laser Treatment", 
  "Semi Permanent Makeup", "Eyelashes", "Nail Arts", "Anti Aging"
];

export default function WhyChooseUs() {
  return (
    <section className="py-24 bg-stone-900 text-stone-50 overflow-hidden relative">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-600/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-playfair mb-4"
          >
            Salon <span className="italic text-pink-400">Specialities</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-stone-400 max-w-2xl mx-auto"
          >
            Discover our signature treatments designed to enhance your natural beauty.
          </motion.p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {specialities.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className="glass-panel p-6 rounded-2xl flex items-center justify-center text-center group hover:bg-white dark:bg-neutral-900/10 transition-colors"
            >
              <span className="font-playfair font-medium text-lg md:text-xl group-hover:text-pink-300 transition-colors">
                {item}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Promotional Photos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
          {[1, 2, 3, 4].map((idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className="relative aspect-square rounded-2xl overflow-hidden shadow-2xl shadow-purple-900/20 border-4 border-stone-800 group"
            >
              <Image 
                src={`/spec_${idx}.jpg`}
                alt={`Speciality Promotional Photo ${idx}`}
                fill
                unoptimized
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

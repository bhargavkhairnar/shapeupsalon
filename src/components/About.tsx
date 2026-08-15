"use client";
import { motion } from "framer-motion";
import { Award, CheckCircle2 } from "lucide-react";
import Image from "next/image";

export default function About() {
  return (
    <section id="about" className="py-24 bg-gradient-to-br from-pink-50 via-white to-purple-50 relative">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row gap-16 items-start relative">
          
          {/* Decorative Background Text (Stays fixed relative to section) */}
          <div className="absolute top-0 left-0 -z-10 opacity-5 pointer-events-none select-none overflow-hidden w-full">
            <span className="font-playfair text-[12rem] md:text-[16rem] font-black italic tracking-tighter text-pink-600 leading-none whitespace-nowrap">
              Masterclass
            </span>
          </div>

          {/* Image Side - Now Sticky! */}
          <div className="w-full lg:w-1/2 relative lg:sticky lg:top-32 z-10">
            {/* Top Floating Badge */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="absolute -top-6 -right-4 lg:-right-8 z-20 bg-white dark:bg-neutral-900/80 backdrop-blur-xl px-6 py-4 rounded-2xl shadow-xl shadow-pink-900/10 border border-white flex flex-col items-center"
            >
              <span className="text-3xl font-playfair font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500">10+</span>
              <span className="text-[10px] font-bold tracking-[0.2em] text-stone-500 dark:text-stone-400 uppercase mt-1">Years Exp.</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative rounded-[2rem] overflow-hidden aspect-[2/3] bg-stone-100 shadow-2xl shadow-pink-900/5 border-8 border-white"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-purple-200/40 to-pink-100/40 mix-blend-multiply z-10" />
              <Image 
                src="/api/owner-photo"
                alt="Shraddha Katkar - International Beauty Educator" 
                fill 
                unoptimized
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </motion.div>
            
            {/* Floating Badge Bottom */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="absolute -bottom-6 -left-6 md:-left-10 bg-white dark:bg-neutral-900 p-6 rounded-2xl shadow-xl shadow-stone-200/50 max-w-[200px] border border-stone-100 dark:border-neutral-800 z-20"
            >
              <Award className="w-8 h-8 text-gold mb-3" style={{ color: "#D4AF37" }} />
              <p className="font-playfair font-semibold text-lg text-stone-800 dark:text-stone-200 leading-tight">
                International <br /> Beauty Educator
              </p>
            </motion.div>
          </div>

          {/* Text Side */}
          <div className="w-full lg:w-1/2 z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-sm font-bold tracking-widest uppercase text-purple-500 mb-3">
                Welcome to Shape Up Beauty
              </h2>
              <h3 className="text-4xl md:text-5xl font-playfair text-stone-900 dark:text-stone-100 mb-6 leading-tight">
                Meet <span className="italic">Shraddha Katkar</span>
              </h3>
              
              <div className="space-y-6 text-stone-600 dark:text-stone-300 mb-10 text-lg md:text-xl leading-relaxed">
                <p>
                  As an <strong>International Beauty Educator</strong>, Shraddha brings world-class expertise right to Kolhapur. With years of experience and a passion for perfection, she has transformed the way beauty services are experienced.
                </p>
                <p>
                  Shape Up Beauty is more than just a salon; it's a luxury retreat where personalized care meets advanced styling techniques. We maintain the highest standards of hygiene and use only premium products to ensure you look and feel your absolute best.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
                {[
                  "Personalized Consultation",
                  "Premium Products",
                  "Hygienic Environment",
                  "Advanced Techniques"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-purple-400" />
                    <span className="font-medium text-stone-700 md:text-lg">{item}</span>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-px bg-stone-300" />
                <div>
                  <p className="font-playfair italic text-3xl md:text-4xl text-pink-500 leading-none">Shraddha Katkar</p>
                  <p className="text-sm text-stone-500 dark:text-stone-400 mt-2 font-semibold tracking-widest uppercase">Founder & Owner</p>
                </div>
              </div>


            </motion.div>
          </div>
        </div>

        {/* Full Width Achievements Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-20 lg:mt-32 w-full"
        >
          <div className="flex items-center gap-6 mb-12">
            <div className="flex-grow h-px bg-stone-200" />
            <h4 className="text-lg md:text-xl font-bold tracking-widest uppercase text-stone-500 dark:text-stone-400 text-center">
              Awards & Certifications
            </h4>
            <div className="flex-grow h-px bg-stone-200" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
            {[
              "/gallery/achievement-1.jpg", 
              "/gallery/achievement-2.jpg", 
              "/gallery/achievement-3.jpg", 
              "/gallery/achievement-4.jpg",
              "/lokmat_award_1.jpg",
              "/lokmat_award_2.jpg"
            ].map((src, i) => (
              <motion.div 
                key={i} 
                whileHover={{ scale: 1.02, y: -5 }}
                className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden shadow-xl shadow-pink-900/10 border-4 border-white bg-stone-100"
              >
                <Image 
                  src={src}
                  alt={`Award or Certification ${i + 1}`}
                  fill
                  unoptimized
                  className="object-cover object-top"
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

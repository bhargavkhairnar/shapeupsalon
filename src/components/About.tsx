"use client";
import { motion } from "framer-motion";
import { Award, CheckCircle2 } from "lucide-react";
import Image from "next/image";

export default function About() {
  return (
    <section id="about" className="py-24 bg-gradient-to-br from-pink-50 via-white to-purple-50 relative">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          {/* Image Side */}
          <div className="w-full lg:w-1/2 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative rounded-[2rem] overflow-hidden aspect-[4/5] bg-stone-100"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-purple-200/40 to-pink-100/40 mix-blend-multiply z-10" />
              <Image 
                src="/owner-photo.jpg" 
                alt="Shraddha Katkar - International Beauty Educator" 
                fill 
                className="object-cover object-top"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </motion.div>
            
            {/* Floating Badge */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="absolute -bottom-6 -left-6 md:-left-10 bg-white p-6 rounded-2xl shadow-xl shadow-stone-200/50 max-w-[200px]"
            >
              <Award className="w-8 h-8 text-gold mb-3" style={{ color: "#D4AF37" }} />
              <p className="font-playfair font-semibold text-lg text-stone-800 leading-tight">
                International <br /> Beauty Educator
              </p>
            </motion.div>
          </div>

          {/* Text Side */}
          <div className="w-full lg:w-1/2">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-sm font-bold tracking-widest uppercase text-purple-500 mb-3">
                Welcome to Shape Up Beauty
              </h2>
              <h3 className="text-4xl md:text-5xl font-playfair text-stone-900 mb-6 leading-tight">
                Meet <span className="italic">Shraddha Katkar</span>
              </h3>
              
              <div className="space-y-4 text-stone-600 mb-8">
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
                    <span className="font-medium text-stone-700">{item}</span>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-px bg-stone-300" />
                <div>
                  <p className="font-playfair italic text-2xl text-pink-500 leading-none">Shraddha Katkar</p>
                  <p className="text-xs text-stone-500 mt-1.5 font-semibold tracking-widest uppercase">Founder & Owner</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

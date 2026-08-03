"use client";
import { motion } from "framer-motion";
import { useEffect } from "react";

export default function Preloader({ onComplete }: { onComplete: () => void }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 3500);
    return () => clearTimeout(timer);
  }, [onComplete]);

  const letterAnimation = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.8,
        ease: "easeOut",
      },
    }),
  };

  const text = "Shape Up Beauty".split("");

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-pink-50 to-purple-100 overflow-hidden"
      exit={{ opacity: 0, y: "-100%" }}
      transition={{ duration: 1, ease: "easeInOut" }}
    >
      <div className="relative flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute -top-20 w-64 h-64 bg-pink-200 rounded-full blur-[80px] opacity-60 mix-blend-multiply"
        />
        
        <div className="flex z-10">
          {text.map((char, i) => (
            <motion.span
              key={i}
              custom={i}
              variants={letterAnimation}
              initial="hidden"
              animate="visible"
              className="text-4xl md:text-6xl lg:text-7xl font-playfair tracking-wider font-medium text-stone-800"
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </div>
        
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ delay: 1.5, duration: 1, ease: "easeInOut" }}
          className="h-px bg-gradient-to-r from-transparent via-purple-400 to-transparent mt-8"
        />
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="mt-4 font-playfair italic text-2xl text-purple-600 z-10"
        >
          Where Beauty Meets Perfection
        </motion.p>
      </div>

      {/* Floating Particles */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full bg-gold/40"
          style={{ backgroundColor: "#D4AF37", opacity: 0.4 }}
          initial={{
            x: Math.random() * (typeof window !== "undefined" ? window.innerWidth : 1000),
            y: Math.random() * (typeof window !== "undefined" ? window.innerHeight : 1000),
            scale: Math.random() * 0.5 + 0.5,
          }}
          animate={{
            y: [null, Math.random() * -100 - 50],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: Math.random() * 2 + 2,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </motion.div>
  );
}

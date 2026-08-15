"use client";
import { useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, Phone, MapPin, Award, BookOpen, Star } from "lucide-react";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function AcademyPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const nailTopics = [
    "Product Knowledge", "Cuticle Cutting", "Nail Preparation", "Nail Shaping", 
    "Nail Filing", "Techniques", "Acrylic Nail", "Gel Nail", "Press On Nails", 
    "French Art", "Ombre Art", "Marble Art", "Glitter Art", "Chrome Art", 
    "Acetone Removal", "Removing Techniques"
  ];

  const beautyTopics = [
    "Body Massage", "Customer Counselling", "D-Tan & Bleach", "Social Etiquette", 
    "Blow Dry", "Root Touch Up", "Ironing", "Hair Curling", "Hair Wash", "Health & Hygiene", 
    "Threading Technique", "Manicure & Pedicure", "Head Massage", "Mehandi Dye", 
    "Basic Hair Cut", "Facial", "Bleaching", "Waxing", "Face Clean"
  ];

  return (
    <main className="min-h-screen bg-stone-50 dark:bg-neutral-950 font-sans">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-[#0d0510]">
        <div className="absolute inset-0 z-0 opacity-40">
          <Image
            src="/academy_hero.png"
            alt="Academy Background"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d0510] via-transparent to-[#37134d]/80 z-10" />
        
        <div className="container mx-auto px-6 lg:px-12 relative z-20">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pink-500/20 border border-pink-500/30 backdrop-blur-md mb-6"
            >
              <Award className="w-5 h-5 text-pink-400" />
              <span className="text-sm font-semibold text-pink-300 tracking-wide uppercase">Shape Up Beauty Academy</span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-6xl lg:text-7xl font-bold font-playfair text-white mb-6 leading-normal"
            >
              Build Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-500 italic inline-block pr-4 py-1">Beauty Career</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg md:text-xl text-stone-300 mb-8 max-w-2xl"
            >
              Master professional skills in Makeup, Nails, Hair, and Skin. Join our certified academy and turn your passion into a glamorous career.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap items-center gap-4"
            >
              <a href="#courses" className="px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white rounded-full font-semibold transition-all shadow-[0_0_20px_rgba(236,72,153,0.3)] hover:shadow-[0_0_30px_rgba(236,72,153,0.5)]">
                Explore Courses
              </a>
              <div className="px-6 py-4 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white font-semibold flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                FLAT 20% OFF ON ALL COURSES
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Certifications Banner */}
      <div className="bg-white dark:bg-neutral-900 border-y border-stone-200 dark:border-neutral-800 py-6">
        <div className="container mx-auto px-6 lg:px-12 flex flex-col md:flex-row justify-center items-center gap-8 md:gap-16 text-center">
          <p className="text-stone-500 dark:text-stone-400 font-medium tracking-widest uppercase text-sm mb-4 md:mb-0 w-full md:w-auto">
            Certified By
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
            <div className="flex items-center gap-3">
              <Award className="w-8 h-8 text-blue-600" />
              <span className="font-semibold text-stone-800 dark:text-stone-200">NSDC (Gov. of India)</span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-8 h-8 text-green-600" />
              <span className="font-semibold text-stone-800 dark:text-stone-200">Skill India</span>
            </div>
            <div className="flex items-center gap-3">
              <Globe className="w-8 h-8 text-purple-600" />
              <span className="font-semibold text-stone-800 dark:text-stone-200">KHDA (Dubai Int.)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Courses Section */}
      <section id="courses" className="py-24 relative">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-playfair font-bold text-stone-900 dark:text-stone-100 mb-6">
              Our Professional <span className="italic text-pink-500">Courses</span>
            </h2>
            <p className="text-stone-500 dark:text-stone-400 text-lg">
              Comprehensive training programs designed to give you hands-on experience and industry-recognized certifications.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Course 1: Acrylic Nail */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-neutral-900 rounded-[2rem] shadow-xl overflow-hidden border border-pink-100 dark:border-pink-900/30 flex flex-col group"
            >
              <div className="relative h-64 overflow-hidden">
                <Image
                  src="/academy_nail.png"
                  alt="Acrylic Nail Course"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
                  <div>
                    <h3 className="text-2xl md:text-3xl font-bold font-playfair text-white mb-2">Acrylic Nail Course</h3>
                    <p className="text-pink-200 font-medium flex items-center gap-2">
                      <BookOpen className="w-4 h-4" /> Duration: 1 Month
                    </p>
                  </div>
                </div>
              </div>
              <div className="p-8 flex-1 flex flex-col">
                <h4 className="font-semibold text-stone-900 dark:text-stone-100 mb-4 text-lg">What You Will Learn:</h4>
                <ul className="grid grid-cols-2 gap-3 mb-8 flex-1">
                  {nailTopics.map((topic, i) => (
                    <li key={i} className="flex items-start gap-2 text-stone-600 dark:text-stone-300 text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-pink-500 mt-1.5 shrink-0" />
                      <span>{topic}</span>
                    </li>
                  ))}
                </ul>
                <a 
                  href="https://wa.me/919156791336?text=Hello!%20I%20am%20interested%20in%20enrolling%20in%20the%20Acrylic%20Nail%20Course%20at%20Shape%20Up%20Beauty%20Academy.%20Please%20share%20more%20details." 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block w-full py-4 text-center rounded-xl bg-pink-50 dark:bg-pink-500/10 text-pink-600 dark:text-pink-400 font-bold hover:bg-pink-100 dark:hover:bg-pink-500/20 transition-colors"
                >
                  Book Your Seat Now
                </a>
              </div>
            </motion.div>

            {/* Course 2: Basic Beauty */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-white dark:bg-neutral-900 rounded-[2rem] shadow-xl overflow-hidden border border-purple-100 dark:border-purple-900/30 flex flex-col group"
            >
              <div className="relative h-64 overflow-hidden">
                <Image
                  src="/academy_beauty_v2.png"
                  alt="Basic Beauty Course"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
                  <div>
                    <h3 className="text-2xl md:text-3xl font-bold font-playfair text-white mb-2">Basic Beauty Course</h3>
                    <div className="flex flex-wrap gap-4 text-purple-200 font-medium">
                      <p className="flex items-center gap-2"><BookOpen className="w-4 h-4" /> Duration: 1 Month</p>
                      <p className="flex items-center gap-2">Fees: ₹25,000/-</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-8 flex-1 flex flex-col">
                <h4 className="font-semibold text-stone-900 dark:text-stone-100 mb-4 text-lg">What You Will Learn:</h4>
                <ul className="grid grid-cols-2 gap-3 mb-8 flex-1">
                  {beautyTopics.map((topic, i) => (
                    <li key={i} className="flex items-start gap-2 text-stone-600 dark:text-stone-300 text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-1.5 shrink-0" />
                      <span>{topic}</span>
                    </li>
                  ))}
                </ul>
                <a 
                  href="https://wa.me/919156791336?text=Hello!%20I%20am%20interested%20in%20enrolling%20in%20the%20Basic%20Beauty%20Course%20at%20Shape%20Up%20Beauty%20Academy.%20Please%20share%20more%20details." 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block w-full py-4 text-center rounded-xl bg-purple-500 hover:bg-purple-600 text-white font-bold shadow-lg transition-all hover:shadow-purple-500/30"
                >
                  Enroll Now - Unlock Your Glam Career
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Academy Contact Details */}
      <section className="bg-stone-100 dark:bg-neutral-900/50 py-16 border-t border-stone-200 dark:border-neutral-800">
        <div className="container mx-auto px-6 lg:px-12 text-center max-w-2xl">
          <h3 className="text-2xl font-bold font-playfair text-stone-900 dark:text-stone-100 mb-8">Ready to Start Your Journey?</h3>
          <div className="flex flex-col gap-4 items-center justify-center">
            <a href="tel:+919156791336" className="flex items-center justify-center gap-3 text-xl md:text-2xl font-bold text-pink-600 dark:text-pink-400 hover:scale-105 transition-transform">
              <Phone className="w-6 h-6" /> +91 9156791336
            </a>
            <div className="flex items-center justify-center gap-3 text-stone-600 dark:text-stone-400 max-w-md mx-auto leading-relaxed mt-2">
              <MapPin className="w-5 h-5 shrink-0" />
              <p>Takala to Rajarampuri Road, Near Old Siddhivinayak Hospital, Kolhapur</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

// Temporary icon component since Globe wasn't imported from lucide-react at the top
function Globe(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
      <path d="M2 12h20" />
    </svg>
  )
}

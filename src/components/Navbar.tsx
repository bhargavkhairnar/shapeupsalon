"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/#home" },
    { name: "About", href: "/#about" },
    { name: "Services", href: "/#services" },
    { name: "Gallery", href: "/#gallery" },
    { name: "Testimonials", href: "/#testimonials" },
    { name: "Contact", href: "/#contact" },
    { name: "Billing System", href: "/admin/billing" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-gradient-to-r from-[#0d0510]/85 via-[#37134d]/85 to-[#0d0510]/85 backdrop-blur-3xl border-b border-white/5 shadow-[0_8px_30px_rgba(0,0,0,0.3)] ${
        isScrolled ? "py-3" : "py-5"
      }`}
    >
      <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
        {/* Logo */}
        <Link href="/#home" className="flex items-center gap-2 group">
          <div className="relative w-36 h-14 sm:w-48 sm:h-16 flex items-center justify-center overflow-hidden group-hover:scale-105 transition-transform duration-500 rounded-lg">
            <Image
              src="/new-logo.jpg"
              alt="Shape Up Beauty Logo"
              fill
              className="object-contain"
              sizes="(max-width: 768px) 144px, 192px"
            />
          </div>
        </Link>

        {/* Right Side */}
        <div className="flex items-center gap-8">
          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-stone-300 hover:text-pink-400 transition-colors relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-pink-400 transition-all group-hover:w-full" />
              </Link>
            ))}
          </div>

          <Link
            href="/academy"
            className="hidden md:flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-white text-sm font-bold shadow-lg shadow-pink-500/25 hover:shadow-pink-500/40 hover:scale-105 transition-all"
          >
            Join Academy
          </Link>

          {/* Mobile Toggle */}
          <button
            className="md:hidden text-stone-200"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-gradient-to-b from-[#0d0510]/95 to-[#37134d]/95 backdrop-blur-3xl border-b border-white/5 overflow-hidden"
          >
            <div className="flex flex-col items-center py-6 gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-lg font-medium text-stone-300 hover:text-pink-400"
                >
                  {link.name}
                </Link>
              ))}
              
              <div className="w-full px-6 pt-4 border-t border-white/10 mt-2">
                <Link
                  href="/academy"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex justify-center items-center w-full py-3 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold shadow-lg hover:shadow-pink-500/40"
                >
                  Join Academy
                </Link>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

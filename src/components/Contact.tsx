"use client";
import { motion } from "framer-motion";
import { MapPin, Mail, Phone } from "lucide-react";
import { useSettings } from "@/components/SettingsProvider";

const InstagramIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

export default function Contact() {
  const settings = useSettings();
  const mapQuery = encodeURIComponent(`${settings.salonName}, ${settings.salonAddress}`);

  return (
    <section id="contact" className="py-24 bg-stone-900 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-stone-900 to-stone-950 z-0" />
      
      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-panel p-10 md:p-12 rounded-[2rem] border border-stone-700/50 text-white"
          >
            <h2 className="text-3xl md:text-5xl font-playfair mb-2">{settings.salonName}</h2>
            <div className="mb-8">
              <p className="text-lg font-medium text-stone-300">Shraddha Katkar</p>
              <p className="text-sm text-pink-400 font-playfair italic text-xl">International Beauty Educator</p>
            </div>

            <div className="space-y-6 mb-10">
              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-full bg-white dark:bg-neutral-900/10 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-purple-400" />
                </div>
                <div>
                  <h4 className="font-medium mb-1">Visit Us</h4>
                  <p className="text-stone-400 text-sm leading-relaxed whitespace-pre-wrap">
                    {settings.salonAddress}
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-full bg-white dark:bg-neutral-900/10 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5 text-purple-400" />
                </div>
                <div>
                  <h4 className="font-medium mb-1">Email</h4>
                  <a href="mailto:surveshraddha006@gmail.com" className="text-stone-400 text-sm hover:text-white transition-colors">
                    surveshraddha006@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-full bg-white dark:bg-neutral-900/10 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 text-purple-400" />
                </div>
                <div>
                  <h4 className="font-medium mb-1">WhatsApp</h4>
                  <a href={`https://wa.me/${settings.salonPhone.replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer" className="text-stone-400 text-sm hover:text-white transition-colors">
                    {settings.salonPhone}
                  </a>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <a href={`https://wa.me/${settings.salonPhone.replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer" className="px-6 py-3 bg-green-500/20 text-green-400 rounded-full text-sm font-medium hover:bg-green-500 hover:text-white transition-all flex items-center gap-2">
                <Phone className="w-4 h-4" /> WhatsApp
              </a>
              <a href="https://instagram.com/shape_upbeauty" target="_blank" rel="noopener noreferrer" className="px-6 py-3 bg-pink-500/20 text-pink-400 rounded-full text-sm font-medium hover:bg-pink-500 hover:text-white transition-all flex items-center gap-2">
                <InstagramIcon /> Instagram
              </a>
              <a href="mailto:surveshraddha006@gmail.com" className="px-6 py-3 bg-purple-500/20 text-purple-400 rounded-full text-sm font-medium hover:bg-purple-500 hover:text-white transition-all flex items-center gap-2">
                <Mail className="w-4 h-4" /> Email
              </a>
            </div>
          </motion.div>

          {/* Real Map */}
          <motion.a
            href={`https://www.google.com/maps/dir/?api=1&destination=${mapQuery}`}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="w-full h-full min-h-[400px] rounded-[2rem] overflow-hidden bg-stone-800 relative group block border border-stone-700/50"
          >
            <div className="absolute inset-0 w-full h-full pointer-events-none opacity-80 group-hover:opacity-100 transition-opacity duration-500">
              <iframe 
                src={`https://maps.google.com/maps?q=${mapQuery}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={false} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Shape Up Beauty Location"
              />
            </div>
            
            {/* Overlay to ensure clickability and show a subtle interaction hint */}
            <div className="absolute inset-0 bg-stone-900/20 group-hover:bg-transparent transition-colors duration-500 flex items-center justify-center">
              <div className="bg-stone-900/80 backdrop-blur-md px-6 py-3 rounded-full text-white font-medium text-sm flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-4 group-hover:translate-y-0 shadow-xl shadow-pink-500/10">
                <MapPin className="w-4 h-4 text-pink-400" />
                Open in Google Maps
              </div>
            </div>
          </motion.a>

        </div>
      </div>
    </section>
  );
}

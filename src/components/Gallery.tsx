"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import { X, ZoomIn } from "lucide-react";
import Image from "next/image";

const galleryItems = [
  { id: 16, title: "Shape Up Salon Exterior", category: "Exterior", image: "/gallery/salon-exterior.jpg" },
  { id: 11, title: "Premium Nail Station", category: "Nails", image: "/gallery/nail-area-1.jpg" },
  { id: 12, title: "Nail Art & Care", category: "Nails", image: "/gallery/nail-area-2.jpg" },
  { id: 13, title: "Luxury Spa Pedicure", category: "Spa", image: "/gallery/spa-area-1.jpg" },
  { id: 14, title: "Welcome to Shape Up", category: "Reception", image: "/gallery/reception.jpg" },
  { id: 15, title: "Relaxing Spa Area", category: "Spa", image: "/gallery/spa-area-2.jpg" },
  { id: 1, title: "Hair Styling Station", category: "Salon Interior", image: "/gallery/real-salon-1-new.jpg" },
  { id: 2, title: "Our Signature Ambiance", category: "Salon Interior", image: "/gallery/real-salon-2.jpg" },
  { id: 3, title: "Reception Area", category: "Ambiance", image: "/gallery/real-salon-3.jpg" },
  { id: 4, title: "Hair Styling Stations", category: "Hair", image: "/gallery/real-salon-4.jpg" },
  { id: 5, title: "Beauty Floor", category: "Services", image: "/gallery/real-salon-5.jpg" },
  { id: 6, title: "Therapy Room", category: "Spa", image: "/gallery/real-salon-6.jpg" },
  { id: 7, title: "Esthetician Suite", category: "Skin Clinic", image: "/gallery/real-salon-7.jpg" },
  { id: 8, title: "Private Treatment Room", category: "Treatments", image: "/gallery/real-salon-8.jpg" },
  { id: 9, title: "Hair Station Layout", category: "Hair", image: "/gallery/real-salon-9.jpg" },
  { id: 10, title: "Advanced Equipment", category: "Skin Care", image: "/gallery/real-salon-10.jpg" },
];

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState<typeof galleryItems[0] | null>(null);
  const [showAll, setShowAll] = useState(false);

  const displayedItems = showAll ? galleryItems : galleryItems.slice(0, 8);

  return (
    <section id="gallery" className="py-24 bg-stone-50 dark:bg-neutral-950">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-playfair mb-4 text-stone-900 dark:text-stone-100"
          >
            Our <span className="italic text-pink-500">Gallery</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-stone-500 dark:text-stone-400 max-w-2xl mx-auto"
          >
            Glimpses of our premium transformations and luxurious ambiance.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {displayedItems.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (idx % 8) * 0.1, duration: 0.5 }}
              onClick={() => setSelectedImage(item)}
              className="group relative overflow-hidden rounded-2xl cursor-pointer bg-stone-200 aspect-[4/5] shadow-lg shadow-stone-200/50 hover:shadow-2xl hover:shadow-pink-500/20 transition-all duration-500"
            >
              {/* Image Content */}
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              
              <div className="absolute inset-0 bg-stone-900/0 group-hover:bg-stone-900/40 transition-colors duration-500 flex items-center justify-center">
                <ZoomIn className="w-10 h-10 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500 translate-y-4 group-hover:translate-y-0" />
              </div>
            </motion.div>
          ))}
        </div>
        
        {galleryItems.length > 8 && (
          <div className="mt-12 text-center">
            <button
              onClick={() => setShowAll(!showAll)}
              className="inline-flex items-center justify-center px-8 py-3 rounded-full border-2 border-pink-200 dark:border-pink-900 text-pink-600 dark:text-pink-400 font-medium hover:bg-pink-50 dark:hover:bg-pink-900/20 hover:border-pink-300 dark:hover:border-pink-800 transition-all duration-300"
            >
              {showAll ? "Show Less" : "See More Photos"}
            </button>
          </div>
        )}
      </div>

      {/* Lightbox */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/95 backdrop-blur-sm p-4">
          <button 
            onClick={() => setSelectedImage(null)}
            className="absolute top-6 right-6 text-white hover:text-pink-400 transition-colors z-50 bg-black/20 p-2 rounded-full"
          >
            <X className="w-8 h-8" />
          </button>
          <div className="relative w-full max-w-5xl aspect-[4/3] md:aspect-[16/9] bg-stone-900 rounded-2xl overflow-hidden flex items-center justify-center shadow-2xl">
            <Image
              src={selectedImage.image}
              alt={selectedImage.title}
              fill
              className="object-cover"
              sizes="100vw"
            />
          </div>
        </div>
      )}
    </section>
  );
}

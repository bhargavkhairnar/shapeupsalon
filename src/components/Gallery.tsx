"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import { X, ZoomIn } from "lucide-react";
import Image from "next/image";

const galleryItems = [
  { id: 1, title: "Hair Transformation", category: "Hair", image: "/gallery/hair-trans.png" },
  { id: 2, title: "Bridal Makeup", category: "Makeup", image: "/gallery/bridal.png" },
  { id: 3, title: "Hair Coloring", category: "Hair", image: "/gallery/hair-color.png" },
  { id: 4, title: "Nail Art", category: "Nails", image: "/gallery/nails.png" },
  { id: 5, title: "Spa", category: "Spa", image: "/gallery/spa.png" },
  { id: 6, title: "Facial", category: "Skin", image: "/gallery/facial.png" },
  { id: 7, title: "Salon Interior", category: "Ambiance", image: "/gallery/interior.png" },
];

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState<typeof galleryItems[0] | null>(null);

  return (
    <section id="gallery" className="py-24 bg-stone-50">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-playfair mb-4 text-stone-900"
          >
            Our <span className="italic text-pink-500">Gallery</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-stone-500 max-w-2xl mx-auto"
          >
            Glimpses of our premium transformations and luxurious ambiance.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {galleryItems.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
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
              
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-stone-900/80 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                <p className="text-white font-playfair text-xl">{item.title}</p>
                <p className="text-pink-300 text-sm font-medium">{item.category}</p>
              </div>
            </motion.div>
          ))}
        </div>
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
            <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/90 via-black/40 to-transparent">
              <h3 className="text-white text-3xl font-playfair mb-2">{selectedImage.title}</h3>
              <p className="text-pink-300 font-medium tracking-wide uppercase text-sm">{selectedImage.category}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

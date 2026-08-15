"use client";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { Star, Quote } from "lucide-react";
import "swiper/css";

const reviews = [
  {
    name: "Priyanka Patil",
    review: "Excellent service and amazing staff. My hair makeover exceeded my expectations. Highly recommended!",
  },
  {
    name: "Snehal Jadhav",
    review: "The facial and cleanup were extremely relaxing. Very clean salon and friendly atmosphere.",
  },
  {
    name: "Vaishnavi Shinde",
    review: "Best hair coloring experience in Kolhapur. Loved the final look.",
  },
  {
    name: "Pooja Chavan",
    review: "Professional makeup for my wedding. Everyone appreciated the look.",
  },
  {
    name: "Ashwini Desai",
    review: "My manicure and nail art were beautifully done. I will definitely visit again.",
  }
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-24 bg-pink-50 dark:bg-neutral-950 relative overflow-hidden">
      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-playfair mb-4 text-stone-900 dark:text-stone-100"
          >
            Client <span className="italic text-purple-600">Love</span>
          </motion.h2>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto overflow-hidden"
        >
          <Swiper
            modules={[Autoplay]}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            loop={true}
            spaceBetween={30}
            className="glow-card rounded-3xl bg-white dark:bg-neutral-900 shadow-2xl shadow-pink-200/50"
          >
            {reviews.map((item, idx) => (
              <SwiperSlide key={idx}>
                <div className="p-10 md:p-16 text-center">
                  <Quote className="w-12 h-12 mx-auto text-pink-200 mb-6" />
                  <div className="flex justify-center gap-1 mb-6">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-gold text-gold" style={{ color: "#D4AF37", fill: "#D4AF37" }} />
                    ))}
                  </div>
                  <p className="text-xl md:text-2xl font-playfair italic text-stone-700 leading-relaxed mb-8">
                    "{item.review}"
                  </p>
                  <h4 className="font-semibold text-stone-900 dark:text-stone-100 text-lg">{item.name}</h4>
                  <p className="text-sm text-stone-500 dark:text-stone-400">Verified Client</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </div>
    </section>
  );
}

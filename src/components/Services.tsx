"use client";
import { motion } from "framer-motion";
import { Scissors, Sparkles, Brush, Zap } from "lucide-react";

type ServiceItem = string | { name: string; subItems: string[] };

const serviceCategories = [
  {
    title: "Basic Treatments",
    icon: Sparkles,
    cardClasses: "shadow-pink-100/50 border-pink-50 dark:border-neutral-800",
    iconBgClasses: "bg-pink-100 dark:bg-pink-500/10",
    iconColorClasses: "text-pink-500 dark:text-pink-400",
    dotClasses: "bg-pink-400 group-hover:bg-pink-500 group-hover:shadow-[0_0_8px_rgba(236,72,153,0.5)]",
    textHoverClasses: "group-hover:text-pink-600 dark:group-hover:text-pink-400",
    items: [
      "Eyebrows & Upper Lips", "Manicure & Pedicure", "Head Massage", 
      "Hair Cutting", "Clean Up", "Facial", "Bleach", "D-Tan", 
      "Body Massage", "Root Touch Up", "Mehandi Dry", "Hair Spa", "Basic Machine Treatment"
    ] as ServiceItem[]
  },
  {
    title: "Advanced Treatments",
    icon: Scissors,
    cardClasses: "shadow-purple-100/50 border-purple-50 dark:border-neutral-800",
    iconBgClasses: "bg-purple-100 dark:bg-purple-500/10",
    iconColorClasses: "text-purple-600 dark:text-purple-400",
    dotClasses: "bg-purple-500 group-hover:bg-purple-600 group-hover:shadow-[0_0_8px_rgba(168,85,247,0.5)]",
    textHoverClasses: "group-hover:text-purple-600 dark:group-hover:text-purple-400",
    items: [
      "Eyebrows with Wax",
      {
        name: "Adv. Wax Rica",
        subItems: ["Hand", "Leg", "Body", "Bikini"]
      },
      {
        name: "Adv. Manicure",
        subItems: ["Chocolate", "Ice Cream"]
      },
      {
        name: "Adv. Pedicure",
        subItems: ["Herbal", "Candle Wax"]
      },
      {
        name: "Adv. Head Massage",
        subItems: ["Potali Massage", "Aroma Head Massage"]
      },
      {
        name: "Adv. Hair Cut",
        subItems: ["Step Cut", "Layer Cut", "Butterfly Cut", "Graduation Cut", "Face Framing", "Curtains Layer", "Wolf Cut", "Feather Cut", "Long Bob Cut"]
      },
      {
        name: "Adv. Clean Up",
        subItems: ["D-Tan", "O3+", "Shils Clean Up"]
      },
      {
        name: "Adv. Facial",
        subItems: ["Ozen", "Korean", "Wine", "Potali", "O3+", "AHA + BHA", "Brightening Diamond Facial", "Collagen Facial", "Hydrating & Anti-ageing"]
      },
      {
        name: "Adv. Body Massage",
        subItems: ["Swedish", "Potali", "Stone", "Aroma", "Chocolate", "Wine", "Candle", "Music Spa"]
      },
      {
        name: "Adv. Body Polishing",
        subItems: ["Aroma Polishing", "Whitening Polishing"]
      },
      {
        name: "Adv. Hair Colour",
        subItems: ["Root Touch Up", "Highlight", "Elable", "Balayage"]
      },
      {
        name: "Adv. Hair Spa",
        subItems: ["L'Oréal Hair Spa", "Shea Hair Spa", "Banana Spa", "Korean Spa", "Wine Hair Spa"]
      }
    ] as ServiceItem[]
  },
  {
    title: "Professional Makeup",
    icon: Brush,
    cardClasses: "shadow-rose-100/50 border-rose-50 dark:border-neutral-800",
    iconBgClasses: "bg-rose-100 dark:bg-rose-500/10",
    iconColorClasses: "text-rose-500 dark:text-rose-400",
    dotClasses: "bg-rose-400 group-hover:bg-rose-500 group-hover:shadow-[0_0_8px_rgba(244,63,94,0.5)]",
    textHoverClasses: "group-hover:text-rose-600 dark:group-hover:text-rose-400",
    items: [
      "Simple Makeup", "Sider Makeup", "Bridal Makeup", "Party Makeup", 
      "Engagement Makeup", "Reception Makeup", "Haldi", "Mehendi", 
      "HD", "3D", "Air Brush"
    ] as ServiceItem[]
  },
  {
    title: "Machine Treatment",
    icon: Zap,
    cardClasses: "shadow-amber-100/50 border-amber-50 dark:border-neutral-800",
    iconBgClasses: "bg-amber-100 dark:bg-amber-500/10",
    iconColorClasses: "text-amber-500 dark:text-amber-400",
    dotClasses: "bg-amber-400 group-hover:bg-amber-500 group-hover:shadow-[0_0_8px_rgba(245,158,11,0.5)]",
    textHoverClasses: "group-hover:text-amber-600 dark:group-hover:text-amber-400",
    items: [
      "Hydra Facial", "Microdermabrasion", "Chemical Peel", 
      "LED Light Therapy", "Diamond Derma", "Laser Treatment", 
      "Carbon Facial", "Oxygeno Facial", "Micro Needling", 
      "Acne Facial", "Tattoo Removal", "RF - MNRF", 
      "Aging Treatment", "Hair Regrowth Treatment", "Mole Removal"
    ] as ServiceItem[]
  }
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.03
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

function ServiceCard({ category }: { category: typeof serviceCategories[0] }) {
  const Icon = category.icon;
  const gridCols = category.title === "Advanced Treatments" ? "grid-cols-1" : "grid-cols-1 sm:grid-cols-2";
  
  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-100px" }}
      className={`w-full glow-card bg-white dark:bg-neutral-900 p-8 md:p-10 rounded-[2rem] shadow-xl border ${category.cardClasses}`}
    >
      <div className="flex items-center gap-4 mb-8 pb-6 border-b border-stone-100 dark:border-neutral-800">
        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${category.iconBgClasses}`}>
          <Icon className={`w-6 h-6 ${category.iconColorClasses}`} />
        </div>
        <h3 className="text-2xl font-playfair font-semibold text-stone-800 dark:text-stone-200">{category.title}</h3>
      </div>
      <ul className={`grid ${gridCols} gap-y-6 gap-x-8`}>
        {category.items.map((service, idx) => {
          const isObj = typeof service === 'object';
          const name = isObj ? service.name : service;
          const subItems = isObj ? service.subItems : null;
          
          return (
            <motion.li key={idx} variants={item} className="flex flex-col gap-1 group cursor-pointer transition-transform hover:translate-x-2">
              <div className="flex items-start gap-3">
                <div className={`mt-2 w-1.5 h-1.5 shrink-0 rounded-full transition-all duration-300 group-hover:scale-[2.5] ${category.dotClasses}`} />
                <span className={`text-stone-600 dark:text-stone-300 font-medium transition-colors ${category.textHoverClasses} leading-tight`}>{name}</span>
              </div>
              {subItems && (
                <ul className="ml-7 mt-1.5 space-y-1">
                  {subItems.map((sub, sIdx) => (
                    <li key={sIdx} className="text-sm text-stone-500 dark:text-stone-400 list-disc list-outside ml-3 leading-tight group-hover:text-stone-600 dark:group-hover:text-stone-300 transition-colors">
                      {sub}
                    </li>
                  ))}
                </ul>
              )}
            </motion.li>
          );
        })}
      </ul>
    </motion.div>
  );
}

export default function Services() {
  return (
    <section id="services" className="py-24 bg-stone-50 dark:bg-neutral-950 relative">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-playfair mb-4 text-stone-900 dark:text-stone-100"
          >
            Our <span className="italic text-purple-600">Services</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-stone-500 dark:text-stone-400"
          >
            Indulge in our comprehensive range of premium unisex beauty, grooming, and cosmetology services.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-12 items-start">
          {/* Left Column: Basic Treatments, Professional Makeup, Machine Treatment */}
          <div className="flex flex-col gap-12">
            <ServiceCard category={serviceCategories[0]} />
            <ServiceCard category={serviceCategories[2]} />
            <ServiceCard category={serviceCategories[3]} />
          </div>

          {/* Right Column: Advanced Treatments */}
          <div className="flex flex-col gap-12">
            <ServiceCard category={serviceCategories[1]} />
          </div>
        </div>
      </div>
    </section>
  );
}


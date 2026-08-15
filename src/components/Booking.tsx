"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { CheckCircle2 } from "lucide-react";

export default function Booking() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const formData = new FormData(e.currentTarget);
    const fullName = formData.get("fullName") as string;
    const phone = formData.get("phone") as string;
    const service = formData.get("service") as string;
    const date = formData.get("date") as string;
    const time = formData.get("time") as string;

    const newAppointment = {
      id: Math.random().toString(36).substr(2, 9),
      customerName: fullName,
      phone: phone,
      service: service,
      date: date,
      time: time,
      status: "Upcoming"
    };

    // Save to localStorage
    const existing = localStorage.getItem("shape_up_appointments");
    const apps = existing ? JSON.parse(existing) : [
      {
        id: "1",
        customerName: "Sarah Johnson",
        phone: "+1 234 567 8901",
        service: "Bridal Makeup",
        date: new Date().toISOString().split('T')[0],
        time: "14:30",
        status: "Upcoming"
      },
      {
        id: "2",
        customerName: "Priya Patel",
        phone: "+1 234 567 8902",
        service: "Keratin Treatment",
        date: new Date().toISOString().split('T')[0],
        time: "16:00",
        status: "Upcoming"
      }
    ]; // Load with some defaults if empty
    
    apps.push(newAppointment);
    localStorage.setItem("shape_up_appointments", JSON.stringify(apps));

    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 5000);
    e.currentTarget.reset();
  };

  return (
    <section id="booking" className="py-24 bg-white dark:bg-neutral-900 relative">
      <div className="container mx-auto px-6 lg:px-12 max-w-4xl">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-playfair mb-4 text-stone-900 dark:text-stone-100"
          >
            Book an <span className="italic text-pink-500">Appointment</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-stone-500 dark:text-stone-400"
          >
            Reserve your luxury salon experience today.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-stone-50 dark:bg-neutral-950 rounded-[2rem] p-8 md:p-12 shadow-xl shadow-stone-200/50 border border-stone-100 dark:border-neutral-800 relative overflow-hidden"
        >
          <AnimatePresence mode="wait">
            {!isSubmitted ? (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                onSubmit={handleSubmit}
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                <div className="space-y-2">
                  <label className="text-sm font-medium text-stone-700">Full Name</label>
                  <input name="fullName" required type="text" className="w-full px-5 py-4 rounded-xl border border-stone-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all" placeholder="Jane Doe" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-stone-700">Phone Number</label>
                  <input name="phone" required type="tel" className="w-full px-5 py-4 rounded-xl border border-stone-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all" placeholder="+91 xxxxx xxxxx" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-stone-700">Email Address</label>
                  <input name="email" required type="email" className="w-full px-5 py-4 rounded-xl border border-stone-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all" placeholder="jane@example.com" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-stone-700">Service Required</label>
                  <select name="service" required className="w-full px-5 py-4 rounded-xl border border-stone-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all text-stone-600 dark:text-stone-300">
                    <option value="">Select a service</option>
                    <option value="Hair Styling">Hair Styling</option>
                    <option value="Bridal Makeup">Bridal Makeup</option>
                    <option value="Spa">Spa & Wellness</option>
                    <option value="Nails">Nail Art & Care</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-stone-700">Preferred Date</label>
                  <input name="date" required type="date" className="w-full px-5 py-4 rounded-xl border border-stone-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all text-stone-600 dark:text-stone-300" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-stone-700">Preferred Time</label>
                  <select name="time" required className="w-full px-5 py-4 rounded-xl border border-stone-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all text-stone-600 dark:text-stone-300">
                    <option value="">Select a time</option>
                    <option value="09:00 AM">09:00 AM</option>
                    <option value="09:30 AM">09:30 AM</option>
                    <option value="10:00 AM">10:00 AM</option>
                    <option value="10:30 AM">10:30 AM</option>
                    <option value="11:00 AM">11:00 AM</option>
                    <option value="11:30 AM">11:30 AM</option>
                    <option value="12:00 PM">12:00 PM</option>
                    <option value="12:30 PM">12:30 PM</option>
                    <option value="01:00 PM">01:00 PM</option>
                    <option value="01:30 PM">01:30 PM</option>
                    <option value="02:00 PM">02:00 PM</option>
                    <option value="02:30 PM">02:30 PM</option>
                    <option value="03:00 PM">03:00 PM</option>
                    <option value="03:30 PM">03:30 PM</option>
                    <option value="04:00 PM">04:00 PM</option>
                    <option value="04:30 PM">04:30 PM</option>
                    <option value="05:00 PM">05:00 PM</option>
                    <option value="05:30 PM">05:30 PM</option>
                    <option value="06:00 PM">06:00 PM</option>
                    <option value="06:30 PM">06:30 PM</option>
                    <option value="07:00 PM">07:00 PM</option>
                    <option value="07:30 PM">07:30 PM</option>
                    <option value="08:00 PM">08:00 PM</option>
                  </select>
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-medium text-stone-700">Additional Message</label>
                  <textarea name="message" rows={4} className="w-full px-5 py-4 rounded-xl border border-stone-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all" placeholder="Any specific requirements..."></textarea>
                </div>
                
                <div className="md:col-span-2 pt-4">
                  <button type="submit" className="w-full py-5 rounded-xl bg-gradient-to-r from-stone-900 to-stone-800 text-white font-medium text-lg hover:shadow-xl hover:shadow-stone-900/20 transition-all transform hover:-translate-y-1">
                    Confirm Appointment
                  </button>
                </div>
              </motion.form>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center py-20 text-center"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", bounce: 0.5 }}
                  className="w-20 h-20 bg-green-100 text-green-500 rounded-full flex items-center justify-center mb-6"
                >
                  <CheckCircle2 className="w-10 h-10" />
                </motion.div>
                <h3 className="text-3xl font-playfair text-stone-900 dark:text-stone-100 mb-2">Request Received!</h3>
                <p className="text-stone-500 dark:text-stone-400 max-w-md">
                  Thank you for booking with Shape Up Beauty. We will contact you shortly to confirm your appointment time.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

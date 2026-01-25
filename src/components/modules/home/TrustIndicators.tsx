"use client";

import { ShieldCheck, RefreshCw, Headset } from "lucide-react";
import { motion } from "framer-motion";

export default function TrustIndicators() {
  return (
    <section className="xl:py-20 lg:py-16 md:py-14 py-12 xl:px-24 lg:px-20 md:px-12 px-6 bg-primary text-primary-foreground relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops))] from-white via-transparent to-transparent" />

      <div className="container mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 divide-y md:divide-y-0 md:divide-x divide-primary-foreground/20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center text-center p-4"
          >
            <div className="mb-4 p-3 bg-white/10 rounded-full">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold mb-2">Verified Community</h3>
            <p className="text-primary-foreground/80 max-w-xs">
              Every member is verified to ensure a safe and trusted environment
              for your travels.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col items-center text-center p-4"
          >
            <div className="mb-4 p-3 bg-white/10 rounded-full">
              <RefreshCw className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold mb-2">Flexible Booking</h3>
            <p className="text-primary-foreground/80 max-w-xs">
              Plans change. Refundable bookings and easy cancellations up to 48h
              before the trip.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col items-center text-center p-4"
          >
            <div className="mb-4 p-3 bg-white/10 rounded-full">
              <Headset className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold mb-2">24/7 Global Support</h3>
            <p className="text-primary-foreground/80 max-w-xs">
              Our team is always here for you, anywhere in the world, any time
              of day.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { UserPlus, CalendarPlus, Plane, ArrowRight } from "lucide-react";
import { motion, Variants } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const steps = [
  {
    icon: UserPlus,
    title: "Create Profile",
    description:
      "Sign up and build your profile. Share your travel interests, preferences, and a cool bio to attract like-minded travelers.",
    color: "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400",
    gradient: "from-blue-500/20 to-blue-600/5",
  },
  {
    icon: CalendarPlus,
    title: "Find or Host",
    description:
      "Browse amazing trips created by others or take the lead and post your own dream travel itinerary for others to join.",
    color: "bg-primary/20 text-primary dark:bg-primary/30 dark:text-primary",
    gradient: "from-primary/20 to-primary/5",
  },
  {
    icon: Plane,
    title: "Travel Together",
    description:
      "Connect with your travel buddies, plan the details, and set off on an unforgettable adventure together. Safe and secure!",
    color: "bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400",
    gradient: "from-orange-500/20 to-orange-600/5",
  },
];

export default function HowItWorks() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent -translate-y-1/2 hidden md:block opacity-30" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20 space-y-4"
        >
          <div className="inline-flex items-center justify-center p-2 px-4 rounded-full bg-primary/10 text-primary font-medium text-sm mb-4">
            Simple 3-Step Process
          </div>
          <h2 className="text-4xl md:text-5xl font-bold">How Works for You</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Your journey to finding the perfect travel companion starts here. 
            We've made it easy, safe, and fun.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12"
        >
          {steps.map((step, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="relative group"
            >
              {/* Card */}
              <div className="flex flex-col items-center text-center bg-card border rounded-3xl p-8 hover:shadow-xl transition-all duration-500 hover:-translate-y-2 relative overflow-hidden h-full">
                
                {/* Number Watermark */}
                <div className="absolute top-4 right-6 text-9xl font-bold text-muted/5 group-hover:text-primary/5 transition-colors duration-500 select-none">
                  {index + 1}
                </div>

                {/* Icon */}
                <div
                  className={`relative w-24 h-24 rounded-2xl flex items-center justify-center ${step.color} shadow-lg mb-8 transition-transform group-hover:scale-110 duration-500 z-10 rotate-3 group-hover:rotate-0`}
                >
                  <step.icon className="w-10 h-10" />
                  <div className={`absolute inset-0 bg-gradient-to-br ${step.gradient} blur-xl -z-10`} />
                </div>

                <h3 className="text-2xl font-bold mb-4 relative z-10">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed relative z-10">
                  {step.description}
                </p>

                {/* Arrow (Visual indicator for flow) */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-[15%] text-muted-foreground/20 z-0">
                    <ArrowRight className="w-8 h-8" />
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mt-16 text-center"
        >
          <Link href="/register">
            <Button size="lg" className="rounded-full px-8 h-12 text-base shadow-lg shadow-primary/20 hover:shadow-primary/40">
              Start Your Journey Now 
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

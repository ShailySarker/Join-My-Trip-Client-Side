/* eslint-disable react/no-unescaped-entities */
"use client";

import { Shield, Users, ThumbsUp, Clock, Heart, Globe, CheckCircle2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

const features = [
  {
    icon: Shield,
    title: "Verified Travelers",
    description:
      "All our members are verified to ensure your safety and peace of mind.",
    color: "text-blue-500 bg-blue-50 dark:bg-blue-900/20",
    border: "border-blue-200 dark:border-blue-900/50",
  },
  {
    icon: Users,
    title: "Diverse Community",
    description:
      "Connect with travelers from over 50 countries and diverse backgrounds.",
    color: "text-green-500 bg-green-50 dark:bg-green-900/20",
    border: "border-green-200 dark:border-green-900/50",
  },
  {
    icon: ThumbsUp,
    title: "Trusted Reviews",
    description:
      "Read authentic reviews from real travelers who've been there.",
    color: "text-purple-500 bg-purple-50 dark:bg-purple-900/20",
    border: "border-purple-200 dark:border-purple-900/50",
  },
  {
    icon: Clock,
    title: "24/7 Support",
    description:
      "Our dedicated support team is here to help you anytime, anywhere.",
    color: "text-orange-500 bg-orange-50 dark:bg-orange-900/20",
    border: "border-orange-200 dark:border-orange-900/50",
  },
  {
    icon: Heart,
    title: "Find Your Buddy",
    description:
      "Based on your preferences, filter on interests, travel style, and preferences.",
    color: "text-red-500 bg-red-50 dark:bg-red-900/20",
    border: "border-red-200 dark:border-red-900/50",
  },
  {
    icon: Globe,
    title: "Global Reach",
    description:
      "Explore destinations worldwide with local and international buddies.",
    color: "text-cyan-500 bg-cyan-50 dark:bg-cyan-900/20",
    border: "border-cyan-200 dark:border-cyan-900/50",
  },
];

export default function WhyChooseUs() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  return (
    <section className="py-24 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#4f46e5_1px,transparent_1px)] [background-size:16px_16px]" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
             <CheckCircle2 className="w-4 h-4" />
             <span>Why Us</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Why Choose Join My Trip?
          </h2>
          <p className="text-muted-foreground text-lg">
            We're more than just a travel platform. We're a global community
            dedicated to making travel accessible, safe, and memorable for
            everyone.
          </p>
        </motion.div>

        <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto"
        >
          {features.map((feature, index) => (
            <motion.div key={index} variants={itemVariants}>
                <Card
                  className={`group border shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 h-full bg-card hover:border-primary/20`}
                >
                  <CardContent className="p-8">
                    <div
                      className={`w-16 h-16 rounded-2xl ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-sm`}
                    >
                      <feature.icon className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">{feature.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

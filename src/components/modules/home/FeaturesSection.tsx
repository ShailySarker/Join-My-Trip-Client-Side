"use client";

import { motion } from "framer-motion";
import {
  Shield,
  Clock,
  Heart,
  Award,
  Zap,
  Globe,
  Users,
  Star,
} from "lucide-react";

const features = [
  {
    icon: Users,
    title: "Verified Travelers",
    description:
      "All users are verified to ensure a safe and trustworthy community",
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
  },
  {
    icon: Globe,
    title: "Global Destinations",
    description:
      "Connect with travelers heading to over 150+ countries worldwide",
    color: "text-green-500",
    bgColor: "bg-green-500/10",
  },
  {
    icon: Shield,
    title: "Secure Platform",
    description:
      "Advanced security measures to protect your personal information",
    color: "text-purple-500",
    bgColor: "bg-purple-500/10",
  },
  {
    icon: Clock,
    title: "Real-Time Updates",
    description: "Get instant notifications about trip updates and messages",
    color: "text-orange-500",
    bgColor: "bg-orange-500/10",
  },
  {
    icon: Heart,
    title: "Perfect Matches",
    description: "Smart algorithm to match you with compatible travel buddies",
    color: "text-pink-500",
    bgColor: "bg-pink-500/10",
  },
  {
    icon: Award,
    title: "Rating System",
    description: "Transparent reviews and ratings for all community members",
    color: "text-yellow-500",
    bgColor: "bg-yellow-500/10",
  },
  {
    icon: Zap,
    title: "Quick Booking",
    description: "Simple and fast booking process to join any travel plan",
    color: "text-red-500",
    bgColor: "bg-red-500/10",
  },
  {
    icon: Star,
    title: "Premium Benefits",
    description: "Unlock exclusive features with our premium membership plans",
    color: "text-indigo-500",
    bgColor: "bg-indigo-500/10",
  },
];

export default function FeaturesSection() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold pb-3 mb-1 bg-linear-to-r from-primary via-primary/80 to-primary bg-clip-text text-transparent">
            Why Choose Join My Trip?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Experience the best travel companion platform with cutting-edge
            features designed for modern travelers
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="group relative p-6 rounded-2xl border bg-card hover:shadow-xl transition-all duration-300"
            >
              {/* Gradient Background on Hover */}
              <div className="absolute inset-0 rounded-2xl bg-linear-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="relative z-10">
                <div
                  className={`inline-flex p-3 rounded-xl ${feature.bgColor} mb-4 group-hover:scale-110 transition-transform duration-300`}
                >
                  <feature.icon className={`h-6 w-6 ${feature.color}`} />
                </div>
                <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

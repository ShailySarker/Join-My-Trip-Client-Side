"use client";

import { motion } from "framer-motion";
import {
  Users,
  Globe,
  Shield,
  Zap,
  Map,
  MessageSquare,
  Sparkles,
} from "lucide-react";

export default function FeaturesSection() {
  const features = [
    {
      icon: Users,
      title: "Smart Matching",
      description:
        "Our AI connects you with travelers who match your travel style and preferences.",
      color: "text-blue-500",
      bg: "bg-blue-500/10",
    },
    {
      icon: Globe,
      title: "Global Reach",
      description:
        "Access trips to over 150+ countries. Find companions for any destination.",
      color: "text-green-500",
      bg: "bg-green-500/10",
    },
    {
      icon: Map,
      title: "Easy Planning",
      description:
        "Create detailed itineraries, manage budgets, and coordinate seamlessly.",
      color: "text-orange-500",
      bg: "bg-orange-500/10",
    },
    {
      icon: Shield,
      title: "Verified & Safe",
      description:
        "Identity verification ensuring you travel with trusted companions only.",
      color: "text-purple-500",
      bg: "bg-purple-500/10",
    },
    {
      icon: MessageSquare,
      title: "Real-time Chat",
      description:
        "Chat with your travel buddies instantly to plan and clear doubts.",
      color: "text-pink-500",
      bg: "bg-pink-500/10",
    },
    {
      icon: Zap,
      title: "Instant Booking",
      description:
        "Secure your spot immediately with our hassle-free booking system.",
      color: "text-yellow-500",
      bg: "bg-yellow-500/10",
    },
  ];

  return (
    <section className="py-24 bg-muted xl:px-24 lg:px-20 md:px-12 px-6 relative overflow-hidden">
      {/* Background Shapes */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/80 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-primary/80 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
      <div className="container mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 max-w-2xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            <Sparkles className="w-4 h-4" />
            <span>Platform Features</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-linear-to-r from-foreground to-foreground/70">
            Why Travelers Choose Us
          </h2>
          <p className="text-lg text-muted-foreground">
            Everything you need for safe, fun, and organized group travel.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="group p-8 rounded-3xl border bg-card hover:shadow-xl transition-all duration-300"
            >
              <div
                className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform ${feature.bg}`}
              >
                <feature.icon className={`w-7 h-7 ${feature.color}`} />
              </div>
              <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

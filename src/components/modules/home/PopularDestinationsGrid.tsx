"use client";

import { motion } from "framer-motion";
import { MapPin, Plane, TrendingUp, Globe2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const popularDestinations = [
  {
    name: "Bali, Indonesia",
    trips: 45,
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800",
    continent: "Asia",
  },
  {
    name: "Paris, France",
    trips: 38,
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800",
    continent: "Europe",
  },
  {
    name: "Tokyo, Japan",
    trips: 42,
    image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800",
    continent: "Asia",
  },
  {
    name: "New York, USA",
    trips: 35,
    image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800",
    continent: "North America",
  },
  {
    name: "Barcelona, Spain",
    trips: 31,
    image: "https://images.unsplash.com/photo-1583422409516-2895a77efded?w=800",
    continent: "Europe",
  },
  {
    name: "Dubai, UAE",
    trips: 28,
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800",
    continent: "Asia",
  },
];

export default function PopularDestinations() {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-semibold text-sm mb-6">
            <Globe2 className="h-4 w-4" />
            <span>Trending Destinations</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Most Popular{" "}
            <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Destinations
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore where fellow travelers are heading and join the adventure
          </p>
        </motion.div>

        {/* Grid Layout */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {popularDestinations.map((destination, index) => (
            <motion.div
              key={destination.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="group relative h-72 rounded-2xl overflow-hidden cursor-pointer"
            >
              {/* Background Image */}
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                style={{ backgroundImage: `url(${destination.image})` }}
              />
              
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

              {/* Content */}
              <div className="relative h-full flex flex-col justify-between p-6">
                {/* Top Badge */}
                <div className="flex justify-between items-start">
                  <motion.div
                    className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-white text-xs font-semibold"
                    whileHover={{ scale: 1.1 }}
                  >
                    {destination.continent}
                  </motion.div>
                  <motion.div
                    className="p-2 rounded-full bg-primary/20 backdrop-blur-sm"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Plane className="h-4 w-4 text-white" />
                  </motion.div>
                </div>

                {/* Bottom Info */}
                <div>
                  <h3 className="text-white font-bold text-2xl mb-2 group-hover:text-primary transition-colors">
                    {destination.name}
                  </h3>
                  <div className="flex items-center gap-2 text-white/90">
                    <TrendingUp className="h-4 w-4" />
                    <span className="text-sm font-medium">
                      {destination.trips} active trips
                    </span>
                  </div>
                </div>

                {/* Hover Effect - View Button */}
                <motion.div
                  className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                >
                  <Button size="lg" className="rounded-full">
                    <MapPin className="mr-2 h-5 w-5" />
                    Explore Trips
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12"
        >
          {[
            { label: "Countries", value: "75+", icon: Globe2 },
            { label: "Cities", value: "200+", icon: MapPin },
            { label: "Active Trips", value: "850+", icon: Plane },
            { label: "Continents", value: "6", icon: Globe2 },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center p-6 rounded-2xl border bg-card hover:shadow-lg transition-all duration-300"
            >
              <div className="inline-flex p-3 rounded-xl bg-primary/10 mb-3">
                <stat.icon className="h-6 w-6 text-primary" />
              </div>
              <div className="text-3xl font-bold mb-1">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <Link href="/travel-plans">
            <Button size="lg" className="rounded-full">
              Discover All Destinations
              <Globe2 className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

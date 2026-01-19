"use client";

import {
  Mountain,
  Palmtree,
  Tent,
  Camera,
  PartyPopper,
  Sparkles,
  Building2,
  Leaf,
  UtensilsCrossed,
  ShoppingBag,
  Globe,
  Route,
  Binoculars,
  Trees,
  Compass,
  Landmark,
  LucideIcon,
  Crown,
} from "lucide-react";
import Link from "next/link";
import { ITrevelInterest } from "@/types/travelPlan.interface";
import { motion, Variants } from "framer-motion";

type TravelCategory = {
  label: string;
  value: ITrevelInterest;
  icon: LucideIcon;
  color: string;
};

const travelCategories: TravelCategory[] = [
  {
    label: "Hiking",
    value: ITrevelInterest.HIKING,
    icon: Mountain,
    color:
      "text-green-600 bg-green-50 dark:bg-green-900/20 group-hover:bg-green-600 group-hover:text-white",
  },
  {
    label: "Beach",
    value: ITrevelInterest.BEACH,
    icon: Palmtree,
    color:
      "text-blue-600 bg-blue-50 dark:bg-blue-900/20 group-hover:bg-blue-600 group-hover:text-white",
  },
  {
    label: "Cultural",
    value: ITrevelInterest.CULTURAL,
    icon: Landmark,
    color:
      "text-purple-600 bg-purple-50 dark:bg-purple-900/20 group-hover:bg-purple-600 group-hover:text-white",
  },
  {
    label: "Adventure",
    value: ITrevelInterest.ADVENTURE,
    icon: Compass,
    color:
      "text-red-600 bg-red-50 dark:bg-red-900/20 group-hover:bg-red-600 group-hover:text-white",
  },
  {
    label: "Nature",
    value: ITrevelInterest.NATURE,
    icon: Trees,
    color:
      "text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20 group-hover:bg-emerald-600 group-hover:text-white",
  },
  {
    label: "Wildlife",
    value: ITrevelInterest.WILDLIFE,
    icon: Binoculars,
    color:
      "text-lime-600 bg-lime-50 dark:bg-lime-900/20 group-hover:bg-lime-600 group-hover:text-white",
  },
  {
    label: "Road Trips",
    value: ITrevelInterest.ROAD_TRIPS,
    icon: Route,
    color:
      "text-orange-600 bg-orange-50 dark:bg-orange-900/20 group-hover:bg-orange-600 group-hover:text-white",
  },
  {
    label: "Historical",
    value: ITrevelInterest.HISTORICAL,
    icon: Crown,
    color:
      "text-stone-600 bg-stone-50 dark:bg-stone-900/20 group-hover:bg-stone-600 group-hover:text-white",
  },
  {
    label: "Camping",
    value: ITrevelInterest.CAMPING,
    icon: Tent,
    color:
      "text-teal-600 bg-teal-50 dark:bg-teal-900/20 group-hover:bg-teal-600 group-hover:text-white",
  },
  {
    label: "Nightlife",
    value: ITrevelInterest.NIGHTLIFE_EXPLORATION,
    icon: PartyPopper,
    color:
      "text-pink-600 bg-pink-50 dark:bg-pink-900/20 group-hover:bg-pink-600 group-hover:text-white",
  },
  {
    label: "Luxury",
    value: ITrevelInterest.LUXURY_TRAVEL,
    icon: Sparkles,
    color:
      "text-yellow-600 bg-yellow-50 dark:bg-yellow-900/20 group-hover:bg-yellow-600 group-hover:text-white",
  },
  {
    label: "City Life",
    value: ITrevelInterest.CITY_EXPLORATION,
    icon: Building2,
    color:
      "text-sky-600 bg-sky-50 dark:bg-sky-900/20 group-hover:bg-sky-600 group-hover:text-white",
  },
  {
    label: "Village Life",
    value: ITrevelInterest.VILLAGE_LIFE,
    icon: Leaf,
    color:
      "text-lime-700 bg-lime-50 dark:bg-lime-900/20 group-hover:bg-lime-700 group-hover:text-white",
  },
  {
    label: "Photography",
    value: ITrevelInterest.PHOTOGRAPHY,
    icon: Camera,
    color:
      "text-indigo-600 bg-indigo-50 dark:bg-indigo-900/20 group-hover:bg-indigo-600 group-hover:text-white",
  },
  {
    label: "Food Festival",
    value: ITrevelInterest.FOOD_FESTIVAL,
    icon: UtensilsCrossed,
    color:
      "text-rose-600 bg-rose-50 dark:bg-rose-900/20 group-hover:bg-rose-600 group-hover:text-white",
  },
  {
    label: "Shopping",
    value: ITrevelInterest.SHOPPING,
    icon: ShoppingBag,
    color:
      "text-fuchsia-600 bg-fuchsia-50 dark:bg-fuchsia-900/20 group-hover:bg-fuchsia-600 group-hover:text-white",
  },
  {
    label: "Relaxation",
    value: ITrevelInterest.RELAXATION,
    icon: Sparkles,
    color:
      "text-cyan-600 bg-cyan-50 dark:bg-cyan-900/20 group-hover:bg-cyan-600 group-hover:text-white",
  },
  {
    label: "International",
    value: ITrevelInterest.INTERNATIONAL,
    icon: Globe,
    color:
      "text-violet-600 bg-violet-50 dark:bg-violet-900/20 group-hover:bg-violet-600 group-hover:text-white",
  },
];

export default function TravelCategories() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, scale: 0.8 },
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
    <section className="py-20 xl:px-24 lg:px-20 md:px-12 px-6">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            <Compass className="w-4 h-4" />
            <span>Explore by Interest</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Browse by Category
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Find trips that match your passion, from mountain hiking to cultural
            exploration.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"
        >
          {travelCategories.map((cat, index) => {
            const Icon = cat.icon;

            return (
              <motion.div key={index} variants={itemVariants}>
                <Link
                  href={`/travel-plans?interests=${cat.value}`}
                  className="group flex flex-col items-center p-6 rounded-2xl border bg-card hover:border-primary/50 transition-all duration-300 hover:shadow-lg h-full"
                >
                  <div
                    className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-4 transition-all duration-300 ${cat.color}`}
                  >
                    <Icon className="w-7 h-7" />
                  </div>

                  <p className="font-semibold text-sm group-hover:text-primary transition-colors text-center">
                    {cat.label}
                  </p>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

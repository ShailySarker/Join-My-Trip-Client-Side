"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, ArrowRight, Calendar, Users, TrendingUp } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { ITravelPlan, ITrevelInterest } from "@/types/travelPlan.interface";
import { IUser } from "@/types/user.interface";
import { format } from "date-fns";
import { motion } from "framer-motion";

export default function TopDestinations({
  travelPlan,
  userInfo,
}: {
  travelPlan: ITravelPlan[];
  userInfo: IUser;
}) {
  const interestColors: Record<string, string> = {
    default: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300",
    [ITrevelInterest.HIKING]:
      "bg-lime-100 text-lime-800 dark:bg-lime-900 dark:text-lime-300",
    [ITrevelInterest.BEACH]:
      "bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-300",
    [ITrevelInterest.ADVENTURE]:
      "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300",
    [ITrevelInterest.CAMPING]:
      "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
    [ITrevelInterest.CITY_EXPLORATION]:
      "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
    [ITrevelInterest.CULTURAL]:
      "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
    [ITrevelInterest.FOOD_FESTIVAL]:
      "bg-sky-100 text-sky-800 dark:bg-sky-900 dark:text-sky-300",
    [ITrevelInterest.HISTORICAL]:
      "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300",
    [ITrevelInterest.INTERNATIONAL]:
      "bg-fuchsia-100 text-fuchsia-800 dark:bg-fuchsia-900 dark:text-fuchsia-300",
    [ITrevelInterest.LUXURY_TRAVEL]:
      "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300",
    [ITrevelInterest.NATURE]:
      "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
    [ITrevelInterest.NIGHTLIFE_EXPLORATION]:
      "bg-slate-100 text-slate-800 dark:bg-slate-900 dark:text-slate-300",
    [ITrevelInterest.PHOTOGRAPHY]:
      "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-300",
    [ITrevelInterest.RELAXATION]:
      "bg-neutral-100 text-neutral-800 dark:bg-neutral-900 dark:text-neutral-300",
    [ITrevelInterest.ROAD_TRIPS]:
      "bg-rose-100 text-rose-800 dark:bg-rose-900 dark:text-rose-300",
    [ITrevelInterest.SHOPPING]:
      "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-300",
    [ITrevelInterest.VILLAGE_LIFE]:
      "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
    [ITrevelInterest.WILDLIFE]:
      "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
  };

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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section className="xl:py-20 lg:py-16 md:py-14 py-12 xl:px-24 lg:px-20 md:px-12 px-6 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div className="mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6"
        >
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
              <TrendingUp className="w-4 h-4" />
              <span>Trending Now</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-linear-to-r from-foreground to-foreground/70">
              Featured Adventures
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl">
              Discover the most sought-after locations where our community is
              traveling right now.
            </p>
          </div>

          <motion.div
            whileHover={{ x: 5 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            {userInfo?.role === "ADMIN" || userInfo?.role === "SUPER_ADMIN" ? (
              <Link
                href="/manage-travel-plans"
                className="group flex items-center gap-2 text-primary font-semibold hover:text-primary/80 transition-colors"
              >
                Manage Travel Plans
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            ) : userInfo?.role === "USER" ? (
              <Link
                href="/my-travel-plans"
                className="group flex items-center gap-2 text-primary font-semibold hover:text-primary/80 transition-colors"
              >
                Explore All Travel Plans
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            ) : (
              <Link
                href="/travel-plans"
                className="group flex items-center gap-2 text-primary font-semibold hover:text-primary/80 transition-colors"
              >
                View All Travel Plans
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            )}
          </motion.div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {travelPlan.map((dest) => (
            <motion.div key={dest._id} variants={itemVariants}>
              <Link href={`/travel-plans/${dest._id}`} className="block h-full">
                <Card className="group overflow-hidden py-0 border-border/50 shadow-lg hover:shadow-2xl transition-all duration-300 h-full bg-card rounded-2xl hover:-translate-y-1">
                  {/* Image Container */}
                  <div className="relative h-[280px] w-full overflow-hidden">
                    <Image
                      src={dest.image}
                      alt={dest.destination.city}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent opacity-80" />

                    {/* Floating Badges */}
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-white/90 text-black backdrop-blur-md shadow-sm hover:bg-white px-3 py-1 text-xs font-semibold">
                        {dest.travelType}
                      </Badge>
                    </div>

                    <div className="absolute top-4 right-4">
                      <Badge className="bg-primary/90 text-primary-foreground backdrop-blur-md shadow-sm border-0">
                        {dest.budget.toLocaleString()} BDT
                      </Badge>
                    </div>

                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <div className="flex items-center gap-1 text-sm font-medium text-gray-200 mb-1">
                        <MapPin className="w-4 h-4 text-primary" />
                        {dest.destination.city}, {dest.destination.country}
                      </div>
                    </div>
                  </div>

                  {/* Content Container */}
                  <CardContent className="p-5 space-y-4">
                    <h3 className="text-xl font-bold leading-tight group-hover:text-primary transition-colors line-clamp-1">
                      {dest.title}
                    </h3>
                    {/* Dates */}
                    <div className="flex items-center gap-2 text-sm text-muted-foreground bg-muted/50 p-2 rounded-lg">
                      <Calendar className="w-4 h-4 shrink-0 text-primary" />
                      <span>
                        {format(new Date(dest.startDate), "MMM d")} -{" "}
                        {format(new Date(dest.endDate), "MMM d, yyyy")}
                      </span>
                    </div>

                    {/* Budget and Seats */}
                    <div className="flex items-center justify-between gap-4 py-1.5">
                      <div className="flex items-center gap-2 text-primary font-medium">
                        <span>{dest.budget.toLocaleString()} BDT</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Users className="w-4 h-4 shrink-0" />
                        <span className="font-medium">
                          {dest.maxGuest - (dest.participants?.length || 0)}{" "}
                          seats left
                        </span>
                      </div>
                    </div>

                    {/* Interests */}
                    <div className="flex flex-wrap gap-1.5 pt-2 border-t border-border/50">
                      {dest?.interests.slice(0, 3).map((interest) => (
                        <Badge
                          key={interest}
                          variant="secondary"
                          className={`text-[10px] px-2 py-0.5 ${
                            interestColors[interest] || interestColors.default
                          }`}
                        >
                          {interest}
                        </Badge>
                      ))}
                      {dest.interests.length > 3 && (
                        <Badge
                          variant="secondary"
                          className="bg-muted text-[10px] px-2 py-0.5"
                        >
                          +{dest.interests.length - 3}
                        </Badge>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

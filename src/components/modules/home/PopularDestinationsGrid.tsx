"use client";

import { motion } from "framer-motion";
import { MapPin, Plane, TrendingUp, Globe2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { IUser, IUserRole } from "@/types/user.interface";

interface IPopularDestination {
  city: string;
  country: string;
  count: number;
  image: string;
}

export default function PopularDestinationsGrid({
  popularDestinations,
  userInfo,
  stats,
}: {
  popularDestinations: IPopularDestination[];
  userInfo?: IUser;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  stats?: any;
}) {
  const statsData = [
    {
      label: "Destinations",
      value: stats?.destinations ? `${stats.destinations}+` : "150+",
      icon: Globe2,
    },
    {
      label: "Total Trips",
      value: stats?.totalTrips ? `${stats.totalTrips}+` : "1000+",
      icon: Plane,
    },
    {
      label: "Active Travelers",
      value: stats?.activeTravelers
        ? `${Math.floor(stats.activeTravelers).toLocaleString()}+`
        : "5000+",
      icon: TrendingUp,
    },
    {
      label: "Happy Travelers",
      value: stats?.averageRating
        ? `${((stats.averageRating / 5) * 100).toFixed(0)}%`
        : "98%",
      icon: MapPin,
    },
  ];

  return (
    <section className="xl:py-20 lg:py-16 md:py-14 py-12 xl:px-24 lg:px-20 md:px-12 px-6 bg-background">
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
            Top Trending{" "}
            <span className="bg-linear-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Locations
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore where fellow travelers are heading and join the adventure
          </p>
        </motion.div>

        {/* Grid Layout */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {popularDestinations?.length > 0 ? (
            popularDestinations.map((destination, index) => (
              <motion.div
                key={`${destination.city}-${destination.country}`}
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
                <div className="absolute inset-0 bg-linear-to-t from-black via-black/50 to-transparent" />

                {/* Content */}
                <div className="relative h-full flex flex-col justify-between p-6">
                  {/* Top Badge */}
                  <div className="flex justify-between items-start">
                    <motion.div
                      className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-white text-xs font-semibold"
                      whileHover={{ scale: 1.1 }}
                    >
                      {destination.country}
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
                      {destination.city}, {destination.country}
                    </h3>
                    <div className="flex items-center gap-2 text-white/90">
                      <TrendingUp className="h-4 w-4" />
                      <span className="text-sm font-medium">
                        {destination.count} active trip
                        {destination.count > 1 ? "s" : ""}
                      </span>
                    </div>
                  </div>

                  {/* Hover Effect - View Button */}
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                  >
                    {userInfo?.role === IUserRole.ADMIN ||
                    userInfo?.role === IUserRole.SUPER_ADMIN ? (
                      <Link
                        href={`/admin/dashboard/manage-travel-plans?search=${destination.city}`}
                        className="w-full h-full flex items-center justify-center"
                      >
                        <Button size="lg" className="rounded-full">
                          <MapPin className="mr-2 h-5 w-5" />
                          Explore Trips
                        </Button>
                      </Link>
                    ) : userInfo?.role === IUserRole.USER ? (
                      <Link
                        href={`/dashboard/explore-travel-plans?search=${destination.city}`}
                        className="w-full h-full flex items-center justify-center"
                      >
                        <Button size="lg" className="rounded-full">
                          <MapPin className="mr-2 h-5 w-5" />
                          Explore Trips
                        </Button>
                      </Link>
                    ) : (
                      <Link
                        href={`/travel-plans?search=${destination.city}`}
                        className="w-full h-full flex items-center justify-center"
                      >
                        <Button size="lg" className="rounded-full">
                          <MapPin className="mr-2 h-5 w-5" />
                          Explore Trips
                        </Button>
                      </Link>
                    )}
                  </motion.div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full text-center py-12 text-muted-foreground">
              No popular destinations found at the moment.
            </div>
          )}
        </div>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12"
        >
          {statsData.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center p-6 shadow-md rounded-2xl border bg-card hover:shadow-lg transition-all duration-300"
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
          {userInfo?.role === "ADMIN" || userInfo?.role === "SUPER_ADMIN" ? (
            <Link href="/admin/dashboard/manage-travel-plans">
              <Button size="lg" className="rounded-full">
                Discover All Destinations
                <Globe2 className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          ) : userInfo?.role === "USER" ? (
            <Link href="/dashboard/explore-travel-plans">
              <Button size="lg" className="rounded-full">
                Discover All Destinations
                <Globe2 className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          ) : (
            <Link href="/travel-plans">
              <Button size="lg" className="rounded-full">
                Discover All Destinations
                <Globe2 className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          )}
        </motion.div>
      </div>
    </section>
  );
}

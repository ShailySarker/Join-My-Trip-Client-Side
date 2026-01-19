"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Globe2, TrendingUp, Users, MapPin } from "lucide-react";
import Link from "next/link";
import banner from "@/assets/images/home-banner.jpg";
import { IUser } from "@/types/user.interface";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface Stats {
  activeTravelers: number;
  totalTrips: number;
  destinations: number;
}

export default function HeroSection({
  stats,
  userInfo,
}: {
  stats?: Stats;
  userInfo?: IUser;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  const defaultStats = {
    activeTravelers: stats?.activeTravelers || 1250,
    totalTrips: stats?.totalTrips || 850,
    destinations: stats?.destinations || 125,
  };

  return (
    <section className="relative min-h-[70vh] max-h-[70vh] flex items-center justify-center overflow-hidden pt-0 ">
      {/* Background with overlay */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${banner.src})`,
        }}
      >
        <div className="absolute inset-0 bg-linear-to-b from-black/60 via-black/50 to-black/70 dark:from-black/70 dark:via-black/60 dark:to-black/80 backdrop-blur-[2px]" />
        {/* Animated overlay linear */}
        <motion.div
          className="absolute inset-0 bg-linear-to-r from-primary/10 via-transparent to-primary/10"
          animate={{
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="container relative z-10 px-4 xl:py-20 lg:py-16 md:py-14 py-12 text-center text-white">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6 max-w-4xl mx-auto"
        >
          {/* Main Heading */}
          <motion.h1
            className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-tight bg-linear-to-r from-white via-gray-100 to-white bg-clip-text text-transparent"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Find Your Perfect <br />
            <span className="text-primary">Travel Buddy</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="text-lg md:text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Connect with like-minded travelers, plan trips together, and create
            unforgettable memories. Join thousands of travelers exploring the
            world together.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            {userInfo?.role === "ADMIN" || userInfo?.role === "SUPER_ADMIN" ? (
              <Link href="/admin/dashboard/manage-travel-plans">
                <Button
                  size="lg"
                  className="w-full sm:w-auto text-base h-10 px-8 rounded-full bg-primary hover:bg-primary/90 hover:scale-105 transition-transform duration-300 shadow-lg hover:shadow-xl"
                >
                  Manage Travel Plans
                  <Globe2 className="h-5 w-5" />
                </Button>
              </Link>
            ) : userInfo?.role === "USER" ? (
              <Link href="/dashboard/explore-travel-plans">
                <Button
                  size="lg"
                  className="w-full sm:w-auto text-base h-10 px-8 rounded-full bg-primary hover:bg-primary/90 hover:scale-105 transition-transform duration-300 shadow-lg hover:shadow-xl"
                >
                  Explore Travel Plans
                  <Globe2 className="h-5 w-5" />
                </Button>
              </Link>
            ) : (
              <Link href="/travel-plans">
                <Button
                  size="lg"
                  className="w-full sm:w-auto text-base h-10 px-8 rounded-full bg-primary hover:bg-primary/90 hover:scale-105 transition-transform duration-300 shadow-lg hover:shadow-xl"
                >
                  Explore Travel Plans
                  <Globe2 className="h-5 w-5" />
                </Button>
              </Link>
            )}

            {userInfo?.role === "ADMIN" || userInfo?.role === "SUPER_ADMIN" ? (
              <Link href="/admin/dashboard/manage-users">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto text-base h-10 px-10 rounded-full backdrop-blur-sm border-2 border-white/30 text-primary hover:bg-white/10 hover:scale-105 transition-transform duration-300"
                >
                  Manage Travelers
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
            ) : userInfo?.role === "USER" ? (
              <Link href="/dashboard/my-travel-plans/create">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto text-base h-10 px-10 rounded-full backdrop-blur-sm border-2 border-white/30 text-primary hover:bg-white/10 hover:scale-105 transition-transform duration-300"
                >
                  Create Plan
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
            ) : (
              <Link href="/explore-travelers">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto text-base h-10 px-10 rounded-full backdrop-blur-sm border-2 border-white/30 text-primary hover:bg-white/10 hover:scale-105 transition-transform duration-300"
                >
                  Explore Travelers
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
            )}
          </motion.div>

          {/* Statistics Section with Real Data */}
          {/* <motion.div
            className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 border-t border-white/20 mt-12 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <div className="group text-center p-4 rounded-lg bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
              <motion.div
                className="inline-block mb-2"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Users className="h-8 w-8 text-primary mx-auto" />
              </motion.div>
              {mounted && (
                <motion.div
                  className="xl:text-4xl lg:text-3xl text-2xl font-bold text-white mb-1"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 1 }}
                >
                  {defaultStats.activeTravelers.toLocaleString()}+
                </motion.div>
              )}
              <div className="text-sm text-gray-300 font-medium">
                Active Travelers
              </div>
            </div>

            <div className="group text-center p-4 rounded-lg bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
              <motion.div
                className="inline-block mb-2"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <MapPin className="h-8 w-8 text-primary mx-auto" />
              </motion.div>
              {mounted && (
                <motion.div
                  className="xl:text-4xl lg:text-3xl text-2xl font-bold text-white mb-1"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 1.2 }}
                >
                  {defaultStats.destinations.toLocaleString()}+
                </motion.div>
              )}
              <div className="text-sm text-gray-300 font-medium">
                Destinations
              </div>
            </div>

            <div className="group text-center p-4 rounded-lg bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
              <motion.div
                className="inline-block mb-2"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <TrendingUp className="h-8 w-8 text-primary mx-auto" />
              </motion.div>
              {mounted && (
                <motion.div
                  className="xl:text-4xl lg:text-3xl text-2xl font-bold text-white mb-1"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 1.4 }}
                >
                  {defaultStats.totalTrips.toLocaleString()}+
                </motion.div>
              )}
              <div className="text-sm text-gray-300 font-medium">
                Successful Trips
              </div>
            </div>
          </motion.div> */}
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      {/* <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <motion.div
            className="w-1.5 h-1.5 bg-white rounded-full mt-2"
            animate={{ y: [0, 16, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.div> */}
    </section>
  );
}

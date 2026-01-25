"use client";

import { motion } from "framer-motion";
import { Users, TrendingUp, MessageCircle, Sparkles } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { IUser } from "@/types/user.interface";

interface CommunityStats {
  activeTravelers: number;
  totalTrips: number;
  destinations: number;
  completedTrips: number;
  averageRating: number;
  totalBookings: number;
  totalReviews: number;
}

export default function CommunitySection({
  stats,
  topTravelers,
}: {
  stats: CommunityStats;
  topTravelers: IUser[];
}) {
  const communityStats = [
    {
      label: "Active Members",
      value: stats?.activeTravelers?.toLocaleString() || "100+",
      icon: Users,
    },
    {
      label: "Total Trips Posted",
      value: stats?.totalTrips?.toLocaleString() || "50+",
      icon: TrendingUp,
    },
    {
      label: "Connections Made",
      value: stats?.totalBookings?.toLocaleString() || "200+",
      icon: MessageCircle,
    },
    {
      label: "Happy Travelers",
      value: `${stats?.averageRating ? ((stats.averageRating / 5) * 100).toFixed(0) : "98"}%`,
      icon: Sparkles,
    },
  ];

  const recentMembers =
    topTravelers && topTravelers.length > 0 ? topTravelers : [];

  return (
    <section className="xl:py-20 lg:py-16 md:py-14 py-12 xl:px-24 lg:px-20 md:px-12 px-6 bg-linear-to-br from-background via-primary/5 to-background">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-semibold text-sm mb-6">
            <Users className="h-4 w-4" />
            <span>Growing Community</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Join Our{" "}
            <span className="bg-linear-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Global Community
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Connect with verified travelers from around the world. Our community
            is growing every day!
          </p>

          {/* Top Members Avatars */}
          {recentMembers.length > 0 && (
            <div className="flex justify-center items-center gap-2 mb-8">
              <div className="flex -space-x-4">
                {recentMembers.slice(0, 5).map((user, index) => (
                  <motion.div
                    key={user._id}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    whileHover={{ scale: 1.2, zIndex: 10 }}
                  >
                    <Avatar className="h-12 w-12 border-2 border-background ring-2 ring-primary/20">
                      <AvatarImage
                        src={
                          user.profilePhoto ||
                          `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.fullname}`
                        }
                      />
                      <AvatarFallback>{user.fullname?.[0]}</AvatarFallback>
                    </Avatar>
                  </motion.div>
                ))}
              </div>
              <span className="text-sm text-muted-foreground ml-4 bg-muted/50 px-3 py-1 rounded-full">
                +
                {stats?.activeTravelers
                  ? stats.activeTravelers - recentMembers.length
                  : 1500}{" "}
                travelers active
              </span>
            </div>
          )}
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {communityStats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="relative p-6 shadow-md rounded-2xl border bg-card text-center hover:shadow-xl transition-all duration-300 group"
            >
              <div className="absolute inset-0 rounded-2xl bg-linear-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="relative z-10">
                <div className="inline-flex p-3 rounded-xl bg-primary/10 mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                  <stat.icon className="h-6 w-6" />
                </div>
                <div className="text-3xl font-bold mb-2">{stat.value}</div>
                <div className="text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Community Highlights */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid md:grid-cols-3 gap-6"
        >
          <div className="p-6 shadow-md rounded-2xl border bg-card hover:border-green-500/50 transition-colors duration-300">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-green-500/10">
                <div className="h-3 w-3 rounded-full bg-green-500 animate-pulse" />
              </div>
              <span className="font-semibold">Active Now</span>
            </div>
            <p className="text-2xl font-bold mb-1">
              {stats?.activeTravelers || 0}
            </p>
            <p className="text-sm text-muted-foreground">
              Travelers currently active
            </p>
          </div>

          <div className="p-6 shadow-md rounded-2xl border bg-card hover:border-blue-500/50 transition-colors duration-300">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-blue-500/10">
                <TrendingUp className="h-5 w-5 text-blue-500" />
              </div>
              <span className="font-semibold">Total Bookings</span>
            </div>
            <p className="text-2xl font-bold mb-1">
              {stats?.totalBookings || 0}
            </p>
            <p className="text-sm text-muted-foreground">
              Successful trip connections
            </p>
          </div>

          <div className="p-6 shadow-md rounded-2xl border bg-card hover:border-purple-500/50 transition-colors duration-300">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-purple-500/10">
                <Sparkles className="h-5 w-5 text-purple-500" />
              </div>
              <span className="font-semibold">Verified Stories</span>
            </div>
            <p className="text-2xl font-bold mb-1">
              {stats?.totalReviews || 0}
            </p>
            <p className="text-sm text-muted-foreground">
              5-star experiences shared
            </p>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mt-12"
        >
          <Link href="/register">
            <Button
              size="lg"
              className="rounded-full shadow-lg shadow-primary/20 hover:shadow-primary/40"
            >
              Join Our Community Today
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

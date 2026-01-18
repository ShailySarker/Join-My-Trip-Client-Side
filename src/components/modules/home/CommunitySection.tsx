"use client";

import { motion } from "framer-motion";
import { Users, TrendingUp, MessageCircle, Sparkles } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const communityStats = [
  { label: "Active Members", value: "15K+", icon: Users },
  { label: "Monthly Trips", value: "2.5K+", icon: TrendingUp },
  { label: "Messages Sent", value: "500K+", icon: MessageCircle },
  { label: "Success Rate", value: "98%", icon: Sparkles },
];

const recentMembers = [
  "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=Aneka",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=Lucy",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
];

export default function CommunitySection() {
  return (
    <section className="py-20 bg-gradient-to-br from-background via-primary/5 to-background">
      <div className="container mx-auto px-4">
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
            <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Global Community
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Connect with thousands of verified travelers from around the world.
            Our community is growing every day!
          </p>

          {/* Recent Members Avatars */}
          <div className="flex justify-center items-center gap-2 mb-8">
            <div className="flex -space-x-3">
              {recentMembers.map((avatar, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  whileHover={{ scale: 1.2, zIndex: 10 }}
                >
                  <Avatar className="h-12 w-12 border-2 border-background">
                    <AvatarImage src={avatar} />
                    <AvatarFallback>M</AvatarFallback>
                  </Avatar>
                </motion.div>
              ))}
            </div>
            <span className="text-sm text-muted-foreground ml-2">
              +15,000 travelers joined this month
            </span>
          </div>
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
              className="relative p-6 rounded-2xl border bg-card text-center hover:shadow-xl transition-all duration-300"
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
              
              <div className="relative z-10">
                <div className="inline-flex p-3 rounded-xl bg-primary/10 mb-4">
                  <stat.icon className="h-6 w-6 text-primary" />
                </div>
                <div className="text-3xl font-bold mb-2">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
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
          <div className="p-6 rounded-2xl border bg-card">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-green-500/10">
                <div className="h-3 w-3 rounded-full bg-green-500 animate-pulse" />
              </div>
              <span className="font-semibold">Active Now</span>
            </div>
            <p className="text-2xl font-bold mb-1">1,234</p>
            <p className="text-sm text-muted-foreground">
              Travelers currently online and planning trips
            </p>
          </div>

          <div className="p-6 rounded-2xl border bg-card">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-blue-500/10">
                <TrendingUp className="h-5 w-5 text-blue-500" />
              </div>
              <span className="font-semibold">This Week</span>
            </div>
            <p className="text-2xl font-bold mb-1">456</p>
            <p className="text-sm text-muted-foreground">
              New travel plans created and published
            </p>
          </div>

          <div className="p-6 rounded-2xl border bg-card">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-purple-500/10">
                <Sparkles className="h-5 w-5 text-purple-500" />
              </div>
              <span className="font-semibold">Success Stories</span>
            </div>
            <p className="text-2xl font-bold mb-1">789</p>
            <p className="text-sm text-muted-foreground">
              Completed trips with 5-star ratings
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
            <Button size="lg" className="rounded-full">
              Join Our Community Today
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

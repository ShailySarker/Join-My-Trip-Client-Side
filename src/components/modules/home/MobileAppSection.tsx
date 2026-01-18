"use client";

import { motion } from "framer-motion";
import { Smartphone, Download, Star, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function MobileAppSection() {
  return (
    <section className="py-20 bg-gradient-to-br from-primary/10 via-background to-primary/5">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Phone Mockup */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative flex justify-center lg:justify-start"
          >
            <div className="relative">
              {/* Phone Frame */}
              <motion.div
                className="relative w-[280px] h-[560px] bg-gradient-to-br from-gray-800 to-gray-900 rounded-[3rem] p-3 shadow-2xl"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {/* Notch */}
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-gray-900 rounded-b-2xl z-10" />
                
                {/* Screen */}
                <div className="w-full h-full bg-gradient-to-br from-primary/20 to-background rounded-[2.5rem] overflow-hidden relative">
                  {/* App Screenshot Placeholder */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-primary/5 flex items-center justify-center">
                    <div className="text-center p-8">
                      <Smartphone className="h-20 w-20 text-primary mx-auto mb-4" />
                      <h3 className="text-xl font-bold mb-2">Join My Trip</h3>
                      <p className="text-sm text-muted-foreground">Mobile App</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Floating Elements */}
              <motion.div
                className="absolute -top-4 -right-4 bg-primary text-white px-4 py-2 rounded-full shadow-lg text-sm font-semibold"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                Coming Soon!
              </motion.div>
            </div>
          </motion.div>

          {/* Right Side - Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-semibold text-sm mb-6">
              <Download className="h-4 w-4" />
              <span>Mobile App</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Travel Planning{" "}
              <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                On The Go
              </span>
            </h2>
            
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Download our mobile app for the ultimate travel planning experience.
              Stay connected with your travel buddies, get real-time notifications,
              and manage your trips from anywhere in the world.
            </p>

            {/* Features List */}
            <div className="space-y-4 mb-8">
              <motion.div
                className="flex items-start gap-3"
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="p-2 rounded-lg bg-primary/10">
                  <Zap className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Instant Notifications</h4>
                  <p className="text-sm text-muted-foreground">
                    Get real-time updates about trip changes and messages
                  </p>
                </div>
              </motion.div>

              <motion.div
                className="flex items-start gap-3"
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="p-2 rounded-lg bg-primary/10">
                  <Star className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Offline Access</h4>
                  <p className="text-sm text-muted-foreground">
                    Access your trip details even without internet connection
                  </p>
                </div>
              </motion.div>

              <motion.div
                className="flex items-start gap-3"
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="p-2 rounded-lg bg-primary/10">
                  <Smartphone className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Mobile-First Design</h4>
                  <p className="text-sm text-muted-foreground">
                    Optimized interface for seamless mobile experience
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Download Buttons */}
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="rounded-full" disabled>
                <Download className="mr-2 h-5 w-5" />
                Coming to App Store
              </Button>
              <Button size="lg" variant="outline" className="rounded-full" disabled>
                <Download className="mr-2 h-5 w-5" />
                Coming to Play Store
              </Button>
            </div>

            <p className="text-sm text-muted-foreground mt-4">
              🎉 Be the first to know when we launch! Sign up for our newsletter.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

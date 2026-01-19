"use client";

import { Button } from "@/components/ui/button";
import { Users } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function TravelBuddiesCTA() {
  return (
    <section className="py-24 xl:px-24 lg:px-20 md:px-12 px-6 bg-primary/20 dark:bg-primary/10 relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/30 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/30 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />

      <div className="container relative z-10 px-4 mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto space-y-8"
        >
          <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-primary/10 text-primary mb-4">
            <Users className="w-8 h-8" />
          </div>

          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            Ready to Find Your Travel Buddy?
          </h2>

          <p className="text-xl text-muted-foreground leading-relaxed">
            Do not travel alone. Join our community of explorers and find the
            perfect companion for your next adventure. Filter by destination,
            interests, and budget.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link href="/explore-travelers">
              <Button size="lg" className="h-14 px-8 text-lg rounded-full">
                Find Buddies
              </Button>
            </Link>
            <Link href="/register">
              <Button
                size="lg"
                variant="outline"
                className="h-14 px-8 text-lg rounded-full border-2"
              >
                Join Community
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

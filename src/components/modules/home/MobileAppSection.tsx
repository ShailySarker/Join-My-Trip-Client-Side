/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { motion } from "framer-motion";
import { Calendar, MapPin, ArrowRight, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ITravelPlan } from "@/types/travelPlan.interface";
import { format } from "date-fns";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function FeaturedTripSection({
  featuredTrip,
}: {
  featuredTrip?: ITravelPlan;
}) {
  if (!featuredTrip) return null;

  return (
    <section className="xl:py-20 lg:py-16 md:py-14 py-12 xl:px-24 lg:px-20 md:px-12 px-6 bg-background relative overflow-hidden">
      {/* Background Blur */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

      <div className="container mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-semibold text-sm mb-4">
            <Star className="h-4 w-4 fill-primary" />
            <span>Trip of the Week</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold">Featured Adventure</h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Image Card */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl group cursor-pointer aspect-4/3">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{ backgroundImage: `url(${featuredTrip.image})` }}
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />

              <div className="absolute top-6 left-6 flex gap-2">
                {featuredTrip.travelType && (
                  <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-white text-xs font-medium border border-white/20">
                    {featuredTrip.travelType}
                  </span>
                )}
              </div>

              <div className="absolute bottom-6 left-6 right-6 text-white">
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="w-5 h-5 text-primary" />
                  <span className="font-semibold text-lg">
                    {featuredTrip.destination.city},{" "}
                    {featuredTrip.destination.country}
                  </span>
                </div>
                <div className="text-3xl font-bold">
                  {featuredTrip.budget} BDT{" "}
                  <span className="text-sm font-normal opacity-80">
                    / person
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Side - Details */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <h3 className="text-3xl md:text-5xl font-bold leading-tight">
              {featuredTrip.title}
            </h3>

            <p className="text-lg text-muted-foreground leading-relaxed line-clamp-3">
              {featuredTrip.description}
            </p>

            <div className="grid grid-cols-2 gap-6 py-6 border-y border-border/50">
              <div>
                <p className="text-muted-foreground text-sm mb-1">Dates</p>
                <div className="flex items-center gap-2 font-semibold">
                  <Calendar className="w-5 h-5 text-primary" />
                  <span>
                    {format(new Date(featuredTrip.startDate), "MMM d")} -{" "}
                    {format(new Date(featuredTrip.endDate), "MMM d, yyyy")}
                  </span>
                </div>
              </div>
              <div>
                <p className="text-muted-foreground text-sm mb-1">Host</p>
                <div className="flex items-center gap-2 font-semibold">
                  <Avatar className="w-8 h-8 pointer-events-none">
                    <AvatarImage
                      src={(featuredTrip.host as any)?.profilePhoto}
                    />
                    <AvatarFallback>
                      <User className="w-4 h-4" />
                    </AvatarFallback>
                  </Avatar>
                  <span>
                    {(featuredTrip.host as any)?.fullname || "Verified Host"}
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <Link href={`/travel-plans/${featuredTrip._id}`}>
                <Button
                  size="lg"
                  className="h-12 px-8 text-base rounded-full shadow-lg shadow-primary/20 hover:shadow-primary/40"
                >
                  View Full Itinerary
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// Icon helper
function Star({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path
        fillRule="evenodd"
        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
        clipRule="evenodd"
      />
    </svg>
  );
}

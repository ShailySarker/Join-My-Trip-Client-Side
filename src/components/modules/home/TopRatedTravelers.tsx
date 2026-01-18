"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Star, MapPin, ArrowRight, UserCheck } from "lucide-react";
import Link from "next/link";
import { IUser } from "@/types/user.interface";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface TopRatedTravelersProps {
  travelers: IUser[];
}

export default function TopRatedTravelers({
  travelers,
}: TopRatedTravelersProps) {
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
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  return (
    <section className="pb-20 relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6"
        >
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-2">
              <UserCheck className="w-4 h-4" />
              <span>Community Leaders</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
              Top-Rated Travelers
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl">
              Meet our most trusted and experienced travel companions who have
              helped create amazing journeys.
            </p>
          </div>
          <Link href="/explore-travelers?sortBy=averageRating&sortOrder=desc">
            <Button variant="outline" className="group rounded-full px-6">
              View All Travelers
              <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {travelers.map((traveler) => (
            <motion.div key={traveler._id} variants={itemVariants}>
              <Link
                href={`/explore-travelers/${traveler._id}`}
                className="block h-full"
              >
                <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-border/50 shadow-md h-full bg-card overflow-hidden relative">
                  <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-br from-primary/10 to-primary/5 group-hover:from-primary/20 group-hover:to-primary/10 transition-colors" />
                  
                  <CardContent className="p-6 pt-12 relative">
                    <div className="flex flex-col items-center text-center">
                      <motion.div 
                        whileHover={{ scale: 1.05 }}
                        className="relative"
                      >
                        <Avatar className="w-24 h-24 mb-4 ring-4 ring-background shadow-xl">
                          <AvatarImage
                            src={traveler.profilePhoto || ""}
                            alt={traveler.fullname}
                            className="object-cover"
                          />
                          <AvatarFallback className="text-2xl font-bold bg-primary/10 text-primary">
                            {traveler.fullname.substring(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        {/* Verification Badge (simulated) */}
                        <div className="absolute bottom-4 right-0 bg-background rounded-full p-1 shadow-sm">
                           <div className="bg-blue-500 rounded-full w-4 h-4 text-[10px] flex items-center justify-center text-white">✓</div>
                        </div>
                      </motion.div>

                      <h3 className="text-lg font-bold mb-1 group-hover:text-primary transition-colors">
                        {traveler.fullname}
                      </h3>

                      {traveler.currentLocation?.city ? (
                        <div className="flex items-center gap-1 text-sm text-muted-foreground mb-3">
                          <MapPin className="w-3.5 h-3.5" />
                          {traveler.currentLocation.city}, {traveler.currentLocation.country}
                        </div>
                      ) : (
                         <div className="flex items-center gap-1 text-sm text-muted-foreground mb-3 italic">
                          Global Citizen
                         </div>
                      )}

                      <div className="flex items-center gap-1 mb-6 bg-secondary/50 px-3 py-1 rounded-full">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-semibold text-sm">
                          {traveler.averageRating?.toFixed(1) || "5.0"}
                        </span>
                        <span className="text-xs text-muted-foreground border-l border-border ml-2 pl-2">
                          {traveler.reviewCount || 0} reviews
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-2 justify-center w-full mt-auto">
                        {traveler.travelInterests
                          ?.slice(0, 3)
                          .map((interest: string, idx: number) => (
                            <Badge
                              key={idx}
                              variant="secondary"
                              className="text-[10px] bg-secondary hover:bg-secondary/80"
                            >
                              {interest}
                            </Badge>
                          ))}
                      </div>
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

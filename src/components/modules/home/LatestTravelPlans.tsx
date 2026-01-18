"use client";

import { motion } from "framer-motion";
import { Calendar, MapPin, Users, TrendingUp, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ITravelPlan } from "@/types/travelPlan.interface";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";

interface LatestTravelPlansProps {
  travelPlans: ITravelPlan[];
}

export default function LatestTravelPlans({ travelPlans }: LatestTravelPlansProps) {
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
            <TrendingUp className="h-4 w-4" />
            <span>Latest Adventures</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Recently Posted{" "}
            <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Travel Plans
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover the newest travel opportunities and join fellow adventurers on
            their upcoming journeys
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {travelPlans.slice(0, 6).map((plan, index) => (
            <motion.div
              key={plan._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="group relative rounded-2xl overflow-hidden border bg-card hover:shadow-2xl transition-all duration-300"
            >
              {/* Image */}
              <div className="relative h-56 overflow-hidden">
                {plan.image ? (
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                    style={{ backgroundImage: `url(${plan.image})` }}
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                    <MapPin className="h-16 w-16 text-primary/40" />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                
                {/* Status Badge */}
                <div className="absolute top-4 right-4">
                  <Badge className="bg-primary/90 text-white">
                    {plan.status}
                  </Badge>
                </div>

                {/* Destination */}
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-white font-bold text-xl mb-1">
                    {plan.destination.city}, {plan.destination.country}
                  </h3>
                  <p className="text-white/80 text-sm line-clamp-1">
                    {plan.interests.slice(0, 2).join(" • ")}
                  </p>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-4">
                {/* Title */}
                <h4 className="font-semibold text-lg line-clamp-1">{plan.title}</h4>

                {/* Dates */}
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4 text-primary flex-shrink-0" />
                  <span>
                    {format(new Date(plan.startDate), "MMM dd")} -{" "}
                    {format(new Date(plan.endDate), "MMM dd, yyyy")}
                  </span>
                </div>

                {/* Details */}
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-primary" />
                    <span className="text-muted-foreground">
                      {plan.participants?.length || 0}/{plan.maxGuest} joined
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-primary" />
                    <span className="font-semibold text-primary">
                      ${plan.budget}
                    </span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {plan.description}
                </p>

                {/* View Details Button */}
                <Link href={`/travel-plans/${plan._id}`}>
                  <Button className="w-full group-hover:bg-primary group-hover:text-white transition-colors">
                    View Details
                  </Button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <Link href="/travel-plans">
            <Button size="lg" variant="outline" className="rounded-full">
              View All Travel Plans
              <TrendingUp className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

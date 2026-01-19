"use client";

import { motion } from "framer-motion";
import { Calendar, MapPin, Users, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ITravelPlan } from "@/types/travelPlan.interface";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";

interface LatestTravelPlansProps {
  travelPlans: ITravelPlan[];
}

export default function LatestTravelPlans({
  travelPlans,
}: LatestTravelPlansProps) {
  return (
    // bg-linear-to-br from-primary/80 via-background to-primary/80
    <section className="py-24 bg-muted xl:px-24 lg:px-20 md:px-12 px-6 relative overflow-hidden">
      {/* Background Shapes */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/80 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-primary/80 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
      <div className="container mx-auto">
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
            <span className="bg-linear-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Travel Plans
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover the newest travel opportunities and join fellow adventurers
            on their upcoming journeys
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
                  <div className="absolute inset-0 bg-linear-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                    <MapPin className="h-16 w-16 text-primary/40" />
                  </div>
                )}
                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />

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
                <h4 className="font-semibold text-lg line-clamp-1">
                  {plan.title}
                </h4>

                {/* Dates */}
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4 text-primary shrink-0" />
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
                    <span className="font-semibold text-primary">
                      {plan.budget.toLocaleString()} BDT
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

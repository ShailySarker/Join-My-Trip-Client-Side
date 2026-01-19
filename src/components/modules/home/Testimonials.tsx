/* eslint-disable react/no-unescaped-entities */
"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Quote, Star } from "lucide-react";
import { motion } from "framer-motion";

interface Review {
  _id: string;
  reviewerId: {
    fullname: string;
    profilePhoto?: string;
  };
  comment: string;
  rating: number;
}

export default function Testimonials({ reviews = [] }: { reviews?: Review[] }) {
  if (reviews.length === 0) return null;

  return (
    <section className="py-20 xl:px-24 lg:px-20 md:px-12 px-6 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />

      <div className="container mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 space-y-4"
        >
          <div className="inline-flex items-center justify-center p-2 px-4 rounded-full bg-primary/10 text-primary font-medium text-sm mb-4">
            Testimonials
          </div>
          <h2 className="text-3xl md:text-4xl font-bold">Success Stories</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Hear from travelers who found their perfect companions and created
            unforgettable memories.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <Card className="border-none shadow-lg hover:shadow-2xl transition-all duration-300 h-full bg-card/80 backdrop-blur-sm relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                  <Quote className="w-24 h-24 text-primary rotate-180" />
                </div>

                <CardContent className="p-8 space-y-6 flex flex-col h-full">
                  <Quote className="w-10 h-10 text-primary/50" />
                  <p className="text-muted-foreground italic text-lg leading-relaxed line-clamp-4 grow relative z-10">
                    "{review.comment}"
                  </p>
                  <div className="flex items-center gap-4 pt-6 border-t border-border/50">
                    <Avatar className="w-14 h-14 border-2 border-primary/20 ring-2 ring-background">
                      <AvatarImage
                        src={review.reviewerId?.profilePhoto}
                        className="object-cover"
                      />
                      <AvatarFallback className="bg-primary/10 text-primary font-bold">
                        {review.reviewerId?.fullname?.[0] || "?"}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-bold text-base">
                        {review.reviewerId?.fullname || "Anonymous"}
                      </h4>
                      <div className="flex text-yellow-500 gap-0.5 mt-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3.5 h-3.5 ${i < review.rating ? "fill-current" : "text-muted/30"}`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

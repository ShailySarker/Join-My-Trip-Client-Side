"use client";

import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star, Quote } from "lucide-react";
import { format } from "date-fns";

// Extended interface to match the populated data structure from backend
interface IReviewWithDetails {
  _id: string;
  reviewerId: {
    _id: string;
    fullname: string;
    profilePhoto: string;
    currentLocation?: {
      city: string;
      country: string;
    };
  };
  travelId: {
    _id: string;
    title: string;
    destination: {
      city: string;
      country: string;
    };
    image: string;
    startDate: string | Date;
    endDate: string | Date;
  };
  rating: number;
  comment: string;
  createdAt: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function SuccessStories({ reviews }: { reviews: any[] }) {
  // Cast reviews to the expected type
  const validReviews = reviews as IReviewWithDetails[];

  if (!validReviews || validReviews.length === 0) {
    return (
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Latest Success Stories</h2>
          <p className="text-muted-foreground">
            Stay tuned! Our community is just starting to share their amazing
            journeys.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-background xl:px-24 lg:px-20 md:px-12 px-6">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-semibold text-sm mb-6">
            <Star className="h-4 w-4 fill-current" />
            <span>Success Stories</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Real Travelers,{" "}
            <span className="bg-linear-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Real Adventures
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Join thousands of happy travelers who found their perfect travel
            companions and created amazing memories
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {validReviews.map((review, index) => (
            <motion.div
              key={review._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              whileHover={{ y: -10 }}
              className="group relative rounded-2xl overflow-hidden border bg-card hover:shadow-2xl transition-all duration-300 flex flex-col h-full"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden shrink-0">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                  style={{
                    backgroundImage: `url(${review.travelId?.image || "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800"})`,
                  }}
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-white font-semibold line-clamp-1">
                    {review.travelId?.title}
                  </p>
                  {review?.travelId?.startDate && (
                    <p className="text-white/80 text-sm">
                      {format(new Date(review.travelId.startDate), "MMMM yyyy")}
                    </p>
                  )}
                </div>
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-start gap-4 mb-4">
                  <Avatar className="h-12 w-12 border-2 border-primary">
                    <AvatarImage
                      src={review.reviewerId?.profilePhoto}
                      alt={review.reviewerId?.fullname}
                    />
                    <AvatarFallback>
                      {review.reviewerId?.fullname
                        ?.split(" ")
                        .slice(0, 2)
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold truncate">
                      {review.reviewerId?.fullname}
                    </h4>
                    {review.reviewerId?.currentLocation?.city && (
                      <p className="text-sm text-muted-foreground truncate">
                        {review.reviewerId.currentLocation.city},{" "}
                        {review.reviewerId.currentLocation.country}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${i < review.rating ? "fill-yellow-400 text-yellow-400" : "fill-muted text-muted"}`}
                    />
                  ))}
                </div>

                <div className="relative flex-1">
                  <Quote className="h-8 w-8 text-primary/20 absolute -top-2 -left-2" />
                  <p className="text-muted-foreground text-sm leading-relaxed pl-6 line-clamp-4">
                    {review.comment}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

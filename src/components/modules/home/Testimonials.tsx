/* eslint-disable react/no-unescaped-entities */
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Quote } from "lucide-react";

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
    <section className="py-24">
      <div className="container mx-auto">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold">Success Stories</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Hear from travelers who found their perfect companions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <Card
              key={index}
              className="border-none shadow-md hover:shadow-xl transition-shadow duration-300"
            >
              <CardContent className="p-8 space-y-6">
                <Quote className="w-10 h-10 text-primary" />
                <p className="text-muted-foreground italic text-lg leading-relaxed line-clamp-4">
                  "{review.comment}"
                </p>
                <div className="flex items-center gap-4 pt-4 border-t">
                  <Avatar className="w-12 h-12 border-2 border-primary/20">
                    <AvatarImage src={review.reviewerId?.profilePhoto} />
                    <AvatarFallback>
                      {review.reviewerId?.fullname?.[0] || "?"}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-bold text-sm">
                      {review.reviewerId?.fullname || "Anonymous"}
                    </h4>
                    <div className="flex text-yellow-500 text-xs mt-1">
                      {"★".repeat(review.rating)}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";

import { useState, useEffect } from "react";
import { Star } from "lucide-react";
import {
  ReviewCard,
  StarRating,
} from "@/components/modules/reviews/ReviewCard";
import { getMyReceivedReviews } from "@/services/reviews/reviews.service";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";

type Review = {
  _id: string;
  reviewerId: {
    _id: string;
    fullname: string;
    profilePhoto?: string;
  };
  reviewedUserId: {
    _id: string;
    fullname: string;
    profilePhoto?: string;
  };
  travelPlanId: {
    _id: string;
    title: string;
    destination: {
      city: string;
      country: string;
    };
  };
  rating: number;
  comment: string;
  createdAt: Date;
};

export default function ReceivedReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    setLoading(true);
    try {
      const result = await getMyReceivedReviews();
      if (result.success && result.data) {
        setReviews(result.data);
      } else {
        toast.error(result.message || "Failed to fetch reviews");
      }
    } catch (error) {
      toast.error("An error occurred while fetching reviews");
    } finally {
      setLoading(false);
    }
  };

  const calculateAverageRating = () => {
    if (reviews.length === 0) return 0;
    const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
    return sum / reviews.length;
  };

  const getRatingDistribution = () => {
    const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    reviews.forEach((review) => {
      distribution[review.rating as keyof typeof distribution]++;
    });
    return distribution;
  };

  const averageRating = calculateAverageRating();
  const distribution = getRatingDistribution();

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="xl:text-4xl lg:text-[32px] text-3xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
          Reviews I Received
        </h1>
        <p className="text-muted-foreground mt-1">
          See what other travelers think about you
        </p>
      </div>

      {/* Rating Overview */}
      {!loading && reviews.length > 0 && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Rating Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Average Rating */}
              <div className="flex flex-col items-center justify-center p-6 bg-primary/5 rounded-lg">
                <div className="text-5xl font-bold mb-2">
                  {averageRating.toFixed(1)}
                </div>
                <StarRating rating={averageRating} showValue={false} />
                <p className="text-sm text-muted-foreground mt-2">
                  Based on {reviews.length} review
                  {reviews.length !== 1 ? "s" : ""}
                </p>
              </div>

              {/* Rating Distribution */}
              <div className="space-y-2">
                <h4 className="font-semibold mb-3">Rating Distribution</h4>
                {[5, 4, 3, 2, 1].map((rating) => {
                  const count =
                    distribution[rating as keyof typeof distribution];
                  const percentage =
                    reviews.length > 0 ? (count / reviews.length) * 100 : 0;
                  return (
                    <div key={rating} className="flex items-center gap-3">
                      <div className="flex items-center gap-1 w-12">
                        <span className="text-sm font-medium">{rating}</span>
                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      </div>
                      <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-yellow-400 transition-all"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                      <span className="text-sm text-muted-foreground w-8 text-right">
                        {count}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Reviews Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="space-y-4">
              <Skeleton className="h-64 w-full" />
            </div>
          ))}
        </div>
      ) : reviews.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">⭐</div>
          <h3 className="text-2xl font-semibold mb-2">No reviews yet</h3>
          <p className="text-muted-foreground mb-4">
            You haven't received any reviews yet. Complete trips with others to
            get reviews!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review) => (
            <ReviewCard
              key={review._id}
              review={review}
              showReviewer={true} // Show reviewer info
              canEdit={false}
              canDelete={false}
            />
          ))}
        </div>
      )}
    </div>
  );
}

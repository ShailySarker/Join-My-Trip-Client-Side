"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface PopulatedReview {
  _id: string;
  reviewerId: {
    _id: string;
    fullname: string;
    email: string;
    profilePhoto?: string;
  };
  revieweeId: {
    _id: string;
    fullname: string;
    email: string;
    profilePhoto?: string;
  };
  travelId: {
    _id: string;
    title: string;
  };
  rating: number;
  comment: string;
  createdAt: string;
}

interface ReviewListProps {
  data: PopulatedReview[];
  meta?: {
    page: number;
    limit: number;
    total: number;
    totalPage: number;
  };
  loading?: boolean;
}

export default function ReviewList({ data, meta, loading }: ReviewListProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", newPage.toString());
    router.push(`${pathname}?${params.toString()}`);
  };

  const StarRating = ({ rating }: { rating: number }) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={cn(
              "w-4 h-4",
              star <= rating
                ? "fill-yellow-400 text-yellow-400"
                : "fill-gray-200 text-gray-200 dark:fill-gray-700 dark:text-gray-700"
            )}
          />
        ))}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-32 w-full" />
        ))}
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="text-center py-16 text-muted-foreground border rounded-lg bg-card mt-6">
        <Star className="w-16 h-16 mx-auto mb-4 opacity-30" />
        <h3 className="text-xl font-semibold mb-2">No reviews found</h3>
        <p>Try adjusting your filters</p>
      </div>
    );
  }

  return (
    <Card className="border-0 shadow-none bg-transparent">
        <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">All Reviews</h2>
             <Badge variant="secondary">
              {meta?.total || data.length} reviews
            </Badge>
        </div>
      <div className="space-y-4">
        {data.map((review) => (
          <Card
            key={review._id}
            className="overflow-hidden hover:shadow-md transition-all border-l-4 border-l-primary/30"
          >
            <CardContent className="p-6">
              <div className="space-y-4">
                {/* Header: Reviewer and Reviewee */}
                <div className="flex flex-col md:flex-row items-start justify-between gap-4">
                  <div className="flex-1 space-y-3 w-full">
                    <div className="flex items-center gap-4 flex-wrap">
                    {/* Reviewer */}
                    <div className="flex items-center gap-3 min-w-[200px]">
                      <Avatar className="w-10 h-10 border-2">
                        <AvatarImage src={review.reviewerId?.profilePhoto} />
                        <AvatarFallback>
                          {review.reviewerId?.fullname
                            ?.split(" ")
                            .map((n) => n[0])
                            .join("") || "?"}
                        </AvatarFallback>
                      </Avatar>
                      <div className="min-w-0 flex-1">
                        <p className="font-semibold truncate">
                          {review.reviewerId?.fullname || "Unknown"}
                        </p>
                        <Badge variant="outline" className="text-[10px] h-5">Reviewer</Badge>
                      </div>
                    </div>

                    {/* Arrow / For */}
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <span className="text-xs">reviewed</span>
                      <div className="w-8 h-px bg-border hidden sm:block" />
                    </div>

                    {/* Reviewee */}
                    <div className="flex items-center gap-3 min-w-[200px]">
                      <Avatar className="w-10 h-10 border-2">
                        <AvatarImage src={review.revieweeId?.profilePhoto} />
                        <AvatarFallback>
                          {review.revieweeId?.fullname
                            ?.split(" ")
                            .map((n) => n[0])
                            .join("") || "?"}
                        </AvatarFallback>
                      </Avatar>
                      <div className="min-w-0 flex-1">
                        <p className="font-semibold truncate">
                          {review.revieweeId?.fullname || "Unknown"}
                        </p>
                         <Badge variant="outline" className="text-[10px] h-5">Reviewee</Badge>
                      </div>
                    </div>
                    </div>
                  </div>

                  {/* Rating and Date */}
                  <div className="flex md:flex-col items-center md:items-end gap-2 w-full md:w-auto justify-between md:justify-start">
                    <StarRating rating={review.rating} />
                    <p className="text-xs text-muted-foreground">
                      {new Date(review.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                {/* Travel Plan */}
                <div className="bg-muted/50 p-2 px-3 rounded-lg inline-block">
                  <p className="text-xs text-muted-foreground inline mr-2">
                    Travel Plan:
                  </p>
                  <span className="font-medium text-sm">
                    {review.travelId?.title || "Unknown Trip"}
                  </span>
                </div>

                {/* Comment */}
                <div className="bg-primary/5 p-4 rounded-lg border-l-2 border-primary">
                  <p className="text-sm leading-relaxed">
                    &ldquo;{review.comment}&rdquo;
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Pagination */}
      {meta && meta.totalPage > 1 && (
        <div className="flex items-center justify-between pt-6 mt-6">
          <p className="text-sm text-muted-foreground">
            Page {meta.page} of {meta.totalPage}
          </p>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(meta.page - 1)}
              disabled={meta.page <= 1}
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(meta.page + 1)}
              disabled={meta.page >= meta.totalPage}
            >
              Next
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        </div>
      )}
    </Card>
  );
}

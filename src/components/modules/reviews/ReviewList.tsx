"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { deleteReview } from "@/services/reviews/reviews.service";
import { useState } from "react";
import { Edit, Trash2 } from "lucide-react";

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
    destination?: {
      // destination might be populated as object
      city: string;
      country: string;
    };
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
  variant?: "admin" | "given" | "received";
}

export default function ReviewList({
  data,
  meta,
  loading,
  variant = "admin",
}: ReviewListProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const [deleteReviewId, setDeleteReviewId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", newPage.toString());
    router.push(`${pathname}?${params.toString()}`);
  };

  const handleEdit = (id: string) => {
    router.push(`/dashboard/given-reviews/edit/${id}`);
  };

  const handleDelete = async () => {
    if (!deleteReviewId) return;
    setDeleting(true);
    try {
      const result = await deleteReview(deleteReviewId);
      if (result.success) {
        toast.success("Review deleted successfully");
        router.refresh();
      } else {
        toast.error(result.message || "Failed to delete review");
      }
    } catch (error) {
      console.log(error);
      toast.error("An error occurred while deleting review");
    } finally {
      setDeleting(false);
      setDeleteReviewId(null);
    }
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
    <>
      <Card className="border-0 shadow-none bg-transparent">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">All Reviews</h2>
          <Badge variant="secondary">
            {meta?.total || data.length} reviews
          </Badge>
        </div>
        <div className="grid grid-cols-1 gap-6">
          {data.map((review) => (
            <Card
              key={review._id}
              className="group overflow-hidden border-0 transition-all duration-300 shadow-sm hover:shadow-md ring-1 ring-border/50"
            >
              <CardContent className="p-0">
                <div className="flex flex-col md:flex-row">
                  {/* Left Side: Reviewer & Reviewee Info */}
                  <div className="md:w-1/3 min-w-[300px] p-6 border-r-2  flex flex-col gap-6">
                    {/* Reviewer */}
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <Avatar className="w-12 h-12 border-2 border-background shadow-sm">
                          <AvatarImage src={review.reviewerId?.profilePhoto} />
                          <AvatarFallback className="bg-primary/10 text-primary font-bold">
                            {review.reviewerId?.fullname?.[0]?.toUpperCase() ||
                              "?"}
                          </AvatarFallback>
                        </Avatar>
                        <div className="absolute -bottom-1 -right-1 bg-primary text-primary-foreground text-[10px] px-1.5 py-0.5 rounded-full shadow-sm font-medium">
                          From
                        </div>
                      </div>
                      <div className="min-w-0">
                        <p className="font-semibold truncate text-base">
                          {review.reviewerId?.fullname || "Unknown"}
                        </p>
                        <p className="text-xs text-muted-foreground truncate">
                          {review.reviewerId?.email}
                        </p>
                      </div>
                    </div>

                    <div className="w-px h-8 bg-border/50 ml-6 hidden md:block" />

                    {/* Reviewee */}
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <Avatar className="w-12 h-12 border-2 border-background shadow-sm">
                          <AvatarImage src={review.revieweeId?.profilePhoto} />
                          <AvatarFallback className="bg-secondary text-secondary-foreground font-bold">
                            {review.revieweeId?.fullname?.[0]?.toUpperCase() ||
                              "?"}
                          </AvatarFallback>
                        </Avatar>
                        <div className="absolute -bottom-1 -right-1 bg-secondary text-secondary-foreground text-[10px] px-1.5 py-0.5 rounded-full shadow-sm font-medium border border-primary">
                          To
                        </div>
                      </div>
                      <div className="min-w-0">
                        <p className="font-semibold truncate text-base">
                          {review.revieweeId?.fullname || "Unknown"}
                        </p>
                        <p className="text-xs text-muted-foreground truncate">
                          {review.revieweeId?.email}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Right Side: Review Content */}
                  <div className="flex-1 p-6 flex flex-col justify-between gap-4">
                    <div>
                      <div className="flex items-start justify-between gap-4 mb-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <StarRating rating={review.rating} />
                            <span className="font-bold text-lg">
                              {review.rating}.0
                            </span>
                          </div>
                          <div className="text-xs text-muted-foreground flex items-center gap-2">
                            <span>
                              {new Date(review.createdAt).toLocaleDateString(
                                undefined,
                                {
                                  year: "numeric",
                                  month: "long",
                                  day: "numeric",
                                }
                              )}
                            </span>
                          </div>
                        </div>

                        {variant === "given" && (
                          <div className="flex gap-1 opacity-100 group-hover:opacity-100 transition-opacity">
                            <Button
                              size="sm"
                              variant="ghost"
                              className="h-8 w-8 text-muted-foreground hover:text-primary"
                              onClick={() => handleEdit(review._id)}
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              className="h-8 w-8 text-muted-foreground hover:text-destructive"
                              onClick={() => setDeleteReviewId(review._id)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        )}
                      </div>

                      <div className="relative">
                        <span className="absolute -top-2 -left-2 text-4xl text-muted/20 font-serif leading-none">
                          “
                        </span>
                        <p className="text-sm leading-relaxed text-foreground/90 relative z-10 pl-4 italic">
                          {review.comment}
                        </p>
                        <span className="absolute -bottom-4 right-0 text-4xl text-muted/20 font-serif leading-none">
                          ”
                        </span>
                      </div>
                    </div>

                    <div className="pt-4 mt-2 border-t border-border/40 flex items-center justify-between">
                      <div className="flex items-center gap-2 text-xs bg-primary/5 text-primary px-3 py-1.5 rounded-full font-medium">
                        <span>Trip:</span>
                        <span className="truncate max-w-[200px]">
                          {review.travelId?.title || "Unknown Trip"}
                        </span>
                      </div>
                      {review.travelId?.destination && (
                        <span className="text-xs text-muted-foreground hidden sm:inline-block">
                          {review.travelId.destination.city},{" "}
                          {review.travelId.destination.country}
                        </span>
                      )}
                    </div>
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

      <AlertDialog
        open={!!deleteReviewId}
        onOpenChange={() => setDeleteReviewId(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Review?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this review? This action cannot be
              undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={deleting}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {deleting ? "Deleting..." : "Yes, Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

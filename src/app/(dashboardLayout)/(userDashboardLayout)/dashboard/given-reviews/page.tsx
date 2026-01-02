"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ReviewCard } from "@/components/modules/reviews/ReviewCard";
import {
  getMyGivenReviews,
  deleteReview,
} from "@/services/reviews/reviews.service";
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

export default function GivenReviewsPage() {
  const router = useRouter();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteReviewId, setDeleteReviewId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    setLoading(true);
    try {
      const result = await getMyGivenReviews();
      if (result.success && result.data) {
        setReviews(result.data);
      } else {
        toast.error(result.message || "Failed to fetch reviews");
      }
    } catch (error) {
      console.log(error);
      toast.error("An error occurred while fetching reviews");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (id: string) => {
    router.push(`/dashboard/reviews/edit/${id}`);
  };

  const handleDelete = async () => {
    if (!deleteReviewId) return;

    setDeleting(true);
    try {
      const result = await deleteReview(deleteReviewId);
      if (result.success) {
        toast.success("Review deleted successfully");
        fetchReviews(); // Refresh the list
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

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="xl:text-4xl lg:text-[32px] text-3xl font-bold bg-linear-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Reviews I Gave
          </h1>
          <p className="text-muted-foreground mt-1">
            Reviews you nave written for other travelers
          </p>
        </div>
      </div>

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
            You have not written any reviews yet. Complete a trip and share your
            experience!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review) => (
            <ReviewCard
              key={review._id}
              review={review}
              showReviewer={false} // Show reviewed user instead
              canEdit={true}
              canDelete={true}
              onEdit={handleEdit}
              onDelete={(id) => setDeleteReviewId(id)}
            />
          ))}
        </div>
      )}

      {/* Delete Confirmation Dialog */}
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
    </div>
  );
}

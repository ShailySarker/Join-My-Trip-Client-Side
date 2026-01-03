"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { StarRatingInput } from "./ReviewCard";
import { updateReview } from "@/services/reviews/reviews.service";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

interface EditReviewFormProps {
  reviewId: string;
  initialRating: number;
  initialComment: string;
}

export default function EditReviewForm({
  reviewId,
  initialRating,
  initialComment,
}: EditReviewFormProps) {
  const router = useRouter();
  const [rating, setRating] = useState(initialRating);
  const [comment, setComment] = useState(initialComment);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (rating === 0) {
      toast.error("Please select a rating");
      return;
    }

    if (!comment.trim()) {
      toast.error("Please write a comment");
      return;
    }

    setSubmitting(true);
    try {
      const result = await updateReview(reviewId, {
        rating,
        comment,
      });

      if (result.success) {
        router.push("/dashboard/given-reviews");
        toast.success("Review updated successfully");
        router.refresh();
      } else {
        toast.error(result.message || "Failed to update review");
      }
    } catch (error) {
      console.log(error);
      toast.error("An error occurred");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">Rating</label>
            <StarRatingInput
              value={rating}
              onChange={setRating}
              disabled={submitting}
            />
            <p className="text-xs text-muted-foreground">
              Click on a star to rate
            </p>
          </div>

          <div className="space-y-2">
            <label htmlFor="comment" className="text-sm font-medium">
              Your Review
            </label>
            <Textarea
              id="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Share your experience..."
              className="min-h-[150px]"
              disabled={submitting}
            />
          </div>

          <div className="flex justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
              disabled={submitting}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={submitting}>
              {submitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Updating...
                </>
              ) : (
                "Update Review"
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

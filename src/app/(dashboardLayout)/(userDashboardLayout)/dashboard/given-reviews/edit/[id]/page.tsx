import React from "react";
import { getReviewById } from "@/services/reviews/reviews.service";
import EditReviewForm from "@/components/modules/reviews/EditReviewForm";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function ReviewEditPage(props: {
  params: Promise<{ id: string }>;
}) {
  const params = await props.params;
  const { id } = params;

  const result = await getReviewById(id);

  if (!result?.success || !result?.data) {
    if (result?.statusCode === 404) {
      notFound();
    }
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-red-500">
          Failed to load review. Please try again later.
        </div>
      </div>
    );
  }

  const review = result.data;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="xl:text-4xl lg:text-[32px] text-3xl font-bold bg-linear-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
          Edit Your Review
        </h1>
        <p className="text-muted-foreground mt-1">
          Update your rating and feedback for{" "}
          <strong>{review.revieweeId?.fullname}</strong>
        </p>
      </div>

      <EditReviewForm
        reviewId={review._id}
        initialRating={review.rating}
        initialComment={review.comment}
      />
    </div>
  );
}

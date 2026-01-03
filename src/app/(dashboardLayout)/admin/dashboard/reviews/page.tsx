/* eslint-disable @typescript-eslint/no-explicit-any */
import { getAllReviews } from "@/services/reviews/reviews.service";
import ReviewFilter from "@/components/modules/reviews/ReviewFilter";
import ReviewList from "@/components/modules/reviews/ReviewList";

export const dynamic = "force-dynamic";

export default async function AdminReviewsPage2(props: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const searchParams = await props.searchParams;

  const query: Record<string, any> = {};
  if (searchParams.search) query.search = searchParams.search;
  if (searchParams.rating) query.rating = searchParams.rating;
  if (searchParams.sortBy) query.sortBy = searchParams.sortBy;
  if (searchParams.sortOrder) query.sortOrder = searchParams.sortOrder;
  if (searchParams.page) query.page = searchParams.page;
  if (searchParams.limit) query.limit = searchParams.limit;

  // Default sort
  if (!query.sortBy) query.sortBy = "createdAt";
  if (!query.sortOrder) query.sortOrder = "desc";

  const result = await getAllReviews(query);
  const reviews = result?.data || [];
  const meta = result?.meta;

  return (
    <div className="container mx-auto px-4 py-8 space-y-6">
      <div className="space-y-2">
        <h1 className="xl:text-4xl lg:text-[32px] text-3xl font-bold bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
          Manage Reviews 📝
        </h1>
        <p className="text-muted-foreground text-lg">
          Monitor and manage all user reviews
        </p>
      </div>

      <ReviewFilter />
      <ReviewList data={reviews} meta={meta} />
    </div>
  );
}

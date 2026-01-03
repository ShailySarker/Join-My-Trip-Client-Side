/* eslint-disable @typescript-eslint/no-explicit-any */
import ReviewFilter from "@/components/modules/reviews/ReviewFilter";
import ReviewList from "@/components/modules/reviews/ReviewList";
import { getMyReceivedReviews } from "@/services/reviews/reviews.service";

export const dynamic = "force-dynamic";

export default async function ReceivedReviewsPage(props: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const searchParams = await props.searchParams;

  const query: Record<string, any> = {};
  if (searchParams.searchTerm) query.searchTerm = searchParams.searchTerm;
  if (searchParams.rating) query.rating = searchParams.rating;
  if (searchParams.sortBy) query.sortBy = searchParams.sortBy;
  if (searchParams.sortOrder) query.sortOrder = searchParams.sortOrder;
  if (searchParams.page) query.page = searchParams.page;
  if (searchParams.limit) query.limit = searchParams.limit;

  // Default sort
  if (!query.sortBy) query.sortBy = "createdAt";
  if (!query.sortOrder) query.sortOrder = "desc";

  const result = await getMyReceivedReviews(query);
  const reviews = result?.data || [];
  const meta = result?.meta;

  return (
    <div className="container mx-auto px-4 py-8 space-y-6">
      <div className="space-y-2">
        <h1 className="xl:text-4xl lg:text-[32px] text-3xl font-bold bg-linear-to-r from-primary to-primary/60 bg-clip-text text-transparent">
          Reviews I Received
        </h1>
        <p className="text-muted-foreground text-lg">
          See what other travelers think about you
        </p>
      </div>

      <ReviewFilter />
      <ReviewList data={reviews} meta={meta} variant="received" />
    </div>
  );
}

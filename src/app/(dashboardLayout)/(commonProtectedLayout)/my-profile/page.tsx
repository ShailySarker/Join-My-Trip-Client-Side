/* eslint-disable @typescript-eslint/no-explicit-any */
import ProfileView from "@/components/modules/profile/ProfileView";
import { Card, CardContent } from "@/components/ui/card";
import { getUserInfo } from "@/services/auth/getUserInfo";

const MyProfilePage = async () => {
  const user = await getUserInfo();

  return (
    <div className="container mx-auto xl:p-4">
      <h1 className="text-2xl font-bold mb-6">My Profile</h1>
      <ProfileView user={user} />

      {/* Reviews Section */}
      {user?.reviewCount > 0 && (
        <div className="space-y-4 mt-8">
          <h2 className="text-xl font-bold flex items-center gap-2">
            {/* <Star className="w-5 h-5" /> */}
            My Reviews ({user?.reviewCount || 0})
          </h2>

          {user?._id && <ReviewsList userId={user._id} />}
        </div>
      )}
    </div>
  );
};

// Separate component for fetching reviews
async function ReviewsList({ userId }: { userId: string }) {
  const { getUserReviews } = await import("@/services/reviews/reviews.service");
  const { ReviewCard } =
    await import("@/components/modules/reviews/ReviewCard");

  const reviewsResponse = await getUserReviews(userId);
  const reviews = reviewsResponse?.data || [];

  // Note: For "My Profile", we probably want to see reviews Received by me.
  // getUserReviews fetches by revieweeId, so it is correct (reviews received by userId).

  if (reviews.length === 0) {
    return (
      <Card>
        <CardContent className="py-8 text-center text-muted-foreground">
          No reviews yet.
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {reviews.map((review: any) => (
        <ReviewCard
          key={review._id}
          review={review}
          showReviewer={true} // Show who GAVE the review
        />
      ))}
    </div>
  );
}

export default MyProfilePage;

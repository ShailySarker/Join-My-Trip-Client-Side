/* eslint-disable @typescript-eslint/no-explicit-any */
import { getUserInfo } from "@/services/auth/getUserInfo";
import { getSingleUser } from "@/services/user/userService";
import { redirect } from "next/navigation";
import { IUserRole } from "@/types/user.interface";
import {
  MapPin,
  Mail,
  Phone,
  Calendar,
  Users,
  Eye,
  Star,
  Award,
  Globe,
  Heart,
  CheckIcon,
  ShieldCheckIcon,
} from "lucide-react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface UserDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

const UserDetailPage = async ({ params }: UserDetailPageProps) => {
  // Await params (Next.js 15 requirement)
  const { id } = await params;

  const userInfo = await getUserInfo();

  if (!userInfo) {
    redirect("/login");
  }

  // Check if user has access (subscription for USER role, or ADMIN/SUPER_ADMIN)
  const hasActiveSubscription =
    userInfo.subscriptionInfo?.status === "ACTIVE" &&
    (userInfo.subscriptionInfo?.plan === "MONTHLY" ||
      userInfo.subscriptionInfo?.plan === "YEARLY");

  if (
    userInfo.role === IUserRole.USER &&
    !hasActiveSubscription &&
    userInfo._id !== id
  ) {
    redirect("/subscription");
  }

  // Fetch user details
  const userResponse = await getSingleUser(id);
  const user = userResponse.data;

  if (!user) {
    return (
      <div className="container mx-auto xl:p-4">
        <div className="text-center py-16">
          <h2 className="text-2xl font-bold text-muted-foreground">
            User not found
          </h2>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto xl:p-4 space-y-6">
      {/* Back Button */}
      <div>
        <Link
          href={
            userInfo.role === IUserRole.USER
              ? "/dashboard/explore-travelers"
              : "/admin/dashboard/manage-users"
          }
        >
          <Button variant="ghost" size="sm">
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back
          </Button>
        </Link>
      </div>

      {/* Profile Header */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Profile Photo */}
            <div className="shrink-0">
              <div className="relative w-32 h-32 mx-auto md:mx-0">
                <Image
                  src={user.profilePhoto || "/default-avatar.svg"}
                  alt={user.fullname}
                  fill
                  className="rounded-full object-cover ring-4 ring-primary/20"
                />
                {user.isVerified && (
                  <div className="absolute bottom-0 right-1 bg-blue-500 rounded-full p-2">
                    <CheckIcon className="w-4 h-4 text-white" />
                  </div>
                )}
              </div>
            </div>

            {/* Profile Info */}
            <div className="flex-1 space-y-4">
              <div>
                <h1 className="text-3xl font-bold flex items-center gap-2">
                  {user.fullname}
                  {user.subscriptionInfo?.status === "ACTIVE" &&
                    (user.subscriptionInfo?.plan === "MONTHLY" ||
                      user.subscriptionInfo?.plan === "YEARLY") && (
                      <ShieldCheckIcon className="h-7 w-7 text-primary" />
                    )}
                </h1>
                {user.bio && (
                  <p className="text-muted-foreground mt-2">{user.bio}</p>
                )}
              </div>

              {/* Contact & Location */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="w-4 h-4 text-muted-foreground" />
                  <span>{user.email}</span>
                </div>
                {user.phone && (
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="w-4 h-4 text-muted-foreground" />
                    <span>{user.phone}</span>
                  </div>
                )}
                {user.currentLocation && (
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    <span>
                      {user.currentLocation.city},{" "}
                      {user.currentLocation.country}
                    </span>
                  </div>
                )}
                {user.age && (
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <span>{user.age} years old</span>
                  </div>
                )}
              </div>

              {/* Badges */}
              <div className="flex flex-wrap gap-2">
                <Badge variant={user.isVerified ? "default" : "outline"}>
                  {user.isVerified ? "Verified" : "Unverified"}
                </Badge>
                <Badge variant="outline">{user.role}</Badge>
                {user.gender && <Badge variant="outline">{user.gender}</Badge>}
                {user.subscriptionInfo?.plan && (
                  <Badge
                    variant={
                      user.subscriptionInfo.status === "ACTIVE"
                        ? "default"
                        : "outline"
                    }
                  >
                    {user.subscriptionInfo.plan} -{" "}
                    {user.subscriptionInfo.status}
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Followers
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Users className="w-5 h-5 text-primary" />
              </div>
              <span className="text-2xl font-bold">
                {user.myFollowers?.length || 0}
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Following
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-500/10 rounded-lg">
                <Heart className="w-5 h-5 text-blue-500" />
              </div>
              <span className="text-2xl font-bold">
                {user.myFollowings?.length || 0}
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Profile Views
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-500/10 rounded-lg">
                <Eye className="w-5 h-5 text-green-500" />
              </div>
              <span className="text-2xl font-bold">
                {user.totalProfileViews || 0}
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Rating
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-yellow-500/10 rounded-lg">
                <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
              </div>
              <div>
                <span className="text-2xl font-bold">
                  {user.averageRating?.toFixed(1) || "0.0"}
                </span>
                <span className="text-sm text-muted-foreground ml-2">
                  ({user.reviewCount || 0})
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Travel Interests */}
      {user.travelInterests && user.travelInterests.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="w-5 h-5" />
              Travel Interests
            </CardTitle>
            <CardDescription>
              Explore what types of travel experiences this user enjoys
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {user.travelInterests.map((interest, index) => (
                <Badge key={index} variant="outline" className="text-sm">
                  {interest}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Visited Countries */}
      {user.visitedCountries && user.visitedCountries.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="w-5 h-5" />
              Visited Countries
            </CardTitle>
            <CardDescription>
              {user.visitedCountries.length} countries explored
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {user.visitedCountries.map((country, index) => (
                <Badge key={index} variant="secondary" className="text-sm">
                  {country}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
      {/* </div> */}

      {/* Reviews Section */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <Star className="w-5 h-5" />
          Reviews ({user.reviewCount || 0})
        </h2>

        <ReviewsList userId={id} />
      </div>
    </div>
  );
};

// Separate component for fetching reviews to keep main page cleaner or just inline it
// Since this is a server component, we can just fetch here if we want,
// but let's make a small helper component or just do it inline.
// Actually, let's do it right here.

async function ReviewsList({ userId }: { userId: string }) {
  // We need to import this function
  const { getUserReviews } = await import("@/services/reviews/reviews.service");
  const { ReviewCard } = await import(
    "@/components/modules/reviews/ReviewCard"
  );

  const reviewsResponse = await getUserReviews(userId);
  const reviews = reviewsResponse?.data || [];

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

export default UserDetailPage;

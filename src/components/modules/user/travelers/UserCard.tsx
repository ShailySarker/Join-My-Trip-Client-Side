"use client";

import { IUser } from "@/types/user.interface";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  MapPin,
  Users,
  Heart,
  Eye,
  Star,
  CheckIcon,
  ShieldCheckIcon,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { toggleFollow } from "@/services/user/toggleFollow";
import { toast } from "sonner";
import { IUserRole } from "@/types/user.interface";
import { useRouter } from "next/navigation";

interface UserCardProps {
  user: IUser;
  currentUser?: IUser | null;
  showFollowButton?: boolean;
  showViewButton?: boolean;
}

export default function UserCard({
  user,
  currentUser,
  showFollowButton = false,
  showViewButton = true,
}: UserCardProps) {
  const router = useRouter();
  const [isFollowing, setIsFollowing] = useState(
    currentUser?.myFollowings?.includes(user._id || "") || false
  );
  const [isLoading, setIsLoading] = useState(false);
  const hasActiveSubscription =
    user.subscriptionInfo?.status === "ACTIVE" &&
    (user.subscriptionInfo?.plan === "MONTHLY" ||
      user.subscriptionInfo?.plan === "YEARLY");

  const handleFollowToggle = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!currentUser) {
      toast.error("Please login to follow users");
      return;
    }

    // Check if user has an active subscription
    const hasActiveSubscription =
      currentUser.subscriptionInfo?.status === "ACTIVE" &&
      (currentUser.subscriptionInfo?.plan === "MONTHLY" ||
        currentUser.subscriptionInfo?.plan === "YEARLY");

    if (!hasActiveSubscription) {
      toast.error("You need an active subscription to follow users");
      router.push("/subscription");
      return;
    }

    setIsLoading(true);
    try {
      const result = await toggleFollow(user._id || "");
      if (result.success) {
        setIsFollowing(result.data.isFollowing);
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.error("Error toggling follow:", error);
      toast.error("Failed to update follow status");
    } finally {
      setIsLoading(false);
    }
  };

  const handleViewProfile = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!currentUser) {
      toast.error("Please login to view user profiles");
      return;
    }

    // Check if user has an active subscription
    const hasActiveSubscription =
      currentUser.subscriptionInfo?.status === "ACTIVE" &&
      (currentUser.subscriptionInfo?.plan === "MONTHLY" ||
        currentUser.subscriptionInfo?.plan === "YEARLY");

    if (!hasActiveSubscription && currentUser.role === IUserRole.USER) {
      toast.info(
        "To see user details, you need to purchase our subscription plan"
      );
      router.push("/subscription");
      return;
    }

    // Redirect based on user role
    const url =
      currentUser.role === IUserRole.USER
        ? `/dashboard/explore-travelers/${user._id}`
        : // ? `/dashboard/user/${user._id}`
          `/admin/dashboard/manage-users/${user._id}`;
    window.location.href = url;
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 border-border/60 group">
      <CardHeader className="pb-0 relative lg:px-3.5 px-3">
        {/* Profile Photo */}
        <div className="flex flex-col items-start gap-3">
          <div className="relative w-32 h-32 shrink-0 mx-auto">
            <Image
              src={user.profilePhoto || "/default-avatar.svg"}
              alt={user.fullname}
              fill
              className="rounded-full object-cover ring-2 ring-primary/10 group-hover:ring-primary/30 transition-all"
            />
            {user.isVerified && (
              <div className="absolute bottom-0 right-1 bg-blue-500 rounded-full p-1">
                <CheckIcon className="w-5 h-5 text-white" />
              </div>
            )}
          </div>

          <div className="flex-1 min-w-0">
            <CardTitle className="text-lg mb-1 truncate flex items-center gap-1">
              {user.fullname}{" "}
              {hasActiveSubscription && (
                <ShieldCheckIcon className="w-4 h-4 text-primary" />
              )}
            </CardTitle>
            <CardDescription className="text-xs truncate">
              {user.email}
            </CardDescription>

            {/* Location */}
            {user.currentLocation && (
              <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
                <MapPin className="w-3 h-3" />
                <span className="truncate">
                  {user.currentLocation.city}, {user.currentLocation.country}
                </span>
              </div>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4 lg:px-3.5 px-3">
        {/* Bio */}
        {user.bio && (
          <p className="text-sm text-muted-foreground line-clamp-2">
            {user.bio}
          </p>
        )}

        {/* Stats */}
        <div className="grid grid-cols-2 gap-2">
          <div className="flex items-center gap-2 text-xs bg-accent/50 rounded-md p-2">
            <Users className="w-4 h-4 text-primary" />
            <div>
              <p className="font-semibold">{user.myFollowers?.length || 0}</p>
              <p className="text-muted-foreground">Followers</p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs bg-accent/50 rounded-md p-2">
            <Eye className="w-4 h-4 text-primary" />
            <div>
              <p className="font-semibold">{user.totalProfileViews || 0}</p>
              <p className="text-muted-foreground">Views</p>
            </div>
          </div>

          {user.averageRating !== undefined && user.averageRating > 0 && (
            <div className="flex items-center gap-2 text-xs bg-accent/50 rounded-md p-2 col-span-2">
              <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
              <div>
                <p className="font-semibold">
                  {user.averageRating.toFixed(1)} ({user.reviewCount || 0}{" "}
                  reviews)
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Travel Interests */}
        {user.travelInterests && user.travelInterests.length > 0 && (
          <div className="space-y-2">
            <p className="text-xs font-semibold text-muted-foreground">
              Travel Interests
            </p>
            <div className="flex flex-wrap gap-1">
              {user.travelInterests.slice(0, 3).map((interest, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="text-[11px] bg-primary/5"
                >
                  {interest}
                </Badge>
              ))}
              {user.travelInterests.length > 3 && (
                <Badge variant="outline" className="text-[11px]">
                  +{user.travelInterests.length - 3} more
                </Badge>
              )}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-2 pt-2">
          {showViewButton && (
            <Button
              variant="outline"
              className="flex items-center gap-1 text-sm"
              onClick={handleViewProfile}
            >
              <Eye className="w-4 h-4" />
              View
            </Button>
          )}

          {showFollowButton && currentUser && currentUser._id !== user._id && (
            <Button
              variant={isFollowing ? "secondary" : "default"}
              className="flex items-center gap-1 text-sm"
              onClick={handleFollowToggle}
              disabled={isLoading}
            >
              <Heart
                className={`w-4 h-4 ${isFollowing ? "fill-current" : ""}`}
              />
              {isLoading ? "Loading..." : isFollowing ? "Unfollow" : "Follow"}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

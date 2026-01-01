"use client";

import { format } from "date-fns";
import { Star, Edit, Trash2, User, MapPin } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface ReviewCardProps {
  review: {
    _id: string;
    reviewerId?: {
      _id: string;
      fullname: string;
      profilePhoto?: string;
    };
    reviewedUserId?: {
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
  showReviewer?: boolean; // If true, show reviewer info; if false, show reviewed user info
  canEdit?: boolean;
  canDelete?: boolean;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

export function ReviewCard({
  review,
  showReviewer = true,
  canEdit = false,
  canDelete = false,
  onEdit,
  onDelete,
}: ReviewCardProps) {
  const userToShow = showReviewer ? review.reviewerId : review.reviewedUserId;

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${
              i < rating
                ? "fill-yellow-400 text-yellow-400"
                : "fill-gray-200 text-gray-200 dark:fill-gray-700 dark:text-gray-700"
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="h-12 w-12">
              <AvatarImage
                src={userToShow?.profilePhoto}
                alt={userToShow?.fullname || "User"}
              />
              <AvatarFallback>
                <User className="w-6 h-6" />
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold">{userToShow?.fullname || "Unknown User"}</h3>
              <div className="flex items-center gap-2 mt-1">
                {renderStars(review.rating)}
                <span className="text-sm font-medium text-muted-foreground">
                  {review.rating}.0
                </span>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            {canEdit && onEdit && (
              <Button
                size="sm"
                variant="ghost"
                onClick={() => onEdit(review._id)}
              >
                <Edit className="w-4 h-4" />
              </Button>
            )}
            {canDelete && onDelete && (
              <Button
                size="sm"
                variant="ghost"
                onClick={() => onDelete(review._id)}
              >
                <Trash2 className="w-4 h-4 text-destructive" />
              </Button>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        {/* Comment */}
        <p className="text-sm leading-relaxed">{review.comment}</p>

        {/* Travel Plan */}
        <div className="bg-primary/5 rounded-lg p-3">
          <p className="text-xs text-muted-foreground mb-1">Travel Plan</p>
          <h4 className="font-medium text-sm">{review.travelPlanId.title}</h4>
          <div className="flex items-center gap-1 mt-1">
            <MapPin className="w-3 h-3 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">
              {review.travelPlanId.destination.city},{" "}
              {review.travelPlanId.destination.country}
            </span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="border-t pt-3">
        <span className="text-xs text-muted-foreground">
          {format(new Date(review.createdAt), "MMMM d, yyyy 'at' h:mm a")}
        </span>
      </CardFooter>
    </Card>
  );
}

// Star Rating Display Component (read-only)
export function StarRating({ rating, showValue = true }: { rating: number; showValue?: boolean }) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`w-5 h-5 ${
              i < Math.floor(rating)
                ? "fill-yellow-400 text-yellow-400"
                : i < rating
                ? "fill-yellow-200 text-yellow-200"
                : "fill-gray-200 text-gray-200 dark:fill-gray-700 dark:text-gray-700"
            }`}
          />
        ))}
      </div>
      {showValue && (
        <span className="text-sm font-semibold">{rating.toFixed(1)}</span>
      )}
    </div>
  );
}

// Interactive Star Rating Component (for forms)
export function StarRatingInput({
  value,
  onChange,
  disabled = false,
}: {
  value: number;
  onChange: (rating: number) => void;
  disabled?: boolean;
}) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <button
          key={i}
          type="button"
          disabled={disabled}
          onClick={() => onChange(i + 1)}
          onMouseEnter={(e) => {
            if (!disabled) {
              const stars = e.currentTarget.parentElement?.querySelectorAll("button");
              stars?.forEach((star, idx) => {
                const starIcon = star.querySelector("svg");
                if (starIcon) {
                  if (idx <= i) {
                    starIcon.classList.add("fill-yellow-400", "text-yellow-400");
                    starIcon.classList.remove("fill-gray-200", "text-gray-200");
                  } else {
                    starIcon.classList.remove("fill-yellow-400", "text-yellow-400");
                    starIcon.classList.add("fill-gray-200", "text-gray-200");
                  }
                }
              });
            }
          }}
          onMouseLeave={(e) => {
            if (!disabled) {
              const stars = e.currentTarget.parentElement?.querySelectorAll("button");
              stars?.forEach((star, idx) => {
                const starIcon = star.querySelector("svg");
                if (starIcon) {
                  if (idx < value) {
                    starIcon.classList.add("fill-yellow-400", "text-yellow-400");
                    starIcon.classList.remove("fill-gray-200", "text-gray-200");
                  } else {
                    starIcon.classList.remove("fill-yellow-400", "text-yellow-400");
                    starIcon.classList.add("fill-gray-200", "text-gray-200");
                  }
                }
              });
            }
          }}
          className="focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded disabled:cursor-not-allowed"
        >
          <Star
            className={`w-8 h-8 transition-colors ${
              i < value
                ? "fill-yellow-400 text-yellow-400"
                : "fill-gray-200 text-gray-200 dark:fill-gray-700 dark:text-gray-700"
            }`}
          />
        </button>
      ))}
    </div>
  );
}

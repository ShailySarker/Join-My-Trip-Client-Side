"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Star,
  Search,
  Filter,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";
import { getAllReviews } from "@/services/reviews/reviews.service";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

type Review = {
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
  };
  rating: number;
  comment: string;
  createdAt: string;
};

export default function AdminReviewsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  // Filter states
  const [searchTerm, setSearchTerm] = useState(
    searchParams.get("search") || ""
  );
  const [ratingFilter, setRatingFilter] = useState(
    searchParams.get("rating") || "all"
  );
  const [sortBy, setSortBy] = useState(searchParams.get("sort") || "newest");

  useEffect(() => {
    fetchReviews();
  }, [currentPage, ratingFilter, sortBy]);

  const fetchReviews = async () => {
    setLoading(true);
    try {
      const result = await getAllReviews();
      if (result.success && result.data) {
        // Filter and sort on client side for now
        let filteredReviews = [...result.data];

        // Apply rating filter
        if (ratingFilter !== "all") {
          const rating = parseInt(ratingFilter);
          filteredReviews = filteredReviews.filter(
            (review) => review.rating === rating
          );
        }

        // Apply search filter
        if (searchTerm) {
          filteredReviews = filteredReviews.filter(
            (review) =>
              review.reviewerId.fullname
                .toLowerCase()
                .includes(searchTerm.toLowerCase()) ||
              review.revieweeId.fullname
                .toLowerCase()
                .includes(searchTerm.toLowerCase()) ||
              review.comment.toLowerCase().includes(searchTerm.toLowerCase())
          );
        }

        // Apply sorting
        filteredReviews.sort((a, b) => {
          switch (sortBy) {
            case "newest":
              return (
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime()
              );
            case "oldest":
              return (
                new Date(a.createdAt).getTime() -
                new Date(b.createdAt).getTime()
              );
            case "highest":
              return b.rating - a.rating;
            case "lowest":
              return a.rating - b.rating;
            default:
              return 0;
          }
        });

        // Pagination
        const itemsPerPage = 10;
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const paginatedReviews = filteredReviews.slice(startIndex, endIndex);

        setReviews(paginatedReviews);
        setTotalPages(Math.ceil(filteredReviews.length / itemsPerPage));
      } else {
        toast.error(result.message || "Failed to fetch reviews");
      }
    } catch (error) {
      toast.error("An error occurred while fetching reviews");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    setCurrentPage(1);
    fetchReviews();
  };

  const handleClearFilters = () => {
    setSearchTerm("");
    setRatingFilter("all");
    setSortBy("newest");
    setCurrentPage(1);
    router.push("/admin/dashboard/manage-reviews");
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

  return (
    <div className="container mx-auto px-4 py-8 space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="xl:text-4xl lg:text-[32px] text-3xl font-bold bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
          Manage Reviews 📝
        </h1>
        <p className="text-muted-foreground text-lg">
          Monitor and manage all user reviews
        </p>
      </div>

      {/* Filters */}
      <Card className="border-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="w-5 h-5" />
            Filters & Search
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search by reviewer, reviewee, or comment..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Rating Filter */}
            <Select value={ratingFilter} onValueChange={setRatingFilter}>
              <SelectTrigger className="w-full md:w-[200px]">
                <SelectValue placeholder="Filter by rating" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Ratings</SelectItem>
                <SelectItem value="5">5 Stars</SelectItem>
                <SelectItem value="4">4 Stars</SelectItem>
                <SelectItem value="3">3 Stars</SelectItem>
                <SelectItem value="2">2 Stars</SelectItem>
                <SelectItem value="1">1 Star</SelectItem>
              </SelectContent>
            </Select>

            {/* Sort By */}
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full md:w-[200px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="oldest">Oldest First</SelectItem>
                <SelectItem value="highest">Highest Rating</SelectItem>
                <SelectItem value="lowest">Lowest Rating</SelectItem>
              </SelectContent>
            </Select>

            {/* Clear Filters Button */}
            <Button
              variant="outline"
              onClick={handleClearFilters}
              className="w-full md:w-auto"
            >
              <X className="w-4 h-4 mr-2" />
              Clear
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Reviews List */}
      <Card className="border-2">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>All Reviews</CardTitle>
            <Badge variant="secondary" className="ml-auto">
              {loading ? "..." : reviews.length} reviews
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="space-y-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} className="h-32 w-full" />
              ))}
            </div>
          ) : reviews.length === 0 ? (
            <div className="text-center py-16 text-muted-foreground">
              <Star className="w-16 h-16 mx-auto mb-4 opacity-30" />
              <h3 className="text-xl font-semibold mb-2">No reviews found</h3>
              <p>Try adjusting your filters</p>
            </div>
          ) : (
            <div className="space-y-4">
              {reviews.map((review) => (
                <Card
                  key={review._id}
                  className="overflow-hidden hover:shadow-md transition-all border-l-4 border-l-primary/30"
                >
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      {/* Header: Reviewer and Reviewee */}
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 space-y-3">
                          {/* Reviewer */}
                          <div className="flex items-center gap-3">
                            <Avatar className="w-10 h-10 border-2">
                              <AvatarImage
                                src={review.reviewerId.profilePhoto}
                              />
                              <AvatarFallback>
                                {review.reviewerId.fullname
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div className="min-w-0 flex-1">
                              <p className="font-semibold truncate">
                                {review.reviewerId.fullname}
                              </p>
                              <p className="text-sm text-muted-foreground truncate">
                                {review.reviewerId.email}
                              </p>
                            </div>
                            <Badge variant="outline">Reviewer</Badge>
                          </div>

                          {/* Arrow / For */}
                          <div className="flex items-center gap-2 pl-10">
                            <div className="h-px flex-1 bg-border" />
                            <span className="text-xs text-muted-foreground">
                              reviewed
                            </span>
                            <div className="h-px flex-1 bg-border" />
                          </div>

                          {/* Reviewee */}
                          <div className="flex items-center gap-3">
                            <Avatar className="w-10 h-10 border-2">
                              <AvatarImage
                                src={review.revieweeId.profilePhoto}
                              />
                              <AvatarFallback>
                                {review.revieweeId.fullname
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div className="min-w-0 flex-1">
                              <p className="font-semibold truncate">
                                {review.revieweeId.fullname}
                              </p>
                              <p className="text-sm text-muted-foreground truncate">
                                {review.revieweeId.email}
                              </p>
                            </div>
                            <Badge variant="outline">Reviewee</Badge>
                          </div>
                        </div>

                        {/* Rating and Date */}
                        <div className="text-right space-y-2">
                          <StarRating rating={review.rating} />
                          <p className="text-xs text-muted-foreground">
                            {new Date(review.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>

                      {/* Travel Plan */}
                      <div className="bg-muted/50 p-3 rounded-lg">
                        <p className="text-xs text-muted-foreground mb-1">
                          Travel Plan
                        </p>
                        <p className="font-medium text-sm">
                          {review.travelId.title}
                        </p>
                      </div>

                      {/* Comment */}
                      <div className="bg-primary/5 p-4 rounded-lg border-l-2 border-primary">
                        <p className="text-sm leading-relaxed">
                          &ldquo;{review.comment}&rdquo;
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Pagination */}
          {!loading && reviews.length > 0 && totalPages > 1 && (
            <div className="flex items-center justify-between pt-6 border-t mt-6">
              <p className="text-sm text-muted-foreground">
                Page {currentPage} of {totalPages}
              </p>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="w-4 h-4 mr-1" />
                  Previous
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    setCurrentPage((p) => Math.min(totalPages, p + 1))
                  }
                  disabled={currentPage === totalPages}
                >
                  Next
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

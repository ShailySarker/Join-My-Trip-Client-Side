/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Link from "next/link";
import { format } from "date-fns";
import { Eye, Users, MapPin, Ban, Star } from "lucide-react";
import { IBooking, IBookingStatus } from "@/types/booking.interface";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { cancelBooking } from "@/services/bookings/bookings.service";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import ReviewModal, {
  Reviewee,
} from "@/components/modules/reviews/ReviewModal";
import { ITrevelStatus } from "@/types/travelPlan.interface";

export type MyBooking = IBooking & {
  _id: string;
  userId: {
    _id: string;
    fullname: string;
    email: string;
  };
  travelId: {
    _id: string;
    title: string;
    destination: {
      city: string;
      country: string;
    };
    startDate: Date;
    endDate: Date;
    status: string;
    host: {
      _id: string;
      fullname: string;
      email: string;
      profilePhoto?: string;
    };
    participants: {
      userId: {
        _id: string;
        fullname: string;
        email: string;
        profilePhoto?: string;
      };
    }[];
  };
};

interface BookingsTableProps {
  bookings: MyBooking[];
  basePath?: string;
  showCancelButton?: boolean;
}

export default function BookingsTable({
  bookings,
  basePath,
  showCancelButton = false,
}: BookingsTableProps) {
  const router = useRouter();
  const [cancellingId, setCancellingId] = useState<string | null>(null);

  const getStatusBadgeVariant = (status: string) => {
    return status === IBookingStatus.BOOKED ? "default" : "destructive";
  };

  const handleCancelBooking = async (id: string) => {
    setCancellingId(id);
    try {
      const result = await cancelBooking(id);
      if (result.success) {
        toast.success("Booking cancelled successfully");
        router.refresh();
      } else {
        toast.error(result.message || "Failed to cancel booking");
      }
    } catch (error) {
      console.log(error);
      toast.error("An error occurred");
    } finally {
      setCancellingId(null);
    }
  };

  const isCancellable = (bookingStatus: string, travelStatus: string) => {
    return (
      bookingStatus === IBookingStatus.BOOKED &&
      travelStatus === ITrevelStatus.UPCOMING
    );
  };

  const isReviewable = (booking: MyBooking) => {
    return (
      booking.bookingStatus === IBookingStatus.BOOKED &&
      booking.travelId.status === "COMPLETED"
    );
  };

  const getPotentialReviewees = (booking: MyBooking): Reviewee[] => {
    const currentUserId = booking.userId._id;
    const reviewees: Reviewee[] = [];
    const seenIds = new Set<string>();

    const addReviewee = (person: any) => {
      if (
        person &&
        person._id &&
        person._id !== currentUserId &&
        !seenIds.has(person._id)
      ) {
        reviewees.push({
          _id: person._id,
          fullname: person.fullname,
          email: person.email,
          profilePhoto: person.profilePhoto,
        });
        seenIds.add(person._id);
      }
    };

    // Add Host
    addReviewee(booking.travelId.host);

    // Add Participants
    if (booking.travelId.participants) {
      booking.travelId.participants.forEach((p) => {
        addReviewee(p.userId);
      });
    }

    return reviewees;
  };

  if (bookings.length === 0) {
    return (
      <div className="text-center py-16 bg-card border rounded-lg">
        <div className="text-6xl mb-4">📚</div>
        <h3 className="text-2xl font-semibold mb-2">No bookings found</h3>
        <p className="text-muted-foreground mb-4">
          Try adjusting your filters or search terms
        </p>
      </div>
    );
  }

  return (
    <>
      <Card>
        <CardContent className="pt-6">
          {/* Desktop Table View */}
          <div className="hidden md:block overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Travel Plan</TableHead>
                  <TableHead>Destination</TableHead>
                  <TableHead>Travel Dates</TableHead>
                  <TableHead>Host</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Booking Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {bookings.map((booking) => {
                  const potentialReviewees = getPotentialReviewees(booking);
                  const canReview =
                    isReviewable(booking) && potentialReviewees.length > 0;

                  return (
                    <TableRow key={booking._id}>
                      <TableCell className="font-medium max-w-[200px] truncate">
                        {booking.travelId?.title || "Unknown Title"}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-muted-foreground" />
                          <span className="text-sm">
                            {booking.travelId?.destination?.city || "N/A"}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          {booking.travelId?.startDate
                            ? format(
                                new Date(booking.travelId.startDate),
                                "MMM d"
                              )
                            : "N/A"}
                          {" - "}
                          {booking.travelId?.endDate
                            ? format(
                                new Date(booking.travelId.endDate),
                                "MMM d, yyyy"
                              )
                            : "N/A"}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Users className="w-3 h-3 text-muted-foreground" />
                          <span>
                            {booking.travelId?.host?.fullname || "N/A"}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="font-semibold text-green-700 dark:text-green-400">
                        {booking.amount?.toLocaleString()} BDT
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={getStatusBadgeVariant(booking.bookingStatus)}
                        >
                          {booking.bookingStatus}
                        </Badge>
                        {booking.travelId?.status && (
                          <div className="text-[10px] text-muted-foreground mt-1 uppercase">
                            Trip: {booking.travelId.status}
                          </div>
                        )}
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {booking.createdAt
                          ? format(new Date(booking.createdAt), "MMM d, yyyy")
                          : "N/A"}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Link href={`${basePath}/${booking._id}`}>
                            <Button size="sm" variant="outline">
                              <Eye className="w-4 h-4" />
                            </Button>
                          </Link>
                          {canReview && (
                            <ReviewModal
                              travelId={booking.travelId._id}
                              potentialReviewees={potentialReviewees}
                              onSuccess={() => router.refresh()}
                              trigger={
                                <Button
                                  size="sm"
                                  variant="default"
                                  title="Review Participants"
                                >
                                  <Star className="w-4 h-4" />
                                </Button>
                              }
                            />
                          )}

                          {showCancelButton &&
                            isCancellable(
                              booking.bookingStatus,
                              booking.travelId.status
                            ) && (
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <Button
                                    size="sm"
                                    variant="destructive"
                                    title="Cancel Booking"
                                  >
                                    <Ban className="w-4 h-4" />
                                  </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>
                                      Cancel Booking?
                                    </AlertDialogTitle>
                                    <AlertDialogDescription>
                                      Are you sure you want to cancel this
                                      booking for &quot;
                                      {booking.travelId?.title}&quot;? This
                                      action cannot be undone.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>
                                      No, Keep it
                                    </AlertDialogCancel>
                                    <AlertDialogAction
                                      onClick={() =>
                                        handleCancelBooking(booking._id)
                                      }
                                      className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                    >
                                      {cancellingId === booking._id
                                        ? "Cancelling..."
                                        : "Yes, Cancel"}
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            )}
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>

          {/* Mobile Card View */}
          <div className="md:hidden space-y-4">
            {bookings.map((booking) => {
              const potentialReviewees = getPotentialReviewees(booking);
              const canReview =
                isReviewable(booking) && potentialReviewees.length > 0;

              return (
                <Card key={booking._id} className="border border-muted">
                  <CardContent className="pt-6">
                    <div className="space-y-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold">
                            {booking.travelId?.title}
                          </h3>
                          <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                            <MapPin className="w-3 h-3" />
                            {booking.travelId?.destination?.city},{" "}
                            {booking.travelId?.destination?.country}
                          </p>
                        </div>
                        <div className="flex flex-col items-end gap-1">
                          <Badge
                            variant={getStatusBadgeVariant(
                              booking.bookingStatus
                            )}
                          >
                            {booking.bookingStatus}
                          </Badge>
                          {booking.travelId?.status && (
                            <span className="text-[10px] text-muted-foreground uppercase">
                              {booking.travelId.status}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div>
                          <span className="text-muted-foreground">Dates:</span>
                          <div className="font-medium">
                            {booking.travelId?.startDate
                              ? format(
                                  new Date(booking.travelId.startDate),
                                  "MMM d"
                                )
                              : ""}
                            {" - "}
                            {booking.travelId?.endDate
                              ? format(
                                  new Date(booking.travelId.endDate),
                                  "MMM d"
                                )
                              : ""}
                          </div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Host:</span>
                          <div className="font-medium">
                            {booking.travelId?.host?.fullname || "N/A"}
                          </div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Amount:</span>
                          <div className="font-semibold text-green-700 dark:text-green-400">
                            {booking.amount.toLocaleString()} BDT
                          </div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Booked:</span>
                          <div className="font-medium">
                            {booking.createdAt
                              ? format(
                                  new Date(booking.createdAt),
                                  "MMM d, yyyy"
                                )
                              : "N/A"}
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2 pt-2">
                        <Link href={`${basePath}/${booking._id}`} className="">
                          <Button
                            size="sm"
                            variant="outline"
                            className="w-full"
                          >
                            <Eye className="w-4 h-4 lg:mr-2" />
                            View Details
                          </Button>
                        </Link>

                        {canReview && (
                          <div className="">
                            <ReviewModal
                              travelId={booking.travelId._id}
                              potentialReviewees={potentialReviewees}
                              onSuccess={() => router.refresh()}
                              trigger={
                                <Button
                                  size="sm"
                                  variant="default"
                                  className="w-full"
                                >
                                  <Star className="w-4 h-4" />
                                  Give Review
                                </Button>
                              }
                            />
                          </div>
                        )}

                        {showCancelButton &&
                          isCancellable(
                            booking.bookingStatus,
                            booking.travelId.status
                          ) && (
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button
                                  size="sm"
                                  variant="destructive"
                                  className="w-full"
                                >
                                  <Ban className="w-4 h-4 lg:mr-2 mr-0.5" />
                                  Cancel
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>
                                    Cancel Booking?
                                  </AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Are you sure you want to cancel this
                                    booking?
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>
                                    No, Keep it
                                  </AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={() =>
                                      handleCancelBooking(booking._id)
                                    }
                                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                  >
                                    {cancellingId === booking._id
                                      ? "Cancelling..."
                                      : "Yes, Cancel"}
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </>
  );
}

"use client";

import Link from "next/link";
import { format } from "date-fns";
import { Eye, Users, MapPin, Ban } from "lucide-react";
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

  const isCancellable = (status: string) => {
    // Only BOOKED or PENDING can be cancelled.
    // Assuming backend logic. Disabling for CANCELLED, COMPLETED, ONGOING.
    // IBookingStatus usually has PENDING, BOOKED, REJECTED, CANCELLED.
    return status === IBookingStatus.BOOKED;
  };

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
                  <TableHead>Participants</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Booking Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {bookings.map((booking) => (
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
                        <span>{booking.totalPeople}</span>
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

                        {showCancelButton &&
                          isCancellable(booking.bookingStatus) && (
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
                                    Are you sure you want to cancel this booking
                                    for &quot;
                                    {booking.travelId?.title}&quot;? This action
                                    cannot be undone.
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
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Mobile Card View */}
          <div className="md:hidden space-y-4">
            {bookings.map((booking) => (
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
                      <Badge
                        variant={getStatusBadgeVariant(booking.bookingStatus)}
                      >
                        {booking.bookingStatus}
                      </Badge>
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
                        <span className="text-muted-foreground">
                          Participants:
                        </span>
                        <div className="font-medium">{booking.totalPeople}</div>
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
                            ? format(new Date(booking.createdAt), "MMM d, yyyy")
                            : "N/A"}
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 pt-2">
                      <Link href={`${basePath}/${booking._id}`} className="">
                        <Button size="sm" variant="outline" className="w-full">
                          <Eye className="w-4 h-4 lg:mr-2 mr-0.5" />
                          View Details
                        </Button>
                      </Link>

                      {showCancelButton &&
                        isCancellable(booking.bookingStatus) && (
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button
                                size="sm"
                                variant="destructive"
                                className=""
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
                                  Are you sure you want to cancel this booking?
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
            ))}
          </div>
        </CardContent>
      </Card>
    </>
  );
}

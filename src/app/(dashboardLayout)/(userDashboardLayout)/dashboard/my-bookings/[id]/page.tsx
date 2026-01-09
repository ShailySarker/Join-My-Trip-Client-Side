/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState, useEffect, use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import {
  ArrowLeft,
  Calendar,
  MapPin,
  Users,
  User,
  Phone,
  XCircle,
  UserPlus,
  Trash2,
  Plus,
} from "lucide-react";
import {
  getBookingById,
  cancelBooking,
  removeParticipantFromBooking,
  addParticipantsToBooking,
} from "@/services/bookings/bookings.service";
import { IBooking, IBookingStatus } from "@/types/booking.interface";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";
import {
  IParticipantDetails,
  ITrevelStatus,
} from "@/types/travelPlan.interface";
import { IUserGender } from "@/types/user.interface";
import { participantSchema } from "@/zod/travelPlan.validation";
import { ZodError } from "zod";

type BookingWithDetails = IBooking & {
  _id: string;
  userId: {
    _id: string;
    fullname: string;
    email: string;
  };
  travelId: {
    _id: string;
    title: string;
    description: string;
    image: string;
    destination: {
      city: string;
      country: string;
    };
    status: ITrevelStatus;
    startDate: Date;
    endDate: Date;
    budget: number;
    maxGuest: number;
    minAge: number;
    participants: IParticipantDetails[]; // To check seat availability
  };
};

export default function BookingDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const [booking, setBooking] = useState<BookingWithDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
  const [removeParticipantPhone, setRemoveParticipantPhone] = useState<
    string | null
  >(null);
  const [processing, setProcessing] = useState(false);

  // Add Participant Dialog State
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [addingParticipant, setAddingParticipant] = useState(false);
  const [newParticipant, setNewParticipant] = useState<
    Partial<IParticipantDetails>
  >({
    name: "",
    phone: "",
    gender: "MALE" as IUserGender,
    age: 0,
  });
  const [participantErrors, setParticipantErrors] = useState<
    Partial<Record<keyof IParticipantDetails, string>>
  >({});
  useEffect(() => {
    fetchBooking();
  }, [id]);

  const fetchBooking = async () => {
    setLoading(true);
    try {
      const result = await getBookingById(id);
      if (result.success && result.data) {
        setBooking(result.data);
      } else {
        toast.error(result.message || "Failed to fetch booking");
        router.push("/dashboard/my-bookings");
      }
    } catch (error) {
      toast.error("An error occurred while fetching booking");
      router.push("/dashboard/my-bookings");
    } finally {
      setLoading(false);
    }
  };

  const handleCancelBooking = async () => {
    setProcessing(true);
    try {
      const result = await cancelBooking(id);
      if (result.success) {
        toast.success("Booking cancelled successfully");
        router.push("/dashboard/my-bookings");
      } else {
        toast.error(result.message || "Failed to cancel booking");
      }
    } catch (error) {
      toast.error("An error occurred while cancelling booking");
    } finally {
      setProcessing(false);
      setCancelDialogOpen(false);
    }
  };

  const handleRemoveParticipant = async () => {
    if (!removeParticipantPhone) return;

    setProcessing(true);
    try {
      const result = await removeParticipantFromBooking(
        id,
        removeParticipantPhone
      );
      if (result.success) {
        toast.success("Participant removed successfully");
        fetchBooking(); // Refresh
      } else {
        toast.error(result.message || "Failed to remove participant");
      }
    } catch (error) {
      toast.error("An error occurred while removing participant");
    } finally {
      setProcessing(false);
      setRemoveParticipantPhone(null);
    }
  };

  const handleAddParticipant = async () => {
    setAddingParticipant(true);
    try {
      setParticipantErrors({});

      // 🔹 Validate using Zod
      const parsedParticipant = participantSchema.parse({
        name: newParticipant.name,
        phone: newParticipant.phone,
        gender: newParticipant.gender,
        age: newParticipant.age,
      });

      const result = await addParticipantsToBooking(id, [
        parsedParticipant as IParticipantDetails,
      ]);
      if (result.success) {
        toast.success("Participant added successfully");
        setAddDialogOpen(false);
        setNewParticipant({
          name: "",
          phone: "",
          gender: "MALE" as IUserGender,
          age: 0,
        });

        fetchBooking();
      } else {
        toast.error(result.message || "Failed to add participant");
      }
    } catch (error) {
      if (error instanceof ZodError) {
        const fieldErrors: Partial<Record<keyof IParticipantDetails, string>> =
          {};

        error.issues.forEach((issue) => {
          const field = issue.path[0] as keyof IParticipantDetails;
          fieldErrors[field] = issue.message;
        });

        setParticipantErrors(fieldErrors);
        toast.error("Please fix participant validation errors");
      }
    } finally {
      setAddingParticipant(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <Skeleton className="h-10 w-64 mb-8" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Skeleton className="h-64 w-full" />
            <Skeleton className="h-96 w-full" />
          </div>
          <Skeleton className="h-96 w-full" />
        </div>
      </div>
    );
  }

  if (!booking) return null;

  const getStatusBadgeVariant = (status: IBookingStatus) => {
    return status === IBookingStatus.BOOKED ? "default" : "destructive";
  };

  const totalTripParticipants = booking.travelId.participants
    ? booking.travelId.participants.length
    : 0;
  const availableSeats = booking.travelId.maxGuest - totalTripParticipants;

  const travelStatusColors: Record<ITrevelStatus, string> = {
    [ITrevelStatus.UPCOMING]:
      "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300",
    [ITrevelStatus.ONGOING]:
      "bg-sky-100 text-sky-800 dark:bg-sky-900 dark:text-sky-300",
    [ITrevelStatus.COMPLETED]:
      "bg-lime-100 text-lime-800 dark:bg-lime-900 dark:text-lime-300",
    [ITrevelStatus.CANCELLED]:
      "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Header */}
      <div className="mb-8">
        <Link href="/dashboard/my-bookings">
          <Button variant="ghost" className="mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to My Bookings
          </Button>
        </Link>
        <div className="flex items-start justify-between">
          <div>
            <h1 className="xl:text-4xl lg:text-[32px] text-3xl font-bold mb-3">
              Booking Details
            </h1>
            <p className="text-muted-foreground">
              Booking ID: {booking._id.slice(-8).toUpperCase()}
            </p>
          </div>
          <Badge
            variant={getStatusBadgeVariant(booking.bookingStatus)}
            className="text-lg px-4 py-2"
          >
            {booking.bookingStatus}
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Travel Plan Info */}
          <Card>
            <CardHeader>
              <CardTitle>Travel Plan Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-2xl font-bold mb-2">
                  {booking.travelId.title}
                </h3>
                {/* <p className="text-muted-foreground">
                  {booking.travelId.description}
                </p> */}
                <Badge className={travelStatusColors[booking.travelId.status]}>
                  {booking.travelId.status}
                </Badge>
              </div>

              <Separator />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-semibold">Destination</p>
                    <p className="text-sm text-muted-foreground">
                      {booking.travelId.destination.city},{" "}
                      {booking.travelId.destination.country}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-semibold">Travel Dates</p>
                    <p className="text-sm text-muted-foreground">
                      {format(
                        new Date(booking.travelId.startDate),
                        "MMM d, yyyy"
                      )}{" "}
                      -{" "}
                      {format(
                        new Date(booking.travelId.endDate),
                        "MMM d, yyyy"
                      )}
                    </p>
                  </div>
                </div>
              </div>

              <Link
                href={`/dashboard/my-bookings/travel-plan/${booking.travelId._id}`}
              >
                <Button variant="outline" className="w-full">
                  View Full Travel Plan Details
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Participants */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>
                Participants ({booking.participants.length})
              </CardTitle>
              {booking.bookingStatus === IBookingStatus.BOOKED &&
                booking.travelId.status === ITrevelStatus.UPCOMING && (
                  // booking.totalPeople < booking.travelId.participants.length &&
                  <Button
                    size="sm"
                    onClick={() => setAddDialogOpen(true)}
                    disabled={availableSeats <= 0}
                  >
                    <UserPlus className="w-4 h-4 mr-2" />
                    Add Participants
                  </Button>
                )}
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Phone</TableHead>
                      <TableHead>Gender</TableHead>
                      <TableHead>Age</TableHead>
                      {booking.bookingStatus === IBookingStatus.BOOKED &&
                        booking.travelId.status === ITrevelStatus.UPCOMING &&
                        booking.participants.length > 1 && (
                          <TableHead className="text-right">Actions</TableHead>
                        )}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {booking.participants.map((participant, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">
                          <div className="flex items-center gap-2">
                            <User className="w-4 h-4 text-muted-foreground" />
                            {participant.name}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Phone className="w-4 h-4 text-muted-foreground" />
                            {participant.phone}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{participant.gender}</Badge>
                        </TableCell>
                        <TableCell>{participant.age} years</TableCell>
                        {booking.bookingStatus === IBookingStatus.BOOKED &&
                          booking.travelId.status === ITrevelStatus.UPCOMING &&
                          booking.participants.length > 1 && (
                            <TableCell className="text-right">
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() =>
                                  setRemoveParticipantPhone(participant.phone)
                                }
                              >
                                <Trash2 className="w-4 h-4 text-destructive" />
                              </Button>
                            </TableCell>
                          )}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Booking Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Booking Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span className="text-muted-foreground">
                  Total Participants:
                </span>
                <span className="font-semibold">
                  {booking.participants.length}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">
                  Amount per Person:
                </span>
                <span className="font-semibold">
                  {booking.amount.toLocaleString()}{" "}
                  <span className="text-xs">BDT</span>
                </span>
              </div>
              <Separator />
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold">Total Amount:</span>
                <span className="text-2xl font-bold text-primary">
                  {(
                    booking.amount * booking.participants.length
                  ).toLocaleString()}{" "}
                  <span className="text-sm">BDT</span>
                </span>
              </div>

              <Separator />

              <div>
                <p className="text-sm text-muted-foreground mb-2">Booked on:</p>
                <p className="font-medium">
                  {format(
                    new Date(booking.createdAt!),
                    "MMMM d, yyyy 'at' h:mm a"
                  )}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          {booking.bookingStatus === IBookingStatus.BOOKED &&
            booking.travelId.status === ITrevelStatus.UPCOMING && (
              <Card className="border-destructive/50">
                <CardHeader>
                  <CardTitle className="text-destructive">
                    Danger Zone
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Cancelling this booking will remove all participants from
                    the travel plan. This action cannot be undone.
                  </p>
                  <Button
                    variant="destructive"
                    className="w-full"
                    onClick={() => setCancelDialogOpen(true)}
                  >
                    <XCircle className="w-4 h-4 mr-2" />
                    Cancel Booking
                  </Button>
                </CardContent>
              </Card>
            )}
        </div>
      </div>

      {/* Cancel Booking Dialog */}
      <AlertDialog open={cancelDialogOpen} onOpenChange={setCancelDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Cancel Booking?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to cancel this booking? All{" "}
              {booking.totalPeople} participant(s) will be removed from the
              travel plan. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={processing}>
              No, Keep Booking
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleCancelBooking}
              disabled={processing}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {processing ? "Cancelling..." : "Yes, Cancel Booking"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Remove Participant Dialog */}
      <AlertDialog
        open={!!removeParticipantPhone}
        onOpenChange={() => setRemoveParticipantPhone(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Remove Participant?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to remove this participant from the booking?
              They will be removed from the travel plan as well.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={processing}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleRemoveParticipant}
              disabled={processing}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {processing ? "Removing..." : "Yes, Remove"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Add Participant Dialog */}
      <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Participant</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Name</Label>
                <Input
                  value={newParticipant.name}
                  onChange={(e) =>
                    setNewParticipant({
                      ...newParticipant,
                      name: e.target.value,
                    })
                  }
                  placeholder="Full Name"
                />
              </div>
              <div className="space-y-2">
                <Label>Phone</Label>
                <Input
                  value={newParticipant.phone}
                  onChange={(e) =>
                    setNewParticipant({
                      ...newParticipant,
                      phone: e.target.value,
                    })
                  }
                  placeholder="Phone"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Gender</Label>
                <Select
                  value={newParticipant.gender}
                  onValueChange={(v) =>
                    setNewParticipant({
                      ...newParticipant,
                      gender: v as IUserGender,
                    })
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="MALE">Male</SelectItem>
                    <SelectItem value="FEMALE">Female</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Age</Label>
                <Input
                  type="number"
                  value={newParticipant.age || ""}
                  onChange={(e) =>
                    setNewParticipant({
                      ...newParticipant,
                      age: Number(e.target.value),
                    })
                  }
                  placeholder="Age"
                />
              </div>
            </div>
          </div>
          <ul className="list-disc list-inside space-y-1 text-xs text-destructive">
            {participantErrors.name && <li>{participantErrors.name}</li>}
            {participantErrors.phone && <li>{participantErrors.phone}</li>}
            {participantErrors.age && <li>{participantErrors.age}</li>}
            {newParticipant.age !== undefined &&
              newParticipant.age < booking.travelId.minAge && (
                <li>Minimum age is {booking.travelId.minAge}</li>
              )}

            {participantErrors.gender && <li>{participantErrors.gender}</li>}
          </ul>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setAddDialogOpen(false)}
              disabled={addingParticipant}
            >
              Cancel
            </Button>
            <Button onClick={handleAddParticipant} disabled={addingParticipant}>
              {addingParticipant ? "Adding..." : "Add Participant"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

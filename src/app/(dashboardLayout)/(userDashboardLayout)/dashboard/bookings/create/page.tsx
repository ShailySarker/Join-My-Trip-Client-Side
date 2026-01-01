/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import {
  ArrowLeft,
  Calendar,
  MapPin,
  Users,
  User,
  Plus,
  Trash2,
  X,
} from "lucide-react";
import { format } from "date-fns";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

import { getTravelPlanById } from "@/services/travelPlans/travelPlans.service";
import { createBooking } from "@/services/bookings/bookings.service";
import { getUserInfo } from "@/services/auth/getUserInfo";
import { IParticipantDetails } from "@/types/travelPlan.interface";
import { IUserGender } from "@/types/user.interface";

function BookingForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const travelId = searchParams.get("travelId");

  const [travelPlan, setTravelPlan] = useState<any>(null);
  const [userInfo, setUserInfo] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // Participants
  const [extraParticipants, setExtraParticipants] = useState<
    IParticipantDetails[]
  >([]);
  const [newParticipant, setNewParticipant] = useState<
    Partial<IParticipantDetails>
  >({
    name: "",
    phone: "",
    gender: "MALE" as IUserGender,
    age: 0,
  });

  useEffect(() => {
    const init = async () => {
      if (!travelId) {
        toast.error("No travel plan specified");
        router.push("/dashboard/explore-travel-plans");
        return;
      }

      try {
        const [planRes, userRes] = await Promise.all([
          getTravelPlanById(travelId),
          getUserInfo(),
        ]);

        if (planRes.success && planRes.data) {
          setTravelPlan(planRes.data);
        } else {
          throw new Error("Failed to load travel plan");
        }

        if (userRes) {
          setUserInfo(userRes);
        } else {
          throw new Error("Please login first");
        }
      } catch (error: any) {
        toast.error(error.message || "An error occurred");
        router.push("/dashboard/explore-travel-plans");
      } finally {
        setLoading(false);
      }
    };

    init();
  }, [travelId, router]);

  const handleAddParticipant = () => {
    if (
      !newParticipant.name ||
      !newParticipant.phone ||
      !newParticipant.age ||
      !newParticipant.gender
    ) {
      toast.error("Please fill all participant fields");
      return;
    }

    setExtraParticipants([
      ...extraParticipants,
      newParticipant as IParticipantDetails,
    ]);
    setNewParticipant({
      name: "",
      phone: "",
      gender: "MALE" as IUserGender,
      age: 0,
    });
  };

  const removeParticipant = (index: number) => {
    const newPs = [...extraParticipants];
    newPs.splice(index, 1);
    setExtraParticipants(newPs);
  };

  const handleConfirmBooking = async () => {
    if (!travelPlan || !userInfo) return;

    setSubmitting(true);
    try {
      // 1. Add Self
      const selfParticipant: IParticipantDetails = {
        name: userInfo.fullname,
        phone: userInfo.phone,
        gender: userInfo.gender as IUserGender,
        age: userInfo.age,
        userId: userInfo._id,
      };

      // 2. Combine
      const allParticipants = [selfParticipant, ...extraParticipants];

      const bookingPayload = {
        travelId: travelPlan._id,
        amount: travelPlan.budget * allParticipants.length,
        totalPeople: allParticipants.length,
        participants: allParticipants,
      };

      const result = await createBooking(bookingPayload);

      if (result.success) {
        toast.success("Booking confirmed successfully!");
        router.push("/dashboard/my-bookings");
      } else {
        toast.error(result.message || "Failed to confirm booking");
      }
    } catch (error: any) {
      console.log(error);
      toast.error("An error occurred while confirming booking");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl space-y-4">
        <Skeleton className="h-10 w-1/3" />
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  if (!travelPlan) return null;

  const totalPeople = 1 + extraParticipants.length;
  const totalAmount = travelPlan.budget * totalPeople;
  const availableSeats =
    travelPlan.maxGuest - (travelPlan.participants?.length || 0);

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Link href={`/dashboard/explore-travel-plans/${travelId}`}>
        <Button variant="ghost" className="mb-4">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Travel Plan
        </Button>
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left: Form */}
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Confirm Your Booking</CardTitle>
              <CardDescription>
                Add participants and review your booking details.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Primary User */}
              <div className="bg-primary/5 p-4 rounded-lg">
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Primary Traveler (You)
                </h3>
                <div className="grid grid-cols-2 gap-4 text-sm mt-3">
                  <div>
                    <span className="text-muted-foreground">Name:</span>
                    <div className="font-medium">{userInfo?.fullname}</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Email:</span>
                    <div className="font-medium">{userInfo?.email}</div>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Add Participants */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    Additional Participants
                  </h3>
                  <span className="text-xs text-muted-foreground">
                    {availableSeats - totalPeople} seats remaining
                  </span>
                </div>

                {/* Add Form */}
                <div className="grid grid-cols-12 gap-2 items-end bg-slate-50 dark:bg-slate-900 p-3 rounded-lg border">
                  <div className="col-span-4">
                    <Label className="text-xs">Name</Label>
                    <Input
                      value={newParticipant.name}
                      onChange={(e) =>
                        setNewParticipant({
                          ...newParticipant,
                          name: e.target.value,
                        })
                      }
                      placeholder="Name"
                      className="h-8"
                    />
                  </div>
                  <div className="col-span-3">
                    <Label className="text-xs">Phone</Label>
                    <Input
                      value={newParticipant.phone}
                      onChange={(e) =>
                        setNewParticipant({
                          ...newParticipant,
                          phone: e.target.value,
                        })
                      }
                      placeholder="Phone"
                      className="h-8"
                    />
                  </div>
                  <div className="col-span-2">
                    <Label className="text-xs">Age</Label>
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
                      className="h-8"
                    />
                  </div>
                  <div className="col-span-2">
                    <Label className="text-xs">Gender</Label>
                    <Select
                      value={newParticipant.gender}
                      onValueChange={(v) =>
                        setNewParticipant({
                          ...newParticipant,
                          gender: v as IUserGender,
                        })
                      }
                    >
                      <SelectTrigger className="h-8">
                        <SelectValue placeholder="-" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="MALE">M</SelectItem>
                        <SelectItem value="FEMALE">F</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="col-span-1">
                    <Button
                      onClick={handleAddParticipant}
                      size="sm"
                      className="h-8 w-full"
                      type="button"
                      disabled={availableSeats <= totalPeople}
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* List */}
                {extraParticipants.length > 0 && (
                  <div className="border rounded-lg overflow-hidden">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="py-2">Name</TableHead>
                          <TableHead className="py-2">Phone</TableHead>
                          <TableHead className="py-2">Age/Gen</TableHead>
                          <TableHead className="py-2"></TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {extraParticipants.map((p, i) => (
                          <TableRow key={i}>
                            <TableCell className="py-2">{p.name}</TableCell>
                            <TableCell className="py-2">{p.phone}</TableCell>
                            <TableCell className="py-2">
                              {p.age} / {p.gender?.[0]}
                            </TableCell>
                            <TableCell className="py-2 text-right">
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => removeParticipant(i)}
                              >
                                <X className="w-4 h-4 text-destructive" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right: Summary */}
        <div className="md:col-span-1">
          <Card className="sticky top-4">
            <CardHeader className="pb-3">
              <CardTitle>Booking Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-3">
                <div className="relative w-16 h-16 rounded-md overflow-hidden flex-shrink-0">
                  <Image
                    src={travelPlan.image}
                    alt={travelPlan.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-semibold text-sm line-clamp-2">
                    {travelPlan.title}
                  </h4>
                  <div className="flex items-center text-xs text-muted-foreground mt-1">
                    <MapPin className="w-3 h-3 mr-1" />
                    {travelPlan.destination.city}
                  </div>
                </div>
              </div>

              <Separator />

              <div className="text-sm space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Start Date</span>
                  <span>
                    {format(new Date(travelPlan.startDate), "MMM d, yyyy")}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    Price per person
                  </span>
                  <span>BDT {travelPlan.budget.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Travelers</span>
                  <span>x {totalPeople}</span>
                </div>
              </div>

              <Separator />

              <div className="flex justify-between items-center">
                <span className="font-semibold">Total</span>
                <span className="text-2xl font-bold text-primary">
                  BDT {totalAmount.toLocaleString()}
                </span>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full"
                size="lg"
                onClick={handleConfirmBooking}
                disabled={submitting}
              >
                {submitting ? "Booking..." : "Confirm & Pay"}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default function BookingPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BookingForm />
    </Suspense>
  );
}

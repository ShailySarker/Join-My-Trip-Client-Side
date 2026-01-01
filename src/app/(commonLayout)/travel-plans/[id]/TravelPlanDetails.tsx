"use client";

import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";
import {
  Calendar,
  MapPin,
  Users,
  DollarSign,
  Clock,
  CheckCircle2,
  XCircle,
  User,
  ArrowRight,
} from "lucide-react";
import { ITravelPlan } from "@/types/travelPlan.interface";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { getUserInfo } from "@/services/auth/getUserInfo";
import { useEffect, useState } from "react";

type TravelPlanWithHost = ITravelPlan & {
  _id: string;
  host: {
    _id: string;
    fullname: string;
    email: string;
    profilePhoto?: string;
  };
};

interface TravelPlanDetailsProps {
  travelPlan: TravelPlanWithHost;
}

export default function TravelPlanDetails({
  travelPlan,
}: TravelPlanDetailsProps) {
  const [userInfo, setUserInfo] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const info = await getUserInfo();
        setUserInfo(info);
      } catch (error) {
        setUserInfo(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUserInfo();
  }, []);

  const availableSeats =
    travelPlan.maxGuest - (travelPlan.participants?.length || 0);
  const startDate = new Date(travelPlan.startDate);
  const endDate = new Date(travelPlan.endDate);
  const duration = Math.ceil(
    (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
  );

  const hasActiveSubscription =
    userInfo?.subscriptionInfo?.status === "ACTIVE" &&
    (userInfo?.subscriptionInfo?.plan === "MONTHLY" ||
      userInfo?.subscriptionInfo?.plan === "YEARLY");

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Hero Image */}
      <div className="relative h-96 w-full rounded-2xl overflow-hidden mb-8 shadow-2xl">
        {travelPlan.image ? (
          <Image
            src={travelPlan.image}
            alt={travelPlan.title}
            fill
            className="object-cover"
            priority
          />
        ) : (
          <div className="flex items-center justify-center h-full bg-gradient-to-br from-primary/20 to-primary/5">
            <MapPin className="w-32 h-32 text-primary/30" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-6 left-6 right-6">
          <h1 className="xl:text-4xl lg:text-[32px] text-3xl md:text-5xl font-bold text-white mb-2">
            {travelPlan.title}
          </h1>
          <div className="flex flex-wrap gap-2">
            <Badge className="bg-white/90 text-black hover:bg-white">
              {travelPlan.travelType}
            </Badge>
            <Badge
              variant={availableSeats > 0 ? "secondary" : "destructive"}
              className="bg-white/90 hover:bg-white"
            >
              {availableSeats > 0 ? `${availableSeats} Seats Left` : "FULL"}
            </Badge>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Quick Info */}
          <Card>
            <CardContent className="pt-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="flex flex-col items-center text-center p-3 bg-primary/5 rounded-lg">
                  <MapPin className="w-6 h-6 text-primary mb-2" />
                  <span className="text-xs text-muted-foreground">
                    Destination
                  </span>
                  <span className="font-semibold text-sm">
                    {travelPlan.destination.city}
                  </span>
                </div>
                <div className="flex flex-col items-center text-center p-3 bg-primary/5 rounded-lg">
                  <Clock className="w-6 h-6 text-primary mb-2" />
                  <span className="text-xs text-muted-foreground">
                    Duration
                  </span>
                  <span className="font-semibold text-sm">{duration} Days</span>
                </div>
                <div className="flex flex-col items-center text-center p-3 bg-primary/5 rounded-lg">
                  <Users className="w-6 h-6 text-primary mb-2" />
                  <span className="text-xs text-muted-foreground">
                    Max Guests
                  </span>
                  <span className="font-semibold text-sm">
                    {travelPlan.maxGuest}
                  </span>
                </div>
                <div className="flex flex-col items-center text-center p-3 bg-primary/5 rounded-lg">
                  <DollarSign className="w-6 h-6 text-primary mb-2" />
                  <span className="text-xs text-muted-foreground">Budget</span>
                  <span className="font-semibold text-sm">
                    ${travelPlan.budget.toLocaleString()}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Description */}
          <Card>
            <CardHeader>
              <CardTitle>About This Trip</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                {travelPlan.description}
              </p>
            </CardContent>
          </Card>

          {/* Trip Details */}
          <Card>
            <CardHeader>
              <CardTitle>Trip Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <Calendar className="w-5 h-5 text-primary mt-0.5" />
                <div>
                  <p className="font-semibold">Travel Dates</p>
                  <p className="text-sm text-muted-foreground">
                    {format(startDate, "MMMM d, yyyy")} -{" "}
                    {format(endDate, "MMMM d, yyyy")}
                  </p>
                </div>
              </div>
              <Separator />
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary mt-0.5" />
                <div>
                  <p className="font-semibold">Destination</p>
                  <p className="text-sm text-muted-foreground">
                    {travelPlan.destination.city},{" "}
                    {travelPlan.destination.country}
                  </p>
                </div>
              </div>
              {travelPlan.departureLocation && (
                <>
                  <Separator />
                  <div className="flex items-start gap-3">
                    <ArrowRight className="w-5 h-5 text-primary mt-0.5" />
                    <div>
                      <p className="font-semibold">Departure From</p>
                      <p className="text-sm text-muted-foreground">
                        {travelPlan.departureLocation}
                      </p>
                    </div>
                  </div>
                </>
              )}
              <Separator />
              <div className="flex items-start gap-3">
                <Users className="w-5 h-5 text-primary mt-0.5" />
                <div>
                  <p className="font-semibold">Minimum Age</p>
                  <p className="text-sm text-muted-foreground">
                    {travelPlan.minAge}+ years old
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Included & Excluded */}
          {(travelPlan.included?.length || travelPlan.excluded?.length) && (
            <Card>
              <CardHeader>
                <CardTitle>What's Included & Excluded</CardTitle>
              </CardHeader>
              <CardContent className="grid md:grid-cols-2 gap-6">
                {travelPlan.included && travelPlan.included.length > 0 && (
                  <div>
                    <h4 className="font-semibold mb-3 text-green-700 dark:text-green-400">
                      ✓ Included
                    </h4>
                    <ul className="space-y-2">
                      {travelPlan.included.map((item, index) => (
                        <li
                          key={index}
                          className="flex items-start gap-2 text-sm"
                        >
                          <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {travelPlan.excluded && travelPlan.excluded.length > 0 && (
                  <div>
                    <h4 className="font-semibold mb-3 text-red-700 dark:text-red-400">
                      ✗ Excluded
                    </h4>
                    <ul className="space-y-2">
                      {travelPlan.excluded.map((item, index) => (
                        <li
                          key={index}
                          className="flex items-start gap-2 text-sm"
                        >
                          <XCircle className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Interests */}
          <Card>
            <CardHeader>
              <CardTitle>Trip Interests</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {travelPlan.interests.map((interest) => (
                  <Badge key={interest} variant="secondary" className="text-sm">
                    {interest}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Host Info */}
          <Card>
            <CardHeader>
              <CardTitle>Your Host</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-3">
                <Avatar className="h-16 w-16">
                  <AvatarImage
                    src={travelPlan.host.profilePhoto}
                    alt={travelPlan.host.fullname}
                  />
                  <AvatarFallback>
                    <User className="w-8 h-8" />
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="font-semibold">{travelPlan.host.fullname}</h4>
                  <p className="text-sm text-muted-foreground">
                    {travelPlan.host.email}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Booking Card */}
          <Card className="sticky top-4">
            <CardHeader>
              <div className="flex items-baseline justify-between">
                <CardTitle>Book Your Spot</CardTitle>
                <div className="text-2xl font-bold text-primary">
                  ${travelPlan.budget.toLocaleString()}
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-primary/5 p-4 rounded-lg space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">
                    Available Seats:
                  </span>
                  <span className="font-semibold">
                    {availableSeats}/{travelPlan.maxGuest}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Participants:</span>
                  <span className="font-semibold">
                    {travelPlan.participants?.length || 0}
                  </span>
                </div>
              </div>

              {!loading && (
                <>
                  {!userInfo ? (
                    <div className="space-y-3">
                      <p className="text-sm text-muted-foreground text-center">
                        Please log in to book this trip
                      </p>
                      <Link
                        href={`/login?redirect=/travel-plans/${travelPlan._id}`}
                      >
                        <Button className="w-full" size="lg">
                          Login to Book
                        </Button>
                      </Link>
                    </div>
                  ) : !hasActiveSubscription ? (
                    <div className="space-y-3">
                      <p className="text-sm text-muted-foreground text-center">
                        Subscribe to book travel plans
                      </p>
                      <Link href="/subscription">
                        <Button className="w-full" size="lg" variant="default">
                          View Subscription Plans
                        </Button>
                      </Link>
                    </div>
                  ) : availableSeats === 0 ? (
                    <Button className="w-full" size="lg" disabled>
                      Trip is Full
                    </Button>
                  ) : (
                    <Link
                      href={`/dashboard/bookings/create?travelId=${travelPlan._id}`}
                    >
                      <Button className="w-full" size="lg">
                        Book Now
                      </Button>
                    </Link>
                  )}
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

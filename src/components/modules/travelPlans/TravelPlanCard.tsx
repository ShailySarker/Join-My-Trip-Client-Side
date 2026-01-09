"use client";

import Image from "next/image";
import Link from "next/link";
import { Calendar, MapPin, Users, User, Eye } from "lucide-react";
import {
  ITravelPlan,
  ITravelType,
  ITrevelInterest,
} from "@/types/travelPlan.interface";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";

interface TravelPlanCardProps {
  travelPlan: ITravelPlan & {
    host?: {
      fullname: string;
      email: string;
      profilePhoto?: string | File;
    };
    _id: string;
  };
  href?: string;
}

const travelTypeColors: Record<ITravelType, string> = {
  [ITravelType.SOLO]:
    "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
  [ITravelType.FAMILY]:
    "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  [ITravelType.FRIENDS]:
    "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
  [ITravelType.COUPLE]:
    "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-300",
};

const interestColors: Record<string, string> = {
  default: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300",
  [ITrevelInterest.HIKING]:
    "bg-lime-100 text-lime-800 dark:bg-lime-900 dark:text-lime-300",
  [ITrevelInterest.BEACH]:
    "bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-300",
  [ITrevelInterest.ADVENTURE]:
    "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300",
  [ITrevelInterest.CAMPING]:
    "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
  [ITrevelInterest.CITY_EXPLORATION]:
    "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
  [ITrevelInterest.CULTURAL]:
    "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
  [ITrevelInterest.FOOD_FESTIVAL]:
    "bg-sky-100 text-sky-800 dark:bg-sky-900 dark:text-sky-300",
  [ITrevelInterest.HISTORICAL]:
    "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300",
  [ITrevelInterest.INTERNATIONAL]:
    "bg-fuchsia-100 text-fuchsia-800 dark:bg-fuchsia-900 dark:text-fuchsia-300",
  [ITrevelInterest.LUXURY_TRAVEL]:
    "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300",
  [ITrevelInterest.NATURE]:
    "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  [ITrevelInterest.NIGHTLIFE_EXPLORATION]:
    "bg-slate-100 text-slate-800 dark:bg-slate-900 dark:text-slate-300",
  [ITrevelInterest.PHOTOGRAPHY]:
    "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-300",
  [ITrevelInterest.RELAXATION]:
    "bg-neutral-100 text-neutral-800 dark:bg-neutral-900 dark:text-neutral-300",
  [ITrevelInterest.ROAD_TRIPS]:
    "bg-rose-100 text-rose-800 dark:bg-rose-900 dark:text-rose-300",
  [ITrevelInterest.SHOPPING]:
    "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-300",
  [ITrevelInterest.VILLAGE_LIFE]:
    "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
  [ITrevelInterest.WILDLIFE]:
    "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
};

export function TravelPlanCard({ travelPlan, href }: TravelPlanCardProps) {
  const availableSeats =
    travelPlan.maxGuest - (travelPlan.participants?.length || 0);
  const startDate = new Date(travelPlan.startDate);
  const endDate = new Date(travelPlan.endDate);
  const linkHref = href || `/travel-plans/${travelPlan._id}`;

  return (
    <Card className="pt-0 group overflow-hidden hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/50">
      {/* <Link href={linkHref}> */}
      {/* Image Section */}
      <div className="relative h-52 w-full overflow-hidden bg-linear-to-br from-primary/10 to-primary/5">
        {travelPlan.image ? (
          <Image
            src={travelPlan.image}
            alt={travelPlan.title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-300 h-full"
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <MapPin className="w-16 h-16 text-primary/30" />
          </div>
        )}

        {/* Status Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          <Badge className={travelTypeColors[travelPlan.travelType]}>
            {travelPlan.travelType}
          </Badge>
          {availableSeats === 0 && <Badge variant="destructive">FULL</Badge>}
        </div>
        <div className="absolute top-3 right-3 flex gap-1">
          <Link href={linkHref}>
            <Button size="sm" variant="outline" className="w-full">
              <Eye className="w-3.5 h-3.5" />
            </Button>
          </Link>
        </div>
        {/* <div className="absolute top-3 right-3 flex flex-col gap-2">
            <Badge className={travelTypeColors[travelPlan.travelType]}>
              {travelPlan.travelType}
            </Badge>
            {availableSeats === 0 && <Badge variant="destructive">FULL</Badge>}
          </div> */}
      </div>

      <CardHeader className="py-3">
        {/* Title */}
        <h3 className="font-bold text-xl line-clamp-2 group-hover:text-primary transition-colors">
          {travelPlan.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
          {travelPlan.description}
        </p>
      </CardHeader>

      <CardContent className="space-y-3">
        {/* Destination */}
        <div className="flex items-center gap-2 text-sm">
          <MapPin className="w-4 h-4 text-primary shrink-0" />
          <span className="font-medium">
            {travelPlan.destination.city}, {travelPlan.destination.country}
          </span>
        </div>

        {/* Dates */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="w-4 h-4 shrink-0" />
          <span>
            {format(startDate, "MMM d")} - {format(endDate, "MMM d, yyyy")}
          </span>
        </div>

        {/* Budget and Seats */}
        <div className="flex items-center justify-between gap-4 py-1.5">
          <div className="flex items-center gap-2">
            {/* <DollarSign className="w-4 h-4 text-green-600 shrink-0" /> */}
            <span className="font-semibold text-green-700 dark:text-green-400">
              BDT {travelPlan.budget.toLocaleString()}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-blue-600 shrink-0" />
            <span className="font-medium">
              {availableSeats}/{travelPlan.maxGuest} left
            </span>
          </div>
        </div>

        {/* Interests */}
        <div className="flex flex-wrap gap-1.5 pb-3">
          {travelPlan.interests.slice(0, 3).map((interest) => (
            <Badge
              key={interest}
              variant="outline"
              className={interestColors[interest] || interestColors.default}
            >
              {interest}
            </Badge>
          ))}
          {travelPlan.interests.length > 3 && (
            <Badge variant="outline" className="bg-gray-50 dark:bg-gray-900">
              +{travelPlan.interests.length - 3}
            </Badge>
          )}
        </div>
      </CardContent>

      <CardFooter className="border-t">
        {/* Host Info */}
        {travelPlan.host && typeof travelPlan.host === "object" && (
          <div className="flex items-center gap-2 w-full">
            <Avatar className="h-8 w-8">
              <AvatarImage
                src={travelPlan.host?.profilePhoto}
                alt={travelPlan.host?.fullname}
              />
              <AvatarFallback>
                <User className="w-4 h-4" />
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="text-xs text-muted-foreground">Hosted by</span>
              <span className="text-sm font-medium">
                {travelPlan.host?.fullname}
              </span>
            </div>
          </div>
        )}
      </CardFooter>
      {/* </Link> */}
    </Card>
  );
}

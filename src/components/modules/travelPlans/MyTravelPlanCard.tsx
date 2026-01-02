"use client";

import Image from "next/image";
import Link from "next/link";
import { Calendar, MapPin, Users, Edit, Trash2, Eye } from "lucide-react";
import {
  ITravelPlan,
  ITravelType,
  ITrevelInterest,
  ITrevelIsApproved,
  ITrevelStatus,
} from "@/types/travelPlan.interface";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
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
import { useState } from "react";
import { cancelTravelPlan } from "@/services/travelPlans/travelPlans.service";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface MyTravelPlanCardProps {
  travelPlan: ITravelPlan & {
    _id: string;
  };
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

const isApprovedColors: Record<ITrevelIsApproved, string> = {
  [ITrevelIsApproved.PENDING]:
    "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
  [ITrevelIsApproved.APPROVED]:
    "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  [ITrevelIsApproved.REJECTED]:
    "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
};

const statusColors: Record<ITrevelStatus, string> = {
  [ITrevelStatus.UPCOMING]:
    "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
  [ITrevelStatus.ONGOING]:
    "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
  [ITrevelStatus.COMPLETED]:
    "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  [ITrevelStatus.CANCELLED]:
    "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
};

export function MyTravelPlanCard({ travelPlan }: MyTravelPlanCardProps) {
  const [cancelling, setCancelling] = useState(false);
  const router = useRouter();

  const availableSeats =
    travelPlan.maxGuest - (travelPlan.participants?.length || 0);
  const startDate = new Date(travelPlan.startDate);
  const endDate = new Date(travelPlan.endDate);
  const detailsHref = `/dashboard/my-travel-plans/${travelPlan._id}`;

  const handleCancel = async () => {
    setCancelling(true);
    try {
      const result = await cancelTravelPlan(travelPlan._id);
      if (result.success) {
        toast.success("Travel plan cancelled successfully");
        router.refresh();
      } else {
        toast.error(result.message || "Failed to cancel travel plan");
      }
    } catch (error) {
      console.log(error);
      toast.error("An error occurred");
    } finally {
      setCancelling(false);
    }
  };

  return (
    <Card className="pt-0 group overflow-hidden border-2 hover:border-primary/50 transition-all duration-300 flex flex-col h-full">
      <div className="block relative h-48 w-full overflow-hidden bg-linear-to-br from-primary/10 to-primary/5">
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

        <div className="absolute top-24 left-3 flex flex-col gap-1">
          <Badge className={travelTypeColors[travelPlan.travelType]}>
            {travelPlan.travelType}
          </Badge>
          <Badge className={isApprovedColors[travelPlan.isApproved]}>
            {travelPlan.isApproved}
          </Badge>
          <Badge className={statusColors[travelPlan.status]}>
            {travelPlan.status}
          </Badge>
        </div>
        <div className="absolute top-3 right-3 flex gap-1">
          <Link href={detailsHref}>
            <Button size="sm" variant="outline" className="w-full">
              <Eye className="w-3.5 h-3.5" />
            </Button>
          </Link>

          {travelPlan.isApproved === ITrevelIsApproved.PENDING &&
            travelPlan.status === ITrevelStatus.UPCOMING && (
              <Link href={`/dashboard/my-travel-plans/edit/${travelPlan._id}`}>
                <Button
                  size="sm"
                  variant="secondary"
                  className="w-full p-0 text-yellow-700 bg-yellow-100 hover:bg-yellow-200 dark:bg-yellow-900/40 dark:text-yellow-400"
                >
                  <Edit className="w-3.5 h-3.5" />
                </Button>
              </Link>
            )}

          {travelPlan.isApproved === ITrevelIsApproved.PENDING &&
            travelPlan.status === ITrevelStatus.UPCOMING && (
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button size="sm" variant="destructive" className="">
                    <Trash2 className="w-3.5 h-3.5" />
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently cancel
                      your travel plan and notify all enrolled participants.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>No, Keep it</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={handleCancel}
                      disabled={cancelling}
                      className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                    >
                      {cancelling ? "Cancelling..." : "Yes, Cancel Plan"}
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}
        </div>
      </div>

      <CardHeader className="py-0 px-4">
        <Link href={detailsHref}>
          <h3 className="font-bold text-xl line-clamp-2 group-hover:text-primary transition-colors">
            {travelPlan.title}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2 mt-1 min-h-10">
            {travelPlan.description}
          </p>
        </Link>
      </CardHeader>

      <CardContent className="space-y-3.5 px-4 grow">
        <div className="flex items-center gap-2 text-sm">
          <MapPin className="w-4 h-4 text-primary shrink-0" />
          <span className="font-medium truncate">
            {travelPlan.destination.city}, {travelPlan.destination.country}
          </span>
        </div>

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="w-4 h-4 shrink-0" />
          <span>
            {format(startDate, "MMM d")} - {format(endDate, "MMM d, yyyy")}
          </span>
        </div>

        <div className="flex items-center justify-between gap-4">
          <span className="font-semibold text-green-700 dark:text-green-400 text-sm">
            BDT {travelPlan.budget.toLocaleString()}
          </span>
          <div className="flex items-center gap-2 text-sm">
            <Users className="w-4 h-4 text-blue-600 shrink-0" />
            <span className="font-medium">
              {availableSeats}/{travelPlan.maxGuest} left
            </span>
          </div>
        </div>

        <div className="flex flex-wrap gap-1.5 min-h-6">
          {travelPlan.interests.slice(0, 3).map((interest) => (
            <Badge
              key={interest}
              variant="outline"
              className={`text-[10px] px-1.5 py-0 ${
                interestColors[interest] || interestColors.default
              }`}
            >
              {interest}
            </Badge>
          ))}
          {travelPlan.interests.length > 3 && (
            <Badge
              variant="outline"
              className="text-[10px] px-1.5 py-0 bg-gray-50 dark:bg-gray-900"
            >
              +{travelPlan.interests.length - 3}
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

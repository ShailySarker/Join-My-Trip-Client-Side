import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, ArrowRight, Calendar, Users } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { ITravelPlan, ITrevelInterest } from "@/types/travelPlan.interface";
import { IUser } from "@/types/user.interface";
import { format } from "date-fns";

export default function TopDestinations({
  travelPlan,
  userInfo,
}: {
  travelPlan: ITravelPlan[];
  userInfo: IUser;
}) {
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

  return (
    <section className="py-20">
      <div className="container px-4 mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold">
              Popular Destinations
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl">
              Discover the most sought-after locations where our community is
              traveling right now.
            </p>
          </div>
          {userInfo?.role === "ADMIN" || userInfo?.role === "SUPER_ADMIN" ? (
            <Link
              href="/manage-travel-plans"
              className="group flex items-center gap-2 text-primary font-semibold hover:underline"
            >
              Manage Travel Plans
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          ) : userInfo?.role === "USER" ? (
            <Link
              href="/my-travel-plans"
              className="group flex items-center gap-2 text-primary font-semibold hover:underline"
            >
              Explore All Travel Plans
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          ) : (
            <Link
              href="/travel-plans"
              className="group flex items-center gap-2 text-primary font-semibold hover:underline"
            >
              View All Travel Plans
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {travelPlan.map((dest) => (
            <Link href={`/travel-plans/${dest._id}`} key={dest._id}>
              <Card className="group overflow-hidden py-0 border-0 shadow-lg hover:shadow-2xl transition-all duration-300 h-full bg-card rounded-2xl">
                {/* Image Container */}
                <div className="relative h-[280px] w-full overflow-hidden">
                  <Image
                    src={dest.image}
                    alt={dest.destination.city}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent opacity-60" />

                  {/* Floating Badges */}
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-white/90 text-black backdrop-blur-md shadow-sm hover:bg-white px-3 py-1 text-xs font-semibold">
                      {dest.travelType}
                    </Badge>
                  </div>

                  <div className="absolute top-4 right-4">
                    <Badge className="bg-primary/90 text-primary-foreground backdrop-blur-md shadow-sm">
                      {dest.budget} BDT
                    </Badge>
                  </div>

                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <div className="flex items-center gap-1 text-sm font-medium text-gray-200 mb-1">
                      <MapPin className="w-3.5 h-3.5" />
                      {dest.destination.city}, {dest.destination.country}
                    </div>
                  </div>
                </div>

                {/* Content Container */}
                <CardContent className="p-5 space-y-3">
                  <h3 className="text-xl font-bold leading-tight group-hover:text-primary transition-colors line-clamp-1">
                    {dest.title}
                  </h3>
                  {/* Dates */}
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4 shrink-0" />
                    <span>
                      {format(dest.startDate, "MMM d")} -{" "}
                      {format(dest.endDate, "MMM d, yyyy")}
                    </span>
                  </div>

                  {/* Budget and Seats */}
                  <div className="flex items-center justify-between gap-4 py-1.5">
                    <div className="flex items-center gap-2">
                      {/* <DollarSign className="w-4 h-4 text-green-600 shrink-0" /> */}
                      <span className="font-semibold text-green-700 dark:text-green-400">
                        BDT {dest.budget.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-blue-600 shrink-0" />
                      <span className="font-medium">
                        {dest.maxGuest - (dest.participants?.length || 0)}/
                        {dest.maxGuest} left
                      </span>
                    </div>
                  </div>

                  {/* Interests */}
                  <div className="flex flex-wrap gap-1.5 pb-3">
                    {dest?.interests.slice(0, 3).map((interest) => (
                      <Badge
                        key={interest}
                        variant="outline"
                        className={
                          interestColors[interest] || interestColors.default
                        }
                      >
                        {interest}
                      </Badge>
                    ))}
                    {dest.interests.length > 3 && (
                      <Badge
                        variant="outline"
                        className="bg-gray-50 dark:bg-gray-900"
                      >
                        +{dest.interests.length - 3}
                      </Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

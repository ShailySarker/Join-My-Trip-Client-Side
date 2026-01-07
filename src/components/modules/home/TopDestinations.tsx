import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, ArrowRight, Calendar } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { ITravelPlan } from "@/types/travelPlan.interface";
import { IUser } from "@/types/user.interface";

export default function TopDestinations({
  travelPlan,
  userInfo,
}: {
  travelPlan: ITravelPlan[];
  userInfo: IUser;
}) {
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

                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center gap-1.5 bg-muted/50 px-2.5 py-1 rounded-full">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>
                        {new Date(dest.startDate).toLocaleDateString(
                          undefined,
                          { month: "short", day: "numeric" }
                        )}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="flex -space-x-2">
                        {/* Placeholder avatars or real ones if available */}
                        <div className="w-6 h-6 rounded-full bg-gray-200 border-2 border-white dark:border-gray-800 flex items-center justify-center text-[10px] font-bold">
                          {dest.participants?.length || 0}
                        </div>
                      </div>
                      <span className="text-xs font-medium">Joined</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 pt-2">
                    {dest.interests?.slice(0, 2).map((tag, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] uppercase tracking-wider bg-secondary/50 text-secondary-foreground px-2 py-1 rounded-md font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                    {dest.interests?.length > 2 && (
                      <span className="text-[10px] bg-secondary/30 px-2 py-1 rounded-md text-muted-foreground">
                        +More
                      </span>
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

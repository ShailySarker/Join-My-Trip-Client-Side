import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Star, MapPin, ArrowRight } from "lucide-react";
import Link from "next/link";
import { IUser } from "@/types/user.interface";
import { Button } from "@/components/ui/button";

interface TopRatedTravelersProps {
  travelers: IUser[];
}

export default function TopRatedTravelers({
  travelers,
}: TopRatedTravelersProps) {
  return (
    <section className="pb-20">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold">
              Top-Rated Travelers
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl">
              Meet our most trusted and experienced travel companions who have
              helped create amazing journeys.
            </p>
          </div>
          <Link href="/explore-travelers?sortBy=averageRating&sortOrder=desc">
            <Button variant="outline" className="group">
              View All Travelers
              <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {travelers.map((traveler) => (
            <Link
              href={`/explore-travelers/${traveler._id}`}
              key={traveler._id}
            >
              <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 shadow-md h-full">
                <CardContent className="p-6">
                  <div className="flex flex-col items-center text-center">
                    <Avatar className="w-24 h-24 mb-4 ring-4 ring-primary/10 group-hover:ring-primary/30 transition-all">
                      <AvatarImage
                        src={traveler.profilePhoto || ""}
                        alt={traveler.fullname}
                      />
                      <AvatarFallback className="text-2xl font-bold">
                        {traveler.fullname.substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>

                    <h3 className="text-lg font-bold mb-1 group-hover:text-primary transition-colors">
                      {traveler.fullname}
                    </h3>

                    {traveler.currentLocation?.city && (
                      <div className="flex items-center gap-1 text-sm text-muted-foreground mb-3">
                        <MapPin className="w-3 h-3" />
                        {traveler.currentLocation.city},{" "}
                        {traveler.currentLocation.country}
                      </div>
                    )}

                    <div className="flex items-center gap-1 mb-4">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-semibold">
                        {traveler.averageRating?.toFixed(1) || "5.0"}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        ({traveler.reviewCount || 0} reviews)
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-2 justify-center">
                      {traveler.travelInterests
                        ?.slice(0, 3)
                        .map((interest: string, idx: number) => (
                          <Badge
                            key={idx}
                            variant="secondary"
                            className="text-xs"
                          >
                            {interest}
                          </Badge>
                        ))}
                    </div>
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

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const destinations = [
  {
    city: "Cox's Bazar",
    country: "Bangladesh",
    image: "https://images.unsplash.com/photo-1629814457223-2882798e3df3?q=80&w=2070&auto=format&fit=crop",
    activeTravelers: 45,
    tags: ["Beach", "Relaxation"],
  },
  {
    city: "Sylhet",
    country: "Bangladesh",
    image: "https://images.unsplash.com/photo-1629252327045-38c3563919b6?q=80&w=2070&auto=format&fit=crop",
    activeTravelers: 32,
    tags: ["Nature", "Tea Gardens"],
  },
  {
    city: "Bandarban",
    country: "Bangladesh",
    image: "https://images.unsplash.com/photo-1594916895315-779836365f5a?q=80&w=1974&auto=format&fit=crop",
    activeTravelers: 28,
    tags: ["Mountains", "Adventure"],
  },
  {
    city: "Saint Martin's",
    country: "Bangladesh",
    image: "https://images.unsplash.com/photo-1625902347285-88a4b27424ad?q=80&w=2070&auto=format&fit=crop",
    activeTravelers: 56,
    tags: ["Island", "Blue Water"],
  },
];

export default function TopDestinations() {
  return (
    <section className="py-20 bg-background">
      <div className="container px-4 mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold">
              Popular Destinations
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl">
              Discover the most sought-after locations where our community is traveling right now.
            </p>
          </div>
          <Link href="/travel-plans?sort=popular" className="group flex items-center gap-2 text-primary font-semibold hover:underline">
            View All Destinations
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {destinations.map((dest, index) => (
            <Link href={`/travel-plans?search=${dest.city}`} key={index}>
              <Card className="group overflow-hidden border-0 shadow-lg h-full">
                <CardContent className="p-0 relative h-[300px]">
                  <Image
                    src={dest.image}
                    alt={dest.city}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90" />
                  
                  <div className="absolute bottom-0 left-0 p-6 w-full text-white">
                    <div className="flex items-center gap-2 mb-2">
                       <Badge variant="secondary" className="bg-white/20 text-white hover:bg-white/30 border-0 backdrop-blur-md">
                        {dest.activeTravelers} Travelers
                       </Badge>
                    </div>
                    <h3 className="text-2xl font-bold mb-1 group-hover:text-primary transition-colors">
                      {dest.city}
                    </h3>
                    <div className="flex items-center gap-1 text-gray-300 text-sm mb-3">
                      <MapPin className="w-4 h-4" />
                      {dest.country}
                    </div>
                    <div className="flex gap-2">
                      {dest.tags.map((tag) => (
                         <span key={tag} className="text-xs bg-white/10 px-2 py-1 rounded-full backdrop-blur-sm">
                           {tag}
                         </span>
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

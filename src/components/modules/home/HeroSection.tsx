import { Button } from "@/components/ui/button";
import { ArrowRight, Globe2 } from "lucide-react";
import Link from "next/link";
import banner from "@/assets/images/about-us-banner.avif";

interface HeroSectionProps {
  stats?: {
    activeTravelers: number;
    totalTrips: number;
    destinations?: number;
  };
}

export default function HeroSection({ stats }: HeroSectionProps) {
  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden pt-16">
      {/* Background with overlay */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${banner.src})`,
        }}
      >
        <div className="absolute inset-0 bg-black/50 dark:bg-black/70 backdrop-blur-[2px]" />
      </div>

      <div className="container relative z-10 px-4 py-32 text-center text-white">
        <div className="animate-fade-in-up space-y-6 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight">
            Find Your Perfect <br />
            {/* <span className="text-transparent bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-teal-400"> */}
            Travel Buddy
            {/* </span> */}
          </h1>

          <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto leading-relaxed">
            Connect with like-minded travelers, plan trips together, and create
            unforgettable memories. Join thousands of travelers exploring the
            world together.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
            <Link href="/travel-plans">
              <Button
                size="lg"
                className="w-full sm:w-auto text-lg h-12 px-8 rounded-full bg-primary hover:bg-primary/90"
              >
                Start Exploring
                <Globe2 className="h-5 w-5" />
              </Button>
            </Link>
            <Link href="/dashboard/my-travel-plans/create">
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto text-lg h-12 px-10 rounded-full  backdrop-blur-sm text-primary"
              >
                Create Plan
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 pt-16 border-t border-white/10 mt-16 max-w-3xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-1">
                {stats?.activeTravelers || "100"}+
              </div>
              <div className="text-sm text-gray-300">Active Travelers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-1">
                {stats?.destinations || "20"}+
              </div>
              <div className="text-sm text-gray-300">Destinations</div>
            </div>
            <div className="text-center col-span-2 md:col-span-1">
              <div className="text-3xl font-bold text-white mb-1">
                {stats?.totalTrips || "25"}+
              </div>
              <div className="text-sm text-gray-300">Successful Trips</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

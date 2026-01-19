/* eslint-disable react/no-unescaped-entities */
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check } from "lucide-react";
import Link from "next/link";

const features = [
  "Smart traveler matching based on interests",
  "Verified profiles for safety and trust",
  "Real-time chat with potential buddies",
  "Flexible trip planning tools",
  "Secure booking and payment system",
  "Community reviews and ratings",
];

interface RecommendedMatchesProps {
  stats?: {
    activeTravelers: number;
    destinations: number;
    completedTrips: number;
    averageRating: number;
  };
}

export default function RecommendedMatches({ stats }: RecommendedMatchesProps) {
  return (
    <section className="xl:py-20 lg:py-16 md:py-14 py-12 xl:px-24 lg:px-20 md:px-12 px-6">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
          {/* Content */}
          <div className="space-y-6">
            <div className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary font-medium text-sm">
              Personalized Matching
            </div>
            <h2 className="text-3xl md:text-4xl font-bold leading-tight">
              Find Your Perfect Travel Companion Today
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Our intelligent matching algorithm connects you with travelers who
              share your interests, travel style, and destinations. Say goodbye
              to solo travel loneliness and hello to unforgettable adventures
              with like-minded companions.
            </p>

            <ul className="space-y-4">
              {features.map((feature, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                    <Check className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-foreground">{feature}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link href="/travel-plans">
                <Button size="lg" className="w-full sm:w-auto">
                  Browse Trips
                </Button>
              </Link>
              <Link href="/register">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto"
                >
                  Get Started Free
                </Button>
              </Link>
            </div>
          </div>

          {/* Visual Element */}
          <Card className="p-8 md:p-12 bg-linear-to-br from-primary/5 to-primary/10 border-0 shadow-xl">
            <div className="space-y-6">
              <div className="text-center">
                <div className="text-5xl md:text-6xl font-bold bg-linear-to-r from-primary to-primary/60 bg-clip-text text-transparent mb-4">
                  {stats?.activeTravelers
                    ? Math.floor(stats.activeTravelers).toLocaleString()
                    : "100"}
                  +
                </div>
                <h3 className="text-xl font-bold mb-2">
                  Active Travel Buddies
                </h3>
                <p className="text-muted-foreground">
                  Ready to explore the world with you
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-6">
                <div className="text-center p-4 rounded-xl bg-background/50 backdrop-blur-sm">
                  <div className="text-3xl font-bold text-primary mb-1">
                    {stats?.destinations || "50"}+
                  </div>
                  <div className="text-sm text-muted-foreground">Countries</div>
                </div>
                <div className="text-center p-4 rounded-xl bg-background/50 backdrop-blur-sm">
                  <div className="text-3xl font-bold text-primary mb-1">
                    {stats?.averageRating
                      ? ((stats.averageRating / 5) * 100).toFixed(0)
                      : "98"}
                    %
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Match Success
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-border/50">
                <p className="text-center text-sm text-muted-foreground italic">
                  "I found my travel tribe here! Best decision ever." - Sarah M.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}

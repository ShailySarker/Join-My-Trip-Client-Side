import { Card, CardContent } from "@/components/ui/card";
import { Zap, TrendingUp, Award } from "lucide-react";

interface TrustIndicatorsProps {
  stats?: {
    totalTrips: number;
    successRate?: string;
    averageRating?: string;
  };
}

export default function TrustIndicators({ stats }: TrustIndicatorsProps) {
  const dynamicStats = [
    {
      icon: Zap,
      number: stats?.totalTrips
        ? `${(stats.totalTrips / 1000).toFixed(1)}K+`
        : "20+",
      label: "Trips Created",
      description: "Thousands of adventures planned every month",
      color: "text-yellow-500 bg-yellow-50 dark:bg-yellow-900/20",
    },
    {
      icon: TrendingUp,
      number: stats?.successRate || "95%",
      label: "Success Rate",
      description: "Of trips are successfully completed with joy",
      color: "text-green-500 bg-green-50 dark:bg-green-900/20",
    },
    {
      icon: Award,
      number: stats?.averageRating || "4.9/5",
      label: "Average Rating",
      description: "From thousands of happy travelers",
      color: "text-blue-500 bg-blue-50 dark:bg-blue-900/20",
    },
  ];

  return (
    <section className="py-20 bg-linear-to-br from-primary/80 via-background to-primary/80">
      <div className="container px-4 mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Trusted by Travelers Worldwide
          </h2>
          <p className="text-muted-foreground text-lg">
            Join a thriving community that has enabled thousands of meaningful
            connections and unforgettable travel experiences.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {dynamicStats.map((stat, index) => (
            <Card
              key={index}
              className="group border-0 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105"
            >
              <CardContent className="p-8 text-center">
                <div
                  className={`w-16 h-16 rounded-2xl ${stat.color} flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}
                >
                  <stat.icon className="w-8 h-8" />
                </div>
                <div className="text-4xl md:text-5xl font-bold mb-2 bg-linear-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                  {stat.number}
                </div>
                <h3 className="text-xl font-bold mb-2">{stat.label}</h3>
                <p className="text-sm text-muted-foreground">
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Trust Badges */}
        <div className="mt-16 flex flex-wrap justify-center items-center gap-8 ">
          <div className="text-sm font-medium text-black">TRUSTED BY</div>
          {[
            "Verified by Travel Experts",
            "Secure Payments",
            "24/7 Customer Support",
            "Privacy Protected",
          ].map((badge, idx) => (
            <div
              key={idx}
              className="px-4 py-2 rounded-full bg-primary text-sm font-medium text-white"
            >
              {badge}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

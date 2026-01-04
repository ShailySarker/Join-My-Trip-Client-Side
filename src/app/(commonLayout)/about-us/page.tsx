import { Metadata } from "next";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, Globe, Heart, Shield } from "lucide-react";
import { getAllUsers } from "@/services/user/userService";
import { getAllTravelPlansPublic } from "@/services/travelPlans/travelPlans.service";

export const metadata: Metadata = {
  title: "About Us - Join My Trip",
  description: "Learn more about our mission to connect travelers worldwide.",
};

export default async function AboutUsPage() {
  const [usersData, tripsData] = await Promise.all([
    getAllUsers({ limit: "1" }).catch(() => null),
    getAllTravelPlansPublic({ limit: "1" }).catch(() => null),
  ]);

  // Format large numbers e.g. 5000 -> 5K
  const formatNumber = (num: number) => {
    if (!num) return "0";
    if (num >= 1000) return (num / 1000).toFixed(1) + "K+";
    return num + "+";
  };

  // Safely access meta.total (handling potential nulls if fetch fails)
  // @ts-ignore
  const userCount = usersData?.meta?.total || 50; // Fallback
  // @ts-ignore
  const tripCount = tripsData?.meta?.total || 20;

  return (
    <div className="bg-background">
      {/* Hero Section */}
      <section className="relative py-24 px-4 overflow-hidden dark:bg-zinc-900/20">
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-fade-in-up">
              <div className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary font-medium text-sm">
                Our Story
              </div>
              <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight">
                Connecting <br />
                <span className="text-primary">Wanderlusters</span> <br />
                Worldwide
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Join My Trip was born from a simple idea: traveling is better
                together. We're on a mission to help solo travelers find their
                perfect companions and create unforgettable memories.
              </p>
              <div className="flex gap-4">
                <Link href="/auth/register">
                  <Button size="lg" className="rounded-full px-8">
                    Join Our Community
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative h-[400px] lg:h-[600px] rounded-3xl overflow-hidden shadow-2xl skew-y-2 hover:skew-y-0 transition-transform duration-700">
              <Image
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop"
                alt="Team working together"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent" />
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
      </section>

      {/* Mission Values */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold mb-4">Why We Do It</h2>
            <p className="text-muted-foreground text-lg">
              We believe in the power of shared experiences and the friendships
              that are forged on the road.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center max-w-6xl mx-auto">
            <div className="bg-card p-10 rounded-2xl shadow-sm border border-border/50 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Globe className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-3">Global Connection</h3>
              <p className="text-muted-foreground">
                Breaking down barriers and connecting people from diverse
                cultures and backgrounds through travel.
              </p>
            </div>
            <div className="bg-card p-10 rounded-2xl shadow-sm border border-border/50 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 text-red-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Heart className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-3">Community First</h3>
              <p className="text-muted-foreground">
                Building a supportive, inclusive, and friendly community where
                every traveler feels welcome.
              </p>
            </div>
            <div className="bg-card p-10 rounded-2xl shadow-sm border border-border/50 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 text-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Shield className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-3">Safety & Trust</h3>
              <p className="text-muted-foreground">
                Prioritizing safety with verified profiles and secure booking
                processes for peace of mind.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-5xl font-bold mb-2">
                {formatNumber(userCount)}
              </div>
              <div className="opacity-80">Active Users</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">
                {formatNumber(tripCount)}
              </div>
              <div className="opacity-80">Trips Planned</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">50+</div>
              <div className="opacity-80">Countries</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">4.8</div>
              <div className="opacity-80">Average Rating</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

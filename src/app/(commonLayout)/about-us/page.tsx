/* eslint-disable react/no-unescaped-entities */
import { Metadata } from "next";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  ArrowRight,
  Globe,
  Heart,
  Shield,
  Users,
  Target,
  Award,
  TrendingUp,
  Sparkles,
  Clock,
} from "lucide-react";
import { getAllUsers } from "@/services/user/userService";
import { getAllTravelPlansPublic } from "@/services/travelPlans/travelPlans.service";
import banner from "@/assets/images/about-us-banner.avif";
import { Card, CardContent } from "@/components/ui/card";
import { getUserInfo } from "@/services/auth/getUserInfo";

export const metadata: Metadata = {
  title: "About Us - Join My Trip",
  description: "Learn more about our mission to connect travelers worldwide.",
};

export default async function AboutUsPage() {
  const userInfo = await getUserInfo();
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

  const userCount = usersData?.meta?.total || 50; // Fallback
  const tripCount = tripsData?.meta?.total || 20;

  return (
    <div className="">
      {/* 1. Hero Section */}
      <section className="relative py-24 overflow-hidden ">
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-fade-in-up">
              <div className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary font-medium text-sm">
                Our Story
              </div>
              <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight">
                Connecting <br />
                <span className="text-primary">Travelers</span> <br />
                Worldwide
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Join My Trip was born from a simple idea: traveling is better
                together. We are on a mission to help solo travelers find their
                perfect companions and create unforgettable memories.
              </p>
              <div className="flex gap-4">
                <Link href="/register">
                  <Button size="lg" className="rounded-full">
                    Join Our Community
                    <ArrowRight className="ml-0.5 w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative h-[400px] lg:h-[600px] rounded-3xl overflow-hidden shadow-2xl skew-y-2 hover:skew-y-0 transition-transform duration-700">
              <Image
                src={banner}
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

      {/* 2. Mission & Vision */}
      <section className="py-20 bg-primary/30">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="border-0 shadow-lg">
                <CardContent className="p-10">
                  <div className="w-14 h-14 rounded-2xl bg-blue-100 dark:bg-blue-900/30 text-blue-600 flex items-center justify-center mb-6">
                    <Target className="w-7 h-7" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    To empower travelers worldwide by creating meaningful
                    connections that transform solo journeys into shared
                    adventures. We believe every trip is better when experienced
                    with the right companion.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardContent className="p-10">
                  <div className="w-14 h-14 rounded-2xl bg-purple-100 dark:bg-purple-900/30 text-purple-600 flex items-center justify-center mb-6">
                    <Sparkles className="w-7 h-7" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    To become the world's most trusted platform for travel
                    companionship, where every traveler can find their perfect
                    match and explore the world safely, affordably, and
                    joyfully.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Core Values */}
      <section className="pb-24 pt-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Our Core Values
            </h2>
            <p className="text-muted-foreground text-lg">
              These principles guide everything we do and shape our community
              culture.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center max-w-6xl mx-auto">
            <Card className="border-0 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <CardContent className="p-10">
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Globe className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold mb-3">Global Connection</h3>
                <p className="text-muted-foreground">
                  Breaking down barriers and connecting people from diverse
                  cultures and backgrounds through travel.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <CardContent className="p-10">
                <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 text-red-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Heart className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold mb-3">Community First</h3>
                <p className="text-muted-foreground">
                  Building a supportive, inclusive, and friendly community where
                  every traveler feels welcome.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <CardContent className="p-10">
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 text-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Shield className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold mb-3">Safety & Trust</h3>
                <p className="text-muted-foreground">
                  Prioritizing safety with verified profiles and secure booking
                  processes for peace of mind.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* 4. Stats Section */}
      <section className="py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Our Impact in Numbers
            </h2>
            <p className="text-primary-foreground/80 text-lg">
              Growing every day with passionate travelers joining our community
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center max-w-6xl mx-auto">
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
              <div className="text-5xl font-bold mb-2">5+</div>
              <div className="opacity-80">Countries</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">4.8★</div>
              <div className="opacity-80">Average Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Team/Culture Section */}
      <section className="py-20">
        <div className="container mx-auto">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h2 className="text-3xl md:text-4xl font-bold">
                  Built by Travelers, for Travelers
                </h2>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  Our team consists of passionate travelers who understand the
                  joys and challenges of exploring the world. We've experienced
                  firsthand the difference a great travel companion can make.
                </p>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  Every feature we build is designed with real traveler needs in
                  mind—from safety and security to seamless communication and
                  trip planning tools that actually work.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <Card className="border-0 shadow-md">
                  <CardContent className="p-6 text-center">
                    <Users className="w-10 h-10 text-primary mx-auto mb-4" />
                    <div className="text-3xl font-bold mb-2">50+</div>
                    <div className="text-sm text-muted-foreground">
                      Team Members
                    </div>
                  </CardContent>
                </Card>
                <Card className="border-0 shadow-md">
                  <CardContent className="p-6 text-center">
                    <Clock className="w-10 h-10 text-primary mx-auto mb-4" />
                    <div className="text-3xl font-bold mb-2">24/7</div>
                    <div className="text-sm text-muted-foreground">Support</div>
                  </CardContent>
                </Card>
                <Card className="border-0 shadow-md">
                  <CardContent className="p-6 text-center">
                    <Award className="w-10 h-10 text-primary mx-auto mb-4" />
                    <div className="text-3xl font-bold mb-2">5+</div>
                    <div className="text-sm text-muted-foreground">
                      Awards Won
                    </div>
                  </CardContent>
                </Card>
                <Card className="border-0 shadow-md">
                  <CardContent className="p-6 text-center">
                    <TrendingUp className="w-10 h-10 text-primary mx-auto mb-4" />
                    <div className="text-3xl font-bold mb-2">200%</div>
                    <div className="text-sm text-muted-foreground">
                      Growth YoY
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Why We're Different */}
      <section className="py-20 bg-primary/30">
        <div className="container mx-auto px-8">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              What Makes Us Different
            </h2>
            <p className="text-accent-foreground text-lg">
              We're not just another travel booking platform—we're a community
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-6xl mx-auto">
            {[
              {
                title: "Intelligent Matching",
                description:
                  "Our superior matching filtering doesn't just match destinations—it considers interests, travel style, personality, and preferences to find your ideal companion.",
              },
              {
                title: "Verified Community",
                description:
                  "Every member goes through verification to ensure authenticity. Read real reviews from real travelers.",
              },
              {
                title: "Flexible Planning",
                description:
                  "Create detailed itineraries or keep it spontaneous. Our tools adapt to your travel style.",
              },
              {
                title: "Safety First",
                description:
                  "Built-in safety features, emergency support, and community guidelines keep everyone protected.",
              },
            ].map((item, idx) => (
              <Card
                key={idx}
                className="border-0 shadow-md hover:shadow-lg transition-shadow"
              >
                <CardContent className="p-8">
                  <div className="flex items-start gap-4">
                    <div className="shrink-0 w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold text-lg">
                      {idx + 1}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Community Impact Stories */}
      <section className="py-20">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Real Stories from Our Community
            </h2>
            <p className="text-muted-foreground text-lg mb-12">
              Thousands of friendships formed and memories created
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  stat: "10,000+",
                  label: "Friendships Formed",
                  description: "Travelers who became lifelong friends",
                },
                {
                  stat: "95%",
                  label: "Success Rate",
                  description: "Of trips completed successfully",
                },
                {
                  stat: "87%",
                  label: "Return Rate",
                  description: "Users who plan multiple trips",
                },
              ].map((item, idx) => (
                <Card key={idx} className="border-0 shadow-lg">
                  <CardContent className="p-8 text-center">
                    <div className="text-4xl font-bold text-primary mb-2">
                      {item.stat}
                    </div>
                    <div className="font-semibold mb-2">{item.label}</div>
                    <div className="text-sm text-muted-foreground">
                      {item.description}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 8. CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Start Your Journey?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of travelers who've found their perfect travel
              companions
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {userInfo?.role === "ADMIN" ||
              userInfo?.role === "SUPER_ADMIN" ? (
                <Link href="/admin/dashboard">
                  <Button size="lg" variant="secondary" className="h-12 px-8">
                    View Dashboard
                    <ArrowRight className=" w-4 h-4" />
                  </Button>
                </Link>
              ) : userInfo?.role === "USER" ? (
                <Link href="/dashboard">
                  <Button size="lg" variant="secondary" className="h-12 px-8">
                    View Dashboard
                    <ArrowRight className=" w-4 h-4" />
                  </Button>
                </Link>
              ) : (
                <Link href="/register">
                  <Button size="lg" variant="secondary" className="h-12 px-8">
                    Join Today
                    <ArrowRight className=" w-4 h-4" />
                  </Button>
                </Link>
              )}
              {userInfo?.role === "ADMIN" ||
              userInfo?.role === "SUPER_ADMIN" ? (
                <Link href="/admin/dashboard/manage-travel-plans">
                  <Button
                    size="lg"
                    variant="outline"
                    className="h-12 px-8 text-primary border-white/20 hover:bg-white/10"
                  >
                    Manage Travel Plan
                    <ArrowRight className=" w-4 h-4" />
                  </Button>
                </Link>
              ) : userInfo?.role === "USER" ? (
                <Link href="/explore-travel-plans">
                  <Button
                    size="lg"
                    variant="outline"
                    className="h-12 px-8 text-primary border-white/20 hover:bg-white/10"
                  >
                    Explore Travel Plans
                    <ArrowRight className=" w-4 h-4" />
                  </Button>
                </Link>
              ) : (
                <Link href="/travel-plans">
                  <Button
                    size="lg"
                    variant="outline"
                    className="h-12 px-8 text-primary border-white/20 hover:bg-white/10"
                  >
                    Explore Travel
                    <ArrowRight className=" w-4 h-4" />
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

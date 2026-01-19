import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import {
  Users,
  MapPin,
  MessageCircle,
  Shield,
  Calendar,
  Search,
  Star,
  Heart,
  Globe,
  Lock,
  CheckCircle,
  Clock,
  UserCheck,
  Sparkles,
  TrendingUp,
  Zap,
  Crown,
  ArrowRight,
  Contact,
} from "lucide-react";
import { getUserInfo } from "@/services/auth/getUserInfo";

export const metadata: Metadata = {
  title: "Our Services - Join My Trip",
  description:
    "Discover all the features and services that make finding your perfect travel companion easy and safe.",
};

export default async function ServicesPage() {
  const userInfo = await getUserInfo();
  return (
    <div className="min-h-screen xl:px-24 lg:px-20 md:px-12 px-6 xl:pt-7 lg:pt-5 md:pt-4 pt-3 xl:pb-20 lg:pb-16 md:pb-14 pb-13">
      {/* 1. Hero Section */}
      <section className="relative py-24 bg-linear-to-br from-primary/80 via-background to-primary/80 overflow-hidden">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-6" variant="secondary">
              Our Services
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Everything You Need for the
              <span className="text-primary"> Perfect Trip</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              From finding your ideal travel buddy to planning every detail of
              your adventure, we have got you covered with comprehensive tools
              and features.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {userInfo?.role === "ADMIN" ||
              userInfo?.role === "SUPER_ADMIN" ? (
                <Link href="/admin/dashboard">
                  <Button size="lg" className="h-12">
                    Go to Dashboard
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              ) : userInfo?.role === "USER" ? (
                <Link href="/dashboard">
                  <Button size="lg" className="h-12">
                    Go to Dashboard
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              ) : (
                <Link href="/register">
                  <Button size="lg" className="h-12">
                    Get Started Now
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              )}
              {userInfo?.role === "ADMIN" ||
              userInfo?.role === "SUPER_ADMIN" ? (
                <Link href="/admin/dashboard/manage-travel-plans">
                  <Button size="lg" variant="outline" className="h-12">
                    Browse Travel Plans
                  </Button>
                </Link>
              ) : userInfo?.role === "USER" ? (
                <Link href="/explore-travel-plans">
                  <Button size="lg" variant="outline" className="h-12">
                    Browse Travel Plans
                  </Button>
                </Link>
              ) : (
                <Link href="/travel-plans">
                  <Button size="lg" variant="outline" className="h-12">
                    Browse Travel Plans
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
      </section>

      {/* 2. Core Services */}
      <section className="py-20">
        <div className="container mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Core Services
            </h2>
            <p className="text-muted-foreground text-lg">
              Powerful features designed to make your travel experience seamless
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {[
              {
                icon: Search,
                title: "Smart Traveler Matching",
                description:
                  "Our intelligent algorithm matches you with compatible travelers based on interests, destinations, and travel style.",
                color: "text-blue-500 bg-blue-50 dark:bg-blue-900/20",
              },
              {
                icon: Calendar,
                title: "Trip Planning Tools",
                description:
                  "Create detailed itineraries, manage bookings, and collaborate with your travel buddies all in one place.",
                color: "text-green-500 bg-green-50 dark:bg-green-900/20",
              },
              {
                icon: MessageCircle,
                title: "Real-time Chat",
                description:
                  "Secure in-app messaging (coming soon) to connect with potential travel companions before and during your trip.",
                color: "text-purple-500 bg-purple-50 dark:bg-purple-900/20",
              },
              {
                icon: UserCheck,
                title: "Profile Verification",
                description:
                  "Multi-step verification process ensures you're connecting with genuine, trustworthy travelers.",
                color: "text-orange-500 bg-orange-50 dark:bg-orange-900/20",
              },
              {
                icon: Star,
                title: "Reviews & Ratings",
                description:
                  "Read authentic reviews from real travelers and build your own reputation in the community.",
                color: "text-yellow-500 bg-yellow-50 dark:bg-yellow-900/20",
              },
              {
                icon: MapPin,
                title: "Destination Guides",
                description:
                  "Access comprehensive guides, local tips, and recommendations for destinations worldwide.",
                color: "text-red-500 bg-red-50 dark:bg-red-900/20",
              },
            ].map((service, index) => (
              <Card
                key={index}
                className="group border-0 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
              >
                <CardContent className="p-8">
                  <div
                    className={`w-14 h-14 rounded-2xl ${service.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}
                  >
                    <service.icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {service.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 3. How It Works Process */}
      <section className="py-20 bg-accent/30">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              How Our Service Works
            </h2>
            <p className="text-ascent-foreground text-lg">
              Get started in three simple steps
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  step: "01",
                  title: "Create Your Profile",
                  description:
                    "Sign up and tell us about your travel preferences, interests, and dream destinations.",
                  icon: Users,
                },
                {
                  step: "02",
                  title: "Find or Create Trips",
                  description:
                    "Browse existing travel plans or create your own. Our algorithm will suggest perfect matches.",
                  icon: Globe,
                },
                {
                  step: "03",
                  title: "Connect & Travel",
                  description:
                    "Chat with potential buddies, finalize plans, and embark on your adventure together!",
                  icon: Heart,
                },
              ].map((item, index) => (
                <div key={index} className="relative">
                  <Card className="border-0 shadow-lg h-full">
                    <CardContent className="p-8 text-center">
                      <div className="mb-6">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary text-primary-foreground text-2xl font-bold mb-4">
                          {item.step}
                        </div>
                        {/* <div className="w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mx-auto">
                          <item.icon className="w-7 h-7" />
                        </div> */}
                      </div>
                      <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {item.description}
                      </p>
                    </CardContent>
                  </Card>
                  {index < 2 && (
                    <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                      <ArrowRight className="w-8 h-8 text-primary/30" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. Premium Features */}
      <section className="py-20">
        <div className="container mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge className="mb-4" variant="default">
              <Crown className="w-3 h-3 mr-1" /> Premium
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Premium Features
            </h2>
            <p className="text-muted-foreground text-lg">
              Unlock advanced capabilities with our premium subscription
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                {
                  icon: Zap,
                  title: "Priority Matching",
                  description:
                    "Get matched first with premium travelers and access exclusive trip opportunities.",
                },
                {
                  icon: TrendingUp,
                  title: "Advanced Filters",
                  description:
                    "Use advanced search filters to find exactly the right travel companion.",
                },
                {
                  icon: Sparkles,
                  title: "Verified Badge",
                  description:
                    "Stand out with a verified badge that builds trust and increases match rates.",
                },
                {
                  icon: MessageCircle,
                  title: "Create New Travel Plan",
                  description:
                    "Create your own travel plan and share it with others.",
                },
              ].map((feature, index) => (
                <Card
                  key={index}
                  className="border-2 border-primary/20 shadow-lg hover:shadow-xl transition-all hover:scale-105"
                >
                  <CardContent className="p-8">
                    <div className="flex items-start gap-4">
                      <div className="shrink-0 w-12 h-12 rounded-xl bg-linear-to-br from-primary to-primary/60 text-white flex items-center justify-center">
                        <feature.icon className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold mb-2">
                          {feature.title}
                        </h3>
                        <p className="text-muted-foreground leading-relaxed">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link href="/subscription">
                <Button size="lg" className="h-12">
                  <Crown className="w-4 h-4 mr-2" />
                  Upgrade to Premium
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Safety & Security */}
      <section className="py-20 bg-accent/30">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 font-medium text-sm">
                  <Shield className="w-4 h-4" />
                  Safety First
                </div>
                <h2 className="text-3xl md:text-4xl font-bold">
                  Your Safety is Our Priority
                </h2>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  We have built comprehensive safety features to ensure you can
                  travel with confidence and peace of mind.
                </p>

                <div className="space-y-4">
                  {[
                    "Multi-step identity verification process",
                    "Secure payment processing with encryption",
                    "24/7 customer support and emergency assistance",
                    "Community guidelines and moderation",
                    "Privacy controls for your personal information",
                    "Review and rating system for accountability",
                  ].map((item, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-foreground">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                {[
                  {
                    icon: Lock,
                    title: "Secure Data",
                    description: "Bank-level encryption",
                  },
                  {
                    icon: UserCheck,
                    title: "Verified Users",
                    description: "100% verified profiles",
                  },
                  {
                    icon: Shield,
                    title: "Safe Payments",
                    description: "Protected transactions",
                  },
                  {
                    icon: Clock,
                    title: "24/7 Support",
                    description: "Always here to help",
                  },
                ].map((item, index) => (
                  <Card key={index} className="border-0 shadow-lg">
                    <CardContent className="p-6 text-center">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4">
                        <item.icon className="w-6 h-6" />
                      </div>
                      <h3 className="font-bold mb-1">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {item.description}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Support Services */}
      <section className="py-20">
        <div className="container mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Dedicated Support
            </h2>
            <p className="text-muted-foreground text-lg">
              We are here to help you every step of your journey
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                icon: MessageCircle,
                title: "Live Chat",
                description: "Get instant answers from our support team",
                availability: "Available 24/7",
              },
              {
                icon: Clock,
                title: "Email Support",
                description: "Detailed assistance for complex queries",
                availability: "Response within 2 hours",
              },
              {
                icon: Globe,
                title: "Help Center",
                description: "Browse FAQs and detailed guides",
                availability: "Always accessible",
              },
            ].map((support, index) => (
              <Card
                key={index}
                className="border-0 shadow-md hover:shadow-lg transition-shadow"
              >
                <CardContent className="p-8 text-center">
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mx-auto mb-6">
                    <support.icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{support.title}</h3>
                  <p className="text-muted-foreground mb-4">
                    {support.description}
                  </p>
                  <Badge variant="secondary">{support.availability}</Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 8. CTA Section */}
      <section className="py-20 bg-linear-to-r from-primary to-primary/80 text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Find Your Travel Buddy?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of travelers already using our platform to create
              unforgettable memories
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {userInfo?.role === "ADMIN" ||
              userInfo?.role === "SUPER_ADMIN" ? (
                <Link href="/admin/dashboard">
                  <Button size="lg" variant="secondary" className="h-12 px-8">
                    Dashboard Overview
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              ) : userInfo?.role === "USER" ? (
                <Link href="/dashboard">
                  <Button size="lg" variant="secondary" className="h-12 px-8">
                    Dashboard Overview
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              ) : (
                <Link href="/register">
                  <Button size="lg" variant="secondary" className="h-12 px-8">
                    Start Now
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              )}
              <Link href="/contact-us">
                <Button
                  size="lg"
                  variant="outline"
                  className="h-12 px-8 text-primary border-white/20 hover:bg-white/10"
                >
                  Contact Us
                  <Contact className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

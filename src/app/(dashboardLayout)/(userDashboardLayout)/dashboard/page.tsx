/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Users,
  MapPin,
  Calendar,
  TrendingUp,
  Star,
  BookOpen,
  Plane,
  Heart,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

type DashboardStats = {
  totalTravelPlans: number;
  upcomingTravels: number;
  ongoingTravels: number;
  completedTravels: number;
  totalBookings: number;
  activeBookings: number;
  averageRating: number;
  totalReviews: number;
  givenReviews: number;
  receivedReviews: number;
  followers: number;
  following: number;
};

type RecentActivity = {
  type: "travel" | "booking" | "review";
  title: string;
  description: string;
  date: Date;
  status?: string;
};

export default function UserDashboardPage() {
  const router = useRouter();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [recentActivity, setRecentActivity] = useState<RecentActivity[]>([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  /* import { getUserDashboardStats } from "@/services/user/userService"; */ /* Make sure to add this import at top if I can't in this block */

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const { getUserDashboardStats } = await import(
        "@/services/user/userService"
      );
      const result = await getUserDashboardStats();

      if (result.success && result.data) {
        setStats(result.data);

        // Transform dates in recent activity
        const formattedActivity = result.data.recentActivity.map(
          (item: any) => ({
            ...item,
            date: new Date(item.date),
          })
        );

        setRecentActivity(formattedActivity);
      } else {
        toast.error(result.message || "Failed to load dashboard data");
      }
    } catch (error) {
      toast.error("Failed to load dashboard data");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: "My Travel Plans",
      value: stats?.totalTravelPlans || 0,
      subtitle: `${stats?.upcomingTravels || 0} upcoming`,
      icon: MapPin,
      color: "text-blue-600 dark:text-blue-400",
      bgColor: "bg-blue-50 dark:bg-blue-950",
      href: "/dashboard/my-travel-plans",
    },
    {
      title: "My Bookings",
      value: stats?.totalBookings || 0,
      subtitle: `${stats?.activeBookings || 0} active`,
      icon: BookOpen,
      color: "text-green-600 dark:text-green-400",
      bgColor: "bg-green-50 dark:bg-green-950",
      href: "/dashboard/my-bookings",
    },
    {
      title: "Average Rating",
      value: stats?.averageRating.toFixed(1) || "0.0",
      subtitle: `${stats?.totalReviews || 0} reviews`,
      icon: Star,
      color: "text-yellow-600 dark:text-yellow-400",
      bgColor: "bg-yellow-50 dark:bg-yellow-950",
      href: "/dashboard/received-reviews",
    },
    {
      title: "Connections",
      value: stats?.followers || 0,
      subtitle: `Following ${stats?.following || 0}`,
      icon: Users,
      color: "text-purple-600 dark:text-purple-400",
      bgColor: "bg-purple-50 dark:bg-purple-950",
      href: "/dashboard/my-followers",
    },
  ];

  const quickActions = [
    {
      title: "Create Travel Plan",
      description: "Plan your next adventure",
      icon: Plane,
      href: "/dashboard/my-travel-plans/create",
      color: "bg-gradient-to-br from-blue-500 to-blue-600",
    },
    {
      title: "Explore Travel Plans",
      description: "Find your next journey",
      icon: MapPin,
      href: "/dashboard/explore-travel-plans",
      color: "bg-gradient-to-br from-green-500 to-green-600",
    },
    {
      title: "My Reviews",
      description: "Manage your feedback",
      icon: Star,
      href: "/dashboard/given-reviews",
      color: "bg-gradient-to-br from-yellow-500 to-yellow-600",
    },
    {
      title: "Find Travel Buddy",
      description: "Connect with travelers",
      icon: Heart,
      href: "/dashboard/explore-travelers",
      color: "bg-gradient-to-br from-pink-500 to-pink-600",
    },
  ];

  const getStatusIcon = (status?: string) => {
    switch (status) {
      case "confirmed":
      case "approved":
        return <CheckCircle2 className="w-4 h-4 text-green-500" />;
      case "pending":
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case "cancelled":
      case "rejected":
        return <XCircle className="w-4 h-4 text-red-500" />;
      default:
        return <AlertCircle className="w-4 h-4 text-blue-500" />;
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "travel":
        return <MapPin className="w-5 h-5" />;
      case "booking":
        return <BookOpen className="w-5 h-5" />;
      case "review":
        return <Star className="w-5 h-5" />;
      default:
        return <AlertCircle className="w-5 h-5" />;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="xl:text-4xl lg:text-[32px] text-3xl font-bold bg-linear-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
          Welcome Back, Traveler!
        </h1>
        <p className="text-muted-foreground text-lg">
          Here is what is happening with your adventures
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {loading
          ? Array.from({ length: 4 }).map((_, i) => (
              <Card key={i} className="overflow-hidden">
                <CardContent className="p-6">
                  <Skeleton className="h-24 w-full" />
                </CardContent>
              </Card>
            ))
          : statCards.map((card, index) => (
              <Card
                key={index}
                className="overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer group border-2 hover:border-primary/50"
                onClick={() => router.push(card.href)}
              >
                <CardContent className="py-0">
                  <div className="flex items-start justify-between">
                    <div className="space-y-2 flex-1">
                      <p className="text-sm font-medium text-muted-foreground">
                        {card.title}
                      </p>
                      <p className="text-3xl font-bold tracking-tight">
                        {card.value}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {card.subtitle}
                      </p>
                    </div>
                    <div
                      className={cn(
                        "p-3 rounded-xl transition-transform group-hover:scale-110",
                        card.bgColor
                      )}
                    >
                      <card.icon className={cn("w-6 h-6", card.color)} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
      </div>

      {/* Quick Actions */}
      <Card className="overflow-hidden border-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Quick Actions
          </CardTitle>
          <CardDescription>Jump into your most common tasks</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action, index) => (
              <Button
                key={index}
                variant="outline"
                className="h-auto p-6 flex-col items-start gap-3 hover:scale-105 transition-transform border-2 group"
                onClick={() => router.push(action.href)}
              >
                <div className={cn("p-3 rounded-lg text-white", action.color)}>
                  <action.icon className="w-6 h-6" />
                </div>
                <div className="text-left">
                  <p className="font-semibold mb-1 group-hover:text-primary transition-colors">
                    {action.title}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {action.description}
                  </p>
                </div>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity & Travel Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <Card className="lg:col-span-2 border-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Recent Activity
            </CardTitle>
            <CardDescription>Your latest travel updates</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="space-y-4">
                {Array.from({ length: 3 }).map((_, i) => (
                  <Skeleton key={i} className="h-20 w-full" />
                ))}
              </div>
            ) : recentActivity.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <AlertCircle className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p>No recent activity</p>
              </div>
            ) : (
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-4 p-4 rounded-lg border hover:bg-accent/50 transition-colors"
                  >
                    <div className="p-2 rounded-lg bg-primary/10 text-primary">
                      {getActivityIcon(activity.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-semibold truncate">
                          {activity.title}
                        </p>
                        {activity.status && getStatusIcon(activity.status)}
                      </div>
                      <p className="text-sm text-muted-foreground truncate">
                        {activity.description}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {activity.date.toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Travel Status Breakdown */}
        <Card className="border-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Travel Status
            </CardTitle>
            <CardDescription>Your trip breakdown</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="space-y-4">
                {Array.from({ length: 3 }).map((_, i) => (
                  <Skeleton key={i} className="h-16 w-full" />
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-lg bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800">
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    <div>
                      <p className="font-semibold text-sm">Upcoming</p>
                      <p className="text-xs text-muted-foreground">
                        Ready to go
                      </p>
                    </div>
                  </div>
                  <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    {stats?.upcomingTravels || 0}
                  </p>
                </div>

                <div className="flex items-center justify-between p-4 rounded-lg bg-yellow-50 dark:bg-yellow-950 border border-yellow-200 dark:border-yellow-800">
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
                    <div>
                      <p className="font-semibold text-sm">Ongoing</p>
                      <p className="text-xs text-muted-foreground">
                        Currently traveling
                      </p>
                    </div>
                  </div>
                  <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
                    {stats?.ongoingTravels || 0}
                  </p>
                </div>

                <div className="flex items-center justify-between p-4 rounded-lg bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400" />
                    <div>
                      <p className="font-semibold text-sm">Completed</p>
                      <p className="text-xs text-muted-foreground">
                        Past adventures
                      </p>
                    </div>
                  </div>
                  <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                    {stats?.completedTravels || 0}
                  </p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

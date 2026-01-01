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
  DollarSign,
  Activity,
  CheckCircle2,
  XCircle,
  Clock,
  AlertCircle,
  BarChart3,
  Eye,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

type AdminStats = {
  totalUsers: number;
  activeUsers: number;
  totalTravelPlans: number;
  pendingApprovals: number;
  totalBookings: number;
  totalRevenue: number;
  monthlyRevenue: number;
  totalReviews: number;
  averageRating: number;
};

type ChartData = {
  name: string;
  users?: number;
  travels?: number;
  bookings?: number;
  revenue?: number;
  value?: number;
};

const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"];

export default function AdminDashboardPage() {
  const router = useRouter();
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [monthlyData, setMonthlyData] = useState<ChartData[]>([]);
  const [statusData, setStatusData] = useState<ChartData[]>([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      // TODO: Call actual API when available
      // Simulating data for now
      setTimeout(() => {
        setStats({
          totalUsers: 1247,
          activeUsers: 856,
          totalTravelPlans: 342,
          pendingApprovals: 28,
          totalBookings: 1829,
          totalRevenue: 145680,
          monthlyRevenue: 18450,
          totalReviews: 987,
          averageRating: 4.6,
        });

        setMonthlyData([
          { name: "Jan", users: 65, travels: 28, bookings: 142, revenue: 12400 },
          { name: "Feb", users: 78, travels: 32, bookings: 156, revenue: 13200 },
          { name: "Mar", users: 92, travels: 41, bookings: 178, revenue: 15800 },
          { name: "Apr", users: 104, travels: 38, bookings: 165, revenue: 14600 },
          { name: "May", users: 118, travels: 45, bookings: 192, revenue: 16900 },
          { name: "Jun", users: 135, travels: 52, bookings: 208, revenue: 18450 },
        ]);

        setStatusData([
          { name: "Upcoming", value: 156 },
          { name: "Ongoing", value: 42 },
          { name: "Completed", value: 128 },
          { name: "Cancelled", value: 16 },
        ]);

        setLoading(false);
      }, 1000);
    } catch (error) {
      toast.error("Failed to load dashboard data");
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: "Total Users",
      value: stats?.totalUsers || 0,
      subtitle: `${stats?.activeUsers || 0} active`,
      icon: Users,
      color: "text-blue-600 dark:text-blue-400",
      bgColor: "bg-blue-50 dark:bg-blue-950",
      href: "/admin/dashboard/manage-users",
      trend: "+12.5%",
    },
    {
      title: "Travel Plans",
      value: stats?.totalTravelPlans || 0,
      subtitle: `${stats?.pendingApprovals || 0} pending`,
      icon: MapPin,
      color: "text-green-600 dark:text-green-400",
      bgColor: "bg-green-50 dark:bg-green-950",
      href: "/admin/dashboard/manage-travel-plans",
      trend: "+8.3%",
    },
    {
      title: "Total Bookings",
      value: stats?.totalBookings || 0,
      subtitle: "All time",
      icon: BookOpen,
      color: "text-purple-600 dark:text-purple-400",
      bgColor: "bg-purple-50 dark:bg-purple-950",
      href: "/admin/dashboard/manage-bookings",
      trend: "+18.2%",
    },
    {
      title: "Total Revenue",
      value: `৳${((stats?.totalRevenue || 0) / 1000).toFixed(0)}K`,
      subtitle: `৳${((stats?.monthlyRevenue || 0) / 1000).toFixed(1)}K this month`,
      icon: DollarSign,
      color: "text-yellow-600 dark:text-yellow-400",
      bgColor: "bg-yellow-50 dark:bg-yellow-950",
      href: "/admin/dashboard/payment-history",
      trend: "+22.7%",
    },
    {
      title: "Reviews",
      value: stats?.totalReviews || 0,
      subtitle: `${stats?.averageRating.toFixed(1)}★ average`,
      icon: Star,
      color: "text-orange-600 dark:text-orange-400",
      bgColor: "bg-orange-50 dark:bg-orange-950",
      href: "/admin/dashboard/reviews",
      trend: "+15.8%",
    },
    {
      title: "Pending Approvals",
      value: stats?.pendingApprovals || 0,
      subtitle: "Requires action",
      icon: AlertCircle,
      color: "text-red-600 dark:text-red-400",
      bgColor: "bg-red-50 dark:bg-red-950",
      href: "/admin/dashboard/manage-travel-plans?status=PENDING",
      trend: "-5.2%",
    },
  ];

  const quickActions = [
    {
      title: "Manage Users",
      description: "View and manage all users",
      icon: Users,
      href: "/admin/dashboard/manage-users",
      color: "bg-gradient-to-br from-blue-500 to-blue-600",
    },
    {
      title: "Approve Travel Plans",
      description: "Review pending travel plans",
      icon: CheckCircle2,
      href: "/admin/dashboard/manage-travel-plans?isApproved=PENDING",
      color: "bg-gradient-to-br from-green-500 to-green-600",
    },
    {
      title: "View Bookings",
      description: "Monitor all bookings",
      icon: BookOpen,
      href: "/admin/dashboard/manage-bookings",
      color: "bg-gradient-to-br from-purple-500 to-purple-600",
    },
    {
      title: "Payment History",
      description: "Track all transactions",
      icon: DollarSign,
      href: "/admin/dashboard/payment-history",
      color: "bg-gradient-to-br from-yellow-500 to-yellow-600",
    },
    {
      title: "Manage Reviews",
      description: "Review user feedback",
      icon: Star,
      href: "/admin/dashboard/reviews",
      color: "bg-gradient-to-br from-orange-500 to-orange-600",
    },
    {
      title: "Subscription Plans",
      description: "Manage subscription tiers",
      icon: Activity,
      href: "/admin/dashboard/subscription-plans",
      color: "bg-gradient-to-br from-pink-500 to-pink-600",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="xl:text-4xl lg:text-[32px] text-3xl font-bold bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
          Admin Dashboard 🎯
        </h1>
        <p className="text-muted-foreground text-lg">
          Comprehensive overview of your travel platform
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading
          ? Array.from({ length: 6 }).map((_, i) => (
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
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div
                      className={cn(
                        "p-3 rounded-xl transition-transform group-hover:scale-110",
                        card.bgColor
                      )}
                    >
                      <card.icon className={cn("w-6 h-6", card.color)} />
                    </div>
                    <span
                      className={cn(
                        "text-xs font-semibold px-2 py-1 rounded-full",
                        card.trend.startsWith("+")
                          ? "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400"
                          : "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-400"
                      )}
                    >
                      {card.trend}
                    </span>
                  </div>
                  <div className="space-y-2">
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
                </CardContent>
              </Card>
            ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Growth Chart */}
        <Card className="border-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Monthly Growth
            </CardTitle>
            <CardDescription>User and booking trends</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <Skeleton className="h-[300px] w-full" />
            ) : (
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--background))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="users"
                    stroke="#3b82f6"
                    strokeWidth={2}
                    name="New Users"
                  />
                  <Line
                    type="monotone"
                    dataKey="bookings"
                    stroke="#10b981"
                    strokeWidth={2}
                    name="Bookings"
                  />
                </LineChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>

        {/* Travel Status Distribution */}
        <Card className="border-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              Travel Plan Status
            </CardTitle>
            <CardDescription>Distribution by status</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <Skeleton className="h-[300px] w-full" />
            ) : (
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={statusData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) =>
                      `${name}: ${(percent * 100).toFixed(0)}%`
                    }
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {statusData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Revenue Chart */}
      <Card className="border-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="w-5 h-5" />
            Revenue Overview
          </CardTitle>
          <CardDescription>Monthly revenue trends</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <Skeleton className="h-[300px] w-full" />
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--background))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                  formatter={(value) => `৳${value}`}
                />
                <Legend />
                <Bar
                  dataKey="revenue"
                  fill="#f59e0b"
                  radius={[8, 8, 0, 0]}
                  name="Revenue (৳)"
                />
              </BarChart>
            </ResponsiveContainer>
          )}
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card className="overflow-hidden border-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="w-5 h-5" />
            Quick Actions
          </CardTitle>
          <CardDescription>
            Manage your platform efficiently
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
    </div>
  );
}

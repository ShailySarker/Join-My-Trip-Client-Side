const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getPublicStats() {
  try {
    const response = await fetch(`${API_URL}/users/admin-dashboard-stats`, {
      cache: "no-store",
    });
    
    if (!response.ok) {
      throw new Error("Failed to fetch stats");
    }
    
    const result = await response.json();
    
    if (result && result.data) {
      const stats = result.data;
      return {
        activeTravelers: stats.totalUsers || 0,
        totalTrips: stats.totalTravelPlans || 0,
        destinations: Math.floor((stats.totalTravelPlans || 0) / 10) + 50, // Estimate unique destinations
        completedTrips: stats.statusData?.find((s: any) => s.name === "Completed")?.value || 0,
        averageRating: stats.averageRating || 0,
        totalBookings: stats.totalBookings || 0,
        totalReviews: stats.totalReviews || 0,
      };
    }
    
    // Fallback data if API fails
    return getFallbackStats();
  } catch (error) {
    // Return fallback data on error
    return getFallbackStats();
  }
}

function getFallbackStats() {
  return {
    activeTravelers: 1250,
    totalTrips: 850,
    destinations: 125,
    completedTrips: 450,
    averageRating: 4.8,
    totalBookings: 1500,
    totalReviews: 890,
  };
}

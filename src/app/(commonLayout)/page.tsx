import HeroSection from "@/components/modules/home/HeroSection";
import TopDestinations from "@/components/modules/home/TopDestinations";
import HowItWorks from "@/components/modules/home/HowItWorks";
import Testimonials from "@/components/modules/home/Testimonials";
import TravelBuddiesCTA from "@/components/modules/home/TravelBuddiesCTA";
import TravelCategories from "@/components/modules/home/TravelCategories";
import WhyChooseUs from "@/components/modules/home/WhyChooseUs";
import TopRatedTravelers from "@/components/modules/home/TopRatedTravelers";
import TrustIndicators from "@/components/modules/home/TrustIndicators";
import RecommendedMatches from "@/components/modules/home/RecommendedMatches";
import NewsletterSection from "@/components/modules/home/NewsletterSection";
import FAQSection from "@/components/modules/home/FAQSection";
import FeaturesSection from "@/components/modules/home/FeaturesSection";
import SuccessStories from "@/components/modules/home/SuccessStories";
import SafetySection from "@/components/modules/home/SafetySection";
import CommunitySection from "@/components/modules/home/CommunitySection";
import MobileAppSection from "@/components/modules/home/MobileAppSection";
import LatestTravelPlans from "@/components/modules/home/LatestTravelPlans";
import PopularDestinationsGrid from "@/components/modules/home/PopularDestinationsGrid";
import { Metadata } from "next";
import { getAllReviews } from "@/services/reviews/reviews.service";
import { getUserInfo } from "@/services/auth/getUserInfo";
import {
  getAllTravelPlansPublic,
  getPopularDestinations,
} from "@/services/travelPlans/travelPlans.service";
import { getAllUsers } from "@/services/user/userService";
import { getPublicStats } from "@/services/stats/publicStats.service";

export const metadata: Metadata = {
  title: "Join My Trip - Find Travel Buddies",
  description:
    "Connect with travelers, plan trips, and explore the world together.",
};

export default async function HomePage() {
  const userInfo = await getUserInfo();

  // Fetch all data in parallel for better performance
  const [
    reviewsData,
    travelPlansData,
    usersData,
    latestPlansData,
    stats,
    popularDestinationsData,
  ] = await Promise.all([
    getAllReviews({
      limit: 3,
      sortBy: "rating",
      sortOrder: "desc",
    }),
    getAllTravelPlansPublic({ limit: "4" }),
    getAllUsers({
      limit: "4",
      sortBy: "averageRating",
      sortOrder: "desc",
    }).catch(() => ({ data: [] })),
    getAllTravelPlansPublic({
      limit: "6",
      sortBy: "createdAt",
      sortOrder: "desc",
    }),
    getPublicStats(),
    getPopularDestinations(),
  ]);

  const reviews = reviewsData?.data || [];
  const travelPlans = travelPlansData?.data || [];
  const topTravelers = usersData?.data || [];
  const latestPlans = latestPlansData?.data || [];
  const popularDestinations = popularDestinationsData?.data || [];

  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Hero Section with REAL Stats */}
      <HeroSection userInfo={userInfo} stats={stats} />
      {/* 6. Travel Categories */}
      <TravelCategories />

      {/* 9. How It Works */}
      <HowItWorks />
      {/* Main Content Container */}
      {/* <div className="xl:px-24 lg:px-20 md:px-12 px-6"> */}

      {/* 3. Popular Destinations Grid - NEW */}
      <PopularDestinationsGrid
        popularDestinations={popularDestinations}
        userInfo={userInfo}
        stats={stats}
      />

      {/* 4. Top Destinations */}
      <TopDestinations travelPlan={travelPlans} userInfo={userInfo} />

      {/* 5. Latest Travel Plans - NEW */}
      <LatestTravelPlans travelPlans={latestPlans} />

      {/* 7. Success Stories */}
      <SuccessStories reviews={reviews} />

      {/* 10. Safety & Security Section */}
      <SafetySection />

      {/* 2. Features Section */}
      <FeaturesSection />
      {/* 11. Top-Rated Travelers */}
      <TopRatedTravelers travelers={topTravelers} />

      {/* 13. Trust Indicators */}
      <TrustIndicators />
      {/* 12. Community Section */}
      <CommunitySection stats={stats} topTravelers={topTravelers} />

      {/* 8. Why Choose Us */}
      <WhyChooseUs />
      {/* 14. Recommended Matches / Find Travel Buddy */}
      <RecommendedMatches stats={stats} />

      {/* 15. Featured Trip Section (formerly Mobile App) */}
      <MobileAppSection featuredTrip={latestPlans[0]} />

      {/* 16. CTA Section */}
      <TravelBuddiesCTA />

      {/* 17. Testimonials */}
      <Testimonials reviews={reviews} />

      {/* 18. FAQ Section */}
      <FAQSection />
      {/* 19. Newsletter Section */}
      <NewsletterSection />
      {/* </div> */}
    </div>
  );
}

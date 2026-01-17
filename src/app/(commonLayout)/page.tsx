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
import { Metadata } from "next";
import { getAllReviews } from "@/services/reviews/reviews.service";
import { getUserInfo } from "@/services/auth/getUserInfo";
import { getAllTravelPlansPublic } from "@/services/travelPlans/travelPlans.service";
import { getAllUsers } from "@/services/user/userService";

export const metadata: Metadata = {
  title: "Join My Trip - Find Travel Buddies",
  description:
    "Connect with travelers, plan trips, and explore the world together.",
};

export default async function HomePage() {
  const userInfo = await getUserInfo();

  // Fetch all data in parallel for better performance
  const [reviewsData, travelPlansData, usersData] = await Promise.all([
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
  ]);

  const reviews = reviewsData?.data || [];
  const travelPlans = travelPlansData?.data || [];
  const topTravelers = usersData?.data || [];

  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Hero Section with CTA */}
      <HeroSection userInfo={userInfo} />
      {/* xl:px-24 lg:px-20 md:px-12 px-6 xl:pt-7 lg:pt-5 md:pt-4 pt-3 xl:pb-20 lg:pb-16 md:pb-14 pb-13 */}
      <div className="xl:px-24 lg:px-20 md:px-12 px-6 xl:pb-20 lg:pb-16 md:pb-14 pb-13">
        {/* 2. Popular Destinations */}
        <TopDestinations travelPlan={travelPlans} userInfo={userInfo} />

        {/* 3. Travel Categories */}
        <TravelCategories />

        {/* 4. Why Choose Us */}
        <WhyChooseUs />

        {/* 5. How It Works */}
        <HowItWorks />

        {/* 6. Top-Rated Travelers */}
        <TopRatedTravelers travelers={topTravelers} />

        {/* 7. Trust Indicators */}
        <TrustIndicators />

        {/* 8. Recommended Matches / Find Travel Buddy */}
        <RecommendedMatches />

        {/* 9. CTA Section */}
        <TravelBuddiesCTA />

        {/* 10. Testimonials */}
        <Testimonials reviews={reviews} />

        {/* 11. FAQ Section */}
        <FAQSection />

        {/* 12. Newsletter Section */}
        <NewsletterSection />
      </div>
    </div>
  );
}

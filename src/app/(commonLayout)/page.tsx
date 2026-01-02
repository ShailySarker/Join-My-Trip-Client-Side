import HeroSection from "@/components/modules/home/HeroSection";
import TopDestinations from "@/components/modules/home/TopDestinations";
import HowItWorks from "@/components/modules/home/HowItWorks";
import Testimonials from "@/components/modules/home/Testimonials";
import TravelBuddiesCTA from "@/components/modules/home/TravelBuddiesCTA";
import TravelCategories from "@/components/modules/home/TravelCategories";
import { Metadata } from "next";
import { getAllReviews } from "@/services/reviews/reviews.service";

export const metadata: Metadata = {
  title: "Join My Trip - Find Travel Buddies",
  description:
    "Connect with travelers, plan trips, and explore the world together.",
};

export default async function HomePage() {
  const reviewsData = await getAllReviews({ limit: 3, sortBy: "rating", sortOrder: "desc" });
  const reviews = reviewsData?.data || [];
  
  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection />
      
      {/* Popular Destinations */}
      <TopDestinations />
      
      {/* Categories */}
      <TravelCategories />
      
      {/* How It Works */}
      <HowItWorks />
      
      {/* CTA Section */}
      <TravelBuddiesCTA />
      
      {/* Testimonials */}
      <Testimonials reviews={reviews} />
    </div>
  );
}

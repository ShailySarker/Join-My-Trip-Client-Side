"use client";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Calendar, Compass, MapPin, Search, Sparkles } from "lucide-react";
import Link from "next/link";
import { IUser } from "@/types/user.interface";

const Banner = ({ userInfo }: { userInfo: IUser }) => {
  return (
    <section className="relative overflow-hidden bg-linear-to-br from-blue-600 via-purple-600 to-pink-600 py-24">
      <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-10"></div>
      <div className="container relative mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center"
        >
          <Badge className="mb-6 px-4 py-2 bg-white/20 backdrop-blur-sm text-white border-0">
            <Sparkles className="w-4 h-4 mr-2" />
            Join 50,000+ Happy Travelers
          </Badge>

          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            Find Your Perfect
            <span className="block bg-linear-to-r from-yellow-300 to-pink-300 bg-clip-text text-transparent">
              Travel Buddy
            </span>
          </h1>

          <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
            Connect with like-minded travelers worldwide. Share adventures,
            split costs, and create unforgettable memories together. Your next
            great journey starts here.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link href={userInfo ? "/my-travel-plans/create" : "/register"}>
              <Button
                size="lg"
                className="gap-3 bg-white text-blue-600 hover:bg-blue-50 text-lg px-8"
              >
                <Compass className="w-6 h-6" />
                Start Your Journey
              </Button>
            </Link>
            <Link href="/explore-travel-plans">
              <Button
                size="lg"
                variant="outline"
                className="gap-3 border-white text-white hover:bg-white/10 text-lg px-8"
              >
                <Search className="w-6 h-6" />
                Explore Travel Plans
              </Button>
            </Link>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto bg-white rounded-2xl p-2 shadow-2xl">
            <div className="flex flex-col md:flex-row gap-2">
              <div className="flex-1">
                <div className="flex items-center px-4">
                  <MapPin className="w-5 h-5 text-gray-400 mr-2" />
                  <Input
                    placeholder="Where do you want to go?"
                    className="border-0 focus-visible:ring-0 text-lg"
                  />
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-center px-4">
                  <Calendar className="w-5 h-5 text-gray-400 mr-2" />
                  <Input
                    type="date"
                    className="border-0 focus-visible:ring-0 text-lg"
                  />
                </div>
              </div>
              <Button className="bg-linear-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 px-8">
                <Search className="w-5 h-5 mr-2" />
                Search
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Banner;

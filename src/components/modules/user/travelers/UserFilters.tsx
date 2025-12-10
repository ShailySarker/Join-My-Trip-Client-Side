"use client";

import { useState, useTransition } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Filter, X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { IUserGender } from "@/types/user.interface";
import { ITrevelInterest } from "@/types/travelPlan.interface";

export default function UserFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const [search, setSearchTerm] = useState(searchParams.get("search") || "");
  const [gender, setGender] = useState(searchParams.get("gender") || "");
  const [isVerified, setIsVerified] = useState(
    searchParams.get("isVerified") || ""
  );
  const [travelInterest, setTravelInterest] = useState(
    searchParams.get("travelInterests") || ""
  );
  const [sortBy, setSortBy] = useState(searchParams.get("sortBy") || "");
  const [sort, setSort] = useState(searchParams.get("sort") || "desc");

  const handleApplyFilters = () => {
    const params = new URLSearchParams();

    if (search) params.set("search", search);
    if (gender) params.set("gender", gender);
    if (isVerified) params.set("isVerified", isVerified);
    if (travelInterest) params.set("travelInterests", travelInterest);
    if (sortBy) {
      params.set("sortBy", sortBy);
      params.set("sort", sort);
    }

    startTransition(() => {
      router.push(`?${params.toString()}`);
    });
  };

  const handleClearFilters = () => {
    setSearchTerm("");
    setGender("");
    setIsVerified("");
    setTravelInterest("");
    setSortBy("");
    setSort("desc");

    startTransition(() => {
      // Navigate to the current path without any query params
      router.push(window.location.pathname);
      // Force a router refresh to update the URL
      router.refresh();
    });
  };

  const hasActiveFilters =
    search || gender || isVerified || travelInterest || sortBy;

  return (
    <div className="bg-card border rounded-lg p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <Filter className="w-5 h-5" />
          Filters
        </h3>
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClearFilters}
            disabled={isPending}
          >
            <X className="w-4 h-4 mr-2" />
            Clear All
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Search */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Search</label>
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Name, email, location..."
              value={search}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleApplyFilters();
                }
              }}
            />
          </div>
        </div>

        {/* Gender Filter */}
        <div className="space-y-2 ">
          <label className="text-sm font-medium">Gender</label>
          <Select
            value={gender || undefined}
            onValueChange={(val) => setGender(val)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="All Genders" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={IUserGender.MALE}>Male</SelectItem>
              <SelectItem value={IUserGender.FEMALE}>Female</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Verified Filter */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Verification Status</label>
          <Select
            value={isVerified || undefined}
            onValueChange={(val) => setIsVerified(val)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="All Users" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="true">Verified Only</SelectItem>
              <SelectItem value="false">Unverified Only</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Travel Interest Filter */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Travel Interest</label>
          <Select
            value={travelInterest || undefined}
            onValueChange={(val) => setTravelInterest(val)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="All Interests" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={ITrevelInterest.ADVENTURE}>
                Adventure
              </SelectItem>
              <SelectItem value={ITrevelInterest.BEACH}>Beach</SelectItem>
              <SelectItem value={ITrevelInterest.CAMPING}>Camping</SelectItem>
              <SelectItem value={ITrevelInterest.CITY_EXPLORATION}>
                City Exploration
              </SelectItem>
              <SelectItem value={ITrevelInterest.CULTURAL}>Cultural</SelectItem>
              <SelectItem value={ITrevelInterest.FOOD_FESTIVAL}>
                Food Festival
              </SelectItem>
              <SelectItem value={ITrevelInterest.HIKING}>Hiking</SelectItem>
              <SelectItem value={ITrevelInterest.HISTORICAL}>
                Historical
              </SelectItem>
              <SelectItem value={ITrevelInterest.INTERNATIONAL}>
                International
              </SelectItem>
              <SelectItem value={ITrevelInterest.LUXURY_TRAVEL}>
                Luxury Travel
              </SelectItem>
              <SelectItem value={ITrevelInterest.NATURE}>Nature</SelectItem>
              <SelectItem value={ITrevelInterest.NIGHTLIFE_EXPLORATION}>
                Nightlife
              </SelectItem>
              <SelectItem value={ITrevelInterest.PHOTOGRAPHY}>
                Photography
              </SelectItem>
              <SelectItem value={ITrevelInterest.RELAXATION}>
                Relaxation
              </SelectItem>
              <SelectItem value={ITrevelInterest.ROAD_TRIPS}>
                Road Trips
              </SelectItem>
              <SelectItem value={ITrevelInterest.SHOPPING}>Shopping</SelectItem>
              <SelectItem value={ITrevelInterest.VILLAGE_LIFE}>
                Village Life
              </SelectItem>
              <SelectItem value={ITrevelInterest.WILDLIFE}>Wildlife</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Sort By */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Sort By</label>
          <Select
            value={sortBy || undefined}
            onValueChange={(val) => setSortBy(val)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Default" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="fullname">Name</SelectItem>
              <SelectItem value="averageRating">Rating</SelectItem>
              <SelectItem value="reviewCount">Reviews</SelectItem>
              <SelectItem value="createdAt">Join Date</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Sort Order */}
        {sortBy && (
          <div className="space-y-2">
            <label className="text-sm font-medium">Sort Order</label>
            <Select value={sort} onValueChange={setSort}>
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="asc">Ascending</SelectItem>
                <SelectItem value="desc">Descending</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}
      </div>

      {/* Apply Button */}
      <div className="flex justify-end">
        <Button
          onClick={handleApplyFilters}
          disabled={isPending}
          className="min-w-32"
        >
          <Search className="w-4 h-4 mr-2" />
          {isPending ? "Applying..." : "Apply Filters"}
        </Button>
      </div>
    </div>
  );
}

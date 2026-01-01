"use client";

import { useEffect, useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Filter, X, Search as SearchIcon } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { IUserGender } from "@/types/user.interface";
import { ITrevelInterest } from "@/types/travelPlan.interface";
import SearchFilter from "../../travelPlans/filters/SearchFilter";
import SelectFilter from "../../travelPlans/filters/SelectFilter";
import SortFilter from "../../travelPlans/filters/SortFilter";

export default function UserFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  // State initialization
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [gender, setGender] = useState(searchParams.get("gender") || "");
  const [isVerified, setIsVerified] = useState(
    searchParams.get("isVerified") || ""
  );
  const [travelInterest, setTravelInterest] = useState(
    searchParams.get("travelInterests") || ""
  );
  const [sortBy, setSortBy] = useState(searchParams.get("sortBy") || "");
  const [sortOrder, setSortOrder] = useState(
    searchParams.get("sortOrder") || "desc"
  );

  // Sync state with URL params
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSearch(searchParams.get("search") || "");
    setGender(searchParams.get("gender") || "");
    setIsVerified(searchParams.get("isVerified") || "");
    setTravelInterest(searchParams.get("travelInterests") || "");
    setSortBy(searchParams.get("sortBy") || "");
    setSortOrder(searchParams.get("sortOrder") || "desc");
  }, [searchParams]);

  const handleApplyFilters = () => {
    const params = new URLSearchParams();

    if (search) params.set("search", search);
    if (gender && gender !== "_all") params.set("gender", gender);
    if (isVerified && isVerified !== "_all")
      params.set("isVerified", isVerified);
    if (travelInterest && travelInterest !== "_all")
      params.set("travelInterests", travelInterest);

    if (sortBy && sortBy !== "_all") {
      params.set("sortBy", sortBy);
      params.set("sortOrder", sortOrder);
      // Backend expects sort="-field" for desc, "field" for asc
      // params.set("sortOrder", sortOrder === "desc" ? `-${sortBy}` : sortBy);
    }

    // Always reset to page 1 on filter application
    params.set("page", "1");

    startTransition(() => {
      router.push(`?${params.toString()}`);
    });
  };

  const handleClearFilters = () => {
    setSearch("");
    setGender("");
    setIsVerified("");
    setTravelInterest("");
    setSortBy("");
    setSortOrder("desc");

    startTransition(() => {
      router.push(window.location.pathname);
      router.refresh();
    });
  };

  const hasActiveFilters =
    search || gender || isVerified || travelInterest || sortBy;

  const genderOptions = [
    { value: "_all", label: "All Genders" },
    { value: IUserGender.MALE, label: "Male" },
    { value: IUserGender.FEMALE, label: "Female" },
  ];

  const verifiedOptions = [
    { value: "_all", label: "All Users" },
    { value: "true", label: "Verified Only" },
    { value: "false", label: "Unverified Only" },
  ];

  const interestOptions = [
    { value: "_all", label: "All Interests" },
    ...Object.values(ITrevelInterest).map((i) => ({
      value: i,
      label: i.replace(/_/g, " "),
    })),
  ];

  const sortOptions = [
    { value: "fullname", label: "Name" },
    { value: "averageRating", label: "Rating" },
    { value: "reviewCount", label: "Reviews" },
    { value: "createdAt", label: "Join Date" },
  ];

  return (
    <div className="bg-card border rounded-lg xl:p-6 lg:p-5 p-4 space-y-4">
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
        <SearchFilter
          value={search}
          onChange={setSearch}
          onEnter={handleApplyFilters}
          placeholder="Name, email, location..."
        />

        <SelectFilter
          label="Gender"
          value={gender}
          options={genderOptions}
          onChange={setGender}
          placeholder="All Genders"
        />

        <SelectFilter
          label="Verification Status"
          value={isVerified}
          options={verifiedOptions}
          onChange={setIsVerified}
          placeholder="All Users"
        />

        <SelectFilter
          label="Travel Interest"
          value={travelInterest}
          options={interestOptions}
          onChange={setTravelInterest}
          placeholder="All Interests"
        />

        <SortFilter
          sortBy={sortBy}
          sortOrder={sortOrder}
          onSortByChange={setSortBy}
          onSortOrderChange={setSortOrder}
          sortOptions={sortOptions}
        />
      </div>

      <div className="flex justify-end pt-2">
        <Button
          onClick={handleApplyFilters}
          disabled={isPending}
          className="min-w-32"
        >
          <SearchIcon className="w-4 h-4 mr-2" />
          {isPending ? "Applying..." : "Apply Filters"}
        </Button>
      </div>
    </div>
  );
}

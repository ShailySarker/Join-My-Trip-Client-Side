"use client";

import { useEffect, useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Filter, X, Search as SearchIcon } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import SearchFilter from "./SearchFilter";
import RangeFilters from "./RangeFilters";
import SortFilter from "./SortFilter";
import SelectFilter from "./SelectFilter";
import { ITravelType, ITrevelInterest } from "@/types/travelPlan.interface";

interface ExploreTravelPlanFiltersProps {
  showStatusFilter?: boolean;
}

export default function ExploreTravelPlanFilters({}: ExploreTravelPlanFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  // State initialization
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [minBudget, setMinBudget] = useState(
    searchParams.get("minBudget") || ""
  );
  const [maxBudget, setMaxBudget] = useState(
    searchParams.get("maxBudget") || ""
  );
  const [startDate, setStartDate] = useState(
    searchParams.get("startDate") || ""
  );
  const [endDate, setEndDate] = useState(searchParams.get("endDate") || "");
  const [travelType, setTravelType] = useState(
    searchParams.get("travelType") || ""
  );
  const [interests, setInterests] = useState(
    searchParams.get("interests") || ""
  );
  const [sortBy, setSortBy] = useState(searchParams.get("sortBy") || "");
  const [sortOrder, setSortOrder] = useState(
    searchParams.get("sortOrder") || "desc"
  );
  // const [sort, setSort] = useState(searchParams.get("sort") || "desc");

  // Sync state with URL params
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSearch(searchParams.get("search") || "");
    setMinBudget(searchParams.get("minBudget") || "");
    setMaxBudget(searchParams.get("maxBudget") || "");
    setStartDate(searchParams.get("startDate") || "");
    setEndDate(searchParams.get("endDate") || "");
    setTravelType(searchParams.get("travelType") || "");
    setInterests(searchParams.get("interests") || "");
    setSortBy(searchParams.get("sortBy") || "");
    // setSort(searchParams.get("sortOrder") || "desc");
    setSortOrder(searchParams.get("sortOrder") || "desc");
  }, [searchParams]);

  const handleApplyFilters = () => {
    const params = new URLSearchParams();

    if (search) params.set("search", search);
    if (minBudget) params.set("minBudget", minBudget);
    if (maxBudget) params.set("maxBudget", maxBudget);
    if (startDate) params.set("startDate", startDate);
    if (endDate) params.set("endDate", endDate);
    if (travelType && travelType !== "_all")
      params.set("travelType", travelType);
    if (interests && interests !== "_all") params.set("interests", interests);
    if (sortBy && sortBy !== "_all") {
      params.set("sortBy", sortBy);
      params.set("sortOrder", sortOrder);
    }

    // Always reset to page 1 on filter application
    params.set("page", "1");

    startTransition(() => {
      router.push(`?${params.toString()}`);
    });
  };

  const handleClearFilters = () => {
    setSearch("");
    setMinBudget("");
    setMaxBudget("");
    setStartDate("");
    setEndDate("");
    setTravelType("");
    setInterests("");
    setSortBy("");
    setSortOrder("desc");
    // setSort("desc");

    startTransition(() => {
      router.push(window.location.pathname);
      router.refresh();
    });
  };

  const hasActiveFilters =
    search ||
    minBudget ||
    maxBudget ||
    startDate ||
    endDate ||
    travelType ||
    interests ||
    sortBy;

  const travelTypeOptions = [
    { value: "_all", label: "All Types" },
    ...Object.values(ITravelType).map((t) => ({
      value: t,
      label: t,
    })),
  ];
  const interestOptions = [
    { value: "_all", label: "All Interests" },
    ...Object.values(ITrevelInterest).map((i) => ({
      value: i,
      label: i.replace(/_/g, " "),
    })),
  ];

  const sortOptions = [
    { value: "budget", label: "Budget" },
    { value: "startDate", label: "Start Date" },
    { value: "createdAt", label: "Created Date" },
  ];
  // console.log(statusOptions);
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4">
        <SearchFilter
          value={search}
          onChange={setSearch}
          onEnter={handleApplyFilters}
        />

        <SelectFilter
          label="Travel Type"
          value={travelType}
          options={travelTypeOptions}
          onChange={setTravelType}
          placeholder="All Types"
        />

        <SelectFilter
          label="Interest"
          value={interests}
          options={interestOptions}
          onChange={setInterests}
          placeholder="All Interests"
        />

        <RangeFilters
          minBudget={minBudget}
          maxBudget={maxBudget}
          startDate={startDate}
          endDate={endDate}
          onMinBudgetChange={setMinBudget}
          onMaxBudgetChange={setMaxBudget}
          onStartDateChange={setStartDate}
          onEndDateChange={setEndDate}
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

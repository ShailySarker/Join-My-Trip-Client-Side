"use client";

import { useEffect, useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Filter, X, Search as SearchIcon } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import SearchFilter from "@/components/modules/travelPlans/filters/SearchFilter";
import SelectFilter from "@/components/modules/travelPlans/filters/SelectFilter";
import SortFilter from "@/components/modules/travelPlans/filters/SortFilter";
import { IBookingStatus } from "@/types/booking.interface";

export default function BookingFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  // State initialization
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [bookingStatus, setBookingStatus] = useState(
    searchParams.get("bookingStatus") || ""
  );
  const [sortBy, setSortBy] = useState(searchParams.get("sortBy") || "");
  const [sortOrder, setSortOrder] = useState(
    searchParams.get("sortOrder") || "desc"
  );

  // Sync state with URL params
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSearch(searchParams.get("search") || "");
    setBookingStatus(searchParams.get("bookingStatus") || "");
    setSortBy(searchParams.get("sortBy") || "");
    setSortOrder(searchParams.get("sortOrder") || "desc");
  }, [searchParams]);

  const handleApplyFilters = () => {
    const params = new URLSearchParams();

    if (search) params.set("search", search);
    if (bookingStatus && bookingStatus !== "_all")
      params.set("bookingStatus", bookingStatus);

    if (sortBy && sortBy !== "_all") {
      params.set("sortBy", sortBy);
      params.set("sortOrder", sortOrder);
      // params.set("sortOrder", sortOrder === "desc" ? `-${sortBy}` : sortBy);
    }

    // Reset to page 1
    params.set("page", "1");

    startTransition(() => {
      router.push(`?${params.toString()}`);
    });
  };

  const handleClearFilters = () => {
    setSearch("");
    setBookingStatus("");
    setSortBy("");
    setSortOrder("desc");

    startTransition(() => {
      router.push(window.location.pathname);
      router.refresh();
    });
  };

  const hasActiveFilters = search || bookingStatus || sortBy;

  const statusOptions = [
    { value: "_all", label: "All Statuses" },
    ...Object.values(IBookingStatus).map((s) => ({
      value: s,
      label: s,
    })),
  ];

  const sortOptions = [
    { value: "amount", label: "Amount" },
    { value: "createdAt", label: "Booking Date" },
    { value: "totalPeople", label: "Participants" },
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
          placeholder="Search by travel plan, destination..."
        />

        <SelectFilter
          label="Status"
          value={bookingStatus}
          options={statusOptions}
          onChange={setBookingStatus}
          placeholder="All Statuses"
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

/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useEffect, useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Filter, X, Search as SearchIcon } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import SearchFilter from "@/components/modules/travelPlans/filters/SearchFilter";
import SelectFilter from "@/components/modules/travelPlans/filters/SelectFilter";
import SortFilter from "@/components/modules/travelPlans/filters/SortFilter";

export default function ContactFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  // State initialization
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [status, setStatus] = useState(searchParams.get("status") || "");
  const [sortBy, setSortBy] = useState(searchParams.get("sortBy") || "");
  const [sortOrder, setSortOrder] = useState(
    searchParams.get("sortOrder") || "desc"
  );

  // Sync state with URL params
  useEffect(() => {
    setSearch(searchParams.get("search") || "");
    setStatus(searchParams.get("status") || "");
    setSortBy(searchParams.get("sortBy") || "");
    setSortOrder(searchParams.get("sortOrder") || "desc");
  }, [searchParams]);

  const handleApplyFilters = () => {
    const params = new URLSearchParams();

    // Use 'search' as backend QueryBuilder expects 'search'
    if (search) params.set("search", search);
    if (status && status !== "_all") params.set("status", status);

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
    setStatus("");
    setSortBy("");
    setSortOrder("desc");

    startTransition(() => {
      router.push(window.location.pathname);
      router.refresh();
    });
  };

  const hasActiveFilters = search || status || sortBy;
  // search || status || sortBy !== "createdAt" || sortOrder !== "desc";

  const statusOptions = [
    { value: "_all", label: "All Statuses" },
    { value: "PENDING", label: "Pending" },
    { value: "IN_PROGRESS", label: "In Progress" },
    { value: "RESOLVED", label: "Resolved" },
  ];

  const sortOptions = [
    { value: "name", label: "User Name" },
    { value: "email", label: "User Email" },
    { value: "subject", label: "Query Subject" },
    { value: "createdAt", label: "Date Created" },
  ];

  return (
    <div className="bg-card border rounded-lg p-4 space-y-4 mb-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <Filter className="w-5 h-5" />
          Filter Messages
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
          placeholder="Search by name, email, or subject..."
        />

        <SelectFilter
          label="Status"
          value={status}
          options={statusOptions}
          onChange={setStatus}
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

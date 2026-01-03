/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useCallback, useState, useEffect } from "react";
import SearchFilter from "@/components/modules/travelPlans/filters/SearchFilter";
import SelectFilter from "@/components/modules/travelPlans/filters/SelectFilter";
import SortFilter from "@/components/modules/travelPlans/filters/SortFilter";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

export default function ReviewFilter() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Local state to hold filter values before applying
  const [filters, setFilters] = useState({
    search: searchParams.get("search") || "",
    rating: searchParams.get("rating") || "",
    sortBy: searchParams.get("sortBy") || "",
    sortOrder: searchParams.get("sortOrder") || "",
  });

  // Update local state when searchParams change (e.g. on navigation or reset)
  // This ensures if the user navigates back, the filters allow editing from that state.
  // However, we only want to sync if we are not in the middle of editing?
  // Actually, standard pattern: sync on mount or when searchParams change externally.
  const [isDirty, setIsDirty] = useState(false);

  // When searchParams change, we should update our local state IF we haven't modified it yet?
  // Or force update? Let's force update effectively resetting 'edit mode' if URL changes.
  useEffect(() => {
    setFilters({
      search: searchParams.get("search") || "",
      rating: searchParams.get("rating") || "",
      sortBy: searchParams.get("sortBy") || "",
      sortOrder: searchParams.get("sortOrder") || "",
    });
    setIsDirty(false);
  }, [searchParams]);

  const createQueryString = useCallback(
    (newParams: Record<string, string>) => {
      const params = new URLSearchParams(searchParams.toString());

      Object.entries(newParams).forEach(([key, value]) => {
        if (value && value !== "_all") {
          params.set(key, value);
        } else {
          params.delete(key);
        }
      });

      // Reset page to 1 when filtering
      params.delete("page");

      return params.toString();
    },
    [searchParams]
  );

  const handleFilterChange = (name: string, value: string) => {
    setFilters((prev) => ({ ...prev, [name]: value }));
    setIsDirty(true);
  };

  const handleApply = () => {
    router.push(pathname + "?" + createQueryString(filters));
    setIsDirty(false);
  };

  const handleCancel = () => {
    // Revert to searchParams
    setFilters({
      search: searchParams.get("search") || "",
      rating: searchParams.get("rating") || "",
      sortBy: searchParams.get("sortBy") || "",
      sortOrder: searchParams.get("sortOrder") || "",
    });
    setIsDirty(false);
  };

  const handleClear = () => {
    const emptyFilters = {
      search: "",
      rating: "",
      sortBy: "",
      sortOrder: "",
    };
    setFilters(emptyFilters);
    // If we want "Cancel" to revert to URL, then clearing is an unapplied change?
    // Or should clear immediately apply?
    // Usually "Clear All" applies immediately or clears local state.
    // Let's clear local state and mark dirty.
    setIsDirty(true);

    // Alternatively, clear immediately:
    router.push(pathname);
  };

  return (
    <div className="bg-card border rounded-lg p-4 space-y-4 shadow-sm mb-6">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-lg">Filters</h3>
        {searchParams.toString().length > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClear}
            className="text-muted-foreground hover:text-primary"
          >
            <X className="w-4 h-4 mr-1" /> Clear All
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <SearchFilter
          value={filters.search}
          onChange={(val) => handleFilterChange("search", val)}
          placeholder="Search reviews..."
        />

        <SelectFilter
          label="Rating"
          value={filters.rating}
          onChange={(val) => handleFilterChange("rating", val)}
          options={[
            { value: "5", label: "5 Stars" },
            { value: "4", label: "4 Stars" },
            { value: "3", label: "3 Stars" },
            { value: "2", label: "2 Stars" },
            { value: "1", label: "1 Star" },
          ]}
        />

        <SortFilter
          sortBy={filters.sortBy}
          sortOrder={filters.sortOrder}
          onSortByChange={(val) => handleFilterChange("sortBy", val)}
          onSortOrderChange={(val) => handleFilterChange("sortOrder", val)}
          sortOptions={[
            { value: "createdAt", label: "Date" },
            { value: "rating", label: "Rating" },
          ]}
        />
      </div>

      <div className="flex justify-end gap-2 mt-4 pt-4 border-t">
        <Button variant="outline" onClick={handleCancel} disabled={!isDirty}>
          Cancel
        </Button>
        <Button onClick={handleApply} disabled={!isDirty}>
          Apply Filters
        </Button>
      </div>
    </div>
  );
}

"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

interface SortOption {
  value: string;
  label: string;
}

interface SortFilterProps {
  sortBy: string;
  sortOrder: string;
  onSortByChange: (val: string) => void;
  onSortOrderChange: (val: string) => void;
  sortOptions?: SortOption[];
}

export default function SortFilter({
  sortBy,
  sortOrder,
  onSortByChange,
  onSortOrderChange,
  sortOptions = [],
}: // sortOptions = [
//   { value: "budget", label: "Budget" },
//   { value: "startDate", label: "Start Date" },
//   { value: "createdAt", label: "Created Date" },
// ],
SortFilterProps) {
  return (
    <>
      <div className="space-y-2">
        <Label className="text-sm font-medium">Sort By</Label>
        <Select value={sortBy ?? ""} onValueChange={onSortByChange}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Default" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="_all">Default</SelectItem>
            {sortOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {sortBy && (
        <div className="space-y-2">
          <Label className="text-sm font-medium">Sort Order</Label>
          <Select value={sortOrder} onValueChange={onSortOrderChange}>
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="asc">Ascending (Low to High)</SelectItem>
              <SelectItem value="desc">Descending (High to Low)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      )}
    </>
  );
}

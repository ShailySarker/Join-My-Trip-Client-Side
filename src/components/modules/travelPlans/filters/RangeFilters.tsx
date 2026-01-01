"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface RangeFiltersProps {
  minBudget: string;
  maxBudget: string;
  startDate: string;
  endDate: string;
  onMinBudgetChange: (val: string) => void;
  onMaxBudgetChange: (val: string) => void;
  onStartDateChange: (val: string) => void;
  onEndDateChange: (val: string) => void;
}

export default function RangeFilters({
  minBudget,
  maxBudget,
  startDate,
  endDate,
  onMinBudgetChange,
  onMaxBudgetChange,
  onStartDateChange,
  onEndDateChange,
}: RangeFiltersProps) {
  return (
    <>
      {/* Budget Range */}
      <div className="space-y-2">
        <Label className="text-sm font-medium">Budget Range</Label>
        <div className="flex items-center gap-2">
          <Input
            type="number"
            placeholder="Min"
            value={minBudget}
            onChange={(e) => onMinBudgetChange(e.target.value)}
            className="w-full"
            min={0}
          />
          <span className="text-muted-foreground">-</span>
          <Input
            type="number"
            placeholder="Max"
            value={maxBudget}
            onChange={(e) => onMaxBudgetChange(e.target.value)}
            className="w-full"
            min={0}
          />
        </div>
      </div>

      {/* Date Range */}
      <div className="space-y-2">
        <Label className="text-sm font-medium">Date Range</Label>
        <div className="flex items-center gap-2">
          <div className="space-y-1 w-[47%]">
            {/* <span className="text-xs text-muted-foreground">Start</span> */}
            <Input
              type="date"
              value={startDate}
              // placeholder="Start Date"
              onChange={(e) => onStartDateChange(e.target.value)}
              className="w-full"
            />
          </div>
          <span className="text-muted-foreground w-[6%]">-</span>
          <div className="space-y-1 w-[47%]">
            {/* <span className="text-xs text-muted-foreground">End</span> */}
            <Input
              type="date"
              value={endDate}
              onChange={(e) => onEndDateChange(e.target.value)}
              className="w-full"
            />
          </div>
        </div>
      </div>
    </>
  );
}

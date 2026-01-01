"use client";

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface SearchFilterProps {
  value: string;
  onChange: (value: string) => void;
  onEnter?: () => void;
  placeholder?: string;
}

export default function SearchFilter({
  value,
  onChange,
  onEnter,
  placeholder = "Destination, title, description...",
}: SearchFilterProps) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">Search</label>
      <div className="relative w-full mt-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="pl-9"
          onKeyDown={(e) => {
            if (e.key === "Enter" && onEnter) {
              onEnter();
            }
          }}
        />
      </div>
    </div>
  );
}

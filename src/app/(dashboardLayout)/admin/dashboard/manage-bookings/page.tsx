import { getAllBookings } from "@/services/bookings/bookings.service";
import BookingFilters from "@/components/modules/bookings/filters/BookingFilters";
import BookingsTable from "@/components/modules/bookings/BookingsTable";
import Pagination from "@/components/shared/Pagination";
import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Manage Bookings | Admin Dashboard",
  description: "Manage all travel bookings",
};

interface SearchParams {
  search?: string;
  bookingStatus?: string;
  sortBy?: string;
  sortOrder?: string;
  page?: string;
  limit?: string;
}

export default async function ManageBookingsPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;

  const queryParams: Record<string, string> = {
    page: params.page || "1",
    limit: params.limit || "10",
  };

  if (params.search) queryParams.search = params.search;
  if (params.bookingStatus) queryParams.bookingStatus = params.bookingStatus;
  if (params.sortBy) {
    queryParams.sortBy = params.sortBy;
    queryParams.sortOrder = params.sortOrder || "desc";
  }
  // Default sort
  if (!queryParams.sortBy) queryParams.sortBy = "createdAt";
  if (!queryParams.sortOrder) queryParams.sortOrder = "desc";

  const result = await getAllBookings(queryParams);
  const bookings = result.data || [];
  const meta = result.meta;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="pb-1 xl:text-4xl lg:text-[32px] text-3xl font-bold bg-linear-to-r from-primary to-primary/60 bg-clip-text text-transparent">
          Manage Bookings
        </h1>
        <p className="text-muted-foreground mt-1">
          Monitor and manage all user bookings
        </p>
      </div>

      {/* Filters Section */}
      <div className="mb-8">
        <Suspense
          fallback={<Skeleton className="h-[200px] w-full rounded-lg" />}
        >
          <BookingFilters />
        </Suspense>
      </div>

      {/* Results Count */}
      {meta && (
        <div className="mb-4 text-sm text-muted-foreground">
          Found {meta.total} booking{meta.total !== 1 ? "s" : ""}
        </div>
      )}

      {/* Bookings Table */}
      <Suspense fallback={<Skeleton className="h-[400px] w-full rounded-lg" />}>
        <BookingsTable
          bookings={bookings}
          basePath="/admin/dashboard/manage-bookings"
        />
      </Suspense>

      {/* Pagination */}
      {meta && meta.totalPage > 1 && (
        <div className="mt-8">
          <Pagination
            currentPage={meta.page}
            totalPages={meta.totalPage}
            totalItems={meta.total}
          />
        </div>
      )}
    </div>
  );
}

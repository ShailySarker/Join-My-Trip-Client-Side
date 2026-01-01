import { getMyBookings } from "@/services/bookings/bookings.service";
import BookingFilters from "@/components/modules/bookings/filters/BookingFilters";
import BookingsTable from "@/components/modules/bookings/BookingsTable";
import Pagination from "@/components/shared/Pagination";
import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";

interface SearchParams {
  searchTerm?: string;
  bookingStatus?: string;
  sortBy?: string;
  sortOrder?: string;
  page?: string;
  limit?: string;
}

export default async function MyBookingsPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;

  const queryParams: Record<string, string> = {
    page: params.page || "1",
    limit: params.limit || "10",
  };

  if (params.searchTerm) queryParams.searchTerm = params.searchTerm;
  if (params.bookingStatus) queryParams.bookingStatus = params.bookingStatus;
  if (params.sortBy) {
    queryParams.sortBy = params.sortBy;
    queryParams.sortOrder = params.sortOrder || "desc";
  }

  const result = await getMyBookings(queryParams);
  const bookings = result.data || [];
  const meta = result.meta;

  return (
    <div className="xl:p-4">
      {/* Header */}
      <div className="mb-8">
        <h1 className="xl:text-4xl lg:text-[32px] text-3xl pb-2 font-bold bg-linear-to-r from-primary to-primary/60 bg-clip-text text-transparent">
          My Bookings
        </h1>
        <p className="text-muted-foreground mt-1">
          Manage your travel bookings and reservations
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
          showCancelButton={true}
          basePath={`/dashboard/my-bookings`}
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

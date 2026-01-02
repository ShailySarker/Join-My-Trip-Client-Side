/* eslint-disable @typescript-eslint/no-explicit-any */
import { getAllTravelPlansPublic } from "@/services/travelPlans/travelPlans.service";
import { TravelPlanCard } from "@/components/modules/travelPlans/TravelPlanCard";
import Pagination from "@/components/shared/Pagination";
import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";
import ExploreTravelPlanFilters from "@/components/modules/travelPlans/filters/ExploreTravelPlanFilters";

interface SearchParams {
  search?: string;
  minBudget?: string;
  maxBudget?: string;
  startDate?: string;
  endDate?: string;
  travelType?: string;
  interests?: string;
  sortBy?: string;
  sortOrder?: string;
  page?: string;
  limit?: string;
}

export default async function ExploreTravelPlansPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;

  const queryParams: Record<string, string> = {
    page: params.page || "1",
    limit: params.limit || "12",
    sortBy: params.sortBy || "createdAt",
    sortOrder: params.sortOrder || "desc",
  };

  if (params.search) queryParams.search = params.search;
  if (params.minBudget) queryParams.minBudget = params.minBudget;
  if (params.maxBudget) queryParams.maxBudget = params.maxBudget;
  if (params.startDate) queryParams.startDate = params.startDate;
  if (params.endDate) queryParams.endDate = params.endDate;
  if (params.travelType) queryParams.travelType = params.travelType;
  if (params.interests) queryParams.interests = params.interests;
  if (params.sortBy) {
    queryParams.sortBy = params.sortBy;
    queryParams.sortOrder = params.sortOrder || "desc";
  }

  const result = await getAllTravelPlansPublic(queryParams);
  const travelPlans = result.data || [];
  const meta = result.meta;

  return (
    <div className="xl:p-4">
      {/* Header */}
      <div className="mb-8">
        <h1 className="xl:text-4xl lg:text-[32px] text-3xl font-bold pb-2 bg-linear-to-r from-primary to-primary/60 bg-clip-text text-transparent">
          Explore Travel Plans
        </h1>
        <p className="text-muted-foreground">
          Discover amazing travel adventures and find your perfect trip
        </p>
      </div>

      {/* Filters Section */}
      <div className="mb-8">
        <Suspense
          fallback={<Skeleton className="h-[200px] w-full rounded-lg" />}
        >
          <ExploreTravelPlanFilters />
        </Suspense>
      </div>

      {/* Results Count */}
      {meta && (
        <div className="mb-4 text-sm text-muted-foreground">
          Found {meta.total} travel plan{meta.total !== 1 ? "s" : ""}
        </div>
      )}

      {/* Travel Plans Grid */}
      {travelPlans.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {travelPlans.map((plan: any) => (
            <TravelPlanCard
              key={plan._id}
              travelPlan={plan}
              href={`/dashboard/explore-travel-plans/${plan._id}`}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">🏖️</div>
          <h3 className="text-2xl font-semibold mb-2">No travel plans found</h3>
          <p className="text-muted-foreground mb-4">
            Try adjusting your filters or search terms
          </p>
        </div>
      )}

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

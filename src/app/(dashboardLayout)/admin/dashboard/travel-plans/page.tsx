import { getAllTravelPlansAdmin } from "@/services/travelPlans/travelPlans.service";
import TravelPlanFilters from "@/components/modules/travelPlans/filters/TravelPlanFilters";
import TravelPlanTable from "@/components/modules/travelPlans/TravelPlanTable";
import Pagination from "@/components/shared/Pagination";
import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";
import { Card, CardContent } from "@/components/ui/card";

interface SearchParams {
  search?: string;
  minBudget?: string;
  maxBudget?: string;
  startDate?: string;
  endDate?: string;
  travelType?: string;
  interests?: string;
  sortBy?: string;
  sort?: string;
  page?: string;
  limit?: string;
  isApproved?: string;
}

export default async function AdminTravelPlansPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;

  const queryParams: Record<string, string> = {
    page: params.page || "1",
    limit: params.limit || "12",
  };

  if (params.search) queryParams.search = params.search;
  if (params.minBudget) queryParams.minBudget = params.minBudget;
  if (params.maxBudget) queryParams.maxBudget = params.maxBudget;
  if (params.startDate) queryParams.startDate = params.startDate;
  if (params.endDate) queryParams.endDate = params.endDate;
  if (params.travelType) queryParams.travelType = params.travelType;
  if (params.interests) queryParams.interests = params.interests;
  if (params.isApproved) queryParams.isApproved = params.isApproved;
  if (params.sortBy) {
    queryParams.sortBy = params.sortBy;
    queryParams.sort = params.sort || "desc";
  }

  const result = await getAllTravelPlansAdmin(queryParams);
  // @ts-ignore
  const travelPlans = result.data || [];
  // @ts-ignore
  const meta = result.meta;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="xl:text-4xl lg:text-[32px] text-3xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
          Manage Travel Plans
        </h1>
        <p className="text-muted-foreground mt-1">
          Approve, reject, and manage all travel plans
        </p>
      </div>

      {/* Filters */}
      <div className="mb-8">
        <Suspense
          fallback={<Skeleton className="h-[200px] w-full rounded-lg" />}
        >
          <TravelPlanFilters showStatusFilter={true} />
        </Suspense>
      </div>

      {/* Results */}
      <Card>
        <CardContent className="pt-6">
          <TravelPlanTable travelPlans={travelPlans} />
        </CardContent>
      </Card>

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

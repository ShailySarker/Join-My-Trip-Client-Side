/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { getMyTravelPlans } from "@/services/travelPlans/travelPlans.service";
import TravelPlanFilters from "@/components/modules/travelPlans/filters/TravelPlanFilters";
import { MyTravelPlanCard } from "@/components/modules/travelPlans/MyTravelPlanCard";
import Pagination from "@/components/shared/Pagination";
import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";
import { getUserInfo } from "@/services/auth/getUserInfo";
import { ISubscriptionPlanStatus } from "@/types/subscription.interface";
import { IUserRole } from "@/types/user.interface";
import { Plus } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

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

export default async function MyTravelPlansPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const userInfo = await getUserInfo();
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

  const result = await getMyTravelPlans(queryParams);
  // @ts-ignore - The service return type might be mismatched in definition (ITravelPlan vs { data: ITravelPlan[] ... }). Assuming standard response structure.
  const travelPlans = result.data || [];
  // @ts-ignore
  const meta = result.meta;

  const hasSubscription =
    userInfo?.role === IUserRole.USER &&
    userInfo?.subscriptionInfo?.status === ISubscriptionPlanStatus.ACTIVE &&
    (userInfo?.subscriptionInfo?.plan === "YEARLY" ||
      userInfo?.subscriptionInfo?.plan === "MONTHLY");

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="xl:text-4xl lg:text-[32px] text-3xl pb-2 font-bold bg-linear-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            My Travel Plans
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage your travel plans and adventures
          </p>
        </div>

        {hasSubscription && (
          <Link href="/dashboard/my-travel-plans/create">
            <Button size="lg" className="gap-2">
              <Plus className="w-5 h-5" />
              Create Travel Plan
            </Button>
          </Link>
        )}
      </div>

      {!hasSubscription ? (
        <div className="text-center py-16 bg-card border rounded-xl">
          <div className="text-6xl mb-4">🚀</div>
          <h3 className="text-2xl font-semibold mb-2">
            You are not a subscribed user
          </h3>
          <p className="text-muted-foreground mb-4">
            To create your own travel plan, purchase a subscription plan.
          </p>
          <Link href="/subscription">
            <Button>Buy Subscription Plan</Button>
          </Link>
        </div>
      ) : (
        <>
          {/* Filters Section */}
          <div className="mb-8">
            <Suspense
              fallback={<Skeleton className="h-[200px] w-full rounded-lg" />}
            >
              <TravelPlanFilters showStatusFilter={true} />
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
                <MyTravelPlanCard
                  key={plan._id}
                  travelPlan={plan}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">📝</div>
              <h3 className="text-2xl font-semibold mb-2">
                No travel plans found
              </h3>
              <p className="text-muted-foreground mb-4">
                You have not created any travel plans yet, or they do not match
                the filters.
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
        </>
      )}
    </div>
  );
}

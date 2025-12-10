import { getUserInfo } from "@/services/auth/getUserInfo";
import { getAllUsers } from "@/services/user/userService";
import UserCard from "@/components/modules/user/travelers/UserCard";
import UserFilters from "@/components/modules/user/travelers/UserFilters";
import Pagination from "@/components/shared/Pagination";
import { redirect } from "next/navigation";
import { IUserRole } from "@/types/user.interface";
import { Users } from "lucide-react";

interface SearchParams {
  search?: string;
  gender?: string;
  isVerified?: string;
  travelInterests?: string;
  sortBy?: string;
  sort?: string;
  page?: string;
  limit?: string;
}

const ExploreTravelersPage = async ({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) => {
  // Await searchParams (Next.js 15 requirement)
  const params = await searchParams;

  const userInfo = await getUserInfo();

  if (!userInfo) {
    redirect("/login?redirect=/dashboard/explore-travelers");
  }

  // Check if user has an active subscription (only USER role needs subscription)
  const hasActiveSubscription =
    userInfo.subscriptionInfo?.status === "ACTIVE" &&
    (userInfo.subscriptionInfo?.plan === "MONTHLY" ||
      userInfo.subscriptionInfo?.plan === "YEARLY");

  // Prepare query params
  const queryParams: Record<string, string> = {
    page: params.page || "1",
    limit: params.limit || "12",
  };

  if (params.search) queryParams.search = params.search;
  if (params.gender) queryParams.gender = params.gender;
  if (params.isVerified) queryParams.isVerified = params.isVerified;
  if (params.travelInterests)
    queryParams.travelInterests = params.travelInterests;
  if (params.sortBy) {
    queryParams.sortBy = params.sortBy;
    queryParams.sort = params.sort || "desc";
  }

  // Fetch users
  const usersResponse = await getAllUsers(queryParams);
  const users = usersResponse.data || [];
  const meta = usersResponse.meta;

  return (
    <div className="container mx-auto xl:p-4 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="lg:text-2xl md:text-[22px] text-xl font-bold flex items-center gap-3">
            <Users className="w-6 h-6 text-primary" />
            Explore Travelers
          </h1>
          <p className="text-muted-foreground mt-1.5">
            Find and connect with fellow travelers around the world
          </p>
        </div>
      </div>

      {/* Subscription Warning for Users */}
      {userInfo.role === IUserRole.USER && !hasActiveSubscription && (
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
          <div className="flex items-start gap-3">
            {/* <Filter className="w-5 h-5 text-yellow-600 dark:text-yellow-500 shrink-0" /> */}
            <svg
              className="w-5 h-5 text-yellow-600 dark:text-yellow-500 shrink-0 mt-0.5"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            <div>
              <h3 className="font-semibold text-yellow-800 dark:text-yellow-300">
                Limited Access
              </h3>
              <p className="text-sm text-yellow-700 dark:text-yellow-400 mt-1">
                You need an active subscription to view profiles and follow
                travelers.{" "}
                <a
                  href="/subscription"
                  className="underline font-semibold hover:text-yellow-900 dark:hover:text-yellow-200"
                >
                  Subscribe now
                </a>{" "}
                to unlock all features.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Filters */}
      <UserFilters />

      {/* Results Count */}
      {meta && (
        <div className="text-sm text-muted-foreground">
          Found {meta.total} traveler{meta.total !== 1 ? "s" : ""}
        </div>
      )}

      {/* Users Grid */}
      {users.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-4 lg:gap-3.5 gap-3">
          {users.map((user) => (
            <UserCard
              key={user._id}
              user={user}
              currentUser={userInfo}
              showFollowButton={
                userInfo.role === IUserRole.USER && hasActiveSubscription
              }
              showViewButton={true}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <Users className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
          <h3 className="text-xl font-semibold text-muted-foreground mb-2">
            No travelers found
          </h3>
          <p className="text-muted-foreground">
            Try adjusting your filters to see more results
          </p>
        </div>
      )}

      {/* Pagination */}
      {meta && meta.totalPage > 1 && (
        <Pagination
          currentPage={meta.page}
          totalPages={meta.totalPage}
          totalItems={meta.total}
        />
      )}
    </div>
  );
};

export default ExploreTravelersPage;

import { getAllUsers } from "@/services/user/userService";
import UserCard from "@/components/modules/user/travelers/UserCard";
import UserFilters from "@/components/modules/user/travelers/UserFilters";
import Pagination from "@/components/shared/Pagination";
import { Users } from "lucide-react";

interface SearchParams {
  search?: string;
  gender?: string;
  isVerified?: string;
  travelInterests?: string;
  sortBy?: string;
  sortOrder?: string;
  page?: string;
  limit?: string;
}

const PublicExploreTravelersPage = async ({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) => {
  // Await searchParams (Next.js 15 requirement)
  const params = await searchParams;

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
    queryParams.sortOrder = params.sortOrder || "desc";
  }
  // Default sort
  if (!queryParams.sortBy) queryParams.sortBy = "fullname";
  if (!queryParams.sortOrder) queryParams.sortOrder = "asc";

  // Fetch users
  const usersResponse = await getAllUsers(queryParams);
  const users = usersResponse.data || [];
  const meta = usersResponse.meta;
  return (
    <div className="xl:px-24 lg:px-20 md:px-12 px-6 xl:pt-7 lg:pt-5 md:pt-4 pt-3 xl:pb-20 lg:pb-16 md:pb-14 pb-13 container mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <Users className="w-8 h-8 text-primary" />
            Explore Travelers
          </h1>
          <p className="text-muted-foreground mt-2">
            Discover amazing travelers from around the world
          </p>
        </div>
      </div>

      {/* Subscription CTA */}
      <div className="bg-linear-to-r from-primary/10 via-primary/5 to-transparent border border-primary/20 rounded-lg p-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex-1">
            <h3 className="text-xl font-semibold mb-2">
              Unlock Full Access to Connect with Travelers
            </h3>
            <p className="text-muted-foreground">
              Subscribe to view detailed profiles, follow travelers, and build
              your travel network. Join our community today!
            </p>
          </div>
          <div className="flex gap-3">
            <a
              href="/login"
              className="inline-flex items-center gap-2 bg-secondary text-secondary-foreground px-6 py-2 rounded-md hover:bg-secondary/80 transition-colors whitespace-nowrap"
            >
              Sign In
            </a>
            <a
              href="/subscription"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-2 rounded-md hover:bg-primary/90 transition-colors whitespace-nowrap"
            >
              View Plans
            </a>
          </div>
        </div>
      </div>

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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {users.map((user) => (
            <UserCard
              key={user._id}
              user={user}
              currentUser={null}
              showFollowButton={false}
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

export default PublicExploreTravelersPage;

import { getUserInfo } from "@/services/auth/getUserInfo";
import { getAllUsers } from "@/services/user/userService";
import UserTable from "@/components/modules/admin/UserTable";
import UserFilters from "@/components/modules/user/travelers/UserFilters";
import Pagination from "@/components/shared/Pagination";
import { redirect } from "next/navigation";
import { IUserRole } from "@/types/user.interface";
import { Users, Shield } from "lucide-react";

interface SearchParams {
  search?: string;
  gender?: string;
  isVerified?: string;
  role?: string;
  travelInterests?: string;
  sortBy?: string;
  sortOrder?: string;
  // sort?: string;
  page?: string;
  limit?: string;
}

const ManageUsersPage = async ({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) => {
  // Await searchParams (Next.js 15 requirement)
  const params = await searchParams;

  const userInfo = await getUserInfo();

  if (!userInfo) {
    redirect("/login");
  }

  // Check if user is admin or super admin
  if (
    userInfo.role !== IUserRole.ADMIN &&
    userInfo.role !== IUserRole.SUPER_ADMIN
  ) {
    redirect("/dashboard");
  }

  // Prepare query params
  const queryParams: Record<string, string> = {
    page: params.page || "1",
    limit: params.limit || "10",
  };

  if (params.search) queryParams.search = params.search;
  if (params.gender) queryParams.gender = params.gender;
  if (params.isVerified) queryParams.isVerified = params.isVerified;
  if (params.role) queryParams.role = params.role;
  if (params.travelInterests)
    queryParams.travelInterests = params.travelInterests;
  if (params.sortBy) {
    queryParams.sortBy = params.sortBy;
    queryParams.sortOrder = params.sortOrder || "desc";
    // queryParams.sort = params.sort || "desc";
  }
  // Default sort
  if (!queryParams.sortBy) queryParams.sortBy = "fullname";
  if (!queryParams.sortOrder) queryParams.sortOrder = "asc";

  // Fetch users
  const usersResponse = await getAllUsers(queryParams);
  const users = usersResponse.data || [];
  const meta = usersResponse.meta;

  return (
    <div className="container mx-auto xl:p-4 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <Shield className="w-8 h-8 text-primary" />
            Manage Users
          </h1>
          <p className="text-muted-foreground mt-2">
            View and manage all registered users
          </p>
        </div>
        <div className="bg-primary/10 rounded-full px-4 py-2">
          <span className="text-2xl font-bold text-primary">
            {meta?.total || 0}
          </span>
          <span className="text-sm text-muted-foreground ml-2">
            Total Users
          </span>
        </div>
      </div>

      {/* Admin Info Box */}
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <Shield className="w-5 h-5 text-blue-600 dark:text-blue-500 shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-blue-800 dark:text-blue-300">
              Admin Panel
            </h3>
            <p className="text-sm text-blue-700 dark:text-blue-400 mt-1">
              You can view all user details and delete users if necessary. Use
              these permissions responsibly.
            </p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <UserFilters />

      {/* Results Count */}
      {meta && (
        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Showing {users.length} of {meta.total} user
            {meta.total !== 1 ? "s" : ""}
          </div>
        </div>
      )}

      {/* Users Table */}
      {users.length > 0 ? (
        <UserTable users={users} />
      ) : (
        <div className="text-center py-16 bg-card border rounded-lg">
          <Users className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
          <h3 className="text-xl font-semibold text-muted-foreground mb-2">
            No users found
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

export default ManageUsersPage;

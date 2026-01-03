
import { getUserInfo } from "@/services/auth/getUserInfo";
import { getMyFollowings } from "@/services/user/userService";
import UserCard from "@/components/modules/user/travelers/UserCard";
import { redirect } from "next/navigation";
import { UserPlus, Users, ChevronLeft, ChevronRight } from "lucide-react";
import { IUserRole } from "@/types/user.interface";
import UserSearchFilter from "@/components/modules/user/UserSearchFilter";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function MyFollowingsPage(props: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const searchParams = await props.searchParams;
  const userInfo = await getUserInfo();

  if (!userInfo) {
    redirect("/login?redirect=/dashboard/my-followings");
  }

  const query: Record<string, any> = {};
  if (searchParams.search) query.search = searchParams.search;
  if (searchParams.page) query.page = searchParams.page;
  if (searchParams.limit) query.limit = searchParams.limit;
  if (searchParams.sortBy) query.sortBy = searchParams.sortBy;
  if (searchParams.sortOrder) query.sortOrder = searchParams.sortOrder;

  // Default sort
  if (!query.sortBy) query.sortBy = "createdAt";
  if (!query.sortOrder) query.sortOrder = "desc";

  // Fetch followings
  const result = await getMyFollowings(query);
  const followings = result.data || [];
  const meta = result.meta;

  return (
    <div className="container mx-auto xl:p-4 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="xl:text-4xl lg:text-[32px] text-3xl font-bold flex items-center gap-3">
            <Users className="w-8 h-8 text-primary" />
            My Followings
          </h1>
          <p className="text-muted-foreground mt-2">People you are following</p>
        </div>
        <div className="flex items-center bg-primary/10 rounded-4xl px-5 py-1.5 border border-primary w-fit">
          <span className="text-2xl font-bold text-primary">
            {meta?.total || followings.length}
          </span>
          <span className="text-sm text-muted-foreground ml-2">Following</span>
        </div>
      </div>

       {/* Search */}
      <div className="flex justify-start">
         <UserSearchFilter />
      </div>

      {/* Followings Grid */}
      {followings.length > 0 ? (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {followings.map((following) => (
                <UserCard
                key={following._id}
                user={following}
                currentUser={userInfo}
                showFollowButton={userInfo.role === IUserRole.USER}
                showViewButton={true}
                />
            ))}
            </div>
            
            {/* Pagination */}
             {meta && meta.totalPage > 1 && (
                <div className="flex items-center justify-between pt-6 mt-6 border-t">
                    <p className="text-sm text-muted-foreground">
                        Page {meta.page} of {meta.totalPage}
                    </p>
                    <div className="flex gap-2">
                         <Link href={`?page=${meta.page - 1}`} passHref legacyBehavior>
                            <Button
                            variant="outline"
                            size="sm"
                            disabled={meta.page <= 1}
                            className={meta.page <= 1 ? "pointer-events-none opacity-50" : ""}
                            >
                            <ChevronLeft className="w-4 h-4 mr-1" />
                            Previous
                            </Button>
                        </Link>
                        <Link href={`?page=${meta.page + 1}`} passHref legacyBehavior>
                           <Button
                            variant="outline"
                            size="sm"
                            disabled={meta.page >= meta.totalPage}
                             className={meta.page >= meta.totalPage ? "pointer-events-none opacity-50" : ""}
                            >
                            Next
                            <ChevronRight className="w-4 h-4 ml-1" />
                            </Button>
                        </Link>
                    </div>
                </div>
            )}
        </>
      ) : (
        <div className="text-center py-16 bg-white rounded-lg shadow">
          <UserPlus className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
          <h3 className="text-xl font-semibold text-muted-foreground mb-2">
            Not following anyone yet
          </h3>
          <p className="text-muted-foreground mb-4">
            Start exploring and follow travelers with similar interests
          </p>
          <a
            href="/dashboard/explore-travelers"
            className="font-medium inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-2 rounded-md hover:bg-primary/90 transition-colors"
          >
            <Users className="w-4 h-4" />
            Explore Travelers
          </a>
        </div>
      )}
    </div>
  );
}

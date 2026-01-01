import { getUserInfo } from "@/services/auth/getUserInfo";
import { getMyFollowings } from "@/services/user/userService";
import UserCard from "@/components/modules/user/travelers/UserCard";
import { redirect } from "next/navigation";
import { UserPlus, Users } from "lucide-react";
import { IUserRole } from "@/types/user.interface";

const MyFollowingsPage = async () => {
  const userInfo = await getUserInfo();

  if (!userInfo) {
    redirect("/login?redirect=/dashboard/my-followings");
  }

  // Fetch followings
  const followingsResponse = await getMyFollowings();
  const followings = followingsResponse.data || [];

  return (
    <div className="container mx-auto xl:p-4 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="xl:text-4xl lg:text-[32px] text-3xl font-bold flex items-center gap-3">
            <Users className="w-8 h-8 text-primary" />
            My Followings
          </h1>
          <p className="text-muted-foreground mt-2">People you are following</p>
        </div>
        <div className="flex items-center bg-primary/10 rounded-4xl px-5 py-1.5 border border-primary">
          <span className="text-2xl font-bold text-primary">
            {followings.length}
          </span>
          <span className="text-sm text-muted-foreground ml-2">Following</span>
        </div>
      </div>

      {/* Followings Grid */}
      {followings.length > 0 ? (
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
};

export default MyFollowingsPage;

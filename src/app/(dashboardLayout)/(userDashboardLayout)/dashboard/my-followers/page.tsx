import { getUserInfo } from "@/services/auth/getUserInfo";
import { getMyFollowers } from "@/services/user/userService";
import UserCard from "@/components/modules/user/travelers/UserCard";
import { redirect } from "next/navigation";
import { Users, UserMinus } from "lucide-react";
import { IUserRole } from "@/types/user.interface";

const MyFollowersPage = async () => {
  const userInfo = await getUserInfo();

  if (!userInfo) {
    redirect("/login?redirect=/dashboard/my-followers");
  }

  // Fetch followers
  const followersResponse = await getMyFollowers();
  const followers = followersResponse.data || [];

  return (
    <div className="container mx-auto xl:p-4 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="xl:text-4xl lg:text-[32px] text-3xl font-bold flex items-center gap-3">
            <Users className="w-8 h-8 text-primary" />
            My Followers
          </h1>
          <p className="text-muted-foreground mt-2">
            People who are following you
          </p>
        </div>
        <div className="flex items-center bg-primary/10 rounded-4xl px-5 py-1.5 border border-primary">
          <span className="text-2xl font-bold text-primary">
            {followers.length}
          </span>
          <span className="text-sm text-muted-foreground ml-2">
            {followers.length === 1 ? "Follower" : "Followers"}
          </span>
        </div>
      </div>

      {/* Followers Grid */}
      {followers.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {followers.map((follower) => (
            <UserCard
              key={follower._id}
              user={follower}
              currentUser={userInfo}
              showFollowButton={userInfo.role === IUserRole.USER}
              showViewButton={true}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-lg shadow">
          <UserMinus className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
          <h3 className="text-xl font-semibold text-muted-foreground mb-2">
            No followers yet
          </h3>
          <p className="text-muted-foreground">
            When people follow you, they will appear here
          </p>
        </div>
      )}
    </div>
  );
};

export default MyFollowersPage;

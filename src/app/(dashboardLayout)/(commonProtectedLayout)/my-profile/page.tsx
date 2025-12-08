import ProfileView from "@/components/modules/profile/ProfileView";
import { getUserInfo } from "@/services/auth/getUserInfo";

const MyProfilePage = async () => {
  const user = await getUserInfo();

  return (
    <div className="container mx-auto xl:p-4">
      <h1 className="text-2xl font-bold mb-6">My Profile</h1>
      <ProfileView user={user} />
    </div>
  );
};

export default MyProfilePage;

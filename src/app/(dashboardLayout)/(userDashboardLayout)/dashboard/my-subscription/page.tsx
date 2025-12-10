import MySubscriptionCard from "@/components/modules/user/subscription/MySubscriptionCard";
import { getUserInfo } from "@/services/auth/getUserInfo";

const MySubscriptionPage = async () => {
  const userInfo = await getUserInfo();
  return (
    <div className="container mx-auto xl:p-4">
      <h2 className="text-xl font-semibold">My Subscription</h2>
      {userInfo.subscriptionInfo ? (
        <MySubscriptionCard
          fullname={userInfo.fullname}
          email={userInfo.email}
          subscriptionInfo={userInfo.subscriptionInfo}
        />
      ) : (
        <p className="text-gray-500 text-center xl:mt-28 lg:mt-24 md:mt-20 mt-16 font-semibold italic">
          You have no subscription.
        </p>
      )}
    </div>
  );
};

export default MySubscriptionPage;

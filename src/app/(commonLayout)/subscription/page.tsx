import SubscriptionCard from "@/components/modules/public/subscription/SubscriptionCard";
import { getUserInfo } from "@/services/auth/getUserInfo";
import { getAllSubscriptions } from "@/services/subscription/subscription.service";
import { ISubscription } from "@/types/subscription.interface";

// Force dynamic rendering - don't cache this page
export const dynamic = "force-dynamic";

const SubscriptionPage = async () => {
  const subscriptions = await getAllSubscriptions();
  const userInfo = await getUserInfo();

  return (
    <div className="mx-auto lg:max-w-2xl">
      <h2 className="xl:text-3xl lg:text-[28px] md:text-2xl text-xl font-bold text-center">
        {userInfo?.role === "ADMIN" || userInfo?.role === "SUPER_ADMIN"
          ? "Subscription Plan"
          : "Choose Your Plan"}
      </h2>
      <p className="text-center text-gray-500 mt-2 lg:text-base md:text-[15px] text-sm">
        Unlock premium features and enjoy a better travel experience.
      </p>

      <div className="grid md:grid-cols-2 gap-6 xl:mt-16 lg:mt-12 md:mt-14 mt-10">
        {subscriptions?.data?.map((plan: ISubscription) => (
          <SubscriptionCard
            key={plan?._id}
            subscription={plan}
            userInfo={userInfo}
          />
        ))}
      </div>
    </div>
  );
};

export default SubscriptionPage;

import SubscriptionCard from "@/components/modules/public/subscription/SubscriptionCard";
import { Button } from "@/components/ui/button";
import { getUserInfo } from "@/services/auth/getUserInfo";
import { getAllSubscriptions } from "@/services/subscription/subscription.service";
import { ISubscription } from "@/types/subscription.interface";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const SubscriptionPage = async () => {
  const subscriptions = await getAllSubscriptions();
  const userInfo = await getUserInfo();

  return (
    <div className="max-w-7xl mx-auto xl:px-24 lg:px-20 md:px-12 px-6 xl:pt-7 lg:pt-5 md:pt-4 pt-3 xl:pb-20 lg:pb-16 md:pb-14 pb-13">
      <div className="mx-auto lg:max-w-2xl mb-16">
        <h2 className="xl:text-3xl lg:text-[28px] md:text-2xl text-xl font-bold text-center text-gray-900 dark:text-gray-100">
          {userInfo?.role === "ADMIN" || userInfo?.role === "SUPER_ADMIN"
            ? "Subscription Plan"
            : "Choose Your Plan"}
        </h2>
        <p className="text-center text-gray-600 dark:text-gray-400 mt-2 lg:text-base md:text-[15px] text-sm">
          Unlock premium features and enjoy a better travel experience.
        </p>

        <div className="grid md:grid-cols-2 gap-6 xl:mt-12 lg:mt-10 md:mt-8 mt-8">
          {subscriptions?.data?.map((plan: ISubscription) => (
            <SubscriptionCard
              key={plan?._id}
              subscription={plan}
              userInfo={userInfo}
            />
          ))}
        </div>
      </div>

      {/* Benefits Section */}
      <div className="mb-20">
        <h3 className="text-2xl font-bold text-center mb-10 text-gray-900 dark:text-gray-100">
          Why Upgrade?
        </h3>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 text-center">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-6 h-6 text-blue-600 dark:text-blue-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h4 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
              Unlimited Destinations
            </h4>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Create and join unlimited travel plans without any restrictions.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 text-center">
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-6 h-6 text-purple-600 dark:text-purple-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
            </div>
            <h4 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
              Premium Community
            </h4>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Connect with verified travelers and join exclusive premium-only
              trips.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 text-center">
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-6 h-6 text-green-600 dark:text-green-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h4 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
              Instant Approvals
            </h4>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Get your travel plans approved faster with priority moderation
              status.
            </p>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Do you have any query?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Kindly reach out to us through our contact form or visit into our
              FAQ.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact-us">
                <Button size="lg" variant="secondary" className="h-10 px-8">
                  Contact Us
                  <ArrowRight className=" w-4 h-4" />
                </Button>
              </Link>
              <Link href="/faq">
                <Button size="lg" variant="secondary" className="h-10 px-8">
                  General FAQ
                  <ArrowRight className=" w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SubscriptionPage;

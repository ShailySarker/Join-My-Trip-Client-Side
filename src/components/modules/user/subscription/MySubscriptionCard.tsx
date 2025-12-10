import { Badge } from "@/components/ui/badge";
import { IUserSubscriptionInfo } from "@/types/user.interface";
import { Calendar, ShieldCheck } from "lucide-react";

interface SubscriptionCardProps {
  fullname: string;
  email: string;
  subscriptionInfo?: IUserSubscriptionInfo;
}

export default function SubscriptionCard({
  fullname,
  email,
  subscriptionInfo,
}: SubscriptionCardProps) {
  const isActive = subscriptionInfo?.status === "ACTIVE";

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-2xl shadow-md border border-gray-200 space-y-4 xl:mt-16 lg:mt-14 md:mt-12 mt-10">
      {/* User Info */}
      <div className="flex items-center gap-4">
        <div className="flex flex-col items-center justify-center bg-primary text-white rounded-full w-16 h-16">
          <span className="text-xl font-bold">
            {fullname.charAt(0).toUpperCase()}
          </span>
        </div>
        <div>
          <h2 className="text-lg font-semibold flex items-center gap-1">
            {fullname}
            {isActive && <ShieldCheck className="h-4 w-4 text-primary" />}
          </h2>
          <p className="text-sm text-gray-500">{email}</p>
        </div>
      </div>

      {/* Subscription Info */}
      <div className="space-y-2">
        <h3 className="text-md font-semibold">Subscription Plan</h3>
        {subscriptionInfo ? (
          <div className="flex items-center justify-between p-4 border rounded-lg bg-gray-50">
            <div className="space-y-2.5">
              <p className="text-sm font-medium">
                Plan: {subscriptionInfo.plan}
              </p>
              <p className="text-sm text-gray-600">
                Status:{" "}
                <Badge
                  className={`px-2 py-[3px] rounded-4xl text-[10px]/none ${
                    isActive
                      ? "bg-primary text-white"
                      : "bg-yellow-500 text-white"
                  }`}
                >
                  {subscriptionInfo.status}
                </Badge>
              </p>
              <p className="text-sm text-gray-600 flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {subscriptionInfo.startDate
                  ? `Start: ${new Date(
                      subscriptionInfo.startDate
                    ).toLocaleDateString()}`
                  : "Start date not set"}
              </p>
              <p className="text-sm text-gray-600 flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {subscriptionInfo.expireDate
                  ? `Expires: ${new Date(
                      subscriptionInfo.expireDate
                    ).toLocaleDateString()}`
                  : "No expiry date"}
              </p>
            </div>
          </div>
        ) : (
          <p className="text-sm text-gray-500">No active subscription</p>
        )}
      </div>
    </div>
  );
}

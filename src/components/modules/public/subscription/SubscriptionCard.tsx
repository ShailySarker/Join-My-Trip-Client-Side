/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ISubscription,
  ISubscriptionPlanStatus,
} from "@/types/subscription.interface";
import { createPaymentIntent } from "@/services/payment/payment.service";
import { toast } from "sonner";
import { IUser, IUserRole } from "@/types/user.interface";

interface SubscriptionCardProps {
  subscription: ISubscription;
  subscriptionInfo?: Partial<IUser>;
}

export default function SubscriptionCard({
  subscription,
  subscriptionInfo,
}: SubscriptionCardProps) {
  const { _id, plan, amount } = subscription;
  // Check if user already has an active subscription for this plan
  const isSubscribed =
    subscriptionInfo?.subscriptionInfo?.status ===
      ISubscriptionPlanStatus.ACTIVE &&
    subscriptionInfo?.subscriptionInfo?.plan === plan;

  const handlePayment = async (subscriptionId: string) => {
    console.log(_id);
    try {
      const result = await createPaymentIntent(subscriptionId);
      console.log(result);
      if (result.data && result.success) window.location.href = result.data;
      else toast.error(result.error || "Payment failed");
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || "Payment error");
    }
  };

  return (
    <Card className="border rounded-2xl shadow-sm hover:shadow-md transition-all">
      <CardHeader>
        <CardTitle className="text-xl font-semibold capitalize">
          {plan.toLowerCase()}
        </CardTitle>
      </CardHeader>

      <CardContent>
        <p className="text-3xl font-bold flex items-center gap-1.5">
          {/* ৳ */}
          {/* <DollarSignIcon /> */}
          {amount}
          <span className="text-sm">BDT</span>
        </p>
        <p className="text-gray-500 mt-1">
          Billed {plan === "MONTHLY" ? "monthly" : "yearly"}
        </p>

        <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
          <li>✔ Access to all features</li>
          <li>✔ Travel Buddy Matching</li>
          <li>✔ Profile Boost</li>
          <li>✔ Verified Badge</li>
        </ul>
      </CardContent>

      {subscriptionInfo?.role === IUserRole.USER && (
        <CardFooter>
          <div
            className="w-full"
            onClick={() => {
              if (isSubscribed) {
                toast.warning(
                  `You have already subscribed to the ${plan} plan.`
                );
              }
            }}
          >
            <Button
              className="w-full pointer-events-none"
              disabled={isSubscribed}
              variant={isSubscribed ? "secondary" : "default"}
              onClick={() => !isSubscribed && handlePayment(_id as string)}
            >
              {isSubscribed ? `Subscribed (${plan})` : `Buy ${plan} Plan`}
            </Button>
          </div>
        </CardFooter>
      )}
    </Card>
  );
}

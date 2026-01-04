export const dynamic = "force-dynamic";

import PaymentTable from "@/components/modules/user/payment/PaymentTable";
import { Button } from "@/components/ui/button";
import { getMyPaymentHistory } from "@/services/payment/payment.service";
import Link from "next/link";

const PaymentHistoryPage = async () => {
  const payments = await getMyPaymentHistory();
  return (
    <div className="container mx-auto xl:p-4">
      <div className="mb-8">
        <h1 className="xl:text-4xl lg:text-[32px] text-3xl pb-2 font-bold bg-linear-to-r from-primary to-primary/60 bg-clip-text text-transparent">
          My Payment History
        </h1>
        <p className="text-muted-foreground mt-1">
          Take a overview of your payment history
        </p>
      </div>
      {payments.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-xl">
          <div className="text-6xl mb-4">💸</div>
          <h3 className="text-2xl font-semibold mb-2">
            You have no payment history yet
          </h3>
          <p className="text-muted-foreground mb-4">
            To start your adventure, purchase a subscription plan.
          </p>
          <Link href="/subscription">
            <Button>Buy Subscription Plan</Button>
          </Link>
        </div>
      ) : (
        <PaymentTable payments={payments} />
      )}
    </div>
  );
};

export default PaymentHistoryPage;

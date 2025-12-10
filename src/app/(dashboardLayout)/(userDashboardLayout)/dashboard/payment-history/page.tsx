import PaymentTable from "@/components/modules/user/payment/PaymentTable";
import { getMyPaymentHistory } from "@/services/payment/payment.service";

const PaymentHistoryPage = async () => {
  const payments = await getMyPaymentHistory();

  return (
    <div className="container mx-auto xl:p-4">
      <h2 className="text-xl font-semibold">My Payment History</h2>
      {payments.length === 0 ? (
        <p className="text-gray-500 text-center xl:mt-28 lg:mt-24 md:mt-20 mt-16 font-semibold italic">
          You have no payment history.
        </p>
      ) : (
        <PaymentTable payments={payments} />
      )}
    </div>
  );
};

export default PaymentHistoryPage;

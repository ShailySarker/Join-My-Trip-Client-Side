/* eslint-disable @typescript-eslint/no-explicit-any */
import StatusBadge from "../../../shared/StatusBadge";
export default function PaymentTable({ payments }: any) {
  return (
    <>
      <div className="overflow-x-auto border rounded-lg xl:mt-10 lg:mt-8 md:mt-6 mt-4">
        <table className="w-full text-left border-collapse bg-white">
          <thead>
            <tr className="bg-gray-100">
              <th className="md:p-3 p-2.5 md:text-base text-sm border">No.</th>
              <th className="md:p-3 p-2.5 md:text-base text-sm border">
                User Name
              </th>
              <th className="md:p-3 p-2.5 md:text-base text-sm border">
                Email
              </th>
              <th className="md:p-3 p-2.5 md:text-base text-sm border">Plan</th>
              <th className="md:p-3 p-2.5 md:text-base text-sm border">
                Amount
              </th>
              <th className="md:p-3 p-2.5 md:text-base text-sm border">
                Status
              </th>
              <th className="md:p-3 p-2.5 md:text-base text-sm border">
                Transaction Date
              </th>
            </tr>
          </thead>

          <tbody>
            {payments.map((item: any, index: number) => (
              <tr key={item._id} className="border-b">
                <td className="md:p-3 p-2.5 md:text-base text-sm border">
                  {index + 1}
                </td>
                <td className="md:p-3 p-2.5 md:text-base text-sm border font-semibold">
                  {item?.userId?.fullname}
                </td>
                <td className="md:p-3 p-2.5 md:text-base text-sm border font-semibold">
                  {item?.userId?.email}
                </td>
                <td className="md:p-3 p-2.5 md:text-base text-sm border font-semibold">
                  {item?.subscriptionId?.plan}
                </td>

                <td className="md:p-3 p-2.5 md:text-base text-sm border">
                  {item.amount} BDT
                </td>
                <td className="md:p-3 p-2.5 md:text-base text-sm border">
                  <StatusBadge status={item.status} />
                </td>

                <td className="p-3 border">
                  {item.transactionDate
                    ? new Date(item.transactionDate).toLocaleString()
                    : "N/A"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

/* eslint-disable @typescript-eslint/no-explicit-any */
import { Badge } from "@/components/ui/badge";
import { IPaymentStatus } from "@/types/payment.interface";

export default function StatusBadge({ status }: { status: IPaymentStatus }) {
  const variantMap: Record<IPaymentStatus, string> = {
    COMPLETED: "default",
    FAILED: "destructive",
    REFUNDED: "outline",
    EXPIRED: "secondary",
    PENDING: "warning",
  };

  const colorMap: Record<IPaymentStatus, string> = {
    COMPLETED: "bg-green-600 text-white",
    FAILED: "bg-red-600 text-white",
    REFUNDED: "bg-blue-200 text-black",
    EXPIRED: "bg-yellow-700 text-white",
    PENDING: "bg-yellow-500 text-black",
  };

  return (
    <Badge
      variant={variantMap[status] as any}
      className={`px-3 py-1 text-xs rounded-full ${colorMap[status]}`}
    >
      {status}
    </Badge>
  );
}

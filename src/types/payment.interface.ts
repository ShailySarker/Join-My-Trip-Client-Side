export enum IPaymentStatus {
  PENDING = "PENDING",
  COMPLETED = "COMPLETED",
  FAILED = "FAILED",
  REFUNDED = "REFUNDED",
  EXPIRED = "EXPIRED",
}

export interface IPayment {
  _id: string;
  userId: string;
  subscriptionId: string;
  stripePaymentIntentId: string;
  stripeCustomerId?: string;
  amount: number;
  currency?: string;
  status: IPaymentStatus;
  transactionDate?: string;
  createdAt?: string;
  updatedAt?: string;
}

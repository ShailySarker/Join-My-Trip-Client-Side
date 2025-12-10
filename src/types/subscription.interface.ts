export enum ISubscriptionPlan {
  MONTHLY = "MONTHLY",
  YEARLY = "YEARLY",
}
export enum ISubscriptionPlanStatus {
  ACTIVE = "ACTIVE",
  CANCELLED = "CANCELLED",
  EXPIRED = "EXPIRED",
}

export interface ISubscription {
  _id?: string;
  plan: ISubscriptionPlan; // default free
  // status: ISubscriptionPlanStatus; // default WAITING
  amount: number;
}

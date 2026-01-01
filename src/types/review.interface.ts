export interface IReview {
  reviewerId: string; // who give the review
  reviewedUserId: string; // who get the review
  travelPlanId: string; // for which plan
  rating: number;
  comment: string;
  createdAt?: Date;
  updatedAt?: Date;
}
